import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DIST_DIR = path.join(process.cwd(), "dist");
const EXTS = new Set([".js", ".mjs", ".cjs", ".json"]);

function needsExtension(spec) {
  if (!spec.startsWith("./") && !spec.startsWith("../")) return false;
  const base = spec.split("/").pop() ?? "";
  return ![...EXTS].some((ext) => base.endsWith(ext));
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.isFile() && entry.name.endsWith(".js")) files.push(full);
  }
  return files;
}

let patched = 0;
for (const file of await walk(DIST_DIR)) {
  const original = await readFile(file, "utf-8");
  const updated = original.replace(
    /(from\s+|import\s*\(\s*)(['"])(\.\.?\/[^'"]+)\2/g,
    (match, prefix, quote, specifier) => {
      if (!needsExtension(specifier)) return match;
      patched += 1;
      return `${prefix}${quote}${specifier}.js${quote}`;
    }
  );
  if (updated !== original) await writeFile(file, updated, "utf-8");
}
console.log(`fix-esm-imports: appended .js to ${patched} relative import(s) in dist/`);
