#!/usr/bin/env node
/**
 * worktree-flow — one disposable git worktree per change set.
 *
 *   create <name> [--base <ref>]   sandbox at .worktrees/<name> on cline/<name>
 *                                  (junctions/symlinks share the main tree's
 *                                  node_modules — no per-sandbox npm install)
 *   check <name> [--all]           scoped check INSIDE the sandbox (affected-only)
 *   build <name>                   affected production build INSIDE the sandbox
 *   done <name> [--all]            gate -> merge into the main tree's current
 *                                  branch -> remove worktree -> delete branch
 *   abandon <name> [--force]       discard the sandbox (--force while unmerged)
 *   list                           every sandbox: branch, uncommitted, unmerged
 *
 * Full loop, all from the MAIN repo root — see BRANCHES.md §5a for the rules:
 *   create my-change -> edit + COMMIT inside .worktrees/my-change ->
 *   check my-change -> done my-change (gate, merge, remove, delete).
 *
 * Guardrails: refuses to run from inside a sandbox; `done` never merges a
 * dirty sandbox (loose edits are never merged) and deletes the branch with
 * -d (only allowed once actually merged); `abandon` refuses without --force
 * while the branch holds unmerged commits; junctions are unlinked BEFORE
 * `git worktree remove` so the recursive delete can never walk into the main
 * tree's node_modules; cline/* branches are skipped by the push scripts and
 * .worktrees/ is gitignored — a sandbox is never pushed.
 */
import { execSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const WT_DIR = ".worktrees";
const BRANCH_PREFIX = "cline/";
const WIN = process.platform === "win32";
const MODULE_LINKS = ["node_modules", "backend/node_modules", "frontend/node_modules"];

function git(args, opts = {}) {
  return execSync(`git ${args}`, { encoding: "utf8", ...opts }).trimEnd();
}
function die(msg) {
  console.error(`worktree-flow: ${msg}`);
  process.exit(1);
}

// ── main-tree resolution ─────────────────────────────────────────────────────
let ROOT;
try {
  const gitDir = path.resolve(git("rev-parse --absolute-git-dir"));
  const commonDir = path.resolve(git("rev-parse --git-common-dir"));
  if (gitDir !== commonDir) {
    die("this looks like a linked worktree — run the flow from the MAIN repo root");
  }
  ROOT = path.resolve(git("rev-parse --show-toplevel"));
} catch (e) {
  die(`not a git repo (or git failed): ${String(e.message).split("\n")[0]}`);
}
const WT_ROOT = path.join(ROOT, WT_DIR);

// ── args ─────────────────────────────────────────────────────────────────────
const [command, ...rest] = process.argv.slice(2);
const flags = new Set(rest.filter((a) => a.startsWith("--")));
let name = null;
let base = null;
for (let i = 0; i < rest.length; i++) {
  if (rest[i] === "--base") base = rest[++i];
  else if (!rest[i].startsWith("--") && name === null) name = rest[i];
}

const wtPathOf = (n) => path.join(WT_ROOT, n);
const branchOf = (n) => `${BRANCH_PREFIX}${n}`;

function requireName() {
  if (!name) die(`${command || "this command"} needs a sandbox name (e.g. my-change)`);
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(name)) {
    die(`bad name "${name}" — letters, digits, dots, dashes, underscores only (no slashes)`);
  }
  return name;
}
function requireSandbox() {
  requireName();
  const wt = wtPathOf(name);
  if (!fs.existsSync(wt)) die(`no ${WT_DIR}/${name} — create it first`);
  return wt;
}

// Share the main tree's installed dependencies instead of a fresh multi-minute
// npm install per sandbox: junction (Windows) / symlink (POSIX) node_modules.
function linkNodeModules(wt) {
  for (const rel of MODULE_LINKS) {
    const target = path.join(ROOT, rel);
    const link = path.join(wt, rel);
    if (!fs.existsSync(target) || fs.existsSync(link)) continue;
    fs.symlinkSync(target, link, WIN ? "junction" : "dir");
    console.log(`  shared ${rel} -> main tree`);
  }
}
// Remove the links BEFORE `git worktree remove` — never let a recursive delete
// walk a junction into the main tree's node_modules.
function unlinkNodeModules(wt) {
  for (const rel of MODULE_LINKS) {
    const link = path.join(wt, rel);
    let st;
    try {
      st = fs.lstatSync(link);
    } catch {
      continue;
    }
    if (st.isSymbolicLink()) fs.rmSync(link, { force: true });
  }
}

function runIn(cwd, npmArgs) {
  // `npm run check` calls scoped-check.mjs, which defaults the diff base to
  // origin/main. In a worktree sandbox, the sandbox branched from the main
  // tree's current branch (main-integration), so origin/main is far older
  // than the fork point and the gate would scan every unpushed commit on
  // the integration branch. The sandbox's PARENT commit (the branch point
  // it was forked from) is the right scope: the sandbox's dirty tree + its
  // own new commits, nothing else.
  const base = git(`rev-parse ${branchOf(name)}~1`, { cwd });
  const env = { ...process.env, SCOPED_CHECK_BASE: base };
  return spawnSync("npm", npmArgs, { cwd, stdio: "inherit", shell: WIN, env });
}

function cmdCreate() {
  requireName();
  const wt = wtPathOf(name);
  const br = branchOf(name);
  if (fs.existsSync(wt)) die(`${WT_DIR}/${name} already exists`);
  let branchTaken = false;
  try {
    git(`rev-parse --verify ${br}`, { cwd: ROOT });
    branchTaken = true;
  } catch {
    /* free */
  }
  if (branchTaken) die(`branch ${br} already exists`);
  const baseRef = base ?? "HEAD";
  console.log(`worktree-flow: ${WT_DIR}/${name} on ${br} (base ${baseRef})`);
  try {
    git(`worktree add -b ${br} "${wt}" ${baseRef}`, { cwd: ROOT });
  } catch (e) {
    die(`git worktree add failed:\n${String(e.message).split("\n").slice(0, 6).join("\n")}`);
  }
  linkNodeModules(wt);
  console.log(`
Next (all from the main repo root):
  edit files under ${WT_DIR}/${name}/ ...
  git -C ${WT_DIR}/${name} add <files>
  git -C ${WT_DIR}/${name} commit -m "<type>: <why>"
  node scripts/worktree-flow.mjs check ${name}
  node scripts/worktree-flow.mjs done ${name}    # check -> merge back -> remove sandbox`);
}

function cmdCheck() {
  const wt = requireSandbox();
  const script = flags.has("--all") ? "check:all" : "check";
  console.log(`worktree-flow: ${script} inside ${WT_DIR}/${name}`);
  const r = runIn(wt, ["run", script]);
  process.exit(r.status ?? 1);
}

function cmdBuild() {
  const wt = requireSandbox();
  console.log(`worktree-flow: affected build inside ${WT_DIR}/${name}`);
  const r = runIn(wt, ["run", "build:affected"]);
  process.exit(r.status ?? 1);
}

function cmdDone() {
  const wt = requireSandbox();
  const br = branchOf(name);
  const dirty = git("status --porcelain --untracked-files=all", { cwd: wt });
  if (dirty) {
    die(`sandbox has uncommitted changes — loose edits are never merged. Commit first:\n${
      dirty.split("\n").slice(0, 10).map((l) => `  ${l}`).join("\n")}`);
  }
  const script = flags.has("--all") ? "check:all" : "check";
  console.log(`worktree-flow: gate (${script}) inside ${WT_DIR}/${name}`);
  const c = runIn(wt, ["run", script]);
  if ((c.status ?? 1) !== 0) {
    console.error(`worktree-flow: gate FAILED — sandbox kept at ${WT_DIR}/${name} for inspection`);
    process.exit(c.status ?? 1);
  }
  const current = git("branch --show-current", { cwd: ROOT });
  if (!current) die("main tree is in detached HEAD — checkout a branch first");
  console.log(`worktree-flow: merging ${br} into ${current}`);
  try {
    const merged = git(`merge ${br}`, { cwd: ROOT });
    if (merged) console.log(merged.split("\n").slice(0, 3).join("\n"));
  } catch (e) {
    try {
      git("merge --abort", { cwd: ROOT });
    } catch {
      /* nothing to abort */
    }
    die(`merge failed — aborted, sandbox kept:\n${String(e.message).split("\n").slice(0, 8).join("\n")}`);
  }
  unlinkNodeModules(wt);
  // The gate may regenerate tracked reports (an audit timestamp) or drop
  // untracked artifacts. The tree was clean when the gate started and the
  // merge is already done, so discard that generated noise before removal.
  git("checkout -- .", { cwd: wt });
  git("clean -fd", { cwd: wt });
  try {
    git(`worktree remove "${wt}"`, { cwd: ROOT });
    git(`branch -d ${br}`, { cwd: ROOT }); // -d only deletes a MERGED branch
  } catch (e) {
    die(`cleanup failed (worktree kept):\n${String(e.message).split("\n").slice(0, 6).join("\n")}`);
  }
  console.log(`worktree-flow: done — merged into ${current}, sandbox + branch removed.`);
}

function cmdAbandon() {
  const wt = requireSandbox();
  const br = branchOf(name);
  let ahead = 0;
  try {
    ahead = Number(git(`rev-list --count HEAD..${br}`, { cwd: ROOT })) || 0;
  } catch {
    ahead = 0;
  }
  if (ahead > 0 && !flags.has("--force")) {
    die(`${br} holds ${ahead} commit(s) not on the current branch — pass --force to discard them PERMANENTLY`);
  }
  unlinkNodeModules(wt);
  git(`worktree remove --force "${wt}"`, { cwd: ROOT });
  git(`branch ${ahead > 0 ? "-D" : "-d"} ${br}`, { cwd: ROOT });
  console.log(`worktree-flow: abandoned ${WT_DIR}/${name} (${ahead} commit(s) discarded).`);
}

function cmdList() {
  const out = git("worktree list --porcelain", { cwd: ROOT });
  let found = 0;
  for (const block of out.split("\n\n")) {
    const lines = block.split("\n").filter(Boolean);
    const wtLine = lines.find((l) => l.startsWith("worktree "));
    if (!wtLine) continue;
    const wt = path.resolve(wtLine.slice("worktree ".length));
    if (path.dirname(wt) !== WT_ROOT) continue; // only this flow's sandboxes
    const n = path.basename(wt);
    const dirty = git("status --porcelain", { cwd: wt }).split("\n").filter(Boolean).length;
    let ahead = 0;
    try {
      ahead = Number(git(`rev-list --count HEAD..${branchOf(n)}`, { cwd: ROOT })) || 0;
    } catch {
      ahead = 0;
    }
    console.log(`${n}  ${branchOf(n)}  ${dirty} uncommitted  ${ahead} unmerged`);
    found++;
  }
  if (!found) console.log("worktree-flow: no sandboxes under .worktrees/");
}

const COMMANDS = {
  create: cmdCreate,
  check: cmdCheck,
  build: cmdBuild,
  done: cmdDone,
  abandon: cmdAbandon,
  list: cmdList,
};

const fn = COMMANDS[command];
if (!fn) {
  console.error(`worktree-flow: unknown command "${command ?? ""}"
usage: node scripts/worktree-flow.mjs <create|check|build|done|abandon|list> [name] [--base <ref>] [--all] [--force]`);
  process.exit(1);
}
fn();
