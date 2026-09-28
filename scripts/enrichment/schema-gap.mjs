/**
 * schema-gap — compare the fields PLANS.md declares for ConceptNoteSchema
 * against the fields the content corpus actually uses. A field the UI reads but
 * the schema omits will be either rejected (if .strict()) or silently dropped
 * (if optional), which is how content silently disappears.
 */
import fs from "node:fs";
import path from "node:path";

const PLANS = path.join(process.cwd(), "PLANS.md");
const CORPUS = path.join(process.cwd(), "content", "ravikishan", "class-11-notes");

// Fields PLANS.md §2 lists as the authored note shape.
const plans = fs.readFileSync(PLANS, "utf8");
const block = plans.split("Exact concept-file shape")[1]?.split("```")[1] ?? "";
const declared = new Set();
for (const tok of block.matchAll(/\b([a-zA-Z][a-zA-Z0-9]*)\s*:/g)) declared.add(tok[1]);
for (const tok of block.matchAll(/`([a-zA-Z][a-zA-Z0-9]*)`/g)) declared.add(tok[1]);
// tabGroup is documented in prose right after the block
declared.add("tabGroup");

const used = new Map();
let scanned = 0;
let arrayRooted = 0;
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) {
      walk(f);
      continue;
    }
    if (!e.name.endsWith(".json") || e.name.startsWith("_") || e.name === "plan.json") continue;
    let j;
    try {
      j = JSON.parse(fs.readFileSync(f, "utf8"));
    } catch {
      continue;
    }
    scanned++;
    // Only object-rooted note files describe a note shape. Array-rooted files
    // (exam banks, question sets) expose numeric indices as keys.
    if (Array.isArray(j) || j === null || typeof j !== "object") {
      arrayRooted++;
      continue;
    }
    for (const k of Object.keys(j)) used.set(k, (used.get(k) ?? 0) + 1);
  }
})(CORPUS);

const missing = [...used.keys()].filter((k) => !declared.has(k)).sort();
const unused = [...declared].filter((k) => !used.has(k)).sort();

console.log(`files scanned: ${scanned}  (array/non-object roots skipped: ${arrayRooted})`);
console.log("PLANS.md declared note fields:", declared.size);
console.log("distinct top-level fields on object-rooted notes:", used.size);
console.log("");
console.log("USED IN CORPUS BUT NOT DECLARED IN PLANS.md  <-- .strict() would reject these files");
for (const k of missing) console.log("   " + k.padEnd(26) + used.get(k) + " files");
console.log("");
console.log("DECLARED IN PLANS.md BUT UNUSED IN THE CORPUS  <-- harmless, just noting");
for (const k of unused) console.log("   " + k);

