import fs from "node:fs";
import { LAB_VISUAL_INDEX } from "../lib/lab-visual-index.ts";
import { SYLLABUS, slugifySyllabusTopic } from "../lib/syllabus.ts";
import { ACTIVITY_MANIFEST } from "../lib/lab-manifest.ts";

const covered = new Set(ACTIVITY_MANIFEST.flatMap((a) => a.topicSlugs));
const rows = [];
for (const cls of SYLLABUS)
  for (const s of cls.subjects)
    for (const u of s.units)
      for (const t of u.topics) {
        const slug = slugifySyllabusTopic(t);
        if (covered.has(slug)) continue;
        if (!["physics", "chemistry", "biology", "mathematics"].includes(s.slug)) continue;
        rows.push({ slug, title: t, subject: s.slug, unit: u.id, cls: cls.slug });
      }

const q = JSON.stringify;
const lines = rows.map(
  (r) =>
    `  { labId: "ChapterAnimation", kind: "chapter-animation", chapterProps: { topicSlug: ${q(r.slug)}, topicTitle: ${q(r.title)}, unitSlug: ${q(r.unit)}, subjectSlug: ${q(r.subject)} }, entranceTopic: ${q(r.title)}, slugs: [${q(r.slug)}] },`,
);

const block = [
  "",
  "  /* ── MANUAL EXTENSION (2026-11-11) ──────────────────────────────────────",
  "   * Chapter-animation entries for every remaining uncovered science/math",
  "   * syllabus topic. The auto-generated half above covers 453 topics; these",
  "   * close the Physics / Chemistry / Biology / Mathematics gap. Each entry",
  "   * reuses the existing ChapterAnimation keyword router, which already",
  "   * resolves a topical 3D scene per topic. Regenerating from the handoff",
  "   * archive must PRESERVE this block (append, never overwrite).",
  "   */",
  ...lines,
].join("\n");

fs.writeFileSync("C:/Users/ASUS/AppData/Local/Temp/opencode/lab-index-block.txt", block);
console.log("entries:", rows.length, "bytes:", block.length);
