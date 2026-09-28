import { NUM_DERIVATIVES, NUM_INTEGRATION } from "./calc-numericals.mjs";

/**
 * Additive patch for the two calculus files that live in the runtime tree but
 * are absent from the manifest. They are already well authored (28 and 22
 * notes), so their existing content is PRESERVED and only the `numericals`
 * field is attached. Never rewrite these wholesale.
 */
const PATCH = [
  {
    file: "04-derivatives-derivative-of-a-function-derivatives-of-algebraic-and-trigonometric-functions.json",
    nums: NUM_DERIVATIVES,
  },
  {
    file: "05-the-definite-integral-as-an-area-under-a-curve.json",
    nums: NUM_INTEGRATION,
  },
];

import fs from "node:fs";
import path from "node:path";

const dirs = [
  path.join(process.cwd(), "frontend", "public", "data", "syllabus-notes", "mathematics", "calculus"),
  path.join(process.cwd(), "content", "ravikishan", "class-11-notes", "mathematics", "calculus", "concepts"),
];

for (const p of PATCH) {
  for (const dir of dirs) {
    const full = path.join(dir, p.file);
    if (!fs.existsSync(full)) {
      console.log("skip (absent):", full);
      continue;
    }
    const before = JSON.parse(fs.readFileSync(full, "utf8"));
    const notesBefore = (before.notes || []).length;
    const after = { ...before, numericals: p.nums, practice: [] };
    fs.writeFileSync(full, JSON.stringify(after, null, 2) + "\n", "utf8");
    console.log(
      `patched ${p.file} in ${path.basename(dir === dirs[0] ? "public" : "content")}: notes kept ${notesBefore}, +${p.nums.length} numericals`
    );
  }
}
