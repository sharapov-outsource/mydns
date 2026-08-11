/**
 * Every code this service can put in a report, so `check:i18n` can insist that
 * each one has words to go with it.
 *
 * The flag identifiers are read out of the source rather than listed by hand.
 * A list maintained by hand is a list that goes stale the first time somebody
 * adds a finding in a hurry, and the symptom — a raw identifier appearing in
 * the interface — is invisible until a user sends a screenshot.
 */

import path from 'node:path';
import { codesFrom } from '@sharapov/service-kit/check-i18n';

import { CAPS } from './server/grade.js';

export default function codes(root) {
  const server = file => path.join(root, 'server', file);

  const flags = [
    'delegation.js', 'soa.js', 'records.js', 'dnssec.js', 'caa.js', 'propagation.js',
  ].flatMap(file => codesFrom(server(file), /flag\('([a-z0-9-]+)'/g));

  return {
    flag: flags,
    fd: flags,
    stage: ['resolve', 'delegation', 'soa', 'records', 'dnssec', 'caa', 'propagation', 'grade'],
    comp: ['delegation', 'dnssec', 'hygiene'],
    // Grade warnings borrow the finding's own label, so they need no keys of
    // their own — the caps do, because they name a consequence rather than a
    // finding.
    cap: [...CAPS.map(([, , reason]) => reason), 'scan-incomplete'],
    inc: [
      'zone-not-found', 'delegation-walk-incomplete', 'no-authoritative-server-answered',
      'ds-lookup-failed', 'dnskey-lookup-failed', 'dnskey-rrsig-missing', 'soa-rrsig-unavailable',
    ],
    nss: ['authoritative', 'lame', 'silent', 'unresolvable'],
    nsec: ['nsec', 'nsec3', 'none'],
    err: [
      'invalid-host', 'domain-expected', 'invalid-port', 'port-not-allowed', 'dns-failed',
      'private-address', 'unreachable', 'scan-timeout', 'stage-timeout', 'scan-failed',
      'busy', 'bad-output', 'network', 'bad-response', 'timeout',
      'zone-not-found', 'dns-timeout', 'dns-network', 'dns-unreachable',
    ],
    sev: ['critical', 'high', 'medium', 'low', 'info'],
    st: ['ok', 'safe', 'warning', 'weak', 'missing', 'unknown', 'partial', 'failed', 'info', 'vulnerable'],
  };
}
