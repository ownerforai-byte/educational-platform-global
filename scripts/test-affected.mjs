#!/usr/bin/env node
/**
 * test-affected — run ONLY the tests affected by your new edits.
 *
 *   node scripts/test-affected.mjs                  # tests hit by your dirty+unpushed files
 *   node scripts/test-affected.mjs --list           # print the affected test files, run nothing
 *   node scripts/test-affected.mjs --workspace frontend   # limit to one workspace
 *
 * How a test is judged "affected":
 *   1. the test file itself changed;
 *   2. it imports a changed module (import specifiers are resolved to
 *      repo-relative paths, both `@/alias` and relative imports);
 *   3. name convention — a test named `foo.test.ts(x)` under `tests/` matches
 *      a changed `foo.ts(x)` in the same workspace;
 *   4. shared plumbing changed (vitest config / test setup) → the whole
 *      workspace suite is affected.
 *
 * Exit code is the vitest exit code (0 when there is nothing to run).
 *
 * This is a SCOPED tool for the edit loop. The full gate stays
 * `npm run check:all` (and `npx vitest run` inside each workspace) — affected
 * testing narrows the per-edit loop, it never replaces the pre-push gate.
 */
import { execSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ARGS = process.argv.slice(2);
const LIST_ONLY = ARGS.includes("--list");
const WS_ARG = ARGS.includes("--workspace") ? ARGS[ARGS.indexOf("--workspace") + 1] : null;

const ROOT = process.cwd();
const WIN = process.platform === "win32";

const WORKSPACES = {
  frontend: {
    srcRoot: "frontend",
    testDir: "frontend/tests",
    // `@/x` may resolve to <wsRoot>/x (frontend) — also accept <wsRoot>/src/x.
    aliases: ["frontend", "frontend/src"],
  },
  backend: {
    srcRoot: "backend",
    testDir: "backend/tests",
    aliases: ["backend", "backend/src"],
  },
};

function git(...args) {
  // trimEnd only: `git status --porcelain` lines start with a space (" M x")
  // that trim() would eat, shifting the slice(3) filename parse.
  return execSync(`git ${args.join(" ")}`, { encoding: "utf8" }).trimEnd();
}

function changedFiles() {
  const out = git("status", "--porcelain", "--untracked-files=all")
    .split("\n")
    .filter(Boolean)
    .map((l) => l.slice(3));
  let diff = "";
  try {
    diff = git("diff", "--name-only", "origin/main...HEAD");
  } catch {
    /* no origin/main yet */
  }
  return new Set(
    [...out, ...diff]
      .filter(Boolean)
      // `git status` reports renames as "old -> new"; the new name is the one
      // that matters for impact.
      .map((f) => (f.includes(" -> ") ? f.split(" -> ").pop() : f))
      .map((f) => f.replace(/\\/g, "/")),
  );
}

/** Strip the compile extension so `x.ts`, `x.tsx` and `x.js` all compare equal. */
function moduleKey(p) {
  return p.replace(/\\/g, "/").replace(/\.(tsx?|jsx?|mjs|cjs)$/, "");
}

function listTestFiles(dir) {
  const out = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const f = path.join(d, e.name);
      if (e.isDirectory()) walk(f);
      // repo-relative, forward slashes — same shape as the changed-files set
      else if (/\.(test|spec)\.(tsx?|jsx?|mjs)$/.test(e.name))
        out.push(path.relative(ROOT, f).replace(/\\/g, "/"));
    }
  };
  if (fs.existsSync(dir)) walk(dir);
  return out;
}

/** Every `import`/`require`/dynamic-import specifier inside a file. */
function importSpecifiers(source) {
  const re = /(?:from\s*|import\s*\(\s*|require\s*\(\s*)['"]([^'"]+)['"]/g;
  const specs = [];
  let m;
  while ((m = re.exec(source))) specs.push(m[1]);
  return specs;
}

/** Resolve one specifier to a repo-relative extensionless module key, or null. */
function resolveSpecifier(spec, testFile, ws) {
  if (spec.startsWith("@/")) {
    const rest = spec.slice(2);
    for (const alias of ws.aliases) {
      const candidate = moduleKey(`${alias}/${rest}`);
      if (fs.existsSync(`${candidate}.ts`) || fs.existsSync(`${candidate}.tsx`) ||
          fs.existsSync(`${candidate}.js`) || fs.existsSync(`${candidate}.mjs`) ||
          fs.existsSync(`${candidate}/index.ts`) || fs.existsSync(`${candidate}/index.tsx`)) {
        return candidate;
      }
    }
    return null;
  }
  if (spec.startsWith(".")) {
    const abs = path.resolve(path.dirname(testFile), spec);
    return moduleKey(path.relative(ROOT, abs));
  }
  return null; // bare package specifier — outside this repo
}

const changed = changedFiles();
const changedModules = new Set([...changed].map(moduleKey));
// An import of `foo/index` should also count as using `foo`.
for (const m of [...changedModules]) changedModules.add(`${m}/index`);

const result = {}; // workspace -> test files

for (const [wsName, ws] of Object.entries(WORKSPACES)) {
  if (WS_ARG && WS_ARG !== wsName) continue;

  const wsChanged = [...changed].filter((f) => f.startsWith(`${wsName}/`));
  // Shared plumbing: config / test setup / workspace manifest — these can
  // change how every test in the workspace behaves. The ROOT package.json is
  // deliberately excluded: it only holds scripts here.
  const sharedPlumbing = wsChanged.some(
    (f) =>
      f === `${wsName}/vitest.config.ts` ||
      f === `${wsName}/vitest.config.mts` ||
      f === `${wsName}/tests/setup.ts` ||
      f === `${wsName}/tests/setup.tsx` ||
      f === `${wsName}/package.json`,
  );
  // Corpus guards (tests that read the real app/ route tree and scan the whole
  // source for links) are affected by ANY source edit in the workspace.
  const sourceTouched = wsChanged.some(
    (f) => /\.(tsx?|jsx?|mjs)$/.test(f) && !f.startsWith(`${wsName}/tests/`) && !f.startsWith(`${wsName}/scripts/`),
  );

  const tests = listTestFiles(path.join(ROOT, ws.testDir));
  if (sharedPlumbing) {
    result[wsName] = tests; // config/setup/package changes hit everything
    continue;
  }
  if (wsChanged.length === 0) continue;

  const affected = new Set();
  for (const testFile of tests) {
    // (1) the test itself is part of the edit
    if (changed.has(testFile)) {
      affected.add(testFile);
      continue;
    }
    const source = fs.readFileSync(path.join(ROOT, testFile), "utf8");
    // (2) it imports a changed module — or is a corpus guard scanning all
    //     source while some source file changed (route tree / link guards).
    let hit = false;
    const specs = importSpecifiers(source);
    if (sourceTouched && specs.some((s) => s.includes("helpers/route-tree"))) hit = true;
    for (const spec of specs) {
      if (hit) break;
      const key = resolveSpecifier(spec, testFile, ws);
      if (key && changedModules.has(key)) {
        hit = true;
        break;
      }
    }
    // (3) name convention: tests/**/foo.test.ts ↔ changed **/foo.ts
    if (!hit) {
      const base = path.basename(testFile).replace(/\.(test|spec)\.(tsx?|jsx?|mjs)$/, "");
      hit = wsChanged.some((f) => path.basename(f).replace(/\.(tsx?|jsx?|mjs|cjs)$/, "") === base);
    }
    if (hit) affected.add(testFile);
  }
  if (affected.size > 0) result[wsName] = [...affected].sort();
}

const entries = Object.entries(result);
if (entries.length === 0) {
  console.log("test-affected: no tests cover these edits — nothing to run.");
  process.exit(0);
}

for (const [wsName, files] of entries) {
  const rel = files.map((f) => f.replace(new RegExp(`^${wsName}/`), ""));
  if (LIST_ONLY) {
    console.log(`[${wsName}] ${rel.length} affected test file(s):`);
    for (const f of rel) console.log(`  ${f}`);
    continue;
  }
  console.log(`[${wsName}] running ${rel.length} affected test file(s):`);
  for (const f of rel) console.log(`  ${f}`);
  // Windows cannot spawn `npx` without a shell; quote the file args so the
  // single command string stays safe (avoids the DEP0190 concat warning).
  const v = WIN
    ? spawnSync(`npx vitest run ${rel.map((a) => `"${a}"`).join(" ")}`, {
        cwd: path.join(ROOT, wsName),
        stdio: "inherit",
        shell: true,
      })
    : spawnSync("npx", ["vitest", "run", ...rel], {
        cwd: path.join(ROOT, wsName),
        stdio: "inherit",
      });
  if ((v.status ?? 1) !== 0) process.exit(v.status ?? 1);
}
