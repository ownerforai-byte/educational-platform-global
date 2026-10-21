import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { MASTER_ACADEMIC_PROMPT, PROFESSOR_STYLE_RULES } from "./src/ai/prompts";
import { MASTER_ACADEMIC_RULES, ACADEMIC_INTELLIGENCE_RULES, ACADEMIC_TAXONOMY_RULES } from "./src/ai/academic-intelligence";
import { DEEP_ANSWER_RULES } from "./src/ai/deep-answer";
import { ARTIFACT_RULES } from "./src/ai/artifact-rules";
import { REPLY_CRAFT_RULES } from "./src/ai/reply-craft";
import { CLASS_SCOPE_RULES } from "./src/ai/class-scope";
import { SOURCE_REGISTRY_RULES } from "./src/ai/source-registry";
const layers = { PROFESSOR_STYLE_RULES, MASTER_ACADEMIC_RULES, DEEP_ANSWER_RULES, ARTIFACT_RULES, REPLY_CRAFT_RULES, CLASS_SCOPE_RULES, SOURCE_REGISTRY_RULES };
for (const [k, v] of Object.entries(layers)) console.log(k, (v as string).length);
console.log("TOTAL", MASTER_ACADEMIC_PROMPT.length, "OVERFLOW", MASTER_ACADEMIC_PROMPT.length - 60000);
const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ");
const PROMPT = norm(MASTER_ACADEMIC_PROMPT);
const ACADEMIC = norm(ACADEMIC_INTELLIGENCE_RULES);
const TAXONOMY = norm(ACADEMIC_TAXONOMY_RULES);
const files: string[] = [];
function walk(dir: string) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".test.ts")) files.push(p);
  }
}
walk("tests");
const missing: string[] = [];
for (const f of files) {
  const src = readFileSync(f, "utf8");
  for (const m of src.matchAll(/toContain\("([^"]{6,})"\)/g)) {
    const s = m[1];
    if (s.startsWith("${")) continue;
    const n = norm(s);
    const hay = f.includes("academic-intelligence.test") ? PROMPT + "\n" + ACADEMIC + "\n" + TAXONOMY : PROMPT;
    if (!hay.includes(n)) missing.push(f + " :: " + JSON.stringify(s));
  }
}
console.log("MISSING (" + missing.length + "):");
for (const s of missing) console.log("  " + s);
