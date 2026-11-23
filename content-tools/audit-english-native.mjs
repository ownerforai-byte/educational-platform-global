#!/usr/bin/env node
/**
 * Audit ALL English notes (class-11 + class-12) for "native English" quality:
 *  1. placeholder scaffolding ("fill pass", "authored SVG", template titles)
 *  2. formula-style block titles reused from science notes
 *  3. thin content
 *  4. literary-device vocabulary coverage (simile, metaphor, imagery, tone...)
 * Prints a per-file verdict and a summary. Report -> content-tools/english-audit.json
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["content/notes/concepts/class-11/english", "content/notes/concepts/class-12/english"];

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (e.endsWith(".json")) out.push(p);
  }
  return out;
}

const PLACEHOLDER = [
  "fill pass", "authored SVG", "Model analyses written in the unit fill pass",
  "Full prose summary at fill", "one-line definition + one-line exam use",
  "it must match", "seeded exam", "Chemical picture", "Reaction and equation block",
];
const FORMULA_TITLES = [
  "Topic Introduction", "Fundamental Conceptual Understanding", "Master Comparison",
  "Conceptual Relationships", "Exam Orientation", "Working Method", "Vocabulary architecture",
];
const LITERARY = [
  "simile", "metaphor", "personification", "imagery", "symbolism", "irony", "alliteration",
  "tone", "mood", "theme", "stanza", "narrator", "characterisation", "characterization",
  "rhyme", "metre", "meter", "assonance", "hyperbole", "oxymoron", "pun", "foreshadow",
  "soliloquy", "monologue", "dialogue", "plot", "setting", "climax", "motif", "euphemism",
];

const report = [];
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const rel = file.replace(/\\/g, "/");
    const d = JSON.parse(readFileSync(file, "utf-8"));
    const notes = Array.isArray(d.notes) ? d.notes.map(String) : [];
    const text = notes.join("\n");
    const chars = text.length;
    const placeholders = PLACEHOLDER.filter((p) => text.includes(p));
    const formulaTitles = FORMULA_TITLES.filter((t) => text.includes(t));
    const litHits = LITERARY.filter((l) => text.toLowerCase().includes(l));
    const tables = notes.filter((n) => (n.match(/\|/g) ?? []).length >= 4).length;
    report.push({
      rel: rel.replace("content/notes/concepts/", ""),
      unit: rel.split("/").slice(-2, -1)[0],
      file: rel.split("/").pop(),
      chars,
      blocks: notes.length,
      tables,
      placeholders,
      formulaTitles,
      litScore: litHits.length,
      verdict: (() => {
        const lit = litHits.length;
        return placeholders.length > 0 ? "PLACEHOLDER"
        : chars < 2000 ? "THIN"
        : formulaTitles.length >= 3 ? "FORMULA"
        : lit >= 6 ? "NATIVE-OK"
        : "MIXED";
      })(),
    });
  }
}

const counts = {};
for (const r of report) counts[r.verdict] = (counts[r.verdict] ?? 0) + 1;
console.log("English note files:", report.length);
console.log("verdicts:", counts);
console.log("\n-- PLACEHOLDER files:");
for (const r of report.filter((r) => r.verdict === "PLACEHOLDER")) console.log("  ", r.rel.slice(0, 90), `(${r.chars} chars)`);
console.log("\n-- THIN files:");
for (const r of report.filter((r) => r.verdict === "THIN")) console.log("  ", r.rel.slice(0, 90), `(${r.chars} chars)`);
console.log("\n-- FORMULA files (template scaffolding, no literary voice):");
for (const r of report.filter((r) => r.verdict === "FORMULA")) console.log("  ", r.rel.slice(0, 90), `(${r.chars} chars, lit=${r.litScore})`);
console.log("\n-- MIXED files:");
for (const r of report.filter((r) => r.verdict === "MIXED")) console.log("  ", r.rel.slice(0, 90), `(${r.chars} chars, lit=${r.litScore}, tables=${r.tables})`);
writeFileSync("content-tools/english-audit.json", JSON.stringify(report, null, 2));
console.log("\nfull report: content-tools/english-audit.json");
