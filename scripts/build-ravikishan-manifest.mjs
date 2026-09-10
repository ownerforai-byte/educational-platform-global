import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = "content/ravikishan";
const items = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) { walk(full); continue; }
    if (!name.endsWith(".json") || name === "manifest.json") continue;
    try {
      const data = JSON.parse(readFileSync(full, "utf8"));
      items.push({
        path: relative(ROOT, full).split("\\").join("/"),
        data: { title: data?.title ?? name.replace(/\.json$/, "") },
      });
    } catch (e) {
      console.error(`SKIP (invalid JSON): ${full} -> ${e.message}`);
    }
  }
}

walk(ROOT);
items.sort((a, b) => a.path.localeCompare(b.path));

const out = JSON.stringify(items, null, 2);
writeFileSync(join(ROOT, "manifest.json"), out);
mkdirSync("frontend/public/data/ravikishan", { recursive: true });
writeFileSync("frontend/public/data/ravikishan/manifest.json", out);
console.log(`manifest rebuilt: ${items.length} entries -> content/ravikishan/manifest.json + frontend/public/data/ravikishan/manifest.json`);
