/**
 * What is actually published in the zone.
 *
 * The inventory is the boring half. The interesting half is the two rules that
 * everybody breaks:
 *
 *   · a CNAME at the apex. RFC 1034 §3.6.2 says a name with a CNAME has no
 *     other records, and the apex always has SOA and NS, so the two cannot both
 *     be true. Several hosting panels offer it anyway — under names like "ALIAS"
 *     or "ANAME" — and some of them implement it properly at the server, while
 *     others simply write the CNAME and let resolvers work it out.
 *
 *   · a CNAME sitting beside other records at the same name. Same rule, and the
 *     failure is worse than it looks: which record a resolver returns depends
 *     on which one it asked for first.
 */

import { TYPE, typeName } from '@sharapov/dns-wire';
import { flag } from '@sharapov/service-kit';

const WANTED = ['A', 'AAAA', 'MX', 'TXT', 'NS', 'SOA', 'CAA', 'SRV', 'CNAME', 'DNSKEY', 'DS'];

/** The names a general-purpose report is worth looking at beyond the apex. */
const COMMON_SUBDOMAINS = ['www', 'mail', '_dmarc'];

function summarise(records, type) {
  const code = TYPE[type];
  return records.filter(record => record.type === code).map(record => ({
    ttl: record.ttl,
    ...record.data,
    // Raw key material and signatures are large and of no use in a summary.
    keyBytes: undefined,
    signatureBytes: undefined,
    saltBytes: undefined,
  }));
}

export async function inspectRecords(session, domain, server) {
  const flags = [];
  const at = server ? { server, rd: false } : {};

  const responses = Object.fromEntries(await Promise.all(WANTED.map(async type => {
    const response = await session.ask({ name: domain, type, dnssec: true, ...at });
    return [type, response];
  })));

  const answers = Object.fromEntries(
    Object.entries(responses).map(([type, response]) => [type, response?.message?.answers || []]));

  const apex = {};
  for (const type of WANTED) apex[type] = summarise(answers[type], type);

  /* Ask for something that certainly does not exist. A zone that answers
     NOERROR for it has a wildcard, which changes how every other answer should
     be read: "the record exists" may just mean "the wildcard matched". */
  const wildcardProbe = await session.ask({
    name: `zz--nonexistent-${Date.now().toString(36)}.${domain}`, type: 'A', ...at,
  });
  const wildcard = wildcardProbe?.message?.rcodeName === 'NOERROR' &&
    wildcardProbe.message.answers.some(record => record.type === TYPE.A);

  /* The two CNAME rules. */
  if (apex.CNAME.length) {
    const alongside = ['A', 'AAAA', 'MX', 'TXT', 'NS', 'SOA']
      .filter(type => apex[type].length);
    flags.push(flag('cname-at-apex', 'high', 'failed', { alongside }));
  }

  for (const name of COMMON_SUBDOMAINS) {
    const target = `${name}.${domain}`;
    const [cname, a, txt] = await Promise.all([
      session.ask({ name: target, type: 'CNAME', ...at }),
      session.ask({ name: target, type: 'A', ...at }),
      session.ask({ name: target, type: 'TXT', ...at }),
    ]);
    const hasCname = (cname?.message?.answers || []).some(r => r.type === TYPE.CNAME);
    if (!hasCname) continue;
    const others = [
      ...(a?.message?.answers || []).filter(r => r.type === TYPE.A && r.name.toLowerCase() === target),
      ...(txt?.message?.answers || []).filter(r => r.type === TYPE.TXT && r.name.toLowerCase() === target),
    ];
    if (others.length) {
      flags.push(flag('cname-with-other-data', 'high', 'failed', {
        name: target,
        types: [...new Set(others.map(record => typeName(record.type)))],
      }));
    }
  }

  /* Addresses. */
  if (!apex.A.length && !apex.AAAA.length && !apex.CNAME.length) {
    flags.push(flag('no-address-at-apex', 'medium', 'warning', {}));
  }
  if (apex.A.length && !apex.AAAA.length) {
    flags.push(flag('no-ipv6', 'low', 'warning', {}));
  }

  /* Time to live. A five-minute TTL on the apex is a migration setting people
     forget to put back, and it multiplies the query load on the nameservers
     for as long as it stays. */
  const apexTtl = apex.A[0]?.ttl ?? apex.AAAA[0]?.ttl ?? null;
  if (apexTtl !== null && apexTtl < 60) {
    flags.push(flag('ttl-very-short', 'low', 'warning', { ttl: apexTtl }));
  }
  if (apexTtl !== null && apexTtl > 172800) {
    flags.push(flag('ttl-very-long', 'low', 'warning', { ttl: apexTtl }));
  }

  if (wildcard) flags.push(flag('wildcard-record', 'info', 'info', {}));

  /* TXT records that were split by whoever published them: worth showing,
     because a split in the middle of a token is how an SPF record silently
     stops meaning what it says. */
  const splitTxt = apex.TXT.filter(record => record.chunks > 1);
  if (splitTxt.length) {
    flags.push(flag('txt-split-into-chunks', 'info', 'info', { count: splitTxt.length }));
  }

  return {
    apex,
    wildcard,
    counts: Object.fromEntries(Object.entries(apex).map(([type, list]) => [type, list.length])),
    flags,
  };
}
