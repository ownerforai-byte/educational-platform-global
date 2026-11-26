// tables-strict-census.mjs — topics with no real markdown table in notes
// (header line with pipes followed by a delimiter row), top-level or enriched.
import fs from "node:fs";
import path from "node:path";

const root = "content/notes/concepts";
const delimRe = /^\|?[ :\-\-|]+\|?$/;
const pyqHeader = /\byear\b/i;
const results = [];
function hasTable(notes) {
  const lines = notes.join("\n").split("\n");
  for (let i = 0; i < lines.length - 1; i++) {
    if (!lines[i].includes("|")) continue;
    if (!delimRe.test(lines[i + 1].trim())) continue;
    if (pyqHeader.test(lines[i])) continue;
    return true;
  }
  return false;
}
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".json")) {
      try {
        const j = JSON.parse(fs.readFileSync(p, "utf8"));
        const top = Array.isArray(j.notes) ? j.notes : [];
        const enr = Array.isArray((j.enrichedContent || {}).notes) ? j.enrichedContent.notes : [];
        if (!hasTable(top) && !hasTable(enr)) {
          results.push(p.split(path.sep).join("/").replace(root + "/", ""));
        }
      } catch { /* skip */ }
    }
  }
}
walk(root);
console.log("topics with no real table:", results.length);
const bySub = {};
for (const r of results) {
  const k = r.split("/").slice(0, 2).join("/");
  bySub[k] = (bySub[k] || 0) + 1;
}
console.log(JSON.stringify(bySub, null, 1));
fs.writeFileSync("reports/tables-strict-worklist.json", JSON.stringify(results, null, 1));
