#!/usr/bin/env node
/**
 * boundary-check — ratchet gate for vendor imports outside storage/db adapters.
 *
 * Fails when a NEW import of supabaseAdmin / @aws-sdk / firebase-admin appears
 * outside the allowlisted paths, relative to scripts/boundary-baseline.json.
 *
 *   node scripts/ci/boundary-check.mjs
 *   node scripts/ci/boundary-check.mjs --write-baseline
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const BASELINE_PATH = join(ROOT, "scripts", "boundary-baseline.json");
const WRITE = process.argv.includes("--write-baseline");

const ALLOW = [
  /^backend[/\\]src[/\\]db[/\\]/,
  /^backend[/\\]src[/\\]storage[/\\]adapters[/\\]/,
  /^backend[/\\]src[/\\]auth[/\\]firebase-admin-auth\.ts$/,
  /^backend[/\\]src[/\\]auth[/\\]token-verify\.ts$/,
  /^backend[/\\]src[/\\]storage[/\\]firebase-admin\.ts$/,
  /^backend[/\\]src[/\\]storage[/\\]firebase-store\.ts$/,
  /^backend[/\\]src[/\\]storage[/\\]r2\.ts$/,
  /^backend[/\\]src[/\\]storage[/\\]router\.ts$/,
  /^backend[/\\]tests[/\\]/,
];

const PATTERNS = [
  { id: "supabaseAdmin", re: /supabaseAdmin/ },
  { id: "aws-sdk", re: /@aws-sdk\// },
  {
    id: "firebase-admin",
    re: /from\s+["']firebase-admin(?:\/[^"']*|["'])/,
  },
];

function gitLs() {
  return execSync("git ls-files backend/src backend/tests", {
    cwd: ROOT,
    encoding: "utf8",
  })
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.endsWith(".ts") || l.endsWith(".tsx"));
}

function isAllowed(file) {
  const norm = file.replace(/\\/g, "/");
  return ALLOW.some((re) => re.test(norm));
}

function scan() {
  const hits = [];
  for (const file of gitLs()) {
    if (isAllowed(file)) continue;
    const abs = join(ROOT, file);
    if (!existsSync(abs)) continue;
    const text = readFileSync(abs, "utf8");
    for (const { id, re } of PATTERNS) {
      if (re.test(text)) {
        hits.push(`${file}::${id}`);
      }
    }
  }
  return [...new Set(hits)].sort();
}

const current = scan();

if (WRITE) {
  writeFileSync(BASELINE_PATH, `${JSON.stringify({ violations: current }, null, 2)}\n`);
  console.log(`Wrote ${current.length} baseline violations to ${relative(ROOT, BASELINE_PATH)}`);
  process.exit(0);
}

if (!existsSync(BASELINE_PATH)) {
  console.error("Missing scripts/boundary-baseline.json — run with --write-baseline first.");
  process.exit(1);
}

const baseline = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
const known = new Set(baseline.violations ?? []);
const novel = current.filter((h) => !known.has(h));
const resolved = [...known].filter((h) => !current.includes(h));

if (novel.length > 0) {
  console.error("New storage/vendor boundary violations:");
  for (const h of novel) console.error(`  + ${h}`);
  process.exit(1);
}

console.log(
  `boundary-check OK (${current.length} baseline violations; ${resolved.length} resolved since baseline).`,
);
process.exit(0);
