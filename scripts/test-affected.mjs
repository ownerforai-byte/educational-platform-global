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
 *   2. it depends on a changed module at ANY import depth — the workspace
 *      import graph is walked in REVERSE from the edit, so a test that mounts
 *      the app through `src/app` is hit by a change to a shared util far
 *      below it;
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
  // `diff` is a multi-line string: split it into lines before spreading —
  // `...diff` alone would spread it character-by-character.
  return new Set(
    [...out, ...diff.split("\n")]
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
function resolveSpecifier(spec, fromFile, ws) {
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
    const abs = path.resolve(path.dirname(fromFile), spec);
    return moduleKey(path.relative(ROOT, abs));
  }
  return null; // bare package specifier — outside this repo
}

// ── transitive affected graph ────────────────────────────────────────────────
// A test is affected when it depends on the edit at ANY import depth. The
// workspace import graph is built once, then walked in reverse from the
// changed modules: every file that transitively depends on the edit — and
// every test importing that file — is affected.

/** Heavy/noise directories that are never nodes of the module graph. */
const GRAPH_SKIP_DIRS = new Set([
  "node_modules", ".next", "dist", ".open-next", "coverage",
  "public", "kb", ".turbo", ".vercel", ".wrangler", ".route-audit",
]);

/** Every module-graph file in one workspace (repo-relative, forward slashes). */
function listModuleFiles(wsRoot) {
  const out = [];
  const walk = (dir) => {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return; // unreadable dir — skip it, never fail the tool on it
    }
    for (const e of entries) {
      const f = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (!GRAPH_SKIP_DIRS.has(e.name)) walk(f);
      } else if (/\.(tsx?|jsx?|mjs|cjs)$/.test(e.name)) {
        out.push(path.relative(ROOT, f).replace(/\\/g, "/"));
      }
    }
  };
  walk(path.join(ROOT, wsRoot));
  return out;
}

/**
 * Reverse import graph: depKey -> every importer of that key. `/index`
 * equivalence: a spec of `foo` and the file `foo/index.ts` are the same node,
 * so both spellings are registered on every edge (seeding below registers
 * both spellings on the changed side too, so either style matches).
 */
function buildReverseGraph(ws) {
  const importersOf = new Map();
  for (const file of listModuleFiles(ws.srcRoot)) {
    const key = moduleKey(file);
    let source;
    try {
      source = fs.readFileSync(path.join(ROOT, file), "utf8");
    } catch {
      continue;
    }
    for (const spec of importSpecifiers(source)) {
      const dep = resolveSpecifier(spec, file, ws);
      if (!dep) continue;
      for (const depKey of [dep, `${dep}/index`]) {
        let set = importersOf.get(depKey);
        if (!set) importersOf.set(depKey, (set = new Set()));
        set.add(key);
      }
    }
  }
  return importersOf;
}

/**
 * Every module key in the workspace that transitively depends on any changed
 * file (the changed modules themselves included) — reverse BFS from the edit.
 * Only keys that at least one file imports are seeded: a module nothing
 * imports cannot affect any test.
 */
function reverseClosure(ws, wsChanged) {
  const importersOf = buildReverseGraph(ws);
  const closure = new Set();
  const queue = [];
  const seed = (key) => {
    if (!importersOf.has(key) || closure.has(key)) return;
    closure.add(key);
    queue.push(key);
  };
  // Both spellings (`foo`, `foo/index`) so either import style matches.
  for (const f of wsChanged) {
    const key = moduleKey(f);
    seed(key);
    seed(`${key}/index`);
  }
  while (queue.length > 0) {
    const dep = queue.pop();
    for (const importer of importersOf.get(dep) ?? []) {
      if (!closure.has(importer)) {
        closure.add(importer);
        queue.push(importer);
      }
    }
  }
  return closure;
}

const changed = changedFiles();

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

  // (2) transitive: the test depends on a changed module at any import depth
  //     (via the reverse import graph above).
  const closure = reverseClosure(ws, wsChanged);
  const affected = new Set();
  for (const testFile of tests) {
    // (1) the test itself is part of the edit
    if (changed.has(testFile)) {
      affected.add(testFile);
      continue;
    }
    const source = fs.readFileSync(path.join(ROOT, testFile), "utf8");
    let hit = closure.has(moduleKey(testFile));
    // Corpus guard: tests that read the real app/ route tree and scan the
    // whole source for links are affected by ANY source edit in the workspace.
    const specs = importSpecifiers(source);
    if (!hit && sourceTouched && specs.some((s) => s.includes("helpers/route-tree"))) hit = true;
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
