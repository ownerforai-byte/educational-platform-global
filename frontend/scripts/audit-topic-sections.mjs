/**
 * Topic-page section completeness audit.
 *
 * The topic workspace (components/content/topic-vertical-notes.tsx) reads a set
 * of sections straight off the TOP LEVEL of each concept JSON. A file missing
 * any of them renders with a blank panel, so this script lists every gap.
 *
 * It also flags the three failure modes that are easy to introduce and
 * invisible in review:
 *   - `enrichedContent` shadows: the UI never reads that object, so a section
 *     written only inside it looks present on disk but is dead on the page.
 *   - boilerplate strings the UI actively filters out via isBoilerplate().
 *   - mcs[].answer that does not point at the correct option position.
 *
 * Usage:  node scripts/audit-topic-sections.mjs           # list every gap
 *         node scripts/audit-topic-sections.mjs --quiet  # exit 1 if any gap
 */

import { readdir, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "data", "syllabus-notes");

/** Sections the topic workspace reads. Missing any one renders an empty panel. */
const REQUIRED = [
  "summary",
  "importantConcepts",
  "importantStatements",
  "importantTasks",
  "keyPoints",
  "specialNotes",
  "examShortTricks",
  "examNotes",
  "practiceQuestions",
  "mcs",
];

/** Mirrors isBoilerplate() in components/content/topic-vertical-notes.tsx. */
function isBoilerplate(text) {
  if (!text) return true;
  return (
    /^Key Formula \d+:/i.test(text) ||
    /^Key Point \d+:/i.test(text) ||
    /^Example \d+:/i.test(text) ||
    /^Q\d+\.\s*(Define and explain|Solve problems|Differentiate between|Derive the key formula|What are the applications)/i.test(
      text,
    )
  );
}

async function* conceptFiles(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* conceptFiles(full);
    } else if (entry.name.endsWith(".json") && entry.name !== "_manifest.json") {
      yield full;
    }
  }
}

/** Count real entries in a section; treat empty strings and boilerplate as absent. */
function populated(value) {
  if (value == null) return 0;
  if (typeof value === "string") return value.trim() ? 1 : 0;
  if (Array.isArray(value)) return value.filter((v) => !isBoilerplate(String(v))).length;
  return Object.keys(value).length ? 1 : 0;
}

const files = [];
for await (const file of conceptFiles(ROOT)) files.push(file);
files.sort();

const problems = [];
let complete = 0;

for (const file of files) {
  const rel = file.slice(ROOT.length + 1).replace(/\\/g, "/");
  let json;
  try {
    json = JSON.parse(await readFile(file, "utf8"));
  } catch (err) {
    problems.push({ rel, kind: "PARSE_FAIL", detail: String(err.message ?? err) });
    continue;
  }

  const missing = REQUIRED.filter((key) => populated(json[key]) === 0);

  // A section present only inside enrichedContent is invisible on the page.
  const shadowed = missing.filter(
    (key) => json.enrichedContent && populated(json.enrichedContent[key]) > 0,
  );

  if (missing.length === 0) {
    complete++;
  } else {
    problems.push({ rel, kind: "MISSING", detail: missing.join(", ") });
  }
  if (shadowed.length) {
    problems.push({ rel, kind: "SHADOWED", detail: shadowed.join(", ") });
  }

  // A `mcs[].answer` that carries prose after the letter ("A (s₃ = ...)") is
  // correct to read but breaks every consumer that matches the answer letter
  // positionally. Normalise to the bare letter and keep the working in a
  // sibling `explanation` field so nothing is lost.
  if (Array.isArray(json.mcs)) {
    json.mcs.forEach((mc, i) => {
      if (!Array.isArray(mc.options) || !mc.options.length) {
        problems.push({ rel, kind: "MC_NO_OPTIONS", detail: `mcs[${i}]` });
        return;
      }
      const raw = String(mc.answer ?? "").trim();
      const letter = raw.charAt(0).toUpperCase();
      const idx = "ABCD".indexOf(letter);
      if (idx < 0) {
        problems.push({ rel, kind: "MC_BAD_ANSWER", detail: `mcs[${i}] answer=${mc.answer}` });
        return;
      }
      if (raw.length > 1) {
        problems.push({ rel, kind: "MC_ANSWER_HAS_PROSE", detail: `mcs[${i}] "${raw}"` });
      }
      if (idx >= mc.options.length) {
        problems.push({ rel, kind: "MC_ANSWER_OUT_OF_RANGE", detail: `mcs[${i}] ${letter} vs ${mc.options.length} options` });
      }
    });
  }
}

const quiet = process.argv.includes("--quiet");

if (!quiet) {
  console.log(`scanned ${files.length} topic files — ${complete} complete, ${problems.length} problems\n`);
  const byKind = new Map();
  for (const p of problems) {
    const key = p.kind === "MISSING" ? "MISSING (sections absent at top level)" : p.kind;
    if (!byKind.has(key)) byKind.set(key, []);
    byKind.get(key).push(p);
  }
  for (const [kind, list] of [...byKind].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`${kind}: ${list.length}`);
    for (const p of list.slice(0, 40)) console.log(`  ${p.rel} :: ${p.detail}`);
    if (list.length > 40) console.log(`  ... and ${list.length - 40} more`);
    console.log("");
  }
} else if (problems.length) {
  console.error(`topic section audit FAILED: ${problems.length} problems`);
  process.exit(1);
} else {
  console.log(`topic section audit OK: all ${files.length} files complete`);
}
