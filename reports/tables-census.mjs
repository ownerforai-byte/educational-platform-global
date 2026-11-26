// tables-census.mjs — count concept topics lacking a markdown table (delimiter row).
import fs from "node:fs";
import path from "node:path";

const root = "content/notes/concepts";
const delim = new RegExp("^\\s*\\|?\\s*:?-{1,}:?\\s*(\\|\\s*:?-+:?\\s*)*\\|?\\s*$");
const all = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".json")) {
      try {
        const j = JSON.parse(fs.readFileSync(p, "utf8"));
        const notes = j.notes || j.sections || [];
        const txt = Array.isArray(notes) ? notes.join("\n") : String(notes);
        let has = false;
        for (const line of txt.split("\n")) {
          if (delim.test(line.trim()) && line.includes("|")) { has = true; break; }
        }
        all.push({ f: p.split(path.sep).join("/").replace(root + "/", ""), has });
      } catch { /* skip invalid */ }
    }
  }
}
walk(root);
const missing = all.filter((t) => !t.has);
console.log("total", all.length, "no-table", missing.length);
const bySub = {};
for (const t of missing) {
  const k = t.f.split("/").slice(0, 2).join("/");
  bySub[k] = (bySub[k] || 0) + 1;
}
console.log(JSON.stringify(bySub, null, 1));
fs.writeFileSync("reports/tables-gap-worklist.json", JSON.stringify(missing.map((t) => ({ f: t.f })), null, 1));
