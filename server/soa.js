/**
 * The SOA record, asked of every authoritative server rather than one.
 *
 * The serial number is the interesting field. Secondaries are supposed to
 * follow the primary, and when one of them stops — a failed zone transfer, a
 * TSIG key that expired, a firewall rule somebody added — it keeps answering
 * happily with a stale copy of the zone. A resolver that picks that server
 * hands out yesterday's records. Nothing anywhere reports an error; the only
 * visible symptom is that the answer depends on who you ask.
 *
 * Asking all of them and comparing the serials is the whole check, and it takes
 * one round trip per server.
 *
 * The timers are checked against RFC 1912 §2.2 and RFC 2308. Those numbers are
 * old, and the defaults people copy from tutorials are older, which is why a
 * refresh of 86400 with a retry of 900 is still a common sight.
 */

import { TYPE } from '@sharapov/dns-wire';
import { flag } from '@sharapov/service-kit';

/* RFC 1912 §2.2 ranges, and RFC 2308 for the negative-caching TTL. */
const LIMITS = {
  refresh: { min: 1200, max: 43200 },
  retry: { min: 120, max: 7200 },
  expire: { min: 1209600, max: 2419200 },
  minimum: { min: 300, max: 86400 },
};

export async function inspectSoa(session, domain, nameservers) {
  const flags = [];
  const answering = nameservers.filter(server => server.addresses.length);

  const perServer = await Promise.all(answering.map(async server => {
    const response = await session.ask({
      name: domain, type: 'SOA', server: server.addresses[0].address, rd: false, dnssec: true,
    });
    const record = response?.message?.answers.find(entry => entry.type === TYPE.SOA);
    return {
      nameserver: server.name,
      address: server.addresses[0].address,
      answered: Boolean(response?.message),
      authoritative: response?.message?.flags.aa ?? null,
      serial: record?.data.serial ?? null,
      elapsedMs: response?.elapsedMs ?? null,
      soa: record?.data ?? null,
    };
  }));

  const withSerial = perServer.filter(entry => entry.serial !== null);
  const serials = [...new Set(withSerial.map(entry => entry.serial))];

  if (serials.length > 1) {
    flags.push(flag('serial-mismatch', 'high', 'warning', {
      serials: serials.sort((a, b) => a - b),
      servers: withSerial.map(entry => ({ nameserver: entry.nameserver, serial: entry.serial })),
    }));
  }

  /* The primary's record is the one whose timers are worth judging; any of them
     will do when they agree, which is the normal case. */
  const reference = withSerial[0]?.soa || null;
  const timers = {};

  if (reference) {
    for (const [field, range] of Object.entries(LIMITS)) {
      const value = reference[field];
      timers[field] = { value, ...range, ok: value >= range.min && value <= range.max };
      if (value < range.min || value > range.max) {
        // One code with the field as data, rather than eight near-identical
        // codes: a reader wants to know which timer and by how much, and a
        // script wants one identifier to match on.
        flags.push(flag('soa-timer-out-of-range', 'low', 'warning', {
          field, value, min: range.min, max: range.max,
          direction: value < range.min ? 'low' : 'high',
        }));
      }
    }

    // Retrying less often than refreshing means a failed transfer waits a full
    // refresh cycle before the next attempt, which is not what retry is for.
    if (reference.retry >= reference.refresh) {
      flags.push(flag('soa-retry-above-refresh', 'low', 'warning', {
        retry: reference.retry, refresh: reference.refresh,
      }));
    }
    // A zone that expires before a couple of refresh attempts have had time to
    // run will go dark over a long weekend.
    if (reference.expire < reference.refresh + reference.retry * 2) {
      flags.push(flag('soa-expire-too-short', 'medium', 'warning', {
        expire: reference.expire, refresh: reference.refresh,
      }));
    }
    // The RNAME is an address with the @ written as a dot. A literal @ in it is
    // a configuration mistake that quietly makes the contact unreachable.
    if (String(reference.rname).includes('@')) {
      flags.push(flag('soa-rname-has-at', 'low', 'warning', { rname: reference.rname }));
    }
  }

  const primary = reference?.mname?.toLowerCase().replace(/\.$/, '') || null;
  const listed = nameservers.map(server => server.name);
  if (primary && listed.length && !listed.includes(primary)) {
    // Perfectly legal — this is how a hidden primary is run — so it is a note,
    // not a fault.
    flags.push(flag('primary-not-in-ns-set', 'info', 'info', { primary }));
  }

  return {
    record: reference,
    primary,
    serials,
    consistent: serials.length <= 1,
    perServer,
    timers,
    flags,
  };
}
