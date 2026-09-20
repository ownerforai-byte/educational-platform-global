import fs from "node:fs";
import path from "node:path";

const base = path.join(process.cwd(), "frontend", "public", "data");

function readJSON(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return null;
  }
}

const subjects = ["biology", "chemistry", "english", "mathematics", "nepali", "physics"];

console.log("=== frontend/public/data — manifests & counts ===");
let grandFiles = 0;
let emptyNotes = 0;
let filledNotes = 0;
let brokenManifests = 0;
let brokenFiles = 0;

function countNested(dir) {
  let n = 0;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) n += countNested(f);
    else if (e.name.endsWith(".json") && e.name !== "_manifest.json") n++;
  }
  return n;
}

function scanContent(dir) {
  let empty = 0, filled = 0, broken = 0;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) {
      const sub = scanContent(f);
      empty += sub.empty; filled += sub.filled; broken += sub.broken;
    } else if (e.name.endsWith(".json") && e.name !== "_manifest.json") {
      const v = readJSON(f);
      if (v === null) { broken++; continue; }
      const n = v.notes;
      let has = false;
      if (Array.isArray(n)) has = n.some((x) => typeof x === "string" && x.trim().length > 20);
      else if (typeof n === "string") has = n.trim().length > 20;
      else if (n && typeof n === "object") has = true;
      if (has) filled++; else empty++;
    }
  }
  return { empty, filled, broken };
}

for (const s of subjects) {
  const mfile = path.join(base, "syllabus-notes", s, "_manifest.json");
  const m = readJSON(mfile);
  if (!m) { console.log(`${s}: MANIFEST MISSING`); brokenManifests++; continue; }
  const sdir = path.join(base, "syllabus-notes", s);
  const nested = countNested(sdir);
  grandFiles += nested;
  const sc = scanContent(sdir);
  emptyNotes += sc.empty; filledNotes += sc.filled; brokenFiles += sc.broken;
  console.log(`${s.padEnd(13)} manifest entries: ${Array.isArray(m) ? m.length : "?"} | note files: ${nested} | real content: ${sc.filled} | empty: ${sc.empty} | broken: ${sc.broken}`);
}

console.log(`\nTOTAL note files: ${grandFiles} | WITH real content: ${filledNotes} | EMPTY: ${emptyNotes} | BROKEN: ${brokenFiles} | broken manifests: ${brokenManifests}`);

const rkm = readJSON(path.join(base, "ravikishan", "manifest.json"));
console.log("ravikishan/manifest.json:", Array.isArray(rkm) ? `array len ${rkm.length}` : rkm ? `object, keys=${Object.keys(rkm).length}` : "MISSING/INVALID");

const ex = readJSON(path.join(base, "exams"));
console.log("exams/: ", Array.isArray(ex) ? `array len ${ex.length}` : ex === null ? "INVALID JSON" : "object dir");

const reDir = path.join(base, "r-export");
console.log("r-export/ contents:", fs.readdirSync(reDir).map((f) => f).join(", "));
