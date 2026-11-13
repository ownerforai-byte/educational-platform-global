#!/usr/bin/env node
/**
 * Targeted Phase-5/6 shim → canonical import migrator for lib/core hubs.
 * Leaves re-export shims in place; only rewrites call sites.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "frontend");
const ROOTS = ["app", "components", "features", "lib", "providers", "tests"].map((d) =>
  path.join(ROOT, d),
);

const REPLACEMENTS = [
  [/from ["']@\/lib\/syllabus["']/g, 'from "@/lib/core/syllabus"'],
  [/from ["']@\/lib\/navigation["']/g, 'from "@/lib/core/navigation"'],
  [/from ["']@\/lib\/site-index["']/g, 'from "@/lib/core/site-index"'],
  [/from ["']@\/lib\/access-level["']/g, 'from "@/lib/core/access-level"'],
];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(ts|tsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

let changed = 0;
for (const root of ROOTS) {
  for (const file of walk(root)) {
    // Keep shim files themselves as re-exports.
    if (/[\\/]lib[\\/](syllabus|navigation|site-index|access-level)\.ts$/.test(file)) continue;
    const before = fs.readFileSync(file, "utf8");
    let next = before;
    for (const [pattern, replacement] of REPLACEMENTS) {
      next = next.replace(pattern, replacement);
    }
    if (next !== before) {
      fs.writeFileSync(file, next);
      changed += 1;
    }
  }
}

console.log(`migrated files: ${changed}`);
