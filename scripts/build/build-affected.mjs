#!/usr/bin/env node
/**
 * build-affected — production builds ONLY for the areas you actually changed.
 *
 *   node scripts/build-affected.mjs                  # build every changed area
 *   node scripts/build-affected.mjs --list           # print what would build, build nothing
 *   node scripts/build-affected.mjs --only backend    # limit to one area
 *   node scripts/build-affected.mjs --force           # build everything, ignore the diff
 *
 * "Changed" = dirty worktree files + commits not yet on origin/main — the
 * same definition scoped-check.mjs and test-affected.mjs use, so all three
 * tools always agree on what is affected.
 *
 *   backend/**  -> `npm run build` (incremental tsc emit, see tsconfig)
 *   frontend/** -> `npm run build` (next build; .next/cache persists)
 *   neither     -> "nothing to build", exit 0 — the multi-minute frontend
 *                  build is skipped entirely when only backend/content/docs
 *                  changed. Content is runtime data (served by the backend,
 *                  validated by `npm run check:content`), so it needs no build.
 *
 * Exit code is the first failing build's code (0 when nothing is built).
 */
import { execSync, spawnSync } from "node:child_process";

const ARGS = process.argv.slice(2);
const LIST_ONLY = ARGS.includes("--list");
const FORCE = ARGS.includes("--force");
const ONLY = ARGS.includes("--only") ? ARGS[ARGS.indexOf("--only") + 1] : null;

const AREAS = ["backend", "frontend"];
if (ONLY && !AREAS.includes(ONLY)) {
  console.error(`build-affected: --only expects backend or frontend (got "${ONLY}")`);
  process.exit(1);
}

function git(...args) {
  // trimEnd only: `git status --porcelain` lines start with a space (" M x")
  // that trim() would eat, shifting the slice(3) filename parse.
  return execSync(`git ${args.join(" ")}`, { encoding: "utf8" }).trimEnd();
}

// Windows cannot spawn `npx`/`npm` without a shell.
const WIN = process.platform === "win32";
const run = (cmd, args, opts = {}) => spawnSync(cmd, args, { shell: WIN, ...opts });

function changedFiles() {
  if (FORCE) return null; // null => every area
  const out = git("status", "--porcelain", "--untracked-files=all")
    .split("\n")
    .filter(Boolean)
    // `git status` reports renames as "old -> new"; the new name is the one
    // that matters for impact.
    .map((l) => (l.includes(" -> ") ? l.split(" -> ").pop() : l.slice(3)));
  let diff = "";
  try {
    diff = git("diff", "--name-only", "origin/main...HEAD");
  } catch {
    /* no origin/main yet — dirty files only */
  }
  // `diff` is a multi-line string: split it into lines before spreading —
  // `...diff` alone would spread it character-by-character.
  return new Set([...out, ...diff.split("\n")].filter(Boolean));
}

const changed = changedFiles();
const areas = AREAS.filter((a) => {
  if (ONLY && ONLY !== a) return false;
  if (changed === null) return true; // --force
  for (const f of changed) if (f.startsWith(`${a}/`)) return true;
  return false;
});

if (areas.length === 0) {
  console.log("build-affected: no backend/ or frontend/ changes — nothing to build.");
  process.exit(0);
}

const PLANS = {
  backend: { cmd: "npm", args: ["run", "build"], cwd: "backend", label: "backend build (tsc emit)" },
  frontend: { cmd: "npm", args: ["run", "build"], cwd: "frontend", label: "frontend build (next build)" },
};

console.log(`build-affected: ${areas.join(", ")}${FORCE ? " (forced)" : ""}\n`);
for (const a of areas) {
  const p = PLANS[a];
  console.log(`--- [${a}] ${p.label}`);
  if (LIST_ONLY) continue;
  const r = run(p.cmd, p.args, { cwd: p.cwd, stdio: "inherit" });
  if ((r.status ?? 1) !== 0) {
    console.log(`--- [${a}] FAILED (exit ${r.status ?? 1})`);
    process.exit(r.status ?? 1);
  }
  console.log(`--- [${a}] ok\n`);
}
process.exit(0);
