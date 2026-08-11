/**
 * mydns client.
 *
 * A check takes a few seconds and around fifty queries, so the page opens an
 * event stream and fills the progress bar as the stages go by, then renders the
 * report when it arrives. Switching language repaints from the report already
 * in memory — no second check, and no second fifty queries at somebody else's
 * nameservers.
 */
'use strict';

const byId = id => document.getElementById(id);
const DASH = '—';

/* ================================================================== *
 * Language
 * ================================================================== */

const I18N = window.I18N;
const RTL = new Set(window.RTL_LANGS || []);
const STORAGE_KEY = 'mydns-lang';

function detectLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && I18N[saved]) return saved;
  } catch { /* localStorage may be unavailable */ }

  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language || 'en'];
  for (const raw of candidates) {
    const tag = String(raw).toLowerCase();
    if (I18N[tag]) return tag;
    const base = tag.split('-')[0];
    if (I18N[base]) return base;
  }
  return 'en';
}

let LANG = detectLang();
const locale = () => (window.LANG_LOCALES?.[LANG]) || LANG;

function t(key, vars) {
  const dict = I18N[LANG] || I18N.en;
  let value = dict[key] ?? I18N.en[key] ?? key;
  if (vars) for (const [name, replacement] of Object.entries(vars)) {
    value = value.split('{' + name + '}').join(replacement);
  }
  return value;
}

/** Translation for a dashed code such as "lame-delegation", or the code itself. */
function tCode(prefix, code) {
  if (!code && code !== 0) return undefined;
  const key = prefix + '_' + String(code).replace(/[-.]/g, '_');
  const dict = I18N[LANG] || I18N.en;
  return dict[key] ?? I18N.en[key] ?? String(code).replace(/-/g, ' ');
}

/* ================================================================== *
 * Rendering helpers
 * ================================================================== */

function set(id, value, state) {
  const node = byId(id);
  if (!node) return;
  const empty = value === undefined || value === null || value === '' ||
    (Array.isArray(value) && !value.length) ||
    (typeof value === 'number' && Number.isNaN(value));
  node.className = 'v' + (empty ? ' muted' : state ? ' ' + state : '');
  node.textContent = empty ? DASH : (Array.isArray(value) ? value.join(', ') : String(value));
}

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/** Yes/no with the colour that matches which answer is the good one. */
function flagRow(id, value, { goodIfTrue = true } = {}) {
  if (value === undefined || value === null) { set(id, t('v_unknown'), 'muted'); return; }
  set(id, value ? t('v_yes') : t('v_no'), value === goodIfTrue ? 'ok' : 'bad');
}

function seconds(value) {
  if (value === undefined || value === null) return undefined;
  return t('v_seconds', { n: new Intl.NumberFormat(locale()).format(value) });
}

function tag(text, kind) {
  const element = document.createElement('span');
  element.className = 'tag' + (kind ? ' ' + kind : '');
  element.textContent = text;
  return element;
}

function skeletons() {
  document.querySelectorAll('#report .v').forEach(node => {
    node.className = 'v skeleton';
    node.textContent = '';
  });
  ['grade-caps', 'grade-warnings', 'ns-body', 'key-body', 'sig-body', 'prop-body',
    'trace-list', 'flag-list', 'r-txt'].forEach(id => {
    const node = byId(id);
    if (node) node.innerHTML = '';
  });
  ['bar-delegation', 'bar-dnssec', 'bar-hygiene'].forEach(id => {
    const node = byId(id);
    if (node) node.style.width = '0';
  });
}

function toast(message) {
  const element = byId('toast');
  element.textContent = message;
  element.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => element.classList.remove('show'), 1900);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast(t('toast_copied'));
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(area);
    area.select();
    try { document.execCommand('copy'); toast(t('toast_copied')); }
    catch { toast(t('toast_copy_fail')); }
    area.remove();
  }
}

/* ================================================================== *
 * State
 * ================================================================== */

let REPORT = null;
let LAST_ERROR = null;
let TARGET = null;
let STREAM = null;

const STAGES = ['resolve', 'delegation', 'soa', 'records', 'dnssec', 'caa', 'propagation', 'grade'];

/* ================================================================== *
 * Running a check
 * ================================================================== */

function setProgress(stage) {
  const box = byId('progress');
  box.hidden = false;
  const index = Math.max(0, STAGES.indexOf(stage));
  byId('progress-fill').style.width = Math.round(((index + 1) / STAGES.length) * 100) + '%';
  byId('progress-label').textContent = tCode('stage', stage);
}

function checking(on) {
  byId('btn-scan').disabled = on;
  byId('btn-rescan').disabled = on;
  if (!on) byId('progress').hidden = true;
}

function startCheck(domain, { refresh = false } = {}) {
  if (!domain) return;
  TARGET = domain;
  REPORT = null;
  LAST_ERROR = null;

  if (STREAM) { STREAM.close(); STREAM = null; }

  byId('empty').hidden = true;
  byId('report').hidden = false;
  byId('alerts').innerHTML = '';
  byId('search-host').value = domain;
  byId('hero-host').textContent = domain;
  byId('hero-meta').innerHTML = '';
  byId('grade-badge').className = 'grade-badge pending';
  byId('grade-badge').textContent = '·';
  skeletons();
  checking(true);
  setProgress('resolve');
  updateSeoMeta();

  const url = `/api/stream/${encodeURIComponent(domain)}?lang=${encodeURIComponent(LANG)}${
    refresh ? '&refresh=1' : ''}`;
  const stream = new EventSource(url);
  STREAM = stream;

  stream.addEventListener('progress', event => {
    try { setProgress(JSON.parse(event.data).stage); }
    catch { /* a malformed frame is not worth breaking the check over */ }
  });

  stream.addEventListener('report', event => {
    try { REPORT = JSON.parse(event.data); }
    catch { LAST_ERROR = { error: 'bad-response' }; }
    stream.close();
    STREAM = null;
    checking(false);
    render();
  });

  stream.addEventListener('failed', event => {
    try { LAST_ERROR = JSON.parse(event.data); }
    catch { LAST_ERROR = { error: 'scan-failed' }; }
    stream.close();
    STREAM = null;
    checking(false);
    render();
  });

  stream.onerror = () => {
    if (REPORT || LAST_ERROR) return;
    stream.close();
    STREAM = null;
    LAST_ERROR = { error: 'network' };
    checking(false);
    render();
  };
}

/* ================================================================== *
 * Rendering the report
 * ================================================================== */

const GRADE_CLASS = grade => {
  if (!grade || grade === '?') return 'g-unknown';
  return 'g-' + grade[0].toLowerCase();
};

function renderGrade(report) {
  const badge = byId('grade-badge');
  badge.className = 'grade-badge ' + GRADE_CLASS(report.grade.grade);
  badge.textContent = report.grade.grade;

  for (const [key, id] of [['delegation', 'delegation'], ['dnssec', 'dnssec'], ['hygiene', 'hygiene']]) {
    const component = report.grade.components?.[key];
    byId('bar-' + id).style.width = (component?.score ?? 0) + '%';
    set('score-' + id, component ? component.score : undefined);
  }
  set('score-total', report.grade.score);
  set('meta-queries', report.meta?.queries);
  set('meta-elapsed', report.meta?.elapsedMs ? report.meta.elapsedMs + ' ms' : undefined);

  const caps = byId('grade-caps');
  caps.innerHTML = '';
  for (const cap of report.grade.caps || []) {
    caps.appendChild(tag(`${cap.grade} · ${cap.label || tCode('cap', cap.reason)}`, 'bad'));
  }
  if (report.grade.reason) {
    caps.appendChild(tag(report.grade.reasonLabel || tCode('cap', report.grade.reason), 'warn'));
  }

  const warnings = byId('grade-warnings');
  warnings.innerHTML = '';
  (report.grade.warningLabels || report.grade.warnings || []).forEach(label =>
    warnings.appendChild(tag(label, 'warn')));
}

function renderDelegation(report) {
  const delegation = report.delegation || {};
  set('d-zone', delegation.zone);
  const agrees = delegation.parentNameservers?.length && delegation.zoneNameservers?.length
    ? !delegation.onlyAtParent.length && !delegation.onlyAtZone?.length &&
      !delegation.onlyAtChild?.length
    : null;
  flagRow('d-agreement', agrees);
  set('d-only-parent', delegation.onlyAtParent);
  set('d-only-zone', delegation.onlyAtChild);

  const servers = delegation.nameservers || [];
  const answering = servers.filter(server => server.status === 'authoritative');
  set('d-answering', `${answering.length} / ${servers.length}`,
    answering.length >= 2 ? 'ok' : answering.length ? 'warn' : 'bad');
  const ipv6 = servers.filter(server => server.ipv6).length;
  set('d-ipv6', `${ipv6} / ${servers.length}`, ipv6 ? 'ok' : 'warn');
  set('d-glue', delegation.glue?.length ? delegation.glue.length : t('v_none'));

  const body = byId('ns-body');
  body.innerHTML = '';
  for (const server of servers) {
    const row = document.createElement('tr');
    const state = server.status === 'authoritative' ? 'good'
      : server.status === 'lame' ? 'weak' : 'insecure';
    row.innerHTML =
      `<td class="mono">${esc(server.name)}</td>` +
      `<td class="${state}">${esc(server.statusLabel || tCode('nss', server.status))}</td>` +
      `<td class="mono">${esc(server.addresses.map(a => a.address).join(', ') || DASH)}</td>` +
      `<td class="num">${server.serial ?? DASH}</td>` +
      `<td class="num">${server.responseMs != null ? server.responseMs + ' ms' : DASH}</td>`;
    body.appendChild(row);
  }
}

function renderSoa(report) {
  const soa = report.soa || {};
  const record = soa.record;
  set('s-serial', soa.serials?.join(' / '));
  flagRow('s-agree', soa.consistent);
  set('s-primary', soa.primary);
  set('s-rname', record?.rname);
  for (const field of ['refresh', 'retry', 'expire', 'minimum']) {
    const timer = soa.timers?.[field];
    set('s-' + field, seconds(record?.[field]), timer ? (timer.ok ? 'ok' : 'warn') : undefined);
  }
}

function renderDnssec(report) {
  const dnssec = report.dnssec || {};
  set('k-enabled', dnssec.enabled ? t('v_yes') : t('v_no'), dnssec.enabled ? 'ok' : 'warn');
  set('k-ds', dnssec.ds?.length ? dnssec.ds.map(entry => entry.keyTag).join(', ') : t('v_none'),
    dnssec.ds?.length ? 'ok' : 'warn');
  flagRow('k-chain-ds', dnssec.chain?.dsMatchesKsk);
  flagRow('k-chain-key', dnssec.chain?.dnskeySigned);
  flagRow('k-chain-zone', dnssec.chain?.zoneDataSigned);
  set('k-nsec', dnssec.nsec?.kindLabel || (dnssec.nsec ? tCode('nsec', String(dnssec.nsec.kind).toLowerCase()) : undefined));
  set('k-nsec3-iter', dnssec.nsec?.kind === 'NSEC3' ? dnssec.nsec.iterations : undefined,
    dnssec.nsec?.iterations === 0 ? 'ok' : dnssec.nsec?.iterations > 0 ? 'warn' : undefined);

  const valid = (dnssec.signatures || []).filter(signature => signature.valid && signature.life);
  if (valid.length) {
    const soonest = valid.reduce((a, b) => (b.life.days < a.life.days ? b : a));
    set('k-expiry', t('v_of_lifetime', { days: soonest.life.days, total: soonest.life.lifetimeDays }),
      soonest.life.days <= 3 ? 'bad' : soonest.life.days <= 7 ? 'warn' : 'ok');
  } else {
    set('k-expiry', undefined);
  }

  const keyBody = byId('key-body');
  keyBody.innerHTML = '';
  for (const key of dnssec.keys || []) {
    const row = document.createElement('tr');
    row.innerHTML =
      `<td class="mono">${key.keyTag}</td>` +
      `<td>${esc(key.role)}</td>` +
      `<td class="mono ${key.secure === false ? 'weak' : ''}">${esc(key.algorithmName)}</td>` +
      `<td class="num">${key.bits ?? DASH}</td>`;
    keyBody.appendChild(row);
  }

  const sigBody = byId('sig-body');
  sigBody.innerHTML = '';
  for (const signature of dnssec.signatures || []) {
    const row = document.createElement('tr');
    row.innerHTML =
      `<td class="mono">${esc(signature.covers)}</td>` +
      `<td class="mono">${signature.keyTag}</td>` +
      `<td class="${signature.valid ? 'good' : 'weak'}">${signature.valid ? t('v_yes') : esc(signature.reason || t('v_no'))}</td>` +
      `<td class="mono">${signature.life ? t('v_days', { n: signature.life.days }) : DASH}</td>`;
    sigBody.appendChild(row);
  }
}

function renderRecords(report) {
  const apex = report.records?.apex || {};
  set('r-a', (apex.A || []).map(record => record.address));
  set('r-aaaa', (apex.AAAA || []).map(record => record.address));
  set('r-mx', (apex.MX || []).map(record => `${record.preference} ${record.exchange}`));
  set('r-ns', (apex.NS || []).map(record => record.ns));
  const ttl = apex.A?.[0]?.ttl ?? apex.AAAA?.[0]?.ttl;
  set('r-ttl', seconds(ttl));
  flagRow('r-wildcard', report.records?.wildcard, { goodIfTrue: false });

  const txt = byId('r-txt');
  txt.innerHTML = '';
  const records = apex.TXT || [];
  if (!records.length) {
    txt.innerHTML = `<div class="empty">${esc(t('v_none'))}</div>`;
  } else {
    for (const record of records) {
      const row = document.createElement('div');
      row.className = 'kv';
      row.innerHTML = `<span class="val">${esc(record.text)}</span>`;
      txt.appendChild(row);
    }
  }
}

function renderCaa(report) {
  const caa = report.caa || {};
  set('c-at', caa.present ? (caa.at || TARGET) : t('v_absent'), caa.present ? 'ok' : 'warn');
  set('c-issue', caa.issue);
  set('c-issuewild', caa.issueWild);
  set('c-iodef', caa.iodef);
}

function renderPropagation(report) {
  const body = byId('prop-body');
  body.innerHTML = '';
  for (const resolver of report.propagation?.resolvers || []) {
    const row = document.createElement('tr');
    row.innerHTML =
      `<td>${esc(resolver.name)}</td>` +
      `<td class="mono">${esc(resolver.values?.join(', ') || (resolver.answered ? resolver.rcode : DASH))}</td>` +
      `<td class="num">${resolver.ttl != null ? resolver.ttl : DASH}</td>` +
      `<td class="num">${resolver.elapsedMs != null ? resolver.elapsedMs + ' ms' : DASH}</td>`;
    body.appendChild(row);
  }
}

function renderTrace(report) {
  const list = byId('trace-list');
  list.innerHTML = '';
  for (const step of report.delegation?.trace || []) {
    const item = document.createElement('li');
    const zone = step.zone === '.' || !step.zone ? t('v_root') : step.zone;
    item.innerHTML =
      `<span class="label">${esc(zone)} <span class="arrow">→</span> ${esc(step.referralTo || TARGET)}</span>` +
      `<div class="meta">${esc(step.from)} · ${(step.nameservers || []).map(esc).join(', ')}` +
      `${step.elapsedMs != null ? ' · ' + step.elapsedMs + ' ms' : ''}</div>`;
    list.appendChild(item);
  }
}

function renderFlags(report) {
  const list = byId('flag-list');
  list.innerHTML = '';
  const flags = report.flags || [];
  if (!flags.length) {
    list.innerHTML = `<div class="empty-note">${esc(t('v_none'))}</div>`;
    return;
  }
  for (const finding of flags) {
    const item = document.createElement('div');
    item.className = 'finding';
    item.innerHTML =
      `<span class="sev sev-${esc(finding.severity)}">${esc(finding.severityLabel || tCode('sev', finding.severity))}</span>` +
      '<div class="body">' +
      `<div class="title">${esc(finding.name || tCode('flag', finding.id))}` +
      `${finding.nameserver ? ` <span class="where">${esc(finding.nameserver)}</span>` : ''}` +
      `${finding.field ? ` <span class="where">${esc(finding.field)}</span>` : ''}</div>` +
      `<div class="desc">${esc(finding.description || tCode('fd', finding.id))}</div>` +
      '</div>' +
      `<span class="state">${esc(finding.statusLabel || tCode('st', finding.status))}</span>`;
    list.appendChild(item);
  }
}

function renderAlerts(report) {
  const alerts = byId('alerts');
  alerts.innerHTML = '';
  if (!report?.incomplete?.length) return;

  const box = document.createElement('div');
  box.className = 'alert warn';
  const reasons = report.incompleteLabels || report.incomplete.map(code => tCode('inc', code));
  box.innerHTML =
    '<div class="alert-body">' +
    `<div class="alert-title">${esc(t('incomplete_title'))}</div>` +
    `<div>${esc(t('incomplete_body'))}</div>` +
    `<ul>${reasons.map(reason => `<li>${esc(reason)}</li>`).join('')}</ul>` +
    '</div>';
  alerts.appendChild(box);
}

function renderError() {
  const alerts = byId('alerts');
  alerts.innerHTML = '';
  const box = document.createElement('div');
  box.className = 'alert bad';
  const code = LAST_ERROR?.error || 'scan-failed';
  box.innerHTML = `<div class="alert-body"><div class="alert-title">${
    esc(LAST_ERROR?.message || tCode('err', code))}</div></div>`;
  alerts.appendChild(box);
  byId('grade-badge').className = 'grade-badge pending';
  byId('grade-badge').textContent = '·';
}

function render() {
  applyStaticText();
  if (LAST_ERROR) {
    renderError();
    return;
  }
  if (!REPORT) return;

  renderAlerts(REPORT);
  renderGrade(REPORT);
  renderDelegation(REPORT);
  renderSoa(REPORT);
  renderDnssec(REPORT);
  renderRecords(REPORT);
  renderCaa(REPORT);
  renderPropagation(REPORT);
  renderTrace(REPORT);
  renderFlags(REPORT);

  const meta = byId('hero-meta');
  meta.innerHTML = '';
  const chips = [
    [REPORT.zone, ''],
    [REPORT.dnssec?.enabled ? 'DNSSEC' : null, REPORT.dnssec?.secure ? 'ok' : 'warn'],
    [REPORT.soa?.consistent === false ? t('flag_serial_mismatch') : null, 'bad'],
  ];
  for (const [text, kind] of chips) {
    if (!text) continue;
    const chip = document.createElement('span');
    chip.className = 'chip' + (kind ? ' ' + kind : '');
    chip.textContent = text;
    meta.appendChild(chip);
  }

  byId('raw-json').textContent = JSON.stringify(REPORT, null, 2);
}

/* ================================================================== *
 * Static text, language switching, SEO
 * ================================================================== */

function applyStaticText() {
  document.documentElement.lang = LANG;
  document.documentElement.dir = RTL.has(LANG) ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(node => {
    node.textContent = t(node.dataset.i18n);
  });
  byId('search-host').placeholder = t('ph_host');
  byId('search-host').setAttribute('aria-label', t('hero_label'));
  byId('lang').setAttribute('aria-label', t('lang_aria'));
  byId('api-hint').innerHTML = t('api_hint', {
    origin: location.origin, example: 'example.com',
  });
  if (!TARGET) byId('hero-host').textContent = t('no_target');
  if (!REPORT && !LAST_ERROR) {
    byId('grade-badge').textContent = '·';
  }
}

function updateSeoMeta() {
  const title = TARGET ? `${TARGET} — ${t('title_short')}` : t('title');
  document.title = title;
  for (const [id, value] of [
    ['meta-description', t('subtitle')], ['og-title', title], ['twitter-title', title],
    ['og-description', t('subtitle')], ['twitter-description', t('subtitle')],
  ]) {
    const node = byId(id);
    if (node) node.setAttribute('content', value);
  }
  const canonical = byId('link-canonical');
  if (canonical) canonical.href = location.origin + (TARGET ? '/' + encodeURIComponent(TARGET) : '/');
}

function buildLanguageSelect() {
  const select = byId('lang');
  select.innerHTML = '';
  for (const code of Object.keys(I18N)) {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = window.LANG_NAMES?.[code] || code;
    if (code === LANG) option.selected = true;
    select.appendChild(option);
  }
  select.addEventListener('change', () => {
    LANG = select.value;
    try { localStorage.setItem(STORAGE_KEY, LANG); } catch { /* private mode */ }
    render();
    updateSeoMeta();
  });
}

function buildExamples() {
  const box = byId('examples');
  box.innerHTML = '';
  for (const domain of ['cloudflare.com', 'ietf.org', 'sharapov.biz']) {
    const button = document.createElement('button');
    button.textContent = domain;
    button.addEventListener('click', () => go(domain));
    box.appendChild(button);
  }
}

/* ================================================================== *
 * Wiring
 * ================================================================== */

function go(domain) {
  const clean = String(domain || '').trim().toLowerCase();
  if (!clean) return;
  history.pushState({ domain: clean }, '', '/' + encodeURIComponent(clean));
  startCheck(clean);
}

byId('search-form').addEventListener('submit', event => {
  event.preventDefault();
  go(byId('search-host').value);
});

byId('btn-rescan').addEventListener('click', () => {
  if (TARGET) startCheck(TARGET, { refresh: true });
});

byId('btn-copy-json').addEventListener('click', () => {
  if (REPORT) copyText(JSON.stringify(REPORT, null, 2));
});

byId('btn-save-json').addEventListener('click', () => {
  if (!REPORT) return;
  const blob = new Blob([JSON.stringify(REPORT, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `mydns-${REPORT.domain}.json`;
  link.click();
  URL.revokeObjectURL(url);
});

window.addEventListener('popstate', () => {
  const path = decodeURIComponent(location.pathname.replace(/^\//, ''));
  if (path) startCheck(path);
});

buildLanguageSelect();
buildExamples();
applyStaticText();
updateSeoMeta();

const initial = decodeURIComponent(location.pathname.replace(/^\//, ''));
if (initial) startCheck(initial);
