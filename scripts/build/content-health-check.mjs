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
const index = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "_index.json"), "utf8"));
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

// ---------- 6. Glued GFM table headers ----------
// A table whose header row is glued to a lead-in (`**Answer.** | Basis | …`)
// makes remark-gfm drop the whole block back to a shattered paragraph, because
// a GFM table must start its own block. Same for an orphan delimiter row with
// no header above it. Both shipped once already (13 biology tables, 2026-11-25);
// this gate keeps them out.
function scanGluedTables(root) {
  const delimRow = /^\s*\|?\s*:?-{1,}:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/;
  const hits = [];
  function walkStr(s) {
    if (typeof s === "string") {
      const lines = s.split("\n");
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const pipeCount = (line.match(/\|/g) || []).length;
        const next = lines[i + 1];
        if (pipeCount >= 2 && next && delimRow.test(next)) {
          // Glued header: the delimiter row follows a line that is not itself
          // a pipe row. A pure `|---|` first line (orphan delimiter with rows
          // below but no header) is the same failure in the other direction.
          if (!/^\s*\|/.test(line) || delimRow.test(line)) hits.push(line.slice(0, 80));
        }
      }
    } else if (Array.isArray(s)) s.forEach(walkStr);
    else if (s && typeof s === "object") for (const k in s) walkStr(s[k]);
  }
  function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".json")) {
        try { walkStr(JSON.parse(fs.readFileSync(p, "utf8"))); } catch {}
      }
    }
  }
  walk(root);
  return hits;
}
const glued = scanGluedTables(path.join(ROOT, "content", "notes", "concepts"));
console.log("\n=== Glued GFM table headers (content/notes/concepts) ===");
console.log("Broken tables:", glued.length);
glued.slice(0, 10).forEach(l => console.log(`  GLUED: ${l}`));

// Gate semantics: fail when JSON is still unparseable after the BOM pass, or
// when glued table headers would render as shattered paragraphs.
if (result2.broken.length > 0) {
  console.error("\n" + result2.broken.length + " JSON file(s) still unparseable - content health check FAILED.");
  process.exit(1);
}
if (glued.length > 0) {
  console.error("\n" + glued.length + " glued table header(s) - tables would render as broken paragraphs. Split the bold lead-in onto its own line before the table.");
  process.exit(1);
}
