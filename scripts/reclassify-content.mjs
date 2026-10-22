/**
 * reclassify-content — one-shot migration to the classified content tree.
 *
 *   node scripts/reclassify-content.mjs --dry-run   # report only
 *   node scripts/reclassify-content.mjs --apply     # move + re-key indexes
 *
 * WHAT IT DOES (file CONTENTS are never touched):
 *   1. Moves every content file into the classified sections documented in
 *      frontend/lib/content/paths.ts (notes / formulas / practice / visuals /
 *      resources / journal / archive), keyed by the file's KIND folder
 *      (concepts/, pyqs/, mindmap/, …) and its class → subject → unit coords.
 *   2. Normalizes the five legacy class roots (class-11, class-11-notes,
 *      class-11e, class-12, class-12-notes) to class-11 / class-12 and strips
 *      `unit-N-` dir prefixes (unit-2-stoichiometry → stoichiometry).
 *   3. Re-keys content/ravikishan/_index.json → content/_index.json and the
 *      served mirrors frontend/public/data/ravikishan/{_index,manifest}.json →
 *      frontend/public/data/content/{_index,manifest}.json. Values untouched —
 *      only the path keys move.
 *   4. Dedupes byte-identical files that land on the same target; files with
 *      the same name but different content are kept, the later one renamed
 *      `name--2.ext` (nothing is lost).
 *   5. Scaffolds content/journal/ and writes the mapping report to
 *      reports/content-reclassify-report.md.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = path.join(ROOT, "content");
const PUBLIC_DATA = path.join(ROOT, "frontend", "public", "data");

const APPLY = process.argv.includes("--apply");

/** kind folder → classified section (mirrors KIND_SECTIONS in paths.ts). */
const KIND_SECTION = {
  concepts: "notes/concepts",
  theory: "notes/theory",
  guides: "notes/guides",
  notes: "notes/guides",
  formula: "formulas",
  pyqs: "practice/questions",
  sets: "practice/problem-sets",
  examples: "practice/examples",
  mindmap: "visuals/mindmaps",
  rails: "visuals/rails",
  graph: "visuals/graphs",
};

/** Legacy class roots → normalized class dir. */
const CLASS_ALIASES = {
  "class-11": "class-11",
  "class-11-notes": "class-11",
  "class-11e": "class-11",
  "class-12": "class-12",
  "class-12-notes": "class-12",
};

/** Legacy unit dirs → canonical syllabus unit id (after unit-N- stripping). */
const UNIT_ALIASES = {
  "work-energy-power": "work-energy-and-power",
  "bhasha-tatha-vyakaran": "bhasha-ra-vyakarana",
  "basic-concept-organic": "basic-concept-of-organic-chemistry",
  "chemical-bonding": "chemical-bonding-and-shapes-of-molecules",
};

/** content/lessons/*.md → subject (by unit name). */
const LESSON_SUBJECTS = {
  algebra: "mathematics",
  "atomic-structure": "chemistry",
  "biomolecules-and-cell-biology": "biology",
  calculus: "mathematics",
  "classification-of-elements-and-periodic-table": "chemistry",
  "floral-diversity": "biology",
  gravitation: "physics",
  optics: "physics",
  "quantity-of-heat": "physics",
  stoichiometry: "chemistry",
  trigonometry: "mathematics",
  vectors: "physics",
};

/** Migration order when two sources claim the same target: canonical first. */
const CLASS_PRIORITY = {
  "class-11-notes": 0,
  "class-12-notes": 1,
  "class-11": 2,
  "class-12": 3,
  "class-11e": 4,
};

function normClass(seg) {
  return CLASS_ALIASES[seg] ?? seg;
}

function normUnit(seg) {
  let out = seg.replace(/^(unit|chapter|ch)[-_]\d+[-_]/i, "");
  out = UNIT_ALIASES[out] ?? out;
  return out;
}

/**
 * Map one corpus key (path relative to content/ravikishan) to its classified
 * path (relative to content/). Returns null when the path can't be classified.
 */
function mapRavKey(key) {
  const seg = key.split("/").filter(Boolean);
  if (seg.length < 3) return null;

  // Kind folder = first kind-named DIRECTORY at/after the unit position.
  let kindIdx = -1;
  for (let i = 2; i < seg.length - 1; i++) {
    if (KIND_SECTION[seg[i]]) {
      kindIdx = i;
      break;
    }
  }

  const cls = normClass(seg[0]);
  const subject = seg[1];

  if (kindIdx === -1) {
    // Kindless unit-level files: authoring plans and source documents.
    if (seg.length === 4) {
      const file = seg[3];
      const unit = normUnit(seg[2]);
      if (file === "plan.json") return `resources/plans/${cls}/${subject}/${unit}/plan.json`;
      if (/\.(docx?|pdf|pptx?|txt|md)$/i.test(file)) {
        return `resources/documents/${cls}/${subject}/${unit}/${file}`;
      }
    }
    return null;
  }

  const middle = seg.slice(2, kindIdx);
  if (middle.length > 0) middle[0] = normUnit(middle[0]);
  const tail = seg.slice(kindIdx + 1);
  const coords = [cls, subject, ...middle, ...tail].join("/");
  return `${KIND_SECTION[seg[kindIdx]]}/${coords}`;
}

/** Map one content/-relative old path to its classified path. */
function mapContentRel(rel) {
  const norm = rel.replace(/\\/g, "/");
  if (norm === "ravikishan/_index.json") return "_index.json";
  if (norm.startsWith("ravikishan/")) return mapRavKey(norm.slice("ravikishan/".length));

  // Backend-served reference data at the content root.
  if (norm === "periodic-table-filters.json") return "resources/periodic-table-filters.json";

  if (norm.startsWith("lessons/")) {
    const base = norm.slice("lessons/".length);
    const stem = base.replace(/\.md$/, "");
    const subject = LESSON_SUBJECTS[stem];
    return subject ? `notes/lessons/${subject}/${base}` : `notes/lessons/${base}`;
  }
  if (norm.startsWith("exams/")) return `practice/exams/${norm.slice("exams/".length)}`;
  if (norm.startsWith("materials/")) return `resources/documents/${norm.slice("materials/".length)}`;
  if (norm.startsWith("pyq/")) return `resources/question-bank/${norm.slice("pyq/".length)}`;
  if (norm.startsWith("r-export/")) return `resources/exports/${norm.slice("r-export/".length)}`;
  if (norm.startsWith("backup-")) {
    return `archive/backup-physics-2026-09-22/${norm.replace(/^backup-[^/]+\//, "")}`;
  }
  return null;
}

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

/** `name.ext` → `name--2.ext`, `name--3.ext`, … */
function suffixed(rel, n) {
  const dir = path.dirname(rel);
  const base = path.basename(rel);
  const dot = base.lastIndexOf(".");
  const stem = dot > 0 ? base.slice(0, dot) : base;
  const ext = dot > 0 ? base.slice(dot) : "";
  return (dir === "." ? "" : `${dir}/`) + `${stem}--${n}${ext}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Collect files + compute targets
// ─────────────────────────────────────────────────────────────────────────────
const skipNames = new Set(["_index.json", "manifest.json"]);
const files = walk(CONTENT).map((abs) => {
  const rel = path.relative(CONTENT, abs).replaceAll(path.sep, "/");
  return { abs, rel };
});

const entries = [];
const unmapped = [];
for (const f of files) {
  if (f.rel === "ravikishan/_index.json") continue; // handled as index
  const target = mapContentRel(f.rel);
  if (!target) {
    unmapped.push(f.rel);
    continue;
  }
  entries.push({ ...f, target, bytes: fs.readFileSync(f.abs) });
}

// Stable order: canonical class roots first, then path.
entries.sort((a, b) => {
  const pa = CLASS_PRIORITY[a.rel.split("/")[1]] ?? 9;
  const pb = CLASS_PRIORITY[b.rel.split("/")[1]] ?? 9;
  return pa - pb || a.rel.localeCompare(b.rel);
});

// Resolve target collisions.
const claimed = new Map(); // target → entry (with .bytes)
const report = { moved: [], deduped: [], renamed: [], unmapped };
for (const entry of entries) {
  let target = entry.target;
  let n = 2;
  while (claimed.has(target)) {
    const winner = claimed.get(target);
    if (Buffer.compare(winner.bytes, entry.bytes) === 0) {
      entry.target = target;
      entry.dedupeOf = winner.rel;
      report.deduped.push(`${entry.rel}  ==  ${winner.rel}`);
      break;
    }
    target = suffixed(entry.target, n++);
  }
  if (!entry.dedupeOf) {
    if (target !== entry.target) report.renamed.push(`${entry.rel}  →  ${target}`);
    entry.target = target;
    claimed.set(target, entry);
    report.moved.push(`${entry.rel}  →  ${target}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Re-key the index + manifest (values untouched)
// ─────────────────────────────────────────────────────────────────────────────
const oldIndexPath = path.join(CONTENT, "ravikishan", "_index.json");
const oldPublicIndexPath = path.join(PUBLIC_DATA, "ravikishan", "_index.json");
// Both copies exist and have drifted (source copy carries more keys); merge
// them — the authored copy wins on shared keys.
const index = {};
for (const src of [oldPublicIndexPath, oldIndexPath]) {
  if (!fs.existsSync(src)) continue;
  for (const [k, v] of Object.entries(JSON.parse(fs.readFileSync(src, "utf8")))) {
    index[k] = src === oldIndexPath ? v : index[k] ?? v;
  }
}

/** old key (content/ravikishan-relative) → new key (content-relative). */
const keyMap = new Map();
const fileByRel = new Map(entries.map((e) => [e.rel, e]));

function mapKey(oldKey) {
  const file = fileByRel.get(`ravikishan/${oldKey}`);
  return file ? file.target : mapRavKey(oldKey);
}

const newIndex = {};
const indexClaimed = new Map(); // newKey → JSON of value
const indexRenamed = [];
// Two passes: keys backed by real files claim their names before dangling claims.
const sortedKeys = Object.keys(index).sort((a, b) => {
  const fa = fileByRel.has(`ravikishan/${a}`) ? 0 : 1;
  const fb = fileByRel.has(`ravikishan/${b}`) ? 0 : 1;
  return fa - fb || a.localeCompare(b);
});
for (const oldKey of sortedKeys) {
  const base = mapKey(oldKey);
  let newKey = base;
  if (!newKey) {
    unmapped.push(`_index key: ${oldKey}`);
    continue;
  }
  const value = JSON.stringify(index[oldKey]);
  let n = 2;
  while (indexClaimed.has(newKey) && indexClaimed.get(newKey) !== value) {
    newKey = suffixed(base, n++);
    indexRenamed.push(`${oldKey}  →  ${newKey}`);
  }
  if (!indexClaimed.has(newKey)) indexClaimed.set(newKey, value);
  keyMap.set(oldKey, newKey);
  newIndex[newKey] = index[oldKey];
}

// Served manifest: [{ path, data }] — re-key `path`, values untouched.
const oldManifestPath = path.join(PUBLIC_DATA, "ravikishan", "manifest.json");
const manifest = JSON.parse(fs.readFileSync(oldManifestPath, "utf8"));
const newManifest = Array.isArray(manifest)
  ? manifest.map((item) => {
      const oldKey = String(item.path ?? "").replace(/\\/g, "/");
      let newKey;
      if (oldKey === "_index.json" || oldKey === "manifest.json") newKey = oldKey;
      else newKey = keyMap.get(oldKey) ?? mapRavKey(oldKey) ?? oldKey;
      return { ...item, path: newKey };
    })
  : manifest;

// ─────────────────────────────────────────────────────────────────────────────
// 3. Report + apply
// ─────────────────────────────────────────────────────────────────────────────
const lines = [];
lines.push("# Content re-classification report");
lines.push("");
lines.push(`Generated by scripts/reclassify-content.mjs (${APPLY ? "apply" : "dry-run"}).`);
lines.push("");
lines.push("## New system (see frontend/lib/content/paths.ts)");
lines.push("");
lines.push("```");
lines.push("content/{notes,formulas,practice,visuals,resources,journal,archive}/…");
lines.push("  <section>/<subsection>/<class>/<subject>/<unit>/<file>");
lines.push("```");
lines.push("");
lines.push("## Counts");
lines.push("");
lines.push(`- files moved:        ${report.moved.length}`);
lines.push(`- duplicates dropped: ${report.deduped.length} (byte-identical)`);
lines.push(`- name collisions:    ${report.renamed.length} (kept, renamed --2)`);
lines.push(`- index keys re-keyed: ${Object.keys(newIndex).length}`);
lines.push(`- unmapped:           ${report.unmapped.length}`);
lines.push("");
if (report.renamed.length) {
  lines.push("## Renamed on collision (content differs — both kept)");
  lines.push("```");
  lines.push(...report.renamed);
  lines.push("```");
  lines.push("");
}
if (report.deduped.length) {
  lines.push("## Dropped as byte-identical duplicates");
  lines.push("```");
  lines.push(...report.deduped.slice(0, 200));
  lines.push("```");
  lines.push("");
}
if (report.unmapped.length) {
  lines.push("## UNMAPPED (left in place — needs a rule)");
  lines.push("```");
  lines.push(...report.unmapped.slice(0, 200));
  lines.push("```");
}
if (indexRenamed.length) {
  lines.push("## Index keys suffixed on value collision");
  lines.push("```");
  lines.push(...indexRenamed.slice(0, 100));
  lines.push("```");
}

const reportPath = path.join(ROOT, "reports", "content-reclassify-report.md");
console.log(`moved=${report.moved.length} deduped=${report.deduped.length} renamed=${report.renamed.length} keys=${Object.keys(newIndex).length} unmapped=${report.unmapped.length}`);
if (report.unmapped.length) {
  console.log("UNMAPPED:");
  for (const u of report.unmapped.slice(0, 30)) console.log(`  ${u}`);
}
if (report.renamed.length) {
  console.log("RENAMED (collision, content differs):");
  for (const r of report.renamed.slice(0, 30)) console.log(`  ${r}`);
}

if (!APPLY) {
  fs.writeFileSync(reportPath, lines.join("\n"));
  console.log(`dry-run report → ${path.relative(ROOT, reportPath)}`);
  process.exit(0);
}

// ── Apply: move files ────────────────────────────────────────────────────────
for (const entry of entries) {
  const to = path.join(CONTENT, entry.target);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  if (entry.dedupeOf) {
    fs.rmSync(entry.abs);
  } else {
    fs.renameSync(entry.abs, to);
  }
}

// Index + manifest to their new homes.
const writeJson = (p, data) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
};
writeJson(path.join(CONTENT, "_index.json"), newIndex);
writeJson(path.join(PUBLIC_DATA, "content", "_index.json"), newIndex);
writeJson(path.join(PUBLIC_DATA, "content", "manifest.json"), newManifest);
fs.rmSync(path.join(PUBLIC_DATA, "ravikishan"), { recursive: true, force: true });

// Prune emptied legacy dirs.
const prune = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) prune(path.join(dir, e.name));
  }
  if (fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
};
prune(path.join(CONTENT, "ravikishan"));

// Journal scaffold.
fs.mkdirSync(path.join(CONTENT, "journal", "entries"), { recursive: true });
const keep = path.join(CONTENT, "journal", "entries", ".gitkeep");
if (!fs.existsSync(keep)) fs.writeFileSync(keep, "");

fs.writeFileSync(reportPath, lines.join("\n"));
console.log(`applied → ${path.relative(ROOT, reportPath)}`);
