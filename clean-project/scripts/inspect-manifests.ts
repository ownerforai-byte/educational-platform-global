import fs from "fs";
import path from "path";

const RAVIKISHAN_MANIFEST = path.join(process.cwd(), "content", "ravikishan", "manifest.json");
const R_EXPORT_PATH = path.join(process.cwd(), "content", "r-export", "manifest.json");

const rav = JSON.parse(fs.readFileSync(RAVIKISHAN_MANIFEST, "utf-8"));
const rexp = JSON.parse(fs.readFileSync(R_EXPORT_PATH, "utf-8"));

console.log("=== RAVIKISHAN SUBJECTS ===");
const rSubj = new Map();
for (const item of rav) {
  const parts = item.path.split("/");
  const subj = parts[2];
  if (!rSubj.has(subj)) rSubj.set(subj, []);
  rSubj.get(subj).push(item.path);
}
for (const [subj, paths] of rSubj.entries()) {
  console.log(`\n${subj} (${paths.length}):`);
  for (const p of paths.slice(0, 10)) console.log("  -", p);
  if (paths.length > 10) console.log(`  ... and ${paths.length - 10} more`);
}

console.log("\n=== R-EXPORT SUBJECTS ===");
const rSubj2 = new Map();
for (const item of rexp) {
  if (!rSubj2.has(item.subject)) rSubj2.set(item.subject, []);
  rSubj2.get(item.subject).push(item);
}
for (const [subj, items] of rSubj2.entries()) {
  console.log(`\n${subj} (${items.length}):`);
  for (const it of items) console.log(`  - ${it.chapter}/${it.id}`);
}
