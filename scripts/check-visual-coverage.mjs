/**
 * Coverage check: which syllabus topics have a TOPIC_3D_MAP visual entry,
 * and which are missing visuals — per subject/class.
 * Run: node scripts/check-visual-coverage.mjs
 */
import { readFileSync } from "node:fs";
import { SYLLABUS } from "../frontend/lib/syllabus.ts";

const mapSrc = readFileSync("frontend/lib/topic-3d-map.ts", "utf8");
const mapKeys = new Set(
  [...mapSrc.matchAll(/"([a-z0-9][a-z0-9-]{2,})":\s*[A-Za-z]/g)].map((m) => m[1])
);

function slugify(t) {
  return t
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\x00-\x7F]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

let total = 0;
let covered = 0;
const gaps = {};

for (const cls of SYLLABUS) {
  for (const subj of cls.subjects) {
    for (const unit of subj.units) {
      for (const topic of unit.topics) {
        total++;
        const s = slugify(topic);
        const hit =
          mapKeys.has(s) || [...mapKeys].some((k) => s.includes(k) && k.length > 12);
        if (hit) covered++;
        else {
          const key = `${cls.slug} / ${subj.name} / ${unit.title}`;
          (gaps[key] ??= []).push(topic);
        }
      }
    }
  }
}

console.log(
  `Syllabus topics: ${total}, with visual entry: ${covered} (${Math.round((covered / total) * 100)}%)`
);
console.log(
  `\n=== UNITS WITH MISSING VISUALS (${Object.keys(gaps).length} unit groups) ===`
);
for (const [key, topics] of Object.entries(gaps)) {
  console.log(`\n## ${key} — ${topics.length} missing`);
  topics.forEach((t) => console.log(`   - ${t}`));
}