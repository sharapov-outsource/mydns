/**
 * One scan's worth of queries.
 *
 * A full report asks the same question more than once — the NS set is needed by
 * the delegation walk, by the SOA comparison and by the record inventory — and
 * asking three times would be rude to the servers and slow for the visitor. So
 * every query goes through here and is remembered for the life of the scan.
 *
 * The other job is bookkeeping. Anything that did not answer is recorded, and
 * that record is what the report uses to decide whether it is allowed to hand
 * out a grade. A question nobody answered is not the same as a question whose
 * answer was "no", and the two must never be flattened into each other.
 */

import { query, defaultResolver } from '@sharapov/dns-wire';

export function createSession({ timeout = Number(process.env.DNS_TIMEOUT_MS || 4000) } = {}) {
  const cache = new Map();
  const failures = [];
  let queries = 0;

  const key = options =>
    [options.name, options.type, options.server || 'default', options.rd !== false,
      Boolean(options.dnssec), Boolean(options.cd), Boolean(options.tcp)].join('|').toLowerCase();

  /**
   * Asks, once. Returns null when nothing answered — never throws, because a
   * silent nameserver is a finding rather than an accident.
   */
  async function ask(options) {
    const cacheKey = key(options);
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    const pending = (async () => {
      queries++;
      try {
        return await query({
          server: defaultResolver(),
          timeout,
          ...options,
        });
      } catch (err) {
        failures.push({
          name: options.name,
          type: String(options.type),
          server: options.server || defaultResolver(),
          error: err.code || err.message,
        });
        return null;
      }
    })();

    cache.set(cacheKey, pending);
    return pending;
  }

  /** The same question at several servers, all at once. */
  async function askAll(servers, options) {
    return Promise.all(servers.map(server => ask({ ...options, server })));
  }

  return {
    ask,
    askAll,
    get stats() {
      return { queries, failures: failures.length };
    },
    get failures() {
      return failures;
    },
  };
}
