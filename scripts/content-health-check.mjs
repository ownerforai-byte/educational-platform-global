import fs from "fs";
import path from "path";

const ROOT = process.cwd();

// ---------- 1. BOM-broken files scan ----------
function stripBOM(buf) {
  if (buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
    return buf.slice(3);
  }
  return buf;
}

function scanJSON(root) {
  const broken = [];
  const ok = [];
  function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".json")) {
        const raw = fs.readFileSync(p);
        try {
          JSON.parse(raw.toString("utf8"));
          ok.push(p);
        } catch (err) {
          // retry with BOM stripped
          let strippedOk = false;
          try {
            JSON.parse(stripBOM(raw).toString("utf8"));
            strippedOk = true;
          } catch {}
          broken.push({ file: p, error: err.message.slice(0, 90), bom: isBOM(raw), strippedParses: strippedOk });
        }
      }
    }
  }
  function isBOM(buf) { return buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf; }
  walk(root);
  return { ok: ok.length, broken };
}

const allJSON = path.join(ROOT, "content");
const result = scanJSON(allJSON);
console.log("=== ALL JSON FILES IN content/ ===");
console.log("Valid:", result.ok, "| Broken:", result.broken.length);
result.broken.forEach(b => {
  console.log(`  BROKEN: ${path.relative(ROOT, b.file)} | BOM=${b.bom} | strippedParses=${b.strippedParses} | ${b.error}`);
});

// ---------- 2. Fix BOM files ----------
let fixed = 0;
for (const b of result.broken) {
  if (b.bom && b.strippedParses) {
    const raw = fs.readFileSync(b.file);
    const stripped = stripBOM(raw);
    // reformat nicely
    const obj = JSON.parse(stripped.toString("utf8"));
    fs.writeFileSync(b.file, JSON.stringify(obj, null, 2), "utf8");
    fixed++;
    console.log(`  FIXED BOM: ${path.relative(ROOT, b.file)}`);
  }
}
console.log(`\nBOM files fixed: ${fixed}`);

// ---------- 3. _index.json completeness analysis ----------
const index = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "ravikishan", "_index.json"), "utf8"));
const keys = Object.keys(index);
let complete = 0, incomplete = 0;
const incompleteSamples = [];
for (const k of keys) {
  const v = index[k];
  const notes = v.notes;
  let hasContent = false;
  if (Array.isArray(notes)) hasContent = notes.some(s => typeof s === "string" && s.trim().length > 20);
  else if (typeof notes === "string") hasContent = notes.trim().length > 20;
  if (hasContent) complete++; else {
    incomplete++;
    if (incompleteSamples.length < 30) incompleteSamples.push({ key: k.split(/[/\\]/).slice(-1)[0], type: Array.isArray(notes) ? `array[${notes.length}]` : typeof notes, title: (v.title || "").slice(0, 50) });
  }
}
console.log("\n=== _index.json completeness ===");
console.log("Entries WITH real notes content:", complete);
console.log("Entries WITHOUT real content:", incomplete);
console.log("Incomplete samples:");
incompleteSamples.forEach(s => console.log(`  ${s.key} | type=${s.type} | title=${s.title}`));

// ---------- 4. Inspect a neb-YYYY entry ----------
const nebSampleKey = keys.find(k => k.includes("neb-2025") || k.includes("neb-2024"));
if (nebSampleKey) {
  const v = index[nebSampleKey];
  console.log("\n=== Sample neb-YYYY entry structure ===");
  console.log("key:", path.basename(nebSampleKey));
  console.log("title:", v.title);
  console.log("fields present:", Object.keys(v).join(", "));
  console.log("notes type:", Array.isArray(v.notes) ? `array(${v.notes.length})` : typeof v.notes);
  console.log("topicSlug:", v.topicSlug);
  console.log("sample value:", JSON.stringify(v).slice(0, 300));
}

// ---------- 5. Re-scan JSON after fix ----------
const result2 = scanJSON(allJSON);
console.log("\n=== RE-SCAN AFTER FIX ===");
console.log("Valid:", result2.ok, "| Broken:", result2.broken.length);
