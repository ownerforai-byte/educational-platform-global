#!/usr/bin/env node
/**
 * commit-version.mjs — commit with a version stamp in the message.
 *
 * What it does:
 *   1. Reads frontend/VERSION (a single integer, currently 0).
 *   2. Bumps it by 1  ->  0, 1, 2, 3 ...   (use --no-bump to keep the same number)
 *   3. Writes the new number back to frontend/VERSION.
 *   4. Stages all changes + the VERSION file.
 *   5. Commits with the message  [vN] <your message>
 *
 * The [vN] prefix is what you look for in `git log` (or the Vercel deploy that
 * came from that commit) to know "which version is this". Bump the number once
 * per deploy so the numbers line up with what actually ships.
 *
 * Usage (from the repo root):
 *   node scripts/commit-version.mjs -m "my change"                 # bump 0->1, commit [v1] my change
 *   node scripts/commit-version.mjs -m "hotfix" --no-bump         # commit WITHOUT changing the number
 *   node scripts/commit-version.mjs -m "hotfix" --no-add          # commit ONLY what you already staged
 *
 * Flags:
 *   -m "<msg>"     commit message (required unless -m omitted AND message from arg1)
 *   --no-bump      keep the current VERSION number (do not increment)
 *   --no-add       do not run `git add -A`; commit only what is already staged
 *   --file <p>     override the VERSION file path (default frontend/VERSION)
 */

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { stdio: "inherit", shell: false, ...opts });
  if (r.error) throw r.error;
  if (r.status !== 0) process.exit(r.status || 1);
  return r;
}

function parseArgs(argv) {
  const args = { message: "", noBump: false, noAdd: false, versionFile: "frontend/VERSION" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-m" || a === "--message") args.message = argv[++i] ?? "";
    else if (a === "--no-bump") args.noBump = true;
    else if (a === "--no-add") args.noAdd = true;
    else if (a === "--file") args.versionFile = argv[++i];
    else if (a === "-h" || a === "--help") {
      console.log("Usage: node scripts/commit-version.mjs -m \"msg\" [--no-bump] [--no-add] [--file <p>]");
      process.exit(0);
    } else if (!args.message && !a.startsWith("-")) args.message = a; // first free arg = message
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.message) {
    console.error('ERROR: missing commit message. Pass -m "<your message>".');
    process.exit(1);
  }

  const versionFile = path.resolve(args.versionFile);
  if (!fs.existsSync(versionFile)) {
    // First run: start the counter at 0, so the first deploy becomes [v1].
    fs.mkdirSync(path.dirname(versionFile), { recursive: true });
    fs.writeFileSync(versionFile, "0\n", "utf8");
  }

  const currentRaw = fs.readFileSync(versionFile, "utf8").trim();
  const current = /^\d+$/.test(currentRaw) ? parseInt(currentRaw, 10) : 0;
  const version = args.noBump ? current : current + 1;

  fs.writeFileSync(versionFile, `${version}\n`, "utf8");
  console.log(`VERSION: ${current} -> ${version}${args.noBump ? " (no bump)" : ""}`);

  if (!args.noAdd) {
    run("git", ["add", "-A"]);
  }

  const commitMessage = `[v${version}] ${args.message}`;
  run("git", ["commit", "-m", commitMessage]);
  console.log(`\nCommitted: ${commitMessage}`);
  console.log("Remember this version number when you check Vercel — this commit/deploy is v" + version + ".");
}

main();
