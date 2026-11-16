#!/usr/bin/env node
/**
 * Stage the firebase/functions-api bundle. EVERY staged artifact is fully
 * regenerated on each run; only src/, scripts/, package.json, tsconfig.json
 * and .gitignore are committed sources (see .gitignore).
 *
 *   node scripts/build.mjs            # stage everything
 *   node scripts/build.mjs --clean    # remove the staged artifacts
 *   FUNCTIONS_API_SKIP_BACKEND_BUILD=1 node scripts/build.mjs
 *
 * Staged layout (the bundle root is the function's cwd at runtime, which is
 * exactly what backend/src/utils/paths.ts (resolveDataPath), the corpus roots
 * in backend/src/ai/corpus/curriculum-corpus.ts and STATIC_PUBLIC_DIRS in
 * backend/src/config/server.ts resolve against):
 *
 *   lib/index.js                  ← compiled src/index.ts (the `api` entry)
 *   lib/dist/**                   ← backend/dist (createApp + helpers)
 *   content/**                    ← repo content/ (on-disk curriculum payloads)
 *   public/**                     ← repo public/ (static assets)
 *   public/data/syllabus-notes/** ← frontend/public/data/syllabus-notes (corpus)
 *   public/data/topic-registry.json ← class-level index for the corpus
 *   backend/kb/**                 ← drop-in KB corpus (corpus root backend/kb)
 *   backend/sources/**            ← staged book sources
 *
 * node_modules is NOT staged: Cloud Functions buildpacks install it server-side
 * from package.json (the firebase.json "ignore" list keeps it out of the upload).
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const WIN = process.platform === "win32";
const here = path.dirname(fileURLToPath(import.meta.url));
const bundleDir = path.resolve(here, "..");
const repoRoot = path.resolve(bundleDir, "..", "..");
const backendDir = path.join(repoRoot, "backend");

const CLEAN_ONLY = process.argv.includes("--clean");

/** Staged dirs, relative to the bundle root. */
const STAGED_DIRS = ["lib", "content", "public", "backend"];

function run(cmd, args, opts = {}) {
  // Windows needs a shell for npm/npx; pass the command as a string there so
  // Node does not warn about args + shell:true (DEP0190).
  return WIN
    ? spawnSync([cmd, ...args].join(" "), { ...opts, shell: true })
    : spawnSync(cmd, args, { ...opts, shell: false });
}

function rmrf(rel) {
  fs.rmSync(path.join(bundleDir, rel), { recursive: true, force: true });
}

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  if (WIN) {
    // robocopy is dramatically faster than a JS tree copy for the ~300MB
    // curriculum payload on Windows. Exit codes 0-7 are success (bit flags).
    const r = spawnSync(
      "robocopy",
      [src, dst, "/E", "/NFL", "/NDL", "/NJH", "/NJS", "/NC", "/NS", "/R:2", "/W:2", "/XD", "node_modules", ".git"],
      { stdio: ["ignore", "ignore", "inherit"] },
    ); // no shell: literal paths, no expansion needed
    if ((r.status ?? 8) >= 8) {
      throw new Error(`robocopy failed (${r.status}) copying ${src} -> ${dst}`);
    }
    return;
  }
  fs.cpSync(src, dst, {
    recursive: true,
    filter: (s) => !/[\\/](node_modules|\.git)$/.test(s),
  });
}

function dirSize(dir) {
  let total = 0;
  const stack = [dir];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (entry.isFile()) total += fs.statSync(full).size;
    }
  }
  return total;
}

function fmt(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

if (CLEAN_ONLY) {
  for (const rel of STAGED_DIRS) rmrf(rel);
  console.log("[functions-api] cleaned staged bundle (lib/, content/, public/, backend/)");
  process.exit(0);
}

// 1. Build the backend so lib/dist is a current backend/dist copy.
if (process.env.FUNCTIONS_API_SKIP_BACKEND_BUILD === "1") {
  console.log("[functions-api] skipping backend build (FUNCTIONS_API_SKIP_BACKEND_BUILD=1)");
} else {
  console.log("[functions-api] building backend (npm run build)…");
  const b = run("npm", ["run", "build"], {
    cwd: backendDir,
    stdio: "inherit",
  });
  if (b.status !== 0) {
    console.error("[functions-api] backend build failed — aborting staging.");
    process.exit(b.status ?? 1);
  }
}

// 2. Fresh stage: every staged dir is regenerated.
for (const rel of STAGED_DIRS) rmrf(rel);

// 3. Compile the function entry (src/ → lib/).
console.log("[functions-api] compiling src/ → lib/ (tsc)…");
const t = run("npx", ["tsc", "-p", "."], { cwd: bundleDir, stdio: "inherit" });
if (t.status !== 0) {
  console.error("[functions-api] tsc failed — aborting staging.");
  process.exit(t.status ?? 1);
}

// 4. Stage the payloads the backend reads at request time.
console.log("[functions-api] staging backend/dist → lib/dist…");
copyDir(path.join(backendDir, "dist"), path.join(bundleDir, "lib", "dist"));

console.log("[functions-api] staging content/…");
copyDir(path.join(repoRoot, "content"), path.join(bundleDir, "content"));

console.log("[functions-api] staging public/…");
copyDir(path.join(repoRoot, "public"), path.join(bundleDir, "public"));

console.log("[functions-api] staging frontend/public/data subset → public/data/…");
copyDir(
  path.join(repoRoot, "frontend", "public", "data", "syllabus-notes"),
  path.join(bundleDir, "public", "data", "syllabus-notes"),
);
fs.copyFileSync(
  path.join(repoRoot, "frontend", "public", "data", "topic-registry.json"),
  path.join(bundleDir, "public", "data", "topic-registry.json"),
);

console.log("[functions-api] staging backend/kb + backend/sources…");
copyDir(path.join(backendDir, "kb"), path.join(bundleDir, "backend", "kb"));
copyDir(path.join(backendDir, "sources"), path.join(bundleDir, "backend", "sources"));

// 5. Size report — the SIZE GATE input (node_modules is not staged and is
// installed server-side, so this IS the deployable source payload).
let total = 0;
console.log("[functions-api] staged bundle size (unpacked, node_modules excluded):");
for (const rel of STAGED_DIRS) {
  const size = dirSize(path.join(bundleDir, rel));
  total += size;
  console.log(`  ${rel.padEnd(10)} ${fmt(size)}`);
}
console.log(`  ${"TOTAL".padEnd(10)} ${fmt(total)}`);
console.log("[functions-api] staging complete.");
