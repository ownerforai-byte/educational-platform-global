// rails-table-missing.mjs — list rail cards lacking the Classified table row,
// split by whether the filename matches the current topic-rails naming
// (<unit>--<nn>-<kebab>-<hash>.rail.json).
import fs from "node:fs";
import path from "node:path";

const current = [];
const legacy = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".rail.json")) {
      const j = JSON.parse(fs.readFileSync(p, "utf8"));
      if ((j.rows || []).some((r) => r.label === "Classified table")) continue;
      const name = e.name.replace(/\.rail\.json$/, "");
      // current naming: unit--<digits>-<kebab>-<6 char hash>
      const isCurrent = /--\d{2}-.+-[a-z0-9]{6}$/.test(name);
      (isCurrent ? current : legacy).push(p.split(path.sep).join("/"));
    }
  }
}
walk("content/visuals/rails");
console.log("current-naming missing:", current.length, "| legacy/other:", legacy.length);
fs.writeFileSync("reports/rails-table-missing.json", JSON.stringify({ current, legacy }, null, 1));
