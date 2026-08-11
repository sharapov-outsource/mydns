#!/usr/bin/env node
/**
 * The checker without the web server, for when a terminal is enough:
 *
 *   npm run scan -- cloudflare.com
 *   npm run scan -- cloudflare.com --json
 */

import { scan } from '../server/scan.js';

const args = process.argv.slice(2);
const domain = args.find(argument => !argument.startsWith('-'));
const asJson = args.includes('--json');

if (!domain) {
  console.error('usage: npm run scan -- <domain> [--json]');
  process.exit(2);
}

const report = await scan({ host: domain }, {
  onProgress: event => {
    if (asJson) return;
    process.stderr.write(`  ${event.stage}${event.done ? ' ✓' : '…'}\n`);
  },
});

if (asJson) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

const line = (label, value) => console.log(`  ${String(label).padEnd(22)} ${value}`);

console.log(`\n${report.domain} — grade ${report.grade.grade} (${report.grade.score})\n`);
line('zone', report.zone);
for (const [name, component] of Object.entries(report.grade.components)) {
  line(name, `${component.score} × ${component.weight}`);
}
line('nameservers', report.delegation.nameservers
  .map(server => `${server.name}:${server.status}`).join(', ') || '—');
line('serials', report.soa.serials.join(', ') || '—');
line('dnssec', report.dnssec.enabled
  ? `keys ${report.dnssec.keys.map(key => `${key.keyTag}/${key.role}`).join(',')} · ` +
    `ds→ksk ${report.dnssec.chain.dsMatchesKsk} · zone signed ${report.dnssec.chain.zoneDataSigned}`
  : 'not signed');
line('caa', report.caa.present ? report.caa.issue.join(', ') || '(no issue tag)' : 'none');
line('propagation', report.propagation
  ? `${report.propagation.variants} distinct answer(s), ttl ≤ ${report.propagation.maxTtl}`
  : '—');

if (report.incomplete?.length) {
  console.log(`\n  incomplete: ${report.incomplete.join(', ')}`);
}

console.log('\nfindings:');
if (!report.flags.length) console.log('  none');
for (const finding of report.flags) {
  console.log(`  ${finding.severity.padEnd(8)} ${finding.id}`);
}
console.log(`\n${report.meta.queries} queries in ${report.meta.elapsedMs} ms\n`);
