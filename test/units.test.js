/**
 * The parts of the checker that decide what a report says.
 *
 * The DNS wire format is tested in @sharapov/dns-wire, and the routes are
 * covered by the smoke test. What is left — and what is worth pinning down — is
 * the reasoning: which findings a section produces from which answers, and what
 * the grade does with them. In particular that an unanswered probe never turns
 * into a verdict.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { grade } from '../server/grade.js';
import { inspectSoa } from '../server/soa.js';
import { inspectCaa } from '../server/caa.js';
import { inspectPropagation } from '../server/propagation.js';
import { TYPE } from '@sharapov/dns-wire';

/* ------------------------------------------------------------------ *
 * Fixtures
 * ------------------------------------------------------------------ */

/** A session that answers from a table instead of from the network. */
function stubSession(table) {
  return {
    ask: async options => {
      const key = `${options.name}|${options.type}|${options.server || 'default'}`;
      const loose = `${options.name}|${options.type}`;
      const answer = table[key] ?? table[loose] ?? null;
      return typeof answer === 'function' ? answer(options) : answer;
    },
    stats: { queries: 0, failures: 0 },
    failures: [],
  };
}

const response = (answers, { aa = true, rcode = 'NOERROR', authorities = [] } = {}) => ({
  server: '203.0.113.1',
  elapsedMs: 12,
  message: {
    flags: { aa, tc: false, rd: false, ra: false, ad: false, cd: false, qr: true },
    rcodeName: rcode,
    answers,
    authorities,
    additionals: [],
  },
});

const soaRecord = (name, overrides = {}) => ({
  name,
  type: TYPE.SOA,
  typeName: 'SOA',
  ttl: 3600,
  data: {
    mname: 'ns1.example.com',
    rname: 'hostmaster.example.com',
    serial: 2026081101,
    refresh: 7200,
    retry: 3600,
    expire: 1209600,
    minimum: 3600,
    ...overrides,
  },
});

const nameserver = (name, address = '203.0.113.1') => ({
  name, addresses: [{ address, family: 4 }], status: 'authoritative',
});

/** A report skeleton that grades cleanly, for tests that perturb one thing. */
function healthyReport(overrides = {}) {
  return {
    flags: [],
    delegation: {
      nameservers: [
        { name: 'ns1.example.com', status: 'authoritative', alias: false, ipv6: true, addresses: [{ address: '203.0.113.1', family: 4 }] },
        { name: 'ns2.example.com', status: 'authoritative', alias: false, ipv6: true, addresses: [{ address: '198.51.100.1', family: 4 }] },
      ],
      onlyAtParent: [],
      onlyAtChild: [],
    },
    dnssec: {
      enabled: true,
      keys: [{ keyTag: 1234, role: 'KSK', algorithmName: 'ECDSAP256SHA256', bits: 256, secure: true }],
      ds: [{ keyTag: 1234, digestType: 2 }],
      signatures: [{ valid: true, life: { days: 20, lifetimeDays: 30, fraction: 0.66 } }],
      chain: { dsMatchesKsk: true, dnskeySigned: true, zoneDataSigned: true },
      nsec: { kind: 'NSEC3', iterations: 0 },
      signaturesAtRisk: false,
    },
    records: { flags: [], counts: {} },
    soa: { consistent: true, timers: {} },
    caa: { present: true, iodef: ['mailto:security@example.com'] },
    ...overrides,
  };
}

/* ------------------------------------------------------------------ *
 * The grade
 * ------------------------------------------------------------------ */

test('a well-run signed zone reaches the top of the scale', () => {
  const result = grade(healthyReport());
  assert.ok(['A', 'A+'].includes(result.grade), `${result.grade} (${result.score})`);
  assert.equal(result.components.delegation.score, 100);
  assert.equal(result.components.dnssec.score, 100);
});

test('an unsigned zone is not failed for being unsigned', () => {
  const report = healthyReport({
    dnssec: {
      enabled: false, keys: [], ds: [], signatures: [],
      chain: { dsMatchesKsk: null, dnskeySigned: null, zoneDataSigned: null }, nsec: null,
    },
  });
  const result = grade(report);
  assert.equal(result.components.dnssec.score, 60);
  assert.ok(['A', 'B'].includes(result.grade), result.grade);
});

test('a broken DNSSEC chain fails the zone outright', () => {
  const report = healthyReport();
  report.dnssec.chain.dsMatchesKsk = false;
  report.flags = [{ id: 'ds-digest-mismatch', severity: 'critical', status: 'failed' }];
  const result = grade(report);
  assert.equal(result.grade, 'F');
  assert.ok(result.caps.some(cap => cap.reason === 'dnssec-chain-broken'));
});

test('a lame delegation caps the grade at C however good the rest is', () => {
  const report = healthyReport();
  report.delegation.nameservers[1].status = 'lame';
  report.flags = [{ id: 'lame-delegation', severity: 'high', status: 'failed' }];
  const result = grade(report);
  assert.equal(result.grade, 'C');
  assert.ok(result.caps.some(cap => cap.reason === 'lame-delegation'));
});

test('an incomplete check gets no letter at all', () => {
  const report = healthyReport({ incomplete: ['no-authoritative-server-answered'] });
  const result = grade(report);
  assert.equal(result.grade, '?');
  assert.equal(result.reason, 'scan-incomplete');
  // The components are still reported: they are what makes the "?" explainable.
  assert.equal(typeof result.score, 'number');
});

test('an incomplete check outranks findings that would otherwise fail it', () => {
  const report = healthyReport({
    incomplete: ['dnskey-lookup-failed'],
    flags: [{ id: 'ds-digest-mismatch', severity: 'critical', status: 'failed' }],
  });
  // Nothing was established, so nothing is asserted — not even the bad news.
  assert.equal(grade(report).grade, '?');
});

test('ECDSA is not mistaken for DSA', () => {
  // "ECDSAP256SHA256" contains the substring "DSA"; a name-matching check
  // marked the most widely deployed modern algorithm as broken.
  const report = healthyReport();
  assert.equal(grade(report).components.dnssec.score, 100);
});

test('a genuinely weak algorithm does lower the DNSSEC score', () => {
  const report = healthyReport();
  report.dnssec.keys = [{ keyTag: 1, role: 'KSK', algorithmName: 'RSASHA1', bits: 2048, secure: false }];
  assert.ok(grade(report).components.dnssec.score < 100);
});

test('the bonus needs a clean report, not merely a high score', () => {
  const withWarning = healthyReport({
    flags: [{ id: 'no-ipv6-nameserver', severity: 'low', status: 'warning' }],
  });
  const result = grade(withWarning);
  assert.notEqual(result.grade, 'A+');
  assert.deepEqual(result.warnings, ['no-ipv6-nameserver']);
});

test('one nameserver is a finding whatever else is right', () => {
  const report = healthyReport();
  report.delegation.nameservers = [report.delegation.nameservers[0]];
  report.flags = [{ id: 'single-nameserver', severity: 'medium', status: 'warning' }];
  const result = grade(report);
  assert.ok(['B', 'C', 'D'].includes(result.grade), result.grade);
});

/* ------------------------------------------------------------------ *
 * SOA
 * ------------------------------------------------------------------ */

test('serials that disagree are reported, with which server said what', async () => {
  const session = stubSession({
    'example.com|SOA|203.0.113.1': response([soaRecord('example.com', { serial: 2 })]),
    'example.com|SOA|198.51.100.1': response([soaRecord('example.com', { serial: 1 })]),
  });
  const result = await inspectSoa(session, 'example.com', [
    nameserver('ns1.example.com', '203.0.113.1'),
    nameserver('ns2.example.com', '198.51.100.1'),
  ]);

  assert.equal(result.consistent, false);
  const finding = result.flags.find(entry => entry.id === 'serial-mismatch');
  assert.ok(finding);
  assert.deepEqual(finding.serials, [1, 2]);
  assert.equal(finding.servers.length, 2);
});

test('matching serials produce no finding', async () => {
  const session = stubSession({
    'example.com|SOA|203.0.113.1': response([soaRecord('example.com')]),
    'example.com|SOA|198.51.100.1': response([soaRecord('example.com')]),
  });
  const result = await inspectSoa(session, 'example.com', [
    nameserver('ns1.example.com', '203.0.113.1'),
    nameserver('ns2.example.com', '198.51.100.1'),
  ]);
  assert.equal(result.consistent, true);
  assert.equal(result.flags.filter(entry => entry.id === 'serial-mismatch').length, 0);
});

test('a server that did not answer is recorded, not counted as agreeing', async () => {
  const session = stubSession({
    'example.com|SOA|203.0.113.1': response([soaRecord('example.com')]),
    'example.com|SOA|198.51.100.1': null,
  });
  const result = await inspectSoa(session, 'example.com', [
    nameserver('ns1.example.com', '203.0.113.1'),
    nameserver('ns2.example.com', '198.51.100.1'),
  ]);
  const silent = result.perServer.find(entry => entry.address === '198.51.100.1');
  assert.equal(silent.answered, false);
  assert.equal(silent.serial, null);
  // One serial seen, from one server: consistent, because there is nothing to
  // disagree with — the silence is in perServer for the reader to see.
  assert.equal(result.consistent, true);
});

test('a retry longer than refresh is caught', async () => {
  const session = stubSession({
    'example.com|SOA|203.0.113.1': response([soaRecord('example.com', { refresh: 3600, retry: 7200 })]),
  });
  const result = await inspectSoa(session, 'example.com', [nameserver('ns1.example.com')]);
  assert.ok(result.flags.some(entry => entry.id === 'soa-retry-above-refresh'));
});

test('an @ in the contact address is caught', async () => {
  const session = stubSession({
    'example.com|SOA|203.0.113.1': response([soaRecord('example.com', { rname: 'admin@example.com' })]),
  });
  const result = await inspectSoa(session, 'example.com', [nameserver('ns1.example.com')]);
  assert.ok(result.flags.some(entry => entry.id === 'soa-rname-has-at'));
});

test('out-of-range timers name the field rather than multiplying codes', async () => {
  const session = stubSession({
    'example.com|SOA|203.0.113.1': response([soaRecord('example.com', { refresh: 60, expire: 60 })]),
  });
  const result = await inspectSoa(session, 'example.com', [nameserver('ns1.example.com')]);
  const timers = result.flags.filter(entry => entry.id === 'soa-timer-out-of-range');
  assert.equal(timers.length, 2);
  assert.deepEqual(timers.map(entry => entry.field).sort(), ['expire', 'refresh']);
});

/* ------------------------------------------------------------------ *
 * CAA
 * ------------------------------------------------------------------ */

const caaRecord = (name, tag, value, critical = false) => ({
  name, type: TYPE.CAA, typeName: 'CAA', ttl: 3600,
  data: { flags: critical ? 128 : 0, critical, tag, value },
});

test('CAA is inherited from the closest parent that has it', async () => {
  const session = stubSession({
    'www.example.com|CAA': response([]),
    'example.com|CAA': response([caaRecord('example.com', 'issue', 'letsencrypt.org')]),
  });
  const result = await inspectCaa(session, 'www.example.com');
  assert.equal(result.present, true);
  assert.equal(result.inheritedFrom, 'example.com');
  assert.deepEqual(result.issue, ['letsencrypt.org']);
});

test('no CAA anywhere up the tree is a finding', async () => {
  const session = stubSession({});
  const result = await inspectCaa(session, 'www.example.com');
  assert.equal(result.present, false);
  assert.ok(result.flags.some(entry => entry.id === 'caa-missing'));
});

test('a critical unknown tag is treated as blocking, an unknown one is not', async () => {
  const critical = await inspectCaa(stubSession({
    'example.com|CAA': response([caaRecord('example.com', 'weird', 'x', true)]),
  }), 'example.com');
  assert.ok(critical.flags.some(entry => entry.id === 'caa-unknown-critical-tag'));

  const plain = await inspectCaa(stubSession({
    'example.com|CAA': response([caaRecord('example.com', 'weird', 'x', false)]),
  }), 'example.com');
  assert.ok(plain.flags.some(entry => entry.id === 'caa-unknown-tag'));
});

test('a lone semicolon is read as "nobody may issue"', async () => {
  const result = await inspectCaa(stubSession({
    'example.com|CAA': response([caaRecord('example.com', 'issue', ';')]),
  }), 'example.com');
  assert.ok(result.flags.some(entry => entry.id === 'caa-forbids-issuance'));
});

/* ------------------------------------------------------------------ *
 * Propagation
 * ------------------------------------------------------------------ */

const aRecord = (name, address) => ({
  name, type: TYPE.A, typeName: 'A', ttl: 300, data: { address },
});

test('resolvers holding different answers are grouped, not averaged', async () => {
  const agree = response([aRecord('example.com', '203.0.113.1')]);
  const differ = response([aRecord('example.com', '198.51.100.9')]);
  const session = stubSession({
    'example.com|A|8.8.8.8': agree,
    'example.com|A|1.1.1.1': agree,
    'example.com|A|9.9.9.9': differ,
    'example.com|A|208.67.222.222': agree,
    'example.com|A|77.88.8.8': agree,
    'example.com|A|94.140.14.14': agree,
  });
  const result = await inspectPropagation(session, 'example.com', 'A');
  assert.equal(result.consistent, false);
  const finding = result.flags.find(entry => entry.id === 'resolvers-disagree');
  assert.equal(finding.variants, 2);
  assert.ok(finding.groups.some(group => group.resolvers.includes('quad9')));
});

test('a silent resolver is listed rather than counted as disagreeing', async () => {
  const answer = response([aRecord('example.com', '203.0.113.1')]);
  const session = stubSession({
    'example.com|A|8.8.8.8': answer,
    'example.com|A|1.1.1.1': answer,
    'example.com|A|9.9.9.9': null,
    'example.com|A|208.67.222.222': answer,
    'example.com|A|77.88.8.8': answer,
    'example.com|A|94.140.14.14': answer,
  });
  const result = await inspectPropagation(session, 'example.com', 'A');
  assert.equal(result.consistent, true);
  const finding = result.flags.find(entry => entry.id === 'some-resolvers-silent');
  assert.deepEqual(finding.resolvers, ['quad9']);
});

test('nobody answering is a failure, not a consensus', async () => {
  const result = await inspectPropagation(stubSession({}), 'example.com', 'A');
  assert.ok(result.flags.some(entry => entry.id === 'no-resolver-answered'));
});

test('the remaining TTL is reported, because that is the actual answer', async () => {
  const answer = response([{ ...aRecord('example.com', '203.0.113.1'), ttl: 120 }]);
  const session = stubSession({ 'example.com|A|8.8.8.8': answer });
  const result = await inspectPropagation(session, 'example.com', 'A');
  const google = result.resolvers.find(entry => entry.resolver === 'google');
  assert.equal(google.ttl, 120);
});
