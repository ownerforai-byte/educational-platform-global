"use strict";
/**
 * Conservative physics dedupe:
 *  - fingerprint = sorted set of note strings + MCQ prompts (full content)
 *  - within each identical-content group, keep the CANONICAL file
 *    (shortest name, tie-break: no "-2" suffix), delete the rest ONLY if
 *    every deleted file is a variant (duplicateType=2 / "-2" suffix).
 *  - canonical files with duplicate content are never touched.
 *  - rewrites _manifest.json afterwards.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PUB = path.join(__dirname, "..", "frontend", "public", "data", "syllabus-notes", "physics");
const files = [];
for (const unit of fs.readdirSync(PUB, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)) {
  for (const f of fs.readdirSync(path.join(PUB, unit))) {
    if (!f.endsWith(".json")) continue;
    const abs = path.join(PUB, unit, f);
    files.push({ unit, filename: f, rel: `${unit}/${f}`, abs, data: JSON.parse(fs.readFileSync(abs, "utf8")) });
  }
}

function fp(j) {
  const acc = [];
  const push = (n) => {
    if (Array.isArray(n)) acc.push(...n.filter(x => typeof x === "string"));
    else if (n && typeof n === "object") acc.push(...Object.values(n).filter(x => typeof x === "string"));
  };
  push(j.notes);
  push((j.mcqs || []).map(q => q?.prompt || q?.question || ""));
  return acc.length ? crypto.createHash("sha1").update(acc.map(s => s.replace(/\s+/g, " ").trim()).sort().join("\u0000")).digest("hex") : null;
}

const groups = new Map();
for (const rec of files) {
  const f = fp(rec.data);
  if (!f) continue;
  (groups.get(f) || groups.set(f, []).get(f)).push(rec);
}

const isVariant = (rec) =>
  rec.data.duplicateType === 2 || /-2\.json$/.test(rec.filename) || /-2-/.test(rec.filename);

let deleted = 0, keptDupes = 0;
const remove = [];
for (const [fp, group] of groups) {
  if (group.length < 2) continue;
  const sorted = [...group].sort((a, b) =>
    (isVariant(a) === isVariant(b) ? a.filename.length - b.filename.length : isVariant(a) ? 1 : -1));
  const keep = sorted[0];
  for (const rec of sorted.slice(1)) {
    if (isVariant(rec)) { remove.push(rec); }
    else keptDupes++;
  }
}
console.log("duplicate groups:", [...groups.values()].filter(g => g.length > 1).length,
  "| variant-copies to delete:", remove.length, "| canonical duplicates kept:", keptDupes);

for (const rec of remove) {
  fs.unlinkSync(rec.abs);
  deleted++;
}
console.log("deleted files:", deleted);

// regenerate manifest
const topicSlugsByUnit = new Map();
for (const rec of files) {
  if (remove.includes(rec)) continue;
  const t = rec.data.topicSlug;
  if (t) (topicSlugsByUnit.get(rec.unit) || topicSlugsByUnit.set(rec.unit, new Set()).get(rec.unit)).add(t);
}
const left = files.filter(r => !remove.includes(r));
const manifest = left.map(rec => {
  const j = rec.data;
  const isVar = Boolean(j.duplicateType && j.tabGroup);
  const paired = isVar && topicSlugsByUnit.get(rec.unit)?.has(j.tabGroup);
  const n = j.notes;
  const noteCount = Array.isArray(n) ? n.length : (n && typeof n === "object" ? Object.keys(n).length : 0);
  return {
    unitSlug: rec.unit,
    topicSlug: paired ? j.tabGroup : (j.topicSlug || j.tabGroup || rec.filename.replace(/\.json$/, "")),
    title: j.title || j.topicTitle || rec.filename.replace(/\.json$/, ""),
    noteCount,
    source: "ravikishan",
    duplicateType: isVar ? j.duplicateType : 1,
    filename: rec.filename,
    ...(j.tabGroup ? { tabGroup: j.tabGroup } : {}),
    hasMcqs: Boolean((j.mcqs && j.mcqs.length) || (j.mcs && j.mcs.length)),
    universalFactsCount: Array.isArray(j.universalFacts) ? j.universalFacts.length : 0,
  };
}).sort((a, b) =>
  a.unitSlug.localeCompare(b.unitSlug) || a.topicSlug.localeCompare(b.topicSlug) || (a.duplicateType ?? 1) - (b.duplicateType ?? 1));
fs.writeFileSync(path.join(PUB, "_manifest.json"), JSON.stringify(manifest, null, 2));
console.log("final files:", left.length, "| manifest entries:", manifest.length);
