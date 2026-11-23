/**
 * Sweep every real syllabus topic WITH its class + unit coordinates, replicate
 * the loader's ranked corpus pick (class-correct), and flag any topic whose
 * winning rendered note is thin (< THIN chars). Falls back to the flat subject
 * manifest when the corpus has no match for that coordinate — exactly like the
 * loader. Reports topics where a richer note exists but loses, and why.
 */
import { readFileSync, writeFileSync } from "node:fs";

const THIN = 2000;

const syllabusSrc = readFileSync("frontend/lib/core/syllabus.ts", "utf-8");

function slugify(title) {
  return title.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u0900-\u097f]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 96);
}

// Walk the syllabus source tracking current class (slug: "class-X-notes") and
// current unit (id: "..." inside unit objects), collecting (class, unit, slug).
const topics = []; // { classDir, unitId, slug, title }
let currentClass = null;
let currentUnit = null;
{
  const re = /slug:\s*"(class-1[12]-notes)"|id:\s*"([a-z0-9-]+)"|topics:\s*\[|^\s*"((?:[^"\\]|\\.)+)"\s*,?\s*$/gm;
  let inTopics = false;
  let m;
  while ((m = re.exec(syllabusSrc)) !== null) {
    if (m[1]) { currentClass = m[1].replace(/-notes$/, ""); inTopics = false; continue; }
    if (m[2]) { currentUnit = m[2]; inTopics = false; continue; }
    if (m[0].startsWith("topics:")) { inTopics = true; continue; }
    if (m[3] && inTopics && currentClass && currentUnit) {
      const title = m[3].replace(/\\"/g, '"').replace(/\\'/g, "'");
      topics.push({ classDir: currentClass, unitId: currentUnit, slug: slugify(title), title });
    }
  }
}
const seen = new Map();
for (const t of topics) {
  const key = `${t.classDir}/${t.unitId}/${t.slug}`;
  if (!seen.has(key)) seen.set(key, t);
}
const unique = [...seen.values()];
console.log(`syllabus topics: ${unique.length} (class+unit attributed)`);

const corpus = JSON.parse(
  readFileSync("frontend/public/data/content/manifest.json", "utf-8"),
).filter((it) => typeof it.path === "string" && it.path.startsWith("notes/concepts/"));

function compact(v) {
  return String(v).toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, "");
}
function quality(entrySlug, filename, wanted) {
  if (entrySlug && entrySlug === wanted) return 3;
  if (filename && filename.includes(wanted)) return 2;
  const w = compact(wanted);
  if (w.length < 6) return 0;
  for (const c of [entrySlug, (filename ?? "").replace(/\.[a-z0-9]+$/i, "").replace(/^\d+[-_. ]+/, "")]) {
    const k = compact(c ?? "");
    if (k.length >= 6 && (k.startsWith(w) || w.startsWith(k))) return 1;
  }
  return 0;
}
const charsOf = (notes) => (notes ?? []).reduce((s, n) => s + (typeof n === "string" ? n.length : 0), 0);

const subjects = ["biology", "chemistry", "english", "mathematics", "nepali", "physics"];
const manifests = {};
for (const s of subjects) {
  try {
    manifests[s] = JSON.parse(
      readFileSync(`frontend/public/data/syllabus-notes/${s}/_manifest.json`, "utf-8"),
    );
  } catch { manifests[s] = []; }
}

const thin = [];
const unresolved = [];
for (const t of unique) {
  const cands = [];
  corpus.forEach((item, index) => {
    const parts = item.path.split("/");
    if (parts[2] !== t.classDir || parts[4] !== t.unitId) return;
    const filename = parts[parts.length - 1];
    const q = quality(item.data?.topicSlug, filename, t.slug);
    if (!q) return;
    cands.push({ q, chars: charsOf(item.data?.notes), index, path: item.path, notes: item.data?.notes });
  });
  let winner = null;
  if (cands.length > 0) {
    cands.sort((a, b) => b.q - a.q || b.chars - a.chars || a.index - b.index);
    winner = { source: "corpus", ...cands[0] };
  } else {
    // flat manifest fallback (loader behaviour)
    let best = null;
    for (const s of subjects) {
      const c2 = manifests[s]
        .map((e, index) => ({ e, index }))
        .filter(({ e }) => quality(e.topicSlug, e.filename, t.slug) > 0)
        .sort(({ e: a, index: i }, { e: b, index: j }) => {
          const qa = quality(a.topicSlug, a.filename, t.slug);
          const qb = quality(b.topicSlug, b.filename, t.slug);
          if (qa !== qb) return qb - qa;
          const da = a.duplicateType ?? 1, db = b.duplicateType ?? 1;
          if (da !== db) return da - db;
          return i - j;
        })[0];
      if (c2) {
        // noteChars unknown without loading the file; count via a quick read
        try {
          const data = JSON.parse(
            readFileSync(`frontend/public/data/syllabus-notes/${s}/${c2.e.unitSlug}/${c2.e.filename}`, "utf-8"),
          );
          const chars = charsOf(data.notes);
          if (!best || chars > best.chars) best = { source: `manifest:${s}`, chars, notes: data.notes, path: `${s}/${c2.e.unitSlug}/${c2.e.filename}` };
        } catch { /* skip */ }
      }
    }
    winner = best;
  }
  if (!winner) { unresolved.push(t); continue; }
  if (winner.chars < THIN) {
    // does a richer candidate exist anywhere reasonable (same class, any unit)?
    const richer = corpus.some((item) => {
      const parts = item.path.split("/");
      return parts[2] === t.classDir && quality(item.data?.topicSlug, parts[parts.length - 1], t.slug) > 0
        && charsOf(item.data?.notes) >= THIN;
    });
    thin.push({
      class: t.classDir, unit: t.unitId, slug: t.slug, title: t.title.slice(0, 60),
      chars: winner.chars, notes: winner.notes?.length ?? 0,
      source: winner.source, file: (winner.path ?? "").split("/").pop(),
      richerInClass: richer,
    });
  }
}

console.log(`unresolved: ${unresolved.length}`);
console.log(`thin winners (< ${THIN} chars): ${thin.length}`);
console.log(`  of which a richer same-class corpus file exists: ${thin.filter((t) => t.richerInClass).length}`);
const byClass = {};
for (const t of thin) byClass[t.class] = (byClass[t.class] ?? 0) + 1;
console.log("  by class:", byClass);
const bySource = {};
for (const t of thin) bySource[t.source] = (bySource[t.source] ?? 0) + 1;
console.log("  by source:", bySource);
console.log("\n-- richer-in-class cases (real selection bugs):");
for (const t of thin.filter((x) => x.richerInClass)) {
  console.log(`  ${t.class}/${t.unit} ${t.slug.slice(0, 52)} -> ${t.chars} chars via ${t.file?.slice(0, 48)}`);
}
writeFileSync("content-tools/thin-winners.json", JSON.stringify({ unresolved, thin }, null, 2));
console.log("\nfull report: content-tools/thin-winners.json");
