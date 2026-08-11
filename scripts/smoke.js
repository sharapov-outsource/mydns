/**
 * Smoke test: boots the server and exercises its routes.
 *
 * Nothing here depends on a particular domain existing. The checks use
 * malformed targets, refused formats and the service routes, all of which are
 * answered without a single packet leaving the box. The one route that does
 * start a check is asserted only on the shape of the stream — it opens, it
 * says which stages are coming, and it ends — because whether the box has
 * outbound UDP/53 is not what this test is for. The DNS codec has its own
 * tests, and the checker has unit tests that stub the session.
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 3399;
const base = `http://127.0.0.1:${PORT}`;

const server = spawn(process.execPath, ['server/index.js'], {
  cwd: root,
  env: {
    ...process.env,
    PORT: String(PORT),
    HOSTNAME: '127.0.0.1',
    TRUST_PROXY: 'false',
    LOG_LEVEL: 'warn',
    // Keep the one live route short whatever the network is doing.
    DNS_TIMEOUT_MS: '400',
    SCAN_TIMEOUT_MS: '8000',
  },
  stdio: ['ignore', 'pipe', 'pipe'],
});

let serverOutput = '';
server.stdout.on('data', chunk => { serverOutput += chunk; });
server.stderr.on('data', chunk => { serverOutput += chunk; });

const failures = [];
let checks = 0;

function check(name, condition, detail) {
  checks++;
  if (condition) return;
  failures.push(detail ? `${name} — ${detail}` : name);
}

async function waitForServer(attempts = 40) {
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await fetch(`${base}/healthz`);
      if (response.ok) return;
    } catch { /* not up yet */ }
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error('server never answered /healthz\n' + serverOutput);
}

async function run() {
  await waitForServer();

  /* ---------------- service routes ---------------- */
  const health = await (await fetch(`${base}/healthz`)).json();
  check('healthz: status', health.status === 'ok');
  check('healthz: names itself', health.service === 'mydns');
  check('healthz: cache stats', typeof health.cache?.entries === 'number');
  check('healthz: twelve languages', health.languages?.length === 12,
    `got ${health.languages?.length}`);

  const robots = await fetch(`${base}/robots.txt`);
  check('robots.txt', robots.ok);
  check('robots.txt: points at the sitemap', (await robots.text()).includes('Sitemap:'));

  const sitemap = await fetch(`${base}/sitemap.xml`);
  check('sitemap.xml', sitemap.ok);
  check('sitemap.xml: lists the home page', (await sitemap.text()).includes('<loc>'));

  const favicon = await fetch(`${base}/favicon.ico`);
  check('favicon.ico', favicon.ok);
  check('favicon.ico: is an icon', (favicon.headers.get('content-type') || '').includes('icon'));

  /* ---------------- the page ---------------- */
  const page = await fetch(`${base}/example.com`, {
    headers: { accept: 'text/html', 'user-agent': 'Mozilla/5.0' },
  });
  const html = await page.text();
  check('html: status', page.status === 200);
  check('html: content-type', (page.headers.get('content-type') || '').includes('text/html'));
  check('html: links app.js', html.includes('/static/app.js'));
  check('html: links its own dictionary', html.includes('/static/i18n.js'));
  check('html: links the shared dictionary', html.includes('/static/kit/i18n-common.js'));
  check('html: links the shared stylesheet', html.includes('/static/kit/base.css'));

  check('html: no placeholders left',
    !/%(ORIGIN|URL|ROBOTS|LANG|DIR|TITLE|DESCRIPTION|LOCALE|SERVICES|ANALYTICS)%/.test(html),
    (html.match(/%[A-Z]+%/) || [])[0]);
  check('html: absolute canonical', html.includes(`<link rel="canonical" href="${base}/example.com"`));
  check('html: report pages are not indexed', html.includes('content="noindex, follow"'));
  check('html: social image', html.includes(`content="${base}/static/og-image.png"`));
  check('html: manifest', html.includes('/static/site.webmanifest'));

  /* The family strip is rendered on the server, with this service marked. */
  check('html: family footer', html.includes('class="services"'));
  check('html: siblings are linked', html.includes('https://myssl.sharapov.biz/'));
  check('html: the current service is not a link',
    /<span class="svc current"[^>]*>/.test(html), html.match(/<nav class="services".{0,200}/s)?.[0]);

  /* The head is translated by the same dictionary the page uses. */
  const russian = await (await fetch(`${base}/`, {
    headers: { accept: 'text/html', 'user-agent': 'Mozilla/5.0', 'accept-language': 'ru-RU,ru;q=0.9' },
  })).text();
  check('html: honours accept-language', russian.includes('<html lang="ru"'));
  check('html: translated title', /<title>Проверка DNS/.test(russian),
    russian.match(/<title>[^<]*/)?.[0]);
  check('html: translated family strip', russian.includes('Проверка SSL'));

  const arabic = await (await fetch(`${base}/`, {
    headers: { accept: 'text/html', 'user-agent': 'Mozilla/5.0', 'accept-language': 'ar' },
  })).text();
  check('html: right-to-left for arabic', arabic.includes('<html lang="ar" dir="rtl"'));
  check('html: home page is indexed', arabic.includes('content="index, follow"'));

  /* ---------------- console clients ---------------- */
  const usage = await fetch(`${base}/`, { headers: { 'user-agent': 'curl/8.7.1' } });
  check('curl -> json', (usage.headers.get('content-type') || '').includes('json'));
  const usageBody = await usage.json();
  check('usage: describes the api', typeof usageBody.usage?.scan === 'string');
  check('usage: lists the stages', Array.isArray(usageBody.stages) && usageBody.stages.includes('dnssec'));
  check('usage: lists the family', usageBody.family?.some(entry => entry.slug === 'mymx'));

  /* ---------------- input validation ---------------- */
  const badHost = await fetch(`${base}/api/not%20a%20domain`);
  check('invalid host -> 400', badHost.status === 400, `status ${badHost.status}`);
  check('invalid host: error code', (await badHost.json()).error === 'invalid-host');

  const literal = await fetch(`${base}/api/93.184.216.34`);
  check('an IP address -> 400', literal.status === 400, `status ${literal.status}`);
  check('an IP address: error code', (await literal.json()).error === 'domain-expected');

  const traversal = await fetch(`${base}/api/%2Fetc%2Fpasswd`);
  check('path traversal in the target -> 400', traversal.status === 400, `status ${traversal.status}`);

  /* Private space is refused by name as well: these are not domains. */
  for (const target of ['127.0.0.1', '10.0.0.1', '169.254.169.254']) {
    const response = await fetch(`${base}/api/${target}`);
    check(`private target ${target} refused`, response.status === 400, `status ${response.status}`);
  }

  /* ---------------- output formats ---------------- */
  check('output=xml -> 400', (await fetch(`${base}/api/example.com?output=xml`)).status === 400);
  const yaml = await fetch(`${base}/api/10.0.0.1?output=yaml`);
  check('yaml: content-type', (yaml.headers.get('content-type') || '').includes('yaml'));
  check('yaml: body', (await yaml.text()).includes('error: domain-expected'));

  /* Localised error messages, in the language that was asked for. */
  const localisedError = await (await fetch(`${base}/api/10.0.0.1?lang=ru`)).json();
  check('errors are translated', /домен/i.test(localisedError.message || ''), localisedError.message);

  /* ---------------- streaming ---------------- */
  const rejected = await fetch(`${base}/api/stream/not%20a%20domain`);
  check('stream: rejects a bad target before starting', rejected.status === 400);

  const stream = await fetch(`${base}/api/stream/example.invalid`);
  check('stream: content-type', (stream.headers.get('content-type') || '').includes('text/event-stream'));
  const streamBody = await stream.text();
  check('stream: sends a start event', streamBody.includes('event: start'));
  check('stream: announces the stages', streamBody.includes('"stages"'));
  check('stream: ends with a report or a failure',
    streamBody.includes('event: report') || streamBody.includes('event: failed'),
    streamBody.slice(0, 200));
  /* `.invalid` is reserved and can never be delegated, so with a working
     outbound path this is the not-found route — which must produce a report
     with no letter, not an internal error. Without outbound DNS it fails
     earlier, and either way `scan-failed` would mean the checker threw. */
  check('stream: an undelegated name does not crash the checker',
    !streamBody.includes('"error":"scan-failed"'),
    streamBody.slice(-300));

  /* ---------------- security headers ---------------- */
  const csp = page.headers.get('content-security-policy') || '';
  check('csp: script-src self', csp.includes("script-src 'self'"));
  check('csp: frame-ancestors none', csp.includes("frame-ancestors 'none'"));
  check('csp: no unsafe-inline', !csp.includes('unsafe-inline'), csp);
  check('csp: fonts are first-party', /font-src 'self'(;|$)/.test(csp), csp);
  check('header nosniff', page.headers.get('x-content-type-options') === 'nosniff');
  check('header X-Frame-Options', page.headers.get('x-frame-options') === 'DENY');
  check('header referrer-policy', Boolean(page.headers.get('referrer-policy')));

  /* ---------------- static assets ---------------- */
  for (const file of ['styles.css', 'app.js', 'i18n.js', 'icon.svg',
    'apple-touch-icon.png', 'og-image.png', 'site.webmanifest']) {
    const response = await fetch(`${base}/static/${file}`);
    check(`static ${file}`, response.ok, `status ${response.status}`);
  }
  for (const file of ['base.css', 'i18n-common.js', 'sharapov.svg',
    'fonts/inter-latin.woff2', 'fonts/jetbrains-mono-latin.woff2', 'fonts/geist-latin.woff2']) {
    const response = await fetch(`${base}/static/kit/${file}`);
    check(`static kit/${file}`, response.ok, `status ${response.status}`);
  }
  // Percent-encoded so the client cannot normalise it away before it arrives.
  check('directory traversal blocked',
    [400, 403, 404].includes((await fetch(`${base}/static/..%2Fpackage.json`)).status));
  check('directory traversal blocked in the kit assets',
    [400, 403, 404].includes((await fetch(`${base}/static/kit/..%2Fpackage.json`)).status));

  check('404 on unknown path',
    (await fetch(`${base}/foo/bar/baz`, { headers: { accept: 'application/json' } })).status === 404);

  /* ---------------- rate limiting ---------------- */
  const codes = [];
  for (let i = 0; i < 30; i++) {
    codes.push((await fetch(`${base}/api/10.0.0.1`)).status);
  }
  check('rate limit kicks in', codes.includes(429), `codes: ${[...new Set(codes)].join(',')}`);
}

try {
  await run();
} catch (err) {
  failures.push('exception: ' + err.message);
} finally {
  server.kill('SIGTERM');
}

if (failures.length) {
  console.error(`Smoke test failed (${failures.length} of ${checks}):`);
  failures.forEach(failure => console.error('  x ' + failure));
  process.exit(1);
}

console.log(`Smoke test passed: ${checks} checks.`);
