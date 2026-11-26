// render-check.mjs — run the app's own note pipeline over the appended
// classified tables and assert real <table> output (never shattered pipes).
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const { execSync } = await import("node:child_process");
// Use tsx to run TS import of the pipeline for a sample of files.
const script = `
import { readFileSync } from "node:fs";
import { renderNoteHtml } from "../frontend/lib/content/pipeline";
const files = process.argv.slice(2);
let fail = 0, checked = 0;
for (const f of files) {
  const j = JSON.parse(readFileSync(f, "utf8"));
  const notes = [...(j.notes || []), ...((j.enrichedContent || {}).notes || [])];
  for (const n of notes) {
    if (!n.includes("|")) continue;
    const html = renderNoteHtml(n);
    if (n.includes("|---")) {
      checked++;
      if (!html.includes("<table")) { fail++; console.log("NO TABLE:", f, "::", n.slice(0, 60)); }
      if (html.includes("|---")) { fail++; console.log("RAW DELIMITER LEAKED:", f); }
    }
  }
}
console.log("checked table blocks:", checked, "failures:", fail);
process.exit(fail ? 1 : 0);
`;
fs.writeFileSync("reports/render-check.ts", script);
const sample = [];
const pick = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory() && sample.length < 40) pick(p);
    else if (e.name.endsWith(".json") && sample.length < 40) sample.push(p);
  }
};
// sample across all six subjects, both classes
const subjects = [
  "class-11/biology", "class-11/chemistry", "class-11/physics", "class-11/mathematics", "class-11/english", "class-11/nepali",
  "class-12/biology", "class-12/chemistry", "class-12/physics", "class-12/mathematics", "class-12/english", "class-12/nepali",
];
for (const s of subjects) {
  const dir = path.join("content/notes/concepts", s);
  const units = fs.readdirSync(dir).filter((u) => fs.statSync(path.join(dir, u)).isDirectory());
  const unit = units[0];
  const files = fs.readdirSync(path.join(dir, unit)).filter((f) => f.endsWith(".json"));
  sample.push(path.join(dir, unit, files[0]));
}
try {
  execSync(`npx tsx reports/render-check.ts ${sample.join(" ")}`, { stdio: "inherit", cwd: process.cwd() });
} catch {
  process.exitCode = 1;
}
