#!/usr/bin/env node
/**
 * audit-empty-scopes — one report of every UNFILLED area of the project.
 *
 * "Empty scope" = a syllabus unit that would still render generic/template
 * content to a student, at any layer that can render:
 *
 *   1. runtime notes   frontend/public/data/syllabus-notes/<subject>/<unit>/
 *   2. source notes    content/ravikishan/<class>/<subject>/<unit>/concepts/
 *   3. mindmap trees   UNIT_CONCEPTS (authored) vs HIGH_YIELD_TOPIC_BANK
 *   4. mindmap depth   the exceptional / fact / exam / trap packs
 *
 * `rails/` card files are NOT a rendered layer: draft cards never stream
 * (loader skips them — see frontend/lib/home-rails-corpus.ts), so counting
 * their TODO skeletons here would false-positive every clean unit an agent
 * scaffolds. Rail readiness is gated instead by
 * `npx tsx frontend/scripts/content/home-rails.ts --check`.
 *
 * A note file counts as AUTHORED only if it has >= 4 notes AND zero template
 * markers. Anything less is a scope a student can see as filler.
 */
import fs from "node:fs";
import path from "node:path";

const ARGS = process.argv.slice(2);
const STRICT = ARGS.includes("--strict");
const WRITE_BASELINE = ARGS.includes("--write-baseline");
const BASELINE_PATH = path.join(process.cwd(), "scripts", "empty-scopes-baseline.json");

const PUB = path.join(process.cwd(), "frontend", "public", "data", "syllabus-notes");
const RK = path.join(process.cwd(), "content", "ravikishan");
const LIB = path.join(process.cwd(), "frontend", "lib");

/** Template markers left behind by the generator. Case-insensitive. */
const MARKERS = [
  "class 11 concept",
  "key point 1",
  "key formula 1",
  "option a describing",
  "[insert",
  "[variable formula]",
  "placeholder",
  "run content generation",
  "connects to other topics",
  "distinguish concepts in",
  "check formula conditions",
  "solve 5 problems on",
  "derive the key formula for",
  "appears in exams",
  "foundational for advanced topics",
  "daily life use of",
  "core principle of",
  "check conditions for",
  "significant marks",
  "correct definition",
  "related concept",
  "incorrect description",
  "numerical problem on",
  "key formula for",
  "learn definitions, formulas, practice",
];

const MIN_NOTES = 4;

function markerHits(text) {
  const low = text.toLowerCase();
  let n = 0;
  for (const m of MARKERS) if (low.includes(m)) n++;
  return n;
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const f = path.join(d, e.name);
      if (e.isDirectory()) {
        // mindmap/ has its own validators; rails/ cards never render until
        // ready (drafts are TODO skeletons by design — see header comment).
        if (e.name !== "mindmap" && e.name !== "rails") walk(f);
      } else if (e.name.endsWith(".json") && e.name !== "plan.json" && !e.name.startsWith("_")) {
        out.push(f);
      }
    }
  })(dir);
  return out;
}

function auditUnitDir(dir) {
  const res = { total: 0, authored: 0, placeholder: 0, broken: 0, thin: 0 };
  for (const f of listFiles(dir)) {
    res.total++;
    let raw, d;
    try {
      raw = fs.readFileSync(f, "utf8");
      d = JSON.parse(raw);
    } catch {
      res.broken++;
      continue;
    }
    const notes = Array.isArray(d.notes) ? d.notes.length : 0;
    if (markerHits(raw) > 0) res.placeholder++;
    else if (notes < MIN_NOTES) res.thin++;
    else res.authored++;
  }
  return res;
}

/** Collect 2-to-6-space-indented object keys from a source file. */
function harvestKeys(file, minIndent = 2, maxIndent = 6) {
  const p = path.join(LIB, file);
  const set = new Set();
  if (!fs.existsSync(p)) return set;
  const re = new RegExp("^[ ]{" + minIndent + "," + maxIndent + "}\"([a-z0-9-]+)\"\\s*:\\s*\\{");
  for (const raw of fs.readFileSync(p, "utf8").split("\n")) {
    const m = re.exec(raw.trimEnd());
    if (m) set.add(m[1]);
  }
  return set;
}

/** The fact bank is an ARRAY, so its units come from each `unitSlugs: [...]`. */
function harvestUnitSlugs(file) {
  const p = path.join(LIB, file);
  const set = new Set();
  if (!fs.existsSync(p)) return set;
  const src = fs.readFileSync(p, "utf8");
  const re = /unitSlugs:\s*\[([^\]]*)\]/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    for (const q of m[1].matchAll(/"([a-z0-9-]+)"/g)) set.add(q[1]);
  }
  return set;
}

// ── gather note scopes ─────────────────────────────────────────────────────
const pubUnits = new Map();
if (fs.existsSync(PUB)) {
  for (const subject of fs.readdirSync(PUB)) {
    const sdir = path.join(PUB, subject);
    if (!fs.statSync(sdir).isDirectory()) continue;
    for (const unit of fs.readdirSync(sdir)) {
      const dir = path.join(sdir, unit);
      if (!fs.statSync(dir).isDirectory()) continue;
      pubUnits.set(`${subject}/${unit}`, { ...auditUnitDir(dir), layer: "runtime" });
    }
  }
}

const rkUnits = new Map();
if (fs.existsSync(RK)) {
  for (const cls of fs.readdirSync(RK)) {
    const cdir = path.join(RK, cls);
    if (!fs.statSync(cdir).isDirectory()) continue;
    for (const subject of fs.readdirSync(cdir)) {
      const sdir = path.join(cdir, subject);
      if (!fs.statSync(sdir).isDirectory()) continue;
      for (const unit of fs.readdirSync(sdir)) {
        const dir = path.join(sdir, unit);
        if (!fs.statSync(dir).isDirectory()) continue;
        rkUnits.set(`${cls}/${subject}/${unit}`, { ...auditUnitDir(dir), layer: "source" });
      }
    }
  }
}

// ── mindmap layer ──────────────────────────────────────────────────────────
const authoredUnits = harvestKeys("visual-concept-map.tsx", 2, 2);
const bankUnits = harvestUnitSlugs("high-yield-topic-facts.ts");
const depthUnits = new Set();
for (const f of fs.readdirSync(LIB)) {
  if (!f.startsWith("mindmap-depth-") || !f.endsWith(".ts")) continue;
  if (f.includes("-fb-") || f.includes("-index")) continue;
  for (const k of harvestKeys(f, 2, 2)) depthUnits.add(k);
}

// ── classify ──────────────────────────────────────────────────────────────
const STATE = (s) => {
  if (s.total === 0) return "NO_FILES";
  if (s.broken) return "BROKEN";
  if (s.placeholder === s.total) return "PLACEHOLDER_ONLY";
  if (s.authored === s.total) return "CLEAN";
  if (s.placeholder > 0) return "MIXED";
  return "THIN";
};
const ORDER = { NO_FILES: 0, BROKEN: 1, PLACEHOLDER_ONLY: 2, MIXED: 3, THIN: 4, CLEAN: 5 };
const rows = [...pubUnits, ...rkUnits].map(([key, s]) => ({ ...s, key, state: STATE(s) }));
rows.sort((a, b) => ORDER[a.state] - ORDER[b.state] || a.total - b.total || a.key.localeCompare(b.key));

console.log("=".repeat(106));
console.log("EMPTY SCOPE AUDIT");
console.log("=".repeat(106));

const byState = {};
for (const r of rows) (byState[r.state] ||= []).push(r);

console.log("");
console.log("NOTE-CONTENT SCOPES  (runtime + source trees)");
console.log("-".repeat(106));
console.log("state".padEnd(18) + "runtime".padStart(9) + "source".padStart(8) + "    authored/placeholder/thin");
console.log("-".repeat(106));
for (const st of ["NO_FILES", "BROKEN", "PLACEHOLDER_ONLY", "MIXED", "THIN", "CLEAN"]) {
  const g = byState[st] || [];
  const sum = (k) => g.reduce((n, r) => n + r[k], 0);
  console.log(
    st.padEnd(18) +
      String(g.filter((r) => r.layer === "runtime").length).padStart(9) +
      String(g.filter((r) => r.layer === "source").length).padStart(8) +
      `    ${sum("authored")} / ${sum("placeholder")} / ${sum("thin")}`
  );
}
console.log("-".repeat(106));

for (const st of ["NO_FILES", "BROKEN", "PLACEHOLDER_ONLY", "MIXED", "THIN"]) {
  const g = byState[st] || [];
  if (!g.length) continue;
  console.log("");
  console.log(`### ${st}  (${g.length})`);
  for (const r of g) {
    console.log(
      `   ${r.key.padEnd(56)} ${String(r.authored).padStart(3)} ok ${String(r.placeholder).padStart(3)} ph ${String(r.thin).padStart(3)} thin  (${r.total} files)`
    );
  }
}
console.log("");
console.log("=".repeat(106));
console.log("MINDMAP SCOPES");
console.log("-".repeat(106));
console.log(`UNIT_CONCEPTS authored per-unit trees : ${authoredUnits.size}`);
console.log(`HIGH_YIELD_TOPIC_BANK fact-bank units: ${bankUnits.size}`);
console.log(`mindmap depth packs registered        : ${depthUnits.size}`);

const allMindmap = new Set([...authoredUnits, ...bankUnits]);
const noDepth = [...allMindmap].filter((u) => !depthUnits.has(u)).sort();
const bare = noDepth.filter((u) => !authoredUnits.has(u));
console.log("");
console.log(`units WITHOUT an authored UNIT_CONCEPTS tree : ${allMindmap.size - authoredUnits.size} of ${allMindmap.size}`);
console.log(`units WITHOUT a mindmap depth pack           : ${noDepth.length} of ${allMindmap.size}`);
console.log("");
console.log(`fully generic (no authored tree AND no depth pack): ${bare.length}`);
for (const u of bare) console.log("   " + u);

const noteUnitSlugs = new Set([...pubUnits.keys()].map((k) => k.split("/")[1]));
const orphanMindmap = [...noteUnitSlugs].filter((u) => !allMindmap.has(u)).sort();
console.log("");
console.log(`note units with NO mindmap entry at all (subject-level fallback): ${orphanMindmap.length}`);
for (const u of orphanMindmap) console.log("   " + u);

const tot = (k) => rows.reduce((n, r) => n + r[k], 0);
console.log("");
console.log("=".repeat(106));
console.log(
  `TOTALS  files=${tot("total")}  authored=${tot("authored")}  placeholder=${tot("placeholder")}  thin=${tot("thin")}  broken=${tot("broken")}`
);
console.log(`EMPTY / PARTIAL note scopes: ${rows.filter((r) => r.state !== "CLEAN").length} of ${rows.length}`);
console.log("=".repeat(106));

// ── gate: baseline / strict ────────────────────────────────────────────────
// Today's empties are known and tracked. The gate blocks the list from
// GROWING: it fails only if a scope that was clean becomes unclean, or if the
// total placeholder count rises. Shrinking the list always passes.
const current = {
  placeholderFiles: tot("placeholder"),
  brokenFiles: tot("broken"),
  uncleanScopes: rows.filter((r) => r.state !== "CLEAN").length,
  cleanScopes: rows.filter((r) => r.state === "CLEAN").map((r) => r.key).sort(),
};

if (WRITE_BASELINE) {
  fs.writeFileSync(BASELINE_PATH, JSON.stringify(current, null, 2) + "\n", "utf8");
  console.log(`baseline written -> ${path.relative(process.cwd(), BASELINE_PATH)}`);
  process.exit(0);
}

if (STRICT) {
  if (!fs.existsSync(BASELINE_PATH)) {
    console.log("");
    console.log("GATE: no baseline found. Run `npm run audit:scopes -- --write-baseline` once.");
    process.exit(1);
  }
  const base = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
  const failures = [];

  if (current.placeholderFiles > base.placeholderFiles) {
    failures.push(
      `placeholder files rose: ${base.placeholderFiles} -> ${current.placeholderFiles} (+${current.placeholderFiles - base.placeholderFiles})`
    );
  }
  if (current.brokenFiles > base.brokenFiles) {
    failures.push(`broken files rose: ${base.brokenFiles} -> ${current.brokenFiles}`);
  }
  const baseClean = new Set(base.cleanScopes ?? []);
  const nowClean = new Set(current.cleanScopes);
  const newlyDirty = [...baseClean].filter((k) => !nowClean.has(k)).sort();
  if (newlyDirty.length) {
    failures.push(`scopes that were CLEAN are no longer clean (${newlyDirty.length}): ${newlyDirty.join(", ")}`);
  }

  console.log("");
  console.log("=".repeat(106));
  if (failures.length) {
    console.log("GATE: FAIL");
    for (const f of failures) console.log("  - " + f);
    console.log("=".repeat(106));
    process.exit(1);
  }
  const improved = base.placeholderFiles - current.placeholderFiles;
  console.log(
    `GATE: PASS  (placeholder ${current.placeholderFiles}/${base.placeholderFiles}` +
      (improved > 0 ? `, improved by ${improved})` : ")")
  );
  console.log("=".repeat(106));
}

