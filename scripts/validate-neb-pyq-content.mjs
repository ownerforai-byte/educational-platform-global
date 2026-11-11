#!/usr/bin/env node
/**
 * validate-neb-pyq-content — gate for the NEB PYQ guidance families.
 *
 *   node scripts/validate-neb-pyq-content.mjs            # structural gate
 *   node scripts/validate-neb-pyq-content.mjs --links    # + live link check (network)
 *   node scripts/validate-neb-pyq-content.mjs --drills-min 4
 *
 * Families validated (SOURCES.md is the rights ledger behind these rules):
 *   content/practice/pyq-links/<class>/<subject>.json   link-only paper index
 *   content/practice/blueprint/<class>/<subject>.json   CDC grid metadata
 *   content/practice/mistakes/<class>/<subject>.json    authored mistake guide
 *   content/drills/<class>/<subject>/<unit>/*.json      conceptual drills
 *
 * Hard rules enforced here:
 *   - pyq-links entries are `rights: "link-only"` and carry a https URL —
 *     paper text must never enter the repo (NEB papers are ⚠️).
 *   - blueprint unit slugs exist in `frontend/lib/syllabus.ts`; unverified
 *     numbers are flagged `verified: false` (no invented CDC data).
 *   - mistakes reference real syllabus unit slugs and carry wrong/why/fix.
 *   - drills carry question + solution and a syllabus unit slug; coverage is
 *     reported per unit against the --drills-min floor.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const ARGS = process.argv.slice(2);
const CHECK_LINKS = ARGS.includes("--links");
const minIdx = ARGS.indexOf("--drills-min");
const DRILLS_MIN = minIdx >= 0 ? Number(ARGS[minIdx + 1]) || 0 : 0;

const SUBJECTS = ["physics", "chemistry", "biology", "mathematics", "english", "nepali"];
const CLASSES = ["class-11", "class-12"];
const CLASS_TRACK = { "class-11": "class-11-notes", "class-12": "class-12-notes" };

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error(`  ✗ ${msg}`);
};
const ok = (msg) => console.log(`  ✓ ${msg}`);

// ── syllabus unit slugs (loaded from the TS source via tsx-free regex walk) ──
// The syllabus file is plain data; a regex pass over `id:` lines inside each
// subject block is enough for a parity gate and avoids a TS runtime dep.
function syllabusUnits() {
  const src = fs.readFileSync(path.join(ROOT, "frontend", "lib", "syllabus.ts"), "utf8");
  const map = {};
  // Split at subject blocks: `slug: "<subject>",` inside a class track.
  const classSplits = src.split(/slug: "class-1[12]-notes"/).slice(1);
  for (const [ci, classBody] of classSplits.entries()) {
    const cls = ci === 0 ? "class-11" : "class-12";
    for (const subject of SUBJECTS) {
      const subjectStart = classBody.indexOf(`slug: "${subject}"`);
      if (subjectStart < 0) continue;
      // Subject block ends at the next subject slug or the end of the class.
      let end = classBody.length;
      for (const other of SUBJECTS) {
        if (other === subject) continue;
        const at = classBody.indexOf(`slug: "${other}"`, subjectStart + 1);
        if (at > 0) end = Math.min(end, at);
      }
      const body = classBody.slice(subjectStart, end);
      const ids = [...body.matchAll(/^\s{10,14}id: "([a-z0-9-]+)",$/gm)].map((m) => m[1]);
      map[`${cls}/${subject}`] = ids;
    }
  }
  return map;
}

const UNITS = syllabusUnits();
for (const key of Object.keys(UNITS)) {
  if (UNITS[key].length === 0) fail(`syllabus walk found no units for ${key}`);
}
if (failures === 0) ok(`syllabus walk: ${Object.values(UNITS).reduce((n, u) => n + u.length, 0)} units across 12 subject-classes`);

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (err) {
    fail(`${path.relative(ROOT, file)} is not valid JSON — ${err.message}`);
    return null;
  }
}

// ── 1. pyq-links ──
console.log("\n── pyq-links ──");
const linkPaths = [];
for (const cls of CLASSES) {
  for (const subject of SUBJECTS) {
    const file = path.join(ROOT, "content", "practice", "pyq-links", cls, `${subject}.json`);
    if (!fs.existsSync(file)) {
      fail(`missing pyq-links file: practice/pyq-links/${cls}/${subject}.json`);
      continue;
    }
    const data = readJson(file);
    if (!data) continue;
    linkPaths.push(file);
    if (data.subject !== subject) fail(`${cls}/${subject}: subject field is "${data.subject}"`);
    const papers = Array.isArray(data.papers) ? data.papers : [];
    if (papers.length === 0) fail(`${cls}/${subject}: no papers listed`);
    for (const p of papers) {
      const at = `${cls}/${subject} ${p.year ?? "?"}`;
      if (p.rights !== "link-only") fail(`${at}: rights must be "link-only" (NEB papers are ⚠️ — never reproduce)`);
      if (typeof p.url !== "string" || !/^https:\/\//.test(p.url)) fail(`${at}: url must be an https link`);
      if (!Number.isFinite(p.year)) fail(`${at}: year missing`);
      if (!p.provider) fail(`${at}: provider credit missing`);
      if (!Array.isArray(p.units)) fail(`${at}: units array missing`);
    }
  }
}
if (failures === 0) ok(`${linkPaths.length}/12 pyq-link files valid (link-only, https, credited)`);

// ── 2. blueprint ──
console.log("\n── blueprint ──");
let blueprintFiles = 0;
for (const cls of CLASSES) {
  for (const subject of SUBJECTS) {
    const file = path.join(ROOT, "content", "practice", "blueprint", cls, `${subject}.json`);
    if (!fs.existsSync(file)) {
      fail(`missing blueprint file: practice/blueprint/${cls}/${subject}.json`);
      continue;
    }
    const data = readJson(file);
    if (!data) continue;
    blueprintFiles++;
    const units = Array.isArray(data.units) ? data.units : [];
    const known = UNITS[`${cls}/${subject}`] ?? [];
    if (units.length === 0) fail(`${cls}/${subject}: no units`);
    for (const u of units) {
      if (!known.includes(u.unit)) fail(`${cls}/${subject}: unit "${u.unit}" is not a syllabus slug`);
      if (!Array.isArray(u.concepts) || u.concepts.length === 0) fail(`${cls}/${subject}/${u.unit}: concepts missing`);
      if (u.verified === false && !u.provenance) {
        fail(`${cls}/${subject}/${u.unit}: unverified numbers need a provenance note`);
      }
      if (u.verified !== false && (u.marks !== undefined || u.questionTypes || u.cognitive)) {
        fail(`${cls}/${subject}/${u.unit}: marks/questionTypes/cognitive set without grid verification — set verified:false + provenance, or drop the numbers`);
      }
    }
    const missing = known.filter((id) => !units.some((u) => u.unit === id));
    if (missing.length > 0) fail(`${cls}/${subject}: blueprint missing syllabus units: ${missing.join(", ")}`);
  }
}
if (failures === 0) ok(`${blueprintFiles}/12 blueprint files valid (syllabus parity, no invented CDC numbers)`);

// ── 3. mistakes ──
console.log("\n── mistakes ──");
let mistakeFiles = 0;
for (const cls of CLASSES) {
  for (const subject of SUBJECTS) {
    const file = path.join(ROOT, "content", "practice", "mistakes", cls, `${subject}.json`);
    if (!fs.existsSync(file)) {
      fail(`missing mistakes file: practice/mistakes/${cls}/${subject}.json`);
      continue;
    }
    const data = readJson(file);
    if (!data) continue;
    mistakeFiles++;
    const known = UNITS[`${cls}/${subject}`] ?? [];
    if (!Array.isArray(data.examHall) || data.examHall.length < 3) {
      fail(`${cls}/${subject}: examHall needs at least 3 reminders`);
    }
    const mistakes = Array.isArray(data.mistakes) ? data.mistakes : [];
    if (mistakes.length < 8) fail(`${cls}/${subject}: needs ≥8 mistakes (has ${mistakes.length})`);
    for (const m of mistakes) {
      const at = `${cls}/${subject} ${m.id ?? "?"}`;
      if (!m.wrong || !m.why || !m.fix) fail(`${at}: wrong/why/fix all required`);
      if (!known.includes(m.unit)) fail(`${at}: unit "${m.unit}" is not a syllabus slug`);
    }
    if (Array.isArray(data.questions)) {
      for (const [i, q] of data.questions.entries()) {
        if (typeof q.question !== "string" || !q.question.trim()) {
          fail(`${cls}/${subject}: questions[${i}] empty`);
        }
      }
    }
  }
}
if (failures === 0) ok(`${mistakeFiles}/12 mistake guides valid (≥8 entries, real unit slugs)`);

// ── 4. drills ──
console.log("\n── drills ──");
const drillDir = path.join(ROOT, "content", "drills");
const coverage = {};
let drillFiles = 0;
let drillCount = 0;
for (const cls of CLASSES) {
  for (const subject of SUBJECTS) {
    const dir = path.join(drillDir, cls, subject);
    const known = UNITS[`${cls}/${subject}`] ?? [];
    const perUnit = {};
    if (fs.existsSync(dir)) {
      for (const unitDir of fs.readdirSync(dir, { withFileTypes: true })) {
        if (!unitDir.isDirectory()) continue;
        if (!known.includes(unitDir.name)) {
          fail(`drills/${cls}/${subject}/${unitDir.name}: not a syllabus unit slug`);
          continue;
        }
        const unitPath = path.join(dir, unitDir.name);
        let count = 0;
        for (const f of fs.readdirSync(unitPath)) {
          if (!f.endsWith(".json")) continue;
          const data = readJson(path.join(unitPath, f));
          if (!data) continue;
          drillFiles++;
          const qs = Array.isArray(data.questions) ? data.questions : [];
          for (const [i, q] of qs.entries()) {
            if (typeof q.question !== "string" || !q.question.trim()) {
              fail(`drills/${cls}/${subject}/${unitDir.name}/${f}: questions[${i}] empty question`);
            }
            if (typeof q.solution !== "string" || q.solution.trim().length < 40) {
              fail(`drills/${cls}/${subject}/${unitDir.name}/${f}: questions[${i}] needs a real solution`);
            }
          }
          count += qs.length;
          drillCount += qs.length;
        }
        perUnit[unitDir.name] = count;
      }
    }
    const missing = known.filter((id) => !perUnit[id]);
    for (const id of missing) perUnit[id] = 0;
    coverage[`${cls}/${subject}`] = perUnit;
  }
}

let underMin = 0;
for (const [key, perUnit] of Object.entries(coverage)) {
  for (const [unit, count] of Object.entries(perUnit)) {
    if (count < DRILLS_MIN) {
      underMin++;
      console.error(`  · ${key}/${unit}: ${count} drill(s) (floor ${DRILLS_MIN})`);
    }
  }
}
console.log(`  · ${drillFiles} drill files, ${drillCount} drills total`);
if (DRILLS_MIN > 0) {
  if (underMin > 0) {
    fail(`${underMin} units under the ${DRILLS_MIN}-drill floor`);
  } else {
    ok(`every syllabus unit has ≥${DRILLS_MIN} drills`);
  }
}

// ── 5. optional live link check ──
if (CHECK_LINKS) {
  console.log("\n── link check (live) ──");
  const urls = new Set();
  for (const file of linkPaths) {
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    for (const p of data.papers ?? []) urls.add(p.url);
  }
  let dead = 0;
  for (const url of [...urls].sort()) {
    try {
      const res = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(15_000) });
      if (res.status >= 400) {
        // Some hosts reject HEAD — retry with GET before calling it dead.
        const res2 = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(20_000) });
        if (res2.status >= 400) {
          fail(`${res2.status} ${url}`);
          dead++;
          continue;
        }
      }
      console.log(`  ✓ ${res.status} ${url}`);
    } catch (err) {
      fail(`unreachable ${url} — ${String(err.message).slice(0, 80)}`);
      dead++;
    }
  }
  if (dead === 0) ok(`all ${urls.size} paper links resolve`);
}

console.log(
  failures === 0
    ? `\nvalidate-neb-pyq-content: PASS${CHECK_LINKS ? " (incl. live links)" : ""}`
    : `\nvalidate-neb-pyq-content: ${failures} failure(s)`,
);
process.exit(failures === 0 ? 0 : 1);
