/**
 * mydns — the HTTP layer, which is now almost nothing.
 *
 * Routing, content negotiation, the content security policy, rate limits, the
 * cache, the event stream and the head of the page all live in
 * @sharapov/service-kit. What is left here is the part that is actually about
 * DNS: what a target looks like, how to scan one, and which words to put next
 * to which codes.
 *
 *   GET /                          the page
 *   GET /<domain>                  page for a domain (JSON for console clients)
 *   GET /<domain>?output=json|yaml data instead of the page
 *   GET /api/<domain>              always data
 *   GET /api/stream/<domain>       the same scan as server-sent events
 *   GET /healthz                   liveness probe
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createService, parseDomain, localizeReport, pace } from '@sharapov/service-kit';
import { setPacer, PUBLIC_RESOLVERS, defaultResolver } from '@sharapov/dns-wire';

import { scan, STAGES } from './scan.js';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

/* One clock for every outbound socket the process opens. */
setPacer(pace);

const service = await createService({
  slug: 'mydns',
  name: 'DNS Check',
  domain: 'mydns.sharapov.biz',
  port: 3026,
  root: ROOT,
  stages: STAGES,

  parse: raw => parseDomain(raw),
  pathFor: target => target.host,
  cacheKey: target => target.host,
  run: (target, options) => scan(target, options),

  errors: ['zone-not-found', 'dns-timeout', 'dns-network', 'dns-unreachable'],

  examples: ['cloudflare.com', 'sharapov.biz', 'ietf.org'],

  usage: {
    checks: [
      'delegation from the root, both sides of it compared',
      'SOA serials across every authoritative server',
      'DNSSEC chain, verified here rather than delegated to a resolver',
      'CAA, inherited from the closest parent that has it',
      'the answer six public resolvers are currently giving',
    ],
    resolvers: PUBLIC_RESOLVERS.map(resolver => resolver.id),
  },

  health: () => ({ resolver: defaultResolver() }),

  localize: (report, lang) => localizeReport(report, service.i18n, lang, (out, language) => {
    const { tCode } = service.i18n;

    if (Array.isArray(out.incomplete)) {
      out.incompleteLabels = out.incomplete.map(code => tCode(language, 'inc', code));
    }
    for (const server of out.delegation?.nameservers || []) {
      server.statusLabel = tCode(language, 'nss', server.status);
    }
    if (out.dnssec?.nsec?.kind) {
      out.dnssec.nsec.kindLabel = tCode(language, 'nsec', out.dnssec.nsec.kind.toLowerCase());
    }
  }),
});

await service.start();

export { service };
