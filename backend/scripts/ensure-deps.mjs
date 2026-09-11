// Pre-build dependency guard for npm workspaces.
//
// Problem: on Render, the install step sometimes does not populate
// node_modules where `tsc` (run in the backend/ workspace) can see it,
// producing 70+ "Cannot find module 'express'" / "Cannot find name 'process'"
// errors even though the code is fine.
//
// This script checks that the modules tsc needs are actually resolvable from
// the backend workspace. If any are missing, it runs `npm ci` (workspace root
// first, backend dir as fallback) and re-checks. Only if deps still cannot be
// resolved does it fail — with an actionable message.
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import { createRequire } from "node:module";

const here = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.join(here, "..");
const rootDir = path.join(backendDir, "..");
const require = createRequire(path.join(backendDir, "package.json"));

const MODULES = [
  "express",
  "zod",
  "dotenv",
  "cors",
  "helmet",
  "morgan",
  "cookie-parser",
  "@supabase/supabase-js",
  "@google/generative-ai",
  "typescript",
];

const TYPE_DIRS = [
  path.join("node_modules", "@types", "node"),
  path.join("node_modules", "@types", "express"),
];

function depsPresent() {
  const missingMods = MODULES.filter((m) => {
    try {
      require.resolve(m);
      return false;
    } catch {
      return true;
    }
  });
  const missingTypes = TYPE_DIRS.filter((d) =>
    [backendDir, rootDir].some((base) =>
      fs.existsSync(path.join(base, d, "index.d.ts"))
    ) === false
  );
  return { missingMods, missingTypes };
}

function hasLock(dir) {
  return fs.existsSync(path.join(dir, "package-lock.json"));
}

function runNpmCi(dir) {
  console.log(`ensure-deps: running npm ci in ${dir}`);
  const r = spawnSync("npm", ["ci", "--no-audit", "--no-fund"], {
    cwd: dir,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  return r.status === 0;
}

let { missingMods, missingTypes } = depsPresent();
if (missingMods.length === 0 && missingTypes.length === 0) {
  console.log("ensure-deps: all required modules present ✓");
  process.exit(0);
}

console.log(
  "ensure-deps: missing " +
    [...missingMods, ...missingTypes.map((d) => path.basename(path.dirname(d)))].join(", ") +
    " — attempting install"
);

// Strategy 1: install at the workspace root (render.yaml does this; this is a
// fallback if Render's install step was skipped or ran elsewhere).
if (hasLock(rootDir)) {
  runNpmCi(rootDir);
  ({ missingMods, missingTypes } = depsPresent());
  if (missingMods.length === 0 && missingTypes.length === 0) {
    console.log("ensure-deps: resolved via root npm ci ✓");
    process.exit(0);
  }
}

// Strategy 2: install standalone in the backend directory.
if (hasLock(backendDir)) {
  runNpmCi(backendDir);
  ({ missingMods, missingTypes } = depsPresent());
  if (missingMods.length === 0 && missingTypes.length === 0) {
    console.log("ensure-deps: resolved via backend npm ci ✓");
    process.exit(0);
  }
}

console.error(
  "ensure-deps: FAILED. Still missing: " +
    [...missingMods, ...missingTypes].join(", ") +
    "\nCheck the install step in the build log and the platform's Root Directory setting."
);
process.exit(1);
