/* Audit every registry figure's keyword anchor against the shipped canonical
 * notes across ALL subjects. Reports figures whose anchor matches no note
 * block (they silently never render in the Docs Viewer). Run with tsx. */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getTopicFigures, registeredFigureSlugs } from "../frontend/features/docs/figures/registry";
import { pickCanonicalNoteEntry } from "../frontend/lib/note-topic-match";

const ROOT = join(process.cwd(), "frontend/public/data/syllabus-notes");
const SUBJECTS = ["biology", "chemistry", "english", "mathematics", "nepali", "physics"];

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

let dead = 0;
let alive = 0;
const unresolvedSlugs = [];
const bySubject = {};

for (const slug of registeredFigureSlugs()) {
  const entry = getTopicFigures(slug);
  if (!entry) continue;
  const resolved = canonicalNotesFor(slug);
  if (!resolved) {
    unresolvedSlugs.push(slug);
    continue;
  }
  const lower = resolved.notes.map((n) => n.toLowerCase());
  for (const fig of entry.figures) {
    if (fig.keyword === undefined) continue;
    const hit = lower.findIndex((n) => n.includes(fig.keyword.toLowerCase()));
    if (hit >= 0) {
      alive++;
    } else {
      dead++;
      (bySubject[resolved.subject] ??= []).push(`${slug.slice(0, 52)} :: "${fig.keyword}"`);
    }
  }
}

console.log(`alive anchors: ${alive}`);
console.log(`DEAD anchors:  ${dead}`);
console.log(`unresolved topics (no manifest match): ${unresolvedSlugs.length}`);
for (const s of unresolvedSlugs) console.log("  UNRESOLVED " + s);
for (const [subject, list] of Object.entries(bySubject)) {
  console.log(`\n== ${subject} (${list.length} dead) ==`);
  for (const line of list) console.log("  " + line);
}

// print unresolved slugs for inspection
