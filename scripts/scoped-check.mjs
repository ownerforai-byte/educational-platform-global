#!/usr/bin/env node
/**
 * scoped-check — run ONLY the checks that matter for what you changed.
 *
 *   node scripts/scoped-check.mjs           # checks scoped to your dirty+unpushed files
 *   node scripts/scoped-check.mjs --all     # full gate (run before pushing main)
 *
 * Areas:
 *   content   -> JSON parse validation of every file under content/      (~1-3s)
 *   frontend  -> tsc --noEmit + the 3 content/note test files           (~30-60s)
 *   backend   -> tsc --noEmit + backend vitest                          (~30-60s)
 *
 * Exit code is non-zero if any selected check fails.
 */
import { execSync, spawnSync } from "node:child_process";

const ALL = process.argv.includes("--all");

function git(...args) {
  // trimEnd only: `git status --porcelain` lines start with a space (" M x")
  // that trim() would eat, shifting the slice(3) filename parse.
  return execSync(`git ${args.join(" ")}`, { encoding: "utf8" }).trimEnd();
}

// Windows cannot spawn `npx`/`npm` without a shell.
const WIN = process.platform === "win32";
const run = (cmd, args, opts = {}) => spawnSync(cmd, args, { shell: WIN, ...opts });

function changedFiles() {
  if (ALL) return null; // null => every area
  // worktree changes + commits not yet on origin/main
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
  return new Set([...out, ...diff].filter(Boolean));
}

function areasFor(files) {
  if (files === null) return ["content", "frontend", "backend"];
  const a = new Set();
  for (const f of files) {
    if (f.startsWith("content/")) a.add("content");
    else if (f.startsWith("frontend/")) a.add("frontend");
    else if (f.startsWith("backend/")) a.add("backend");
  }
  return [...a];
}

const runners = {
  content: {
    label: "content JSON validation",
    run() {
      const snippet = [
        "const fs=require('fs'),p=require('path');let bad=0,n=0;",
        "(function w(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const f=p.join(d,e.name);",
        "if(e.isDirectory()){w(f)}else if(f.endsWith('.json')){n++;",
        "try{JSON.parse(fs.readFileSync(f,'utf8'))}catch(err){bad++;console.log('BROKEN:',f,String(err).slice(0,90))}}}})('content');",
        "console.log('content JSON: '+n+' files, '+bad+' broken');process.exit(bad?1:0);",
      ].join("\n");
      const r = spawnSync(process.execPath, ["-e", snippet], { stdio: "inherit" });
      return r.status ?? 1;
    },
  },
  frontend: {
    label: "frontend typecheck + content tests",
    run() {
      const t = run("npx", ["tsc", "--noEmit"], { cwd: "frontend", stdio: "inherit" });
      if (t.status !== 0) return t.status ?? 1;
      const v = run(
        "npx",
        ["vitest", "run", "tests/lib/content-coverage.test.ts", "tests/lib/content/pipeline.test.ts", "tests/lib/note-routes.test.ts"],
        { cwd: "frontend", stdio: "inherit" },
      );
      return v.status ?? 1;
    },
  },
  backend: {
    label: "backend typecheck + tests",
    run() {
      const t = run("npx", ["tsc", "--noEmit"], { cwd: "backend", stdio: "inherit" });
      if (t.status !== 0) return t.status ?? 1;
      const v = run("npm", ["run", "test:run"], { cwd: "backend", stdio: "inherit" });
      return v.status ?? 1;
    },
  },
};

const areas = areasFor(changedFiles());
if (areas.length === 0) {
  console.log("No changes detected in content/, frontend/ or backend/ — nothing to check.");
  process.exit(0);
}

console.log(`Scoped check: ${areas.join(", ")}${ALL ? " (full gate)" : ""}\n`);
let failed = 0;
for (const a of areas) {
  console.log(`--- [${a}] ${runners[a].label}`);
  const code = runners[a].run();
  if (code !== 0) {
    failed++;
    console.log(`--- [${a}] FAILED (exit ${code})\n`);
  } else {
    console.log(`--- [${a}] ok\n`);
  }
}
process.exit(failed ? 1 : 0);
