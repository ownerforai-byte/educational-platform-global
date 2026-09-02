/** Show all syllabus topics with their slugified versions for Physics and Chemistry */
import { SYLLABUS } from "../frontend/lib/syllabus.ts";
import { readFileSync } from "node:fs";

const slugify = (t) =>
  t.toLowerCase().normalize("NFKD").replace(/[^\x00-\x7F]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 96);

// Read the map source
const mapSrc = readFileSync("frontend/lib/topic-3d-map.ts", "utf8");
const mapKeys = new Set([...mapSrc.matchAll(/"([a-z0-9][a-z0-9-]{2,})":\s*(makeTopic|make\()/g)].map(m => m[1]));

// Focus on STEM subjects in class 11 and 12
for (const cls of SYLLABUS) {
  if (!cls.slug.startsWith("class-1")) continue;
  for (const subj of cls.subjects) {
    const subjLower = subj.name.toLowerCase();
    if (subjLower !== "physics" && subjLower !== "chemistry" && subjLower !== "mathematics") continue;
    console.log(`\n=== ${cls.slug} / ${subj.name} ===`);
    for (const unit of subj.units) {
      const missing = [];
      const mapped = [];
      for (const topic of unit.topics) {
        const s = slugify(topic);
        const hit = mapKeys.has(s) || [...mapKeys].some((k) => s.includes(k) && k.length > 12);
        if (hit) mapped.push(s);
        else missing.push(s);
      }
      if (missing.length > 0) {
        console.log(`\n  UNIT: ${unit.title} — ${missing.length} missing of ${unit.topics.length}`);
        for (const s of missing) {
          console.log(`    ❌ ${s}  [topic: "${unit.topics.find(t => slugify(t) === s)}"]`);
        }
      }
    }
  }
}



// 6. Check syllabus topics with no mapping
const syllabusLineMatches = [...src.matchAll(/"slug":\s*"([^"]+)"/g)];
