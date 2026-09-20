/** Dump (class|subject|unit :: topic) rows for the derivation-fill plan. */
const fs = require("fs");
const ts = fs.readFileSync("lib/syllabus.ts", "utf8").split(/\r?\n/);
let cls = null, subj = null, unit = null, inT = false;
const rows = [];
for (const L of ts) {
  const cm = L.match(/^\s{4}slug: "(class-1[12]-notes)"/);
  if (cm) { cls = cm[1]; subj = null; }
  const sm = L.match(/^\s{8}slug: "([a-z-]+)"/);
  if (sm && cls) subj = sm[1];
  const um = L.match(/^\s*id: "([\w-]+)"/);
  if (um && cls && subj) { unit = um[1]; inT = false; }
  if (/topics: \[/.test(L)) inT = true;
  if (inT && /^\s*\],?\s*$/.test(L)) inT = false;
  const tm = L.match(/^\s*"(.+)",?\s*$/);
  if (inT && tm && cls && subj) {
    rows.push(cls + "|" + subj + "|" + unit + " :: " + tm[1].slice(0, 95));
  }
}
const want = [
  "class-12-notes|physics",
  "class-12-notes|mathematics",
  "class-12-notes|chemistry",
  "class-12-notes|biology",
  "class-11-notes|physics",
  "class-11-notes|chemistry",
  "class-11-notes|mathematics",
];
rows
  .filter((r) => want.includes(r.split(" :: ")[0].split("|").slice(0, 2).join("|")))
  .forEach((r) => console.log(r));
