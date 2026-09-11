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
      const entry = {
        path: relative(ROOT, full).split("\\").join("/"),
        data: {
          title: data?.title ?? name.replace(/\.json$/, ""),
          unitSlug: data?.unitSlug ?? "",
          topicSlug: data?.topicSlug ?? "",
          source: data?.source ?? "ravikishan",
          // Carry mindmap structure so the frontend can prefer it
          ...(data?.root ? { root: data.root } : {}),
          ...(Array.isArray(data?.notes) ? { notes: data.notes } : {}),
          // Display fields for the Formulas / Numericals / Notes tabs
          ...(Array.isArray(data?.formulas) ? { formulas: data.formulas } : {}),
          ...(Array.isArray(data?.numericals) ? { numericals: data.numericals } : {}),
          ...(Array.isArray(data?.bounds) ? { bounds: data.bounds } : {}),
          ...(Array.isArray(data?.confusion) ? { confusion: data.confusion } : {}),
        },
      };
      items.push(entry);
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
