// tables-classified-census.mjs — topics whose only tables are PYQ/exam tables
// (no conceptual classified table). A classified table = markdown table whose
// header does not look like a past-paper listing (Year/Question/Marks/Type).
import fs from "node:fs";
import path from "node:path";

const root = "content/notes/concepts";
const delim = new RegExp("^\\s*\\|?\\s*:?-{1,}:?\\s*(\\|\\s*:?-+:?\\s*)*\\|?\\s*$");
const pyqHeader = /\b(year|question|marks|type|asked)\b/i;
const results = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".json")) {
      try {
        const j = JSON.parse(fs.readFileSync(p, "utf8"));
        const notes = [...(j.notes || []), ...((j.enrichedContent || {}).notes || [])];
        const txt = notes.join("\n");
        const lines = txt.split("\n");
        let classified = false, pyqOnly = 0;
        for (let i = 0; i < lines.length; i++) {
          if (!lines[i].includes("|") || !delim.test((lines[i + 1] || "").trim())) continue;
          const headerLine = lines[i];
          const prev = (lines[i - 1] || "").trim();
          if (pyqHeader.test(headerLine) && /year/i.test(headerLine)) { pyqOnly++; continue; }
          if (prev.startsWith("### 4") || /PYQ|solved-paper/i.test(prev) && /year/i.test(headerLine)) { pyqOnly++; continue; }
          classified = true;
        }
        if (!classified) {
          results.push({
            f: p.split(path.sep).join("/").replace(root + "/", ""),
            pyqTables: pyqOnly,
          });
        }
      } catch { /* skip */ }
    }
  }
}
walk(root);
console.log("topics without a classified table:", results.length);
const bySub = {};
for (const r of results) {
  const k = r.f.split("/").slice(0, 2).join("/");
  bySub[k] = (bySub[k] || 0) + 1;
}
console.log(JSON.stringify(bySub, null, 1));
fs.writeFileSync("reports/tables-classified-worklist.json", JSON.stringify(results, null, 1));
