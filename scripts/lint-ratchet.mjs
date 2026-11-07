#!/usr/bin/env node
/**
 * lint-ratchet — stop the React Compiler lint backlog from growing.
 *
 *   node scripts/lint-ratchet.mjs                   # gate: fail on NEW findings
 *   node scripts/lint-ratchet.mjs --write-baseline # record current counts
 *
 * frontend/eslint.config.mjs downgrades seven react-hooks v7 rules to "warn"
 * because the repo inherited ~187 findings it has never enforced. Warnings alone
 * do not stop the next 187 from landing. This gate records the current counts in
 * scripts/lint-ratchet-baseline.json and fails when a rule total, a file total,
 * or the overall total goes UP. Counts may go DOWN freely: fixing a finding
 * ratchets the ceiling down for good once --write-baseline is re-run.
 *
 * It also fails on any real (severity 2) ESLint error, so the gate is meaningful
 * even if `npm run lint` is ever skipped.
 */
import { spawnSync } from "node:child_process";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FRONTEND = path.join(ROOT, "frontend");
const BASELINE = path.join(ROOT, "scripts", "lint-ratchet-baseline.json");
const WRITE = process.argv.includes("--write-baseline");

/** Must stay in sync with the "warn" block in frontend/eslint.config.mjs. */
const RULES = [
  "react-hooks/set-state-in-effect",
  "react-hooks/refs",
  "react-hooks/immutability",
  "react-hooks/purity",
  "react-hooks/static-components",
  "react-hooks/preserve-manual-memoization",
  "react-hooks/globals",
];
const RULE_SET = new Set(RULES);

/** Pure comparison so the gate can be tested without a 5-minute lint scan. */
function findProblems(current, baseline, hardErrors = []) {
  const problems = [];
  for (const rule of RULES) {
    const before = baseline.rules?.[rule] ?? 0;
    if (current.rules[rule] > before) {
      problems.push(`rule ${rule}: ${before} -> ${current.rules[rule]}`);
    }
  }
  for (const [file, count] of Object.entries(current.files)) {
    const before = baseline.files?.[file] ?? 0;
    if (count > before) {
      problems.push(`file ${file}: ${before} -> ${count}`);
    }
  }
  if (current.total > (baseline.total ?? 0)) {
    problems.push(`total: ${baseline.total} -> ${current.total}`);
  }
  for (const error of hardErrors.slice(0, 20)) {
    problems.push(`eslint error ${error}`);
  }
  if (hardErrors.length > 20) {
    problems.push(`...and ${hardErrors.length - 20} more ESLint errors`);
  }
  return problems;
}

if (process.argv.includes("--self-test")) {
  const sample = {
    rules: Object.fromEntries(RULES.map((rule) => [rule, 2])),
    total: RULES.length * 2,
    files: { "frontend/app/example.tsx": RULES.length * 2 },
  };
  const increased = {
    ...sample,
    rules: { ...sample.rules, [RULES[0]]: 3 },
    total: sample.total + 1,
    files: { ...sample.files, "frontend/app/example.tsx": sample.total + 1 },
  };
  const newFile = {
    ...sample,
    total: sample.total + 1,
    files: { ...sample.files, "frontend/app/new.tsx": 1 },
  };
  const decreased = {
    ...sample,
    rules: { ...sample.rules, [RULES[0]]: 1 },
    total: sample.total - 1,
    files: { ...sample.files, "frontend/app/example.tsx": sample.total - 1 },
  };
  assert.deepEqual(findProblems(sample, sample), [], "unchanged counts must pass");
  assert.ok(findProblems(increased, sample).length > 0, "a raised rule count must fail");
  assert.ok(findProblems(newFile, sample).length > 0, "a new file with findings must fail");
  assert.deepEqual(findProblems(decreased, sample), [], "fewer findings must pass");
  assert.ok(findProblems(sample, sample, ["x.tsx:1 no-undef: x"]).length > 0, "real eslint errors must fail");
  console.log("lint-ratchet: self-test PASS (unchanged / increase / new file / decrease / hard error)");
  process.exit(0);
}

const lint = spawnSync("npx", ["eslint", ".", "-f", "json"], {
  cwd: FRONTEND,
  encoding: "utf8",
  maxBuffer: 64 * 1024 * 1024,
  shell: process.platform === "win32",
});

let reports;
try {
  reports = JSON.parse(lint.stdout);
} catch {
  console.error("lint-ratchet: could not parse ESLint JSON output.");
  console.error(String(lint.stderr || "").slice(0, 2000));
  process.exit(1);
}
if (!Array.isArray(reports)) {
  console.error("lint-ratchet: ESLint did not return a results array.");
  process.exit(1);
}

const counts = Object.fromEntries(RULES.map((rule) => [rule, 0]));
const files = {};
const hardErrors = [];

for (const file of reports) {
  const rel = path.relative(ROOT, file.filePath).replace(/\\/g, "/");
  for (const message of file.messages ?? []) {
    if (message.severity === 2 && !RULE_SET.has(message.ruleId)) {
      hardErrors.push(`${rel}:${message.line ?? 0} ${message.ruleId}: ${message.message}`);
    }
    if (RULE_SET.has(message.ruleId)) {
      counts[message.ruleId] += 1;
      files[rel] = (files[rel] ?? 0) + 1;
    }
  }
}

const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
const current = {
  note: "React Compiler lint findings baselined by scripts/lint-ratchet.mjs. Fix findings, then re-run with --write-baseline to lower the ceiling.",
  generatedAt: new Date().toISOString().slice(0, 10),
  rules: counts,
  total,
  files,
};

if (WRITE) {
  fs.writeFileSync(BASELINE, JSON.stringify(current, null, 2) + "\n", "utf8");
  console.log(`lint-ratchet: baseline written (${total} findings across ${Object.keys(files).length} files).`);
  process.exit(0);
}

if (!fs.existsSync(BASELINE)) {
  console.error("lint-ratchet: no baseline. Run `node scripts/lint-ratchet.mjs --write-baseline` once.");
  process.exit(1);
}

let baseline;
try {
  baseline = JSON.parse(fs.readFileSync(BASELINE, "utf8"));
} catch {
  console.error(`lint-ratchet: ${BASELINE} is not valid JSON. Re-run with --write-baseline.`);
  process.exit(1);
}

const problems = findProblems(current, baseline, hardErrors);

if (problems.length) {
  console.error(`lint-ratchet: GATE FAIL — ${problems.length} new problem(s):`);
  for (const problem of problems) console.error(`  - ${problem}`);
  console.error("Fix the findings; do not raise the baseline without a recorded reason.");
  process.exit(1);
}

const fixed = (baseline.total ?? 0) - total;
console.log(`lint-ratchet: GATE PASS — ${total} baselined findings (${fixed} fixed since baseline).`);
for (const rule of RULES) {
  if (counts[rule]) console.log(`  ${rule}: ${counts[rule]}`);
}
if (fixed > 0) {
  console.log("Re-run with --write-baseline to lock in the lower ceiling.");
}
