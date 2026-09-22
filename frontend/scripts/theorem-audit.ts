/**
 * Standalone audit: verifies every theorems-hub topic resolves to curated
 * content (no "coming soon" remains). Run: npx tsx scripts/theorem-audit.ts
 */
import { THEOREM_PROOF_SUBJECTS, getSyllabusTheoremItems } from "../lib/theorem-topics";

let total = 0;
const missing: { key: string; topic: string }[] = [];

for (const subjectSlug of THEOREM_PROOF_SUBJECTS) {
  for (const classSlug of ["class-11-notes", "class-12-notes"]) {
    const items = getSyllabusTheoremItems(classSlug, subjectSlug);
    for (const item of items) {
      total++;
      if (!item.hasCuratedContent || !item.curated) {
        missing.push({ key: item.key, topic: item.topicTitle });
      }
    }
  }
}

console.log(`Total theorem-hub topics: ${total}`);
console.log(`Covered: ${total - missing.length}`);
console.log(`Still coming-soon: ${missing.length}`);
for (const m of missing) console.log(`  - ${m.key} :: ${m.topic}`);
