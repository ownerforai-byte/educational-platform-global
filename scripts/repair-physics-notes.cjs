"use strict";
/**
 * Physics in-place repair (mirrors the chemistry fix, without the source rebuild
 * because 109 public files exist only in public/):
 *   1. Back up the whole physics public dir outside public/.
 *   2. Lift nested enrichedContent/originalContent fields to top level
 *      (content authored by post-processors ended up nested; the build
 *      script and UI read top-level only).
 *   3. Rebuild _manifest.json from the repaired files with real noteCounts
 *      and the build script's pairing semantics (variant topicSlug = tabGroup
 *      when an original with that topicSlug exists in the unit).
 *   4. Report exact-content duplicate groups (no deletion in this run).
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PUB = path.join(__dirname, "..", "frontend", "public", "data", "syllabus-notes", "physics");
const BACKUP = path.join(__dirname, "..", "content", `backup-physics-public-${new Date().toISOString().replace(/[:.]/g, "-")}`);

// ── 1. backup ──────────────────────────────────────────────────────────
const existingBackup = fs.existsSync(path.dirname(BACKUP))
  ? fs.readdirSync(path.dirname(BACKUP)).filter(n => n.startsWith("backup-physics-public"))
  : [];
if (existingBackup.length === 0) {
  fs.cpSync(PUB, BACKUP, { recursive: true });
  console.log("backup →", path.relative(process.cwd(), BACKUP));
} else {
  console.log("backup already exists, skipping:", existingBackup[0]);
}

// ── load all files ─────────────────────────────────────────────────────
const unitDirs = fs.readdirSync(PUB, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
const files = []; // {unit, rel, abs, data}
for (const unit of unitDirs) {
  const dir = path.join(PUB, unit);
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".json")) continue;
    const abs = path.join(dir, f);
    let data;
    try { data = JSON.parse(fs.readFileSync(abs, "utf8")); }
    catch (e) { console.error("PARSE FAIL:", unit + "/" + f, e.message); continue; }
    files.push({ unit, rel: `${unit}/${f}`, abs, data, filename: f });
  }
}
console.log("files loaded:", files.length);

// ── 2. lift nested content ─────────────────────────────────────────────
const LIFT_FIELDS = ["notes","confusion","practice","universalFacts","examples","practiceQuestions","formulas","keyPoints","summary","specialNotes","importantStatements","importantNotes","examShortTricks","examNotes","mcs","mcqs","importantConcepts","importantTasks","exercises","visualization","visualType","animation3D","motionGraphics"];
const isEmptyVal = (v) => v == null || (Array.isArray(v) && v.length === 0) || (typeof v === "string" && !v.trim());
const notesLen = (j) => Array.isArray(j.notes) ? j.notes.length : (j.notes && typeof j.notes === "object" ? Object.keys(j.notes).length : 0);

let lifted = 0;
const stillEmpty = [];
for (const rec of files) {
  const j = rec.data;
  if (notesLen(j) > 0) continue;
  const srcs = [j.enrichedContent, j.originalContent].filter(Boolean);
  let took = 0;
  for (const k of LIFT_FIELDS) {
    if (!isEmptyVal(j[k])) continue;
    for (const s of srcs) {
      if (!isEmptyVal(s[k])) { j[k] = s[k]; took++; break; }
    }
  }
  if (notesLen(j) > 0) {
    fs.writeFileSync(rec.abs, JSON.stringify(j, null, 2));
    lifted++;
  } else {
    stillEmpty.push(rec.rel);
  }
}
console.log("lifted nested → top-level:", lifted);
console.log("still empty after lift:", stillEmpty.length);
stillEmpty.forEach(r => console.log("  STILL-EMPTY:", r));

// ── 3. rebuild manifest ────────────────────────────────────────────────
// pairing: a variant (duplicateType + tabGroup) is "paired" when some other
// file in the same unit declares topicSlug === tabGroup (build-script rule).
const topicSlugsByUnit = new Map();
for (const rec of files) {
  const t = rec.data.topicSlug;
  if (!t) continue;
  if (!topicSlugsByUnit.has(rec.unit)) topicSlugsByUnit.set(rec.unit, new Set());
  topicSlugsByUnit.get(rec.unit).add(t);
}

const manifest = files.map(rec => {
  const j = rec.data;
  const isVariant = Boolean(j.duplicateType && j.tabGroup);
  const paired = isVariant && topicSlugsByUnit.get(rec.unit)?.has(j.tabGroup);
  return {
    unitSlug: rec.unit,
    topicSlug: paired ? j.tabGroup : (j.topicSlug || j.tabGroup || rec.filename.replace(/\.json$/, "")),
    title: j.title || j.topicTitle || (paired ? j.tabGroup : j.topicSlug) || rec.filename,
    noteCount: notesLen(j),
    source: "ravikishan",
    duplicateType: isVariant ? j.duplicateType : 1,
    filename: rec.filename,
    ...(j.tabGroup ? { tabGroup: j.tabGroup } : {}),
    hasMcqs: Boolean((j.mcqs && j.mcqs.length) || (j.mcs && j.mcs.length)),
    universalFactsCount: Array.isArray(j.universalFacts) ? j.universalFacts.length : 0,
  };
}).sort((a, b) =>
  (a.unitSlug || "").localeCompare(b.unitSlug || "") ||
  (a.topicSlug || "").localeCompare(b.topicSlug || "") ||
  (a.duplicateType ?? 1) - (b.duplicateType ?? 1)
);
fs.writeFileSync(path.join(PUB, "_manifest.json"), JSON.stringify(manifest, null, 2));
console.log("manifest entries:", manifest.length, "(files:", files.length + ")");

// ── 4. duplicate report (report only) ──────────────────────────────────
function notesFP(j) {
  const acc = [];
  const push = (n) => {
    if (Array.isArray(n)) acc.push(...n.filter(x => typeof x === "string"));
    else if (n && typeof n === "object") acc.push(...Object.values(n).filter(x => typeof x === "string"));
  };
  push(j.notes);
  return acc.length ? crypto.createHash("sha1").update(acc.map(s => s.replace(/\s+/g, " ").trim()).sort().join("\u0000")).digest("hex") : null;
}
const fpMap = new Map(); // fp -> [rel]
for (const rec of files) {
  const fp = notesFP(rec.data);
  if (!fp) continue;
  (fpMap.get(fp) || fpMap.set(fp, []).get(fp)).push(rec.rel);
}
const dups = [...fpMap.values()].filter(v => v.length > 1);
let dupFiles = dups.reduce((s, v) => s + v.length, 0);
console.log("\nidentical-notes groups:", dups.length, "| files involved:", dupFiles);
dups.slice(0, 12).forEach(v => console.log("  DUP:", v.join("  ==  ")));
