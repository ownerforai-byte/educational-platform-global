// Pre-build dependency guard for npm workspaces.
//
// Problem: on Render the build can run against a *cached* node_modules that
// predates a dependency added to backend/package.json. `tsc` then dies with
// TS2307 "Cannot find module '<new dep>'", npm reports exit code 2 and the
// deploy fails — while CI (fresh install) stays green, which makes it look like
// a platform mystery instead of a stale cache.
//
// The guard is therefore derived from backend/package.json — every declared
// dependency AND devDependency, because tsc needs the types of both — instead of
// a hand-written list that goes stale the moment a package is added. When
// anything is missing it runs `npm ci --include=dev` (workspace root first,
// backend dir as fallback) and re-checks. Only if deps still cannot be resolved
// does it fail, with an actionable message.
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const here = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.join(here, "..");
const rootDir = path.join(backendDir, "..");

const pkg = JSON.parse(fs.readFileSync(path.join(backendDir, "package.json"), "utf8"));
// tsc resolves the types of every declared package, so check all of them.
const MODULES = [
  ...new Set([
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.devDependencies ?? {}),
  ]),
];

// Deliberately a filesystem check, not require.resolve(): Node negatively caches
// failed resolutions, so a re-check after installing would still report the
// package missing in the same process.
function packagePresent(mod) {
  const parts = mod.split("/");
  return [backendDir, rootDir].some((base) =>
    fs.existsSync(path.join(base, "node_modules", ...parts, "package.json"))
  );
}

function depsPresent() {
  const missing = MODULES.filter((m) => !packagePresent(m));
  return { missingMods: missing, missingTypes: [] };
}

function hasLock(dir) {
  return fs.existsSync(path.join(dir, "package-lock.json"));
}

function runNpmCi(dir) {
  console.log(`ensure-deps: running npm ci in ${dir}`);
  // --include=dev: NODE_ENV=production (Render's default) would otherwise omit
  // typescript and @types/*, which is exactly what tsc needs.
  const r = spawnSync("npm", ["ci", "--include=dev", "--no-audit", "--no-fund"], {
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
    [...missingMods, ...missingTypes].join(", ") +
    " — attempting install"
);

// Strategy 1: install at the workspace root (this is where the lock lives; the
// fallback covers deploys whose install step was skipped or ran elsewhere).
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
