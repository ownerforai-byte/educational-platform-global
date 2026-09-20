/**
 * Coverage audit — syllabus topics × authored derivations.
 * Produces scripts/coverage.json: { "class|subject": { unitId: string[] } }
 * and prints authored (curated-merged) counts via theorem-topics heuristics.
 */
const fs = require("fs");
const ts = fs.readFileSync("lib/syllabus.ts", "utf8");
const lines = ts.split(/\r?\n/);

let cls = null, subj = null, unit = null, inTopics = false;
const data = {};
for (const L of lines) {
  if (/^\s{4}slug: "(class-1[12]-notes)"/.test(L)) cls = L.match(/"([^"]+)"/)[1];
  if (/^\s{8}slug: "([a-z-]+)"/.test(L)) subj = L.match(/"([^"]+)"/)[1];
  const um = L.match(/^\s*id: "([\w-]+)"/);
  if (um && cls && subj) { unit = um[1]; inTopics = false; }
  if (/topics: \[/.test(L)) inTopics = true;
  if (inTopics && /^\s*\],?\s*$/.test(L)) inTopics = false;
  const tm = L.match(/^\s*"(.+)",?\s*$/);
  if (inTopics && tm && cls && subj && unit) {
    const key = `${cls}|${subj}`;
    data[key] = data[key] || {};
    data[key][unit] = data[key][unit] || [];
    data[key][unit].push(tm[1]);
  }
}
fs.writeFileSync("scripts/coverage.json", JSON.stringify(data, null, 1));
for (const [k, units] of Object.entries(data)) {
  const total = Object.values(units).reduce((a, b) => a + b.length, 0);
  console.log(`${k}: ${Object.keys(units).length} units, ${total} topics`);
}
