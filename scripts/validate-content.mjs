#!/usr/bin/env node
/**
 * validate-content.mjs — parse every JSON file under content/.
 * Exit 0 when all valid, exit 1 listing the broken files otherwise.
 * Used by `npm run check` (via scripts/scoped-check.mjs) and the
 * "Content JSON" GitHub Actions workflow.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.argv[2] ?? "content";
let files = 0;
const broken = [];

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".json")) {
      files++;
      try {
        JSON.parse(fs.readFileSync(p, "utf8"));
      } catch (err) {
        broken.push(`${p} | ${String(err.message).slice(0, 100)}`);
      }
    }
  }
}

walk(ROOT);
if (broken.length) {
  console.error(`content JSON: ${files} files, ${broken.length} BROKEN`);
  for (const b of broken) console.error(`  BROKEN: ${b}`);
  process.exit(1);
}
console.log(`content JSON: ${files} files, 0 broken`);
