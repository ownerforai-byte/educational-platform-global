#!/usr/bin/env node
/**
 * One-time installer for repo git hooks.
 * Usage: node scripts/install-hooks.mjs
 * Copies scripts/hooks/* into .git/hooks/ so the blueprint refreshes on commit.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "scripts", "hooks");
const DEST = path.join(ROOT, ".git", "hooks");

if (!fs.existsSync(DEST)) {
  console.error("Not a git repository (no .git/hooks found). Run from the repo root.");
  process.exit(1);
}

fs.mkdirSync(DEST, { recursive: true });
for (const file of fs.readdirSync(SRC)) {
  if (file.endsWith(".sample")) continue;
  const from = path.join(SRC, file);
  const to = path.join(DEST, file);
  fs.copyFileSync(from, to);
  fs.chmodSync(to, 0o755);
  console.log(`installed hook: .git/hooks/${file}`);
}
console.log("Done. Hooks are active for this repository.");
