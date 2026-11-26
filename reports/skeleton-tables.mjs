// skeleton-tables.mjs — find tables that have a header + delimiter but NO data
// rows (skeletons), listing each with its header cells for authoring.
import fs from "node:fs";
import path from "node:path";

const root = "content/notes/concepts";
const delimRe = /^\|?[ :\-\-|]+\|?$/;
const out = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".json")) {
      try {
        const j = JSON.parse(fs.readFileSync(p, "utf8"));
        const notes = [...(Array.isArray(j.notes) ? j.notes : []), ...(Array.isArray((j.enrichedContent || {}).notes) ? j.enrichedContent.notes : [])];
        const lines = notes.join("\n").split("\n");
        const skels = [];
        for (let i = 0; i < lines.length - 1; i++) {
          if (!lines[i].includes("|") || !delimRe.test(lines[i + 1].trim())) continue;
          let k = i + 2;
          if (k < lines.length && lines[k].includes("|") && lines[k].trim()) {
            continue; // has data rows — not a skeleton
          }
          const cells = lines[i].replace(/^\s*\|/, "").replace(/\|\s*$/, "").split("|").map((s) => s.trim());
          // find preceding title
          let t = i - 1;
          while (t >= 0 && !lines[t].trim()) t--;
          const title = t >= 0 ? lines[t].trim().replace(/\*\*/g, "").replace(/^#+\s*/, "") : "(untitled)";
          skels.push({ title, header: cells });
        }
        if (skels.length) {
          out.push({ f: p.split(path.sep).join("/").replace(root + "/", ""), skels });
        }
      } catch { /* skip */ }
    }
  }
}
walk(root);
console.log("files with skeleton tables:", out.length, "| skeletons:", out.reduce((n, r) => n + r.skels.length, 0));
fs.writeFileSync("reports/skeleton-tables.json", JSON.stringify(out, null, 1));
