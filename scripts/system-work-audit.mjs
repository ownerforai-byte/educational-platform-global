#!/usr/bin/env node
/**
 * system-work-audit — keeps SYSTEM_WORK_TRACKER.md honest about the surface it
 * counts, the same way content-ledger-live keeps the content registry honest.
 *
 *   node scripts/system-work-audit.mjs            # report
 *   node scripts/system-work-audit.mjs --write    # refresh the tracker's block
 *   node scripts/system-work-audit.mjs --check    # fail when the tracker is stale
 *
 * What is dynamic (recomputed here, never hand-written): page count, mounted
 * /api route groups, workflow count, test-file counts, the content ledger's
 * authored/template split, unclaimed notes, supplementary claims, script count,
 * and whether every evidence path the tracker names still exists.
 *
 * What is NOT here: the workstream status (live / in progress / partial). That
 * is a human judgement; the audit only proves the numbers and paths underneath
 * it, so a status can never be backed by a path that was deleted.
 *
 * Dependency-free on purpose: it must run in CI without installing anything.
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TRACKER = path.join(ROOT, "SYSTEM_WORK_TRACKER.md");
const START = "<!-- system-audit:start -->";
const END = "<!-- system-audit:end -->";

const WRITE = process.argv.includes("--write");
const CHECK = process.argv.includes("--check");

const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/");

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      walk(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

const count = (dir, test) => walk(path.join(ROOT, dir)).filter((f) => test(rel(f))).length;

// ── dynamic surface facts ────────────────────────────────────────────────────
const frontendPages = count("frontend/app", (f) => f.endsWith("page.tsx"));
const backendApiModules = walk(path.join(ROOT, "backend/src/api")).filter((f) =>
  f.endsWith(".ts"),
).length;

const appTs = readFileSync(path.join(ROOT, "backend/src/app.ts"), "utf8");
const apiGroups = [
  ...new Set(
    [...appTs.matchAll(/app\.use\(\s*"(\/api[^"]*)"/g)].map((m) => m[1]),
  ),
].sort();

const workflows = walk(path.join(ROOT, ".github/workflows")).filter((f) =>
  f.endsWith(".yml"),
).length;

const frontendTests = count("frontend/tests", (f) => /\.test\.tsx?$/.test(f));
const backendTests = count("backend/tests", (f) => /\.test\.ts$/.test(f));
const auditScripts = walk(path.join(ROOT, "scripts")).filter((f) =>
  /\.(mjs|cjs|js|py|ts)$/.test(f),
).length;

const ledger = JSON.parse(
  readFileSync(path.join(ROOT, "frontend/public/data/content-ledger.json"), "utf8"),
);
const contentEntries = ledger.totals.entries;
const contentAuthored = ledger.totals.authored;
const contentTemplate = ledger.totals.template;
const unclaimed = ledger.orphans?.totals?.entries ?? 0;
const supplementary = ledger.supplementary?.totals?.claims ?? 0;
const supplementaryTemplate = ledger.supplementary?.totals?.template ?? 0;

// ── evidence paths the tracker leans on ─────────────────────────────────────
const EVIDENCE = [
  "frontend/app/page.tsx",
  "frontend/app/(app)/home/page.tsx",
  "frontend/app/(app)/class-11-notes/page.tsx",
  "frontend/app/(app)/class-12-notes/page.tsx",
  "frontend/app/(app)/levels/page.tsx",
  "backend/src/api/pyqs.ts",
  "frontend/app/(app)/pdfs/page.tsx",
  "frontend/app/(app)/lab/page.tsx",
  "frontend/app/(app)/graphs/page.tsx",
  "frontend/app/(app)/derivations/page.tsx",
  "frontend/app/(app)/theorems/page.tsx",
  "frontend/app/(app)/knowledge/page.tsx",
  "frontend/app/(app)/loksewa/page.tsx",
  "frontend/app/(app)/world-knowledge/page.tsx",
  "frontend/app/(app)/ai/tutor/page.tsx",
  "frontend/app/(app)/search/page.tsx",
  "frontend/app/(app)/progress/page.tsx",
  "frontend/app/(app)/notes/page.tsx",
  "frontend/app/owner/page.tsx",
  "frontend/features/credits/constants.ts",
  "frontend/features/syllabus/queries.ts",
  "frontend/lib/topic-content-index.ts",
  "backend/src/app.ts",
  "backend/src/ai/curriculum-corpus.ts",
  "backend/src/jobs/creditsResetJob.ts",
  "backend/src/middleware/rateLimit.ts",
  "scripts/content-ledger-live.mjs",
  "scripts/content-health-check.mjs",
  "scripts/enrichment/rebuild-legacy-mindmaps.mjs",
  "frontend/public/data/content-ledger.json",
  "frontend/public/data/ravikishan/_index.json",
  ".github/workflows/ci.yml",
  ".github/workflows/live-smoke.yml",
];

const missing = EVIDENCE.filter((p) => !existsSync(path.join(ROOT, p)));

// ── generated block ─────────────────────────────────────────────────────────
const block = [
  START,
  `_Recomputed by \`node scripts/system-work-audit.mjs --write\`; \`--check\` fails when this block or any evidence path drifts._`,
  "",
  "| surface | count |",
  "| --- | ---: |",
  `| frontend pages (app router) | ${frontendPages} |`,
  `| backend API modules / mounted /api groups | ${backendApiModules} / ${apiGroups.length} |`,
  `| CI workflows | ${workflows} |`,
  `| test files (frontend / backend) | ${frontendTests} / ${backendTests} |`,
  `| content entries (authored / template) | ${contentEntries} (${contentAuthored} / ${contentTemplate}) |`,
  `| unclaimed note files | ${unclaimed} |`,
  `| supplementary claims (template) | ${supplementary} (${supplementaryTemplate}) |`,
  `| script files under scripts/ (mjs/cjs/js/py/ts) | ${auditScripts} |`,
  `| evidence paths named below that exist | ${EVIDENCE.length - missing.length} / ${EVIDENCE.length} |`,
  END,
].join("\n");

if (CHECK || WRITE) {
  if (!existsSync(TRACKER)) {
    console.error(`system-work-audit: ${rel(TRACKER)} does not exist.`);
    process.exit(1);
  }
  const text = readFileSync(TRACKER, "utf8");
  const from = text.indexOf(START);
  const to = text.indexOf(END);
  if (from < 0 || to < 0 || to < from) {
    console.error(`system-work-audit: ${rel(TRACKER)} has no ${START} … ${END} block.`);
    process.exit(1);
  }
  const current = text.slice(from, to + END.length);
  if (WRITE) {
    writeFileSync(TRACKER, text.slice(0, from) + block + text.slice(to + END.length), "utf8");
    console.log(`system-work-audit: refreshed the tracker block (${frontendPages} pages).`);
  } else if (current !== block) {
    console.error("system-work-audit FAILED — the tracker's numbers are stale:");
    const expected = block.split("\n");
    const actual = current.split("\n");
    for (let i = 0; i < Math.max(expected.length, actual.length); i++) {
      if (expected[i] !== actual[i]) console.error(`  line ${i + 1}:\n    tracker: ${actual[i] ?? "(missing)"}\n    audit:   ${expected[i] ?? "(missing)"}`);
    }
    process.exit(1);
  } else {
    console.log("system-work-audit passed — tracker numbers match the tree.");
  }
}

if (missing.length) {
  // Missing evidence is fatal in every mode: a workstream described by a path
  // that no longer exists is exactly the drift this audit exists to catch.
  for (const p of missing) console.error(`  × evidence path is missing: ${p}`);
  process.exit(1);
}

if (!CHECK && !WRITE) {
  console.log(`system-work-audit — ${frontendPages} frontend pages, ${apiGroups.length} mounted /api groups, ` +
    `${frontendTests}/${backendTests} test files, ${contentEntries} content entries ` +
    `(${contentAuthored} authored / ${contentTemplate} template), ${missing.length} missing evidence paths.`);
}
