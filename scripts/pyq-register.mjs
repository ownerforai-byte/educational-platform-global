#!/usr/bin/env node
/**
 * pyq-register — put every authored PYQ bank on disk INTO the content index.
 *
 *   node scripts/pyq-register.mjs            # register anything missing
 *   node scripts/pyq-register.mjs --check    # gate: fail if anything is missing
 *   node scripts/pyq-register.mjs --dry-run  # list what would be added
 *
 * WHY THIS EXISTS
 * ---------------
 * `frontend/lib/pyq-bank.ts` reads `ravikishan/_index.json` — a map of
 * `path -> the file's FULL content` — and that is the ONLY source in the tree
 * that carries a `questions` array (the sibling `manifest.json` records titles
 * and notes but no questions at all, measured: 0 of its 2467 entries). So a PYQ
 * bank that is written to disk but NOT registered here is invisible: the page
 * renders a healthy empty bank, with no error and no warning.
 *
 * Two copies must agree, because they are read by different runtimes:
 *
 *   content/ravikishan/_index.json              the authored corpus (source of truth)
 *   frontend/public/data/ravikishan/_index.json the asset the browser fetches
 *
 * `loadData()` prefers a disk read on the server (trying `public/data`,
 * `frontend/public/data` and `../public/data` in turn) and `fetch` in the
 * browser, so a bank present in only one copy works in exactly one of the two
 * and is silently absent in the other.
 *
 * Both files are kept BYTE-STABLE: keys sorted, 2-space indent, CRLF, trailing
 * newline. That is the existing formatting (and the repo is authored on Windows
 * and deployed from Linux, so the line ending is load-bearing for the ledger's
 * hashes).
 */
import fs from "node:fs";
import path from "node:path";

const ARGS = process.argv.slice(2);
const CHECK = ARGS.includes("--check");
const DRY = ARGS.includes("--dry-run");

const ROOT = process.cwd();
const CORPUS = path.join(ROOT, "content", "ravikishan");
const TARGETS = [
  path.join(ROOT, "content", "ravikishan", "_index.json"),
  path.join(ROOT, "frontend", "public", "data", "ravikishan", "_index.json"),
];

/** Every `pyqs/*.json` under the corpus, as corpus-relative POSIX paths. */
function discoverPyqFiles() {
  const out = [];
  if (!fs.existsSync(CORPUS)) {
    console.error(`pyq-register: corpus not found at ${CORPUS} — run from the repo root`);
    process.exit(2);
  }
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!entry.name.endsWith(".json")) continue;
      const rel = path.relative(CORPUS, full).replaceAll(path.sep, "/");
      // Only the exam banks. `_index.json` carries concepts and mindmaps too,
      // but those are registered by their own build steps — this script owns one
      // family and must not silently change another's contents.
      if (!rel.includes("/pyqs/")) continue;
      if (entry.name.startsWith("_")) continue;
      out.push(rel);
    }
  };
  walk(CORPUS);
  return out.sort();
}

function readIndex(file, label) {
  if (!fs.existsSync(file)) {
    console.error(`pyq-register: ${label} not found at ${file}`);
    process.exit(2);
  }
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    console.error(`pyq-register: ${label} is not valid JSON — ${error.message}`);
    process.exit(2);
  }
}

/** Byte-stable serialisation: sorted keys, 2-space indent, CRLF, final newline. */
function serialise(index) {
  const sorted = {};
  for (const key of Object.keys(index).sort()) sorted[key] = index[key];
  return `${JSON.stringify(sorted, null, 2).replace(/\n/g, "\r\n")}\r\n`;
}

/**
 * A bank this script is responsible for: the canonical filename (`01-neb-2024.json`)
 * inside a `-notes` class tree.
 *
 * Both halves of that test are needed. The filename alone also matches
 * `class-11/physics/thermodynamics/pyqs/01-neb-2023.json`, which sits in the
 * older `class-11/` tree and stores its questions under a different schema — so
 * scoping to `-notes` keeps the gate about the family this script actually owns
 * instead of permanently red over a file it must not rewrite.
 */
const CANONICAL_BANK = /^\d{2}-neb-\d{4}\.json$/;
const OWNED_TREE = /^(?:class-11-notes|class-12-notes)\//;

function isCanonicalBank(rel) {
  return OWNED_TREE.test(rel) && CANONICAL_BANK.test(path.basename(rel));
}

const files = discoverPyqFiles();
if (files.length === 0) {
  console.error("pyq-register: no pyqs/*.json found — nothing to register");
  process.exit(2);
}

let failures = 0;
let totalAdded = 0;

for (const [i, target] of TARGETS.entries()) {
  const label = path.relative(ROOT, target).replaceAll(path.sep, "/");
  const index = readIndex(target, label);
  const added = [];
  const empty = [];
  const legacy = [];

  for (const rel of files) {
    const body = JSON.parse(fs.readFileSync(path.join(CORPUS, rel), "utf8"));
    const questions = Array.isArray(body.questions) ? body.questions : [];
    const current = index[rel];

    if (questions.length === 0) {
      // A bank with no questions is exactly the silent failure this script is
      // about — but only for a bank that CLAIMS to be one. The corpus also holds
      // an older exam-bank family (`01-neb-style-questions.json`,
      // `c-q-and-mcq.json`, the `class-11/<subject>/pyqs/` trees) that stores its
      // questions under a different schema entirely. Those are reported as a
      // count and never fail the gate: failing on them would keep `--check` red
      // forever over files this script must not rewrite.
      if (isCanonicalBank(rel)) empty.push(rel);
      else legacy.push(rel);
      continue;
    }
    if (current && Array.isArray(current.questions) && current.questions.length > 0) continue;
    index[rel] = body;
    added.push(rel);
  }

  if (empty.length) {
    console.error(`  × ${empty.length} canonical bank(s) carry no questions:`);
    for (const rel of empty.slice(0, 5)) console.error(`      ${rel}`);
    failures += empty.length;
  }
  if (legacy.length) {
    console.log(
      `${label}: ${legacy.length} legacy bank(s) skipped (older schema, not registered here)`,
    );
  }

  if (added.length) {
    totalAdded += added.length;
    console.log(`${label}: ${added.length} bank(s) ${CHECK ? "MISSING" : "added"}`);
    if (DRY || CHECK) {
      for (const rel of added.slice(0, 10)) console.log(`   + ${rel}`);
      if (added.length > 10) console.log(`   … and ${added.length - 10} more`);
    }
    if (CHECK) {
      failures += added.length;
      continue;
    }
    if (!DRY) {
      fs.writeFileSync(target, serialise(index), "utf8");
    }
  } else {
    console.log(`${label}: up to date (${Object.keys(index).length} keys)`);
  }
}

console.log("");
if (CHECK) {
  if (failures) {
    console.error(`pyq-register --check FAILED — ${failures} problem(s). Run without --check to fix.`);
    process.exit(1);
  }
  console.log(`pyq-register --check passed — all ${files.length} bank(s) registered in both indexes.`);
  process.exit(0);
}
if (DRY) {
  console.log(`pyq-register --dry-run — ${totalAdded} bank(s) would be added across ${TARGETS.length} index file(s).`);
  process.exit(0);
}
console.log(`pyq-register: ${totalAdded} bank(s) added across ${TARGETS.length} index file(s); ${files.length} on disk.`);
