# mydns

**[mydns.sharapov.biz](https://mydns.sharapov.biz)** — delegation, SOA consistency,
records, DNSSEC and propagation for any domain.

No ads, no registration, no accounts. Nothing you look up is stored. MIT licensed,
twelve languages, one `docker run` to host your own.

```bash
curl mydns.sharapov.biz/example.com
```

---

## What it actually checks

Most DNS tools ask a recursive resolver and print what it says. That answers a
different question from the one people have, because a resolver has already
made every interesting decision for you: which side of a delegation to believe,
whether the signatures were valid, how long ago it last looked. This walks the
delegation itself and does the arithmetic.

**Delegation.** From the root servers down: root → TLD → the zone. The NS set the
parent publishes and the NS set the zone publishes are compared, because nothing
forces them to match and when they drift the domain works until a resolver
happens to cache the other one. That is the classic cause of a fault that comes
and goes. Also: glue records for nameservers that live inside the zone they
serve, whether each listed server actually answers *authoritatively* (a lame
delegation costs a resolver a timeout every time it picks that one), and whether
any NS record points at a CNAME, which RFC 2181 §10.3 forbids.

**SOA.** Asked of every authoritative server separately, and the serials
compared. When a secondary stops following the primary — a failed transfer, an
expired key, a new firewall rule — it keeps answering happily with a stale copy
of the zone. Nothing reports an error; the only symptom is that the answer
depends on who you ask. The timers are checked against RFC 1912 and RFC 2308.

**DNSSEC — the part that is done here rather than delegated.** A validating
resolver sets the AD bit and tells you nothing else. This recomputes the chain:

```
parent DS  →  matches the digest of the zone's KSK
zone KSK   →  signs the DNSKEY RRset
zone ZSK   →  signs the zone's data
```

Signatures are verified against the published key material with RSA, ECDSA and
Ed25519, including canonical RRset ordering and wildcard owner names. Also: key
algorithms and sizes, how much of each signature's lifetime is left, and
NSEC/NSEC3 — with a note when the iteration count is above the zero RFC 9276
asks for, because those extra rounds never made zone enumeration expensive and
do make every validating resolver do more work.

**Records.** A, AAAA, MX, TXT, NS, SOA, CAA, SRV, plus the two rules everybody
breaks: a CNAME at the apex (RFC 1034 §3.6.2 — a name with a CNAME has no other
records, and the apex always has SOA and NS) and a CNAME sitting beside other
records, where which one you get back depends on what you asked for first.

**CAA.** Walked up the tree, because the record is inherited and a report that
only looks at the name it was given will say "no CAA" for a host covered by one
two labels up.

**Propagation.** The same question at Google, Cloudflare, Quad9, OpenDNS, Yandex
and AdGuard, with the *remaining TTL* for each. There is no global DNS state to
propagate to — only caches, each holding what it was told until its TTL runs
out. The remaining TTL is the answer to "when will this be over".

## The grade

Three weighted components — delegation 40%, DNSSEC 35%, zone hygiene 25% — then
caps for specific faults, then a bonus for a zone that is both correctly
delegated and correctly signed with nothing outstanding.

Unsigned zones are not failed for being unsigned; they score a fixed 60 on that
component. A *broken* chain is capped at F, because a broken chain takes the
domain off the internet for every validating resolver.

**When a probe does not come back, there is no grade.** Not a low one — none.
The report says `?` and lists what could not be established. This rule was
bought at the price of one very wrong E that a sibling service once handed a
bank whose rate limiter simply refused forty connections in a row. A probe that
did not arrive is not a probe that failed.

## API

Console clients get JSON without asking for it — the User-Agent and Accept
header are enough.

```bash
curl mydns.sharapov.biz/example.com                  # full report
curl mydns.sharapov.biz/api/example.com?output=yaml  # YAML
curl mydns.sharapov.biz/api/stream/example.com       # server-sent events, live progress
curl mydns.sharapov.biz/example.com?lang=ru          # labels in another language
curl mydns.sharapov.biz/api/example.com?refresh=1    # bypass the ten-minute cache
```

Every finding carries a stable identifier, so the JSON can be watched from a
script:

```bash
curl -s mydns.sharapov.biz/api/example.com | jq -r '.flags[] | "\(.severity)\t\(.id)"'
```

`Accept-Language` is honoured, and `?lang=` overrides it. The labels beside the
codes come from the same dictionary the page uses, so a translation can never be
right in the browser and missing in the API.

## Running your own

```bash
docker run -d --name mydns -p 127.0.0.1:3026:3026 ghcr.io/sharapov-outsource/mydns:latest
```

| Variable | Default | What it does |
|---|---|---|
| `PORT` | `3026` | listen port |
| `TRUST_PROXY` | `true` | read the client address from `X-Real-IP` / `CF-Connecting-IP`. Turn **off** when the service faces the internet directly, or a client can spoof its address past the rate limits |
| `DNS_RESOLVER` | `1.1.1.1` | the resolver used for ordinary lookups |
| `DNS_TIMEOUT_MS` | `4000` | per-query timeout |
| `DNS_INTERVAL_MS` | `25` | spacing between outbound queries |
| `SCAN_TIMEOUT_MS` | `45000` | ceiling on a whole check |
| `CACHE_TTL_MS` | `600000` | how long a report is kept |
| `MAX_INFLIGHT` | `6` | concurrent checks before callers get a 503 |
| `RATE_SCAN_MAX` | `12` | checks per minute per client |
| `METRIKA_ID` | — | Yandex.Metrika counter; omitted, no analytics and a tighter policy |
| `HSTS` | — | set to `true` behind TLS |

The container is read-only, unprivileged, has no volumes and writes nothing.

## Development

```bash
npm install
npm start           # http://127.0.0.1:3026
npm run dev         # with --watch
npm test            # syntax, translations, unit tests, smoke
npm run scan -- example.com          # the checker without the web server
npm run scan -- example.com --json
```

The two shared packages are git dependencies rather than registry ones, so `npm
install` needs `git` available and resolves them straight from GitHub:

```json
"@sharapov/service-kit": "github:sharapov-outsource/service-kit#v1.0.0",
"@sharapov/dns-wire":    "github:sharapov-outsource/dns-wire#v1.0.0"
```

The tag is deliberate: a service moves to a new version of the shared code when
somebody decides to, not on the next `npm i`.

`npm run check:i18n` compares every dictionary against English — same keys, same
placeholders — and checks that every code the server can emit has words to go
with it. It reports which languages the service vocabulary has not been
translated into yet (those fall back to English; the shared chrome is translated
in all twelve) and fails on a language that is only half done.

## Built on

- **[dns-wire](https://github.com/sharapov-outsource/dns-wire)** — the DNS codec:
  UDP with a TCP fallback, EDNS0, every record type here, and the DNSSEC
  arithmetic. Node's own `dns` module gives none of that, and silently joins the
  character-strings of a TXT record, which is where SPF and DKIM parsing goes
  wrong.
- **[service-kit](https://github.com/sharapov-outsource/service-kit)** — the HTTP
  shell, content negotiation, the closed content security policy, translations
  and the design system, shared with the sibling services.

## The rest of the family

[myip](https://myip.sharapov.biz) ·
[myssl](https://myssl.sharapov.biz) ·
mydns ·
[mymx](https://mymx.sharapov.biz) ·
[myheaders](https://myheaders.sharapov.biz)

## Licence

MIT. See [LICENSE](LICENSE).
