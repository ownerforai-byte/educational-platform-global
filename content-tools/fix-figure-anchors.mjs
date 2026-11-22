/* Fix dead figure anchor keywords — caption-anchored, exact edits.
 * For each figure whose keyword matches no note block, choose a replacement
 * word from the figure's own caption that DOES appear in the canonical notes.
 * Edits registry.ts by locating each figure's unique caption text and
 * replacing the first `keyword: "<old>"` after it. Prints a JSON report. */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getTopicFigures, registeredFigureSlugs } from "../frontend/features/docs/figures/registry";
import { pickCanonicalNoteEntry } from "../frontend/lib/note-topic-match";

const ROOT = join(process.cwd(), "frontend/public/data/syllabus-notes");
const SUBJECTS = ["biology", "chemistry", "english", "mathematics", "nepali", "physics"];
const REGISTRY_FILE = join(process.cwd(), "frontend/features/docs/figures/registry.ts");

function canonicalNotesFor(topicSlug) {
  for (const subject of SUBJECTS) {
    let manifest;
    try {
      manifest = JSON.parse(readFileSync(join(ROOT, subject, "_manifest.json"), "utf-8"));
    } catch {
      continue;
    }
    const w = pickCanonicalNoteEntry(manifest, topicSlug);
    if (!w) continue;
    try {
      const data = JSON.parse(readFileSync(join(ROOT, subject, w.unitSlug, w.filename), "utf-8"));
      return { subject, notes: data.notes };
    } catch {
      return undefined;
    }
  }
  return undefined;
}

function candidateWords(text) {
  const words = text.replace(/[^A-Za-z\s-]/g, " ").split(/\s+/).filter(Boolean);
  const seen = new Set();
  const out = [];
  for (const w of words) {
    const k = w.toLowerCase();
    if (k.length < 5 || seen.has(k)) continue;
    seen.add(k);
    out.push(k);
  }
  out.sort((a, b) => b.length - a.length);
  return out;
}

// 1. collect dead figures (one report row per figure, caption included)
const dead = [];
for (const slug of registeredFigureSlugs()) {
  const entry = getTopicFigures(slug);
  if (!entry) continue;
  const resolved = canonicalNotesFor(slug);
  if (!resolved) continue;
  const lower = resolved.notes.map((n) => n.toLowerCase());
  for (const fig of entry.figures) {
    if (fig.keyword === undefined) continue;
    if (lower.some((n) => n.includes(fig.keyword.toLowerCase()))) continue;
    let replacement;
    for (const w of candidateWords(fig.caption)) {
      if (lower.some((n) => n.includes(w))) {
        replacement = w;
        break;
      }
    }
    dead.push({ slug, keyword: fig.keyword, caption: fig.caption, replacement, subject: resolved.subject });
  }
}

// 2. apply caption-anchored edits
let text = readFileSync(REGISTRY_FILE, "utf-8");
const applied = [];
const failed = [];
for (const fix of dead) {
  if (!fix.replacement) {
    failed.push({ ...fix, reason: "no caption word appears in the notes" });
    continue;
  }
  // locate the caption inside the file (captions are unique, long strings)
  const capProbe = fix.caption.slice(0, 60).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const capAt = text.search(capProbe);
  if (capAt < 0) {
    failed.push({ ...fix, reason: "caption not found in registry.ts" });
    continue;
  }
  const kwRe = new RegExp(`keyword: "${fix.keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`);
  // search forward from the caption for the keyword (caption precedes keyword in each figure)
  const after = text.slice(capAt, capAt + 2000);
  const m = after.match(kwRe);
  if (!m) {
    failed.push({ ...fix, reason: "keyword not found after caption" });
    continue;
  }
  const at = capAt + m.index;
  text = text.slice(0, at) + `keyword: "${fix.replacement}"` + text.slice(at + m[0].length);
  applied.push(fix);
}

writeFileSync(REGISTRY_FILE, text);
console.log(`dead: ${dead.length}, applied: ${applied.length}, failed: ${failed.length}`);
for (const f of applied) console.log(`  OK ${f.subject} ${f.slug.slice(0, 44)} "${f.keyword}" -> "${f.replacement}"`);
for (const f of failed) console.log(`  FAIL ${f.subject} ${f.slug.slice(0, 44)} "${f.keyword}" (${f.reason})`);
