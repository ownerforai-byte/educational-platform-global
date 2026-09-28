/**
 * mindmap-validate — fast structural + coverage audit for the mindmap depth
 * packs, without paying for a full tsc run.
 *
 * The packs are plain data with two TS-isms (a `import type` line and a
 * `: Record<string, UnitDepth>` annotation), so we strip those, evaluate the
 * module, and cross-check every leaf id against the ids actually declared in
 * visual-concept-map.tsx. Any id that does not exist upstream is a typo that
 * would silently render nothing — this script is what catches that.
 */
import fs from "node:fs";
import path from "node:path";

const LIB = path.join(process.cwd(), "frontend", "lib");
const REGISTRY = path.join(LIB, "visual-concept-map.tsx");

// ── 1. leaf ids actually declared in the registry ──────────────────────────
const src = fs.readFileSync(REGISTRY, "utf8");
const unitKeys = [];
src.split("\n").forEach((ln, i) => {
  const m = ln.replace(/\r$/, "").match(/^ {2}"([a-z0-9-]+)": \{$/);
  if (m) unitKeys.push({ slug: m[1], line: i });
});

/** unitSlug -> Set(leafId) */
const expected = new Map();
for (let i = 0; i < unitKeys.length; i++) {
  const start = unitKeys[i].line;
  const end = i + 1 < unitKeys.length ? unitKeys[i + 1].line : src.indexOf("\n};", start);
  const slice = src.split("\n").slice(start, end).join("\n");
  const ids = new Set();
  const re = /leaf\("([^"]+)"/g;
  let m;
  while ((m = re.exec(slice)) !== null) ids.add(m[1]);
  expected.set(unitKeys[i].slug, ids);
}

// ── 2. load every depth pack module ────────────────────────────────────────
// the -index file is pure wiring (side-effect imports), not a data pack;
// the -fb- files are leaf-id packs audited separately in section 4.
const files = fs
  .readdirSync(LIB)
  .filter(
    (f) =>
      /^mindmap-depth-.*\.ts$/.test(f) &&
      f !== "mindmap-depth-index.ts" &&
      !f.startsWith("mindmap-depth-fb-"),
  )
  .sort();

const packs = new Map();
for (const f of files) {
  const raw = fs.readFileSync(path.join(LIB, f), "utf8");
  const stripped = raw
    .replace(/^import type .*$/gm, "")
    .replace(/export const (\w+): Record<string, UnitDepth> =/g, "const $1 =");
  const names = (stripped.match(/^const (\w+) = \{/gm) || []).map((d) =>
    d.replace(/^const /, "").replace(/ = \{$/, "").trim()
  );
  let mod;
  try {
    // eslint-disable-next-line no-new-func
    mod = new Function(stripped + "\nreturn {" + names.join(",") + "};")();
  } catch (err) {
    console.log("PARSE FAIL  " + f + "  ->  " + String(err).split("\n")[0]);
    process.exitCode = 1;
    continue;
  }
  // each exported const is itself a unitId -> UnitDepth record; merge them
  for (const n of names) {
    for (const [unitId, depth] of Object.entries(mod[n] ?? {})) {
      packs.set(unitId, depth);
    }
  }
}

// ── 2b. fallback leaf ids declared inline in topic-mindmap.tsx ──────────────
const FALLBACK_SRC = path.join(LIB, "..", "components", "lab", "topic-mindmap.tsx");
const fbSrc = fs.readFileSync(FALLBACK_SRC, "utf8");
const fallbackIds = new Set();
const fbRe = /id:\s*"((?:ph|ch|math|bio|ch-o)-[a-z0-9]+)",\s*\r?\n\s*title:\s*"[^"]+"/g;
let fm;
while ((fm = fbRe.exec(fbSrc)) !== null) fallbackIds.add(fm[1]);

const FIELDS = ["keyFacts", "edgeCases", "examAsked", "commonMistakes"];

// ── 3. cross-check + report ────────────────────────────────────────────────
let errors = 0;
let totalItems = 0;
let coveredLeaves = 0;
let allLeaves = 0;
const rows = [];

for (const [slug, ids] of expected) {
  allLeaves += ids.size;
  const depth = packs.get(slug);
  if (!depth) {
    rows.push([slug, 0, 0, 0, 0, 0, "NO PACK"]);
    continue;
  }
  const leaves = depth.leaves ?? {};
  for (const leafId of Object.keys(leaves)) {
    if (!ids.has(leafId)) {
      console.log("UNKNOWN LEAF ID  " + slug + " -> " + leafId);
      errors++;
    }
  }
  let n = 0;
  for (const leafId of ids) {
    const leaf = leaves[leafId];
    if (!leaf) continue;
    coveredLeaves++;
    const counts = FIELDS.map((k) => leaf[k]?.length ?? 0);
    counts.forEach((c) => {
      n += c;
      if (c === 0) {
        console.log("EMPTY FIELD  " + slug + " / " + leafId + " -> missing " + FIELDS[counts.indexOf(c)]);
        errors++;
      }
    });
  }
  const unitItems =
    (depth.unitFacts?.length ?? 0) +
    (depth.unitEdgeCases?.length ?? 0) +
    (depth.unitExamAsked?.length ?? 0) +
    (depth.unitCommonMistakes?.length ?? 0);
  totalItems += n + unitItems;
  rows.push([slug, covered(slug, leaves, ids), n, depth.unitFacts?.length ?? 0, depth.unitEdgeCases?.length ?? 0, unitItems, ""]);
}

function covered(slug, leaves, ids) {
  let c = 0;
  for (const id of ids) if (leaves[id]) c++;
  return c;
}

console.log("");
console.log("unit".padEnd(42) + "leaves  items  unitFacts  unitEdge  status");
console.log("-".repeat(92));
for (const r of rows) {
  console.log(
    String(r[0]).padEnd(42) +
    String(r[1]).padStart(3) + "/" + String(expected.get(r[0]).size).padEnd(4) +
    String(r[2]).padStart(5) +
    String(r[3]).padStart(10) +
    String(r[4]).padStart(10) +
    "  " + (r[6] || "ok")
  );
}
console.log("-".repeat(92));
console.log("leaves covered: " + coveredLeaves + "/" + allLeaves);
console.log("total depth items: " + totalItems);

// ── 4. fallback (last-resort generic) leaf coverage ────────────────────────
const fbFile = path.join(LIB, "mindmap-depth.ts");
void fbFile;
const fbPacks = new Map();
for (const f of fs.readdirSync(LIB).filter((n) => /^mindmap-depth-fb-.*\.ts$/.test(n))) {
  const raw = fs.readFileSync(path.join(LIB, f), "utf8");
  const stripped = raw
    .replace(/^import type .*$/gm, "")
    .replace(/export const (\w+): Record<string, LeafDepth> =/g, "const $1 =");
  const names = (stripped.match(/^const (\w+) = \{/gm) || []).map((d) =>
    d.replace(/^const /, "").replace(/ = \{$/, "").trim()
  );
  let mod;
  try {
    // eslint-disable-next-line no-new-func
    mod = new Function(stripped + "\nreturn {" + names.join(",") + "};")();
  } catch (err) {
    console.log("PARSE FAIL  " + f + "  ->  " + String(err).split("\n")[0]);
    process.exitCode = 1;
    continue;
  }
  for (const n of names) {
    for (const [id, pack] of Object.entries(mod[n] ?? {})) fbPacks.set(id, pack);
  }
}

console.log("");
console.log("fallback (last-resort) leaf coverage");
console.log("-".repeat(92));
let fbCovered = 0;
let fbItems = 0;
for (const id of [...fallbackIds].sort()) {
  const pack = fbPacks.get(id);
  if (!pack) {
    console.log("  MISSING  " + id);
    errors++;
    continue;
  }
  let n = 0;
  for (const f of FIELDS) {
    const c = pack[f]?.length ?? 0;
    if (!c) {
      console.log("  EMPTY FIELD  " + id + " -> " + f);
      errors++;
    }
    n += c;
  }
  fbCovered++;
  fbItems += n;
}
for (const id of fbPacks.keys()) {
  if (!fallbackIds.has(id)) {
    console.log("  ORPHAN PACK  " + id + " (no such fallback leaf)");
    errors++;
  }
}
console.log("  fallback leaves covered: " + fbCovered + "/" + fallbackIds.size + "  items: " + fbItems);
console.log("-".repeat(92));
console.log("TOTAL depth items: " + (totalItems + fbItems));
console.log("errors: " + errors);
if (errors) process.exitCode = 1;
