import { readFileSync } from "node:fs";

const index = JSON.parse(readFileSync("scripts/theorem-index.json", "utf-8"));

// Test fallback coverage
console.log("Testing visual schema fallback coverage...\n");

const subjects = ["biology", "chemistry", "mathematics", "nepali", "physics"];
let unmatched = 0;
const unmatchedExamples: Array<{subj: string; topic: string; title: string}> = [];

for (const subj of subjects) {
  const filtered = index.filter(t => t.subjectSlug === subj);
  // Count how many would get a non-null result
  const matched = filtered.filter(t => {
    const slug = t.topicSlug.toLowerCase();
    const title = t.topicTitle.toLowerCase();
    const unit = (t.unitId || "").toLowerCase();
    // Simple check: if it contains any common keyword
    const common = ["theorem", "proof", "law", "principle", "formula", "equation", 
                    "energy", "force", "field", "wave", "particle", "bond", "cell",
                    "heat", "electric", "magnetic", "light", "current", "voltage",
                    "integration", "derivative", "limit", "matrix", "vector", "probability",
                    "entropy", "enthalpy", "potential", "momentum", "angular"];
    return common.some(k => slug.includes(k) || title.includes(k) || unit.includes(k));
  });
  
  const pct = Math.round((matched.length / filtered.length) * 100);
  console.log(`${subj}: ${matched.length}/${filtered.length} (${pct}%)`);
  
  if (matched.length < filtered.length) {
    const missing = filtered.filter(t => !matched.includes(t));
    if (unmatchedExamples.length < 10) {
      for (const t of missing.slice(0, 3)) {
        unmatchedExamples.push({subj, topic: t.topicSlug, title: t.topicTitle});
      }
    }
    unmatched += filtered.length - matched.length;
  }
}

console.log(`\nTotal potentially unmatched: ${unmatched}/${index.length}`);

if (unmatchedExamples.length > 0) {
  console.log("\nExamples of unmatched topics:");
  for (const ex of unmatchedExamples) {
    console.log(`  ${ex.subj}: ${ex.topic} - ${ex.title}`);
  }
}
