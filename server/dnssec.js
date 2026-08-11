/**
 * DNSSEC, checked rather than taken on trust.
 *
 * The easy version of this check is to ask a validating resolver and read the
 * AD bit. It is also nearly useless: AD tells you that somebody else's software
 * was satisfied, and when it is not set you learn nothing about why. Which key
 * signed what? Does the DS at the parent still match the KSK the zone is
 * actually using? How long until the current signatures expire — and is anyone
 * going to notice before they do? A resolver answers none of that, because
 * answering it is not its job.
 *
 * So the chain is walked here, one link at a time:
 *
 *   parent DS  →  matches the digest of the zone's KSK
 *   zone KSK   →  signs the DNSKEY RRset
 *   zone ZSK   →  signs everything else in the zone
 *
 * Each link is checked with the arithmetic in RFC 4034, and each one that
 * cannot be checked says so instead of being assumed.
 */

import {
  TYPE, rrset, verifyWithKeys, dsDigest, DIGEST, ALGORITHM, defaultResolver,
} from '@sharapov/dns-wire';
import { flag } from '@sharapov/service-kit';

/**
 * When a signature is close enough to expiry to be worth mentioning.
 *
 * A fixed "fewer than seven days left" threshold is wrong, and wrong in the
 * direction that matters. Providers that sign on the fly — Cloudflare among
 * them — issue signatures with lifetimes of a few days and replace them
 * constantly; by that rule every domain they host is permanently on fire. The
 * useful question is not how much time is left in absolute terms but how much
 * of the signature's own lifetime is left. A signature four fifths of the way
 * through its window is being refreshed late whether that window was a week or
 * a month, and one with days left out of a thirty-day lifetime is fine.
 */
const AT_RISK_FRACTION = 0.2;
const AT_RISK_DAYS = 5;
const NOTICE_FRACTION = 0.35;

/** @returns {{fraction: number|null, days: number|null}} */
function remainingLife(signature) {
  const total = signature.expiration - signature.inception;
  const left = signature.expiration - Math.floor(Date.now() / 1000);
  return {
    days: Math.round(left / 86400),
    fraction: total > 0 ? left / total : null,
    lifetimeDays: Math.round(total / 86400),
  };
}

export async function inspectDnssec(session, domain, { parentDs = [], nameservers = [] } = {}) {
  const flags = [];
  const incomplete = [];

  /* Ask an authoritative server directly. A resolver would answer from cache,
     and the whole point is to see what the zone is publishing right now. */
  const authoritative = nameservers.find(server =>
    server.status === 'authoritative' && server.addresses.length);
  const at = authoritative
    ? { server: authoritative.addresses[0].address, rd: false }
    : { server: defaultResolver() };

  /* ---------------- the DS at the parent ---------------- */

  let dsRecords = parentDs;
  if (!dsRecords.length) {
    const response = await session.ask({ name: domain, type: 'DS', dnssec: true });
    if (!response?.message) incomplete.push('ds-lookup-failed');
    dsRecords = rrset(response?.message?.answers || [], domain, 'DS');
  }
  const ds = dsRecords.map(record => ({ ...record.data }));

  /* ---------------- the keys at the zone ---------------- */

  const keyResponse = await session.ask({ name: domain, type: 'DNSKEY', dnssec: true, ...at });
  if (!keyResponse?.message) incomplete.push('dnskey-lookup-failed');

  const keyRecords = rrset(keyResponse?.message?.answers || [], domain, 'DNSKEY');
  const keySignatures = rrset(keyResponse?.message?.answers || [], domain, 'RRSIG')
    .filter(record => record.data.typeCovered === TYPE.DNSKEY);

  const signed = keyRecords.length > 0;

  if (!signed) {
    if (ds.length) {
      // The parent says the zone is signed and the zone disagrees. Every
      // validating resolver on the internet will refuse to answer for it.
      flags.push(flag('ds-without-dnskey', 'critical', 'failed', { keyTags: ds.map(d => d.keyTag) }));
    } else {
      flags.push(flag('dnssec-not-enabled', 'medium', 'missing', {}));
    }
    return {
      enabled: false,
      ds,
      keys: [],
      signatures: [],
      chain: { dsMatchesKsk: null, dnskeySigned: null, zoneDataSigned: null },
      nsec: null,
      incomplete: incomplete.length ? incomplete : undefined,
      flags,
    };
  }

  const keys = keyRecords.map(record => ({
    keyTag: record.data.keyTag,
    algorithm: record.data.algorithm,
    algorithmName: record.data.algorithmName,
    bits: record.data.bits,
    flags: record.data.flags,
    role: record.data.secureEntryPoint ? 'KSK' : 'ZSK',
    secure: ALGORITHM[record.data.algorithm]?.secure ?? null,
    zoneKey: record.data.zoneKey,
    revoked: record.data.revoked,
  }));

  const kskRecords = keyRecords.filter(record => record.data.secureEntryPoint);

  if (!kskRecords.length) {
    // Legal — a zone may sign everything with one key — but it means the DS
    // has to be reissued on every key change, so it is worth naming.
    flags.push(flag('no-key-signing-key', 'low', 'warning', {}));
  }

  for (const key of keys) {
    const algorithm = ALGORITHM[key.algorithm];
    if (algorithm && !algorithm.secure) {
      flags.push(flag('weak-key-algorithm', 'high', 'weak', {
        keyTag: key.keyTag, algorithm: key.algorithmName,
      }));
    }
    if (key.algorithmName?.startsWith('RSA') && key.bits && key.bits < 2048) {
      flags.push(flag('rsa-key-too-short', 'high', 'weak', { keyTag: key.keyTag, bits: key.bits }));
    }
    if (key.revoked) {
      flags.push(flag('key-revoked', 'medium', 'warning', { keyTag: key.keyTag }));
    }
    if (!key.zoneKey) {
      flags.push(flag('key-not-a-zone-key', 'medium', 'warning', { keyTag: key.keyTag }));
    }
  }

  /* ---------------- link 2: the KSK signs the key set ---------------- */

  const verifiers = kskRecords.length ? kskRecords : keyRecords;
  const signatures = [];
  let dnskeySigned = false;

  for (const signature of keySignatures) {
    const result = verifyWithKeys(signature, keyRecords, verifiers);
    signatures.push({
      covers: 'DNSKEY',
      keyTag: signature.data.keyTag,
      algorithm: signature.data.algorithmName,
      inception: signature.data.inceptionDate,
      expiration: signature.data.expirationDate,
      valid: result.ok,
      reason: result.reason,
      expiresInDays: result.expiresInDays,
      life: remainingLife(signature.data),
    });
    if (result.ok) dnskeySigned = true;
  }

  if (!keySignatures.length) {
    flags.push(flag('dnskey-not-signed', 'critical', 'failed', {}));
    incomplete.push('dnskey-rrsig-missing');
  } else if (!dnskeySigned) {
    flags.push(flag('dnskey-signature-invalid', 'critical', 'failed', {
      reasons: [...new Set(signatures.filter(s => !s.valid).map(s => s.reason))],
    }));
  }

  /* ---------------- link 1: the DS matches the KSK ---------------- */

  let dsMatchesKsk = null;
  if (ds.length) {
    dsMatchesKsk = false;
    for (const entry of ds) {
      const key = keyRecords.find(record => record.data.keyTag === entry.keyTag);
      entry.matchesKey = false;
      if (!key) {
        entry.problem = 'no-such-key';
        continue;
      }
      const computed = dsDigest(domain, key, entry.digestType);
      if (computed === null) {
        entry.problem = 'unsupported-digest';
        continue;
      }
      entry.matchesKey = computed === entry.digest;
      if (entry.matchesKey) dsMatchesKsk = true;
      else entry.problem = 'digest-mismatch';

      if (!DIGEST[entry.digestType]?.secure) {
        flags.push(flag('ds-weak-digest', 'medium', 'weak', {
          keyTag: entry.keyTag, digest: entry.digestName,
        }));
      }
    }

    if (!dsMatchesKsk) {
      const orphans = ds.filter(entry => entry.problem === 'no-such-key');
      flags.push(flag(orphans.length === ds.length ? 'ds-points-at-missing-key' : 'ds-digest-mismatch',
        'critical', 'failed', { keyTags: ds.map(entry => entry.keyTag) }));
    }
  } else {
    /* A signed zone whose parent publishes no DS is an island of security:
       the signatures are all correct and nothing validates them, because there
       is no path from the root to this zone. It is what a half-finished
       registrar setup looks like. */
    flags.push(flag('signed-but-no-ds', 'high', 'failed', {}));
  }

  /* ---------------- link 3: the ZSK signs the zone's data ---------------- */

  const soaResponse = await session.ask({ name: domain, type: 'SOA', dnssec: true, ...at });
  const soaRecords = rrset(soaResponse?.message?.answers || [], domain, 'SOA');
  const soaSignatures = rrset(soaResponse?.message?.answers || [], domain, 'RRSIG')
    .filter(record => record.data.typeCovered === TYPE.SOA);

  let zoneDataSigned = null;
  if (soaRecords.length && soaSignatures.length) {
    zoneDataSigned = false;
    for (const signature of soaSignatures) {
      const result = verifyWithKeys(signature, soaRecords, keyRecords);
      signatures.push({
        covers: 'SOA',
        keyTag: signature.data.keyTag,
        algorithm: signature.data.algorithmName,
        inception: signature.data.inceptionDate,
        expiration: signature.data.expirationDate,
        valid: result.ok,
        reason: result.reason,
        expiresInDays: result.expiresInDays,
        life: remainingLife(signature.data),
      });
      if (result.ok) zoneDataSigned = true;
    }
    if (!zoneDataSigned) {
      flags.push(flag('zone-data-signature-invalid', 'critical', 'failed', {}));
    }
  } else if (soaRecords.length && !soaSignatures.length) {
    flags.push(flag('zone-data-not-signed', 'critical', 'failed', {}));
  } else {
    incomplete.push('soa-rrsig-unavailable');
  }

  /* ---------------- how long the signatures have left ---------------- */

  const validSignatures = signatures.filter(signature => signature.valid);
  let atRisk = false;

  for (const signature of validSignatures) {
    const life = signature.life;
    if (life.fraction === null) continue;
    if (life.fraction <= AT_RISK_FRACTION && life.days <= AT_RISK_DAYS) {
      atRisk = true;
      flags.push(flag('signatures-expiring-soon', 'high', 'warning', {
        covers: signature.covers, days: life.days, lifetimeDays: life.lifetimeDays,
      }));
    } else if (life.fraction <= NOTICE_FRACTION) {
      flags.push(flag('signatures-expiring', 'low', 'warning', {
        covers: signature.covers, days: life.days, lifetimeDays: life.lifetimeDays,
      }));
    }
  }

  for (const signature of signatures) {
    if (signature.reason === 'signature-expired') {
      flags.push(flag('signature-expired', 'critical', 'failed', { keyTag: signature.keyTag }));
    }
  }

  /* ---------------- proof of non-existence ---------------- */

  const nsec = await inspectNsec(session, domain, at);
  flags.push(...nsec.flags);

  return {
    enabled: true,
    ds,
    keys,
    signatures,
    chain: { dsMatchesKsk, dnskeySigned, zoneDataSigned },
    secure: Boolean(dsMatchesKsk && dnskeySigned && zoneDataSigned !== false),
    signaturesAtRisk: atRisk,
    nsec: nsec.summary,
    incomplete: incomplete.length ? incomplete : undefined,
    flags,
  };
}

/**
 * How the zone proves a name does not exist.
 *
 * NSEC does it by naming the next name in the zone, which lets anybody walk the
 * whole zone one query at a time. NSEC3 hashes the names to stop that, and adds
 * an iteration count that was meant to make the hashing expensive to reverse.
 * It never did — the input is a short name from a small alphabet — and RFC 9276
 * now asks for zero iterations and an empty salt, because the only party the
 * extra rounds reliably slow down is the validating resolver.
 */
async function inspectNsec(session, domain, at) {
  const flags = [];
  const probe = await session.ask({
    name: `zz--nsec-probe-${Date.now().toString(36)}.${domain}`,
    type: 'A',
    dnssec: true,
    ...at,
  });

  if (!probe?.message) {
    return { summary: null, flags: [flag('nsec-probe-failed', 'low', 'unknown', {})] };
  }

  const authorities = probe.message.authorities;
  const nsec3 = authorities.filter(record => record.type === TYPE.NSEC3);
  const nsec = authorities.filter(record => record.type === TYPE.NSEC);

  if (nsec3.length) {
    const worst = nsec3.reduce((a, b) => (b.data.iterations > a.data.iterations ? b : a));
    const summary = {
      kind: 'NSEC3',
      iterations: worst.data.iterations,
      salt: worst.data.salt,
      optOut: nsec3.some(record => record.data.optOut),
    };
    if (worst.data.iterations > 0) {
      flags.push(flag('nsec3-iterations-above-zero', 'low', 'warning',
        { iterations: worst.data.iterations }));
    }
    if (summary.salt !== '-') {
      flags.push(flag('nsec3-salt-present', 'info', 'info', {}));
    }
    if (summary.optOut) {
      flags.push(flag('nsec3-opt-out', 'info', 'info', {}));
    }
    return { summary, flags };
  }

  if (nsec.length) {
    // Not a fault. It does mean the zone can be enumerated, which is a
    // decision rather than an accident, so the report states it plainly.
    flags.push(flag('nsec-zone-walkable', 'info', 'info', {}));
    return { summary: { kind: 'NSEC' }, flags };
  }

  return { summary: { kind: 'none' }, flags };
}
