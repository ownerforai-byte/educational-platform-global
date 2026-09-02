/** Find true gaps: syllabus topics where the make() slug doesn't match any map key */
import { readFileSync } from "node:fs";

const mapSrc = readFileSync("frontend/lib/topic-3d-map.ts", "utf8");

// Extract make() entries — key -> slug
const makeEntries = [...mapSrc.matchAll(/"([a-z0-9][a-z0-9-]{2,})":\s*make\("([^"]+)"/g)];
const makeSlugMap = new Map();
for (const m of makeEntries) makeSlugMap.set(m[1], m[2]);

// Extract makeTopic entries — key -> component
const makeTopicEntries = [...mapSrc.matchAll(/"([a-z0-9][a-z0-9-]{2,})":\s*makeTopic\((\w+)Visual/g)];
const makeTopicMap = new Map();
for (const m of makeTopicEntries) makeTopicMap.set(m[1], m[2]);

// Check: make() slug mismatches
console.log("=== make() slug mismatches (where map key != make() slug) ===");
let mismatchCount = 0;
for (const [key, slug] of makeSlugMap) {
  if (slug !== key) {
    mismatchCount++;
    if (mismatchCount <= 30) console.log(`  key: "${key}" -> make() slug: "${slug}"`);
  }
}
console.log("Total make() mismatches: " + mismatchCount);

// Which syllabus topics have NO match at all?
import { SYLLABUS } from "../frontend/lib/syllabus.ts";
const slugify = (t) => t.toLowerCase().normalize("NFKD").replace(/[^\x00-\x7F]/g, "")
  .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 96);
const allKeys = new Set([...makeSlugMap.keys(), ...makeTopicMap.keys()]);

console.log("\n=== SYL GAPS (no match at all) ===");
const gaps = {};
for (const cls of SYLLABUS) {
  for (const subj of cls.subjects) {
    const sl = subj.name.toLowerCase();
    if (!["physics", "chemistry", "mathematics"].includes(sl)) continue;
    for (const unit of subj.units) {
      for (const topic of unit.topics) {
        const s = slugify(topic);
        // Exact match OR make() slug match
        const exact = allKeys.has(s);
        const slugMatch = [...makeSlugMap.values()].includes(s);
        if (!(exact || slugMatch)) {
          const key = cls.slug + " / " + subj.name + " / " + unit.title;
          (gaps[key] ??= []).push(s);
        }
      }
    }
  }
}
let total = 0;
for (const [key, items] of Object.entries(gaps)) {
  total += items.length;
  console.log("\n## " + key + " — " + items.length + " missing");
  for (const s of items) console.log("  " + s);
}
console.log("\nTOTAL STEM GAPS: " + total);
