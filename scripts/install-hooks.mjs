#!/usr/bin/env node
/**
 * Installs the pre-commit hook that auto-updates docs/ARCHITECTURE_BLUEPRINT.md.
 *
 * The hook source lives in this repo at scripts/hooks/pre-commit (so it is
 * version-controlled and portable). This script copies it into .git/hooks/pre-commit
 * so git runs it before every commit.
 *
 * Usage:  node scripts/install-hooks.mjs
 */
import { readFileSync, writeFileSync, existsSync, chmodSync, mkdirSync, copyFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "scripts", "hooks", "pre-commit");
const GIT_DIR = join(ROOT, ".git");
const HOOK_DST = join(GIT_DIR, "hooks", "pre-commit");

if (!existsSync(GIT_DIR)) {
  console.error("❌ No .git directory found at repo root. Aborting.");
  process.exit(1);
}

if (!existsSync(SRC)) {
  console.error("❌ Missing hook source:", SRC);
  process.exit(1);
}

mkdirSync(join(GIT_DIR, "hooks"), { recursive: true });
copyFileSync(SRC, HOOK_DST);
try {
  chmodSync(HOOK_DST, 0o755);
} catch { /* Windows: chmod may be a no-op — fine */ }

console.log("✅ Pre-commit hook installed → .git/hooks/pre-commit");
console.log("   It runs `npm run blueprint` before every commit and stages the fresh");
console.log("   docs/ARCHITECTURE_BLUEPRINT.md so the tree always matches the code.");
