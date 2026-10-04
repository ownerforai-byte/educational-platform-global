#!/usr/bin/env node
/**
 * content-ledger-live — proves the deployed site serves every registered note.
 *
 *   node scripts/content-ledger-live.mjs
 *   node scripts/content-ledger-live.mjs --base http://127.0.0.1:3199
 *   node scripts/content-ledger-live.mjs --filter mathematics/algebra --limit 20
 *   node scripts/content-ledger-live.mjs --json .freebuff/ledger-live.json
 *
 * The ledger (frontend/public/data/content-ledger.json) is the registry of what
 * the platform claims to have; the built manifests are what the pages read. This
 * script closes the loop on the DEPLOYED copy: for every registered entry it
 * fetches `/data/syllabus-notes/<subject>/<unit>/<file>` and compares the bytes
 * with the registered sha256. A missing file, an empty body or drifted bytes is
 * a live page promising notes that are not there — it exits non-zero.
 *
 * Dependency-free on purpose: it must run in CI without installing the frontend.
 *
 * The per-request X-Forwarded-For is deliberate: the platform rate-limits 120
 * requests/minute per client, and a full audit is ~870 requests. Each request
 * claims a distinct client so the audit measures CONTENT, not the limiter.
 */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const at = args.indexOf(`--${name}`);
  return at >= 0 && args[at + 1] ? args[at + 1] : fallback;
};

const BASE = flag("base", process.env.LEDGER_BASE_URL || "https://ravikisan.vercel.app").replace(/\/$/, "");
const CONCURRENCY = Number(flag("concurrency", "6"));
const FILTER = flag("filter", "");
const LIMIT = Number(flag("limit", "0"));
const JSON_OUT = flag("json", "");
const TIMEOUT_MS = Number(flag("timeout", "25000"));
const RETRIES = Number(flag("retries", "3"));
const RETRY_DELAY_MS = Number(flag("retry-delay", "45000"));

const LEDGER = path.join(process.cwd(), "frontend", "public", "data", "content-ledger.json");

const ledger = JSON.parse(readFileSync(LEDGER, "utf-8"));
const rows = [];
for (const [subject, subjectNode] of Object.entries(ledger.subjects)) {
  for (const [unitSlug, unit] of Object.entries(subjectNode.units)) {
    for (const entry of unit.entries) {
      const key = `${subject}/${unitSlug}/${entry.filename}`;
      if (FILTER && !key.includes(FILTER)) continue;
      rows.push({ key, subject, unitSlug, entry });
    }
  }
}
const audited = LIMIT > 0 ? rows.slice(0, LIMIT) : rows;

if (!audited.length) {
  console.error(`content-ledger-live: nothing to audit (filter "${FILTER}")`);
  process.exit(2);
}

const randomClient = () =>
  `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`;

async function fetchOnce(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      headers: { "x-forwarded-for": randomClient(), "user-agent": "content-ledger-live/1.0" },
      signal: controller.signal,
      redirect: "follow",
    });
  } finally {
    clearTimeout(timer);
  }
}

async function audit(row) {
  const url = `${BASE}/data/syllabus-notes/${row.subject}/${row.unitSlug}/${row.entry.filename}?v=${row.entry.sha256.slice(0, 8)}`;
  let lastError = "";
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetchOnce(url);
      if (res.status === 404) return { ...row, state: "missing", detail: "HTTP 404" };
      if (!res.ok) {
        lastError = `HTTP ${res.status}`;
        if (res.status < 500) break;
        continue;
      }
      const body = Buffer.from(await res.arrayBuffer());
      if (body.length === 0) return { ...row, state: "empty", detail: "0 bytes" };
      const sha = createHash("sha256").update(body).digest("hex");
      if (sha !== row.entry.sha256) {
        return {
          ...row,
          state: "drift",
          detail: `served ${body.length} B (sha ${sha.slice(0, 12)}…) vs registered ${row.entry.bytes} B (sha ${row.entry.sha256.slice(0, 12)}…)`,
        };
      }
      return { ...row, state: "live", detail: `${body.length} B` };
    } catch (error) {
      lastError = error?.name === "AbortError" ? "timeout" : String(error?.message ?? error);
    }
  }
  return { ...row, state: "error", detail: lastError };
}

const results = [];
let cursor = 0;
async function worker() {
  while (cursor < audited.length) {
    const row = audited[cursor++];
    const result = await audit(row);
    results.push(result);
    if (results.length % 100 === 0) {
      console.log(`  … ${results.length}/${audited.length} checked`);
    }
  }
}

/**
 * A push can run this scan before the static deploy finishes, so a failure is
 * re-checked after a pause before it is believed. Only the failing rows are
 * retried, and the last result wins.
 */
async function auditWithRetries(reason) {
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    const failing = results.filter((r) => r.state !== "live");
    if (!failing.length) return;
    console.log(
      `  ${failing.length} entr(ies) not live yet (${reason}); retry ${attempt}/${RETRIES} in ${RETRY_DELAY_MS / 1000}s`,
    );
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    const retried = await Promise.all(failing.map(audit));
    const byKey = new Map(retried.map((r) => [r.key, r]));
    for (let i = 0; i < results.length; i++) {
      const replacement = byKey.get(results[i].key);
      if (replacement) results[i] = replacement;
    }
  }
}

console.log(
  `content-ledger-live: ${audited.length} registered entries against ${BASE} ` +
    `(${CONCURRENCY} workers, ledger ${ledger.totals.entries} entries / ${ledger.totals.template} template)`,
);
const started = Date.now();
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
await auditWithRetries("deploy may still be in flight");

const manifests = [];
for (const subject of Object.keys(ledger.subjects)) {
  try {
    const res = await fetchOnce(`${BASE}/data/syllabus-notes/${subject}/_manifest.json?live=1`);
    manifests.push({ subject, ok: res.ok, status: res.status });
  } catch (error) {
    manifests.push({ subject, ok: false, status: String(error?.message ?? error) });
  }
}

const tally = results.reduce((acc, r) => ((acc[r.state] = (acc[r.state] ?? 0) + 1), acc), {});
const problems = results.filter((r) => r.state !== "live");
const elapsed = ((Date.now() - started) / 1000).toFixed(1);
const manifestFailures = manifests.filter((m) => !m.ok);

console.log(`\nmanifests: ${manifests.length - manifestFailures.length}/${manifests.length} live`);
for (const m of manifestFailures) console.log(`  × ${m.subject}/_manifest.json: ${m.status}`);
console.log(`entries:   ${tally.live ?? 0}/${results.length} live (${elapsed}s)`);
for (const state of ["missing", "empty", "drift", "error"]) {
  if (tally[state]) console.log(`  × ${state}: ${tally[state]}`);
}
for (const p of problems.slice(0, 20)) console.log(`  × [${p.state}] ${p.key} — ${p.detail}`);
if (problems.length > 20) console.log(`  … and ${problems.length - 20} more`);

if (JSON_OUT) {
  mkdirSync(path.dirname(JSON_OUT), { recursive: true });
  writeFileSync(
    JSON_OUT,
    JSON.stringify({ base: BASE, checkedAt: new Date().toISOString(), tally, manifests, problems: problems.map((p) => ({ key: p.key, state: p.state, detail: p.detail, status: p.entry.status })) }, null, 2),
    "utf-8",
  );
}

if (problems.length || manifestFailures.length) {
  console.error(
    `\ncontent-ledger-live FAILED — ${problems.length} registered entr(ies) are not served correctly` +
      (manifestFailures.length ? `, ${manifestFailures.length} manifest(s) unreachable` : "") +
      ".",
  );
  process.exit(1);
}
console.log(`\ncontent-ledger-live OK — every registered entry is live and byte-identical.`);
