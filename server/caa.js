/**
 * CAA — who is allowed to issue certificates for this name.
 *
 * The record is inherited: a certificate authority checking `www.example.com`
 * climbs the tree until it finds a CAA record, and the first one it meets wins.
 * So a report that only looks at the name it was given will say "no CAA" for a
 * host that is in fact covered by one two labels up.
 *
 * Since September 2017 every authority in the CA/Browser Forum baseline has had
 * to honour it, which makes an empty CAA set a real, if quiet, gap: any
 * authority anywhere may issue for the name, and the first you hear of it is a
 * certificate you did not ask for.
 */

import { TYPE, ancestors } from '@sharapov/dns-wire';
import { flag } from '@sharapov/service-kit';

export async function inspectCaa(session, domain) {
  const flags = [];
  let found = null;

  for (const name of ancestors(domain)) {
    if (!name) break;                                  // do not ask the root
    const response = await session.ask({ name, type: 'CAA', dnssec: true });
    const records = (response?.message?.answers || []).filter(record => record.type === TYPE.CAA);
    if (records.length) {
      found = { name, records: records.map(record => ({ ttl: record.ttl, ...record.data })) };
      break;
    }
  }

  if (!found) {
    flags.push(flag('caa-missing', 'medium', 'missing', {}));
    return { present: false, inheritedFrom: null, issue: [], issueWild: [], iodef: [], flags };
  }

  const valueOf = tag => found.records.filter(record => record.tag === tag).map(record => record.value);
  const issue = valueOf('issue');
  const issueWild = valueOf('issuewild');
  const iodef = valueOf('iodef');

  /* A lone semicolon forbids issuance outright. It is a deliberate and useful
     setting for a domain that should never have a certificate — and a
     catastrophic typo for one that should. */
  const forbidsAll = issue.every(value => value.trim() === ';') && issue.length > 0;
  if (forbidsAll) flags.push(flag('caa-forbids-issuance', 'info', 'info', {}));

  if (!iodef.length) flags.push(flag('caa-no-iodef', 'low', 'warning', {}));
  if (!issueWild.length && issue.length) {
    // Without issuewild, the issue set governs wildcards too — which is fine,
    // and worth stating rather than leaving the reader to look it up.
    flags.push(flag('caa-no-issuewild', 'info', 'info', {}));
  }

  const unknownTags = found.records
    .filter(record => !['issue', 'issuewild', 'iodef', 'issuemail', 'contactemail', 'contactphone'].includes(record.tag))
    .map(record => record.tag);
  for (const tag of unknownTags) {
    const critical = found.records.find(record => record.tag === tag)?.critical;
    // A critical flag on a tag nobody understands means an authority that does
    // not know it MUST refuse to issue at all.
    flags.push(flag(critical ? 'caa-unknown-critical-tag' : 'caa-unknown-tag',
      critical ? 'high' : 'low', critical ? 'failed' : 'warning', { tag }));
  }

  return {
    present: true,
    inheritedFrom: found.name === domain ? null : found.name,
    at: found.name,
    records: found.records,
    issue,
    issueWild,
    iodef,
    flags,
  };
}
