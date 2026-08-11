/**
 * The letter.
 *
 * Three components, weighted, then a set of caps for the specific faults that
 * no amount of good configuration elsewhere makes acceptable:
 *
 *   delegation  40%  — can the world find this zone at all, reliably
 *   dnssec      35%  — is the chain from the root intact
 *   hygiene     25%  — is the zone itself well formed
 *
 * Delegation carries the most weight because it is the only part whose failure
 * is total: a lame nameserver is a coin flip on every lookup, and no DNSSEC
 * configuration compensates for a zone that half the internet cannot resolve.
 *
 * Unsigned zones are not failed. DNSSEC deployment is a minority position, and
 * a report that grades every unsigned domain an F is a report nobody reads
 * twice. An unsigned zone scores a fixed 60 on that component — enough to keep
 * a well-run zone in the As at the top of the range while making clear where
 * the missing marks are — but a *broken* chain is capped hard, because a broken
 * chain takes the domain off the internet for every validating resolver.
 *
 * And when a probe did not come back, there is no grade at all. That rule was
 * bought at the price of one very wrong E for a bank whose rate limiter simply
 * refused forty connections in a row.
 */

import { letterFor, worstGrade, weighted, sortFlags } from '@sharapov/service-kit';

/** Findings that cap the grade no matter what else is right. */
export const CAPS = [
  ['nxdomain', 'F', 'domain-does-not-exist'],
  ['no-delegation', 'F', 'no-delegation'],
  ['no-authoritative-nameserver', 'F', 'no-authoritative-nameserver'],
  ['ds-without-dnskey', 'F', 'dnssec-chain-broken'],
  ['ds-digest-mismatch', 'F', 'dnssec-chain-broken'],
  ['ds-points-at-missing-key', 'F', 'dnssec-chain-broken'],
  ['dnskey-signature-invalid', 'F', 'dnssec-chain-broken'],
  ['zone-data-signature-invalid', 'F', 'dnssec-chain-broken'],
  ['signature-expired', 'F', 'signature-expired'],
  ['dnskey-not-signed', 'F', 'dnssec-chain-broken'],
  ['zone-data-not-signed', 'F', 'dnssec-chain-broken'],
  ['cname-at-apex', 'C', 'cname-at-apex'],
  ['lame-delegation', 'C', 'lame-delegation'],
  ['nameserver-silent', 'C', 'nameserver-not-answering'],
  ['ns-set-mismatch', 'C', 'ns-set-mismatch'],
  ['serial-mismatch', 'C', 'serial-mismatch'],
  ['missing-glue', 'C', 'missing-glue'],
  ['single-nameserver', 'B', 'single-nameserver'],
  ['cname-with-other-data', 'B', 'cname-with-other-data'],
  ['signed-but-no-ds', 'B', 'signed-but-no-ds'],
  ['weak-key-algorithm', 'B', 'weak-dnssec-algorithm'],
  ['rsa-key-too-short', 'B', 'weak-dnssec-key'],
];

/** Things worth mentioning that do not, on their own, lower a grade. */
const WARNINGS = [
  'no-ipv6-nameserver', 'nameservers-single-network', 'no-ipv6', 'caa-missing',
  'caa-no-iodef', 'nsec3-iterations-above-zero', 'nsec-zone-walkable',
  'ds-weak-digest', 'signatures-expiring', 'ttl-very-short', 'ttl-very-long',
  'resolvers-disagree', 'ns-points-at-cname', 'primary-not-in-ns-set',
  'no-key-signing-key', 'soa-expire-too-short',
];

function delegationScore(delegation) {
  const servers = delegation.nameservers || [];
  if (!servers.length) return 0;

  const authoritative = servers.filter(server => server.status === 'authoritative');
  let score = 100;

  // Every server that does not answer authoritatively is a share of lookups
  // that goes slow or nowhere.
  const broken = servers.length - authoritative.length;
  score -= Math.min(60, broken * 30);

  if (authoritative.length < 2) score -= 25;
  if (delegation.onlyAtParent?.length || delegation.onlyAtChild?.length) score -= 25;
  if (servers.some(server => server.alias)) score -= 10;
  if (!servers.some(server => server.ipv6)) score -= 8;

  const networks = new Set(authoritative.flatMap(server => server.addresses
    .filter(entry => entry.family === 4)
    .map(entry => entry.address.split('.').slice(0, 3).join('.'))));
  if (authoritative.length > 1 && networks.size === 1) score -= 8;

  return Math.max(0, Math.min(100, score));
}

function dnssecScore(dnssec) {
  if (!dnssec.enabled) return 60;
  const { chain } = dnssec;
  if (chain.dsMatchesKsk === false || chain.dnskeySigned === false ||
      chain.zoneDataSigned === false) {
    return 0;
  }
  let score = 100;
  if (chain.dsMatchesKsk === null) score -= 30;      // signed, unanchored
  /* Whether an algorithm is still fit to sign with comes from the table in
     dns-wire, not from pattern-matching its name: "ECDSAP256SHA256" contains
     the substring "DSA", and a regex looking for the old DSA algorithm marks
     the most widely deployed modern one as broken. */
  if (dnssec.keys.some(key => key.secure === false)) score -= 30;
  if (dnssec.keys.some(key => key.bits && key.bits < 2048 && key.algorithmName?.startsWith('RSA'))) score -= 20;
  if (dnssec.ds.some(entry => entry.digestType === 1)) score -= 10;
  if (dnssec.nsec?.kind === 'NSEC3' && dnssec.nsec.iterations > 0) score -= 5;
  if (dnssec.signaturesAtRisk) score -= 20;
  return Math.max(0, Math.min(100, score));
}

function hygieneScore({ records, soa, caa }) {
  let score = 100;

  if (records.flags.some(entry => entry.id === 'cname-at-apex')) score -= 40;
  if (records.flags.some(entry => entry.id === 'cname-with-other-data')) score -= 25;
  if (records.flags.some(entry => entry.id === 'no-address-at-apex')) score -= 10;
  if (records.flags.some(entry => entry.id === 'no-ipv6')) score -= 8;

  if (!soa.consistent) score -= 30;
  const badTimers = Object.values(soa.timers || {}).filter(timer => timer && !timer.ok).length;
  score -= Math.min(15, badTimers * 5);

  if (!caa.present) score -= 12;
  else if (!caa.iodef.length) score -= 3;

  return Math.max(0, Math.min(100, score));
}

/**
 * @param {object} report the assembled sections
 * @returns {object} the grade, the three components, and every adjustment that
 *                   was applied — so the number can be argued with
 */
export function grade(report) {
  const flags = sortFlags(report.flags || []);
  const present = new Set(flags.map(entry => entry.id));

  const components = {
    delegation: { key: 'delegation', score: delegationScore(report.delegation), weight: 0.4 },
    dnssec: { key: 'dnssec', score: dnssecScore(report.dnssec), weight: 0.35 },
    hygiene: { key: 'hygiene', score: hygieneScore(report), weight: 0.25 },
  };

  const score = weighted(Object.values(components));
  let letter = letterFor(score);

  /* Declared before the early return below: finish() reads them, and the
     incomplete path goes through finish() too. */
  const caps = [];
  const warnings = WARNINGS.filter(id => present.has(id));

  /* Nothing was measured properly, so nothing is graded. This comes after the
     components are computed, because the numbers are still worth showing —
     it is the letter that would be a lie. */
  if (report.incomplete?.length) {
    return finish('?', 'scan-incomplete');
  }

  for (const [id, cap, reason] of CAPS) {
    if (!present.has(id)) continue;
    caps.push({ grade: cap, reason });
    letter = worstGrade(letter, cap);
  }

  /* The bonus. A zone gets it for being both correctly delegated and
     correctly signed, with nothing outstanding — which is a high bar, and
     ought to be. */
  if (letter === 'A' && !warnings.length && report.dnssec.enabled &&
      report.dnssec.chain.dsMatchesKsk && report.dnssec.chain.dnskeySigned) {
    letter = 'A+';
  }

  return finish(letter);

  function finish(finalGrade, reason) {
    return {
      grade: finalGrade,
      score,
      reason,
      components,
      caps,
      warnings,
      methodology: 'mydns/1.0 — delegation 40%, DNSSEC 35%, zone hygiene 25%',
    };
  }
}
