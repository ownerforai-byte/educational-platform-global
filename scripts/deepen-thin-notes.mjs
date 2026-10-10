#!/usr/bin/env node
/**
 * deepen-thin-notes — apply the authored NEB notes in scripts/deepen-data-*.mjs
 * onto the corpus sources, replacing each target file's `notes` array in place.
 *
 * Why: gate-blocking thin files (< 4 notes after generator-frame stripping) and
 * thin merge survivors carry either template frames or wrong-topic "Fact."
 * lines (calculus facts in the Rutherford file). Only `notes` is replaced —
 * every other field (title, mcqs, questions, enrichedContent, …) is preserved.
 *
 * Usage:
 *   node scripts/deepen-thin-notes.mjs            # apply
 *   node scripts/deepen-thin-notes.mjs --check    # verify applied (notes match)
 *
 * Target resolution: each data entry names a source path PREFIX under
 * content/ravikishan/; the script requires exactly one matching concepts/*.json
 * file so a typo can never silently write to the wrong file.
 */
import fs from "node:fs";
import path from "node:path";
import biology from "./deepen-data-biology.mjs";
import chemistry from "./deepen-data-chemistry.mjs";
import engPhyMath from "./deepen-data-eng-phy-math.mjs";
import regressedScopes from "./deepen-data-regressed-scopes.mjs";

const ROOT = "content/ravikishan";
const CHECK = process.argv.includes("--check");
const JOBS = [...biology, ...chemistry, ...engPhyMath, ...regressedScopes];

function resolve(prefix) {
  const dir = path.join(ROOT, path.dirname(prefix));
  const base = path.basename(prefix);
  if (!fs.existsSync(dir)) return { error: `no dir ${dir}` };
  // Exact filename wins outright — several units carry near-duplicate files
  // (03-elastic-modulus.json vs 03-elastic-modulus-young-….json), so a bare
  // prefix would be ambiguous. Entries may therefore give the full stem.
  if (fs.existsSync(path.join(dir, base + ".json"))) return { file: path.join(dir, base + ".json") };
  const matches = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json") && f.slice(0, -5).startsWith(base));
  if (matches.length === 0) return { error: `no file starting "${base}" in ${dir}` };
  if (matches.length > 1) return { error: `ambiguous prefix "${base}": ${matches.join(", ")}` };
  return { file: path.join(dir, matches[0]) };
}

let ok = 0;
const problems = [];
for (const job of JOBS) {
  const r = resolve(job.file);
  if (r.error) {
    problems.push(`${job.file}: ${r.error}`);
    continue;
  }
  const raw = fs.readFileSync(r.file, "utf8");
  const d = JSON.parse(raw);
  const current = Array.isArray(d.notes) ? d.notes : [];
  const same =
    current.length === job.notes.length &&
    job.notes.every((n, i) => current[i] === n);
  if (CHECK) {
    if (same) ok++;
    else problems.push(`${r.file}: notes differ (${current.length} on disk vs ${job.notes.length} authored)`);
    continue;
  }
  d.notes = job.notes;
  fs.writeFileSync(r.file, JSON.stringify(d, null, 2) + "\n", "utf8");
  ok++;
}

const mode = CHECK ? "verified" : "updated";
console.log(`deepen-thin-notes: ${mode} ${ok}/${JOBS.length} files`);
if (problems.length) {
  console.log("PROBLEMS:");
  for (const p of problems) console.log("  - " + p);
  process.exit(1);
}
