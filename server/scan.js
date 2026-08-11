/**
 * The scan: every check, run in an order that respects what depends on what,
 * and assembled into one report.
 *
 * The delegation walk comes first and is not optional, because everything after
 * it wants to talk to the zone's own servers rather than to a cache. Once the
 * nameservers are known, the SOA comparison, the record inventory and the
 * DNSSEC chain are independent of each other and run together. Propagation is
 * the odd one out — it deliberately asks caches, because caches are the thing
 * it is measuring.
 */

import {
  withDeadline, incomplete as collectIncomplete, sortFlags,
} from '@sharapov/service-kit';

import { createSession } from './session.js';
import { walkDelegation, inspectDelegation } from './delegation.js';
import { inspectSoa } from './soa.js';
import { inspectRecords } from './records.js';
import { inspectDnssec } from './dnssec.js';
import { inspectCaa } from './caa.js';
import { inspectPropagation } from './propagation.js';
import { grade } from './grade.js';

export const STAGES = [
  'resolve', 'delegation', 'soa', 'records', 'dnssec', 'caa', 'propagation', 'grade',
];

const SCAN_TIMEOUT = Number(process.env.SCAN_TIMEOUT_MS || 45000);

export async function scan(target, { onProgress = () => {} } = {}) {
  return withDeadline(run(target, onProgress), SCAN_TIMEOUT);
}

async function run(target, onProgress) {
  const domain = target.host;
  const started = Date.now();
  const session = createSession();
  const progress = (stage, extra = {}) =>
    onProgress({ stage, elapsedMs: Date.now() - started, ...extra });

  /* ---------------- resolve ---------------- */
  progress('resolve');
  const walk = await walkDelegation(session, domain);
  progress('resolve', { done: true, zone: walk.zone });

  /* ---------------- delegation ---------------- */
  progress('delegation');
  const delegation = await inspectDelegation(session, domain, walk);
  const authoritative = delegation.nameservers.filter(server => server.status === 'authoritative');
  progress('delegation', {
    done: true,
    nameservers: delegation.nameservers.length,
    authoritative: authoritative.length,
  });

  /* A name that does not exist has nothing left to inspect, and every check
     below would spend a round trip discovering that again. */
  const missing = delegation.flags.some(entry => entry.id === 'nxdomain' || entry.id === 'no-delegation');
  if (missing) {
    const flags = sortFlags(delegation.flags);
    return assemble({
      domain, started, session, delegation,
      soa: emptySoa(), records: emptyRecords(), dnssec: emptyDnssec(),
      caa: emptyCaa(), propagation: null, flags,
      incomplete: ['zone-not-found'],
    });
  }

  /* ---------------- the checks that only need the nameservers ---------------- */
  const server = authoritative[0]?.addresses[0]?.address;

  progress('soa');
  const soa = await inspectSoa(session, domain, delegation.nameservers);
  progress('soa', { done: true, serials: soa.serials.length });

  progress('records');
  const records = await inspectRecords(session, domain, server);
  progress('records', { done: true, types: Object.keys(records.counts).length });

  progress('dnssec');
  const dnssec = await inspectDnssec(session, domain, {
    parentDs: walk.dsRecords,
    nameservers: delegation.nameservers,
  });
  progress('dnssec', { done: true, enabled: dnssec.enabled });

  progress('caa');
  const caa = await inspectCaa(session, domain);
  progress('caa', { done: true, present: caa.present });

  progress('propagation');
  const propagation = await inspectPropagation(session, domain,
    records.counts.A ? 'A' : records.counts.AAAA ? 'AAAA' : 'NS');
  progress('propagation', { done: true, consistent: propagation.consistent });

  const flags = sortFlags([
    ...delegation.flags, ...soa.flags, ...records.flags,
    ...dnssec.flags, ...caa.flags, ...propagation.flags,
  ]);

  const report = assemble({
    domain, started, session, delegation, soa, records, dnssec, caa, propagation, flags,
    incomplete: collectIncomplete([
      ...(walk.complete ? [] : ['delegation-walk-incomplete']),
      ...(dnssec.incomplete || []),
      ...(authoritative.length ? [] : ['no-authoritative-server-answered']),
    ]),
  });

  progress('grade', { grade: report.grade.grade });
  return report;
}

function assemble({
  domain, started, session, delegation, soa, records, dnssec, caa, propagation,
  flags, incomplete,
}) {
  const partial = {
    domain,
    zone: delegation.zone,
    delegation,
    soa,
    records,
    dnssec,
    caa,
    propagation,
    flags,
    incomplete: incomplete?.length ? incomplete : undefined,
  };

  return {
    ...partial,
    grade: grade(partial),
    meta: {
      elapsedMs: Date.now() - started,
      queries: session.stats.queries,
      unanswered: session.failures,
      cached: false,
      generatedAt: new Date().toISOString(),
      engine: 'mydns/1.0',
    },
  };
}

/* The empty shapes, so a report for a name that does not exist has the same
   keys as one for a name that does. A consumer should never have to guess. */
const emptySoa = () => ({
  record: null, primary: null, serials: [], consistent: null, perServer: [], timers: {}, flags: [],
});
const emptyRecords = () => ({ apex: {}, wildcard: false, counts: {}, flags: [] });
const emptyDnssec = () => ({
  enabled: false, ds: [], keys: [], signatures: [],
  chain: { dsMatchesKsk: null, dnskeySigned: null, zoneDataSigned: null }, nsec: null, flags: [],
});
const emptyCaa = () => ({
  present: false, inheritedFrom: null, issue: [], issueWild: [], iodef: [], flags: [],
});
