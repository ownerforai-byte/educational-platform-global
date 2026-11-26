// rails-table-coverage.mjs — count rail cards carrying a "Classified table" row.
import fs from "node:fs";
import path from "node:path";

let found = 0, total = 0;
const missing = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".rail.json")) {
      total++;
      const j = JSON.parse(fs.readFileSync(p, "utf8"));
      if ((j.rows || []).some((r) => r.label === "Classified table")) found++;
      else missing.push(p.split(path.sep).join("/"));
    }
  }
}
walk("content/visuals/rails");
console.log("rail cards:", total, "with Classified table row:", found, "missing:", missing.length);
const bySub = {};
for (const m of missing) {
  const k = m.split("/").slice(2, 4).join("/");
  bySub[k] = (bySub[k] || 0) + 1;
}
console.log(JSON.stringify(bySub, null, 1));
