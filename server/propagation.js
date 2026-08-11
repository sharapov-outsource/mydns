/**
 * The same question, asked of the resolvers people actually use.
 *
 * "Has my change propagated yet" is the wrong question, and asking it is how
 * people end up waiting for something that will never happen. There is no
 * global DNS state to propagate to. There are caches, each holding whatever it
 * was told, each for as long as the TTL that came with it. A change is visible
 * at a given resolver when that resolver's copy expires — not before, and not
 * because anyone pushed anything.
 *
 * What is worth showing, then, is not a percentage. It is: who currently
 * answers what, and how much longer each of them intends to keep saying it.
 * The remaining TTL is the answer to "when will this be over".
 */

import { TYPE, PUBLIC_RESOLVERS } from '@sharapov/dns-wire';
import { flag } from '@sharapov/service-kit';

export async function inspectPropagation(session, domain, type = 'A') {
  const flags = [];

  const results = await Promise.all(PUBLIC_RESOLVERS.map(async resolver => {
    const response = await session.ask({ name: domain, type, server: resolver.address });
    if (!response?.message) {
      return {
        resolver: resolver.id, name: resolver.name, country: resolver.country,
        answered: false, values: [], ttl: null, elapsedMs: null,
      };
    }
    const message = response.message;
    const code = TYPE[type];
    const records = message.answers.filter(record => record.type === code);
    const values = records
      .map(record => record.data.address ?? record.data.ns ?? record.data.text ?? '')
      .filter(Boolean)
      .sort();

    return {
      resolver: resolver.id,
      name: resolver.name,
      country: resolver.country,
      answered: true,
      rcode: message.rcodeName,
      // Whatever is left of the TTL is how long this resolver will keep
      // answering the same way regardless of what the zone now says.
      ttl: records.length ? Math.min(...records.map(record => record.ttl)) : null,
      values,
      dnssecValidated: message.flags.ad,
      elapsedMs: response.elapsedMs,
    };
  }));

  const answered = results.filter(result => result.answered && result.values.length);
  const distinct = [...new Set(answered.map(result => result.values.join(',')))];

  if (!answered.length) {
    flags.push(flag('no-resolver-answered', 'critical', 'failed', {}));
  } else if (distinct.length > 1) {
    flags.push(flag('resolvers-disagree', 'medium', 'warning', {
      variants: distinct.length,
      groups: distinct.map(key => ({
        values: key.split(','),
        resolvers: answered.filter(result => result.values.join(',') === key)
          .map(result => result.resolver),
      })),
    }));
  }

  const silent = results.filter(result => !result.answered).map(result => result.resolver);
  if (silent.length && silent.length < results.length) {
    flags.push(flag('some-resolvers-silent', 'low', 'unknown', { resolvers: silent }));
  }

  const validating = answered.filter(result => result.dnssecValidated).map(result => result.resolver);

  return {
    type,
    resolvers: results,
    consistent: distinct.length <= 1,
    variants: distinct.length,
    maxTtl: answered.length ? Math.max(...answered.map(result => result.ttl ?? 0)) : null,
    validatedBy: validating,
    flags,
  };
}
