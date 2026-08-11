/**
 * The walk from the root down, and what the two ends of a delegation disagree
 * about.
 *
 * A delegation has two sides. The parent zone publishes an NS set saying "ask
 * these servers"; the zone itself publishes its own NS set. Nothing forces them
 * to match, and when they drift apart the result is the most exasperating class
 * of DNS fault there is: it works, until the resolver that happened to cache
 * the other set answers, and then it does not. Every tool that only asks a
 * recursive resolver is blind to this, because the resolver picked one side
 * long ago and will keep telling you about it.
 *
 * So this walks the delegation itself: root servers, then the TLD's servers,
 * then the zone's own — comparing what it is told at each step.
 */

import { TYPE, rootServers, defaultResolver, ancestors } from '@sharapov/dns-wire';

import { flag } from '@sharapov/service-kit';

const nsNamesOf = records => records
  .filter(record => record.type === TYPE.NS)
  .map(record => record.data.ns.toLowerCase().replace(/\.$/, ''));

const sorted = list => [...new Set(list)].sort();

/**
 * Follows referrals from the root to whichever zone actually holds the name.
 *
 * @returns {object} the trace, the parent's NS set, the DS records the parent
 *                   published, and whatever went wrong on the way
 */
export async function walkDelegation(session, domain) {
  const trace = [];
  const flags = [];
  let servers = rootServers(3, domain.length);
  let zone = '';
  let parentNs = [];
  let dsRecords = [];
  let dsSigs = [];
  let glue = [];
  let steps = 0;

  const wanted = ancestors(domain).reverse();          // root first, target last

  while (steps++ < 12) {
    const response = await session.ask({
      name: domain, type: 'NS', server: servers[0], rd: false, dnssec: true,
    });

    if (!response?.message) {
      // One unanswered server is not a broken delegation; try the siblings.
      const alternative = servers.slice(1).find(Boolean);
      if (alternative) {
        servers = servers.slice(1);
        continue;
      }
      flags.push(flag('delegation-walk-failed', 'medium', 'unknown', { zone: zone || '.' }));
      return { trace, zone, parentNs, dsRecords, dsSigs, glue, flags, complete: false };
    }

    const message = response.message;
    const answerNs = message.answers.filter(record => record.type === TYPE.NS);
    const authorityNs = message.authorities.filter(record => record.type === TYPE.NS);

    /* An authoritative answer means we have arrived: this server holds the
       zone rather than pointing at somebody who does. */
    if (message.flags.aa && answerNs.length) {
      trace.push({
        from: response.server,
        zone: zone || '.',
        authoritative: true,
        nameservers: sorted(nsNamesOf(answerNs)),
        elapsedMs: response.elapsedMs,
      });
      break;
    }

    if (!authorityNs.length) {
      /* No referral and no answer. If the authority section carries a SOA, the
         name simply does not exist below this zone — which is a real answer,
         not a failure. */
      const soa = message.authorities.find(record => record.type === TYPE.SOA);
      trace.push({
        from: response.server,
        zone: zone || '.',
        authoritative: message.flags.aa,
        nameservers: [],
        rcode: message.rcodeName,
        soaAt: soa?.name,
        elapsedMs: response.elapsedMs,
      });
      if (message.rcodeName === 'NXDOMAIN') {
        flags.push(flag('nxdomain', 'critical', 'failed', { at: soa?.name || zone }));
      } else if (!parentNs.length) {
        flags.push(flag('no-delegation', 'critical', 'failed', { at: soa?.name || zone }));
      }
      return { trace, zone, parentNs, dsRecords, dsSigs, glue, flags, complete: true };
    }

    const nextZone = authorityNs[0].name.toLowerCase().replace(/\.$/, '');
    const names = sorted(nsNamesOf(authorityNs));

    /* Glue: the addresses the parent hands out for nameservers that live
       inside the zone they serve. Without it, resolving the zone requires
       resolving a name inside the zone, which requires resolving the zone. */
    const additionalGlue = message.additionals
      .filter(record => record.type === TYPE.A || record.type === TYPE.AAAA)
      .map(record => ({
        name: record.name.toLowerCase().replace(/\.$/, ''),
        address: record.data.address,
        family: record.type === TYPE.A ? 4 : 6,
      }));

    trace.push({
      from: response.server,
      zone: zone || '.',
      referralTo: nextZone,
      nameservers: names,
      glue: additionalGlue,
      ds: message.authorities.filter(record => record.type === TYPE.DS)
        .map(record => record.data),
      elapsedMs: response.elapsedMs,
    });

    parentNs = names;
    glue = additionalGlue;
    dsRecords = message.authorities.filter(record => record.type === TYPE.DS);
    dsSigs = message.authorities.filter(record => record.type === TYPE.RRSIG);
    zone = nextZone;

    if (nextZone === domain) {
      // The parent has delegated the name itself; the next hop would be the
      // zone's own servers, which is where the comparison below happens.
      break;
    }
    if (!wanted.includes(nextZone)) {
      flags.push(flag('referral-off-path', 'high', 'failed', { to: nextZone }));
      break;
    }

    const addresses = additionalGlue.filter(entry => names.includes(entry.name) && entry.family === 4)
      .map(entry => entry.address);
    if (addresses.length) {
      servers = addresses;
    } else {
      // No glue for an out-of-zone nameserver is normal; resolve one the
      // ordinary way and carry on.
      const resolved = await session.ask({ name: names[0], type: 'A', server: defaultResolver() });
      const address = resolved?.message?.answers.find(record => record.type === TYPE.A)?.data.address;
      if (!address) {
        flags.push(flag('nameserver-unresolvable', 'high', 'failed', { nameserver: names[0] }));
        return { trace, zone, parentNs, dsRecords, dsSigs, glue, flags, complete: false };
      }
      servers = [address];
    }
  }

  return { trace, zone: zone || domain, parentNs, dsRecords, dsSigs, glue, flags, complete: true };
}

/**
 * The other side of the delegation, and the checks that only make sense once
 * both sides are in hand.
 */
export async function inspectDelegation(session, domain, walk) {
  const flags = [...walk.flags];
  const parentNs = walk.parentNs;

  /* The zone's own idea of its NS set. Asked of the parent's servers first,
     because asking a recursive resolver would answer from whichever side it
     cached. */
  const childResponse = await session.ask({
    name: domain, type: 'NS', server: defaultResolver(), dnssec: true,
  });
  const childNs = sorted(nsNamesOf(childResponse?.message?.answers || []));

  const onlyAtParent = parentNs.filter(name => !childNs.includes(name));
  const onlyAtChild = childNs.filter(name => !parentNs.includes(name));

  if (parentNs.length && childNs.length && (onlyAtParent.length || onlyAtChild.length)) {
    flags.push(flag('ns-set-mismatch', 'high', 'warning', { onlyAtParent, onlyAtChild }));
  }
  if (parentNs.length && parentNs.length < 2) {
    flags.push(flag('single-nameserver', 'medium', 'warning', { count: parentNs.length }));
  }

  /* Each nameserver, one at a time: does it resolve, does it answer, and does
     it claim authority for the zone. A server listed in the delegation that
     answers without AA is a lame delegation, and it costs a resolver a timeout
     every time it picks that one. */
  const names = sorted([...parentNs, ...childNs]);
  const nameservers = await Promise.all(names.map(async name => {
    const [v4, v6, cname] = await Promise.all([
      session.ask({ name, type: 'A' }),
      session.ask({ name, type: 'AAAA' }),
      session.ask({ name, type: 'CNAME' }),
    ]);

    const addresses = [
      ...(v4?.message?.answers || []).filter(r => r.type === TYPE.A)
        .map(r => ({ address: r.data.address, family: 4 })),
      ...(v6?.message?.answers || []).filter(r => r.type === TYPE.AAAA)
        .map(r => ({ address: r.data.address, family: 6 })),
    ];

    /* RFC 2181 §10.3: an NS record must point at a name with address records,
       never at an alias. Resolvers are not required to follow it, and some
       simply fail. */
    const isAlias = (cname?.message?.answers || []).some(r => r.type === TYPE.CNAME) ||
      (v4?.message?.answers || []).some(r => r.type === TYPE.CNAME);

    const entry = {
      name,
      addresses,
      atParent: parentNs.includes(name),
      atZone: childNs.includes(name),
      hasGlue: walk.glue.some(g => g.name === name),
      alias: isAlias,
      ipv6: addresses.some(a => a.family === 6),
    };

    if (!addresses.length) {
      entry.status = 'unresolvable';
      return entry;
    }

    const probe = await session.ask({
      name: domain, type: 'SOA', server: addresses[0].address, rd: false, dnssec: true,
    });
    if (!probe?.message) {
      entry.status = 'silent';
      return entry;
    }
    entry.authoritative = probe.message.flags.aa;
    entry.rcode = probe.message.rcodeName;
    entry.responseMs = probe.elapsedMs;
    entry.status = probe.message.flags.aa ? 'authoritative' : 'lame';
    entry.serial = probe.message.answers.find(r => r.type === TYPE.SOA)?.data.serial ?? null;
    return entry;
  }));

  for (const server of nameservers) {
    if (server.status === 'unresolvable') {
      flags.push(flag('nameserver-unresolvable', 'high', 'failed', { nameserver: server.name }));
    } else if (server.status === 'silent') {
      flags.push(flag('nameserver-silent', 'high', 'failed', { nameserver: server.name }));
    } else if (server.status === 'lame') {
      flags.push(flag('lame-delegation', 'high', 'failed', { nameserver: server.name }));
    }
    if (server.alias) {
      flags.push(flag('ns-points-at-cname', 'medium', 'warning', { nameserver: server.name }));
    }
    if (server.atParent && !server.hasGlue && server.name.endsWith(`.${domain}`)) {
      flags.push(flag('missing-glue', 'high', 'failed', { nameserver: server.name }));
    }
  }

  const answering = nameservers.filter(server => server.status === 'authoritative');
  if (names.length && !answering.length) {
    flags.push(flag('no-authoritative-nameserver', 'critical', 'failed', {}));
  }
  if (nameservers.length && !nameservers.some(server => server.ipv6)) {
    flags.push(flag('no-ipv6-nameserver', 'low', 'warning', {}));
  }

  /* Every nameserver in one network is one power cut away from a zone that
     does not exist. The /24 is a crude proxy for that, but a useful one. */
  const networks = new Set(answering.flatMap(server => server.addresses
    .filter(entry => entry.family === 4)
    .map(entry => entry.address.split('.').slice(0, 3).join('.'))));
  if (answering.length > 1 && networks.size === 1) {
    flags.push(flag('nameservers-single-network', 'low', 'warning', { network: [...networks][0] }));
  }

  return {
    zone: walk.zone,
    trace: walk.trace,
    parentNameservers: parentNs,
    zoneNameservers: childNs,
    onlyAtParent,
    onlyAtChild,
    nameservers,
    glue: walk.glue,
    flags,
  };
}
