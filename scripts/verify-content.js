// Final verification: JSON validity, key corruption, manifest coverage.
const fs = require("fs"), path = require("path");
let files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name.endsWith(".json")) files.push(p);
  }
})("content/ravikishan");
let ok = 0, bad = [];
for (const f of files) {
  try {
    const d = JSON.parse(fs.readFileSync(f, "utf8"));
    if (d && typeof d === "object" && !Array.isArray(d) && Object.keys(d).some(k => /["\\]/.test(k))) bad.push(f + " [corrupt keys]");
    else ok++;
  } catch (e) { bad.push(f + " [unparseable]"); }
}
console.log("TOTAL: " + files.length + " | clean: " + ok + " | problems: " + bad.length);
bad.forEach(b => console.log("  " + b));
// manifest coverage of new files
try {
  const m = JSON.parse(fs.readFileSync("content/ravikishan/manifest.json", "utf8"));
  const news = ["01-grammar-hacks-and-shortcuts.json", "01-notice-and-formal-informal-writing.json", "01-grammar-master-mindmap.json", "01-grammar-for-writing-sentences-clauses-punctuation.json", "01-paragraph-writing.json", "01-essay-writing-argumentative-descriptive-narrative-expository.json"];
  console.log("manifest entries: " + m.length);
  for (const n of news) {
    const hit = m.find(e => (e.path || e.file || e.name || "").includes(n.replace(".json", "")));
    console.log((hit ? "COVERED  " : "MISSING  ") + n);
  }
} catch (e) { console.log("manifest read fail: " + e.message); }