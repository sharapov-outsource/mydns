/* mydns — the words that are this service's own.
 *
 * The shared vocabulary (buttons, errors, severities, the names of the sibling
 * tools) lives in the service kit and is translated into all twelve languages
 * there. What follows is only what mydns needs on top of that.
 *
 * A language block that is absent falls back to English, which is what the
 * merge in i18n-common.js is for; `npm run check:i18n` reports which languages
 * are in that state and fails on one that is half-finished. To add a language,
 * copy OWN.en, translate the values, and leave the keys alone. */
'use strict';

var OWN = {};

OWN.en = {
  title: 'DNS Check — delegation, DNSSEC and propagation for any domain',
  title_short: 'DNS Check',
  h1: 'DNS Check',
  subtitle: 'Delegation walked from the root, SOA serials across every nameserver, the DNSSEC chain verified here rather than taken on trust',
  ph_host: 'example.com',
  hero_label: 'Domain being checked',
  empty_hint: 'Enter a domain name. The check walks the delegation from the root servers down, asks every authoritative nameserver the same questions, and verifies the DNSSEC signatures itself. It takes a few seconds and around fifty queries.',

  /* ---- stages ---- */
  stage_resolve: 'walking the delegation',
  stage_delegation: 'checking the nameservers',
  stage_soa: 'comparing SOA serials',
  stage_records: 'reading the records',
  stage_dnssec: 'verifying the DNSSEC chain',
  stage_caa: 'looking for CAA',
  stage_propagation: 'asking public resolvers',
  stage_grade: 'grading',

  /* ---- cards ---- */
  card_grade: 'Grade breakdown',
  card_delegation: 'Delegation',
  card_nameservers: 'Nameservers',
  card_soa: 'Zone (SOA)',
  card_records: 'Records',
  card_dnssec: 'DNSSEC',
  card_keys: 'Keys and signatures',
  card_caa: 'CAA',
  card_propagation: 'Public resolvers',
  card_trace: 'Path from the root',

  /* ---- grade components ---- */
  comp_delegation: 'Delegation health',
  comp_dnssec: 'DNSSEC',
  comp_hygiene: 'Zone hygiene',

  /* ---- row labels ---- */
  k_zone: 'Zone',
  k_parent_ns: 'Nameservers at the parent',
  k_zone_ns: 'Nameservers in the zone',
  k_ns_agreement: 'Both sides agree',
  k_only_at_parent: 'Only at the parent',
  k_only_at_zone: 'Only in the zone',
  k_glue: 'Glue records',
  k_answering: 'Answering authoritatively',
  k_ipv6_ns: 'Reachable over IPv6',
  k_primary: 'Primary (MNAME)',
  k_rname: 'Contact (RNAME)',
  k_serial: 'Serial',
  k_serials_agree: 'Serials agree',
  k_refresh: 'Refresh',
  k_retry: 'Retry',
  k_expire: 'Expire',
  k_minimum: 'Negative TTL',
  k_a: 'A',
  k_aaaa: 'AAAA',
  k_mx: 'MX',
  k_txt: 'TXT',
  k_ns: 'NS',
  k_srv: 'SRV',
  k_apex_ttl: 'TTL at the apex',
  k_wildcard: 'Wildcard',
  k_enabled: 'Signed',
  k_ds_at_parent: 'DS at the parent',
  k_chain_ds: 'DS matches the key',
  k_chain_key: 'Key set is signed',
  k_chain_zone: 'Zone data is signed',
  k_nsec_kind: 'Proof of non-existence',
  k_nsec3_iterations: 'NSEC3 iterations',
  k_soonest_expiry: 'Next signature expiry',
  k_caa_at: 'Published at',
  k_caa_issue: 'May issue',
  k_caa_issuewild: 'May issue wildcards',
  k_caa_iodef: 'Report violations to',
  k_resolvers_agree: 'Resolvers agree',
  k_longest_ttl: 'Longest remaining TTL',
  k_validating: 'Validated DNSSEC',
  k_queries: 'Queries made',

  /* ---- table headings ---- */
  th_nameserver: 'Nameserver',
  th_status: 'Status',
  th_addresses: 'Addresses',
  th_serial: 'Serial',
  th_response: 'Response',
  th_resolver: 'Resolver',
  th_answer: 'Answer',
  th_ttl: 'TTL left',
  th_keytag: 'Key tag',
  th_role: 'Role',
  th_algorithm: 'Algorithm',
  th_bits: 'Bits',
  th_covers: 'Covers',
  th_valid: 'Valid',
  th_expires: 'Expires',
  th_type: 'Type',
  th_value: 'Value',

  /* ---- values ---- */
  nss_authoritative: 'authoritative',
  nss_lame: 'lame',
  nss_silent: 'no answer',
  nss_unresolvable: 'will not resolve',
  nsec_nsec: 'NSEC',
  nsec_nsec3: 'NSEC3',
  nsec_none: 'none',
  v_seconds: '{n}s',
  v_days: '{n} days',
  v_of_lifetime: '{days} days left of {total}',
  v_root: 'root',

  /* ---- notes ---- */
  note_delegation: 'The parent zone and the zone itself each publish an NS set. Nothing forces them to match, and when they drift the domain works until a resolver happens to cache the other one.',
  note_soa: 'Every authoritative server is asked separately. A server whose serial has fallen behind is still answering — with an older copy of the zone.',
  note_dnssec: 'The chain is verified here: the digest in the parent DS is recomputed from the zone key, and each signature is checked against the key material. No resolver is asked whether it was satisfied.',
  note_propagation: 'There is no global DNS state to propagate to — only caches, each holding what it was told until its TTL runs out. The remaining TTL is how much longer each of these will keep saying it.',
  note_trace: 'Each step is a referral: the server on the left was asked about the domain and answered with the nameservers on the right.',

  /* ---- errors specific to this service ---- */
  err_zone_not_found: 'No zone was found for that name.',
  err_dns_timeout: 'A nameserver did not answer in time.',
  err_dns_network: 'A nameserver could not be reached.',
  err_dns_unreachable: 'None of the nameservers answered.',

  /* ---- what was not established ---- */
  inc_zone_not_found: 'the name is not delegated, so there was nothing to inspect',
  inc_delegation_walk_incomplete: 'the walk from the root did not finish',
  inc_no_authoritative_server_answered: 'no authoritative nameserver answered',
  inc_ds_lookup_failed: 'the DS record at the parent could not be read',
  inc_dnskey_lookup_failed: 'the DNSKEY set could not be read',
  inc_dnskey_rrsig_missing: 'no signature over the DNSKEY set was returned',
  inc_soa_rrsig_unavailable: 'no signature over the zone data was returned',

  /* ---- grade caps ---- */
  cap_domain_does_not_exist: 'the domain does not exist',
  cap_no_delegation: 'the name is not delegated',
  cap_no_authoritative_nameserver: 'no nameserver answers authoritatively',
  cap_dnssec_chain_broken: 'the DNSSEC chain is broken',
  cap_signature_expired: 'a signature has expired',
  cap_cname_at_apex: 'a CNAME at the apex',
  cap_lame_delegation: 'a lame delegation',
  cap_nameserver_not_answering: 'a listed nameserver does not answer',
  cap_ns_set_mismatch: 'the two sides of the delegation disagree',
  cap_serial_mismatch: 'the servers hold different versions of the zone',
  cap_missing_glue: 'a nameserver inside the zone has no glue',
  cap_single_nameserver: 'only one nameserver',
  cap_cname_with_other_data: 'a CNAME beside other records',
  cap_signed_but_no_ds: 'signed, but with no DS at the parent',
  cap_weak_dnssec_algorithm: 'a signing algorithm that is no longer sound',
  cap_weak_dnssec_key: 'a signing key that is too short',
  cap_scan_incomplete: 'the check was incomplete, so no grade was given',

  /* ---- findings ---- */
  flag_delegation_walk_failed: 'The walk from the root did not finish',
  fd_delegation_walk_failed: 'A server on the path from the root did not answer, so part of the delegation could not be examined. This is about our reachability as much as theirs.',

  flag_nxdomain: 'The domain does not exist',
  fd_nxdomain: 'The parent zone answered NXDOMAIN: there is no delegation for this name. Either it was never registered, or the registration has lapsed.',

  flag_no_delegation: 'The name is not delegated',
  fd_no_delegation: 'No zone was found for the name. It may exist as a record inside a parent zone, but it is not a zone of its own with nameservers.',

  flag_referral_off_path: 'A referral pointed away from the name',
  fd_referral_off_path: 'A server referred us to a zone that is not an ancestor of the name asked about. That is a misconfiguration, and following it would be a way of being led somewhere else.',

  flag_nameserver_unresolvable: 'A nameserver name will not resolve',
  fd_nameserver_unresolvable: 'The delegation lists a nameserver whose own name has no address records. A resolver that picks it wastes a lookup and then has to try another.',

  flag_ns_set_mismatch: 'The parent and the zone list different nameservers',
  fd_ns_set_mismatch: 'The delegation at the parent and the NS records in the zone do not match. Both are used in practice, so the domain will behave differently depending on which set a resolver cached — the classic cause of a fault that comes and goes.',

  flag_single_nameserver: 'Only one nameserver',
  fd_single_nameserver: 'RFC 1034 asks for at least two, on separate networks. With one, any outage of that machine is an outage of the whole domain, including mail.',

  flag_nameserver_silent: 'A nameserver does not answer',
  fd_nameserver_silent: 'A server named in the delegation did not respond. Resolvers will keep trying it and waiting for the timeout before moving on, which shows up as a domain that is intermittently slow.',

  flag_lame_delegation: 'A nameserver is not authoritative for the zone',
  fd_lame_delegation: 'The server answers, but without the authoritative flag: it has not been configured for this zone. This is a lame delegation, and every resolver that picks that server has to start again elsewhere.',

  flag_ns_points_at_cname: 'A nameserver name is an alias',
  fd_ns_points_at_cname: 'RFC 2181 §10.3 requires an NS record to name a host with address records, not a CNAME. Some resolvers cope; others simply fail.',

  flag_missing_glue: 'A nameserver inside the zone has no glue record',
  fd_missing_glue: 'The nameserver lives inside the zone it serves, so resolving its address requires asking the zone — which requires the address. The parent must publish glue to break the circle.',

  flag_no_authoritative_nameserver: 'Nothing answers for this zone',
  fd_no_authoritative_nameserver: 'Not one of the listed nameservers claimed authority. As far as a resolver is concerned, the domain does not work at all.',

  flag_no_ipv6_nameserver: 'No nameserver is reachable over IPv6',
  fd_no_ipv6_nameserver: 'Resolvers on IPv6-only networks reach the zone through a translator, if at all. Adding an AAAA record for one nameserver is usually a five-minute change.',

  flag_nameservers_single_network: 'All nameservers are in one network',
  fd_nameservers_single_network: 'The addresses share a /24, which usually means one datacentre and often one rack. Two nameservers in the same place fail together.',

  flag_serial_mismatch: 'The nameservers hold different versions of the zone',
  fd_serial_mismatch: 'The SOA serials differ, so at least one secondary has stopped following the primary — a failed transfer, an expired key, a firewall rule. It keeps answering, with stale records, and nothing anywhere reports an error.',

  flag_soa_timer_out_of_range: 'An SOA timer is outside the usual range',
  fd_soa_timer_out_of_range: 'The value is outside what RFC 1912 recommends. Not a fault on its own — but these are usually inherited from a template nobody revisited.',

  flag_soa_retry_above_refresh: 'Retry is not shorter than refresh',
  fd_soa_retry_above_refresh: 'Retry is meant to be the shorter interval used after a failed refresh. When it is the longer one, a failed transfer waits a whole refresh cycle before being attempted again.',

  flag_soa_expire_too_short: 'Expire is short relative to the other timers',
  fd_soa_expire_too_short: 'If a secondary cannot reach the primary for this long it stops answering entirely. Set below a couple of refresh attempts, a long weekend of trouble takes the zone off the air.',

  flag_soa_rname_has_at: 'The contact address contains an @',
  fd_soa_rname_has_at: 'The RNAME field is an email address with the @ written as a dot. A literal @ makes it unparseable, so automated reports about the zone go nowhere.',

  flag_primary_not_in_ns_set: 'The primary is not one of the published nameservers',
  fd_primary_not_in_ns_set: 'The SOA names a primary that is not in the NS set. This is exactly how a hidden primary is run, so it is a note rather than a fault.',

  flag_cname_at_apex: 'A CNAME at the apex of the zone',
  fd_cname_at_apex: 'RFC 1034 §3.6.2: a name with a CNAME has no other records. The apex always has SOA and NS, so the two cannot both hold. Some resolvers return the CNAME and drop the rest; some ignore it; mail delivery is often the first thing to break.',

  flag_cname_with_other_data: 'A CNAME beside other records',
  fd_cname_with_other_data: 'The same name has a CNAME and at least one other record type. Which one a resolver hands back depends on what it was asked for first, which is not a property you want your DNS to have.',

  flag_no_address_at_apex: 'The apex has no address',
  fd_no_address_at_apex: 'There is no A or AAAA record for the domain itself. Deliberate for a domain used only for mail; a surprise for anyone typing it into a browser.',

  flag_no_ipv6: 'No AAAA record',
  fd_no_ipv6: 'The domain resolves over IPv4 only. Visitors on IPv6-only mobile networks reach it through their carrier translator.',

  flag_ttl_very_short: 'A very short TTL at the apex',
  fd_ttl_very_short: 'Under a minute. That is a migration setting, and it is often left behind after the migration — it multiplies the query load on the nameservers for as long as it stays.',

  flag_ttl_very_long: 'A very long TTL at the apex',
  fd_ttl_very_long: 'Over two days. Any change to the address will take that long to reach everyone, which is a bad position to be in during an incident.',

  flag_wildcard_record: 'The zone has a wildcard',
  fd_wildcard_record: 'A name that certainly does not exist still got an answer, so a wildcard is in play. Worth knowing, because it means "the record exists" may only mean "the wildcard matched".',

  flag_txt_split_into_chunks: 'A TXT record is split into several strings',
  fd_txt_split_into_chunks: 'Normal for anything over 255 bytes — the pieces are concatenated with nothing between them. It is listed because parsers that join them with a space quietly corrupt SPF and DKIM records.',

  flag_ds_without_dnskey: 'The parent says the zone is signed and it is not',
  fd_ds_without_dnskey: 'There is a DS record at the parent but no DNSKEY in the zone. Every validating resolver treats this as an attack and refuses to answer, so the domain is unreachable for a large share of the internet.',

  flag_dnssec_not_enabled: 'The zone is not signed',
  fd_dnssec_not_enabled: 'No DNSSEC. Answers for this domain cannot be distinguished from answers somebody made up, which is what DNSSEC exists to prevent.',

  flag_no_key_signing_key: 'No separate key-signing key',
  fd_no_key_signing_key: 'The zone signs with a single key rather than splitting the roles. Legal, and simpler — but every key change then means updating the DS at the registrar.',

  flag_weak_key_algorithm: 'A signing algorithm that is no longer sound',
  fd_weak_key_algorithm: 'The key uses an algorithm — RSA/SHA-1, DSA or MD5 — that is not considered safe. SHA-1 collisions have been practical since 2017, and the root zone no longer accepts these for new delegations.',

  flag_rsa_key_too_short: 'An RSA signing key under 2048 bits',
  fd_rsa_key_too_short: 'Anything shorter is below the current recommendation and should be rolled. The rollover is routine; leaving it is not.',

  flag_key_revoked: 'A key is marked revoked',
  fd_key_revoked: 'The REVOKE bit is set. This is part of an orderly rollover (RFC 5011) and should disappear once the rollover finishes — if it has been there for months, it did not.',

  flag_key_not_a_zone_key: 'A DNSKEY without the zone flag',
  fd_key_not_a_zone_key: 'The key is published in the DNSKEY set but not marked as a zone key, so it cannot be used to validate anything in the zone.',

  flag_dnskey_not_signed: 'The key set carries no signature',
  fd_dnskey_not_signed: 'A DNSKEY set without an RRSIG over it cannot be trusted by anything. Validating resolvers will refuse the whole zone.',

  flag_dnskey_signature_invalid: 'The signature over the key set does not verify',
  fd_dnskey_signature_invalid: 'The RRSIG covering the DNSKEY set failed verification here. Validating resolvers will reach the same conclusion and stop answering for the domain.',

  flag_ds_weak_digest: 'The DS uses a weak digest',
  fd_ds_weak_digest: 'The digest at the parent is SHA-1. Publish a SHA-256 DS alongside it, then withdraw the old one.',

  flag_ds_points_at_missing_key: 'The DS points at a key the zone does not publish',
  fd_ds_points_at_missing_key: 'The parent vouches for a key tag that is not in the zone. This is what a key rollover looks like when the registrar update was forgotten, and it breaks validation completely.',

  flag_ds_digest_mismatch: 'The DS does not match the zone key',
  fd_ds_digest_mismatch: 'The digest recomputed from the published key does not equal the one at the parent. The chain from the root is broken and validating resolvers will refuse the domain.',

  flag_signed_but_no_ds: 'Signed, but nothing anchors it',
  fd_signed_but_no_ds: 'The zone is signed and the parent publishes no DS, so there is no path from the root to these signatures — nothing validates them. Usually a registrar step that was never completed.',

  flag_zone_data_signature_invalid: 'A signature over the zone data does not verify',
  fd_zone_data_signature_invalid: 'The SOA record is signed, and the signature does not check out against the published keys. Validating resolvers will refuse the domain.',

  flag_zone_data_not_signed: 'The zone data carries no signatures',
  fd_zone_data_not_signed: 'Keys are published but the records themselves are not signed, so the zone is signed in name only.',

  flag_signatures_expiring_soon: 'Signatures are near the end of their life',
  fd_signatures_expiring_soon: 'Little of the signature validity window is left. If whatever re-signs the zone has stopped, the domain will disappear for every validating resolver when the window closes — and it will do so without warning.',

  flag_signatures_expiring: 'Signatures are past the middle of their window',
  fd_signatures_expiring: 'Normal for a zone that re-signs regularly, and shown so a stalled signer can be recognised before it becomes urgent.',

  flag_signature_expired: 'A signature has expired',
  fd_signature_expired: 'The validity window has closed. Every validating resolver treats the answer as forged, which takes the domain off the internet for them.',

  flag_nsec_probe_failed: 'Could not see how non-existence is proved',
  fd_nsec_probe_failed: 'The query for a deliberately absent name did not come back, so NSEC and NSEC3 could not be examined.',

  flag_nsec3_iterations_above_zero: 'NSEC3 uses extra hash iterations',
  fd_nsec3_iterations_above_zero: 'RFC 9276 asks for zero. The extra rounds were meant to make zone enumeration expensive; they never did, and the only party they reliably slow down is the validating resolver.',

  flag_nsec3_salt_present: 'NSEC3 uses a salt',
  fd_nsec3_salt_present: 'RFC 9276 asks for an empty salt. It adds no protection — the salt is published in the record — and it forces a re-salt to be a full zone re-signing.',

  flag_nsec3_opt_out: 'NSEC3 opt-out is in use',
  fd_nsec3_opt_out: 'Unsigned delegations inside the zone are not proved absent. Reasonable for a very large zone, unnecessary for most.',

  flag_nsec_zone_walkable: 'The zone can be enumerated',
  fd_nsec_zone_walkable: 'NSEC proves a name absent by naming the next one that exists, so the whole zone can be read one query at a time. A deliberate choice for many, and worth stating plainly.',

  flag_caa_missing: 'No CAA record',
  fd_caa_missing: 'Nothing restricts which certificate authority may issue for this domain. Every authority in the CA/Browser baseline has had to honour CAA since 2017, so this is a free restriction that is simply not being used.',

  flag_caa_forbids_issuance: 'CAA forbids all issuance',
  fd_caa_forbids_issuance: 'The record is a lone semicolon: no authority may issue for this name. Deliberate for a domain that should never have a certificate, and a costly typo for one that should.',

  flag_caa_no_iodef: 'CAA has no reporting address',
  fd_caa_no_iodef: 'Without an iodef property, an authority that refuses a request because of your CAA record has nowhere to tell you about it — which is precisely when you would want to know.',

  flag_caa_no_issuewild: 'No separate rule for wildcards',
  fd_caa_no_issuewild: 'Without issuewild, the issue set governs wildcard certificates too. Often what is intended; stated so it is not assumed.',

  flag_caa_unknown_tag: 'An unrecognised CAA property',
  fd_caa_unknown_tag: 'The record contains a property tag outside the standard set. Authorities will ignore it.',

  flag_caa_unknown_critical_tag: 'An unrecognised CAA property marked critical',
  fd_caa_unknown_critical_tag: 'The critical flag is set on a tag we do not recognise. An authority that also does not recognise it is required to refuse issuance entirely, so this can block certificates without any obvious cause.',

  flag_no_resolver_answered: 'No public resolver answered',
  fd_no_resolver_answered: 'None of the six public resolvers returned an answer for this name. Either the zone is unreachable, or our own outbound path to them is.',

  flag_resolvers_disagree: 'Public resolvers give different answers',
  fd_resolvers_disagree: 'Two or more resolvers currently hold different records. Normal for a few hours after a change — each cache waits out its own TTL — and a problem if it persists past the longest TTL shown here.',

  flag_some_resolvers_silent: 'Some public resolvers did not answer',
  fd_some_resolvers_silent: 'At least one resolver did not respond in time. Usually its own load or a filtered path, and listed rather than ignored so nothing is inferred from silence.',
};

OWN.ru = {
  title: 'Проверка DNS — делегирование, DNSSEC и распространение для любого домена',
  title_short: 'Проверка DNS',
  h1: 'Проверка DNS',
  subtitle: 'Обход делегирования от корня, серийники SOA со всех серверов, цепочка DNSSEC проверяется здесь, а не принимается на веру',
  ph_host: 'example.com',
  hero_label: 'Проверяемый домен',
  empty_hint: 'Введите доменное имя. Проверка проходит делегирование от корневых серверов вниз, задаёт одни и те же вопросы каждому авторитетному серверу и сама сверяет подписи DNSSEC. Занимает несколько секунд и около полусотни запросов.',

  stage_resolve: 'обход делегирования',
  stage_delegation: 'проверка серверов имён',
  stage_soa: 'сверка серийников SOA',
  stage_records: 'чтение записей',
  stage_dnssec: 'проверка цепочки DNSSEC',
  stage_caa: 'поиск CAA',
  stage_propagation: 'опрос публичных резолверов',
  stage_grade: 'выставление оценки',

  card_grade: 'Из чего сложилась оценка',
  card_delegation: 'Делегирование',
  card_nameservers: 'Серверы имён',
  card_soa: 'Зона (SOA)',
  card_records: 'Записи',
  card_dnssec: 'DNSSEC',
  card_keys: 'Ключи и подписи',
  card_caa: 'CAA',
  card_propagation: 'Публичные резолверы',
  card_trace: 'Путь от корня',

  comp_delegation: 'Здоровье делегирования',
  comp_dnssec: 'DNSSEC',
  comp_hygiene: 'Гигиена зоны',

  k_zone: 'Зона',
  k_parent_ns: 'Серверы у родителя',
  k_zone_ns: 'Серверы в самой зоне',
  k_ns_agreement: 'Обе стороны совпадают',
  k_only_at_parent: 'Только у родителя',
  k_only_at_zone: 'Только в зоне',
  k_glue: 'Glue-записи',
  k_answering: 'Отвечают авторитетно',
  k_ipv6_ns: 'Доступны по IPv6',
  k_primary: 'Первичный (MNAME)',
  k_rname: 'Контакт (RNAME)',
  k_serial: 'Серийник',
  k_serials_agree: 'Серийники совпадают',
  k_refresh: 'Refresh',
  k_retry: 'Retry',
  k_expire: 'Expire',
  k_minimum: 'TTL отрицательных ответов',
  k_a: 'A',
  k_aaaa: 'AAAA',
  k_mx: 'MX',
  k_txt: 'TXT',
  k_ns: 'NS',
  k_srv: 'SRV',
  k_apex_ttl: 'TTL на вершине зоны',
  k_wildcard: 'Wildcard',
  k_enabled: 'Подписана',
  k_ds_at_parent: 'DS у родителя',
  k_chain_ds: 'DS соответствует ключу',
  k_chain_key: 'Набор ключей подписан',
  k_chain_zone: 'Данные зоны подписаны',
  k_nsec_kind: 'Доказательство отсутствия',
  k_nsec3_iterations: 'Итерации NSEC3',
  k_soonest_expiry: 'Ближайшее истечение подписи',
  k_caa_at: 'Опубликована на',
  k_caa_issue: 'Могут выпускать',
  k_caa_issuewild: 'Могут выпускать wildcard',
  k_caa_iodef: 'Сообщать о нарушениях',
  k_resolvers_agree: 'Резолверы согласны',
  k_longest_ttl: 'Наибольший остаток TTL',
  k_validating: 'Проверили DNSSEC',
  k_queries: 'Сделано запросов',

  th_nameserver: 'Сервер имён',
  th_status: 'Состояние',
  th_addresses: 'Адреса',
  th_serial: 'Серийник',
  th_response: 'Отклик',
  th_resolver: 'Резолвер',
  th_answer: 'Ответ',
  th_ttl: 'Остаток TTL',
  th_keytag: 'Тег ключа',
  th_role: 'Роль',
  th_algorithm: 'Алгоритм',
  th_bits: 'Бит',
  th_covers: 'Покрывает',
  th_valid: 'Верна',
  th_expires: 'Истекает',
  th_type: 'Тип',
  th_value: 'Значение',

  nss_authoritative: 'авторитетный',
  nss_lame: 'не авторитетен',
  nss_silent: 'не отвечает',
  nss_unresolvable: 'имя не разрешается',
  nsec_nsec: 'NSEC',
  nsec_nsec3: 'NSEC3',
  nsec_none: 'нет',
  v_seconds: '{n} с',
  v_days: '{n} дн.',
  v_of_lifetime: 'осталось {days} дн. из {total}',
  v_root: 'корень',

  note_delegation: 'Родительская зона и сама зона публикуют каждая свой набор NS. Совпадать они не обязаны, и при расхождении домен работает ровно до того момента, когда очередной резолвер закэширует другой набор.',
  note_soa: 'Каждый авторитетный сервер опрашивается отдельно. Сервер с отставшим серийником продолжает отвечать — но более старой копией зоны.',
  note_dnssec: 'Цепочка проверяется здесь: дайджест из DS у родителя вычисляется заново из ключа зоны, а каждая подпись сверяется с ключевым материалом. Никакого «резолвер сказал, что всё хорошо».',
  note_propagation: 'Распространяться некуда: глобального состояния DNS нет, есть кэши, каждый из которых держит своё, пока не истечёт TTL. Остаток TTL и есть ответ на вопрос «сколько ещё ждать».',
  note_trace: 'Каждый шаг — это отсылка: сервер слева спросили о домене, и он ответил серверами справа.',

  err_zone_not_found: 'Для этого имени не нашлось зоны.',
  err_dns_timeout: 'Сервер имён не ответил вовремя.',
  err_dns_network: 'До сервера имён не удалось достучаться.',
  err_dns_unreachable: 'Ни один сервер имён не ответил.',

  inc_zone_not_found: 'имя не делегировано, проверять было нечего',
  inc_delegation_walk_incomplete: 'обход от корня не завершился',
  inc_no_authoritative_server_answered: 'ни один авторитетный сервер не ответил',
  inc_ds_lookup_failed: 'не удалось прочитать запись DS у родителя',
  inc_dnskey_lookup_failed: 'не удалось прочитать набор DNSKEY',
  inc_dnskey_rrsig_missing: 'подпись над набором DNSKEY не вернулась',
  inc_soa_rrsig_unavailable: 'подпись над данными зоны не вернулась',

  cap_domain_does_not_exist: 'домен не существует',
  cap_no_delegation: 'имя не делегировано',
  cap_no_authoritative_nameserver: 'ни один сервер не отвечает авторитетно',
  cap_dnssec_chain_broken: 'цепочка DNSSEC разорвана',
  cap_signature_expired: 'подпись истекла',
  cap_cname_at_apex: 'CNAME на вершине зоны',
  cap_lame_delegation: 'lame-делегирование',
  cap_nameserver_not_answering: 'заявленный сервер имён не отвечает',
  cap_ns_set_mismatch: 'стороны делегирования расходятся',
  cap_serial_mismatch: 'серверы держат разные версии зоны',
  cap_missing_glue: 'у сервера внутри зоны нет glue-записи',
  cap_single_nameserver: 'единственный сервер имён',
  cap_cname_with_other_data: 'CNAME рядом с другими записями',
  cap_signed_but_no_ds: 'подписана, но без DS у родителя',
  cap_weak_dnssec_algorithm: 'алгоритм подписи больше не считается надёжным',
  cap_weak_dnssec_key: 'слишком короткий ключ подписи',
  cap_scan_incomplete: 'проверка неполная, поэтому оценка не выставлена',

  flag_delegation_walk_failed: 'Обход от корня не завершился',
  fd_delegation_walk_failed: 'Один из серверов на пути от корня не ответил, поэтому часть делегирования рассмотреть не удалось. Это в равной мере про нашу доступность, а не только про их.',

  flag_nxdomain: 'Домен не существует',
  fd_nxdomain: 'Родительская зона ответила NXDOMAIN: делегирования для этого имени нет. Либо оно никогда не регистрировалось, либо регистрация истекла.',

  flag_no_delegation: 'Имя не делегировано',
  fd_no_delegation: 'Зоны для имени не нашлось. Оно может существовать как запись внутри родительской зоны, но собственной зоной с серверами имён не является.',

  flag_referral_off_path: 'Отсылка увела в сторону от имени',
  fd_referral_off_path: 'Сервер отправил нас в зону, которая не является предком запрошенного имени. Это ошибка настройки, и пойти по такой отсылке — верный способ оказаться не там.',

  flag_nameserver_unresolvable: 'Имя сервера не разрешается',
  fd_nameserver_unresolvable: 'В делегировании указан сервер, у имени которого нет адресных записей. Резолвер, выбравший его, тратит запрос впустую и вынужден пробовать следующий.',

  flag_ns_set_mismatch: 'У родителя и в зоне разные серверы имён',
  fd_ns_set_mismatch: 'Делегирование у родителя и NS-записи в самой зоне не совпадают. На практике используются оба набора, поэтому домен ведёт себя по-разному в зависимости от того, что закэшировал резолвер, — классическая причина плавающего сбоя.',

  flag_single_nameserver: 'Единственный сервер имён',
  fd_single_nameserver: 'RFC 1034 просит как минимум два, в разных сетях. С одним любая его недоступность — это недоступность всего домена, включая почту.',

  flag_nameserver_silent: 'Сервер имён не отвечает',
  fd_nameserver_silent: 'Сервер, указанный в делегировании, не ответил. Резолверы будут продолжать к нему обращаться и ждать таймаута, прежде чем перейти к следующему, — снаружи это выглядит как домен, который временами тормозит.',

  flag_lame_delegation: 'Сервер не авторитетен для зоны',
  fd_lame_delegation: 'Сервер отвечает, но без флага авторитетности: эта зона на нём не настроена. Это lame-делегирование, и каждый резолвер, попавший на такой сервер, начинает поиск заново.',

  flag_ns_points_at_cname: 'Имя сервера — это псевдоним',
  fd_ns_points_at_cname: 'RFC 2181 §10.3 требует, чтобы NS указывал на хост с адресными записями, а не на CNAME. Часть резолверов справляется, часть просто отваливается.',

  flag_missing_glue: 'У сервера внутри зоны нет glue-записи',
  fd_missing_glue: 'Сервер имён живёт внутри зоны, которую обслуживает, поэтому для получения его адреса нужно спросить зону — а для этого нужен адрес. Родитель обязан опубликовать glue, чтобы разорвать круг.',

  flag_no_authoritative_nameserver: 'За зону никто не отвечает',
  fd_no_authoritative_nameserver: 'Ни один из перечисленных серверов не заявил авторитетность. С точки зрения резолвера домен просто не работает.',

  flag_no_ipv6_nameserver: 'Ни один сервер имён недоступен по IPv6',
  fd_no_ipv6_nameserver: 'Резолверы в IPv6-only сетях доберутся до зоны через трансляцию, если доберутся вообще. Добавить AAAA хотя бы одному серверу — обычно дело пяти минут.',

  flag_nameservers_single_network: 'Все серверы имён в одной сети',
  fd_nameservers_single_network: 'Адреса лежат в одной /24, а это как правило один дата-центр и нередко одна стойка. Два сервера в одном месте падают вместе.',

  flag_serial_mismatch: 'Серверы держат разные версии зоны',
  fd_serial_mismatch: 'Серийники SOA расходятся, то есть хотя бы один вторичный перестал следовать за первичным: сорванный трансфер, истёкший ключ, новое правило фаервола. Он продолжает отвечать устаревшими записями, и никакой ошибки при этом нигде не видно.',

  flag_soa_timer_out_of_range: 'Таймер SOA вне привычного диапазона',
  fd_soa_timer_out_of_range: 'Значение выходит за рекомендации RFC 1912. Само по себе не поломка — но такие числа обычно достаются по наследству от шаблона, к которому никто не возвращался.',

  flag_soa_retry_above_refresh: 'Retry не короче refresh',
  fd_soa_retry_above_refresh: 'Retry — это укороченный интервал после неудачного обновления. Когда он длиннее, сорванный трансфер ждёт целый цикл refresh, прежде чем повторить попытку.',

  flag_soa_expire_too_short: 'Expire мал относительно остальных таймеров',
  fd_soa_expire_too_short: 'Если вторичный не сможет достучаться до первичного столько времени, он вообще перестанет отвечать. При значении меньше пары попыток refresh длинные выходные с неполадками уводят зону в тишину.',

  flag_soa_rname_has_at: 'В контактном адресе стоит @',
  fd_soa_rname_has_at: 'Поле RNAME — это адрес почты, в котором @ записывается точкой. Буквальная @ делает его неразбираемым, и автоматические уведомления о зоне уходят в никуда.',

  flag_primary_not_in_ns_set: 'Первичный сервер не входит в опубликованный набор',
  fd_primary_not_in_ns_set: 'SOA называет первичным сервер, которого нет в наборе NS. Ровно так работает скрытый первичный, поэтому это заметка, а не ошибка.',

  flag_cname_at_apex: 'CNAME на вершине зоны',
  fd_cname_at_apex: 'RFC 1034 §3.6.2: у имени с CNAME не может быть других записей. На вершине всегда есть SOA и NS, так что одновременно верным это быть не может. Одни резолверы возвращают CNAME и теряют остальное, другие его игнорируют; первой обычно ломается почта.',

  flag_cname_with_other_data: 'CNAME рядом с другими записями',
  fd_cname_with_other_data: 'У одного имени есть и CNAME, и записи других типов. Что вернёт резолвер, зависит от того, о чём его спросили первым, — не то свойство, которое хочется иметь в DNS.',

  flag_no_address_at_apex: 'У вершины зоны нет адреса',
  fd_no_address_at_apex: 'Ни A, ни AAAA для самого домена. Осознанно для домена, используемого только под почту, и неожиданно для того, кто набрал его в браузере.',

  flag_no_ipv6: 'Нет записи AAAA',
  fd_no_ipv6: 'Домен разрешается только по IPv4. Посетители в IPv6-only мобильных сетях доберутся до него через трансляцию оператора.',

  flag_ttl_very_short: 'Очень короткий TTL на вершине',
  fd_ttl_very_short: 'Меньше минуты. Это настройка на время переезда, и её часто забывают вернуть — всё это время она кратно увеличивает нагрузку на серверы имён.',

  flag_ttl_very_long: 'Очень длинный TTL на вершине',
  fd_ttl_very_long: 'Больше двух суток. Любая смена адреса будет доходить до всех ровно столько же — крайне неудобное положение во время инцидента.',

  flag_wildcard_record: 'В зоне есть wildcard',
  fd_wildcard_record: 'На заведомо несуществующее имя пришёл ответ, значит работает wildcard. Знать об этом стоит: «запись есть» может означать всего лишь «сработала звёздочка».',

  flag_txt_split_into_chunks: 'Запись TXT разбита на несколько строк',
  fd_txt_split_into_chunks: 'Нормально для всего, что длиннее 255 байт: куски склеиваются без разделителя. Показано потому, что разборщики, соединяющие их пробелом, тихо портят SPF и DKIM.',

  flag_ds_without_dnskey: 'Родитель считает зону подписанной, а она не подписана',
  fd_ds_without_dnskey: 'У родителя есть DS, а в зоне нет DNSKEY. Любой проверяющий резолвер расценивает это как атаку и отказывается отвечать, то есть для заметной части интернета домен недоступен.',

  flag_dnssec_not_enabled: 'Зона не подписана',
  fd_dnssec_not_enabled: 'DNSSEC не включён. Отличить ответ для этого домена от выдуманного нельзя — а именно для этого DNSSEC и существует.',

  flag_no_key_signing_key: 'Нет отдельного ключа подписи ключей',
  fd_no_key_signing_key: 'Зона подписывается одним ключом, без разделения ролей. Это допустимо и проще, но тогда каждая смена ключа требует обновления DS у регистратора.',

  flag_weak_key_algorithm: 'Алгоритм подписи больше не считается надёжным',
  fd_weak_key_algorithm: 'Ключ использует RSA/SHA-1, DSA или MD5. Коллизии SHA-1 практически достижимы с 2017 года, и корневая зона больше не принимает такие алгоритмы для новых делегирований.',

  flag_rsa_key_too_short: 'Ключ RSA короче 2048 бит',
  fd_rsa_key_too_short: 'Всё, что короче, ниже текущих рекомендаций и подлежит замене. Смена ключа — рутинная операция; оставлять как есть — нет.',

  flag_key_revoked: 'Ключ помечен отозванным',
  fd_key_revoked: 'Выставлен бит REVOKE. Это часть штатной смены ключа по RFC 5011, и он должен исчезнуть по её завершении — если он держится месяцами, смена не завершилась.',

  flag_key_not_a_zone_key: 'DNSKEY без флага зоны',
  fd_key_not_a_zone_key: 'Ключ опубликован в наборе DNSKEY, но не помечен как ключ зоны, поэтому проверить им ничего в зоне нельзя.',

  flag_dnskey_not_signed: 'Набор ключей не подписан',
  fd_dnskey_not_signed: 'DNSKEY без RRSIG над ним не даёт ничему доверять. Проверяющие резолверы отвергнут зону целиком.',

  flag_dnskey_signature_invalid: 'Подпись над набором ключей не сходится',
  fd_dnskey_signature_invalid: 'RRSIG, покрывающая набор DNSKEY, не прошла проверку здесь. Проверяющие резолверы придут к тому же выводу и перестанут отвечать за домен.',

  flag_ds_weak_digest: 'DS использует слабый дайджест',
  fd_ds_weak_digest: 'Дайджест у родителя — SHA-1. Стоит опубликовать рядом DS с SHA-256, а старый затем убрать.',

  flag_ds_points_at_missing_key: 'DS указывает на ключ, которого в зоне нет',
  fd_ds_points_at_missing_key: 'Родитель ручается за тег ключа, отсутствующий в зоне. Так выглядит смена ключа, при которой забыли обновить данные у регистратора, и валидация ломается полностью.',

  flag_ds_digest_mismatch: 'DS не соответствует ключу зоны',
  fd_ds_digest_mismatch: 'Дайджест, пересчитанный из опубликованного ключа, не совпадает с тем, что лежит у родителя. Цепочка от корня разорвана, проверяющие резолверы домен отвергнут.',

  flag_signed_but_no_ds: 'Подписана, но ничем не закреплена',
  fd_signed_but_no_ds: 'Зона подписана, а DS у родителя нет, то есть от корня до этих подписей нет пути и проверить их нечем. Обычно это незавершённый шаг у регистратора.',

  flag_zone_data_signature_invalid: 'Подпись над данными зоны не сходится',
  fd_zone_data_signature_invalid: 'Запись SOA подписана, и подпись не проходит проверку опубликованными ключами. Проверяющие резолверы домен отвергнут.',

  flag_zone_data_not_signed: 'Данные зоны не подписаны',
  fd_zone_data_not_signed: 'Ключи опубликованы, а сами записи не подписаны, то есть зона подписана лишь на бумаге.',

  flag_signatures_expiring_soon: 'Подписи близки к концу срока',
  fd_signatures_expiring_soon: 'От срока действия подписи осталось немного. Если то, что переподписывает зону, остановилось, домен исчезнет для всех проверяющих резолверов ровно в момент истечения — без предупреждения.',

  flag_signatures_expiring: 'Подписи перевалили за середину срока',
  fd_signatures_expiring: 'Норма для зоны, которая регулярно переподписывается; показано, чтобы застрявший подписыватель можно было заметить до того, как это станет срочным.',

  flag_signature_expired: 'Подпись истекла',
  fd_signature_expired: 'Срок действия закончился. Каждый проверяющий резолвер считает такой ответ поддельным, то есть для них домена больше нет.',

  flag_nsec_probe_failed: 'Не удалось увидеть, как доказывается отсутствие',
  fd_nsec_probe_failed: 'Запрос заведомо отсутствующего имени не вернулся, поэтому рассмотреть NSEC и NSEC3 не получилось.',

  flag_nsec3_iterations_above_zero: 'NSEC3 использует лишние итерации хеша',
  fd_nsec3_iterations_above_zero: 'RFC 9276 просит ноль. Лишние раунды задумывались как способ удорожить перебор зоны; они им так и не стали, а надёжно нагружают только проверяющий резолвер.',

  flag_nsec3_salt_present: 'NSEC3 использует соль',
  fd_nsec3_salt_present: 'RFC 9276 просит пустую соль. Защиты она не добавляет — соль опубликована в самой записи, — а её смена требует переподписать зону целиком.',

  flag_nsec3_opt_out: 'Включён режим opt-out у NSEC3',
  fd_nsec3_opt_out: 'Неподписанные делегирования внутри зоны не доказываются как отсутствующие. Разумно для очень большой зоны и излишне для большинства.',

  flag_nsec_zone_walkable: 'Зону можно перебрать целиком',
  fd_nsec_zone_walkable: 'NSEC доказывает отсутствие имени, называя следующее существующее, поэтому всю зону можно прочитать запрос за запросом. Для многих это осознанный выбор, и он стоит того, чтобы быть названным.',

  flag_caa_missing: 'Нет записи CAA',
  fd_caa_missing: 'Ничто не ограничивает, какой удостоверяющий центр может выпустить сертификат для домена. Соблюдать CAA обязаны все центры из базовых требований CA/Browser с 2017 года, так что это бесплатное ограничение, которым просто не пользуются.',

  flag_caa_forbids_issuance: 'CAA запрещает любой выпуск',
  fd_caa_forbids_issuance: 'В записи стоит одинокая точка с запятой: выпускать сертификаты не может никто. Осознанно для домена, которому сертификат не нужен никогда, и дорого обходящаяся опечатка для того, которому нужен.',

  flag_caa_no_iodef: 'В CAA нет адреса для уведомлений',
  fd_caa_no_iodef: 'Без свойства iodef центру, отказавшему в выпуске из-за вашей записи CAA, некуда об этом сообщить — а это ровно тот момент, когда вы хотели бы знать.',

  flag_caa_no_issuewild: 'Нет отдельного правила для wildcard',
  fd_caa_no_issuewild: 'Без issuewild набор issue управляет и wildcard-сертификатами. Часто именно это и имелось в виду; сказано, чтобы не подразумевалось.',

  flag_caa_unknown_tag: 'Незнакомое свойство CAA',
  fd_caa_unknown_tag: 'В записи есть тег вне стандартного набора. Удостоверяющие центры его проигнорируют.',

  flag_caa_unknown_critical_tag: 'Незнакомое свойство CAA помечено критическим',
  fd_caa_unknown_critical_tag: 'На неизвестном нам теге выставлен флаг critical. Центр, которому он тоже неизвестен, обязан отказать в выпуске вообще, так что это может блокировать сертификаты без видимой причины.',

  flag_no_resolver_answered: 'Ни один публичный резолвер не ответил',
  fd_no_resolver_answered: 'Ни один из шести публичных резолверов не вернул ответа для этого имени. Либо зона недоступна, либо недоступен наш исходящий путь до них.',

  flag_resolvers_disagree: 'Публичные резолверы отвечают по-разному',
  fd_resolvers_disagree: 'Два или больше резолверов держат сейчас разные записи. Это нормально в первые часы после изменения — каждый кэш дожидается своего TTL — и это проблема, если сохраняется дольше наибольшего показанного здесь TTL.',

  flag_some_resolvers_silent: 'Часть публичных резолверов не ответила',
  fd_some_resolvers_silent: 'Хотя бы один резолвер не ответил вовремя. Обычно это его собственная нагрузка или отфильтрованный путь; показано, а не скрыто, чтобы из молчания ничего не выводилось.',
};

OWN.es = {
  title: 'Comprobación DNS — delegación, DNSSEC y propagación de cualquier dominio',
  title_short: 'Comprobación DNS',
  h1: 'Comprobación DNS',
  subtitle: 'La delegación recorrida desde la raíz, los números de serie SOA en todos los servidores de nombres, y la cadena DNSSEC verificada aquí en lugar de darla por buena',
  ph_host: 'example.com',
  hero_label: 'Dominio comprobado',
  empty_hint: 'Introduzca un nombre de dominio. La comprobación recorre la delegación desde los servidores raíz hacia abajo, hace las mismas preguntas a todos los servidores autoritativos y verifica ella misma las firmas DNSSEC. Tarda unos segundos y unas cincuenta consultas.',

  stage_resolve: 'recorriendo la delegación',
  stage_delegation: 'comprobando los servidores de nombres',
  stage_soa: 'comparando los números de serie SOA',
  stage_records: 'leyendo los registros',
  stage_dnssec: 'verificando la cadena DNSSEC',
  stage_caa: 'buscando CAA',
  stage_propagation: 'preguntando a resolutores públicos',
  stage_grade: 'calificando',

  card_grade: 'Desglose de la nota',
  card_delegation: 'Delegación',
  card_nameservers: 'Servidores de nombres',
  card_soa: 'Zona (SOA)',
  card_records: 'Registros',
  card_dnssec: 'DNSSEC',
  card_keys: 'Claves y firmas',
  card_caa: 'CAA',
  card_propagation: 'Resolutores públicos',
  card_trace: 'Camino desde la raíz',

  comp_delegation: 'Salud de la delegación',
  comp_dnssec: 'DNSSEC',
  comp_hygiene: 'Higiene de la zona',

  k_zone: 'Zona',
  k_parent_ns: 'Servidores en el padre',
  k_zone_ns: 'Servidores en la zona',
  k_ns_agreement: 'Ambos lados coinciden',
  k_only_at_parent: 'Solo en el padre',
  k_only_at_zone: 'Solo en la zona',
  k_glue: 'Registros de pegamento',
  k_answering: 'Responden con autoridad',
  k_ipv6_ns: 'Accesibles por IPv6',
  k_primary: 'Primario (MNAME)',
  k_rname: 'Contacto (RNAME)',
  k_serial: 'Número de serie',
  k_serials_agree: 'Los seriales coinciden',
  k_refresh: 'Refresh',
  k_retry: 'Retry',
  k_expire: 'Expire',
  k_minimum: 'TTL negativo',
  k_a: 'A',
  k_aaaa: 'AAAA',
  k_mx: 'MX',
  k_txt: 'TXT',
  k_ns: 'NS',
  k_srv: 'SRV',
  k_apex_ttl: 'TTL en el ápice',
  k_wildcard: 'Comodín',
  k_enabled: 'Firmada',
  k_ds_at_parent: 'DS en el padre',
  k_chain_ds: 'El DS corresponde a la clave',
  k_chain_key: 'El juego de claves está firmado',
  k_chain_zone: 'Los datos de la zona están firmados',
  k_nsec_kind: 'Prueba de inexistencia',
  k_nsec3_iterations: 'Iteraciones NSEC3',
  k_soonest_expiry: 'Próximo vencimiento de firma',
  k_caa_at: 'Publicada en',
  k_caa_issue: 'Pueden emitir',
  k_caa_issuewild: 'Pueden emitir comodines',
  k_caa_iodef: 'Notificar infracciones a',
  k_resolvers_agree: 'Los resolutores coinciden',
  k_longest_ttl: 'Mayor TTL restante',
  k_validating: 'Validaron DNSSEC',
  k_queries: 'Consultas realizadas',

  th_nameserver: 'Servidor de nombres',
  th_status: 'Estado',
  th_addresses: 'Direcciones',
  th_serial: 'Serial',
  th_response: 'Respuesta',
  th_resolver: 'Resolutor',
  th_answer: 'Respuesta',
  th_ttl: 'TTL restante',
  th_keytag: 'Etiqueta de clave',
  th_role: 'Función',
  th_algorithm: 'Algoritmo',
  th_bits: 'Bits',
  th_covers: 'Cubre',
  th_valid: 'Válida',
  th_expires: 'Vence',
  th_type: 'Tipo',
  th_value: 'Valor',

  nss_authoritative: 'autoritativo',
  nss_lame: 'sin autoridad',
  nss_silent: 'sin respuesta',
  nss_unresolvable: 'no se resuelve',
  nsec_nsec: 'NSEC',
  nsec_nsec3: 'NSEC3',
  nsec_none: 'ninguna',
  v_seconds: '{n} s',
  v_days: '{n} días',
  v_of_lifetime: 'quedan {days} de {total} días',
  v_root: 'raíz',

  note_delegation: 'La zona padre y la zona misma publican cada una su juego de NS. Nada obliga a que coincidan, y cuando divergen el dominio funciona hasta que un resolutor guarda en caché el otro juego.',
  note_soa: 'Cada servidor autoritativo se consulta por separado. Un servidor cuyo serial se ha quedado atrás sigue respondiendo — con una copia más antigua de la zona.',
  note_dnssec: 'La cadena se verifica aquí: el resumen del DS del padre se recalcula a partir de la clave de la zona, y cada firma se comprueba contra el material de clave. No se le pregunta a ningún resolutor si quedó satisfecho.',
  note_propagation: 'No hay un estado global del DNS al que propagarse — solo cachés, cada una guardando lo que le dijeron hasta que se agote su TTL. El TTL restante indica cuánto seguirá diciendo lo mismo cada una.',
  note_trace: 'Cada paso es una remisión: al servidor de la izquierda se le preguntó por el dominio y respondió con los servidores de la derecha.',

  err_zone_not_found: 'No se encontró ninguna zona para ese nombre.',
  err_dns_timeout: 'Un servidor de nombres no respondió a tiempo.',
  err_dns_network: 'No se pudo alcanzar un servidor de nombres.',
  err_dns_unreachable: 'Ningún servidor de nombres respondió.',

  inc_zone_not_found: 'el nombre no está delegado, así que no había nada que inspeccionar',
  inc_delegation_walk_incomplete: 'el recorrido desde la raíz no llegó a terminar',
  inc_no_authoritative_server_answered: 'ningún servidor autoritativo respondió',
  inc_ds_lookup_failed: 'no se pudo leer el registro DS del padre',
  inc_dnskey_lookup_failed: 'no se pudo leer el juego DNSKEY',
  inc_dnskey_rrsig_missing: 'no se devolvió ninguna firma del juego DNSKEY',
  inc_soa_rrsig_unavailable: 'no se devolvió ninguna firma de los datos de la zona',

  cap_domain_does_not_exist: 'el dominio no existe',
  cap_no_delegation: 'el nombre no está delegado',
  cap_no_authoritative_nameserver: 'ningún servidor responde con autoridad',
  cap_dnssec_chain_broken: 'la cadena DNSSEC está rota',
  cap_signature_expired: 'una firma ha caducado',
  cap_cname_at_apex: 'un CNAME en el ápice',
  cap_lame_delegation: 'una delegación sin autoridad',
  cap_nameserver_not_answering: 'un servidor listado no responde',
  cap_ns_set_mismatch: 'los dos lados de la delegación no coinciden',
  cap_serial_mismatch: 'los servidores tienen versiones distintas de la zona',
  cap_missing_glue: 'un servidor dentro de la zona no tiene pegamento',
  cap_single_nameserver: 'un solo servidor de nombres',
  cap_cname_with_other_data: 'un CNAME junto a otros registros',
  cap_signed_but_no_ds: 'firmada, pero sin DS en el padre',
  cap_weak_dnssec_algorithm: 'un algoritmo de firma que ya no es sólido',
  cap_weak_dnssec_key: 'una clave de firma demasiado corta',
  cap_scan_incomplete: 'la comprobación quedó incompleta, así que no se otorgó nota',

  flag_delegation_walk_failed: 'El recorrido desde la raíz no llegó a terminar',
  fd_delegation_walk_failed: 'Un servidor del camino desde la raíz no respondió, así que parte de la delegación no pudo examinarse. Esto habla tanto de nuestra conectividad como de la suya.',

  flag_nxdomain: 'El dominio no existe',
  fd_nxdomain: 'La zona padre respondió NXDOMAIN: no hay delegación para este nombre. O nunca se registró, o el registro ha caducado.',

  flag_no_delegation: 'El nombre no está delegado',
  fd_no_delegation: 'No se encontró ninguna zona para el nombre. Puede existir como registro dentro de una zona padre, pero no es una zona propia con servidores de nombres.',

  flag_referral_off_path: 'Una remisión apuntó fuera del nombre',
  fd_referral_off_path: 'Un servidor nos remitió a una zona que no es antecesora del nombre consultado. Es un error de configuración, y seguir esa remisión sería una forma de acabar en otro sitio.',

  flag_nameserver_unresolvable: 'El nombre de un servidor no se resuelve',
  fd_nameserver_unresolvable: 'La delegación lista un servidor cuyo propio nombre no tiene registros de dirección. Un resolutor que lo elija pierde una consulta y luego tiene que probar otro.',

  flag_ns_set_mismatch: 'El padre y la zona listan servidores distintos',
  fd_ns_set_mismatch: 'La delegación del padre y los registros NS de la zona no coinciden. En la práctica se usan ambos, así que el dominio se comporta de forma distinta según cuál haya guardado en caché el resolutor — la causa clásica de una avería que va y viene.',

  flag_single_nameserver: 'Un solo servidor de nombres',
  fd_single_nameserver: 'El RFC 1034 pide al menos dos, en redes separadas. Con uno, cualquier caída de esa máquina es una caída de todo el dominio, correo incluido.',

  flag_nameserver_silent: 'Un servidor de nombres no responde',
  fd_nameserver_silent: 'Un servidor nombrado en la delegación no respondió. Los resolutores seguirán intentándolo y esperando al tiempo de espera antes de pasar al siguiente, lo que se percibe como un dominio intermitentemente lento.',

  flag_lame_delegation: 'Un servidor de nombres no tiene autoridad sobre la zona',
  fd_lame_delegation: 'El servidor responde, pero sin el indicador de autoridad: no está configurado para esta zona. Es una delegación sin autoridad, y todo resolutor que dé con ese servidor tiene que volver a empezar en otro sitio.',

  flag_ns_points_at_cname: 'El nombre de un servidor es un alias',
  fd_ns_points_at_cname: 'El RFC 2181 §10.3 exige que un registro NS nombre un host con registros de dirección, no un CNAME. Algunos resolutores lo toleran; otros simplemente fallan.',

  flag_missing_glue: 'Un servidor dentro de la zona no tiene registro de pegamento',
  fd_missing_glue: 'El servidor vive dentro de la zona a la que sirve, así que resolver su dirección exige preguntar a la zona — lo que exige la dirección. El padre debe publicar pegamento para romper el círculo.',

  flag_no_authoritative_nameserver: 'Nada responde por esta zona',
  fd_no_authoritative_nameserver: 'Ninguno de los servidores listados reclamó autoridad. Para un resolutor, el dominio sencillamente no funciona.',

  flag_no_ipv6_nameserver: 'Ningún servidor de nombres es accesible por IPv6',
  fd_no_ipv6_nameserver: 'Los resolutores en redes solo-IPv6 llegan a la zona a través de un traductor, si es que llegan. Añadir un registro AAAA a un servidor suele ser cosa de cinco minutos.',

  flag_nameservers_single_network: 'Todos los servidores están en una misma red',
  fd_nameservers_single_network: 'Las direcciones comparten un /24, lo que suele significar un centro de datos y a menudo un mismo bastidor. Dos servidores en el mismo sitio caen juntos.',

  flag_serial_mismatch: 'Los servidores tienen versiones distintas de la zona',
  fd_serial_mismatch: 'Los seriales SOA difieren, así que al menos un secundario ha dejado de seguir al primario: una transferencia fallida, una clave caducada, una regla de cortafuegos. Sigue respondiendo, con registros obsoletos, y en ningún sitio aparece un error.',

  flag_soa_timer_out_of_range: 'Un temporizador SOA está fuera del rango habitual',
  fd_soa_timer_out_of_range: 'El valor queda fuera de lo que recomienda el RFC 1912. No es un fallo por sí solo — pero estos valores suelen heredarse de una plantilla que nadie ha vuelto a mirar.',

  flag_soa_retry_above_refresh: 'Retry no es menor que refresh',
  fd_soa_retry_above_refresh: 'Retry debe ser el intervalo corto que se usa tras un refresco fallido. Cuando es el largo, una transferencia fallida espera un ciclo entero de refresco antes de reintentarse.',

  flag_soa_expire_too_short: 'Expire es corto respecto a los demás temporizadores',
  fd_soa_expire_too_short: 'Si un secundario no logra alcanzar al primario durante ese tiempo, deja de responder por completo. Por debajo de un par de intentos de refresco, un fin de semana largo con problemas deja la zona muda.',

  flag_soa_rname_has_at: 'La dirección de contacto contiene una @',
  fd_soa_rname_has_at: 'El campo RNAME es una dirección de correo con la @ escrita como un punto. Una @ literal lo hace ilegible, así que los avisos automáticos sobre la zona no llegan a ninguna parte.',

  flag_primary_not_in_ns_set: 'El primario no está entre los servidores publicados',
  fd_primary_not_in_ns_set: 'El SOA nombra un primario que no está en el juego NS. Así es exactamente como funciona un primario oculto, de modo que es una nota y no un fallo.',

  flag_cname_at_apex: 'Un CNAME en el ápice de la zona',
  fd_cname_at_apex: 'RFC 1034 §3.6.2: un nombre con CNAME no tiene otros registros. El ápice siempre tiene SOA y NS, así que ambas cosas no pueden ser ciertas. Unos resolutores devuelven el CNAME y descartan el resto; otros lo ignoran; lo primero que suele romperse es el correo.',

  flag_cname_with_other_data: 'Un CNAME junto a otros registros',
  fd_cname_with_other_data: 'El mismo nombre tiene un CNAME y al menos otro tipo de registro. Cuál devuelve un resolutor depende de qué se le pidió primero, y esa no es una propiedad deseable en su DNS.',

  flag_no_address_at_apex: 'El ápice no tiene dirección',
  fd_no_address_at_apex: 'No hay registro A ni AAAA para el dominio en sí. Deliberado en un dominio usado solo para correo; una sorpresa para quien lo escriba en un navegador.',

  flag_no_ipv6: 'Sin registro AAAA',
  fd_no_ipv6: 'El dominio solo se resuelve por IPv4. Los visitantes en redes móviles solo-IPv6 llegan a través del traductor de su operador.',

  flag_ttl_very_short: 'Un TTL muy corto en el ápice',
  fd_ttl_very_short: 'Menos de un minuto. Es un ajuste de migración que a menudo se queda después de la migración — y multiplica la carga de consultas sobre los servidores todo el tiempo que siga ahí.',

  flag_ttl_very_long: 'Un TTL muy largo en el ápice',
  fd_ttl_very_long: 'Más de dos días. Cualquier cambio de dirección tardará eso en llegar a todo el mundo, lo que es una mala posición durante un incidente.',

  flag_wildcard_record: 'La zona tiene un comodín',
  fd_wildcard_record: 'Un nombre que con seguridad no existe obtuvo respuesta, así que hay un comodín en juego. Conviene saberlo, porque significa que «el registro existe» puede querer decir solo «coincidió el comodín».',

  flag_txt_split_into_chunks: 'Un registro TXT está partido en varias cadenas',
  fd_txt_split_into_chunks: 'Normal en cualquier cosa de más de 255 bytes — los trozos se concatenan sin nada entre medias. Se indica porque los analizadores que los unen con un espacio corrompen en silencio los registros SPF y DKIM.',

  flag_ds_without_dnskey: 'El padre dice que la zona está firmada y no lo está',
  fd_ds_without_dnskey: 'Hay un registro DS en el padre pero ningún DNSKEY en la zona. Todo resolutor validante trata esto como un ataque y se niega a responder, así que el dominio es inalcanzable para buena parte de internet.',

  flag_dnssec_not_enabled: 'La zona no está firmada',
  fd_dnssec_not_enabled: 'Sin DNSSEC. Las respuestas de este dominio no se distinguen de respuestas inventadas, que es justo lo que DNSSEC existe para impedir.',

  flag_no_key_signing_key: 'Sin clave de firma de claves separada',
  fd_no_key_signing_key: 'La zona firma con una sola clave en lugar de separar las funciones. Es legal y más sencillo — pero entonces cada cambio de clave obliga a actualizar el DS en el registrador.',

  flag_weak_key_algorithm: 'Un algoritmo de firma que ya no es sólido',
  fd_weak_key_algorithm: 'La clave usa un algoritmo — RSA/SHA-1, DSA o MD5 — que no se considera seguro. Las colisiones de SHA-1 son prácticas desde 2017, y la zona raíz ya no los acepta para nuevas delegaciones.',

  flag_rsa_key_too_short: 'Una clave RSA de menos de 2048 bits',
  fd_rsa_key_too_short: 'Cualquier tamaño menor está por debajo de la recomendación actual y debería rotarse. La rotación es rutina; dejarlo así no lo es.',

  flag_key_revoked: 'Una clave está marcada como revocada',
  fd_key_revoked: 'El bit REVOKE está puesto. Forma parte de una rotación ordenada (RFC 5011) y debería desaparecer al terminarla — si lleva meses ahí, no terminó.',

  flag_key_not_a_zone_key: 'Un DNSKEY sin el indicador de zona',
  fd_key_not_a_zone_key: 'La clave se publica en el juego DNSKEY pero no está marcada como clave de zona, así que no puede validar nada dentro de la zona.',

  flag_dnskey_not_signed: 'El juego de claves no lleva firma',
  fd_dnskey_not_signed: 'Un juego DNSKEY sin un RRSIG que lo cubra no puede ser creído por nada. Los resolutores validantes rechazarán la zona entera.',

  flag_dnskey_signature_invalid: 'La firma del juego de claves no verifica',
  fd_dnskey_signature_invalid: 'El RRSIG que cubre el juego DNSKEY no superó la verificación aquí. Los resolutores validantes llegarán a la misma conclusión y dejarán de responder por el dominio.',

  flag_ds_weak_digest: 'El DS usa un resumen débil',
  fd_ds_weak_digest: 'El resumen en el padre es SHA-1. Publique un DS con SHA-256 junto a él y retire después el antiguo.',

  flag_ds_points_at_missing_key: 'El DS apunta a una clave que la zona no publica',
  fd_ds_points_at_missing_key: 'El padre avala una etiqueta de clave que no está en la zona. Así se ve una rotación de claves en la que se olvidó actualizar al registrador, y rompe la validación por completo.',

  flag_ds_digest_mismatch: 'El DS no corresponde a la clave de la zona',
  fd_ds_digest_mismatch: 'El resumen recalculado a partir de la clave publicada no coincide con el del padre. La cadena desde la raíz está rota y los resolutores validantes rechazarán el dominio.',

  flag_signed_but_no_ds: 'Firmada, pero nada la ancla',
  fd_signed_but_no_ds: 'La zona está firmada y el padre no publica DS, así que no hay camino desde la raíz hasta estas firmas — nada las valida. Suele ser un paso en el registrador que nunca se completó.',

  flag_zone_data_signature_invalid: 'Una firma de los datos de la zona no verifica',
  fd_zone_data_signature_invalid: 'El registro SOA está firmado y la firma no cuadra con las claves publicadas. Los resolutores validantes rechazarán el dominio.',

  flag_zone_data_not_signed: 'Los datos de la zona no llevan firmas',
  fd_zone_data_not_signed: 'Se publican claves pero los registros no están firmados, así que la zona está firmada solo de nombre.',

  flag_signatures_expiring_soon: 'Las firmas están cerca del final de su vida',
  fd_signatures_expiring_soon: 'Queda poco de la ventana de validez. Si lo que refirma la zona se ha detenido, el dominio desaparecerá para todo resolutor validante en cuanto se cierre la ventana — y lo hará sin previo aviso.',

  flag_signatures_expiring: 'Las firmas han pasado la mitad de su ventana',
  fd_signatures_expiring: 'Normal en una zona que se refirma con regularidad; se muestra para poder reconocer un firmante atascado antes de que sea urgente.',

  flag_signature_expired: 'Una firma ha caducado',
  fd_signature_expired: 'La ventana de validez se ha cerrado. Todo resolutor validante trata la respuesta como falsificada, lo que retira el dominio de internet para ellos.',

  flag_nsec_probe_failed: 'No se pudo ver cómo se prueba la inexistencia',
  fd_nsec_probe_failed: 'La consulta de un nombre deliberadamente ausente no volvió, así que no se pudieron examinar NSEC ni NSEC3.',

  flag_nsec3_iterations_above_zero: 'NSEC3 usa iteraciones de hash adicionales',
  fd_nsec3_iterations_above_zero: 'El RFC 9276 pide cero. Las rondas extra pretendían encarecer la enumeración de la zona; nunca lo lograron, y a quien realmente frenan es al resolutor validante.',

  flag_nsec3_salt_present: 'NSEC3 usa sal',
  fd_nsec3_salt_present: 'El RFC 9276 pide sal vacía. No añade protección — la sal se publica en el propio registro — y obliga a que cambiarla implique refirmar la zona entera.',

  flag_nsec3_opt_out: 'NSEC3 usa opt-out',
  fd_nsec3_opt_out: 'Las delegaciones sin firmar dentro de la zona no se prueban ausentes. Razonable en una zona muy grande, innecesario para la mayoría.',

  flag_nsec_zone_walkable: 'La zona se puede enumerar',
  fd_nsec_zone_walkable: 'NSEC prueba que un nombre no existe nombrando el siguiente que sí existe, así que la zona entera puede leerse consulta a consulta. Para muchos es una decisión consciente, y merece decirse con claridad.',

  flag_caa_missing: 'Sin registro CAA',
  fd_caa_missing: 'Nada restringe qué autoridad de certificación puede emitir para este dominio. Todas las autoridades de los requisitos básicos del CA/Browser Forum deben respetar CAA desde 2017, así que es una restricción gratuita que simplemente no se está usando.',

  flag_caa_forbids_issuance: 'CAA prohíbe toda emisión',
  fd_caa_forbids_issuance: 'El registro es un punto y coma solitario: ninguna autoridad puede emitir para este nombre. Deliberado en un dominio que nunca debe tener certificado, y una errata cara en uno que sí.',

  flag_caa_no_iodef: 'CAA no tiene dirección de notificación',
  fd_caa_no_iodef: 'Sin la propiedad iodef, una autoridad que rechace una solicitud por su registro CAA no tiene dónde contárselo — justo cuando usted querría enterarse.',

  flag_caa_no_issuewild: 'Sin regla aparte para comodines',
  fd_caa_no_issuewild: 'Sin issuewild, el juego issue gobierna también los certificados comodín. A menudo es lo que se pretende; se indica para que no se dé por supuesto.',

  flag_caa_unknown_tag: 'Una propiedad CAA no reconocida',
  fd_caa_unknown_tag: 'El registro contiene una etiqueta fuera del conjunto estándar. Las autoridades la ignorarán.',

  flag_caa_unknown_critical_tag: 'Una propiedad CAA no reconocida marcada como crítica',
  fd_caa_unknown_critical_tag: 'El indicador crítico está puesto en una etiqueta que no reconocemos. Una autoridad que tampoco la reconozca está obligada a rechazar toda emisión, así que esto puede bloquear certificados sin causa aparente.',

  flag_no_resolver_answered: 'Ningún resolutor público respondió',
  fd_no_resolver_answered: 'Ninguno de los seis resolutores públicos devolvió respuesta para este nombre. O la zona es inalcanzable, o lo es nuestro camino de salida hacia ellos.',

  flag_resolvers_disagree: 'Los resolutores públicos dan respuestas distintas',
  fd_resolvers_disagree: 'Dos o más resolutores tienen ahora mismo registros distintos. Es normal durante unas horas tras un cambio — cada caché agota su propio TTL — y es un problema si persiste más allá del mayor TTL mostrado aquí.',

  flag_some_resolvers_silent: 'Algunos resolutores públicos no respondieron',
  fd_some_resolvers_silent: 'Al menos un resolutor no respondió a tiempo. Suele ser su propia carga o un camino filtrado, y se indica en lugar de ignorarse para que del silencio no se deduzca nada.',
};

OWN.pt = {
  title: 'Verificação de DNS — delegação, DNSSEC e propagação de qualquer domínio',
  title_short: 'Verificação de DNS',
  h1: 'Verificação de DNS',
  subtitle: 'A delegação percorrida desde a raiz, os números de série SOA em todos os servidores de nomes, e a cadeia DNSSEC verificada aqui em vez de aceita como boa',
  ph_host: 'example.com',
  hero_label: 'Domínio verificado',
  empty_hint: 'Digite um nome de domínio. A verificação percorre a delegação a partir dos servidores raiz, faz as mesmas perguntas a cada servidor autoritativo e confere ela mesma as assinaturas DNSSEC. Leva alguns segundos e cerca de cinquenta consultas.',

  stage_resolve: 'percorrendo a delegação',
  stage_delegation: 'verificando os servidores de nomes',
  stage_soa: 'comparando os números de série SOA',
  stage_records: 'lendo os registros',
  stage_dnssec: 'verificando a cadeia DNSSEC',
  stage_caa: 'procurando CAA',
  stage_propagation: 'perguntando a resolvedores públicos',
  stage_grade: 'atribuindo a nota',

  card_grade: 'Composição da nota',
  card_delegation: 'Delegação',
  card_nameservers: 'Servidores de nomes',
  card_soa: 'Zona (SOA)',
  card_records: 'Registros',
  card_dnssec: 'DNSSEC',
  card_keys: 'Chaves e assinaturas',
  card_caa: 'CAA',
  card_propagation: 'Resolvedores públicos',
  card_trace: 'Caminho desde a raiz',

  comp_delegation: 'Saúde da delegação',
  comp_dnssec: 'DNSSEC',
  comp_hygiene: 'Higiene da zona',

  k_zone: 'Zona',
  k_parent_ns: 'Servidores no pai',
  k_zone_ns: 'Servidores na zona',
  k_ns_agreement: 'Os dois lados coincidem',
  k_only_at_parent: 'Só no pai',
  k_only_at_zone: 'Só na zona',
  k_glue: 'Registros de cola',
  k_answering: 'Respondem com autoridade',
  k_ipv6_ns: 'Acessíveis por IPv6',
  k_primary: 'Primário (MNAME)',
  k_rname: 'Contato (RNAME)',
  k_serial: 'Número de série',
  k_serials_agree: 'Os seriais coincidem',
  k_refresh: 'Refresh',
  k_retry: 'Retry',
  k_expire: 'Expire',
  k_minimum: 'TTL negativo',
  k_a: 'A',
  k_aaaa: 'AAAA',
  k_mx: 'MX',
  k_txt: 'TXT',
  k_ns: 'NS',
  k_srv: 'SRV',
  k_apex_ttl: 'TTL no ápice',
  k_wildcard: 'Curinga',
  k_enabled: 'Assinada',
  k_ds_at_parent: 'DS no pai',
  k_chain_ds: 'O DS corresponde à chave',
  k_chain_key: 'O conjunto de chaves está assinado',
  k_chain_zone: 'Os dados da zona estão assinados',
  k_nsec_kind: 'Prova de inexistência',
  k_nsec3_iterations: 'Iterações NSEC3',
  k_soonest_expiry: 'Próximo vencimento de assinatura',
  k_caa_at: 'Publicada em',
  k_caa_issue: 'Podem emitir',
  k_caa_issuewild: 'Podem emitir curingas',
  k_caa_iodef: 'Comunicar violações a',
  k_resolvers_agree: 'Os resolvedores coincidem',
  k_longest_ttl: 'Maior TTL restante',
  k_validating: 'Validaram DNSSEC',
  k_queries: 'Consultas feitas',

  th_nameserver: 'Servidor de nomes',
  th_status: 'Estado',
  th_addresses: 'Endereços',
  th_serial: 'Serial',
  th_response: 'Resposta',
  th_resolver: 'Resolvedor',
  th_answer: 'Resposta',
  th_ttl: 'TTL restante',
  th_keytag: 'Etiqueta da chave',
  th_role: 'Função',
  th_algorithm: 'Algoritmo',
  th_bits: 'Bits',
  th_covers: 'Cobre',
  th_valid: 'Válida',
  th_expires: 'Vence',
  th_type: 'Tipo',
  th_value: 'Valor',

  nss_authoritative: 'autoritativo',
  nss_lame: 'sem autoridade',
  nss_silent: 'sem resposta',
  nss_unresolvable: 'não resolve',
  nsec_nsec: 'NSEC',
  nsec_nsec3: 'NSEC3',
  nsec_none: 'nenhuma',
  v_seconds: '{n} s',
  v_days: '{n} dias',
  v_of_lifetime: 'restam {days} de {total} dias',
  v_root: 'raiz',

  note_delegation: 'A zona pai e a própria zona publicam cada uma o seu conjunto de NS. Nada obriga a que coincidam, e quando divergem o domínio funciona até que algum resolvedor guarde em cache o outro conjunto.',
  note_soa: 'Cada servidor autoritativo é consultado separadamente. Um servidor cujo serial ficou para trás continua respondendo — com uma cópia mais antiga da zona.',
  note_dnssec: 'A cadeia é verificada aqui: o resumo do DS do pai é recalculado a partir da chave da zona, e cada assinatura é conferida contra o material da chave. Não se pergunta a nenhum resolvedor se ele ficou satisfeito.',
  note_propagation: 'Não existe um estado global do DNS para onde propagar — só caches, cada uma guardando o que lhe disseram até o TTL acabar. O TTL restante diz por quanto tempo cada uma continuará dizendo o mesmo.',
  note_trace: 'Cada passo é uma remissão: perguntou-se ao servidor da esquerda sobre o domínio e ele respondeu com os servidores da direita.',

  err_zone_not_found: 'Nenhuma zona foi encontrada para esse nome.',
  err_dns_timeout: 'Um servidor de nomes não respondeu a tempo.',
  err_dns_network: 'Não foi possível alcançar um servidor de nomes.',
  err_dns_unreachable: 'Nenhum servidor de nomes respondeu.',

  inc_zone_not_found: 'o nome não está delegado, então não havia o que inspecionar',
  inc_delegation_walk_incomplete: 'o percurso desde a raiz não chegou ao fim',
  inc_no_authoritative_server_answered: 'nenhum servidor autoritativo respondeu',
  inc_ds_lookup_failed: 'não foi possível ler o registro DS no pai',
  inc_dnskey_lookup_failed: 'não foi possível ler o conjunto DNSKEY',
  inc_dnskey_rrsig_missing: 'nenhuma assinatura do conjunto DNSKEY foi devolvida',
  inc_soa_rrsig_unavailable: 'nenhuma assinatura dos dados da zona foi devolvida',

  cap_domain_does_not_exist: 'o domínio não existe',
  cap_no_delegation: 'o nome não está delegado',
  cap_no_authoritative_nameserver: 'nenhum servidor responde com autoridade',
  cap_dnssec_chain_broken: 'a cadeia DNSSEC está rompida',
  cap_signature_expired: 'uma assinatura expirou',
  cap_cname_at_apex: 'um CNAME no ápice',
  cap_lame_delegation: 'uma delegação sem autoridade',
  cap_nameserver_not_answering: 'um servidor listado não responde',
  cap_ns_set_mismatch: 'os dois lados da delegação não coincidem',
  cap_serial_mismatch: 'os servidores têm versões diferentes da zona',
  cap_missing_glue: 'um servidor dentro da zona não tem cola',
  cap_single_nameserver: 'um único servidor de nomes',
  cap_cname_with_other_data: 'um CNAME ao lado de outros registros',
  cap_signed_but_no_ds: 'assinada, mas sem DS no pai',
  cap_weak_dnssec_algorithm: 'um algoritmo de assinatura que já não é sólido',
  cap_weak_dnssec_key: 'uma chave de assinatura curta demais',
  cap_scan_incomplete: 'a verificação ficou incompleta, então nenhuma nota foi dada',

  flag_delegation_walk_failed: 'O percurso desde a raiz não chegou ao fim',
  fd_delegation_walk_failed: 'Um servidor no caminho desde a raiz não respondeu, então parte da delegação não pôde ser examinada. Isso fala tanto da nossa conectividade quanto da deles.',

  flag_nxdomain: 'O domínio não existe',
  fd_nxdomain: 'A zona pai respondeu NXDOMAIN: não há delegação para este nome. Ou nunca foi registrado, ou o registro caducou.',

  flag_no_delegation: 'O nome não está delegado',
  fd_no_delegation: 'Nenhuma zona foi encontrada para o nome. Ele pode existir como registro dentro de uma zona pai, mas não é uma zona própria com servidores de nomes.',

  flag_referral_off_path: 'Uma remissão apontou para fora do nome',
  fd_referral_off_path: 'Um servidor nos remeteu a uma zona que não é ancestral do nome consultado. É um erro de configuração, e seguir essa remissão seria um jeito de acabar em outro lugar.',

  flag_nameserver_unresolvable: 'O nome de um servidor não resolve',
  fd_nameserver_unresolvable: 'A delegação lista um servidor cujo próprio nome não tem registros de endereço. Um resolvedor que o escolha perde uma consulta e depois precisa tentar outro.',

  flag_ns_set_mismatch: 'O pai e a zona listam servidores diferentes',
  fd_ns_set_mismatch: 'A delegação no pai e os registros NS da zona não coincidem. Na prática ambos são usados, então o domínio se comporta de forma diferente conforme o conjunto que o resolvedor tenha em cache — a causa clássica de uma falha que vai e volta.',

  flag_single_nameserver: 'Um único servidor de nomes',
  fd_single_nameserver: 'O RFC 1034 pede pelo menos dois, em redes separadas. Com um, qualquer queda daquela máquina é uma queda de todo o domínio, e-mail incluído.',

  flag_nameserver_silent: 'Um servidor de nomes não responde',
  fd_nameserver_silent: 'Um servidor citado na delegação não respondeu. Os resolvedores continuarão tentando e esperando o tempo limite antes de passar ao próximo, o que aparece como um domínio intermitentemente lento.',

  flag_lame_delegation: 'Um servidor de nomes não tem autoridade sobre a zona',
  fd_lame_delegation: 'O servidor responde, mas sem o indicador de autoridade: não foi configurado para esta zona. É uma delegação sem autoridade, e todo resolvedor que caia nesse servidor precisa recomeçar em outro lugar.',

  flag_ns_points_at_cname: 'O nome de um servidor é um alias',
  fd_ns_points_at_cname: 'O RFC 2181 §10.3 exige que um registro NS nomeie um host com registros de endereço, não um CNAME. Alguns resolvedores toleram; outros simplesmente falham.',

  flag_missing_glue: 'Um servidor dentro da zona não tem registro de cola',
  fd_missing_glue: 'O servidor vive dentro da zona que serve, então resolver o endereço dele exige perguntar à zona — o que exige o endereço. O pai precisa publicar cola para romper o círculo.',

  flag_no_authoritative_nameserver: 'Nada responde por esta zona',
  fd_no_authoritative_nameserver: 'Nenhum dos servidores listados reivindicou autoridade. Para um resolvedor, o domínio simplesmente não funciona.',

  flag_no_ipv6_nameserver: 'Nenhum servidor de nomes é acessível por IPv6',
  fd_no_ipv6_nameserver: 'Resolvedores em redes somente-IPv6 chegam à zona por um tradutor, se é que chegam. Adicionar um registro AAAA a um servidor costuma ser trabalho de cinco minutos.',

  flag_nameservers_single_network: 'Todos os servidores estão na mesma rede',
  fd_nameservers_single_network: 'Os endereços compartilham um /24, o que normalmente significa um datacenter e muitas vezes um mesmo rack. Dois servidores no mesmo lugar caem juntos.',

  flag_serial_mismatch: 'Os servidores têm versões diferentes da zona',
  fd_serial_mismatch: 'Os seriais SOA divergem, então pelo menos um secundário parou de seguir o primário: uma transferência que falhou, uma chave vencida, uma regra de firewall. Ele continua respondendo, com registros velhos, e em lugar nenhum aparece um erro.',

  flag_soa_timer_out_of_range: 'Um temporizador SOA está fora da faixa usual',
  fd_soa_timer_out_of_range: 'O valor sai do que o RFC 1912 recomenda. Não é uma falha por si só — mas esses números costumam ser herdados de um modelo que ninguém revisitou.',

  flag_soa_retry_above_refresh: 'Retry não é menor que refresh',
  fd_soa_retry_above_refresh: 'Retry deve ser o intervalo curto usado após um refresh que falhou. Quando é o longo, uma transferência falha espera um ciclo inteiro de refresh antes de ser tentada de novo.',

  flag_soa_expire_too_short: 'Expire é curto em relação aos outros temporizadores',
  fd_soa_expire_too_short: 'Se um secundário não alcançar o primário por esse tempo, ele para de responder por completo. Abaixo de duas tentativas de refresh, um feriado prolongado com problemas deixa a zona muda.',

  flag_soa_rname_has_at: 'O endereço de contato contém uma @',
  fd_soa_rname_has_at: 'O campo RNAME é um endereço de e-mail com a @ escrita como ponto. Uma @ literal o torna ilegível, então os avisos automáticos sobre a zona não chegam a lugar nenhum.',

  flag_primary_not_in_ns_set: 'O primário não está entre os servidores publicados',
  fd_primary_not_in_ns_set: 'O SOA nomeia um primário que não está no conjunto NS. É exatamente assim que funciona um primário oculto, então isto é uma observação e não uma falha.',

  flag_cname_at_apex: 'Um CNAME no ápice da zona',
  fd_cname_at_apex: 'RFC 1034 §3.6.2: um nome com CNAME não tem outros registros. O ápice sempre tem SOA e NS, então as duas coisas não podem ser verdadeiras. Alguns resolvedores devolvem o CNAME e descartam o resto; outros o ignoram; a primeira coisa a quebrar costuma ser o e-mail.',

  flag_cname_with_other_data: 'Um CNAME ao lado de outros registros',
  fd_cname_with_other_data: 'O mesmo nome tem um CNAME e pelo menos outro tipo de registro. Qual deles um resolvedor devolve depende do que foi perguntado primeiro, e essa não é uma propriedade desejável no seu DNS.',

  flag_no_address_at_apex: 'O ápice não tem endereço',
  fd_no_address_at_apex: 'Não há registro A nem AAAA para o próprio domínio. Deliberado num domínio usado só para e-mail; uma surpresa para quem o digitar num navegador.',

  flag_no_ipv6: 'Sem registro AAAA',
  fd_no_ipv6: 'O domínio só resolve por IPv4. Visitantes em redes móveis somente-IPv6 chegam pelo tradutor da operadora.',

  flag_ttl_very_short: 'Um TTL muito curto no ápice',
  fd_ttl_very_short: 'Menos de um minuto. É um ajuste de migração que frequentemente fica depois da migração — e multiplica a carga de consultas nos servidores enquanto permanecer.',

  flag_ttl_very_long: 'Um TTL muito longo no ápice',
  fd_ttl_very_long: 'Mais de dois dias. Qualquer mudança de endereço levará esse tempo para chegar a todos, o que é uma posição ruim durante um incidente.',

  flag_wildcard_record: 'A zona tem um curinga',
  fd_wildcard_record: 'Um nome que certamente não existe mesmo assim obteve resposta, então há um curinga em jogo. Vale saber, porque significa que «o registro existe» pode querer dizer apenas «o curinga casou».',

  flag_txt_split_into_chunks: 'Um registro TXT está partido em várias cadeias',
  fd_txt_split_into_chunks: 'Normal em qualquer coisa acima de 255 bytes — os pedaços se concatenam sem nada entre eles. Está listado porque analisadores que os juntam com um espaço corrompem em silêncio registros SPF e DKIM.',

  flag_ds_without_dnskey: 'O pai diz que a zona está assinada e ela não está',
  fd_ds_without_dnskey: 'Há um registro DS no pai mas nenhum DNSKEY na zona. Todo resolvedor validante trata isso como ataque e se recusa a responder, então o domínio fica inalcançável para boa parte da internet.',

  flag_dnssec_not_enabled: 'A zona não está assinada',
  fd_dnssec_not_enabled: 'Sem DNSSEC. As respostas deste domínio não se distinguem de respostas inventadas, que é justamente o que o DNSSEC existe para impedir.',

  flag_no_key_signing_key: 'Sem chave de assinatura de chaves separada',
  fd_no_key_signing_key: 'A zona assina com uma única chave em vez de separar os papéis. É legal e mais simples — mas então cada troca de chave obriga a atualizar o DS no registrador.',

  flag_weak_key_algorithm: 'Um algoritmo de assinatura que já não é sólido',
  fd_weak_key_algorithm: 'A chave usa um algoritmo — RSA/SHA-1, DSA ou MD5 — que não é considerado seguro. Colisões de SHA-1 são práticas desde 2017, e a zona raiz já não os aceita para novas delegações.',

  flag_rsa_key_too_short: 'Uma chave RSA de menos de 2048 bits',
  fd_rsa_key_too_short: 'Qualquer tamanho menor está abaixo da recomendação atual e deveria ser rotacionado. A rotação é rotina; deixar como está não é.',

  flag_key_revoked: 'Uma chave está marcada como revogada',
  fd_key_revoked: 'O bit REVOKE está ligado. Faz parte de uma rotação ordenada (RFC 5011) e deveria sumir quando ela terminar — se está lá há meses, não terminou.',

  flag_key_not_a_zone_key: 'Um DNSKEY sem o indicador de zona',
  fd_key_not_a_zone_key: 'A chave é publicada no conjunto DNSKEY mas não está marcada como chave de zona, então não pode validar nada dentro da zona.',

  flag_dnskey_not_signed: 'O conjunto de chaves não tem assinatura',
  fd_dnskey_not_signed: 'Um conjunto DNSKEY sem um RRSIG que o cubra não pode ser acreditado por nada. Resolvedores validantes recusarão a zona inteira.',

  flag_dnskey_signature_invalid: 'A assinatura do conjunto de chaves não confere',
  fd_dnskey_signature_invalid: 'O RRSIG que cobre o conjunto DNSKEY falhou na verificação aqui. Resolvedores validantes chegarão à mesma conclusão e pararão de responder pelo domínio.',

  flag_ds_weak_digest: 'O DS usa um resumo fraco',
  fd_ds_weak_digest: 'O resumo no pai é SHA-1. Publique um DS com SHA-256 ao lado dele e retire o antigo depois.',

  flag_ds_points_at_missing_key: 'O DS aponta para uma chave que a zona não publica',
  fd_ds_points_at_missing_key: 'O pai avaliza uma etiqueta de chave que não está na zona. É assim que se parece uma troca de chaves em que se esqueceu de atualizar o registrador, e isso quebra a validação por completo.',

  flag_ds_digest_mismatch: 'O DS não corresponde à chave da zona',
  fd_ds_digest_mismatch: 'O resumo recalculado a partir da chave publicada não bate com o do pai. A cadeia desde a raiz está rompida e resolvedores validantes recusarão o domínio.',

  flag_signed_but_no_ds: 'Assinada, mas nada a ancora',
  fd_signed_but_no_ds: 'A zona está assinada e o pai não publica DS, então não há caminho da raiz até estas assinaturas — nada as valida. Normalmente é um passo no registrador que nunca foi concluído.',

  flag_zone_data_signature_invalid: 'Uma assinatura dos dados da zona não confere',
  fd_zone_data_signature_invalid: 'O registro SOA está assinado e a assinatura não fecha com as chaves publicadas. Resolvedores validantes recusarão o domínio.',

  flag_zone_data_not_signed: 'Os dados da zona não têm assinaturas',
  fd_zone_data_not_signed: 'Chaves são publicadas mas os registros não estão assinados, então a zona está assinada só no nome.',

  flag_signatures_expiring_soon: 'As assinaturas estão perto do fim da vida',
  fd_signatures_expiring_soon: 'Resta pouco da janela de validade. Se o que reassina a zona parou, o domínio desaparecerá para todo resolvedor validante assim que a janela fechar — e sem aviso nenhum.',

  flag_signatures_expiring: 'As assinaturas passaram da metade da janela',
  fd_signatures_expiring: 'Normal numa zona que se reassina com regularidade; é mostrado para que um assinador travado seja reconhecido antes de virar urgência.',

  flag_signature_expired: 'Uma assinatura expirou',
  fd_signature_expired: 'A janela de validade fechou. Todo resolvedor validante trata a resposta como forjada, o que tira o domínio da internet para eles.',

  flag_nsec_probe_failed: 'Não foi possível ver como a inexistência é provada',
  fd_nsec_probe_failed: 'A consulta de um nome deliberadamente ausente não voltou, então NSEC e NSEC3 não puderam ser examinados.',

  flag_nsec3_iterations_above_zero: 'NSEC3 usa iterações de hash adicionais',
  fd_nsec3_iterations_above_zero: 'O RFC 9276 pede zero. As rodadas extras pretendiam encarecer a enumeração da zona; nunca conseguiram, e quem elas realmente atrasam é o resolvedor validante.',

  flag_nsec3_salt_present: 'NSEC3 usa sal',
  fd_nsec3_salt_present: 'O RFC 9276 pede sal vazio. Ele não acrescenta proteção — o sal é publicado no próprio registro — e faz com que trocá-lo exija reassinar a zona inteira.',

  flag_nsec3_opt_out: 'NSEC3 usa opt-out',
  fd_nsec3_opt_out: 'Delegações não assinadas dentro da zona não são provadas ausentes. Razoável numa zona muito grande, desnecessário para a maioria.',

  flag_nsec_zone_walkable: 'A zona pode ser enumerada',
  fd_nsec_zone_walkable: 'NSEC prova que um nome não existe nomeando o próximo que existe, então a zona inteira pode ser lida consulta a consulta. Para muitos é uma escolha consciente, e merece ser dita com clareza.',

  flag_caa_missing: 'Sem registro CAA',
  fd_caa_missing: 'Nada restringe qual autoridade certificadora pode emitir para este domínio. Todas as autoridades dos requisitos básicos do CA/Browser Forum precisam respeitar CAA desde 2017, então é uma restrição gratuita que simplesmente não está sendo usada.',

  flag_caa_forbids_issuance: 'CAA proíbe qualquer emissão',
  fd_caa_forbids_issuance: 'O registro é um ponto e vírgula solitário: nenhuma autoridade pode emitir para este nome. Deliberado num domínio que nunca deve ter certificado, e um erro de digitação caro num que deve.',

  flag_caa_no_iodef: 'CAA não tem endereço de notificação',
  fd_caa_no_iodef: 'Sem a propriedade iodef, uma autoridade que recuse um pedido por causa do seu registro CAA não tem onde avisar — justamente quando você gostaria de saber.',

  flag_caa_no_issuewild: 'Sem regra separada para curingas',
  fd_caa_no_issuewild: 'Sem issuewild, o conjunto issue governa também os certificados curinga. Muitas vezes é o pretendido; está dito para não ser presumido.',

  flag_caa_unknown_tag: 'Uma propriedade CAA não reconhecida',
  fd_caa_unknown_tag: 'O registro contém uma etiqueta fora do conjunto padrão. As autoridades vão ignorá-la.',

  flag_caa_unknown_critical_tag: 'Uma propriedade CAA não reconhecida marcada como crítica',
  fd_caa_unknown_critical_tag: 'O indicador crítico está ligado numa etiqueta que não reconhecemos. Uma autoridade que também não a reconheça é obrigada a recusar toda emissão, então isso pode bloquear certificados sem causa aparente.',

  flag_no_resolver_answered: 'Nenhum resolvedor público respondeu',
  fd_no_resolver_answered: 'Nenhum dos seis resolvedores públicos devolveu resposta para este nome. Ou a zona está inalcançável, ou o nosso caminho de saída até eles está.',

  flag_resolvers_disagree: 'Resolvedores públicos dão respostas diferentes',
  fd_resolvers_disagree: 'Dois ou mais resolvedores têm agora registros diferentes. É normal por algumas horas depois de uma mudança — cada cache espera o próprio TTL — e é um problema se persistir além do maior TTL mostrado aqui.',

  flag_some_resolvers_silent: 'Alguns resolvedores públicos não responderam',
  fd_some_resolvers_silent: 'Pelo menos um resolvedor não respondeu a tempo. Normalmente é carga dele ou um caminho filtrado, e está listado em vez de ignorado para que do silêncio nada seja deduzido.',
};

OWN.fr = {
  title: 'Contrôle DNS — délégation, DNSSEC et propagation de n’importe quel domaine',
  title_short: 'Contrôle DNS',
  h1: 'Contrôle DNS',
  subtitle: 'La délégation parcourue depuis la racine, les numéros de série SOA sur chaque serveur de noms, et la chaîne DNSSEC vérifiée ici plutôt que prise pour argent comptant',
  ph_host: 'example.com',
  hero_label: 'Domaine contrôlé',
  empty_hint: 'Saisissez un nom de domaine. Le contrôle parcourt la délégation depuis les serveurs racine, pose les mêmes questions à chaque serveur faisant autorité et vérifie lui-même les signatures DNSSEC. Cela prend quelques secondes et une cinquantaine de requêtes.',

  stage_resolve: 'parcours de la délégation',
  stage_delegation: 'contrôle des serveurs de noms',
  stage_soa: 'comparaison des numéros de série SOA',
  stage_records: 'lecture des enregistrements',
  stage_dnssec: 'vérification de la chaîne DNSSEC',
  stage_caa: 'recherche de CAA',
  stage_propagation: 'interrogation des résolveurs publics',
  stage_grade: 'notation',

  card_grade: 'Détail de la note',
  card_delegation: 'Délégation',
  card_nameservers: 'Serveurs de noms',
  card_soa: 'Zone (SOA)',
  card_records: 'Enregistrements',
  card_dnssec: 'DNSSEC',
  card_keys: 'Clés et signatures',
  card_caa: 'CAA',
  card_propagation: 'Résolveurs publics',
  card_trace: 'Chemin depuis la racine',

  comp_delegation: 'Santé de la délégation',
  comp_dnssec: 'DNSSEC',
  comp_hygiene: 'Hygiène de la zone',

  k_zone: 'Zone',
  k_parent_ns: 'Serveurs chez le parent',
  k_zone_ns: 'Serveurs dans la zone',
  k_ns_agreement: 'Les deux côtés concordent',
  k_only_at_parent: 'Seulement chez le parent',
  k_only_at_zone: 'Seulement dans la zone',
  k_glue: 'Enregistrements de colle',
  k_answering: 'Répondent avec autorité',
  k_ipv6_ns: 'Joignables en IPv6',
  k_primary: 'Primaire (MNAME)',
  k_rname: 'Contact (RNAME)',
  k_serial: 'Numéro de série',
  k_serials_agree: 'Les numéros de série concordent',
  k_refresh: 'Refresh',
  k_retry: 'Retry',
  k_expire: 'Expire',
  k_minimum: 'TTL négatif',
  k_a: 'A',
  k_aaaa: 'AAAA',
  k_mx: 'MX',
  k_txt: 'TXT',
  k_ns: 'NS',
  k_srv: 'SRV',
  k_apex_ttl: 'TTL à l’apex',
  k_wildcard: 'Joker',
  k_enabled: 'Signée',
  k_ds_at_parent: 'DS chez le parent',
  k_chain_ds: 'Le DS correspond à la clé',
  k_chain_key: 'Le jeu de clés est signé',
  k_chain_zone: 'Les données de la zone sont signées',
  k_nsec_kind: 'Preuve d’inexistence',
  k_nsec3_iterations: 'Itérations NSEC3',
  k_soonest_expiry: 'Prochaine expiration de signature',
  k_caa_at: 'Publiée sur',
  k_caa_issue: 'Peuvent émettre',
  k_caa_issuewild: 'Peuvent émettre des jokers',
  k_caa_iodef: 'Signaler les violations à',
  k_resolvers_agree: 'Les résolveurs concordent',
  k_longest_ttl: 'TTL restant le plus long',
  k_validating: 'Ont validé DNSSEC',
  k_queries: 'Requêtes effectuées',

  th_nameserver: 'Serveur de noms',
  th_status: 'État',
  th_addresses: 'Adresses',
  th_serial: 'Série',
  th_response: 'Réponse',
  th_resolver: 'Résolveur',
  th_answer: 'Réponse',
  th_ttl: 'TTL restant',
  th_keytag: 'Étiquette de clé',
  th_role: 'Rôle',
  th_algorithm: 'Algorithme',
  th_bits: 'Bits',
  th_covers: 'Couvre',
  th_valid: 'Valide',
  th_expires: 'Expire',
  th_type: 'Type',
  th_value: 'Valeur',

  nss_authoritative: 'fait autorité',
  nss_lame: 'sans autorité',
  nss_silent: 'pas de réponse',
  nss_unresolvable: 'ne se résout pas',
  nsec_nsec: 'NSEC',
  nsec_nsec3: 'NSEC3',
  nsec_none: 'aucune',
  v_seconds: '{n} s',
  v_days: '{n} jours',
  v_of_lifetime: 'il reste {days} jours sur {total}',
  v_root: 'racine',

  note_delegation: 'La zone parente et la zone elle-même publient chacune leur jeu de NS. Rien n’oblige à ce qu’ils concordent, et lorsqu’ils divergent le domaine fonctionne jusqu’à ce qu’un résolveur mette l’autre jeu en cache.',
  note_soa: 'Chaque serveur faisant autorité est interrogé séparément. Un serveur dont le numéro de série a pris du retard continue de répondre — avec une copie plus ancienne de la zone.',
  note_dnssec: 'La chaîne est vérifiée ici : l’empreinte du DS du parent est recalculée à partir de la clé de la zone, et chaque signature est confrontée au matériel de clé. On ne demande à aucun résolveur s’il a été satisfait.',
  note_propagation: 'Il n’existe aucun état global du DNS vers lequel se propager — seulement des caches, chacun conservant ce qu’on lui a dit jusqu’à l’expiration de son TTL. Le TTL restant indique combien de temps chacun continuera de dire la même chose.',
  note_trace: 'Chaque étape est un renvoi : on a interrogé le serveur de gauche sur le domaine et il a répondu par les serveurs de droite.',

  err_zone_not_found: 'Aucune zone trouvée pour ce nom.',
  err_dns_timeout: 'Un serveur de noms n’a pas répondu à temps.',
  err_dns_network: 'Un serveur de noms n’a pas pu être joint.',
  err_dns_unreachable: 'Aucun serveur de noms n’a répondu.',

  inc_zone_not_found: 'le nom n’est pas délégué, il n’y avait donc rien à examiner',
  inc_delegation_walk_incomplete: 'le parcours depuis la racine n’est pas allé au bout',
  inc_no_authoritative_server_answered: 'aucun serveur faisant autorité n’a répondu',
  inc_ds_lookup_failed: 'l’enregistrement DS chez le parent n’a pas pu être lu',
  inc_dnskey_lookup_failed: 'le jeu DNSKEY n’a pas pu être lu',
  inc_dnskey_rrsig_missing: 'aucune signature du jeu DNSKEY n’a été renvoyée',
  inc_soa_rrsig_unavailable: 'aucune signature des données de la zone n’a été renvoyée',

  cap_domain_does_not_exist: 'le domaine n’existe pas',
  cap_no_delegation: 'le nom n’est pas délégué',
  cap_no_authoritative_nameserver: 'aucun serveur ne répond avec autorité',
  cap_dnssec_chain_broken: 'la chaîne DNSSEC est rompue',
  cap_signature_expired: 'une signature a expiré',
  cap_cname_at_apex: 'un CNAME à l’apex',
  cap_lame_delegation: 'une délégation sans autorité',
  cap_nameserver_not_answering: 'un serveur listé ne répond pas',
  cap_ns_set_mismatch: 'les deux côtés de la délégation divergent',
  cap_serial_mismatch: 'les serveurs détiennent des versions différentes de la zone',
  cap_missing_glue: 'un serveur situé dans la zone n’a pas de colle',
  cap_single_nameserver: 'un seul serveur de noms',
  cap_cname_with_other_data: 'un CNAME à côté d’autres enregistrements',
  cap_signed_but_no_ds: 'signée, mais sans DS chez le parent',
  cap_weak_dnssec_algorithm: 'un algorithme de signature qui n’est plus solide',
  cap_weak_dnssec_key: 'une clé de signature trop courte',
  cap_scan_incomplete: 'le contrôle est resté incomplet, aucune note n’a donc été attribuée',

  flag_delegation_walk_failed: 'Le parcours depuis la racine n’est pas allé au bout',
  fd_delegation_walk_failed: 'Un serveur sur le chemin depuis la racine n’a pas répondu, une partie de la délégation n’a donc pas pu être examinée. Cela concerne autant notre accessibilité réseau que la leur.',

  flag_nxdomain: 'Le domaine n’existe pas',
  fd_nxdomain: 'La zone parente a répondu NXDOMAIN : il n’y a pas de délégation pour ce nom. Soit il n’a jamais été enregistré, soit l’enregistrement a expiré.',

  flag_no_delegation: 'Le nom n’est pas délégué',
  fd_no_delegation: 'Aucune zone n’a été trouvée pour ce nom. Il peut exister en tant qu’enregistrement dans une zone parente, mais ce n’est pas une zone à part entière avec ses serveurs de noms.',

  flag_referral_off_path: 'Un renvoi pointait à côté du nom',
  fd_referral_off_path: 'Un serveur nous a renvoyés vers une zone qui n’est pas un ancêtre du nom demandé. C’est une erreur de configuration, et suivre ce renvoi serait une façon de se retrouver ailleurs.',

  flag_nameserver_unresolvable: 'Le nom d’un serveur ne se résout pas',
  fd_nameserver_unresolvable: 'La délégation liste un serveur dont le nom n’a aucun enregistrement d’adresse. Un résolveur qui le choisit perd une requête puis doit en essayer un autre.',

  flag_ns_set_mismatch: 'Le parent et la zone listent des serveurs différents',
  fd_ns_set_mismatch: 'La délégation chez le parent et les enregistrements NS de la zone ne concordent pas. Les deux sont utilisés en pratique, le domaine se comporte donc différemment selon le jeu qu’un résolveur a mis en cache — la cause classique d’une panne qui va et vient.',

  flag_single_nameserver: 'Un seul serveur de noms',
  fd_single_nameserver: 'Le RFC 1034 demande au moins deux serveurs, sur des réseaux distincts. Avec un seul, la moindre panne de cette machine est une panne de tout le domaine, courrier compris.',

  flag_nameserver_silent: 'Un serveur de noms ne répond pas',
  fd_nameserver_silent: 'Un serveur nommé dans la délégation n’a pas répondu. Les résolveurs continueront de l’essayer et d’attendre le délai d’expiration avant de passer au suivant, ce qui se manifeste par un domaine lent par intermittence.',

  flag_lame_delegation: 'Un serveur de noms ne fait pas autorité sur la zone',
  fd_lame_delegation: 'Le serveur répond, mais sans l’indicateur d’autorité : il n’a pas été configuré pour cette zone. C’est une délégation sans autorité, et tout résolveur qui tombe dessus doit recommencer ailleurs.',

  flag_ns_points_at_cname: 'Le nom d’un serveur est un alias',
  fd_ns_points_at_cname: 'Le RFC 2181 §10.3 exige qu’un enregistrement NS nomme un hôte doté d’enregistrements d’adresse, pas un CNAME. Certains résolveurs s’en accommodent, d’autres échouent purement et simplement.',

  flag_missing_glue: 'Un serveur situé dans la zone n’a pas d’enregistrement de colle',
  fd_missing_glue: 'Le serveur se trouve dans la zone qu’il sert, résoudre son adresse suppose donc d’interroger la zone — ce qui suppose l’adresse. Le parent doit publier de la colle pour rompre le cercle.',

  flag_no_authoritative_nameserver: 'Rien ne répond pour cette zone',
  fd_no_authoritative_nameserver: 'Aucun des serveurs listés n’a revendiqué l’autorité. Du point de vue d’un résolveur, le domaine ne fonctionne tout simplement pas.',

  flag_no_ipv6_nameserver: 'Aucun serveur de noms n’est joignable en IPv6',
  fd_no_ipv6_nameserver: 'Les résolveurs sur des réseaux IPv6 seuls atteignent la zone via un traducteur, quand ils y parviennent. Ajouter un enregistrement AAAA à un serveur prend en général cinq minutes.',

  flag_nameservers_single_network: 'Tous les serveurs de noms sont dans un même réseau',
  fd_nameservers_single_network: 'Les adresses partagent un /24, ce qui signifie généralement un centre de données et souvent une même baie. Deux serveurs au même endroit tombent ensemble.',

  flag_serial_mismatch: 'Les serveurs détiennent des versions différentes de la zone',
  fd_serial_mismatch: 'Les numéros de série SOA diffèrent : au moins un secondaire a cessé de suivre le primaire — transfert échoué, clé expirée, règle de pare-feu. Il continue de répondre, avec des enregistrements périmés, et aucune erreur n’apparaît nulle part.',

  flag_soa_timer_out_of_range: 'Un minuteur SOA sort de la plage habituelle',
  fd_soa_timer_out_of_range: 'La valeur sort de ce que recommande le RFC 1912. Ce n’est pas une faute en soi — mais ces valeurs sont le plus souvent héritées d’un modèle que personne n’a réexaminé.',

  flag_soa_retry_above_refresh: 'Retry n’est pas plus court que refresh',
  fd_soa_retry_above_refresh: 'Retry est censé être l’intervalle court utilisé après un rafraîchissement raté. Quand c’est le plus long, un transfert échoué attend un cycle entier avant d’être retenté.',

  flag_soa_expire_too_short: 'Expire est court par rapport aux autres minuteurs',
  fd_soa_expire_too_short: 'Si un secondaire ne peut joindre le primaire pendant cette durée, il cesse complètement de répondre. En dessous de deux tentatives de rafraîchissement, un long week-end d’ennuis fait taire la zone.',

  flag_soa_rname_has_at: 'L’adresse de contact contient une @',
  fd_soa_rname_has_at: 'Le champ RNAME est une adresse électronique dont l’@ s’écrit avec un point. Une @ littérale le rend illisible, et les signalements automatiques sur la zone n’arrivent nulle part.',

  flag_primary_not_in_ns_set: 'Le primaire ne figure pas parmi les serveurs publiés',
  fd_primary_not_in_ns_set: 'Le SOA nomme un primaire absent du jeu NS. C’est exactement ainsi qu’on exploite un primaire caché, il s’agit donc d’une remarque et non d’une faute.',

  flag_cname_at_apex: 'Un CNAME à l’apex de la zone',
  fd_cname_at_apex: 'RFC 1034 §3.6.2 : un nom porteur d’un CNAME n’a pas d’autres enregistrements. L’apex a toujours SOA et NS, les deux ne peuvent donc pas être vrais. Certains résolveurs renvoient le CNAME et jettent le reste, d’autres l’ignorent ; c’est le courrier qui casse en premier.',

  flag_cname_with_other_data: 'Un CNAME à côté d’autres enregistrements',
  fd_cname_with_other_data: 'Le même nom porte un CNAME et au moins un autre type d’enregistrement. Ce qu’un résolveur renvoie dépend de ce qu’on lui a demandé en premier, et ce n’est pas une propriété souhaitable pour un DNS.',

  flag_no_address_at_apex: 'L’apex n’a pas d’adresse',
  fd_no_address_at_apex: 'Ni A ni AAAA pour le domaine lui-même. Délibéré pour un domaine réservé au courrier ; surprenant pour qui le saisit dans un navigateur.',

  flag_no_ipv6: 'Pas d’enregistrement AAAA',
  fd_no_ipv6: 'Le domaine ne se résout qu’en IPv4. Les visiteurs sur les réseaux mobiles IPv6 seuls y accèdent via le traducteur de leur opérateur.',

  flag_ttl_very_short: 'Un TTL très court à l’apex',
  fd_ttl_very_short: 'Moins d’une minute. C’est un réglage de migration, souvent laissé en place après la migration — et il multiplie la charge de requêtes sur les serveurs tant qu’il y reste.',

  flag_ttl_very_long: 'Un TTL très long à l’apex',
  fd_ttl_very_long: 'Plus de deux jours. Tout changement d’adresse mettra ce temps à atteindre tout le monde, ce qui est une mauvaise position pendant un incident.',

  flag_wildcard_record: 'La zone comporte un joker',
  fd_wildcard_record: 'Un nom qui n’existe certainement pas a tout de même obtenu une réponse : un joker est donc en jeu. Bon à savoir, car « l’enregistrement existe » peut ne vouloir dire que « le joker a répondu ».',

  flag_txt_split_into_chunks: 'Un enregistrement TXT est découpé en plusieurs chaînes',
  fd_txt_split_into_chunks: 'Normal au-delà de 255 octets — les morceaux se concatènent sans rien entre eux. C’est signalé parce que les analyseurs qui les joignent par une espace corrompent silencieusement les enregistrements SPF et DKIM.',

  flag_ds_without_dnskey: 'Le parent dit la zone signée alors qu’elle ne l’est pas',
  fd_ds_without_dnskey: 'Il y a un DS chez le parent mais aucun DNSKEY dans la zone. Tout résolveur validant y voit une attaque et refuse de répondre : le domaine est inaccessible pour une large part d’internet.',

  flag_dnssec_not_enabled: 'La zone n’est pas signée',
  fd_dnssec_not_enabled: 'Pas de DNSSEC. Les réponses de ce domaine ne se distinguent pas de réponses inventées, ce que DNSSEC existe précisément pour empêcher.',

  flag_no_key_signing_key: 'Pas de clé de signature de clés distincte',
  fd_no_key_signing_key: 'La zone signe avec une seule clé au lieu de séparer les rôles. C’est licite et plus simple — mais chaque changement de clé impose alors de mettre à jour le DS chez le registraire.',

  flag_weak_key_algorithm: 'Un algorithme de signature qui n’est plus solide',
  fd_weak_key_algorithm: 'La clé utilise un algorithme — RSA/SHA-1, DSA ou MD5 — qui n’est pas considéré comme sûr. Les collisions SHA-1 sont praticables depuis 2017, et la zone racine ne les accepte plus pour de nouvelles délégations.',

  flag_rsa_key_too_short: 'Une clé RSA de moins de 2048 bits',
  fd_rsa_key_too_short: 'Toute taille inférieure est en deçà de la recommandation actuelle et devrait être renouvelée. Le renouvellement est une routine ; laisser en l’état ne l’est pas.',

  flag_key_revoked: 'Une clé est marquée révoquée',
  fd_key_revoked: 'Le bit REVOKE est positionné. Cela fait partie d’un renouvellement ordonné (RFC 5011) et devrait disparaître une fois celui-ci terminé — s’il est là depuis des mois, il ne l’est pas.',

  flag_key_not_a_zone_key: 'Un DNSKEY sans l’indicateur de zone',
  fd_key_not_a_zone_key: 'La clé est publiée dans le jeu DNSKEY mais n’est pas marquée comme clé de zone : elle ne peut rien valider dans la zone.',

  flag_dnskey_not_signed: 'Le jeu de clés ne porte aucune signature',
  fd_dnskey_not_signed: 'Un jeu DNSKEY sans RRSIG qui le couvre ne peut être cru par rien. Les résolveurs validants refuseront la zone entière.',

  flag_dnskey_signature_invalid: 'La signature du jeu de clés ne se vérifie pas',
  fd_dnskey_signature_invalid: 'Le RRSIG couvrant le jeu DNSKEY a échoué à la vérification ici. Les résolveurs validants parviendront à la même conclusion et cesseront de répondre pour le domaine.',

  flag_ds_weak_digest: 'Le DS utilise une empreinte faible',
  fd_ds_weak_digest: 'L’empreinte chez le parent est en SHA-1. Publiez un DS en SHA-256 à côté, puis retirez l’ancien.',

  flag_ds_points_at_missing_key: 'Le DS pointe vers une clé que la zone ne publie pas',
  fd_ds_points_at_missing_key: 'Le parent se porte garant d’une étiquette de clé absente de la zone. C’est à quoi ressemble un renouvellement de clé dont la mise à jour chez le registraire a été oubliée, et cela casse complètement la validation.',

  flag_ds_digest_mismatch: 'Le DS ne correspond pas à la clé de la zone',
  fd_ds_digest_mismatch: 'L’empreinte recalculée à partir de la clé publiée diffère de celle du parent. La chaîne depuis la racine est rompue et les résolveurs validants refuseront le domaine.',

  flag_signed_but_no_ds: 'Signée, mais rien ne l’ancre',
  fd_signed_but_no_ds: 'La zone est signée et le parent ne publie pas de DS : il n’existe aucun chemin de la racine jusqu’à ces signatures, rien ne les valide. C’est en général une étape chez le registraire qui n’a jamais été menée à bien.',

  flag_zone_data_signature_invalid: 'Une signature des données de la zone ne se vérifie pas',
  fd_zone_data_signature_invalid: 'L’enregistrement SOA est signé et la signature ne concorde pas avec les clés publiées. Les résolveurs validants refuseront le domaine.',

  flag_zone_data_not_signed: 'Les données de la zone ne portent pas de signature',
  fd_zone_data_not_signed: 'Des clés sont publiées mais les enregistrements ne sont pas signés : la zone n’est signée que de nom.',

  flag_signatures_expiring_soon: 'Les signatures approchent de la fin de leur vie',
  fd_signatures_expiring_soon: 'Il reste peu de la fenêtre de validité. Si ce qui resigne la zone s’est arrêté, le domaine disparaîtra pour tout résolveur validant à la fermeture de la fenêtre — et sans le moindre avertissement.',

  flag_signatures_expiring: 'Les signatures ont dépassé la moitié de leur fenêtre',
  fd_signatures_expiring: 'Normal pour une zone resignée régulièrement ; affiché pour qu’un signataire bloqué soit repéré avant que ce ne devienne urgent.',

  flag_signature_expired: 'Une signature a expiré',
  fd_signature_expired: 'La fenêtre de validité est close. Tout résolveur validant considère la réponse comme falsifiée, ce qui retire le domaine d’internet pour eux.',

  flag_nsec_probe_failed: 'Impossible de voir comment l’inexistence est prouvée',
  fd_nsec_probe_failed: 'La requête sur un nom délibérément absent n’est pas revenue : NSEC et NSEC3 n’ont pas pu être examinés.',

  flag_nsec3_iterations_above_zero: 'NSEC3 utilise des itérations de hachage supplémentaires',
  fd_nsec3_iterations_above_zero: 'Le RFC 9276 demande zéro. Les tours supplémentaires devaient rendre l’énumération de la zone coûteuse ; ils n’y sont jamais parvenus, et le seul qu’ils ralentissent vraiment est le résolveur validant.',

  flag_nsec3_salt_present: 'NSEC3 utilise un sel',
  fd_nsec3_salt_present: 'Le RFC 9276 demande un sel vide. Il n’apporte aucune protection — le sel est publié dans l’enregistrement — et il fait de tout changement de sel une resignature complète de la zone.',

  flag_nsec3_opt_out: 'NSEC3 utilise l’opt-out',
  fd_nsec3_opt_out: 'Les délégations non signées à l’intérieur de la zone ne sont pas prouvées absentes. Raisonnable pour une très grande zone, inutile pour la plupart.',

  flag_nsec_zone_walkable: 'La zone peut être énumérée',
  fd_nsec_zone_walkable: 'NSEC prouve qu’un nom est absent en nommant le suivant qui existe : la zone entière peut donc être lue requête après requête. Pour beaucoup c’est un choix délibéré, et cela mérite d’être dit clairement.',

  flag_caa_missing: 'Pas d’enregistrement CAA',
  fd_caa_missing: 'Rien ne limite quelle autorité de certification peut émettre pour ce domaine. Toutes les autorités des exigences de base du CA/Browser Forum doivent respecter CAA depuis 2017 : c’est une restriction gratuite dont on ne se sert simplement pas.',

  flag_caa_forbids_issuance: 'CAA interdit toute émission',
  fd_caa_forbids_issuance: 'L’enregistrement est un point-virgule seul : aucune autorité ne peut émettre pour ce nom. Délibéré pour un domaine qui ne doit jamais avoir de certificat, et une coquille coûteuse pour un domaine qui doit en avoir un.',

  flag_caa_no_iodef: 'CAA n’a pas d’adresse de signalement',
  fd_caa_no_iodef: 'Sans propriété iodef, une autorité qui refuse une demande à cause de votre enregistrement CAA n’a nulle part où vous le dire — précisément au moment où vous voudriez le savoir.',

  flag_caa_no_issuewild: 'Pas de règle distincte pour les jokers',
  fd_caa_no_issuewild: 'Sans issuewild, le jeu issue régit aussi les certificats jokers. C’est souvent l’intention ; c’est dit pour ne pas être supposé.',

  flag_caa_unknown_tag: 'Une propriété CAA non reconnue',
  fd_caa_unknown_tag: 'L’enregistrement contient une étiquette hors du jeu standard. Les autorités l’ignoreront.',

  flag_caa_unknown_critical_tag: 'Une propriété CAA non reconnue marquée critique',
  fd_caa_unknown_critical_tag: 'L’indicateur critique est posé sur une étiquette que nous ne reconnaissons pas. Une autorité qui ne la reconnaît pas non plus est tenue de refuser toute émission : cela peut bloquer des certificats sans cause apparente.',

  flag_no_resolver_answered: 'Aucun résolveur public n’a répondu',
  fd_no_resolver_answered: 'Aucun des six résolveurs publics n’a renvoyé de réponse pour ce nom. Soit la zone est injoignable, soit c’est notre chemin sortant vers eux qui l’est.',

  flag_resolvers_disagree: 'Les résolveurs publics donnent des réponses différentes',
  fd_resolvers_disagree: 'Deux résolveurs ou plus détiennent actuellement des enregistrements différents. C’est normal pendant quelques heures après un changement — chaque cache attend son propre TTL — et c’est un problème si cela persiste au-delà du TTL le plus long affiché ici.',

  flag_some_resolvers_silent: 'Certains résolveurs publics n’ont pas répondu',
  fd_some_resolvers_silent: 'Au moins un résolveur n’a pas répondu à temps. C’est en général sa propre charge ou un chemin filtré, et c’est indiqué plutôt qu’ignoré pour que rien ne soit déduit du silence.',
};

OWN.de = {
  title: 'DNS-Prüfung — Delegierung, DNSSEC und Verbreitung für jede Domain',
  title_short: 'DNS-Prüfung',
  h1: 'DNS-Prüfung',
  subtitle: 'Die Delegierung von der Wurzel an abgelaufen, die SOA-Seriennummern auf allen Nameservern, und die DNSSEC-Kette hier geprüft statt geglaubt',
  ph_host: 'example.com',
  hero_label: 'Geprüfte Domain',
  empty_hint: 'Geben Sie einen Domainnamen ein. Die Prüfung läuft die Delegierung von den Wurzelservern abwärts ab, stellt jedem autoritativen Nameserver dieselben Fragen und prüft die DNSSEC-Signaturen selbst nach. Das dauert einige Sekunden und rund fünfzig Abfragen.',

  stage_resolve: 'Delegierung wird abgelaufen',
  stage_delegation: 'Nameserver werden geprüft',
  stage_soa: 'SOA-Seriennummern werden verglichen',
  stage_records: 'Einträge werden gelesen',
  stage_dnssec: 'DNSSEC-Kette wird geprüft',
  stage_caa: 'CAA wird gesucht',
  stage_propagation: 'öffentliche Resolver werden befragt',
  stage_grade: 'Note wird gebildet',

  card_grade: 'Zusammensetzung der Note',
  card_delegation: 'Delegierung',
  card_nameservers: 'Nameserver',
  card_soa: 'Zone (SOA)',
  card_records: 'Einträge',
  card_dnssec: 'DNSSEC',
  card_keys: 'Schlüssel und Signaturen',
  card_caa: 'CAA',
  card_propagation: 'Öffentliche Resolver',
  card_trace: 'Weg von der Wurzel',

  comp_delegation: 'Gesundheit der Delegierung',
  comp_dnssec: 'DNSSEC',
  comp_hygiene: 'Hygiene der Zone',

  k_zone: 'Zone',
  k_parent_ns: 'Nameserver beim Elternteil',
  k_zone_ns: 'Nameserver in der Zone',
  k_ns_agreement: 'Beide Seiten stimmen überein',
  k_only_at_parent: 'Nur beim Elternteil',
  k_only_at_zone: 'Nur in der Zone',
  k_glue: 'Glue-Einträge',
  k_answering: 'Antworten autoritativ',
  k_ipv6_ns: 'Über IPv6 erreichbar',
  k_primary: 'Primär (MNAME)',
  k_rname: 'Kontakt (RNAME)',
  k_serial: 'Seriennummer',
  k_serials_agree: 'Seriennummern stimmen überein',
  k_refresh: 'Refresh',
  k_retry: 'Retry',
  k_expire: 'Expire',
  k_minimum: 'Negativ-TTL',
  k_a: 'A',
  k_aaaa: 'AAAA',
  k_mx: 'MX',
  k_txt: 'TXT',
  k_ns: 'NS',
  k_srv: 'SRV',
  k_apex_ttl: 'TTL am Zonenursprung',
  k_wildcard: 'Platzhalter',
  k_enabled: 'Signiert',
  k_ds_at_parent: 'DS beim Elternteil',
  k_chain_ds: 'DS passt zum Schlüssel',
  k_chain_key: 'Schlüsselsatz ist signiert',
  k_chain_zone: 'Zonendaten sind signiert',
  k_nsec_kind: 'Nachweis der Nichtexistenz',
  k_nsec3_iterations: 'NSEC3-Iterationen',
  k_soonest_expiry: 'Nächster Signaturablauf',
  k_caa_at: 'Veröffentlicht unter',
  k_caa_issue: 'Dürfen ausstellen',
  k_caa_issuewild: 'Dürfen Wildcards ausstellen',
  k_caa_iodef: 'Verstöße melden an',
  k_resolvers_agree: 'Resolver stimmen überein',
  k_longest_ttl: 'Längste verbleibende TTL',
  k_validating: 'Haben DNSSEC validiert',
  k_queries: 'Gestellte Abfragen',

  th_nameserver: 'Nameserver',
  th_status: 'Zustand',
  th_addresses: 'Adressen',
  th_serial: 'Seriennummer',
  th_response: 'Antwortzeit',
  th_resolver: 'Resolver',
  th_answer: 'Antwort',
  th_ttl: 'Restliche TTL',
  th_keytag: 'Key-Tag',
  th_role: 'Rolle',
  th_algorithm: 'Algorithmus',
  th_bits: 'Bit',
  th_covers: 'Deckt ab',
  th_valid: 'Gültig',
  th_expires: 'Läuft ab',
  th_type: 'Typ',
  th_value: 'Wert',

  nss_authoritative: 'autoritativ',
  nss_lame: 'nicht zuständig',
  nss_silent: 'keine Antwort',
  nss_unresolvable: 'löst nicht auf',
  nsec_nsec: 'NSEC',
  nsec_nsec3: 'NSEC3',
  nsec_none: 'keiner',
  v_seconds: '{n} s',
  v_days: '{n} Tage',
  v_of_lifetime: 'noch {days} von {total} Tagen',
  v_root: 'Wurzel',

  note_delegation: 'Die Elternzone und die Zone selbst veröffentlichen jeweils ihren eigenen NS-Satz. Nichts erzwingt, dass beide übereinstimmen, und wenn sie auseinanderlaufen, funktioniert die Domain so lange, bis ein Resolver zufällig den anderen Satz zwischenspeichert.',
  note_soa: 'Jeder autoritative Server wird einzeln gefragt. Ein Server, dessen Seriennummer zurückgefallen ist, antwortet weiterhin — mit einer älteren Kopie der Zone.',
  note_dnssec: 'Die Kette wird hier geprüft: Der Hashwert des elterlichen DS wird aus dem Zonenschlüssel neu berechnet, und jede Signatur wird gegen das Schlüsselmaterial nachgerechnet. Kein Resolver wird gefragt, ob er zufrieden war.',
  note_propagation: 'Es gibt keinen globalen DNS-Zustand, in den sich etwas ausbreiten könnte — nur Caches, von denen jeder das behält, was ihm gesagt wurde, bis seine TTL abläuft. Die verbleibende TTL sagt, wie lange jeder von ihnen noch dasselbe sagen wird.',
  note_trace: 'Jeder Schritt ist eine Verweisung: Der Server links wurde nach der Domain gefragt und antwortete mit den Servern rechts.',

  err_zone_not_found: 'Für diesen Namen wurde keine Zone gefunden.',
  err_dns_timeout: 'Ein Nameserver hat nicht rechtzeitig geantwortet.',
  err_dns_network: 'Ein Nameserver war nicht erreichbar.',
  err_dns_unreachable: 'Kein Nameserver hat geantwortet.',

  inc_zone_not_found: 'der Name ist nicht delegiert, es gab also nichts zu untersuchen',
  inc_delegation_walk_incomplete: 'der Weg von der Wurzel wurde nicht zu Ende gegangen',
  inc_no_authoritative_server_answered: 'kein autoritativer Nameserver hat geantwortet',
  inc_ds_lookup_failed: 'der DS-Eintrag beim Elternteil ließ sich nicht lesen',
  inc_dnskey_lookup_failed: 'der DNSKEY-Satz ließ sich nicht lesen',
  inc_dnskey_rrsig_missing: 'es kam keine Signatur über den DNSKEY-Satz zurück',
  inc_soa_rrsig_unavailable: 'es kam keine Signatur über die Zonendaten zurück',

  cap_domain_does_not_exist: 'die Domain existiert nicht',
  cap_no_delegation: 'der Name ist nicht delegiert',
  cap_no_authoritative_nameserver: 'kein Server antwortet autoritativ',
  cap_dnssec_chain_broken: 'die DNSSEC-Kette ist zerrissen',
  cap_signature_expired: 'eine Signatur ist abgelaufen',
  cap_cname_at_apex: 'ein CNAME am Zonenursprung',
  cap_lame_delegation: 'eine Delegierung ohne Zuständigkeit',
  cap_nameserver_not_answering: 'ein genannter Nameserver antwortet nicht',
  cap_ns_set_mismatch: 'die beiden Seiten der Delegierung widersprechen sich',
  cap_serial_mismatch: 'die Server halten verschiedene Fassungen der Zone',
  cap_missing_glue: 'ein Server innerhalb der Zone hat kein Glue',
  cap_single_nameserver: 'nur ein Nameserver',
  cap_cname_with_other_data: 'ein CNAME neben anderen Einträgen',
  cap_signed_but_no_ds: 'signiert, aber ohne DS beim Elternteil',
  cap_weak_dnssec_algorithm: 'ein Signaturalgorithmus, der nicht mehr tragfähig ist',
  cap_weak_dnssec_key: 'ein zu kurzer Signaturschlüssel',
  cap_scan_incomplete: 'die Prüfung blieb unvollständig, daher wurde keine Note vergeben',

  flag_delegation_walk_failed: 'Der Weg von der Wurzel wurde nicht zu Ende gegangen',
  fd_delegation_walk_failed: 'Ein Server auf dem Weg von der Wurzel hat nicht geantwortet, daher ließ sich ein Teil der Delegierung nicht untersuchen. Das sagt ebenso viel über unsere Erreichbarkeit wie über ihre.',

  flag_nxdomain: 'Die Domain existiert nicht',
  fd_nxdomain: 'Die Elternzone antwortete mit NXDOMAIN: Für diesen Namen gibt es keine Delegierung. Entweder wurde er nie registriert, oder die Registrierung ist ausgelaufen.',

  flag_no_delegation: 'Der Name ist nicht delegiert',
  fd_no_delegation: 'Für den Namen wurde keine Zone gefunden. Er mag als Eintrag innerhalb einer Elternzone existieren, ist aber keine eigene Zone mit eigenen Nameservern.',

  flag_referral_off_path: 'Eine Verweisung führte am Namen vorbei',
  fd_referral_off_path: 'Ein Server verwies uns auf eine Zone, die kein Vorfahre des gefragten Namens ist. Das ist eine Fehlkonfiguration, und dieser Verweisung zu folgen wäre eine Art, anderswo zu landen.',

  flag_nameserver_unresolvable: 'Der Name eines Nameservers löst nicht auf',
  fd_nameserver_unresolvable: 'Die Delegierung nennt einen Server, dessen eigener Name keine Adresseinträge hat. Ein Resolver, der ihn wählt, verschwendet eine Abfrage und muss danach einen anderen versuchen.',

  flag_ns_set_mismatch: 'Elternteil und Zone nennen verschiedene Nameserver',
  fd_ns_set_mismatch: 'Die Delegierung beim Elternteil und die NS-Einträge in der Zone stimmen nicht überein. In der Praxis werden beide benutzt, die Domain verhält sich also unterschiedlich, je nachdem welchen Satz ein Resolver zwischengespeichert hat — die klassische Ursache eines Fehlers, der kommt und geht.',

  flag_single_nameserver: 'Nur ein Nameserver',
  fd_single_nameserver: 'RFC 1034 verlangt mindestens zwei, in getrennten Netzen. Mit einem ist jeder Ausfall dieser Maschine ein Ausfall der ganzen Domain, E-Mail eingeschlossen.',

  flag_nameserver_silent: 'Ein Nameserver antwortet nicht',
  fd_nameserver_silent: 'Ein in der Delegierung genannter Server hat nicht geantwortet. Resolver werden ihn weiter versuchen und die Zeitüberschreitung abwarten, bevor sie zum nächsten gehen — von außen sieht das aus wie eine Domain, die zeitweise langsam ist.',

  flag_lame_delegation: 'Ein Nameserver ist für die Zone nicht zuständig',
  fd_lame_delegation: 'Der Server antwortet, aber ohne das Autoritäts-Flag: Für diese Zone ist er nicht eingerichtet. Das ist eine Delegierung ohne Zuständigkeit, und jeder Resolver, der auf diesen Server gerät, muss anderswo von vorn beginnen.',

  flag_ns_points_at_cname: 'Der Name eines Nameservers ist ein Alias',
  fd_ns_points_at_cname: 'RFC 2181 §10.3 verlangt, dass ein NS-Eintrag einen Host mit Adresseinträgen nennt, keinen CNAME. Manche Resolver kommen damit zurecht, andere scheitern schlicht.',

  flag_missing_glue: 'Ein Server innerhalb der Zone hat keinen Glue-Eintrag',
  fd_missing_glue: 'Der Nameserver liegt in der Zone, die er bedient — seine Adresse aufzulösen setzt also voraus, die Zone zu fragen, was die Adresse voraussetzt. Der Elternteil muss Glue veröffentlichen, um den Kreis zu durchbrechen.',

  flag_no_authoritative_nameserver: 'Für diese Zone antwortet nichts',
  fd_no_authoritative_nameserver: 'Keiner der genannten Nameserver hat Autorität beansprucht. Aus Sicht eines Resolvers funktioniert die Domain schlicht nicht.',

  flag_no_ipv6_nameserver: 'Kein Nameserver ist über IPv6 erreichbar',
  fd_no_ipv6_nameserver: 'Resolver in reinen IPv6-Netzen erreichen die Zone über einen Übersetzer, wenn überhaupt. Einem Nameserver einen AAAA-Eintrag zu geben, ist meist eine Sache von fünf Minuten.',

  flag_nameservers_single_network: 'Alle Nameserver liegen in einem Netz',
  fd_nameservers_single_network: 'Die Adressen teilen sich ein /24, was in der Regel ein Rechenzentrum und oft ein einziges Rack bedeutet. Zwei Server am selben Ort fallen gemeinsam aus.',

  flag_serial_mismatch: 'Die Server halten verschiedene Fassungen der Zone',
  fd_serial_mismatch: 'Die SOA-Seriennummern gehen auseinander, mindestens ein Sekundärserver folgt dem Primärserver also nicht mehr: ein fehlgeschlagener Transfer, ein abgelaufener Schlüssel, eine neue Firewall-Regel. Er antwortet munter weiter, mit veralteten Einträgen, und nirgends erscheint ein Fehler.',

  flag_soa_timer_out_of_range: 'Ein SOA-Zeitgeber liegt außerhalb des üblichen Bereichs',
  fd_soa_timer_out_of_range: 'Der Wert liegt außerhalb dessen, was RFC 1912 empfiehlt. Für sich genommen kein Fehler — aber solche Werte stammen meist aus einer Vorlage, zu der niemand zurückgekehrt ist.',

  flag_soa_retry_above_refresh: 'Retry ist nicht kürzer als Refresh',
  fd_soa_retry_above_refresh: 'Retry soll das kürzere Intervall nach einem gescheiterten Refresh sein. Ist es das längere, wartet ein fehlgeschlagener Transfer einen ganzen Refresh-Zyklus, bevor er erneut versucht wird.',

  flag_soa_expire_too_short: 'Expire ist im Verhältnis zu den anderen Zeitgebern kurz',
  fd_soa_expire_too_short: 'Erreicht ein Sekundärserver den Primärserver so lange nicht, hört er ganz auf zu antworten. Unterhalb von zwei Refresh-Versuchen nimmt ein langes Wochenende mit Störungen die Zone vom Netz.',

  flag_soa_rname_has_at: 'Die Kontaktadresse enthält ein @',
  fd_soa_rname_has_at: 'Das RNAME-Feld ist eine E-Mail-Adresse, deren @ als Punkt geschrieben wird. Ein wörtliches @ macht es unlesbar, und automatische Meldungen zur Zone laufen ins Leere.',

  flag_primary_not_in_ns_set: 'Der Primärserver gehört nicht zu den veröffentlichten Nameservern',
  fd_primary_not_in_ns_set: 'Der SOA nennt einen Primärserver, der nicht im NS-Satz steht. Genau so betreibt man einen versteckten Primärserver, daher ist das eine Anmerkung und kein Fehler.',

  flag_cname_at_apex: 'Ein CNAME am Ursprung der Zone',
  fd_cname_at_apex: 'RFC 1034 §3.6.2: Ein Name mit CNAME hat keine weiteren Einträge. Am Zonenursprung stehen immer SOA und NS, beides kann also nicht zugleich gelten. Manche Resolver liefern den CNAME und verwerfen den Rest, manche ignorieren ihn; als Erstes bricht meist die E-Mail.',

  flag_cname_with_other_data: 'Ein CNAME neben anderen Einträgen',
  fd_cname_with_other_data: 'Derselbe Name trägt einen CNAME und mindestens einen weiteren Eintragstyp. Welchen ein Resolver zurückgibt, hängt davon ab, wonach zuerst gefragt wurde — keine Eigenschaft, die man sich für sein DNS wünscht.',

  flag_no_address_at_apex: 'Der Zonenursprung hat keine Adresse',
  fd_no_address_at_apex: 'Weder A noch AAAA für die Domain selbst. Bei einer reinen E-Mail-Domain Absicht; für jemanden, der sie in den Browser tippt, eine Überraschung.',

  flag_no_ipv6: 'Kein AAAA-Eintrag',
  fd_no_ipv6: 'Die Domain löst nur über IPv4 auf. Besucher in reinen IPv6-Mobilfunknetzen erreichen sie über den Übersetzer ihres Anbieters.',

  flag_ttl_very_short: 'Eine sehr kurze TTL am Zonenursprung',
  fd_ttl_very_short: 'Unter einer Minute. Das ist eine Umzugseinstellung, die nach dem Umzug oft stehen bleibt — und sie vervielfacht die Abfragelast auf den Nameservern, solange sie bleibt.',

  flag_ttl_very_long: 'Eine sehr lange TTL am Zonenursprung',
  fd_ttl_very_long: 'Über zwei Tage. Jede Adressänderung braucht ebenso lange, um alle zu erreichen — eine unangenehme Lage während eines Störfalls.',

  flag_wildcard_record: 'Die Zone hat einen Platzhalter',
  fd_wildcard_record: 'Ein Name, den es mit Sicherheit nicht gibt, bekam dennoch eine Antwort: Ein Platzhalter ist im Spiel. Gut zu wissen, denn „der Eintrag existiert" kann dann bloß „der Platzhalter hat gegriffen" heißen.',

  flag_txt_split_into_chunks: 'Ein TXT-Eintrag ist in mehrere Zeichenketten geteilt',
  fd_txt_split_into_chunks: 'Bei allem über 255 Byte normal — die Teile werden ohne Trennzeichen aneinandergehängt. Es wird genannt, weil Parser, die sie mit einem Leerzeichen verbinden, SPF- und DKIM-Einträge stillschweigend zerstören.',

  flag_ds_without_dnskey: 'Der Elternteil sagt, die Zone sei signiert, und sie ist es nicht',
  fd_ds_without_dnskey: 'Beim Elternteil steht ein DS-Eintrag, in der Zone aber kein DNSKEY. Jeder validierende Resolver wertet das als Angriff und verweigert die Antwort, die Domain ist also für einen großen Teil des Internets unerreichbar.',

  flag_dnssec_not_enabled: 'Die Zone ist nicht signiert',
  fd_dnssec_not_enabled: 'Kein DNSSEC. Antworten für diese Domain lassen sich nicht von erfundenen unterscheiden — genau das soll DNSSEC verhindern.',

  flag_no_key_signing_key: 'Kein eigener Schlüssel-Signaturschlüssel',
  fd_no_key_signing_key: 'Die Zone signiert mit einem einzigen Schlüssel, statt die Rollen zu trennen. Zulässig und einfacher — dann erzwingt aber jeder Schlüsselwechsel eine Aktualisierung des DS beim Registrar.',

  flag_weak_key_algorithm: 'Ein Signaturalgorithmus, der nicht mehr tragfähig ist',
  fd_weak_key_algorithm: 'Der Schlüssel nutzt einen Algorithmus — RSA/SHA-1, DSA oder MD5 —, der nicht als sicher gilt. SHA-1-Kollisionen sind seit 2017 praktisch machbar, und die Wurzelzone nimmt diese für neue Delegierungen nicht mehr an.',

  flag_rsa_key_too_short: 'Ein RSA-Signaturschlüssel unter 2048 Bit',
  fd_rsa_key_too_short: 'Alles Kürzere liegt unter der aktuellen Empfehlung und sollte gewechselt werden. Der Wechsel ist Routine; es so zu lassen, ist es nicht.',

  flag_key_revoked: 'Ein Schlüssel ist als widerrufen markiert',
  fd_key_revoked: 'Das REVOKE-Bit ist gesetzt. Das gehört zu einem geordneten Wechsel (RFC 5011) und sollte nach dessen Abschluss verschwinden — steht es seit Monaten da, war der Wechsel nicht abgeschlossen.',

  flag_key_not_a_zone_key: 'Ein DNSKEY ohne Zonen-Flag',
  fd_key_not_a_zone_key: 'Der Schlüssel steht im DNSKEY-Satz, ist aber nicht als Zonenschlüssel markiert und kann daher in der Zone nichts validieren.',

  flag_dnskey_not_signed: 'Der Schlüsselsatz trägt keine Signatur',
  fd_dnskey_not_signed: 'Ein DNSKEY-Satz ohne darüberliegenden RRSIG kann von nichts geglaubt werden. Validierende Resolver weisen die ganze Zone zurück.',

  flag_dnskey_signature_invalid: 'Die Signatur über den Schlüsselsatz geht nicht auf',
  fd_dnskey_signature_invalid: 'Der RRSIG über dem DNSKEY-Satz hat die Prüfung hier nicht bestanden. Validierende Resolver kommen zum selben Schluss und antworten für die Domain nicht mehr.',

  flag_ds_weak_digest: 'Der DS verwendet einen schwachen Hashwert',
  fd_ds_weak_digest: 'Der Hashwert beim Elternteil ist SHA-1. Veröffentlichen Sie daneben einen DS mit SHA-256 und ziehen Sie den alten danach zurück.',

  flag_ds_points_at_missing_key: 'Der DS zeigt auf einen Schlüssel, den die Zone nicht veröffentlicht',
  fd_ds_points_at_missing_key: 'Der Elternteil bürgt für ein Key-Tag, das in der Zone nicht vorkommt. So sieht ein Schlüsselwechsel aus, bei dem die Aktualisierung beim Registrar vergessen wurde, und er zerstört die Validierung vollständig.',

  flag_ds_digest_mismatch: 'Der DS passt nicht zum Zonenschlüssel',
  fd_ds_digest_mismatch: 'Der aus dem veröffentlichten Schlüssel neu berechnete Hashwert stimmt nicht mit dem beim Elternteil überein. Die Kette von der Wurzel ist zerrissen, und validierende Resolver weisen die Domain zurück.',

  flag_signed_but_no_ds: 'Signiert, aber durch nichts verankert',
  fd_signed_but_no_ds: 'Die Zone ist signiert, und der Elternteil veröffentlicht kein DS — es gibt also keinen Weg von der Wurzel zu diesen Signaturen, nichts validiert sie. Meist ein Schritt beim Registrar, der nie abgeschlossen wurde.',

  flag_zone_data_signature_invalid: 'Eine Signatur über die Zonendaten geht nicht auf',
  fd_zone_data_signature_invalid: 'Der SOA-Eintrag ist signiert, und die Signatur passt nicht zu den veröffentlichten Schlüsseln. Validierende Resolver weisen die Domain zurück.',

  flag_zone_data_not_signed: 'Die Zonendaten tragen keine Signaturen',
  fd_zone_data_not_signed: 'Es sind Schlüssel veröffentlicht, die Einträge selbst aber nicht signiert — die Zone ist also nur dem Namen nach signiert.',

  flag_signatures_expiring_soon: 'Die Signaturen nähern sich dem Ende ihrer Laufzeit',
  fd_signatures_expiring_soon: 'Vom Gültigkeitsfenster ist wenig übrig. Hat das, was die Zone nachsigniert, aufgehört, verschwindet die Domain für jeden validierenden Resolver genau dann, wenn das Fenster schließt — und zwar ohne Vorwarnung.',

  flag_signatures_expiring: 'Die Signaturen haben die Hälfte ihres Fensters überschritten',
  fd_signatures_expiring: 'Bei einer Zone, die regelmäßig nachsigniert wird, normal; angezeigt, damit ein hängengebliebener Signierer erkannt wird, bevor es dringend wird.',

  flag_signature_expired: 'Eine Signatur ist abgelaufen',
  fd_signature_expired: 'Das Gültigkeitsfenster ist geschlossen. Jeder validierende Resolver hält die Antwort für gefälscht, womit die Domain für ihn aus dem Internet verschwindet.',

  flag_nsec_probe_failed: 'Es ließ sich nicht sehen, wie Nichtexistenz belegt wird',
  fd_nsec_probe_failed: 'Die Abfrage eines absichtlich nicht vorhandenen Namens kam nicht zurück, daher ließen sich NSEC und NSEC3 nicht untersuchen.',

  flag_nsec3_iterations_above_zero: 'NSEC3 verwendet zusätzliche Hash-Durchläufe',
  fd_nsec3_iterations_above_zero: 'RFC 9276 verlangt null. Die zusätzlichen Runden sollten das Durchzählen der Zone teuer machen; das gelang nie, und zuverlässig gebremst wird nur der validierende Resolver.',

  flag_nsec3_salt_present: 'NSEC3 verwendet ein Salz',
  fd_nsec3_salt_present: 'RFC 9276 verlangt ein leeres Salz. Es bringt keinen Schutz — das Salz steht im Eintrag selbst — und macht jede Änderung daran zu einer vollständigen Nachsignierung der Zone.',

  flag_nsec3_opt_out: 'NSEC3 nutzt Opt-out',
  fd_nsec3_opt_out: 'Unsignierte Delegierungen innerhalb der Zone werden nicht als abwesend belegt. Bei einer sehr großen Zone vernünftig, für die meisten unnötig.',

  flag_nsec_zone_walkable: 'Die Zone lässt sich durchzählen',
  fd_nsec_zone_walkable: 'NSEC belegt die Abwesenheit eines Namens, indem es den nächsten vorhandenen nennt — die ganze Zone lässt sich also Abfrage für Abfrage auslesen. Für viele ist das eine bewusste Entscheidung, und sie verdient, klar benannt zu werden.',

  flag_caa_missing: 'Kein CAA-Eintrag',
  fd_caa_missing: 'Nichts schränkt ein, welche Zertifizierungsstelle für diese Domain ausstellen darf. Alle Stellen der CA/Browser-Grundanforderungen müssen CAA seit 2017 beachten — eine kostenlose Einschränkung, die schlicht nicht genutzt wird.',

  flag_caa_forbids_issuance: 'CAA verbietet jede Ausstellung',
  fd_caa_forbids_issuance: 'Der Eintrag ist ein einzelnes Semikolon: Keine Stelle darf für diesen Namen ausstellen. Bei einer Domain, die nie ein Zertifikat haben soll, Absicht — bei einer, die eines braucht, ein teurer Tippfehler.',

  flag_caa_no_iodef: 'CAA hat keine Meldeadresse',
  fd_caa_no_iodef: 'Ohne iodef-Eigenschaft hat eine Stelle, die einen Antrag wegen Ihres CAA-Eintrags ablehnt, niemanden, dem sie das sagen könnte — genau dann, wenn Sie es wissen wollten.',

  flag_caa_no_issuewild: 'Keine eigene Regel für Wildcards',
  fd_caa_no_issuewild: 'Ohne issuewild regelt der issue-Satz auch Wildcard-Zertifikate. Oft ist genau das gemeint; es wird gesagt, damit es nicht angenommen werden muss.',

  flag_caa_unknown_tag: 'Eine unbekannte CAA-Eigenschaft',
  fd_caa_unknown_tag: 'Der Eintrag enthält ein Tag außerhalb des Standardsatzes. Die Zertifizierungsstellen werden es ignorieren.',

  flag_caa_unknown_critical_tag: 'Eine unbekannte CAA-Eigenschaft als kritisch markiert',
  fd_caa_unknown_critical_tag: 'Das Kritisch-Flag steht auf einem Tag, das wir nicht kennen. Eine Stelle, die es ebenfalls nicht kennt, muss die Ausstellung vollständig verweigern — das kann Zertifikate ohne erkennbaren Grund blockieren.',

  flag_no_resolver_answered: 'Kein öffentlicher Resolver hat geantwortet',
  fd_no_resolver_answered: 'Keiner der sechs öffentlichen Resolver lieferte eine Antwort für diesen Namen. Entweder ist die Zone unerreichbar, oder unser eigener ausgehender Weg zu ihnen ist es.',

  flag_resolvers_disagree: 'Öffentliche Resolver geben unterschiedliche Antworten',
  fd_resolvers_disagree: 'Zwei oder mehr Resolver halten gerade unterschiedliche Einträge. Nach einer Änderung ist das für einige Stunden normal — jeder Cache wartet seine eigene TTL ab — und es ist ein Problem, wenn es über die hier gezeigte längste TTL hinaus anhält.',

  flag_some_resolvers_silent: 'Einige öffentliche Resolver haben nicht geantwortet',
  fd_some_resolvers_silent: 'Mindestens ein Resolver hat nicht rechtzeitig geantwortet. Meist ist es dessen eigene Last oder ein gefilterter Weg; es wird genannt statt übergangen, damit aus dem Schweigen nichts geschlossen wird.',
};

OWN.uk = {
  title: 'Перевірка DNS — делегування, DNSSEC і поширення для будь-якого домену',
  title_short: 'Перевірка DNS',
  h1: 'Перевірка DNS',
  subtitle: 'Обхід делегування від кореня, серійні номери SOA з усіх серверів імен, ланцюжок DNSSEC перевіряється тут, а не береться на віру',
  ph_host: 'example.com',
  hero_label: 'Домен, який перевіряють',
  empty_hint: 'Введіть доменне імʼя. Перевірка проходить делегування від кореневих серверів униз, ставить однакові запитання кожному авторитетному серверу і сама звіряє підписи DNSSEC. Це триває кілька секунд і близько пʼятдесяти запитів.',

  stage_resolve: 'обхід делегування',
  stage_delegation: 'перевірка серверів імен',
  stage_soa: 'звірка серійних номерів SOA',
  stage_records: 'читання записів',
  stage_dnssec: 'перевірка ланцюжка DNSSEC',
  stage_caa: 'пошук CAA',
  stage_propagation: 'опитування публічних резолверів',
  stage_grade: 'виставлення оцінки',

  card_grade: 'З чого склалася оцінка',
  card_delegation: 'Делегування',
  card_nameservers: 'Сервери імен',
  card_soa: 'Зона (SOA)',
  card_records: 'Записи',
  card_dnssec: 'DNSSEC',
  card_keys: 'Ключі та підписи',
  card_caa: 'CAA',
  card_propagation: 'Публічні резолвери',
  card_trace: 'Шлях від кореня',

  comp_delegation: 'Здоровʼя делегування',
  comp_dnssec: 'DNSSEC',
  comp_hygiene: 'Гігієна зони',

  k_zone: 'Зона',
  k_parent_ns: 'Сервери у батька',
  k_zone_ns: 'Сервери в самій зоні',
  k_ns_agreement: 'Обидві сторони збігаються',
  k_only_at_parent: 'Лише у батька',
  k_only_at_zone: 'Лише в зоні',
  k_glue: 'Glue-записи',
  k_answering: 'Відповідають авторитетно',
  k_ipv6_ns: 'Доступні через IPv6',
  k_primary: 'Первинний (MNAME)',
  k_rname: 'Контакт (RNAME)',
  k_serial: 'Серійний номер',
  k_serials_agree: 'Серійні номери збігаються',
  k_refresh: 'Refresh',
  k_retry: 'Retry',
  k_expire: 'Expire',
  k_minimum: 'TTL відʼємних відповідей',
  k_a: 'A',
  k_aaaa: 'AAAA',
  k_mx: 'MX',
  k_txt: 'TXT',
  k_ns: 'NS',
  k_srv: 'SRV',
  k_apex_ttl: 'TTL на вершині зони',
  k_wildcard: 'Wildcard',
  k_enabled: 'Підписана',
  k_ds_at_parent: 'DS у батька',
  k_chain_ds: 'DS відповідає ключу',
  k_chain_key: 'Набір ключів підписано',
  k_chain_zone: 'Дані зони підписано',
  k_nsec_kind: 'Доведення відсутності',
  k_nsec3_iterations: 'Ітерації NSEC3',
  k_soonest_expiry: 'Найближче завершення підпису',
  k_caa_at: 'Опубліковано на',
  k_caa_issue: 'Можуть видавати',
  k_caa_issuewild: 'Можуть видавати wildcard',
  k_caa_iodef: 'Повідомляти про порушення на',
  k_resolvers_agree: 'Резолвери погоджуються',
  k_longest_ttl: 'Найбільший залишок TTL',
  k_validating: 'Перевірили DNSSEC',
  k_queries: 'Зроблено запитів',

  th_nameserver: 'Сервер імен',
  th_status: 'Стан',
  th_addresses: 'Адреси',
  th_serial: 'Серійний номер',
  th_response: 'Відгук',
  th_resolver: 'Резолвер',
  th_answer: 'Відповідь',
  th_ttl: 'Залишок TTL',
  th_keytag: 'Тег ключа',
  th_role: 'Роль',
  th_algorithm: 'Алгоритм',
  th_bits: 'Біт',
  th_covers: 'Покриває',
  th_valid: 'Дійсний',
  th_expires: 'Спливає',
  th_type: 'Тип',
  th_value: 'Значення',

  nss_authoritative: 'авторитетний',
  nss_lame: 'не авторитетний',
  nss_silent: 'не відповідає',
  nss_unresolvable: 'імʼя не розвʼязується',
  nsec_nsec: 'NSEC',
  nsec_nsec3: 'NSEC3',
  nsec_none: 'немає',
  v_seconds: '{n} с',
  v_days: '{n} дн.',
  v_of_lifetime: 'лишилося {days} з {total} дн.',
  v_root: 'корінь',

  note_delegation: 'Батьківська зона і сама зона публікують кожна свій набір NS. Збігатися вони не зобовʼязані, і за розбіжності домен працює рівно доти, доки черговий резолвер не закешує інший набір.',
  note_soa: 'Кожен авторитетний сервер опитують окремо. Сервер із відсталим серійним номером далі відповідає — але старішою копією зони.',
  note_dnssec: 'Ланцюжок перевіряється тут: дайджест із DS у батька обчислюється заново з ключа зони, а кожен підпис звіряється з ключовим матеріалом. Жодного резолвера не питають, чи він задоволений.',
  note_propagation: 'Поширюватися нікуди: глобального стану DNS немає, є кеші, кожен з яких тримає своє, доки не спливе TTL. Залишок TTL і є відповіддю на питання «скільки ще чекати».',
  note_trace: 'Кожен крок — це відсилання: сервер ліворуч запитали про домен, і він відповів серверами праворуч.',

  err_zone_not_found: 'Для цього імені зони не знайдено.',
  err_dns_timeout: 'Сервер імен не відповів вчасно.',
  err_dns_network: 'До сервера імен не вдалося достукатися.',
  err_dns_unreachable: 'Жоден сервер імен не відповів.',

  inc_zone_not_found: 'імʼя не делеговане, перевіряти не було чого',
  inc_delegation_walk_incomplete: 'обхід від кореня не завершився',
  inc_no_authoritative_server_answered: 'жоден авторитетний сервер не відповів',
  inc_ds_lookup_failed: 'не вдалося прочитати запис DS у батька',
  inc_dnskey_lookup_failed: 'не вдалося прочитати набір DNSKEY',
  inc_dnskey_rrsig_missing: 'підпис над набором DNSKEY не повернувся',
  inc_soa_rrsig_unavailable: 'підпис над даними зони не повернувся',

  cap_domain_does_not_exist: 'домен не існує',
  cap_no_delegation: 'імʼя не делеговане',
  cap_no_authoritative_nameserver: 'жоден сервер не відповідає авторитетно',
  cap_dnssec_chain_broken: 'ланцюжок DNSSEC розірвано',
  cap_signature_expired: 'підпис завершився',
  cap_cname_at_apex: 'CNAME на вершині зони',
  cap_lame_delegation: 'lame-делегування',
  cap_nameserver_not_answering: 'заявлений сервер імен не відповідає',
  cap_ns_set_mismatch: 'сторони делегування розходяться',
  cap_serial_mismatch: 'сервери тримають різні версії зони',
  cap_missing_glue: 'у сервера всередині зони немає glue-запису',
  cap_single_nameserver: 'єдиний сервер імен',
  cap_cname_with_other_data: 'CNAME поруч з іншими записами',
  cap_signed_but_no_ds: 'підписана, але без DS у батька',
  cap_weak_dnssec_algorithm: 'алгоритм підпису більше не вважається надійним',
  cap_weak_dnssec_key: 'заслабкий ключ підпису',
  cap_scan_incomplete: 'перевірка неповна, тому оцінку не виставлено',

  flag_delegation_walk_failed: 'Обхід від кореня не завершився',
  fd_delegation_walk_failed: 'Один із серверів на шляху від кореня не відповів, тож частину делегування розглянути не вдалося. Це однаково стосується і нашої доступності, а не лише їхньої.',

  flag_nxdomain: 'Домен не існує',
  fd_nxdomain: 'Батьківська зона відповіла NXDOMAIN: делегування для цього імені немає. Або його ніколи не реєстрували, або реєстрація завершилася.',

  flag_no_delegation: 'Імʼя не делеговане',
  fd_no_delegation: 'Зони для імені не знайдено. Воно може існувати як запис усередині батьківської зони, але власною зоною із серверами імен не є.',

  flag_referral_off_path: 'Відсилання повело вбік від імені',
  fd_referral_off_path: 'Сервер відправив нас у зону, яка не є предком запитаного імені. Це помилка конфігурації, і піти за таким відсиланням — спосіб опинитися не там.',

  flag_nameserver_unresolvable: 'Імʼя сервера не розвʼязується',
  fd_nameserver_unresolvable: 'У делегуванні вказано сервер, в імені якого немає адресних записів. Резолвер, що обрав його, марнує запит і мусить пробувати наступний.',

  flag_ns_set_mismatch: 'У батька і в зоні різні сервери імен',
  fd_ns_set_mismatch: 'Делегування у батька і NS-записи в самій зоні не збігаються. На практиці використовують обидва набори, тож домен поводиться по-різному залежно від того, що закешував резолвер, — класична причина плаваючого збою.',

  flag_single_nameserver: 'Єдиний сервер імен',
  fd_single_nameserver: 'RFC 1034 просить щонайменше два, у різних мережах. З одним будь-яка його недоступність — це недоступність усього домену, включно з поштою.',

  flag_nameserver_silent: 'Сервер імен не відповідає',
  fd_nameserver_silent: 'Сервер, зазначений у делегуванні, не відповів. Резолвери й далі звертатимуться до нього і чекатимуть таймауту, перш ніж перейти до наступного, — ззовні це має вигляд домену, який часом гальмує.',

  flag_lame_delegation: 'Сервер не авторитетний для зони',
  fd_lame_delegation: 'Сервер відповідає, але без прапорця авторитетності: цю зону на ньому не налаштовано. Це lame-делегування, і кожен резолвер, що потрапив на такий сервер, починає пошук наново.',

  flag_ns_points_at_cname: 'Імʼя сервера — це псевдонім',
  fd_ns_points_at_cname: 'RFC 2181 §10.3 вимагає, щоб NS вказував на хост з адресними записами, а не на CNAME. Частина резолверів дає раду, частина просто зазнає невдачі.',

  flag_missing_glue: 'У сервера всередині зони немає glue-запису',
  fd_missing_glue: 'Сервер імен живе всередині зони, яку обслуговує, тож щоб дізнатися його адресу, треба спитати зону — а для цього потрібна адреса. Батько має опублікувати glue, щоб розірвати коло.',

  flag_no_authoritative_nameserver: 'За зону ніхто не відповідає',
  fd_no_authoritative_nameserver: 'Жоден із перелічених серверів не заявив авторитетності. З погляду резолвера домен просто не працює.',

  flag_no_ipv6_nameserver: 'Жоден сервер імен не доступний через IPv6',
  fd_no_ipv6_nameserver: 'Резолвери в IPv6-only мережах дістануться зони через трансляцію, якщо дістануться взагалі. Додати AAAA хоча б одному серверу — зазвичай справа пʼяти хвилин.',

  flag_nameservers_single_network: 'Усі сервери імен в одній мережі',
  fd_nameservers_single_network: 'Адреси лежать в одній /24, а це переважно один дата-центр і нерідко одна стійка. Два сервери в одному місці падають разом.',

  flag_serial_mismatch: 'Сервери тримають різні версії зони',
  fd_serial_mismatch: 'Серійні номери SOA розходяться, тобто щонайменше один вторинний перестав іти за первинним: зірваний трансфер, застарілий ключ, нове правило фаєрвола. Він і далі відповідає застарілими записами, і жодної помилки при цьому ніде не видно.',

  flag_soa_timer_out_of_range: 'Таймер SOA поза звичним діапазоном',
  fd_soa_timer_out_of_range: 'Значення виходить за рекомендації RFC 1912. Саме собою це не поломка — але такі числа зазвичай успадковані від шаблона, до якого ніхто не повертався.',

  flag_soa_retry_above_refresh: 'Retry не коротший за refresh',
  fd_soa_retry_above_refresh: 'Retry має бути коротшим інтервалом після невдалого оновлення. Коли він довший, зірваний трансфер чекає цілий цикл refresh, перш ніж повторити спробу.',

  flag_soa_expire_too_short: 'Expire малий відносно інших таймерів',
  fd_soa_expire_too_short: 'Якщо вторинний не зможе достукатися до первинного стільки часу, він узагалі перестане відповідати. За значення менше ніж дві спроби refresh довгі вихідні з негараздами відводять зону в тишу.',

  flag_soa_rname_has_at: 'У контактній адресі стоїть @',
  fd_soa_rname_has_at: 'Поле RNAME — це поштова адреса, у якій @ записується крапкою. Буквальна @ робить її нечитабельною, і автоматичні сповіщення про зону йдуть у нікуди.',

  flag_primary_not_in_ns_set: 'Первинний сервер не входить до опублікованого набору',
  fd_primary_not_in_ns_set: 'SOA називає первинним сервер, якого немає в наборі NS. Саме так працює прихований первинний, тому це заувага, а не помилка.',

  flag_cname_at_apex: 'CNAME на вершині зони',
  fd_cname_at_apex: 'RFC 1034 §3.6.2: в імені з CNAME не може бути інших записів. На вершині завжди є SOA і NS, тож одночасно правдивим це бути не може. Одні резолвери повертають CNAME і гублять решту, інші його ігнорують; першою зазвичай ламається пошта.',

  flag_cname_with_other_data: 'CNAME поруч з іншими записами',
  fd_cname_with_other_data: 'В одного імені є і CNAME, і записи інших типів. Що поверне резолвер, залежить від того, про що його спитали першим, — не та властивість, якої хочеться від DNS.',

  flag_no_address_at_apex: 'У вершини зони немає адреси',
  fd_no_address_at_apex: 'Ані A, ані AAAA для самого домену. Свідомо для домену, що використовується лише під пошту, і несподівано для того, хто набрав його в браузері.',

  flag_no_ipv6: 'Немає запису AAAA',
  fd_no_ipv6: 'Домен розвʼязується лише через IPv4. Відвідувачі в IPv6-only мобільних мережах дістануться його через трансляцію оператора.',

  flag_ttl_very_short: 'Дуже короткий TTL на вершині',
  fd_ttl_very_short: 'Менше хвилини. Це налаштування на час переїзду, і його часто забувають повернути — увесь цей час воно кратно збільшує навантаження на сервери імен.',

  flag_ttl_very_long: 'Дуже довгий TTL на вершині',
  fd_ttl_very_long: 'Понад дві доби. Будь-яка зміна адреси доходитиме до всіх рівно стільки ж — украй незручне становище під час інциденту.',

  flag_wildcard_record: 'У зоні є wildcard',
  fd_wildcard_record: 'На завідомо неіснуюче імʼя прийшла відповідь, отже працює wildcard. Знати про це варто: «запис є» може означати лише «спрацювала зірочка».',

  flag_txt_split_into_chunks: 'Запис TXT розбито на кілька рядків',
  fd_txt_split_into_chunks: 'Нормально для всього, що довше за 255 байтів: шматки склеюються без розділювача. Показано тому, що розбирачі, які зʼєднують їх пробілом, тихо псують SPF і DKIM.',

  flag_ds_without_dnskey: 'Батько вважає зону підписаною, а вона не підписана',
  fd_ds_without_dnskey: 'У батька є DS, а в зоні немає DNSKEY. Будь-який перевіряльний резолвер розцінює це як атаку і відмовляється відповідати, тобто для помітної частини інтернету домен недоступний.',

  flag_dnssec_not_enabled: 'Зона не підписана',
  fd_dnssec_not_enabled: 'DNSSEC не ввімкнено. Відрізнити відповідь для цього домену від вигаданої неможливо — а саме для цього DNSSEC і існує.',

  flag_no_key_signing_key: 'Немає окремого ключа підпису ключів',
  fd_no_key_signing_key: 'Зона підписується одним ключем, без поділу ролей. Це припустимо і простіше, але тоді кожна зміна ключа потребує оновлення DS у реєстратора.',

  flag_weak_key_algorithm: 'Алгоритм підпису більше не вважається надійним',
  fd_weak_key_algorithm: 'Ключ використовує RSA/SHA-1, DSA або MD5. Колізії SHA-1 практично досяжні з 2017 року, і коренева зона більше не приймає такі алгоритми для нових делегувань.',

  flag_rsa_key_too_short: 'Ключ RSA коротший за 2048 біт',
  fd_rsa_key_too_short: 'Усе, що коротше, нижче за поточні рекомендації й підлягає заміні. Зміна ключа — рутинна операція; лишати як є — ні.',

  flag_key_revoked: 'Ключ позначено відкликаним',
  fd_key_revoked: 'Виставлено біт REVOKE. Це частина штатної зміни ключа за RFC 5011, і він має зникнути після її завершення — якщо тримається місяцями, зміна не завершилася.',

  flag_key_not_a_zone_key: 'DNSKEY без прапорця зони',
  fd_key_not_a_zone_key: 'Ключ опубліковано в наборі DNSKEY, але не позначено як ключ зони, тож перевірити ним нічого в зоні не можна.',

  flag_dnskey_not_signed: 'Набір ключів не підписано',
  fd_dnskey_not_signed: 'DNSKEY без RRSIG над ним не дає нічому довіряти. Перевіряльні резолвери відкинуть зону цілком.',

  flag_dnskey_signature_invalid: 'Підпис над набором ключів не сходиться',
  fd_dnskey_signature_invalid: 'RRSIG, що покриває набір DNSKEY, не пройшов перевірку тут. Перевіряльні резолвери дійдуть того самого висновку і перестануть відповідати за домен.',

  flag_ds_weak_digest: 'DS використовує слабкий дайджест',
  fd_ds_weak_digest: 'Дайджест у батька — SHA-1. Варто опублікувати поруч DS із SHA-256, а старий потім прибрати.',

  flag_ds_points_at_missing_key: 'DS вказує на ключ, якого в зоні немає',
  fd_ds_points_at_missing_key: 'Батько ручається за тег ключа, відсутній у зоні. Так має вигляд зміна ключа, за якої забули оновити дані в реєстратора, і валідація ламається повністю.',

  flag_ds_digest_mismatch: 'DS не відповідає ключу зони',
  fd_ds_digest_mismatch: 'Дайджест, перерахований з опублікованого ключа, не збігається з тим, що лежить у батька. Ланцюжок від кореня розірвано, перевіряльні резолвери домен відкинуть.',

  flag_signed_but_no_ds: 'Підписана, але нічим не закріплена',
  fd_signed_but_no_ds: 'Зона підписана, а DS у батька немає, тобто від кореня до цих підписів немає шляху і перевірити їх нічим. Зазвичай це незавершений крок у реєстратора.',

  flag_zone_data_signature_invalid: 'Підпис над даними зони не сходиться',
  fd_zone_data_signature_invalid: 'Запис SOA підписано, і підпис не проходить перевірку опублікованими ключами. Перевіряльні резолвери домен відкинуть.',

  flag_zone_data_not_signed: 'Дані зони не підписано',
  fd_zone_data_not_signed: 'Ключі опубліковано, а самі записи не підписано, тобто зона підписана лише на папері.',

  flag_signatures_expiring_soon: 'Підписи близькі до кінця строку',
  fd_signatures_expiring_soon: 'Від строку дії підпису лишилося небагато. Якщо те, що перепідписує зону, зупинилося, домен зникне для всіх перевіряльних резолверів рівно в момент завершення — без попередження.',

  flag_signatures_expiring: 'Підписи перевалили за середину строку',
  fd_signatures_expiring: 'Норма для зони, яку регулярно перепідписують; показано, щоб застряглий підписувач можна було помітити до того, як це стане терміновим.',

  flag_signature_expired: 'Підпис завершився',
  fd_signature_expired: 'Строк дії скінчився. Кожен перевіряльний резолвер вважає таку відповідь підробленою, тобто для них домену більше немає.',

  flag_nsec_probe_failed: 'Не вдалося побачити, як доводиться відсутність',
  fd_nsec_probe_failed: 'Запит завідомо відсутнього імені не повернувся, тож розглянути NSEC і NSEC3 не вийшло.',

  flag_nsec3_iterations_above_zero: 'NSEC3 використовує зайві ітерації хешу',
  fd_nsec3_iterations_above_zero: 'RFC 9276 просить нуль. Зайві раунди задумувалися як спосіб здорожчити перебір зони; вони ним так і не стали, а надійно навантажують лише перевіряльний резолвер.',

  flag_nsec3_salt_present: 'NSEC3 використовує сіль',
  fd_nsec3_salt_present: 'RFC 9276 просить порожню сіль. Захисту вона не додає — сіль опубліковано в самому записі, — а її зміна потребує перепідписати зону цілком.',

  flag_nsec3_opt_out: 'Увімкнено режим opt-out у NSEC3',
  fd_nsec3_opt_out: 'Непідписані делегування всередині зони не доводяться як відсутні. Розумно для дуже великої зони і зайве для більшості.',

  flag_nsec_zone_walkable: 'Зону можна перебрати цілком',
  fd_nsec_zone_walkable: 'NSEC доводить відсутність імені, називаючи наступне наявне, тож усю зону можна прочитати запит за запитом. Для багатьох це свідомий вибір, і він вартий того, щоб бути названим.',

  flag_caa_missing: 'Немає запису CAA',
  fd_caa_missing: 'Ніщо не обмежує, який засвідчувальний центр може видати сертифікат для домену. Дотримуватися CAA зобовʼязані всі центри з базових вимог CA/Browser з 2017 року, тож це безкоштовне обмеження, яким просто не користуються.',

  flag_caa_forbids_issuance: 'CAA забороняє будь-яку видачу',
  fd_caa_forbids_issuance: 'У записі стоїть самотня крапка з комою: видавати сертифікати не може ніхто. Свідомо для домену, якому сертифікат не потрібен ніколи, і дорога помилка для того, якому потрібен.',

  flag_caa_no_iodef: 'У CAA немає адреси для сповіщень',
  fd_caa_no_iodef: 'Без властивості iodef центру, що відмовив у видачі через ваш запис CAA, нікуди про це повідомити — а це саме той момент, коли ви хотіли б знати.',

  flag_caa_no_issuewild: 'Немає окремого правила для wildcard',
  fd_caa_no_issuewild: 'Без issuewild набір issue керує і wildcard-сертифікатами. Часто саме це й малося на увазі; сказано, щоб не малося на увазі мовчки.',

  flag_caa_unknown_tag: 'Незнайома властивість CAA',
  fd_caa_unknown_tag: 'У записі є тег поза стандартним набором. Засвідчувальні центри його проігнорують.',

  flag_caa_unknown_critical_tag: 'Незнайому властивість CAA позначено критичною',
  fd_caa_unknown_critical_tag: 'На невідомому нам тезі виставлено прапорець critical. Центр, якому він теж невідомий, зобовʼязаний відмовити у видачі взагалі, тож це може блокувати сертифікати без видимої причини.',

  flag_no_resolver_answered: 'Жоден публічний резолвер не відповів',
  fd_no_resolver_answered: 'Жоден із шести публічних резолверів не повернув відповіді для цього імені. Або зона недоступна, або недоступний наш вихідний шлях до них.',

  flag_resolvers_disagree: 'Публічні резолвери відповідають по-різному',
  fd_resolvers_disagree: 'Два або більше резолверів тримають зараз різні записи. Це нормально в перші години після зміни — кожен кеш дочікується свого TTL — і це проблема, якщо триває довше за найбільший показаний тут TTL.',

  flag_some_resolvers_silent: 'Частина публічних резолверів не відповіла',
  fd_some_resolvers_silent: 'Щонайменше один резолвер не відповів вчасно. Зазвичай це його власне навантаження або відфільтрований шлях; показано, а не сховано, щоб із мовчання нічого не виводилося.',
};

OWN.tr = {
  title: 'DNS denetimi — herhangi bir alan adı için yetkilendirme, DNSSEC ve yayılma',
  title_short: 'DNS denetimi',
  h1: 'DNS denetimi',
  subtitle: 'Yetkilendirme kökten aşağı yürünür, SOA seri numaraları her ad sunucusunda karşılaştırılır, DNSSEC zinciri güvenilerek değil burada doğrulanır',
  ph_host: 'example.com',
  hero_label: 'Denetlenen alan adı',
  empty_hint: 'Bir alan adı girin. Denetim, yetkilendirmeyi kök sunuculardan aşağı doğru yürür, her yetkili ad sunucusuna aynı soruları sorar ve DNSSEC imzalarını kendisi doğrular. Birkaç saniye ve elli kadar sorgu sürer.',

  stage_resolve: 'yetkilendirme yürünüyor',
  stage_delegation: 'ad sunucuları denetleniyor',
  stage_soa: 'SOA seri numaraları karşılaştırılıyor',
  stage_records: 'kayıtlar okunuyor',
  stage_dnssec: 'DNSSEC zinciri doğrulanıyor',
  stage_caa: 'CAA aranıyor',
  stage_propagation: 'genel çözümleyicilere soruluyor',
  stage_grade: 'not veriliyor',

  card_grade: 'Notun dökümü',
  card_delegation: 'Yetkilendirme',
  card_nameservers: 'Ad sunucuları',
  card_soa: 'Bölge (SOA)',
  card_records: 'Kayıtlar',
  card_dnssec: 'DNSSEC',
  card_keys: 'Anahtarlar ve imzalar',
  card_caa: 'CAA',
  card_propagation: 'Genel çözümleyiciler',
  card_trace: 'Kökten gelen yol',

  comp_delegation: 'Yetkilendirmenin sağlığı',
  comp_dnssec: 'DNSSEC',
  comp_hygiene: 'Bölge hijyeni',

  k_zone: 'Bölge',
  k_parent_ns: 'Üst bölgedeki sunucular',
  k_zone_ns: 'Bölgenin kendi sunucuları',
  k_ns_agreement: 'İki taraf uyuşuyor',
  k_only_at_parent: 'Yalnızca üst bölgede',
  k_only_at_zone: 'Yalnızca bölgede',
  k_glue: 'Glue kayıtları',
  k_answering: 'Yetkili olarak yanıtlıyor',
  k_ipv6_ns: 'IPv6 üzerinden erişilebilir',
  k_primary: 'Birincil (MNAME)',
  k_rname: 'İletişim (RNAME)',
  k_serial: 'Seri numarası',
  k_serials_agree: 'Seri numaraları uyuşuyor',
  k_refresh: 'Refresh',
  k_retry: 'Retry',
  k_expire: 'Expire',
  k_minimum: 'Olumsuz TTL',
  k_a: 'A',
  k_aaaa: 'AAAA',
  k_mx: 'MX',
  k_txt: 'TXT',
  k_ns: 'NS',
  k_srv: 'SRV',
  k_apex_ttl: 'Bölge tepesindeki TTL',
  k_wildcard: 'Joker',
  k_enabled: 'İmzalı',
  k_ds_at_parent: 'Üst bölgedeki DS',
  k_chain_ds: 'DS anahtarla eşleşiyor',
  k_chain_key: 'Anahtar kümesi imzalı',
  k_chain_zone: 'Bölge verisi imzalı',
  k_nsec_kind: 'Yokluk kanıtı',
  k_nsec3_iterations: 'NSEC3 yinelemesi',
  k_soonest_expiry: 'En yakın imza bitişi',
  k_caa_at: 'Yayımlandığı ad',
  k_caa_issue: 'Sertifika verebilenler',
  k_caa_issuewild: 'Joker verebilenler',
  k_caa_iodef: 'İhlalleri bildirme adresi',
  k_resolvers_agree: 'Çözümleyiciler uyuşuyor',
  k_longest_ttl: 'En uzun kalan TTL',
  k_validating: 'DNSSEC doğrulayanlar',
  k_queries: 'Yapılan sorgu',

  th_nameserver: 'Ad sunucusu',
  th_status: 'Durum',
  th_addresses: 'Adresler',
  th_serial: 'Seri',
  th_response: 'Yanıt',
  th_resolver: 'Çözümleyici',
  th_answer: 'Yanıt',
  th_ttl: 'Kalan TTL',
  th_keytag: 'Anahtar etiketi',
  th_role: 'Rol',
  th_algorithm: 'Algoritma',
  th_bits: 'Bit',
  th_covers: 'Kapsadığı',
  th_valid: 'Geçerli',
  th_expires: 'Biter',
  th_type: 'Tür',
  th_value: 'Değer',

  nss_authoritative: 'yetkili',
  nss_lame: 'yetkisiz',
  nss_silent: 'yanıt yok',
  nss_unresolvable: 'çözümlenmiyor',
  nsec_nsec: 'NSEC',
  nsec_nsec3: 'NSEC3',
  nsec_none: 'yok',
  v_seconds: '{n} sn',
  v_days: '{n} gün',
  v_of_lifetime: '{total} günün {days} günü kaldı',
  v_root: 'kök',

  note_delegation: 'Üst bölge ve bölgenin kendisi, her biri kendi NS kümesini yayımlar. Uyuşmalarını zorunlu kılan bir şey yoktur; ayrıştıklarında alan adı, bir çözümleyici öbür kümeyi önbelleğe alana kadar çalışır.',
  note_soa: 'Her yetkili sunucuya ayrı ayrı sorulur. Seri numarası geride kalmış bir sunucu yanıtlamayı sürdürür — ama bölgenin daha eski bir kopyasıyla.',
  note_dnssec: 'Zincir burada doğrulanır: üst bölgedeki DS özeti, bölgenin anahtarından yeniden hesaplanır ve her imza anahtar malzemesine karşı denetlenir. Hiçbir çözümleyiciye tatmin olup olmadığı sorulmaz.',
  note_propagation: 'Yayılınacak küresel bir DNS durumu yoktur — yalnızca önbellekler vardır ve her biri kendisine söyleneni TTL’i dolana dek tutar. Kalan TTL, her birinin aynı şeyi daha ne kadar söyleyeceğidir.',
  note_trace: 'Her adım bir yönlendirmedir: soldaki sunucuya alan adı soruldu ve o da sağdaki sunucularla yanıt verdi.',

  err_zone_not_found: 'Bu ad için bölge bulunamadı.',
  err_dns_timeout: 'Bir ad sunucusu zamanında yanıt vermedi.',
  err_dns_network: 'Bir ad sunucusuna ulaşılamadı.',
  err_dns_unreachable: 'Hiçbir ad sunucusu yanıt vermedi.',

  inc_zone_not_found: 'ad yetkilendirilmemiş, incelenecek bir şey yoktu',
  inc_delegation_walk_incomplete: 'kökten başlayan yürüyüş tamamlanmadı',
  inc_no_authoritative_server_answered: 'hiçbir yetkili ad sunucusu yanıt vermedi',
  inc_ds_lookup_failed: 'üst bölgedeki DS kaydı okunamadı',
  inc_dnskey_lookup_failed: 'DNSKEY kümesi okunamadı',
  inc_dnskey_rrsig_missing: 'DNSKEY kümesi üzerine imza dönmedi',
  inc_soa_rrsig_unavailable: 'bölge verisi üzerine imza dönmedi',

  cap_domain_does_not_exist: 'alan adı yok',
  cap_no_delegation: 'ad yetkilendirilmemiş',
  cap_no_authoritative_nameserver: 'hiçbir sunucu yetkili olarak yanıtlamıyor',
  cap_dnssec_chain_broken: 'DNSSEC zinciri kopuk',
  cap_signature_expired: 'bir imzanın süresi dolmuş',
  cap_cname_at_apex: 'bölge tepesinde CNAME',
  cap_lame_delegation: 'yetkisiz yetkilendirme',
  cap_nameserver_not_answering: 'listelenen bir sunucu yanıt vermiyor',
  cap_ns_set_mismatch: 'yetkilendirmenin iki tarafı uyuşmuyor',
  cap_serial_mismatch: 'sunucular bölgenin farklı sürümlerini tutuyor',
  cap_missing_glue: 'bölge içindeki bir sunucunun glue kaydı yok',
  cap_single_nameserver: 'tek bir ad sunucusu',
  cap_cname_with_other_data: 'başka kayıtların yanında bir CNAME',
  cap_signed_but_no_ds: 'imzalı, ama üst bölgede DS yok',
  cap_weak_dnssec_algorithm: 'artık sağlam sayılmayan bir imza algoritması',
  cap_weak_dnssec_key: 'fazla kısa bir imza anahtarı',
  cap_scan_incomplete: 'denetim eksik kaldı, bu yüzden not verilmedi',

  flag_delegation_walk_failed: 'Kökten başlayan yürüyüş tamamlanmadı',
  fd_delegation_walk_failed: 'Kökten gelen yol üzerindeki bir sunucu yanıt vermedi, bu yüzden yetkilendirmenin bir bölümü incelenemedi. Bu, onların erişilebilirliği kadar bizimkiyle de ilgilidir.',

  flag_nxdomain: 'Alan adı yok',
  fd_nxdomain: 'Üst bölge NXDOMAIN yanıtı verdi: bu ad için yetkilendirme yok. Ya hiç tescil edilmedi ya da tescili sona erdi.',

  flag_no_delegation: 'Ad yetkilendirilmemiş',
  fd_no_delegation: 'Ad için bölge bulunamadı. Üst bir bölgenin içinde kayıt olarak bulunabilir, ama kendi ad sunucuları olan bir bölge değildir.',

  flag_referral_off_path: 'Bir yönlendirme adın dışına çıktı',
  fd_referral_off_path: 'Bir sunucu bizi, sorulan adın atası olmayan bir bölgeye yönlendirdi. Bu bir yapılandırma hatasıdır ve o yönlendirmeyi izlemek, başka bir yerde bulunmanın bir yoludur.',

  flag_nameserver_unresolvable: 'Bir ad sunucusunun adı çözümlenmiyor',
  fd_nameserver_unresolvable: 'Yetkilendirme, kendi adının adres kaydı olmayan bir sunucuyu listeliyor. Onu seçen bir çözümleyici bir sorgu harcar, sonra başkasını denemek zorunda kalır.',

  flag_ns_set_mismatch: 'Üst bölge ile bölge farklı ad sunucuları listeliyor',
  fd_ns_set_mismatch: 'Üst bölgedeki yetkilendirme ile bölgedeki NS kayıtları uyuşmuyor. Uygulamada ikisi de kullanılır, dolayısıyla alan adı çözümleyicinin hangi kümeyi önbelleğe aldığına göre farklı davranır — gelip giden bir arızanın klasik nedeni.',

  flag_single_nameserver: 'Tek bir ad sunucusu',
  fd_single_nameserver: 'RFC 1034 ayrı ağlarda en az iki sunucu ister. Tek sunucuyla o makinenin her kesintisi, e-posta dahil bütün alan adının kesintisidir.',

  flag_nameserver_silent: 'Bir ad sunucusu yanıt vermiyor',
  fd_nameserver_silent: 'Yetkilendirmede adı geçen bir sunucu yanıt vermedi. Çözümleyiciler onu denemeyi sürdürecek ve bir sonrakine geçmeden önce zaman aşımını bekleyecek; bu, dışarıdan aralıklı olarak yavaş bir alan adı gibi görünür.',

  flag_lame_delegation: 'Bir ad sunucusu bölge için yetkili değil',
  fd_lame_delegation: 'Sunucu yanıt veriyor ama yetki bayrağı olmadan: bu bölge için yapılandırılmamış. Bu yetkisiz bir yetkilendirmedir ve o sunucuya düşen her çözümleyici başka yerde yeniden başlamak zorunda kalır.',

  flag_ns_points_at_cname: 'Bir ad sunucusunun adı takma addır',
  fd_ns_points_at_cname: 'RFC 2181 §10.3, bir NS kaydının CNAME değil, adres kayıtları olan bir makineyi adlandırmasını ister. Kimi çözümleyiciler idare eder, kimileri doğrudan başarısız olur.',

  flag_missing_glue: 'Bölge içindeki bir sunucunun glue kaydı yok',
  fd_missing_glue: 'Ad sunucusu hizmet verdiği bölgenin içindedir, dolayısıyla adresini çözümlemek bölgeye sormayı gerektirir — o da adresi gerektirir. Üst bölge, bu çemberi kırmak için glue yayımlamalıdır.',

  flag_no_authoritative_nameserver: 'Bu bölge için hiçbir şey yanıt vermiyor',
  fd_no_authoritative_nameserver: 'Listelenen sunucuların hiçbiri yetki iddia etmedi. Bir çözümleyici açısından alan adı hiç çalışmıyor demektir.',

  flag_no_ipv6_nameserver: 'Hiçbir ad sunucusuna IPv6 ile erişilemiyor',
  fd_no_ipv6_nameserver: 'Yalnızca IPv6 olan ağlardaki çözümleyiciler bölgeye bir çevirici üzerinden ulaşır, ulaşabilirlerse. Bir sunucuya AAAA kaydı eklemek genellikle beş dakikalık iştir.',

  flag_nameservers_single_network: 'Bütün ad sunucuları tek bir ağda',
  fd_nameservers_single_network: 'Adresler aynı /24’ü paylaşıyor; bu genellikle tek bir veri merkezi, çoğu zaman da tek bir kabin demektir. Aynı yerdeki iki sunucu birlikte düşer.',

  flag_serial_mismatch: 'Sunucular bölgenin farklı sürümlerini tutuyor',
  fd_serial_mismatch: 'SOA seri numaraları ayrışıyor; en az bir ikincil sunucu birincili izlemeyi bırakmış: başarısız bir aktarım, süresi dolmuş bir anahtar, yeni bir güvenlik duvarı kuralı. Eski kayıtlarla yanıtlamayı sürdürür ve hiçbir yerde bir hata görünmez.',

  flag_soa_timer_out_of_range: 'Bir SOA zamanlayıcısı alışılmış aralığın dışında',
  fd_soa_timer_out_of_range: 'Değer, RFC 1912’nin önerdiği aralığın dışında. Tek başına bir arıza değil — ama bu sayılar genellikle kimsenin dönüp bakmadığı bir şablondan miras kalır.',

  flag_soa_retry_above_refresh: 'Retry, refresh’ten kısa değil',
  fd_soa_retry_above_refresh: 'Retry, başarısız bir yenilemeden sonra kullanılan kısa aralık olmalıdır. Uzun olan o olduğunda, başarısız bir aktarım yeniden denenmeden önce tam bir yenileme döngüsü bekler.',

  flag_soa_expire_too_short: 'Expire, öbür zamanlayıcılara göre kısa',
  fd_soa_expire_too_short: 'Bir ikincil sunucu birincile bu süre boyunca ulaşamazsa yanıt vermeyi tümüyle bırakır. Birkaç yenileme denemesinin altında, sorunlu geçen uzun bir hafta sonu bölgeyi susturur.',

  flag_soa_rname_has_at: 'İletişim adresinde @ var',
  fd_soa_rname_has_at: 'RNAME alanı, @ işareti nokta olarak yazılan bir e-posta adresidir. Gerçek bir @ onu okunamaz kılar ve bölgeyle ilgili otomatik bildirimler hiçbir yere ulaşmaz.',

  flag_primary_not_in_ns_set: 'Birincil sunucu yayımlanan sunucular arasında değil',
  fd_primary_not_in_ns_set: 'SOA, NS kümesinde olmayan bir birincil sunucu adlandırıyor. Gizli birincil sunucu tam olarak böyle işletilir, dolayısıyla bu bir arıza değil, bir nottur.',

  flag_cname_at_apex: 'Bölgenin tepesinde bir CNAME',
  fd_cname_at_apex: 'RFC 1034 §3.6.2: CNAME taşıyan bir adın başka kaydı olmaz. Tepede her zaman SOA ve NS vardır, dolayısıyla ikisi birden doğru olamaz. Kimi çözümleyiciler CNAME’i döndürüp gerisini atar, kimileri yok sayar; ilk bozulan genellikle e-postadır.',

  flag_cname_with_other_data: 'Başka kayıtların yanında bir CNAME',
  fd_cname_with_other_data: 'Aynı adda hem CNAME hem de en az bir başka kayıt türü var. Bir çözümleyicinin hangisini döndüreceği ilk neyin sorulduğuna bağlıdır ve bu, DNS’inizde isteyeceğiniz bir özellik değildir.',

  flag_no_address_at_apex: 'Bölge tepesinin adresi yok',
  fd_no_address_at_apex: 'Alan adının kendisi için ne A ne AAAA var. Yalnızca e-posta için kullanılan bir alan adında bilinçli; tarayıcıya yazan biri içinse sürpriz.',

  flag_no_ipv6: 'AAAA kaydı yok',
  fd_no_ipv6: 'Alan adı yalnızca IPv4 üzerinden çözümleniyor. Yalnızca IPv6 olan mobil ağlardaki ziyaretçiler operatörlerinin çeviricisi üzerinden ulaşır.',

  flag_ttl_very_short: 'Bölge tepesinde çok kısa bir TTL',
  fd_ttl_very_short: 'Bir dakikanın altında. Bu bir taşınma ayarıdır ve taşınmadan sonra sık sık öylece kalır — kaldığı sürece ad sunucularındaki sorgu yükünü katlar.',

  flag_ttl_very_long: 'Bölge tepesinde çok uzun bir TTL',
  fd_ttl_very_long: 'İki günden fazla. Herhangi bir adres değişikliğinin herkese ulaşması o kadar sürer; bu da bir olay anında kötü bir konumdur.',

  flag_wildcard_record: 'Bölgede joker var',
  fd_wildcard_record: 'Kesinlikle var olmayan bir ad yine de yanıt aldı, demek ki devrede bir joker var. Bilmekte fayda var, çünkü «kayıt var» yalnızca «joker eşleşti» anlamına gelebilir.',

  flag_txt_split_into_chunks: 'Bir TXT kaydı birden çok dizeye bölünmüş',
  fd_txt_split_into_chunks: '255 baytı aşan her şey için normal — parçalar aralarına hiçbir şey konmadan birleştirilir. Burada anılıyor, çünkü onları boşlukla birleştiren ayrıştırıcılar SPF ve DKIM kayıtlarını sessizce bozar.',

  flag_ds_without_dnskey: 'Üst bölge, bölgeyi imzalı sayıyor ama değil',
  fd_ds_without_dnskey: 'Üst bölgede DS kaydı var, bölgede DNSKEY yok. Doğrulayan her çözümleyici bunu saldırı sayar ve yanıt vermeyi reddeder; alan adı internetin büyük bir bölümü için erişilemez olur.',

  flag_dnssec_not_enabled: 'Bölge imzalı değil',
  fd_dnssec_not_enabled: 'DNSSEC yok. Bu alan adına ait yanıtlar, uydurulmuş yanıtlardan ayırt edilemez — DNSSEC tam da bunu önlemek için vardır.',

  flag_no_key_signing_key: 'Ayrı bir anahtar imzalama anahtarı yok',
  fd_no_key_signing_key: 'Bölge, rolleri ayırmak yerine tek bir anahtarla imzalıyor. Bu geçerli ve daha basittir — ama o zaman her anahtar değişimi, kayıt kuruluşundaki DS’in güncellenmesini gerektirir.',

  flag_weak_key_algorithm: 'Artık sağlam sayılmayan bir imza algoritması',
  fd_weak_key_algorithm: 'Anahtar, güvenli kabul edilmeyen bir algoritma kullanıyor: RSA/SHA-1, DSA veya MD5. SHA-1 çakışmaları 2017’den beri uygulanabilir durumda ve kök bölge bunları yeni yetkilendirmeler için artık kabul etmiyor.',

  flag_rsa_key_too_short: '2048 bitin altında bir RSA anahtarı',
  fd_rsa_key_too_short: 'Daha kısa olan her şey güncel öneriden düşüktür ve değiştirilmelidir. Değişim rutindir; olduğu gibi bırakmak değildir.',

  flag_key_revoked: 'Bir anahtar iptal edilmiş olarak işaretli',
  fd_key_revoked: 'REVOKE biti ayarlanmış. Bu, düzenli bir anahtar değişiminin (RFC 5011) parçasıdır ve değişim bitince kaybolmalıdır — aylardır oradaysa bitmemiş demektir.',

  flag_key_not_a_zone_key: 'Bölge bayrağı olmayan bir DNSKEY',
  fd_key_not_a_zone_key: 'Anahtar DNSKEY kümesinde yayımlanmış ama bölge anahtarı olarak işaretlenmemiş, dolayısıyla bölgede hiçbir şeyi doğrulayamaz.',

  flag_dnskey_not_signed: 'Anahtar kümesi imza taşımıyor',
  fd_dnskey_not_signed: 'Üzerinde RRSIG olmayan bir DNSKEY kümesine hiçbir şey güvenemez. Doğrulayan çözümleyiciler bölgenin tamamını reddeder.',

  flag_dnskey_signature_invalid: 'Anahtar kümesi üzerindeki imza doğrulanmıyor',
  fd_dnskey_signature_invalid: 'DNSKEY kümesini kapsayan RRSIG burada doğrulamayı geçemedi. Doğrulayan çözümleyiciler aynı sonuca varacak ve alan adı için yanıt vermeyi bırakacaktır.',

  flag_ds_weak_digest: 'DS zayıf bir özet kullanıyor',
  fd_ds_weak_digest: 'Üst bölgedeki özet SHA-1. Yanına SHA-256 ile bir DS yayımlayın, sonra eskisini geri çekin.',

  flag_ds_points_at_missing_key: 'DS, bölgenin yayımlamadığı bir anahtarı gösteriyor',
  fd_ds_points_at_missing_key: 'Üst bölge, bölgede bulunmayan bir anahtar etiketine kefil oluyor. Kayıt kuruluşundaki güncellemenin unutulduğu bir anahtar değişimi böyle görünür ve doğrulamayı tümüyle bozar.',

  flag_ds_digest_mismatch: 'DS, bölgenin anahtarıyla eşleşmiyor',
  fd_ds_digest_mismatch: 'Yayımlanan anahtardan yeniden hesaplanan özet, üst bölgedekiyle aynı değil. Kökten gelen zincir kopmuştur ve doğrulayan çözümleyiciler alan adını reddedecektir.',

  flag_signed_but_no_ds: 'İmzalı, ama hiçbir şey onu bağlamıyor',
  fd_signed_but_no_ds: 'Bölge imzalı ve üst bölge DS yayımlamıyor; dolayısıyla kökten bu imzalara giden bir yol yok, hiçbir şey onları doğrulamıyor. Genellikle kayıt kuruluşunda hiç tamamlanmamış bir adımdır.',

  flag_zone_data_signature_invalid: 'Bölge verisi üzerindeki bir imza doğrulanmıyor',
  fd_zone_data_signature_invalid: 'SOA kaydı imzalı ve imza, yayımlanan anahtarlarla tutmuyor. Doğrulayan çözümleyiciler alan adını reddedecektir.',

  flag_zone_data_not_signed: 'Bölge verisi imza taşımıyor',
  fd_zone_data_not_signed: 'Anahtarlar yayımlanmış ama kayıtların kendisi imzalanmamış; bölge yalnızca adı imzalıdır.',

  flag_signatures_expiring_soon: 'İmzalar ömürlerinin sonuna yaklaşıyor',
  fd_signatures_expiring_soon: 'Geçerlilik penceresinden az kaldı. Bölgeyi yeniden imzalayan şey durduysa, pencere kapandığında alan adı doğrulayan her çözümleyici için kaybolacak — hem de hiç uyarı vermeden.',

  flag_signatures_expiring: 'İmzalar pencerelerinin yarısını geçti',
  fd_signatures_expiring: 'Düzenli olarak yeniden imzalanan bir bölge için normaldir; takılmış bir imzalayıcının acil hale gelmeden fark edilebilmesi için gösterilir.',

  flag_signature_expired: 'Bir imzanın süresi dolmuş',
  fd_signature_expired: 'Geçerlilik penceresi kapandı. Doğrulayan her çözümleyici yanıtı sahte sayar; bu da alan adını onlar için internetten çıkarır.',

  flag_nsec_probe_failed: 'Yokluğun nasıl kanıtlandığı görülemedi',
  fd_nsec_probe_failed: 'Bilerek var olmayan bir ad için yapılan sorgu geri dönmedi, bu yüzden NSEC ve NSEC3 incelenemedi.',

  flag_nsec3_iterations_above_zero: 'NSEC3 fazladan özet yinelemesi kullanıyor',
  fd_nsec3_iterations_above_zero: 'RFC 9276 sıfır ister. Fazladan turlar bölgeyi tek tek saymayı pahalı kılmak içindi; bunu hiç başaramadılar ve güvenilir biçimde yavaşlattıkları tek taraf doğrulayan çözümleyicidir.',

  flag_nsec3_salt_present: 'NSEC3 tuz kullanıyor',
  fd_nsec3_salt_present: 'RFC 9276 boş tuz ister. Koruma katmaz — tuz kaydın kendisinde yayımlanır — ve değiştirilmesi bölgenin tümüyle yeniden imzalanmasını gerektirir.',

  flag_nsec3_opt_out: 'NSEC3 opt-out kullanıyor',
  fd_nsec3_opt_out: 'Bölge içindeki imzasız yetkilendirmelerin yokluğu kanıtlanmaz. Çok büyük bir bölge için makul, çoğu için gereksiz.',

  flag_nsec_zone_walkable: 'Bölge tek tek sayılabiliyor',
  fd_nsec_zone_walkable: 'NSEC, bir adın yokluğunu var olan bir sonraki adı söyleyerek kanıtlar; dolayısıyla bölgenin tamamı sorgu sorgu okunabilir. Birçokları için bu bilinçli bir tercihtir ve açıkça söylenmeyi hak eder.',

  flag_caa_missing: 'CAA kaydı yok',
  fd_caa_missing: 'Bu alan adı için hangi sertifika otoritesinin sertifika verebileceğini hiçbir şey sınırlamıyor. CA/Browser temel gerekliliklerindeki bütün otoriteler 2017’den beri CAA’ya uymak zorunda; yani kullanılmayan bedava bir kısıtlama.',

  flag_caa_forbids_issuance: 'CAA her türlü sertifika vermeyi yasaklıyor',
  fd_caa_forbids_issuance: 'Kayıt tek başına bir noktalı virgül: bu ad için hiçbir otorite sertifika veremez. Hiç sertifikası olmaması gereken bir alan adı için bilinçli, olması gereken için pahalı bir yazım hatası.',

  flag_caa_no_iodef: 'CAA’nın bildirim adresi yok',
  fd_caa_no_iodef: 'iodef özelliği olmadan, CAA kaydınız yüzünden bir isteği reddeden otoritenin bunu size söyleyeceği bir yer yoktur — tam da bilmek isteyeceğiniz anda.',

  flag_caa_no_issuewild: 'Jokerler için ayrı bir kural yok',
  fd_caa_no_issuewild: 'issuewild olmadan issue kümesi joker sertifikaları da yönetir. Çoğu zaman kastedilen budur; varsayılmasın diye belirtiliyor.',

  flag_caa_unknown_tag: 'Tanınmayan bir CAA özelliği',
  fd_caa_unknown_tag: 'Kayıt, standart kümenin dışında bir etiket içeriyor. Otoriteler onu yok sayacaktır.',

  flag_caa_unknown_critical_tag: 'Tanınmayan bir CAA özelliği kritik olarak işaretli',
  fd_caa_unknown_critical_tag: 'Tanımadığımız bir etikete kritik bayrağı konmuş. Onu tanımayan bir otorite de sertifika vermeyi tümüyle reddetmek zorundadır; bu, görünür bir neden olmadan sertifikaları engelleyebilir.',

  flag_no_resolver_answered: 'Hiçbir genel çözümleyici yanıt vermedi',
  fd_no_resolver_answered: 'Altı genel çözümleyicinin hiçbiri bu ad için yanıt döndürmedi. Ya bölge erişilemez durumda ya da onlara giden kendi çıkış yolumuz.',

  flag_resolvers_disagree: 'Genel çözümleyiciler farklı yanıtlar veriyor',
  fd_resolvers_disagree: 'İki ya da daha fazla çözümleyici şu anda farklı kayıtlar tutuyor. Bir değişiklikten sonra birkaç saat boyunca normaldir — her önbellek kendi TTL’ini bekler — ve burada gösterilen en uzun TTL’i aşarak sürerse sorundur.',

  flag_some_resolvers_silent: 'Bazı genel çözümleyiciler yanıt vermedi',
  fd_some_resolvers_silent: 'En az bir çözümleyici zamanında yanıt vermedi. Genellikle kendi yükü ya da filtrelenmiş bir yoldur; sessizlikten bir sonuç çıkarılmasın diye yok sayılmak yerine belirtiliyor.',
};

OWN.zh = {
  title: 'DNS 检测 — 任意域名的委派、DNSSEC 与传播情况',
  title_short: 'DNS 检测',
  h1: 'DNS 检测',
  subtitle: '从根开始逐级走完委派，在每台名字服务器上比对 SOA 序列号，DNSSEC 链条在这里亲自验证，而不是听信别人',
  ph_host: 'example.com',
  hero_label: '被检测的域名',
  empty_hint: '输入一个域名。检测会从根服务器一路走完委派，向每台权威名字服务器提出同样的问题，并亲自核验 DNSSEC 签名。整个过程需要几秒钟和约五十次查询。',

  stage_resolve: '正在走委派',
  stage_delegation: '正在检查名字服务器',
  stage_soa: '正在比对 SOA 序列号',
  stage_records: '正在读取记录',
  stage_dnssec: '正在验证 DNSSEC 链条',
  stage_caa: '正在查找 CAA',
  stage_propagation: '正在询问公共解析器',
  stage_grade: '正在评级',

  card_grade: '评级构成',
  card_delegation: '委派',
  card_nameservers: '名字服务器',
  card_soa: '区域（SOA）',
  card_records: '记录',
  card_dnssec: 'DNSSEC',
  card_keys: '密钥与签名',
  card_caa: 'CAA',
  card_propagation: '公共解析器',
  card_trace: '自根而下的路径',

  comp_delegation: '委派的健康度',
  comp_dnssec: 'DNSSEC',
  comp_hygiene: '区域整洁度',

  k_zone: '区域',
  k_parent_ns: '父区中的服务器',
  k_zone_ns: '区域自身的服务器',
  k_ns_agreement: '两侧一致',
  k_only_at_parent: '仅在父区',
  k_only_at_zone: '仅在区域内',
  k_glue: '粘合记录',
  k_answering: '权威作答',
  k_ipv6_ns: '可经 IPv6 访问',
  k_primary: '主服务器（MNAME）',
  k_rname: '联系人（RNAME）',
  k_serial: '序列号',
  k_serials_agree: '序列号一致',
  k_refresh: 'Refresh',
  k_retry: 'Retry',
  k_expire: 'Expire',
  k_minimum: '否定应答 TTL',
  k_a: 'A',
  k_aaaa: 'AAAA',
  k_mx: 'MX',
  k_txt: 'TXT',
  k_ns: 'NS',
  k_srv: 'SRV',
  k_apex_ttl: '区域顶点的 TTL',
  k_wildcard: '通配符',
  k_enabled: '已签名',
  k_ds_at_parent: '父区中的 DS',
  k_chain_ds: 'DS 与密钥相符',
  k_chain_key: '密钥集已签名',
  k_chain_zone: '区域数据已签名',
  k_nsec_kind: '不存在性证明',
  k_nsec3_iterations: 'NSEC3 迭代次数',
  k_soonest_expiry: '最近的签名到期',
  k_caa_at: '发布于',
  k_caa_issue: '可签发的机构',
  k_caa_issuewild: '可签发通配符的机构',
  k_caa_iodef: '违规通报地址',
  k_resolvers_agree: '解析器一致',
  k_longest_ttl: '最长剩余 TTL',
  k_validating: '完成 DNSSEC 验证',
  k_queries: '发出的查询',

  th_nameserver: '名字服务器',
  th_status: '状态',
  th_addresses: '地址',
  th_serial: '序列号',
  th_response: '响应',
  th_resolver: '解析器',
  th_answer: '应答',
  th_ttl: '剩余 TTL',
  th_keytag: '密钥标签',
  th_role: '角色',
  th_algorithm: '算法',
  th_bits: '位数',
  th_covers: '覆盖',
  th_valid: '有效',
  th_expires: '到期',
  th_type: '类型',
  th_value: '值',

  nss_authoritative: '权威',
  nss_lame: '无权威',
  nss_silent: '无应答',
  nss_unresolvable: '无法解析',
  nsec_nsec: 'NSEC',
  nsec_nsec3: 'NSEC3',
  nsec_none: '无',
  v_seconds: '{n} 秒',
  v_days: '{n} 天',
  v_of_lifetime: '共 {total} 天，尚余 {days} 天',
  v_root: '根',

  note_delegation: '父区和区域自身各自发布一套 NS。没有任何机制强制两者一致，一旦分歧，域名会照常工作，直到某个解析器恰好缓存了另一套为止。',
  note_soa: '每台权威服务器都单独询问。序列号落后的服务器仍在照常作答 —— 只是拿的是旧版本的区域数据。',
  note_dnssec: '链条在这里验证：父区 DS 中的摘要由区域密钥重新计算，每条签名都用密钥材料逐一核验。不会去问某个解析器它是否满意。',
  note_propagation: '并不存在一个可供「传播」的全局 DNS 状态 —— 只有一个个缓存，各自保留被告知的内容直到自己的 TTL 走完。剩余 TTL 就是每个缓存还会继续这样回答多久。',
  note_trace: '每一步都是一次转介：左边的服务器被问及该域名，它以右边的服务器作答。',

  err_zone_not_found: '未找到该名称对应的区域。',
  err_dns_timeout: '某台名字服务器未及时应答。',
  err_dns_network: '无法连通某台名字服务器。',
  err_dns_unreachable: '没有任何名字服务器作答。',

  inc_zone_not_found: '该名称未被委派，因此没有可检查的内容',
  inc_delegation_walk_incomplete: '自根而下的行走没有走完',
  inc_no_authoritative_server_answered: '没有权威名字服务器作答',
  inc_ds_lookup_failed: '无法读取父区中的 DS 记录',
  inc_dnskey_lookup_failed: '无法读取 DNSKEY 集',
  inc_dnskey_rrsig_missing: '未返回覆盖 DNSKEY 集的签名',
  inc_soa_rrsig_unavailable: '未返回覆盖区域数据的签名',

  cap_domain_does_not_exist: '域名不存在',
  cap_no_delegation: '该名称未被委派',
  cap_no_authoritative_nameserver: '没有服务器权威作答',
  cap_dnssec_chain_broken: 'DNSSEC 链条已断',
  cap_signature_expired: '有签名已过期',
  cap_cname_at_apex: '区域顶点存在 CNAME',
  cap_lame_delegation: '无权威委派',
  cap_nameserver_not_answering: '所列的某台名字服务器不作答',
  cap_ns_set_mismatch: '委派两侧不一致',
  cap_serial_mismatch: '各服务器持有不同版本的区域',
  cap_missing_glue: '区域内的服务器缺少粘合记录',
  cap_single_nameserver: '只有一台名字服务器',
  cap_cname_with_other_data: 'CNAME 与其他记录并存',
  cap_signed_but_no_ds: '已签名，但父区没有 DS',
  cap_weak_dnssec_algorithm: '签名算法已不再稳妥',
  cap_weak_dnssec_key: '签名密钥过短',
  cap_scan_incomplete: '检测不完整，因此未给出评级',

  flag_delegation_walk_failed: '自根而下的行走没有走完',
  fd_delegation_walk_failed: '自根而下的路径上有一台服务器未作答，因此委派的一部分无法查看。这既关乎他们的可达性，也同样关乎我们自己的。',

  flag_nxdomain: '域名不存在',
  fd_nxdomain: '父区返回了 NXDOMAIN：该名称没有委派。要么从未注册，要么注册已经到期。',

  flag_no_delegation: '该名称未被委派',
  fd_no_delegation: '未找到该名称对应的区域。它可能作为父区中的一条记录存在，但并不是拥有自己名字服务器的独立区域。',

  flag_referral_off_path: '一次转介指向了名称之外',
  fd_referral_off_path: '某台服务器把我们转介到一个并非所询名称祖先的区域。这是配置错误，跟随这样的转介就是被带往别处的方式。',

  flag_nameserver_unresolvable: '某台名字服务器的名称无法解析',
  fd_nameserver_unresolvable: '委派中列出了一台服务器，而它自己的名称没有地址记录。选中它的解析器白白浪费一次查询，然后不得不再试另一台。',

  flag_ns_set_mismatch: '父区与区域列出的名字服务器不同',
  fd_ns_set_mismatch: '父区中的委派与区域内的 NS 记录不一致。实际使用中两套都会被用到，因此域名的表现取决于解析器缓存了哪一套 —— 这是时好时坏的故障最经典的成因。',

  flag_single_nameserver: '只有一台名字服务器',
  fd_single_nameserver: 'RFC 1034 要求至少两台，且位于不同网络。只有一台时，这台机器的任何一次中断就是整个域名的中断，邮件也在其中。',

  flag_nameserver_silent: '某台名字服务器不作答',
  fd_nameserver_silent: '委派中点名的一台服务器没有响应。解析器会继续尝试它，并等到超时才转向下一台，从外部看就是一个时快时慢的域名。',

  flag_lame_delegation: '某台名字服务器对该区域没有权威',
  fd_lame_delegation: '服务器会应答，但没有权威标志：它并未为这个区域做过配置。这就是无权威委派，凡是落到这台服务器上的解析器都得另起炉灶重来。',

  flag_ns_points_at_cname: '某台名字服务器的名称是别名',
  fd_ns_points_at_cname: 'RFC 2181 §10.3 要求 NS 记录指向带地址记录的主机，而不是 CNAME。有的解析器能应付，有的干脆失败。',

  flag_missing_glue: '区域内的名字服务器缺少粘合记录',
  fd_missing_glue: '这台名字服务器就住在它所服务的区域里，因此解析它的地址需要先询问该区域，而询问该区域又需要这个地址。父区必须发布粘合记录来打破这个循环。',

  flag_no_authoritative_nameserver: '没有任何服务器为这个区域作答',
  fd_no_authoritative_nameserver: '所列的名字服务器中没有一台声称拥有权威。在解析器看来，这个域名根本就是不通的。',

  flag_no_ipv6_nameserver: '没有名字服务器可经 IPv6 访问',
  fd_no_ipv6_nameserver: '纯 IPv6 网络中的解析器只能经由转换器抵达该区域，如果抵达得了的话。给一台名字服务器加上 AAAA 记录通常是五分钟的事。',

  flag_nameservers_single_network: '所有名字服务器都在同一网络',
  fd_nameservers_single_network: '这些地址共用一个 /24，通常意味着同一个数据中心，往往还是同一个机柜。同处一地的两台服务器会一起倒下。',

  flag_serial_mismatch: '各服务器持有不同版本的区域',
  fd_serial_mismatch: 'SOA 序列号不一致，说明至少有一台从服务器已不再跟随主服务器：可能是失败的区域传送、过期的密钥，或是新加的防火墙规则。它依旧照常作答，只是记录是过时的，而任何地方都不会报错。',

  flag_soa_timer_out_of_range: '某个 SOA 计时器超出常见范围',
  fd_soa_timer_out_of_range: '该值超出了 RFC 1912 的建议范围。这本身并不是故障 —— 但这类数字通常继承自一份没人再回头看过的模板。',

  flag_soa_retry_above_refresh: 'Retry 不比 Refresh 短',
  fd_soa_retry_above_refresh: 'Retry 本应是刷新失败之后使用的较短间隔。当它反而更长时，一次失败的区域传送要等上整整一个刷新周期才会重试。',

  flag_soa_expire_too_short: 'Expire 相对其他计时器偏短',
  fd_soa_expire_too_short: '如果从服务器在这段时间内联系不上主服务器，它就会彻底停止作答。低于两次刷新尝试的时长时，一个出了状况的长周末就足以让区域彻底安静。',

  flag_soa_rname_has_at: '联系地址中含有 @',
  fd_soa_rname_has_at: 'RNAME 字段是一个把 @ 写成点号的邮件地址。真出现一个 @ 会让它无法解析，于是关于该区域的自动通知统统石沉大海。',

  flag_primary_not_in_ns_set: '主服务器不在已发布的名字服务器之列',
  fd_primary_not_in_ns_set: 'SOA 指定的主服务器不在 NS 集合中。隐藏主服务器正是这样运作的，所以这是一条说明而非故障。',

  flag_cname_at_apex: '区域顶点存在 CNAME',
  fd_cname_at_apex: 'RFC 1034 §3.6.2：带 CNAME 的名称不能再有其他记录。而顶点永远有 SOA 和 NS，因此两者不可能同时成立。有的解析器返回 CNAME 并丢掉其余，有的直接忽略它；最先坏掉的通常是邮件。',

  flag_cname_with_other_data: 'CNAME 与其他记录并存',
  fd_cname_with_other_data: '同一个名称既有 CNAME，又有至少一种其他类型的记录。解析器返回哪一个取决于先问了什么，而这不是你希望 DNS 具备的性质。',

  flag_no_address_at_apex: '区域顶点没有地址',
  fd_no_address_at_apex: '域名本身既没有 A 也没有 AAAA。对只用于收发邮件的域名而言是有意为之；对在浏览器里键入它的人来说则是意外。',

  flag_no_ipv6: '没有 AAAA 记录',
  fd_no_ipv6: '该域名只能通过 IPv4 解析。纯 IPv6 移动网络中的访客要经由运营商的转换器才能到达。',

  flag_ttl_very_short: '区域顶点的 TTL 非常短',
  fd_ttl_very_short: '不足一分钟。这是搬迁期间的设置，而且常常在搬迁之后被留在那里 —— 只要它还在，名字服务器的查询负载就会成倍增加。',

  flag_ttl_very_long: '区域顶点的 TTL 非常长',
  fd_ttl_very_long: '超过两天。任何地址变更都要花同样长的时间才能传到所有人那里，事故当中这是很被动的处境。',

  flag_wildcard_record: '该区域设有通配符',
  fd_wildcard_record: '一个必然不存在的名称居然也得到了应答，说明通配符在起作用。这值得知道，因为它意味着「记录存在」可能只是「通配符匹配上了」。',

  flag_txt_split_into_chunks: '某条 TXT 记录被拆成了多个字符串',
  fd_txt_split_into_chunks: '超过 255 字节的内容都是如此 —— 各段之间不加任何分隔直接拼接。这里之所以列出，是因为用空格把它们连起来的解析器会悄悄毁掉 SPF 和 DKIM 记录。',

  flag_ds_without_dnskey: '父区声称该区域已签名，实际并没有',
  fd_ds_without_dnskey: '父区有 DS 记录，区域里却没有 DNSKEY。任何做验证的解析器都会把这当成攻击并拒绝作答，因此对互联网上相当大的一部分而言，这个域名是不可达的。',

  flag_dnssec_not_enabled: '该区域未签名',
  fd_dnssec_not_enabled: '没有 DNSSEC。针对这个域名的应答与凭空捏造的应答无从区分 —— 而这正是 DNSSEC 存在的意义。',

  flag_no_key_signing_key: '没有单独的密钥签名密钥',
  fd_no_key_signing_key: '该区域用一把密钥完成签名，而没有拆分角色。这是允许的，也更简单 —— 但那样一来，每次换密钥都得同时更新注册商处的 DS。',

  flag_weak_key_algorithm: '签名算法已不再稳妥',
  fd_weak_key_algorithm: '该密钥使用的算法 —— RSA/SHA-1、DSA 或 MD5 —— 已不被认为安全。SHA-1 碰撞自 2017 年起已具备可行性，根区也不再为新的委派接受这些算法。',

  flag_rsa_key_too_short: 'RSA 签名密钥不足 2048 位',
  fd_rsa_key_too_short: '更短的长度低于当前建议，应当轮换。轮换是常规操作；放着不管才不是。',

  flag_key_revoked: '有密钥被标记为已吊销',
  fd_key_revoked: 'REVOKE 位已置上。这是有序密钥轮换（RFC 5011）的一部分，轮换完成后就该消失 —— 若它已经挂了好几个月，那就是没有完成。',

  flag_key_not_a_zone_key: '一把没有区域标志的 DNSKEY',
  fd_key_not_a_zone_key: '该密钥发布在 DNSKEY 集中，却没有标记为区域密钥，因此它无法验证区域内的任何东西。',

  flag_dnskey_not_signed: '密钥集没有签名',
  fd_dnskey_not_signed: '没有 RRSIG 覆盖的 DNSKEY 集不足以让任何东西信任。做验证的解析器会拒绝整个区域。',

  flag_dnskey_signature_invalid: '密钥集上的签名无法通过验证',
  fd_dnskey_signature_invalid: '覆盖 DNSKEY 集的 RRSIG 在这里没能通过验证。做验证的解析器会得出同样的结论，并停止为该域名作答。',

  flag_ds_weak_digest: 'DS 使用了较弱的摘要',
  fd_ds_weak_digest: '父区中的摘要是 SHA-1。请在旁边再发布一条 SHA-256 的 DS，随后撤下旧的那条。',

  flag_ds_points_at_missing_key: 'DS 指向了区域并未发布的密钥',
  fd_ds_points_at_missing_key: '父区为一个区域中并不存在的密钥标签作担保。忘记在注册商处更新的密钥轮换就是这个样子，它会彻底破坏验证。',

  flag_ds_digest_mismatch: 'DS 与区域密钥不符',
  fd_ds_digest_mismatch: '由已发布密钥重新算出的摘要与父区中的并不相同。自根而下的链条已经断开，做验证的解析器会拒绝这个域名。',

  flag_signed_but_no_ds: '已签名，却无处生根',
  fd_signed_but_no_ds: '区域已签名，而父区没有发布 DS，因此从根到这些签名之间没有路径，也就无从验证。通常是注册商那一步始终没有做完。',

  flag_zone_data_signature_invalid: '区域数据上的签名无法通过验证',
  fd_zone_data_signature_invalid: 'SOA 记录已签名，而签名与已发布的密钥对不上。做验证的解析器会拒绝这个域名。',

  flag_zone_data_not_signed: '区域数据没有签名',
  fd_zone_data_not_signed: '发布了密钥，记录本身却没有签名，因此这个区域只是名义上签了名。',

  flag_signatures_expiring_soon: '签名已接近有效期尾声',
  fd_signatures_expiring_soon: '有效期窗口所剩无几。如果负责重新签名的那套东西已经停了，窗口一关，这个域名就会在所有做验证的解析器眼中消失 —— 而且毫无预警。',

  flag_signatures_expiring: '签名已过窗口过半',
  fd_signatures_expiring: '对于定期重新签名的区域这很正常；之所以显示出来，是为了在事情变得紧急之前就能认出一个卡住的签名程序。',

  flag_signature_expired: '有签名已过期',
  fd_signature_expired: '有效期窗口已经关闭。做验证的解析器一律把该应答视作伪造，这个域名对它们而言就等于从互联网上消失了。',

  flag_nsec_probe_failed: '无法看到不存在性是如何证明的',
  fd_nsec_probe_failed: '针对一个刻意不存在的名称的查询没有返回，因此 NSEC 与 NSEC3 都无从查看。',

  flag_nsec3_iterations_above_zero: 'NSEC3 使用了额外的散列迭代',
  fd_nsec3_iterations_above_zero: 'RFC 9276 要求为零。额外的轮次本意是让枚举区域变得昂贵；这一点从未做到，而被切实拖慢的只有做验证的解析器。',

  flag_nsec3_salt_present: 'NSEC3 使用了盐值',
  fd_nsec3_salt_present: 'RFC 9276 要求空盐。它带不来保护 —— 盐值就公布在记录里 —— 却让每次更换盐值都变成一次整区重签。',

  flag_nsec3_opt_out: 'NSEC3 启用了 opt-out',
  fd_nsec3_opt_out: '区域内未签名的委派不会被证明为不存在。对极大的区域尚属合理，对多数区域则无必要。',

  flag_nsec_zone_walkable: '该区域可以被逐一枚举',
  fd_nsec_zone_walkable: 'NSEC 通过点出下一个存在的名称来证明某个名称不存在，因此整个区域可以一次一个查询地读出来。对许多人来说这是有意的选择，值得明白地说出来。',

  flag_caa_missing: '没有 CAA 记录',
  fd_caa_missing: '没有任何东西限制哪家证书颁发机构可以为这个域名签发证书。自 2017 年起，CA/浏览器论坛基本要求中的所有机构都必须遵守 CAA，所以这是一项免费却未被使用的限制。',

  flag_caa_forbids_issuance: 'CAA 禁止一切签发',
  fd_caa_forbids_issuance: '记录中是一个孤零零的分号：任何机构都不得为该名称签发证书。对永远不该有证书的域名来说是有意为之，对该有证书的域名来说则是代价高昂的笔误。',

  flag_caa_no_iodef: 'CAA 没有通报地址',
  fd_caa_no_iodef: '没有 iodef 属性，因你的 CAA 记录而拒绝签发的机构就无处告知你 —— 而那恰恰是你最想知道的时候。',

  flag_caa_no_issuewild: '没有针对通配符的单独规则',
  fd_caa_no_issuewild: '没有 issuewild 时，issue 集合同样管辖通配符证书。这往往正是本意；写出来是为了不必去猜。',

  flag_caa_unknown_tag: '一个无法识别的 CAA 属性',
  fd_caa_unknown_tag: '记录中含有标准集合之外的标签。证书颁发机构会忽略它。',

  flag_caa_unknown_critical_tag: '一个无法识别的 CAA 属性被标记为关键',
  fd_caa_unknown_critical_tag: '关键标志被置在了我们不认识的标签上。同样不认识它的机构必须完全拒绝签发，因此这可能在毫无明显缘由的情况下挡住证书。',

  flag_no_resolver_answered: '没有公共解析器作答',
  fd_no_resolver_answered: '六家公共解析器中没有一家为这个名称返回应答。要么是该区域不可达，要么是我们自己通往它们的出站路径不可达。',

  flag_resolvers_disagree: '各公共解析器给出的答案不同',
  fd_resolvers_disagree: '此刻有两家或更多解析器持有不同的记录。变更后的几小时内这很正常 —— 每个缓存都要熬完自己的 TTL —— 但若持续时间超过这里显示的最长 TTL，那就是问题。',

  flag_some_resolvers_silent: '部分公共解析器没有作答',
  fd_some_resolvers_silent: '至少有一家解析器未能及时应答。通常是它自身的负载或被过滤的链路；这里列出而非略过，是为了不从沉默中推断任何结论。',
};

OWN.ja = {
  title: 'DNS 検査 — 任意のドメインの委任・DNSSEC・伝播',
  title_short: 'DNS 検査',
  h1: 'DNS 検査',
  subtitle: 'ルートからたどる委任、全ネームサーバーの SOA シリアル比較、そして DNSSEC の連鎖を鵜呑みにせずここで検証します',
  ph_host: 'example.com',
  hero_label: '検査対象のドメイン',
  empty_hint: 'ドメイン名を入力してください。検査はルートサーバーから委任をたどり、権威ネームサーバーすべてに同じ問いを投げ、DNSSEC 署名を自分で検証します。数秒と五十回ほどの問い合わせで終わります。',

  stage_resolve: '委任をたどっています',
  stage_delegation: 'ネームサーバーを確認しています',
  stage_soa: 'SOA シリアルを比較しています',
  stage_records: 'レコードを読んでいます',
  stage_dnssec: 'DNSSEC の連鎖を検証しています',
  stage_caa: 'CAA を探しています',
  stage_propagation: '公開リゾルバーに問い合わせています',
  stage_grade: '評価しています',

  card_grade: '評価の内訳',
  card_delegation: '委任',
  card_nameservers: 'ネームサーバー',
  card_soa: 'ゾーン（SOA）',
  card_records: 'レコード',
  card_dnssec: 'DNSSEC',
  card_keys: '鍵と署名',
  card_caa: 'CAA',
  card_propagation: '公開リゾルバー',
  card_trace: 'ルートからの経路',

  comp_delegation: '委任の健全性',
  comp_dnssec: 'DNSSEC',
  comp_hygiene: 'ゾーンの衛生',

  k_zone: 'ゾーン',
  k_parent_ns: '親側のサーバー',
  k_zone_ns: 'ゾーン側のサーバー',
  k_ns_agreement: '両側が一致',
  k_only_at_parent: '親側のみ',
  k_only_at_zone: 'ゾーン側のみ',
  k_glue: 'グルーレコード',
  k_answering: '権威応答している',
  k_ipv6_ns: 'IPv6 で到達可能',
  k_primary: 'プライマリ（MNAME）',
  k_rname: '連絡先（RNAME）',
  k_serial: 'シリアル',
  k_serials_agree: 'シリアルが一致',
  k_refresh: 'Refresh',
  k_retry: 'Retry',
  k_expire: 'Expire',
  k_minimum: '否定応答の TTL',
  k_a: 'A',
  k_aaaa: 'AAAA',
  k_mx: 'MX',
  k_txt: 'TXT',
  k_ns: 'NS',
  k_srv: 'SRV',
  k_apex_ttl: '頂点の TTL',
  k_wildcard: 'ワイルドカード',
  k_enabled: '署名済み',
  k_ds_at_parent: '親側の DS',
  k_chain_ds: 'DS が鍵と一致',
  k_chain_key: '鍵セットが署名済み',
  k_chain_zone: 'ゾーンデータが署名済み',
  k_nsec_kind: '不存在の証明',
  k_nsec3_iterations: 'NSEC3 の反復回数',
  k_soonest_expiry: '直近の署名失効',
  k_caa_at: '公開元',
  k_caa_issue: '発行できる認証局',
  k_caa_issuewild: 'ワイルドカードを発行できる認証局',
  k_caa_iodef: '違反の通知先',
  k_resolvers_agree: 'リゾルバーが一致',
  k_longest_ttl: '残り TTL の最大値',
  k_validating: 'DNSSEC を検証した',
  k_queries: '発行した問い合わせ',

  th_nameserver: 'ネームサーバー',
  th_status: '状態',
  th_addresses: 'アドレス',
  th_serial: 'シリアル',
  th_response: '応答',
  th_resolver: 'リゾルバー',
  th_answer: '回答',
  th_ttl: '残り TTL',
  th_keytag: '鍵タグ',
  th_role: '役割',
  th_algorithm: 'アルゴリズム',
  th_bits: 'ビット',
  th_covers: '対象',
  th_valid: '有効',
  th_expires: '失効',
  th_type: '種別',
  th_value: '値',

  nss_authoritative: '権威あり',
  nss_lame: '権威なし',
  nss_silent: '応答なし',
  nss_unresolvable: '名前が解決しない',
  nsec_nsec: 'NSEC',
  nsec_nsec3: 'NSEC3',
  nsec_none: 'なし',
  v_seconds: '{n} 秒',
  v_days: '{n} 日',
  v_of_lifetime: '全 {total} 日のうち残り {days} 日',
  v_root: 'ルート',

  note_delegation: '親ゾーンとゾーン自身は、それぞれ独自の NS セットを公開します。一致を強制する仕組みはなく、食い違ったままでも、どこかのリゾルバーがもう一方をキャッシュするまではドメインは動き続けます。',
  note_soa: '権威サーバーは一台ずつ個別に尋ねます。シリアルが遅れているサーバーも応答は続けます — ただし古いほうのゾーンの写しで。',
  note_dnssec: '連鎖はここで検証します。親の DS のダイジェストはゾーンの鍵から計算し直し、各署名は鍵素材そのものと突き合わせます。どこかのリゾルバーに「満足したか」を尋ねたりはしません。',
  note_propagation: '伝播すべきグローバルな DNS の状態など存在しません。あるのはキャッシュだけで、それぞれが告げられた内容を自分の TTL が尽きるまで抱えます。残り TTL こそ、その各々があとどれだけ同じことを言い続けるかの答えです。',
  note_trace: '各段は委譲です。左のサーバーにドメインを尋ね、右のサーバー群という答えが返ってきました。',

  err_zone_not_found: 'その名前に対応するゾーンは見つかりませんでした。',
  err_dns_timeout: 'ネームサーバーが時間内に応答しませんでした。',
  err_dns_network: 'ネームサーバーに到達できませんでした。',
  err_dns_unreachable: 'どのネームサーバーも応答しませんでした。',

  inc_zone_not_found: '名前が委任されておらず、調べる対象がありませんでした',
  inc_delegation_walk_incomplete: 'ルートからのたどりが最後まで届きませんでした',
  inc_no_authoritative_server_answered: '権威ネームサーバーが一つも応答しませんでした',
  inc_ds_lookup_failed: '親側の DS レコードを読めませんでした',
  inc_dnskey_lookup_failed: 'DNSKEY セットを読めませんでした',
  inc_dnskey_rrsig_missing: 'DNSKEY セットを覆う署名が返りませんでした',
  inc_soa_rrsig_unavailable: 'ゾーンデータを覆う署名が返りませんでした',

  cap_domain_does_not_exist: 'ドメインが存在しない',
  cap_no_delegation: '名前が委任されていない',
  cap_no_authoritative_nameserver: '権威応答するサーバーがない',
  cap_dnssec_chain_broken: 'DNSSEC の連鎖が切れている',
  cap_signature_expired: '署名が失効している',
  cap_cname_at_apex: '頂点に CNAME がある',
  cap_lame_delegation: '権威のない委任',
  cap_nameserver_not_answering: '記載されたネームサーバーが応答しない',
  cap_ns_set_mismatch: '委任の両側が食い違っている',
  cap_serial_mismatch: 'サーバーごとにゾーンの版が違う',
  cap_missing_glue: 'ゾーン内のサーバーにグルーがない',
  cap_single_nameserver: 'ネームサーバーが一台だけ',
  cap_cname_with_other_data: '他のレコードと並ぶ CNAME',
  cap_signed_but_no_ds: '署名済みだが親に DS がない',
  cap_weak_dnssec_algorithm: 'もはや堅牢でない署名アルゴリズム',
  cap_weak_dnssec_key: '短すぎる署名鍵',
  cap_scan_incomplete: '検査が不完全なため、評価は付けていません',

  flag_delegation_walk_failed: 'ルートからのたどりが最後まで届きませんでした',
  fd_delegation_walk_failed: 'ルートからの経路上のサーバーが応答せず、委任の一部を確認できませんでした。これは相手の到達性であると同時に、こちらの到達性の話でもあります。',

  flag_nxdomain: 'ドメインが存在しません',
  fd_nxdomain: '親ゾーンが NXDOMAIN を返しました。この名前への委任はありません。登録されたことがないか、登録が失効したかのどちらかです。',

  flag_no_delegation: '名前が委任されていません',
  fd_no_delegation: 'この名前に対応するゾーンが見つかりません。親ゾーン内のレコードとしては存在しうるものの、独自のネームサーバーを持つゾーンではありません。',

  flag_referral_off_path: '委譲が名前から外れた先を指しました',
  fd_referral_off_path: 'あるサーバーが、尋ねた名前の祖先ではないゾーンへ委譲してきました。設定の誤りであり、これに従うのは別の場所へ連れて行かれる道です。',

  flag_nameserver_unresolvable: 'ネームサーバーの名前が解決しません',
  fd_nameserver_unresolvable: '委任が、自分自身の名前にアドレスレコードを持たないサーバーを挙げています。それを選んだリゾルバーは一回の問い合わせを無駄にし、別のサーバーを試し直すことになります。',

  flag_ns_set_mismatch: '親とゾーンが別々のネームサーバーを挙げています',
  fd_ns_set_mismatch: '親側の委任とゾーン内の NS レコードが一致しません。実際には両方が使われるため、リゾルバーがどちらをキャッシュしたかでドメインの挙動が変わります — 出たり出なかったりする障害の古典的な原因です。',

  flag_single_nameserver: 'ネームサーバーが一台だけ',
  fd_single_nameserver: 'RFC 1034 は、別々のネットワークに最低二台を求めています。一台だけなら、その機械の停止がそのままドメイン全体の停止であり、メールも巻き添えです。',

  flag_nameserver_silent: 'ネームサーバーが応答しません',
  fd_nameserver_silent: '委任に名前が挙がっているサーバーが応答しませんでした。リゾルバーはそれを試し続け、タイムアウトを待ってから次へ移ります。外から見ると、ときどき遅いドメインという姿になります。',

  flag_lame_delegation: 'ネームサーバーがゾーンの権威を持っていません',
  fd_lame_delegation: 'サーバーは応答しますが、権威フラグがありません。このゾーン用に設定されていないのです。これが権威のない委任で、そのサーバーに当たったリゾルバーは別のところで一からやり直すことになります。',

  flag_ns_points_at_cname: 'ネームサーバーの名前が別名です',
  fd_ns_points_at_cname: 'RFC 2181 §10.3 は、NS レコードが CNAME ではなくアドレスレコードを持つホストを指すことを求めています。切り抜けるリゾルバーもあれば、そのまま失敗するものもあります。',

  flag_missing_glue: 'ゾーン内のサーバーにグルーレコードがありません',
  fd_missing_glue: 'そのネームサーバーは自分が担当するゾーンの中にあるため、アドレスを解決するにはゾーンに尋ねる必要があり、そのためにはアドレスが要ります。この循環を断つために、親がグルーを公開しなければなりません。',

  flag_no_authoritative_nameserver: 'このゾーンに応答するものがありません',
  fd_no_authoritative_nameserver: '挙げられたネームサーバーのどれ一つとして権威を主張しませんでした。リゾルバーから見れば、このドメインはまったく機能していません。',

  flag_no_ipv6_nameserver: 'IPv6 で到達できるネームサーバーがありません',
  fd_no_ipv6_nameserver: 'IPv6 のみのネットワークにいるリゾルバーは、翻訳装置経由でしかゾーンに届きません（届けばの話です）。ネームサーバー一台に AAAA を足すのは、たいてい五分の仕事です。',

  flag_nameservers_single_network: 'ネームサーバーがすべて同じネットワークにあります',
  fd_nameservers_single_network: 'アドレスが同じ /24 を共有しています。これはたいてい同じデータセンター、しばしば同じラックを意味します。同じ場所にある二台は一緒に落ちます。',

  flag_serial_mismatch: 'サーバーごとにゾーンの版が違います',
  fd_serial_mismatch: 'SOA シリアルが食い違っており、少なくとも一台のセカンダリがプライマリに追従しなくなっています。転送の失敗、失効した鍵、追加されたファイアウォール規則など。それでも古いレコードで応答し続け、どこにもエラーは出ません。',

  flag_soa_timer_out_of_range: 'SOA のタイマーが通常の範囲外です',
  fd_soa_timer_out_of_range: '値が RFC 1912 の推奨範囲から外れています。それ自体が障害というわけではありませんが、こうした数字はたいてい、誰も見直していないテンプレートからの引き継ぎです。',

  flag_soa_retry_above_refresh: 'Retry が Refresh より短くありません',
  fd_soa_retry_above_refresh: 'Retry は更新失敗後に使う短いほうの間隔のはずです。それが長いほうになっていると、失敗した転送は再試行までに更新周期をまるごと待つことになります。',

  flag_soa_expire_too_short: '他のタイマーに比べて Expire が短すぎます',
  fd_soa_expire_too_short: 'セカンダリがこの時間だけプライマリに届かなければ、応答を完全にやめます。更新の二回分を下回っていると、不調の続いた長い週末だけでゾーンが黙ってしまいます。',

  flag_soa_rname_has_at: '連絡先アドレスに @ が入っています',
  fd_soa_rname_has_at: 'RNAME 欄は @ をドットで書くメールアドレスです。本物の @ が入ると解釈できなくなり、ゾーンに関する自動通知はどこにも届かなくなります。',

  flag_primary_not_in_ns_set: 'プライマリが公開されたネームサーバーに含まれていません',
  fd_primary_not_in_ns_set: 'SOA が NS セットにないプライマリを指しています。隠しプライマリはまさにこう運用されるので、これは障害ではなく注記です。',

  flag_cname_at_apex: 'ゾーンの頂点に CNAME があります',
  fd_cname_at_apex: 'RFC 1034 §3.6.2：CNAME を持つ名前は他のレコードを持てません。頂点には必ず SOA と NS があるため、両立しえません。CNAME を返して残りを捨てるリゾルバーもあれば、無視するものもあります。最初に壊れるのはたいていメールです。',

  flag_cname_with_other_data: '他のレコードと並ぶ CNAME',
  fd_cname_with_other_data: '同じ名前に CNAME と、少なくとも一つ別の種別のレコードがあります。リゾルバーがどちらを返すかは何を先に尋ねたかで決まり、それは DNS に望む性質ではありません。',

  flag_no_address_at_apex: '頂点にアドレスがありません',
  fd_no_address_at_apex: 'ドメイン自体に A も AAAA もありません。メール専用のドメインなら意図的ですが、ブラウザーに打ち込む人には意外です。',

  flag_no_ipv6: 'AAAA レコードがありません',
  fd_no_ipv6: 'このドメインは IPv4 でしか解決しません。IPv6 のみのモバイル網にいる訪問者は、通信事業者の翻訳装置経由で到達します。',

  flag_ttl_very_short: '頂点の TTL が非常に短い',
  fd_ttl_very_short: '一分未満。移行中の設定であり、移行後もそのまま残されがちです — 残っているあいだ、ネームサーバーへの問い合わせ負荷を何倍にもします。',

  flag_ttl_very_long: '頂点の TTL が非常に長い',
  fd_ttl_very_long: '二日超。アドレスを変えても全員に行き渡るまで同じだけかかるということで、障害対応中には不利な立場です。',

  flag_wildcard_record: 'ゾーンにワイルドカードがあります',
  fd_wildcard_record: '確実に存在しない名前にも応答が返りました。ワイルドカードが効いています。知っておく価値があります。「レコードがある」が「ワイルドカードに当たった」だけの意味かもしれないからです。',

  flag_txt_split_into_chunks: 'TXT レコードが複数の文字列に分かれています',
  fd_txt_split_into_chunks: '255 バイトを超えるものでは普通のことで、断片は何も挟まずに連結されます。ここに挙げるのは、それらを空白でつなぐ実装が SPF や DKIM のレコードを黙って壊すからです。',

  flag_ds_without_dnskey: '親は署名済みだと言い、ゾーンは署名されていません',
  fd_ds_without_dnskey: '親に DS レコードがあるのに、ゾーンに DNSKEY がありません。検証するリゾルバーはこれを攻撃とみなして応答を拒むため、インターネットのかなりの部分からこのドメインは届かなくなります。',

  flag_dnssec_not_enabled: 'ゾーンが署名されていません',
  fd_dnssec_not_enabled: 'DNSSEC がありません。このドメインへの応答は、誰かがでっち上げた応答と区別できません — まさにそれを防ぐために DNSSEC はあります。',

  flag_no_key_signing_key: '鍵署名鍵が分けられていません',
  fd_no_key_signing_key: 'ゾーンは役割を分けず一つの鍵で署名しています。合法で、より単純でもあります — ただしその場合、鍵を替えるたびに登録事業者側の DS を更新する必要があります。',

  flag_weak_key_algorithm: 'もはや堅牢でない署名アルゴリズム',
  fd_weak_key_algorithm: '鍵が RSA/SHA-1、DSA、MD5 のいずれか、安全とはみなされないアルゴリズムを使っています。SHA-1 の衝突は 2017 年以降現実的であり、ルートゾーンも新規の委任にはこれらを受け付けません。',

  flag_rsa_key_too_short: '2048 ビット未満の RSA 署名鍵',
  fd_rsa_key_too_short: 'それより短いものは現在の推奨を下回っており、更新すべきです。更新は日常の作業ですが、放置はそうではありません。',

  flag_key_revoked: '失効と印の付いた鍵があります',
  fd_key_revoked: 'REVOKE ビットが立っています。これは秩序ある鍵更新（RFC 5011）の一部で、更新が終われば消えるはずのものです — 何か月も出続けているなら、終わっていません。',

  flag_key_not_a_zone_key: 'ゾーンフラグのない DNSKEY',
  fd_key_not_a_zone_key: '鍵は DNSKEY セットに公開されていますが、ゾーン鍵として印が付いていないため、ゾーン内の何も検証できません。',

  flag_dnskey_not_signed: '鍵セットに署名がありません',
  fd_dnskey_not_signed: 'それを覆う RRSIG のない DNSKEY セットは、何からも信用されません。検証するリゾルバーはゾーンごと拒否します。',

  flag_dnskey_signature_invalid: '鍵セットの署名が検証できません',
  fd_dnskey_signature_invalid: 'DNSKEY セットを覆う RRSIG が、ここでの検証に通りませんでした。検証するリゾルバーも同じ結論に達し、このドメインへの応答をやめます。',

  flag_ds_weak_digest: 'DS が弱いダイジェストを使っています',
  fd_ds_weak_digest: '親側のダイジェストが SHA-1 です。隣に SHA-256 の DS を公開し、そのあとで古いほうを取り下げてください。',

  flag_ds_points_at_missing_key: 'DS がゾーンにない鍵を指しています',
  fd_ds_points_at_missing_key: '親が、ゾーンに存在しない鍵タグを保証しています。登録事業者側の更新を忘れた鍵更新はこう見えます。検証は完全に壊れます。',

  flag_ds_digest_mismatch: 'DS がゾーンの鍵と一致しません',
  fd_ds_digest_mismatch: '公開されている鍵から計算し直したダイジェストが、親側のものと一致しません。ルートからの連鎖は切れており、検証するリゾルバーはこのドメインを拒否します。',

  flag_signed_but_no_ds: '署名済みですが、何にも繋ぎ止められていません',
  fd_signed_but_no_ds: 'ゾーンは署名されており、親は DS を公開していません。つまりルートからこれらの署名へ至る道がなく、検証する手立てもありません。たいていは登録事業者側の手順が最後まで済んでいない状態です。',

  flag_zone_data_signature_invalid: 'ゾーンデータの署名が検証できません',
  fd_zone_data_signature_invalid: 'SOA レコードは署名されていますが、公開されている鍵と符合しません。検証するリゾルバーはこのドメインを拒否します。',

  flag_zone_data_not_signed: 'ゾーンデータに署名がありません',
  fd_zone_data_not_signed: '鍵は公開されているのに、レコード自体が署名されていません。名ばかりの署名ゾーンです。',

  flag_signatures_expiring_soon: '署名が寿命の終わりに近づいています',
  fd_signatures_expiring_soon: '有効期間の窓がほとんど残っていません。ゾーンを再署名する仕組みが止まっていれば、窓が閉じた瞬間、このドメインは検証するすべてのリゾルバーから消えます — しかも何の予告もなく。',

  flag_signatures_expiring: '署名が窓の半ばを過ぎました',
  fd_signatures_expiring: '定期的に再署名しているゾーンでは普通のことです。止まった署名処理を、緊急になる前に気づけるように表示しています。',

  flag_signature_expired: '署名が失効しています',
  fd_signature_expired: '有効期間の窓が閉じました。検証するリゾルバーは応答を偽造とみなすため、それらにとってこのドメインはインターネットから消えます。',

  flag_nsec_probe_failed: '不存在の証明のしかたを確認できませんでした',
  fd_nsec_probe_failed: '意図的に存在しない名前への問い合わせが返らなかったため、NSEC と NSEC3 を確認できませんでした。',

  flag_nsec3_iterations_above_zero: 'NSEC3 が追加のハッシュ反復を使っています',
  fd_nsec3_iterations_above_zero: 'RFC 9276 はゼロを求めています。追加の周回はゾーン列挙を高くつかせるためのものでしたが、それは実現せず、確実に遅くなるのは検証するリゾルバーだけです。',

  flag_nsec3_salt_present: 'NSEC3 がソルトを使っています',
  fd_nsec3_salt_present: 'RFC 9276 は空のソルトを求めています。保護にはなりません — ソルトはレコードそのものに公開されています — うえに、変更のたびにゾーン全体の再署名が必要になります。',

  flag_nsec3_opt_out: 'NSEC3 が opt-out を使っています',
  fd_nsec3_opt_out: 'ゾーン内の未署名の委任については、不在が証明されません。非常に大きなゾーンでは理にかないますが、大半には不要です。',

  flag_nsec_zone_walkable: 'ゾーンを列挙できます',
  fd_nsec_zone_walkable: 'NSEC は、存在する次の名前を挙げることで不在を証明します。したがってゾーン全体を一問い合わせずつ読み出せます。多くの場合これは意図した選択であり、はっきり述べる価値があります。',

  flag_caa_missing: 'CAA レコードがありません',
  fd_caa_missing: 'このドメインにどの認証局が証明書を発行できるかを、何も制限していません。CA/Browser Forum の基本要件にあるすべての認証局は 2017 年から CAA を尊重する義務があり、つまり無料の制限が使われていないということです。',

  flag_caa_forbids_issuance: 'CAA が発行を全面的に禁じています',
  fd_caa_forbids_issuance: 'レコードがセミコロン一つです。どの認証局もこの名前に発行できません。証明書を持つべきでないドメインなら意図的、持つべきドメインなら高くつく打ち間違いです。',

  flag_caa_no_iodef: 'CAA に通知先がありません',
  fd_caa_no_iodef: 'iodef プロパティがないと、あなたの CAA レコードを理由に申請を断った認証局は、それを伝える先がありません — まさに知りたい場面で、です。',

  flag_caa_no_issuewild: 'ワイルドカード用の別ルールがありません',
  fd_caa_no_issuewild: 'issuewild がなければ、issue の集合がワイルドカード証明書も支配します。多くの場合それが意図どおりです。前提にせずに済むよう明示しています。',

  flag_caa_unknown_tag: '認識できない CAA プロパティ',
  fd_caa_unknown_tag: 'レコードに標準の集合外のタグが含まれています。認証局はそれを無視します。',

  flag_caa_unknown_critical_tag: '認識できない CAA プロパティが critical と印されています',
  fd_caa_unknown_critical_tag: '我々が知らないタグに critical フラグが立っています。同じくそれを知らない認証局は発行を全面的に拒む義務があるため、目に見える理由もなく証明書が止まりうるということです。',

  flag_no_resolver_answered: 'どの公開リゾルバーも応答しませんでした',
  fd_no_resolver_answered: '六つの公開リゾルバーのいずれも、この名前について回答を返しませんでした。ゾーンが到達不能なのか、こちらから彼らへの出口経路が到達不能なのか、どちらかです。',

  flag_resolvers_disagree: '公開リゾルバーごとに答えが違います',
  fd_resolvers_disagree: '現在、二つ以上のリゾルバーが別々のレコードを抱えています。変更後の数時間は普通のことで — キャッシュはそれぞれ自分の TTL を待ちます — ここに表示された最長の TTL を超えて続くようなら問題です。',

  flag_some_resolvers_silent: '一部の公開リゾルバーが応答しませんでした',
  fd_some_resolvers_silent: '少なくとも一つのリゾルバーが時間内に応答しませんでした。たいていは向こう側の負荷か、遮られた経路です。沈黙から何かを推し量らずに済むよう、無視せず記載しています。',
};

OWN.hi = {
  title: 'DNS जाँच — किसी भी डोमेन का प्रत्यायोजन, DNSSEC और प्रसार',
  title_short: 'DNS जाँच',
  h1: 'DNS जाँच',
  subtitle: 'जड़ से नीचे तक चला गया प्रत्यायोजन, हर नेमसर्वर पर SOA क्रमांकों की तुलना, और DNSSEC शृंखला जो यहीं जाँची जाती है, मान नहीं ली जाती',
  ph_host: 'example.com',
  hero_label: 'जाँचा जा रहा डोमेन',
  empty_hint: 'एक डोमेन नाम डालें। जाँच रूट सर्वरों से नीचे तक प्रत्यायोजन का पीछा करती है, हर आधिकारिक नेमसर्वर से वही प्रश्न पूछती है, और DNSSEC हस्ताक्षर स्वयं सत्यापित करती है। इसमें कुछ सेकंड और लगभग पचास प्रश्न लगते हैं।',

  stage_resolve: 'प्रत्यायोजन का पीछा',
  stage_delegation: 'नेमसर्वरों की जाँच',
  stage_soa: 'SOA क्रमांकों की तुलना',
  stage_records: 'अभिलेख पढ़े जा रहे हैं',
  stage_dnssec: 'DNSSEC शृंखला का सत्यापन',
  stage_caa: 'CAA की खोज',
  stage_propagation: 'सार्वजनिक रिज़ॉल्वरों से पूछताछ',
  stage_grade: 'श्रेणी निर्धारण',

  card_grade: 'श्रेणी का विवरण',
  card_delegation: 'प्रत्यायोजन',
  card_nameservers: 'नेमसर्वर',
  card_soa: 'ज़ोन (SOA)',
  card_records: 'अभिलेख',
  card_dnssec: 'DNSSEC',
  card_keys: 'कुंजियाँ और हस्ताक्षर',
  card_caa: 'CAA',
  card_propagation: 'सार्वजनिक रिज़ॉल्वर',
  card_trace: 'जड़ से आया रास्ता',

  comp_delegation: 'प्रत्यायोजन की सेहत',
  comp_dnssec: 'DNSSEC',
  comp_hygiene: 'ज़ोन की स्वच्छता',

  k_zone: 'ज़ोन',
  k_parent_ns: 'जनक में दर्ज सर्वर',
  k_zone_ns: 'ज़ोन के अपने सर्वर',
  k_ns_agreement: 'दोनों पक्ष मेल खाते हैं',
  k_only_at_parent: 'केवल जनक में',
  k_only_at_zone: 'केवल ज़ोन में',
  k_glue: 'ग्लू अभिलेख',
  k_answering: 'आधिकारिक रूप से उत्तर देते हैं',
  k_ipv6_ns: 'IPv6 से पहुँच योग्य',
  k_primary: 'प्राथमिक (MNAME)',
  k_rname: 'सम्पर्क (RNAME)',
  k_serial: 'क्रमांक',
  k_serials_agree: 'क्रमांक मेल खाते हैं',
  k_refresh: 'Refresh',
  k_retry: 'Retry',
  k_expire: 'Expire',
  k_minimum: 'नकारात्मक TTL',
  k_a: 'A',
  k_aaaa: 'AAAA',
  k_mx: 'MX',
  k_txt: 'TXT',
  k_ns: 'NS',
  k_srv: 'SRV',
  k_apex_ttl: 'शीर्ष का TTL',
  k_wildcard: 'वाइल्डकार्ड',
  k_enabled: 'हस्ताक्षरित',
  k_ds_at_parent: 'जनक में DS',
  k_chain_ds: 'DS कुंजी से मेल खाता है',
  k_chain_key: 'कुंजी-समूह हस्ताक्षरित है',
  k_chain_zone: 'ज़ोन का डेटा हस्ताक्षरित है',
  k_nsec_kind: 'अनुपस्थिति का प्रमाण',
  k_nsec3_iterations: 'NSEC3 पुनरावृत्तियाँ',
  k_soonest_expiry: 'अगली हस्ताक्षर समाप्ति',
  k_caa_at: 'प्रकाशित',
  k_caa_issue: 'जारी कर सकते हैं',
  k_caa_issuewild: 'वाइल्डकार्ड जारी कर सकते हैं',
  k_caa_iodef: 'उल्लंघन की सूचना यहाँ',
  k_resolvers_agree: 'रिज़ॉल्वर सहमत हैं',
  k_longest_ttl: 'सबसे लंबा शेष TTL',
  k_validating: 'DNSSEC सत्यापित किया',
  k_queries: 'किए गए प्रश्न',

  th_nameserver: 'नेमसर्वर',
  th_status: 'स्थिति',
  th_addresses: 'पते',
  th_serial: 'क्रमांक',
  th_response: 'उत्तर',
  th_resolver: 'रिज़ॉल्वर',
  th_answer: 'उत्तर',
  th_ttl: 'शेष TTL',
  th_keytag: 'कुंजी टैग',
  th_role: 'भूमिका',
  th_algorithm: 'एल्गोरिद्म',
  th_bits: 'बिट',
  th_covers: 'दायरा',
  th_valid: 'वैध',
  th_expires: 'समाप्ति',
  th_type: 'प्रकार',
  th_value: 'मान',

  nss_authoritative: 'आधिकारिक',
  nss_lame: 'अनाधिकारिक',
  nss_silent: 'कोई उत्तर नहीं',
  nss_unresolvable: 'हल नहीं होता',
  nsec_nsec: 'NSEC',
  nsec_nsec3: 'NSEC3',
  nsec_none: 'कोई नहीं',
  v_seconds: '{n} से',
  v_days: '{n} दिन',
  v_of_lifetime: '{total} में से {days} दिन शेष',
  v_root: 'जड़',

  note_delegation: 'जनक ज़ोन और स्वयं ज़ोन, दोनों अपना-अपना NS समूह प्रकाशित करते हैं। इन्हें मेल खाने के लिए कोई बाध्य नहीं करता, और जब ये अलग हो जाते हैं तो डोमेन तब तक चलता रहता है जब तक कोई रिज़ॉल्वर दूसरा समूह कैश न कर ले।',
  note_soa: 'हर आधिकारिक सर्वर से अलग-अलग पूछा जाता है। जिस सर्वर का क्रमांक पीछे रह गया है वह उत्तर देता रहता है — पर ज़ोन की पुरानी प्रति के साथ।',
  note_dnssec: 'शृंखला यहीं जाँची जाती है: जनक के DS का सारांश ज़ोन की कुंजी से दोबारा निकाला जाता है, और हर हस्ताक्षर कुंजी-सामग्री से मिलाया जाता है। किसी रिज़ॉल्वर से यह नहीं पूछा जाता कि वह संतुष्ट था या नहीं।',
  note_propagation: 'फैलने के लिए कोई वैश्विक DNS स्थिति है ही नहीं — केवल कैश हैं, हर एक अपने TTL के समाप्त होने तक वही सँभाले रहता है जो उसे बताया गया था। शेष TTL ही बताता है कि हर कैश और कितनी देर वही कहता रहेगा।',
  note_trace: 'हर चरण एक अग्रेषण है: बाईं ओर के सर्वर से डोमेन के बारे में पूछा गया और उसने दाईं ओर के सर्वर बताए।',

  err_zone_not_found: 'उस नाम के लिए कोई ज़ोन नहीं मिला।',
  err_dns_timeout: 'किसी नेमसर्वर ने समय पर उत्तर नहीं दिया।',
  err_dns_network: 'किसी नेमसर्वर तक पहुँचा नहीं जा सका।',
  err_dns_unreachable: 'किसी भी नेमसर्वर ने उत्तर नहीं दिया।',

  inc_zone_not_found: 'नाम प्रत्यायोजित नहीं है, इसलिए जाँचने को कुछ था ही नहीं',
  inc_delegation_walk_incomplete: 'जड़ से शुरू हुई यात्रा पूरी नहीं हुई',
  inc_no_authoritative_server_answered: 'किसी आधिकारिक नेमसर्वर ने उत्तर नहीं दिया',
  inc_ds_lookup_failed: 'जनक का DS अभिलेख पढ़ा नहीं जा सका',
  inc_dnskey_lookup_failed: 'DNSKEY समूह पढ़ा नहीं जा सका',
  inc_dnskey_rrsig_missing: 'DNSKEY समूह पर कोई हस्ताक्षर नहीं लौटा',
  inc_soa_rrsig_unavailable: 'ज़ोन के डेटा पर कोई हस्ताक्षर नहीं लौटा',

  cap_domain_does_not_exist: 'डोमेन मौजूद नहीं है',
  cap_no_delegation: 'नाम प्रत्यायोजित नहीं है',
  cap_no_authoritative_nameserver: 'कोई सर्वर आधिकारिक रूप से उत्तर नहीं देता',
  cap_dnssec_chain_broken: 'DNSSEC शृंखला टूटी हुई है',
  cap_signature_expired: 'एक हस्ताक्षर समाप्त हो चुका है',
  cap_cname_at_apex: 'शीर्ष पर CNAME',
  cap_lame_delegation: 'अनाधिकारिक प्रत्यायोजन',
  cap_nameserver_not_answering: 'सूचीबद्ध नेमसर्वर उत्तर नहीं देता',
  cap_ns_set_mismatch: 'प्रत्यायोजन के दोनों पक्ष अलग-अलग कहते हैं',
  cap_serial_mismatch: 'सर्वरों के पास ज़ोन के भिन्न संस्करण हैं',
  cap_missing_glue: 'ज़ोन के भीतर के सर्वर का ग्लू नहीं है',
  cap_single_nameserver: 'केवल एक नेमसर्वर',
  cap_cname_with_other_data: 'अन्य अभिलेखों के साथ CNAME',
  cap_signed_but_no_ds: 'हस्ताक्षरित, पर जनक में DS नहीं',
  cap_weak_dnssec_algorithm: 'हस्ताक्षर एल्गोरिद्म अब भरोसेमंद नहीं',
  cap_weak_dnssec_key: 'बहुत छोटी हस्ताक्षर कुंजी',
  cap_scan_incomplete: 'जाँच अधूरी रही, इसलिए कोई श्रेणी नहीं दी गई',

  flag_delegation_walk_failed: 'जड़ से शुरू हुई यात्रा पूरी नहीं हुई',
  fd_delegation_walk_failed: 'जड़ से आते रास्ते का एक सर्वर उत्तर नहीं लाया, इसलिए प्रत्यायोजन का एक हिस्सा देखा नहीं जा सका। यह जितना उनकी पहुँच के बारे में है उतना ही हमारी पहुँच के बारे में भी।',

  flag_nxdomain: 'डोमेन मौजूद नहीं है',
  fd_nxdomain: 'जनक ज़ोन ने NXDOMAIN लौटाया: इस नाम के लिए कोई प्रत्यायोजन नहीं है। या तो यह कभी पंजीकृत ही नहीं हुआ, या पंजीकरण समाप्त हो चुका है।',

  flag_no_delegation: 'नाम प्रत्यायोजित नहीं है',
  fd_no_delegation: 'इस नाम के लिए कोई ज़ोन नहीं मिला। यह किसी जनक ज़ोन के भीतर एक अभिलेख के रूप में हो सकता है, पर अपने नेमसर्वरों वाला स्वतंत्र ज़ोन नहीं है।',

  flag_referral_off_path: 'एक अग्रेषण नाम से हटकर ले गया',
  fd_referral_off_path: 'एक सर्वर ने हमें ऐसे ज़ोन की ओर भेजा जो पूछे गए नाम का पूर्वज नहीं है। यह विन्यास की गलती है, और ऐसे अग्रेषण के पीछे जाना कहीं और पहुँच जाने का तरीका है।',

  flag_nameserver_unresolvable: 'एक नेमसर्वर का नाम हल नहीं होता',
  fd_nameserver_unresolvable: 'प्रत्यायोजन में ऐसा सर्वर दर्ज है जिसके अपने नाम के पते वाले अभिलेख नहीं हैं। जो रिज़ॉल्वर उसे चुनता है वह एक प्रश्न व्यर्थ करता है और फिर दूसरा आज़माने को बाध्य होता है।',

  flag_ns_set_mismatch: 'जनक और ज़ोन अलग-अलग नेमसर्वर बताते हैं',
  fd_ns_set_mismatch: 'जनक का प्रत्यायोजन और ज़ोन के NS अभिलेख मेल नहीं खाते। व्यवहार में दोनों समूह काम में आते हैं, इसलिए डोमेन इस बात पर अलग-अलग बर्ताव करता है कि रिज़ॉल्वर ने कौन-सा कैश किया — रुक-रुक कर आने वाली खराबी का यही चिरपरिचित कारण है।',

  flag_single_nameserver: 'केवल एक नेमसर्वर',
  fd_single_nameserver: 'RFC 1034 अलग-अलग नेटवर्क में कम से कम दो माँगता है। एक ही होने पर उस मशीन की कोई भी बंदी पूरे डोमेन की बंदी है, ईमेल सहित।',

  flag_nameserver_silent: 'एक नेमसर्वर उत्तर नहीं देता',
  fd_nameserver_silent: 'प्रत्यायोजन में नामित एक सर्वर ने उत्तर नहीं दिया। रिज़ॉल्वर उसे आज़माते रहेंगे और अगले पर जाने से पहले समय-सीमा की प्रतीक्षा करेंगे, जो बाहर से रुक-रुक कर धीमे डोमेन जैसा दिखता है।',

  flag_lame_delegation: 'एक नेमसर्वर ज़ोन के लिए आधिकारिक नहीं है',
  fd_lame_delegation: 'सर्वर उत्तर देता है, पर आधिकारिकता के चिह्न के बिना: इस ज़ोन के लिए उसे विन्यस्त ही नहीं किया गया। यही अनाधिकारिक प्रत्यायोजन है, और जो रिज़ॉल्वर उस सर्वर पर पहुँचता है उसे कहीं और से नए सिरे से शुरू करना पड़ता है।',

  flag_ns_points_at_cname: 'एक नेमसर्वर का नाम उपनाम है',
  fd_ns_points_at_cname: 'RFC 2181 §10.3 माँगता है कि NS अभिलेख पते वाले होस्ट का नाम ले, CNAME का नहीं। कुछ रिज़ॉल्वर निभा ले जाते हैं; कुछ सीधे विफल हो जाते हैं।',

  flag_missing_glue: 'ज़ोन के भीतर के सर्वर का ग्लू अभिलेख नहीं है',
  fd_missing_glue: 'नेमसर्वर उसी ज़ोन के भीतर है जिसकी वह सेवा करता है, इसलिए उसका पता हल करने के लिए ज़ोन से पूछना पड़ेगा — और उसके लिए वही पता चाहिए। इस घेरे को तोड़ने के लिए जनक को ग्लू प्रकाशित करना होगा।',

  flag_no_authoritative_nameserver: 'इस ज़ोन के लिए कोई उत्तर नहीं देता',
  fd_no_authoritative_nameserver: 'सूचीबद्ध नेमसर्वरों में से किसी ने भी आधिकारिकता का दावा नहीं किया। रिज़ॉल्वर की दृष्टि से यह डोमेन बस काम ही नहीं करता।',

  flag_no_ipv6_nameserver: 'कोई नेमसर्वर IPv6 से पहुँच योग्य नहीं',
  fd_no_ipv6_nameserver: 'केवल-IPv6 नेटवर्क के रिज़ॉल्वर ज़ोन तक अनुवादक के रास्ते पहुँचते हैं, अगर पहुँचते हैं तो। किसी एक नेमसर्वर को AAAA देना आमतौर पर पाँच मिनट का काम है।',

  flag_nameservers_single_network: 'सभी नेमसर्वर एक ही नेटवर्क में हैं',
  fd_nameservers_single_network: 'पते एक ही /24 में हैं, जिसका अर्थ प्रायः एक ही डेटा सेंटर और अक्सर एक ही रैक होता है। एक ही जगह के दो सर्वर साथ ही गिरते हैं।',

  flag_serial_mismatch: 'सर्वरों के पास ज़ोन के भिन्न संस्करण हैं',
  fd_serial_mismatch: 'SOA क्रमांक अलग-अलग हैं, यानी कम से कम एक द्वितीयक सर्वर ने प्राथमिक का अनुसरण करना छोड़ दिया है: विफल स्थानांतरण, समाप्त कुंजी, कोई नया फ़ायरवॉल नियम। वह पुराने अभिलेखों के साथ उत्तर देता रहता है, और कहीं कोई त्रुटि दिखाई नहीं देती।',

  flag_soa_timer_out_of_range: 'कोई SOA टाइमर सामान्य दायरे से बाहर है',
  fd_soa_timer_out_of_range: 'मान RFC 1912 की सिफ़ारिश से बाहर है। अपने आप में यह खराबी नहीं — पर ऐसे अंक प्रायः किसी ऐसे साँचे से विरासत में मिलते हैं जिस पर कोई लौटकर नहीं आया।',

  flag_soa_retry_above_refresh: 'Retry, Refresh से छोटा नहीं है',
  fd_soa_retry_above_refresh: 'Retry वह छोटा अंतराल होना चाहिए जो असफल ताज़ाकरण के बाद काम आता है। जब वही लंबा हो जाए, तो असफल स्थानांतरण दोबारा आज़माए जाने से पहले पूरा एक ताज़ाकरण चक्र प्रतीक्षा करता है।',

  flag_soa_expire_too_short: 'बाकी टाइमरों की तुलना में Expire छोटा है',
  fd_soa_expire_too_short: 'यदि द्वितीयक सर्वर इतनी देर तक प्राथमिक तक न पहुँच सके तो वह उत्तर देना ही बंद कर देता है। दो ताज़ाकरण प्रयासों से कम रखने पर, गड़बड़ी वाला एक लंबा सप्ताहांत ही ज़ोन को चुप करा देता है।',

  flag_soa_rname_has_at: 'सम्पर्क पते में @ है',
  fd_soa_rname_has_at: 'RNAME क्षेत्र एक ईमेल पता है जिसमें @ बिंदु के रूप में लिखा जाता है। वास्तविक @ इसे अपठनीय बना देता है, और ज़ोन के बारे में स्वचालित सूचनाएँ कहीं नहीं पहुँचतीं।',

  flag_primary_not_in_ns_set: 'प्राथमिक सर्वर प्रकाशित सूची में नहीं है',
  fd_primary_not_in_ns_set: 'SOA ऐसे प्राथमिक का नाम लेता है जो NS समूह में नहीं है। छिपा हुआ प्राथमिक ठीक ऐसे ही चलाया जाता है, इसलिए यह खराबी नहीं, टिप्पणी है।',

  flag_cname_at_apex: 'ज़ोन के शीर्ष पर CNAME',
  fd_cname_at_apex: 'RFC 1034 §3.6.2: जिस नाम पर CNAME है उस पर और कोई अभिलेख नहीं होता। शीर्ष पर SOA और NS हमेशा रहते हैं, इसलिए दोनों बातें एक साथ सच नहीं हो सकतीं। कुछ रिज़ॉल्वर CNAME लौटाकर बाकी छोड़ देते हैं, कुछ उसे अनदेखा करते हैं; सबसे पहले प्रायः ईमेल टूटता है।',

  flag_cname_with_other_data: 'अन्य अभिलेखों के साथ CNAME',
  fd_cname_with_other_data: 'एक ही नाम पर CNAME भी है और कम से कम एक और प्रकार का अभिलेख भी। रिज़ॉल्वर कौन-सा लौटाएगा यह इस पर निर्भर करता है कि पहले क्या पूछा गया — और यह वह गुण नहीं जो आप अपने DNS में चाहेंगे।',

  flag_no_address_at_apex: 'शीर्ष का कोई पता नहीं',
  fd_no_address_at_apex: 'डोमेन के लिए न A है न AAAA। केवल ईमेल के लिए इस्तेमाल होने वाले डोमेन में यह जानबूझकर है; ब्राउज़र में इसे टाइप करने वाले के लिए अप्रत्याशित।',

  flag_no_ipv6: 'कोई AAAA अभिलेख नहीं',
  fd_no_ipv6: 'डोमेन केवल IPv4 पर हल होता है। केवल-IPv6 मोबाइल नेटवर्क के आगंतुक अपने ऑपरेटर के अनुवादक के रास्ते पहुँचते हैं।',

  flag_ttl_very_short: 'शीर्ष पर बहुत छोटा TTL',
  fd_ttl_very_short: 'एक मिनट से कम। यह स्थानांतरण के समय की सेटिंग है और स्थानांतरण के बाद अक्सर वहीं छूट जाती है — जब तक रहती है, नेमसर्वरों पर प्रश्नों का बोझ कई गुना कर देती है।',

  flag_ttl_very_long: 'शीर्ष पर बहुत लंबा TTL',
  fd_ttl_very_long: 'दो दिन से अधिक। पते का कोई भी बदलाव सब तक पहुँचने में उतना ही समय लेगा, जो किसी घटना के दौरान बहुत असुविधाजनक स्थिति है।',

  flag_wildcard_record: 'ज़ोन में वाइल्डकार्ड है',
  fd_wildcard_record: 'जो नाम निश्चित रूप से मौजूद नहीं है उसे भी उत्तर मिला, यानी वाइल्डकार्ड काम कर रहा है। यह जानना उपयोगी है, क्योंकि तब «अभिलेख है» का अर्थ केवल «वाइल्डकार्ड मिल गया» हो सकता है।',

  flag_txt_split_into_chunks: 'एक TXT अभिलेख कई हिस्सों में बँटा है',
  fd_txt_split_into_chunks: '255 बाइट से बड़ी हर चीज़ के लिए सामान्य — टुकड़े बीच में कुछ डाले बिना जोड़े जाते हैं। यहाँ इसलिए दर्ज है क्योंकि उन्हें खाली स्थान से जोड़ने वाले विश्लेषक SPF और DKIM अभिलेखों को चुपचाप बिगाड़ देते हैं।',

  flag_ds_without_dnskey: 'जनक कहता है ज़ोन हस्ताक्षरित है, पर वह नहीं है',
  fd_ds_without_dnskey: 'जनक में DS अभिलेख है पर ज़ोन में DNSKEY नहीं। सत्यापन करने वाला हर रिज़ॉल्वर इसे हमला मानकर उत्तर देने से मना कर देता है, इसलिए इंटरनेट के बड़े हिस्से के लिए यह डोमेन पहुँच से बाहर है।',

  flag_dnssec_not_enabled: 'ज़ोन हस्ताक्षरित नहीं है',
  fd_dnssec_not_enabled: 'DNSSEC नहीं है। इस डोमेन के उत्तरों को गढ़े हुए उत्तरों से अलग नहीं किया जा सकता — DNSSEC इसी को रोकने के लिए है।',

  flag_no_key_signing_key: 'अलग कुंजी-हस्ताक्षर कुंजी नहीं है',
  fd_no_key_signing_key: 'ज़ोन भूमिकाएँ बाँटने के बजाय एक ही कुंजी से हस्ताक्षर करता है। यह वैध और सरल है — पर तब हर कुंजी परिवर्तन पर रजिस्ट्रार में DS बदलना पड़ता है।',

  flag_weak_key_algorithm: 'हस्ताक्षर एल्गोरिद्म अब भरोसेमंद नहीं',
  fd_weak_key_algorithm: 'कुंजी ऐसा एल्गोरिद्म इस्तेमाल करती है — RSA/SHA-1, DSA या MD5 — जिसे सुरक्षित नहीं माना जाता। SHA-1 टकराव 2017 से व्यावहारिक हैं, और रूट ज़ोन नए प्रत्यायोजनों के लिए इन्हें स्वीकार नहीं करता।',

  flag_rsa_key_too_short: '2048 बिट से छोटी RSA कुंजी',
  fd_rsa_key_too_short: 'इससे छोटी कोई भी लंबाई वर्तमान सिफ़ारिश से नीचे है और बदली जानी चाहिए। बदलना नियमित काम है; ऐसे ही छोड़ देना नहीं।',

  flag_key_revoked: 'एक कुंजी निरस्त चिह्नित है',
  fd_key_revoked: 'REVOKE बिट लगा है। यह व्यवस्थित कुंजी परिवर्तन (RFC 5011) का हिस्सा है और उसके पूरा होते ही हट जाना चाहिए — यदि महीनों से टिका है तो वह पूरा नहीं हुआ।',

  flag_key_not_a_zone_key: 'ज़ोन चिह्न के बिना एक DNSKEY',
  fd_key_not_a_zone_key: 'कुंजी DNSKEY समूह में प्रकाशित है पर ज़ोन कुंजी के रूप में चिह्नित नहीं, इसलिए वह ज़ोन में कुछ भी सत्यापित नहीं कर सकती।',

  flag_dnskey_not_signed: 'कुंजी-समूह पर कोई हस्ताक्षर नहीं',
  fd_dnskey_not_signed: 'जिस DNSKEY समूह पर RRSIG न हो उस पर कुछ भी भरोसा नहीं कर सकता। सत्यापन करने वाले रिज़ॉल्वर पूरे ज़ोन को अस्वीकार कर देंगे।',

  flag_dnskey_signature_invalid: 'कुंजी-समूह का हस्ताक्षर सत्यापित नहीं होता',
  fd_dnskey_signature_invalid: 'DNSKEY समूह को ढकने वाला RRSIG यहाँ सत्यापन में विफल रहा। सत्यापन करने वाले रिज़ॉल्वर भी यही निष्कर्ष निकालेंगे और इस डोमेन के लिए उत्तर देना बंद कर देंगे।',

  flag_ds_weak_digest: 'DS कमज़ोर सारांश का उपयोग करता है',
  fd_ds_weak_digest: 'जनक में सारांश SHA-1 है। उसके साथ SHA-256 वाला DS प्रकाशित करें और उसके बाद पुराने को हटा दें।',

  flag_ds_points_at_missing_key: 'DS ऐसी कुंजी की ओर इशारा करता है जो ज़ोन में नहीं है',
  fd_ds_points_at_missing_key: 'जनक ऐसे कुंजी टैग की गारंटी दे रहा है जो ज़ोन में है ही नहीं। रजिस्ट्रार में अद्यतन भूल जाने वाला कुंजी परिवर्तन ऐसा ही दिखता है, और यह सत्यापन को पूरी तरह तोड़ देता है।',

  flag_ds_digest_mismatch: 'DS ज़ोन की कुंजी से मेल नहीं खाता',
  fd_ds_digest_mismatch: 'प्रकाशित कुंजी से दोबारा निकाला गया सारांश जनक वाले से मेल नहीं खाता। जड़ से आने वाली शृंखला टूट चुकी है और सत्यापन करने वाले रिज़ॉल्वर इस डोमेन को अस्वीकार कर देंगे।',

  flag_signed_but_no_ds: 'हस्ताक्षरित, पर कोई लंगर नहीं',
  fd_signed_but_no_ds: 'ज़ोन हस्ताक्षरित है और जनक कोई DS प्रकाशित नहीं करता, इसलिए जड़ से इन हस्ताक्षरों तक कोई रास्ता नहीं — इन्हें सत्यापित करने वाला कुछ नहीं है। प्रायः यह रजिस्ट्रार वाला वह कदम है जो कभी पूरा ही नहीं हुआ।',

  flag_zone_data_signature_invalid: 'ज़ोन के डेटा का हस्ताक्षर सत्यापित नहीं होता',
  fd_zone_data_signature_invalid: 'SOA अभिलेख हस्ताक्षरित है और हस्ताक्षर प्रकाशित कुंजियों से मेल नहीं खाता। सत्यापन करने वाले रिज़ॉल्वर इस डोमेन को अस्वीकार कर देंगे।',

  flag_zone_data_not_signed: 'ज़ोन के डेटा पर हस्ताक्षर नहीं हैं',
  fd_zone_data_not_signed: 'कुंजियाँ प्रकाशित हैं पर अभिलेख स्वयं हस्ताक्षरित नहीं, यानी ज़ोन केवल नाम का हस्ताक्षरित है।',

  flag_signatures_expiring_soon: 'हस्ताक्षर अपने जीवन के अंत के निकट हैं',
  fd_signatures_expiring_soon: 'वैधता की खिड़की में बहुत कम बचा है। यदि ज़ोन को दोबारा हस्ताक्षरित करने वाली व्यवस्था रुक गई है, तो खिड़की बंद होते ही यह डोमेन सत्यापन करने वाले हर रिज़ॉल्वर के लिए गायब हो जाएगा — और बिना किसी चेतावनी के।',

  flag_signatures_expiring: 'हस्ताक्षर अपनी खिड़की के आधे से आगे निकल गए',
  fd_signatures_expiring: 'नियमित रूप से दोबारा हस्ताक्षरित होने वाले ज़ोन के लिए सामान्य है; यह इसलिए दिखाया जाता है कि अटकी हुई हस्ताक्षर व्यवस्था तात्कालिक संकट बनने से पहले पहचानी जा सके।',

  flag_signature_expired: 'एक हस्ताक्षर समाप्त हो चुका है',
  fd_signature_expired: 'वैधता की खिड़की बंद हो चुकी है। सत्यापन करने वाला हर रिज़ॉल्वर उत्तर को जाली मानता है, जिससे उनके लिए यह डोमेन इंटरनेट से हट जाता है।',

  flag_nsec_probe_failed: 'अनुपस्थिति कैसे सिद्ध होती है, यह नहीं देखा जा सका',
  fd_nsec_probe_failed: 'जानबूझकर अनुपस्थित नाम का प्रश्न लौटा ही नहीं, इसलिए NSEC और NSEC3 की जाँच नहीं हो सकी।',

  flag_nsec3_iterations_above_zero: 'NSEC3 अतिरिक्त हैश पुनरावृत्तियाँ करता है',
  fd_nsec3_iterations_above_zero: 'RFC 9276 शून्य माँगता है। अतिरिक्त चक्रों का उद्देश्य ज़ोन की गणना महँगी करना था; वह कभी हुआ नहीं, और भरोसे से जो धीमा पड़ता है वह केवल सत्यापन करने वाला रिज़ॉल्वर है।',

  flag_nsec3_salt_present: 'NSEC3 नमक का उपयोग करता है',
  fd_nsec3_salt_present: 'RFC 9276 खाली नमक माँगता है। यह कोई सुरक्षा नहीं जोड़ता — नमक स्वयं अभिलेख में प्रकाशित होता है — और उसे बदलने का अर्थ पूरे ज़ोन को दोबारा हस्ताक्षरित करना है।',

  flag_nsec3_opt_out: 'NSEC3 में opt-out चालू है',
  fd_nsec3_opt_out: 'ज़ोन के भीतर अहस्ताक्षरित प्रत्यायोजनों की अनुपस्थिति सिद्ध नहीं होती। बहुत बड़े ज़ोन के लिए उचित, अधिकांश के लिए अनावश्यक।',

  flag_nsec_zone_walkable: 'ज़ोन की पूरी गणना की जा सकती है',
  fd_nsec_zone_walkable: 'NSEC किसी नाम की अनुपस्थिति अगले मौजूद नाम को बताकर सिद्ध करता है, इसलिए पूरा ज़ोन एक-एक प्रश्न करके पढ़ा जा सकता है। बहुतों के लिए यह सोचा-समझा निर्णय है, और इसे स्पष्ट कहा जाना चाहिए।',

  flag_caa_missing: 'कोई CAA अभिलेख नहीं',
  fd_caa_missing: 'कुछ भी सीमित नहीं करता कि इस डोमेन के लिए कौन-सा प्रमाणपत्र प्राधिकरण जारी कर सकता है। CA/Browser की बुनियादी अपेक्षाओं वाले सभी प्राधिकरणों को 2017 से CAA मानना अनिवार्य है, यानी यह एक मुफ़्त प्रतिबंध है जिसका बस उपयोग नहीं हो रहा।',

  flag_caa_forbids_issuance: 'CAA हर तरह के जारीकरण पर रोक लगाता है',
  fd_caa_forbids_issuance: 'अभिलेख में अकेला अर्धविराम है: इस नाम के लिए कोई भी प्राधिकरण जारी नहीं कर सकता। जिस डोमेन को कभी प्रमाणपत्र नहीं चाहिए उसके लिए सोचा-समझा, और जिसे चाहिए उसके लिए महँगी टाइपिंग गलती।',

  flag_caa_no_iodef: 'CAA में सूचना का पता नहीं',
  fd_caa_no_iodef: 'iodef गुण के बिना, जो प्राधिकरण आपके CAA अभिलेख के कारण अनुरोध ठुकराता है उसके पास आपको बताने की कोई जगह नहीं — ठीक उसी क्षण जब आप जानना चाहेंगे।',

  flag_caa_no_issuewild: 'वाइल्डकार्ड के लिए अलग नियम नहीं',
  fd_caa_no_issuewild: 'issuewild न हो तो issue समूह वाइल्डकार्ड प्रमाणपत्रों को भी नियंत्रित करता है। अक्सर यही अभिप्रेत होता है; कहा इसलिए जा रहा है कि मान न लिया जाए।',

  flag_caa_unknown_tag: 'एक अपरिचित CAA गुण',
  fd_caa_unknown_tag: 'अभिलेख में मानक समूह से बाहर का टैग है। प्राधिकरण उसे अनदेखा कर देंगे।',

  flag_caa_unknown_critical_tag: 'एक अपरिचित CAA गुण महत्वपूर्ण चिह्नित है',
  fd_caa_unknown_critical_tag: 'जिस टैग को हम नहीं पहचानते उस पर critical चिह्न लगा है। जो प्राधिकरण उसे भी नहीं पहचानता, उसे जारीकरण पूरी तरह ठुकराना अनिवार्य है — इससे बिना किसी दिखने वाले कारण के प्रमाणपत्र रुक सकते हैं।',

  flag_no_resolver_answered: 'किसी सार्वजनिक रिज़ॉल्वर ने उत्तर नहीं दिया',
  fd_no_resolver_answered: 'छह सार्वजनिक रिज़ॉल्वरों में से किसी ने भी इस नाम के लिए उत्तर नहीं लौटाया। या तो ज़ोन पहुँच से बाहर है, या उन तक हमारा अपना बाहर जाने वाला रास्ता।',

  flag_resolvers_disagree: 'सार्वजनिक रिज़ॉल्वर अलग-अलग उत्तर देते हैं',
  fd_resolvers_disagree: 'इस समय दो या अधिक रिज़ॉल्वरों के पास अलग-अलग अभिलेख हैं। किसी बदलाव के बाद कुछ घंटों तक यह सामान्य है — हर कैश अपना TTL पूरा करता है — और यदि यहाँ दिखाए गए सबसे लंबे TTL से आगे भी बना रहे तो यह समस्या है।',

  flag_some_resolvers_silent: 'कुछ सार्वजनिक रिज़ॉल्वरों ने उत्तर नहीं दिया',
  fd_some_resolvers_silent: 'कम से कम एक रिज़ॉल्वर ने समय पर उत्तर नहीं दिया। प्रायः यह उसका अपना बोझ या छना हुआ रास्ता होता है; अनदेखा करने के बजाय दर्ज किया जाता है ताकि चुप्पी से कुछ निष्कर्ष न निकाला जाए।',
};

OWN.ar = {
  title: 'فحص DNS — التفويض وDNSSEC والانتشار لأي نطاق',
  title_short: 'فحص DNS',
  h1: 'فحص DNS',
  subtitle: 'تتبّع التفويض من الجذر، ومقارنة أرقام SOA التسلسلية على كل خوادم الأسماء، وسلسلة DNSSEC تُتحقَّق هنا بدل أن تُصدَّق',
  ph_host: 'example.com',
  hero_label: 'النطاق قيد الفحص',
  empty_hint: 'أدخل اسم نطاق. يتتبّع الفحص التفويض من خوادم الجذر نزولًا، ويطرح الأسئلة نفسها على كل خادم مخوَّل، ويتحقّق بنفسه من تواقيع DNSSEC. يستغرق ذلك ثوانيَ قليلة ونحو خمسين استعلامًا.',

  stage_resolve: 'تتبّع التفويض',
  stage_delegation: 'فحص خوادم الأسماء',
  stage_soa: 'مقارنة أرقام SOA التسلسلية',
  stage_records: 'قراءة السجلات',
  stage_dnssec: 'التحقّق من سلسلة DNSSEC',
  stage_caa: 'البحث عن CAA',
  stage_propagation: 'سؤال المحلّلات العامة',
  stage_grade: 'إعطاء التقدير',

  card_grade: 'تفصيل التقدير',
  card_delegation: 'التفويض',
  card_nameservers: 'خوادم الأسماء',
  card_soa: 'المنطقة (SOA)',
  card_records: 'السجلات',
  card_dnssec: 'DNSSEC',
  card_keys: 'المفاتيح والتواقيع',
  card_caa: 'CAA',
  card_propagation: 'المحلّلات العامة',
  card_trace: 'المسار من الجذر',

  comp_delegation: 'سلامة التفويض',
  comp_dnssec: 'DNSSEC',
  comp_hygiene: 'نظافة المنطقة',

  k_zone: 'المنطقة',
  k_parent_ns: 'الخوادم لدى الأصل',
  k_zone_ns: 'خوادم المنطقة نفسها',
  k_ns_agreement: 'الجانبان متطابقان',
  k_only_at_parent: 'لدى الأصل فقط',
  k_only_at_zone: 'في المنطقة فقط',
  k_glue: 'سجلات الغراء',
  k_answering: 'تجيب بصفة مخوَّلة',
  k_ipv6_ns: 'يمكن بلوغها عبر IPv6',
  k_primary: 'الأساسي (MNAME)',
  k_rname: 'جهة الاتصال (RNAME)',
  k_serial: 'الرقم التسلسلي',
  k_serials_agree: 'الأرقام التسلسلية متطابقة',
  k_refresh: 'Refresh',
  k_retry: 'Retry',
  k_expire: 'Expire',
  k_minimum: 'مدة حفظ النفي',
  k_a: 'A',
  k_aaaa: 'AAAA',
  k_mx: 'MX',
  k_txt: 'TXT',
  k_ns: 'NS',
  k_srv: 'SRV',
  k_apex_ttl: 'مدة الحفظ عند قمة المنطقة',
  k_wildcard: 'محرف بدل',
  k_enabled: 'موقّعة',
  k_ds_at_parent: 'سجل DS لدى الأصل',
  k_chain_ds: 'DS يطابق المفتاح',
  k_chain_key: 'مجموعة المفاتيح موقّعة',
  k_chain_zone: 'بيانات المنطقة موقّعة',
  k_nsec_kind: 'إثبات الغياب',
  k_nsec3_iterations: 'تكرارات NSEC3',
  k_soonest_expiry: 'أقرب انتهاء لتوقيع',
  k_caa_at: 'منشورة على',
  k_caa_issue: 'يجوز لها الإصدار',
  k_caa_issuewild: 'يجوز لها إصدار محارف البدل',
  k_caa_iodef: 'إبلاغ المخالفات إلى',
  k_resolvers_agree: 'المحلّلات متفقة',
  k_longest_ttl: 'أطول مدة حفظ متبقية',
  k_validating: 'تحقّقت من DNSSEC',
  k_queries: 'الاستعلامات المرسلة',

  th_nameserver: 'خادم الأسماء',
  th_status: 'الحالة',
  th_addresses: 'العناوين',
  th_serial: 'الرقم التسلسلي',
  th_response: 'زمن الرد',
  th_resolver: 'المحلّل',
  th_answer: 'الجواب',
  th_ttl: 'المتبقي من مدة الحفظ',
  th_keytag: 'وسم المفتاح',
  th_role: 'الدور',
  th_algorithm: 'الخوارزمية',
  th_bits: 'بت',
  th_covers: 'يغطي',
  th_valid: 'صالح',
  th_expires: 'ينتهي',
  th_type: 'النوع',
  th_value: 'القيمة',

  nss_authoritative: 'مخوَّل',
  nss_lame: 'غير مخوَّل',
  nss_silent: 'لا جواب',
  nss_unresolvable: 'الاسم لا يُترجَم',
  nsec_nsec: 'NSEC',
  nsec_nsec3: 'NSEC3',
  nsec_none: 'لا شيء',
  v_seconds: '{n} ث',
  v_days: '{n} يومًا',
  v_of_lifetime: 'بقي {days} من {total} يومًا',
  v_root: 'الجذر',

  note_delegation: 'تنشر المنطقة الأصل والمنطقة نفسها كلٌّ مجموعة NS خاصة بها. لا شيء يُلزمهما بالتطابق، وعند اختلافهما يعمل النطاق إلى أن يخزّن أحد المحلّلات المجموعة الأخرى في ذاكرته.',
  note_soa: 'كل خادم مخوَّل يُسأل على حدة. الخادم الذي تخلّف رقمه التسلسلي يواصل الإجابة — لكن بنسخة أقدم من المنطقة.',
  note_dnssec: 'تُتحقَّق السلسلة هنا: تُحسب بصمة DS الموجودة لدى الأصل من جديد انطلاقًا من مفتاح المنطقة، ويُقابَل كل توقيع بمادة المفتاح نفسها. ولا يُسأل أي محلّل إن كان قد اقتنع.',
  note_propagation: 'لا وجود لحالة عالمية للـDNS ينتشر إليها شيء — هناك ذواكر مؤقتة فحسب، كلٌّ منها تحتفظ بما قيل لها حتى تنتهي مدة حفظها. والمتبقي من مدة الحفظ هو الجواب عن سؤال: كم سيبقى كلٌّ منها يقول الشيء نفسه.',
  note_trace: 'كل خطوة إحالة: سُئل الخادم على اليمين عن النطاق فأجاب بالخوادم على اليسار.',

  err_zone_not_found: 'لم يُعثر على منطقة لهذا الاسم.',
  err_dns_timeout: 'لم يجب أحد خوادم الأسماء في الوقت المتاح.',
  err_dns_network: 'تعذّر بلوغ أحد خوادم الأسماء.',
  err_dns_unreachable: 'لم يجب أي خادم أسماء.',

  inc_zone_not_found: 'الاسم غير مفوَّض، فلم يكن هناك ما يُفحص',
  inc_delegation_walk_incomplete: 'لم يكتمل التتبّع من الجذر',
  inc_no_authoritative_server_answered: 'لم يجب أي خادم أسماء مخوَّل',
  inc_ds_lookup_failed: 'تعذّرت قراءة سجل DS لدى الأصل',
  inc_dnskey_lookup_failed: 'تعذّرت قراءة مجموعة DNSKEY',
  inc_dnskey_rrsig_missing: 'لم يعد أي توقيع يغطي مجموعة DNSKEY',
  inc_soa_rrsig_unavailable: 'لم يعد أي توقيع يغطي بيانات المنطقة',

  cap_domain_does_not_exist: 'النطاق غير موجود',
  cap_no_delegation: 'الاسم غير مفوَّض',
  cap_no_authoritative_nameserver: 'لا خادم يجيب بصفة مخوَّلة',
  cap_dnssec_chain_broken: 'سلسلة DNSSEC مقطوعة',
  cap_signature_expired: 'انتهت صلاحية توقيع',
  cap_cname_at_apex: 'سجل CNAME عند قمة المنطقة',
  cap_lame_delegation: 'تفويض بلا صلاحية',
  cap_nameserver_not_answering: 'خادم أسماء مذكور لا يجيب',
  cap_ns_set_mismatch: 'طرفا التفويض مختلفان',
  cap_serial_mismatch: 'الخوادم تحمل نسخًا مختلفة من المنطقة',
  cap_missing_glue: 'خادم داخل المنطقة بلا سجل غراء',
  cap_single_nameserver: 'خادم أسماء واحد فقط',
  cap_cname_with_other_data: 'CNAME إلى جانب سجلات أخرى',
  cap_signed_but_no_ds: 'موقّعة، لكن بلا DS لدى الأصل',
  cap_weak_dnssec_algorithm: 'خوارزمية توقيع لم تعد متينة',
  cap_weak_dnssec_key: 'مفتاح توقيع أقصر مما ينبغي',
  cap_scan_incomplete: 'كان الفحص ناقصًا، فلم يُمنح تقدير',

  flag_delegation_walk_failed: 'لم يكتمل التتبّع من الجذر',
  fd_delegation_walk_failed: 'لم يجب خادم على المسار من الجذر، فتعذّر فحص جزء من التفويض. وهذا يتعلق بقابليتنا للوصول بقدر ما يتعلق بقابليتهم.',

  flag_nxdomain: 'النطاق غير موجود',
  fd_nxdomain: 'أجابت المنطقة الأصل بـNXDOMAIN: لا تفويض لهذا الاسم. فإما أنه لم يُسجَّل قط، وإما أن تسجيله انتهى.',

  flag_no_delegation: 'الاسم غير مفوَّض',
  fd_no_delegation: 'لم يُعثر على منطقة لهذا الاسم. قد يوجد كسجل داخل منطقة أصل، لكنه ليس منطقة قائمة بذاتها لها خوادم أسماء.',

  flag_referral_off_path: 'إحالة أخرجتنا عن مسار الاسم',
  fd_referral_off_path: 'أحالنا خادم إلى منطقة ليست سلفًا للاسم المسؤول عنه. هذا خطأ في الإعداد، واتّباع تلك الإحالة طريقٌ إلى الوصول إلى مكان آخر.',

  flag_nameserver_unresolvable: 'اسم أحد الخوادم لا يُترجَم إلى عنوان',
  fd_nameserver_unresolvable: 'يذكر التفويض خادمًا لا تحمل تسميته سجلات عناوين. المحلّل الذي يختاره يهدر استعلامًا ثم يضطر إلى تجربة غيره.',

  flag_ns_set_mismatch: 'الأصل والمنطقة يذكران خوادم أسماء مختلفة',
  fd_ns_set_mismatch: 'التفويض لدى الأصل وسجلات NS داخل المنطقة غير متطابقين. وكلاهما مستعمل عمليًا، فيسلك النطاق سلوكًا مختلفًا بحسب المجموعة التي خزّنها المحلّل — وهذا السبب الكلاسيكي لعطل يظهر ويختفي.',

  flag_single_nameserver: 'خادم أسماء واحد فقط',
  fd_single_nameserver: 'يطلب RFC 1034 خادمين على الأقل في شبكتين منفصلتين. مع خادم واحد، أي انقطاع لتلك الآلة هو انقطاع للنطاق كله، بما فيه البريد.',

  flag_nameserver_silent: 'خادم أسماء لا يجيب',
  fd_nameserver_silent: 'لم يستجب خادم مذكور في التفويض. ستظل المحلّلات تجرّبه وتنتظر انتهاء المهلة قبل الانتقال إلى غيره، وهو ما يظهر من الخارج كنطاق بطيء على فترات.',

  flag_lame_delegation: 'خادم أسماء غير مخوَّل عن المنطقة',
  fd_lame_delegation: 'الخادم يجيب لكن بلا راية التخويل: لم يُعدّ لهذه المنطقة أصلًا. هذا تفويض بلا صلاحية، وكل محلّل يقع عليه عليه أن يبدأ من جديد في مكان آخر.',

  flag_ns_points_at_cname: 'اسم أحد الخوادم كنية',
  fd_ns_points_at_cname: 'يوجب RFC 2181 §10.3 أن يشير سجل NS إلى مضيف له سجلات عناوين، لا إلى CNAME. بعض المحلّلات تتدبّر الأمر، وبعضها يفشل ببساطة.',

  flag_missing_glue: 'خادم داخل المنطقة بلا سجل غراء',
  fd_missing_glue: 'يقع خادم الأسماء داخل المنطقة التي يخدمها، فترجمة عنوانه تقتضي سؤال المنطقة، وسؤال المنطقة يقتضي العنوان. على الأصل نشر سجل غراء لكسر هذه الحلقة.',

  flag_no_authoritative_nameserver: 'لا شيء يجيب عن هذه المنطقة',
  fd_no_authoritative_nameserver: 'لم يدّعِ أي من الخوادم المذكورة التخويل. وبنظر أي محلّل، هذا النطاق لا يعمل ببساطة.',

  flag_no_ipv6_nameserver: 'لا خادم أسماء يمكن بلوغه عبر IPv6',
  fd_no_ipv6_nameserver: 'المحلّلات في الشبكات التي لا تدعم إلا IPv6 تصل إلى المنطقة عبر مترجم، إن وصلت. وإضافة سجل AAAA لخادم واحد عملٌ من خمس دقائق عادةً.',

  flag_nameservers_single_network: 'كل خوادم الأسماء في شبكة واحدة',
  fd_nameservers_single_network: 'تتقاسم العناوين نطاق /24 نفسه، ما يعني عادةً مركز بيانات واحدًا وغالبًا خزانة واحدة. وخادمان في المكان نفسه يسقطان معًا.',

  flag_serial_mismatch: 'الخوادم تحمل نسخًا مختلفة من المنطقة',
  fd_serial_mismatch: 'أرقام SOA التسلسلية متباينة، أي أن خادمًا ثانويًا واحدًا على الأقل توقّف عن متابعة الأساسي: نقل فشل، أو مفتاح انتهى، أو قاعدة جدار ناري جديدة. وهو يواصل الإجابة بسجلات قديمة، ولا يظهر خطأ في أي مكان.',

  flag_soa_timer_out_of_range: 'أحد مؤقتات SOA خارج المدى المعتاد',
  fd_soa_timer_out_of_range: 'القيمة خارج ما يوصي به RFC 1912. ليست عطبًا بذاتها — لكن هذه الأرقام تُورَّث عادةً عن قالب لم يعد إليه أحد.',

  flag_soa_retry_above_refresh: 'قيمة Retry ليست أقصر من Refresh',
  fd_soa_retry_above_refresh: 'يُفترض في Retry أن يكون الفاصل الأقصر المستعمل بعد تحديث فاشل. فإذا كان هو الأطول، انتظر النقل الفاشل دورة تحديث كاملة قبل إعادة المحاولة.',

  flag_soa_expire_too_short: 'قيمة Expire قصيرة قياسًا بالمؤقتات الأخرى',
  fd_soa_expire_too_short: 'إن عجز خادم ثانوي عن بلوغ الأساسي طوال هذه المدة توقّف عن الإجابة تمامًا. ودون محاولتَي تحديث، تكفي عطلة نهاية أسبوع طويلة متعثّرة لإسكات المنطقة.',

  flag_soa_rname_has_at: 'عنوان جهة الاتصال يحوي @',
  fd_soa_rname_has_at: 'حقل RNAME عنوان بريد تُكتب فيه @ نقطةً. ووجود @ حقيقية يجعله غير قابل للتحليل، فتذهب الإشعارات الآلية عن المنطقة إلى لا مكان.',

  flag_primary_not_in_ns_set: 'الخادم الأساسي ليس ضمن الخوادم المنشورة',
  fd_primary_not_in_ns_set: 'يسمّي SOA خادمًا أساسيًا غير موجود في مجموعة NS. وهكذا بالضبط يُدار خادم أساسي مخفي، فهذه ملاحظة لا عطب.',

  flag_cname_at_apex: 'سجل CNAME عند قمة المنطقة',
  fd_cname_at_apex: 'RFC 1034 §3.6.2: الاسم الذي عليه CNAME لا يحمل سجلات أخرى. وقمة المنطقة تحمل دائمًا SOA وNS، فلا يمكن أن يصحّ الأمران معًا. بعض المحلّلات تعيد CNAME وتُسقط الباقي، وبعضها يتجاهله؛ وأول ما ينكسر عادةً هو البريد.',

  flag_cname_with_other_data: 'CNAME إلى جانب سجلات أخرى',
  fd_cname_with_other_data: 'الاسم نفسه يحمل CNAME ونوعًا آخر من السجلات على الأقل. وما يعيده المحلّل يتوقف على ما سُئل عنه أولًا، وهذه ليست خاصية يرغب المرء بها في نظام أسمائه.',

  flag_no_address_at_apex: 'لا عنوان عند قمة المنطقة',
  fd_no_address_at_apex: 'لا سجل A ولا AAAA للنطاق نفسه. أمرٌ مقصود في نطاق للبريد فحسب، ومفاجئ لمن يكتبه في متصفح.',

  flag_no_ipv6: 'لا سجل AAAA',
  fd_no_ipv6: 'لا يُترجَم النطاق إلا عبر IPv4. والزوار في شبكات الهاتف التي لا تدعم إلا IPv6 يصلون عبر مترجم مشغّلهم.',

  flag_ttl_very_short: 'مدة حفظ قصيرة جدًا عند القمة',
  fd_ttl_very_short: 'أقل من دقيقة. هذا إعداد فترة الانتقال، وكثيرًا ما يبقى بعدها — وما دام باقيًا فهو يضاعف حِمل الاستعلامات على خوادم الأسماء.',

  flag_ttl_very_long: 'مدة حفظ طويلة جدًا عند القمة',
  fd_ttl_very_long: 'أكثر من يومين. أي تغيير في العنوان سيستغرق المدة نفسها ليبلغ الجميع، وهذا موقف سيئ أثناء حادثة.',

  flag_wildcard_record: 'في المنطقة محرف بدل',
  fd_wildcard_record: 'اسم لا وجود له قطعًا تلقّى جوابًا رغم ذلك، أي أن محرف بدل يعمل. يُحسن معرفة ذلك، لأن «السجل موجود» قد لا تعني إلا «طابق محرف البدل».',

  flag_txt_split_into_chunks: 'سجل TXT مقسّم إلى عدة سلاسل',
  fd_txt_split_into_chunks: 'أمر طبيعي لكل ما يتجاوز 255 بايتًا — تُوصَل القطع دون أي فاصل بينها. ويُذكر هنا لأن المحلّلات التي تصلها بمسافة تُفسد سجلات SPF وDKIM بصمت.',

  flag_ds_without_dnskey: 'الأصل يقول إن المنطقة موقّعة وهي ليست كذلك',
  fd_ds_without_dnskey: 'لدى الأصل سجل DS ولا يوجد DNSKEY في المنطقة. وكل محلّل يتحقّق يعدّ ذلك هجومًا ويمتنع عن الإجابة، فيصير النطاق غير قابل للبلوغ لشريحة واسعة من الإنترنت.',

  flag_dnssec_not_enabled: 'المنطقة غير موقّعة',
  fd_dnssec_not_enabled: 'لا DNSSEC. لا يمكن تمييز أجوبة هذا النطاق عن أجوبة ملفّقة — وهو بالضبط ما وُجد DNSSEC لمنعه.',

  flag_no_key_signing_key: 'لا مفتاح مستقل لتوقيع المفاتيح',
  fd_no_key_signing_key: 'توقّع المنطقة بمفتاح واحد بدل الفصل بين الدورين. هذا مشروع وأبسط — لكنه يعني أن كل تبديل للمفتاح يستلزم تحديث سجل DS لدى المُسجِّل.',

  flag_weak_key_algorithm: 'خوارزمية توقيع لم تعد متينة',
  fd_weak_key_algorithm: 'يستعمل المفتاح خوارزمية — RSA/SHA-1 أو DSA أو MD5 — لا تُعدّ آمنة. فتصادمات SHA-1 صارت عملية منذ 2017، ولم تعد منطقة الجذر تقبلها لتفويضات جديدة.',

  flag_rsa_key_too_short: 'مفتاح RSA أقل من 2048 بت',
  fd_rsa_key_too_short: 'كل ما هو أقصر يقع دون التوصية الحالية وينبغي تبديله. التبديل عمل روتيني؛ وتركه على حاله ليس كذلك.',

  flag_key_revoked: 'مفتاح موسوم بأنه ملغى',
  fd_key_revoked: 'راية REVOKE مرفوعة. وهذا جزء من تبديل منظّم للمفاتيح (RFC 5011) ويُفترض أن يختفي بانتهائه — فإن بقي شهورًا فالتبديل لم ينتهِ.',

  flag_key_not_a_zone_key: 'سجل DNSKEY بلا راية المنطقة',
  fd_key_not_a_zone_key: 'المفتاح منشور في مجموعة DNSKEY لكنه غير موسوم كمفتاح منطقة، فلا يستطيع التحقّق من شيء داخلها.',

  flag_dnskey_not_signed: 'مجموعة المفاتيح بلا توقيع',
  fd_dnskey_not_signed: 'مجموعة DNSKEY بلا RRSIG يغطيها لا يمكن لشيء أن يثق بها. وستردّ المحلّلات المتحقِّقة المنطقة كلها.',

  flag_dnskey_signature_invalid: 'توقيع مجموعة المفاتيح لا يتحقّق',
  fd_dnskey_signature_invalid: 'أخفق RRSIG الذي يغطي مجموعة DNSKEY في التحقّق هنا. وستبلغ المحلّلات المتحقِّقة الخلاصة نفسها وتتوقف عن الإجابة عن النطاق.',

  flag_ds_weak_digest: 'سجل DS يستعمل بصمة ضعيفة',
  fd_ds_weak_digest: 'البصمة لدى الأصل هي SHA-1. انشر إلى جانبها سجل DS ببصمة SHA-256 ثم اسحب القديم بعد ذلك.',

  flag_ds_points_at_missing_key: 'سجل DS يشير إلى مفتاح لا تنشره المنطقة',
  fd_ds_points_at_missing_key: 'يضمن الأصل وسم مفتاح غير موجود في المنطقة. هكذا يبدو تبديل مفاتيح نُسي فيه تحديث بيانات المُسجِّل، وهو يعطّل التحقّق تعطيلًا كاملًا.',

  flag_ds_digest_mismatch: 'سجل DS لا يطابق مفتاح المنطقة',
  fd_ds_digest_mismatch: 'البصمة المحسوبة من جديد من المفتاح المنشور لا تساوي التي لدى الأصل. السلسلة من الجذر مقطوعة، وسترفض المحلّلات المتحقِّقة النطاق.',

  flag_signed_but_no_ds: 'موقّعة، لكن لا شيء يثبّتها',
  fd_signed_but_no_ds: 'المنطقة موقّعة والأصل لا ينشر DS، فلا سبيل من الجذر إلى هذه التواقيع ولا شيء يتحقّق منها. وهذه عادةً خطوة لدى المُسجِّل لم تُستكمل قط.',

  flag_zone_data_signature_invalid: 'توقيع بيانات المنطقة لا يتحقّق',
  fd_zone_data_signature_invalid: 'سجل SOA موقّع والتوقيع لا يستقيم مع المفاتيح المنشورة. وسترفض المحلّلات المتحقِّقة النطاق.',

  flag_zone_data_not_signed: 'بيانات المنطقة بلا تواقيع',
  fd_zone_data_not_signed: 'المفاتيح منشورة والسجلات نفسها غير موقّعة، فالمنطقة موقّعة بالاسم فقط.',

  flag_signatures_expiring_soon: 'التواقيع قاربت نهاية عمرها',
  fd_signatures_expiring_soon: 'لم يبقَ من نافذة الصلاحية إلا القليل. وإن كان ما يعيد توقيع المنطقة قد توقّف، فسيختفي النطاق عن كل محلّل يتحقّق لحظة انغلاق النافذة — ومن دون أي إنذار.',

  flag_signatures_expiring: 'التواقيع تجاوزت منتصف نافذتها',
  fd_signatures_expiring: 'أمر طبيعي في منطقة يُعاد توقيعها بانتظام؛ ويُعرض ليتسنّى التعرّف على موقِّع متعطّل قبل أن يصير الأمر عاجلًا.',

  flag_signature_expired: 'انتهت صلاحية توقيع',
  fd_signature_expired: 'انغلقت نافذة الصلاحية. وكل محلّل يتحقّق يعدّ الجواب مزوَّرًا، فيخرج النطاق من الإنترنت بالنسبة إليه.',

  flag_nsec_probe_failed: 'تعذّرت رؤية كيفية إثبات الغياب',
  fd_nsec_probe_failed: 'لم يعد الاستعلام عن اسم غائب عمدًا، فتعذّر فحص NSEC وNSEC3.',

  flag_nsec3_iterations_above_zero: 'NSEC3 يستعمل تكرارات تجزئة إضافية',
  fd_nsec3_iterations_above_zero: 'يطلب RFC 9276 صفرًا. كان المقصود بالجولات الإضافية أن تجعل تعداد المنطقة مكلفًا؛ ولم تفعل قط، والوحيد الذي تبطئه فعلًا هو المحلّل المتحقِّق.',

  flag_nsec3_salt_present: 'NSEC3 يستعمل ملحًا',
  fd_nsec3_salt_present: 'يطلب RFC 9276 ملحًا فارغًا. فهو لا يضيف حماية — الملح منشور في السجل نفسه — ويجعل تغييره إعادة توقيع للمنطقة بأسرها.',

  flag_nsec3_opt_out: 'NSEC3 يستعمل خيار الاستثناء',
  fd_nsec3_opt_out: 'التفويضات غير الموقّعة داخل المنطقة لا يُثبَت غيابها. معقول في منطقة ضخمة جدًا، وغير ضروري لأغلب المناطق.',

  flag_nsec_zone_walkable: 'يمكن تعداد المنطقة بأكملها',
  fd_nsec_zone_walkable: 'يثبت NSEC غياب اسم بذكر الاسم التالي الموجود، فيمكن قراءة المنطقة كلها استعلامًا بعد استعلام. وهو لكثيرين خيار مقصود، ويستحق أن يُقال صراحة.',

  flag_caa_missing: 'لا سجل CAA',
  fd_caa_missing: 'لا شيء يقيّد أي سلطة تصديق يجوز لها الإصدار لهذا النطاق. وكل السلطات المشمولة بالمتطلبات الأساسية لمنتدى CA/Browser ملزمة باحترام CAA منذ 2017، فهذا قيد مجاني لا يُستعمل ببساطة.',

  flag_caa_forbids_issuance: 'سجل CAA يمنع أي إصدار',
  fd_caa_forbids_issuance: 'السجل فاصلة منقوطة وحيدة: لا يجوز لأي سلطة الإصدار لهذا الاسم. أمرٌ مقصود لنطاق لا ينبغي أن تكون له شهادة أبدًا، وخطأ مطبعي باهظ لنطاق ينبغي أن تكون له.',

  flag_caa_no_iodef: 'لا عنوان إبلاغ في سجل CAA',
  fd_caa_no_iodef: 'من دون خاصية iodef، لا تجد السلطة التي رفضت طلبًا بسبب سجل CAA خاصتك مكانًا تخبرك فيه — وهي اللحظة التي تودّ أن تعرف فيها بالضبط.',

  flag_caa_no_issuewild: 'لا قاعدة منفصلة لمحارف البدل',
  fd_caa_no_issuewild: 'من دون issuewild تحكم مجموعة issue شهادات محارف البدل أيضًا. وهذا هو المقصود غالبًا؛ ويُذكر كي لا يُفترض افتراضًا.',

  flag_caa_unknown_tag: 'خاصية CAA غير معروفة',
  fd_caa_unknown_tag: 'يحوي السجل وسمًا خارج المجموعة القياسية. وستتجاهله سلطات التصديق.',

  flag_caa_unknown_critical_tag: 'خاصية CAA غير معروفة موسومة بأنها حرجة',
  fd_caa_unknown_critical_tag: 'راية «حرج» مرفوعة على وسم لا نعرفه. والسلطة التي لا تعرفه هي الأخرى ملزمة برفض الإصدار كليًا، فقد يحجب ذلك الشهادات دون سبب ظاهر.',

  flag_no_resolver_answered: 'لم يجب أي محلّل عام',
  fd_no_resolver_answered: 'لم يعد أي من المحلّلات العامة الستة جوابًا لهذا الاسم. فإما أن المنطقة غير قابلة للبلوغ، وإما أن مسارنا الصادر إليها كذلك.',

  flag_resolvers_disagree: 'المحلّلات العامة تعطي أجوبة مختلفة',
  fd_resolvers_disagree: 'يحمل محلّلان أو أكثر الآن سجلات مختلفة. وهذا طبيعي لبضع ساعات بعد أي تغيير — تنتظر كل ذاكرة مؤقتة انقضاء مدة حفظها — ويصير مشكلة إن استمر بعد أطول مدة حفظ معروضة هنا.',

  flag_some_resolvers_silent: 'بعض المحلّلات العامة لم تجب',
  fd_some_resolvers_silent: 'لم يجب محلّل واحد على الأقل في الوقت المتاح. وذلك عادةً حِمله هو أو مسار مُرشَّح؛ ويُذكر بدل أن يُهمَل كي لا يُستنتج شيء من الصمت.',
};

window.I18N = window.mergeI18N(OWN);
