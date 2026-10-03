#!/usr/bin/env node
/**
 * prune-deployments.mjs — keep only the newest N Vercel deployments, delete the rest.
 *
 * Why: Vercel keeps every production build you have ever pushed. Each one costs
 * nothing by itself, but they pile up, clutter the dashboard, and make it hard
 * to tell which build is "the live one". This script trims that history.
 *
 * How it works:
 *   1. Resolve the project id from a project name/slug (GET /v9/projects/{slug}).
 *   2. List production deployments, newest first (GET /v13/deployments?target=production).
 *   3. Keep the newest `--keep` (default 2). The deployment currently aliased to
 *      the production domain is ALWAYS protected, even if it falls outside the
 *      keep window (you never accidentally delete what visitors are on).
 *   4. Delete every other READY production deployment (DELETE /v13/deployments/{id}).
 *
 * SAFETY:
 *   - DRY-RUN BY DEFAULT. Nothing is deleted unless you pass --execute.
 *   - Only READY production deployments are ever considered. Preview/staging and
 *     in-flight (BUILDING/ERROR/CANCELED) deployments are left untouched.
 *   - The current production alias is force-protected.
 *   - It walks the full deployment list (paginated), so a very long history is
 *     handled correctly — not just the last page.
 *
 * Usage (from repo root):
 *   node scripts/prune-deployments.mjs <project-name>                 # dry run, keep 2
 *   node scripts/prune-deployments.mjs <project-name> --keep 5        # keep 5
 *   node scripts/prune-deployments.mjs <project-name> --execute       # actually delete
 *   node scripts/prune-deployments.mjs <project-name> --execute --token <TOKEN>
 *
 * Token comes from VERCEL_TOKEN (or VERCEL_CMD_TOKEN) in the environment, or the
 * --token flag. Never commit a token: keep it in .env.local / the shell only.
 */

const API = "https://api.vercel.com";

function fail(msg) {
  console.error(`\nERROR: ${msg}`);
  process.exit(1);
}

function parseArgs(argv) {
  const args = { keep: 2, execute: false, token: null, team: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--execute" || a === "--yes") args.execute = true;
    else if (a === "--keep") args.keep = Math.max(1, parseInt(argv[++i] ?? "2", 10) || 2);
    else if (a === "--token") args.token = argv[++i];
    else if (a === "--team") args.team = argv[++i];
    else if (a === "--help" || a === "-h") {
      console.log("Usage: node scripts/prune-deployments.mjs <project> [--keep N] [--execute] [--token T] [--team ID]");
      process.exit(0);
    } else if (!a.startsWith("-")) args.project = a;
  }
  args.token = args.token || process.env.VERCEL_TOKEN || process.env.VERCEL_CMD_TOKEN || null;
  return args;
}

async function api(token, path, opts = {}) {
  const headers = { Authorization: `Bearer ${token}` };
  if (opts.body) headers["Content-Type"] = "application/json";
  const res = await fetch(`${API}${path}`, {
    method: opts.method || "GET",
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  if (!res.ok) {
    throw new Error(`API ${opts.method || "GET"} ${path} -> ${res.status} ${res.statusText}: ${text.slice(0, 400)}`);
  }
  return data;
}

function fmtTime(ms) {
  return ms ? new Date(ms).toISOString().replace("T", " ").slice(0, 19) + " UTC" : "unknown";
}

/**
 * Pull the [vN] version tag out of a deployment's commit message. Vercel stores
 * the commit message on each deployment (d.gitCommitMessage); because
 * commit-version.mjs stamps every commit as "[vN] ...", this shows the version
 * right here so you can read "keeping v5, v4 - deleting v3, v2, v1" in the
 * dry run. Falls back to "-" for older commits that predate the versioning.
 */
function versionTag(deployment) {
  const msg = deployment.gitCommitMessage || "";
  const m = /\[v(\d+)\]/.exec(msg);
  if (m) return `v${m[1]}`;
  // Some older Vercel messages embed the message differently; try a loose match.
  const loose = /v(\d+)\s*[\]\s]/.exec(msg);
  if (loose) return `v${loose[1]}`;
  return "-";
}

/** Fetch all READY production deployments for a project, newest first. */
async function listProductionDeployments(token, team, projectId) {
  const all = [];
  let before = null;
  for (;;) {
    const qs = new URLSearchParams();
    if (team) qs.set("teamId", team);
    qs.set("projectId", projectId);
    qs.set("target", "production");
    qs.set("state", "READY");
    qs.set("limit", "100");
    if (before) qs.set("before", before);
    const page = await api(token, `/v13/deployments?${qs.toString()}`);
    const items = page.deployments || [];
    all.push(...items);
    // Vercel returns a `next` cursor (deployment id/url) to walk forward in
    // time. Keep paging until a page returns fewer than 100 items.
    if (items.length < 100) break;
    before = page.next;
    if (!before) break;
  }
  return all;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.project) fail("Missing <project> name/slug. Run with --help for usage.");
  if (!args.token) fail("No Vercel token found. Set VERCEL_TOKEN or pass --token <TOKEN>.");

  console.log(`\nVercel deployment pruner`);
  console.log(`  project : ${args.project}${args.team ? `  (team ${args.team})` : ""}`);
  console.log(`  keep    : newest ${args.keep} production deployment(s)`);
  console.log(`  mode    : ${args.execute ? "EXECUTE (will delete)" : "DRY-RUN (no deletion)"}`);
  console.log("");

  // 1) Resolve project id.
  const project = await api(args.token, `/v9/projects/${encodeURIComponent(args.project)}`, { team: args.team });
  const projectId = project.id;
  const currentAliasDeploymentId =
    (project.alias ? project.alias.split("/").pop() : null) ||
    (project.deploymentId ? project.deploymentId : null) ||
    (project.deployment && project.deployment.id ? project.deployment.id : null);

  // 2) List READY production deployments, newest first.
  const deployments = await listProductionDeployments(args.token, args.team, projectId);
  deployments.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  if (deployments.length === 0) {
    console.log("No READY production deployments found. Nothing to do.");
    return;
  }

  // 3) Decide keep/delete sets.
  const keep = new Set(deployments.slice(0, args.keep).map((d) => d.id));
  // Force-protect the current production alias even if it is not in the top N.
  if (currentAliasDeploymentId && deployments.some((d) => d.id === currentAliasDeploymentId)) {
    keep.add(currentAliasDeploymentId);
  }
  const toDelete = deployments.filter((d) => !keep.has(d.id));
  const kept = deployments.filter((d) => keep.has(d.id));

  console.log(`Found ${deployments.length} READY production deployment(s).`);
  console.log("");
  console.log(`KEEP (${kept.length}):`);
  kept.forEach((d, i) => {
    const marker = currentAliasDeploymentId === d.id ? "  <== current production" : "";
    console.log(`  ${i === 0 ? "*" : " "} [${versionTag(d)}] ${d.id}  ${fmtTime(d.createdAt)}  ${d.url || ""}  ${d.branch || d.gitCommitBaseRef || ""}${marker}`);
  });
  console.log("");
  console.log(`DELETE (${toDelete.length}):`);
  toDelete.forEach((d) => {
    console.log(`  - [${versionTag(d)}] ${d.id}  ${fmtTime(d.createdAt)}  ${d.url || ""}  ${d.branch || d.gitCommitBaseRef || ""}`);
  });

  // Version-aware summary so it is obvious what stays vs. what goes.
  const keepVers = kept.map((d) => versionTag(d)).filter((v) => v !== "-");
  const delVers = toDelete.map((d) => versionTag(d)).filter((v) => v !== "-");
  if (keepVers.length || delVers.length) {
    console.log("");
    console.log(`  Keeping version(s): ${keepVers.join(", ") || "(none tagged)"}`);
    console.log(`  Deleting version(s): ${delVers.length ? delVers.join(", ") : "(none tagged)"}`);
  }

  if (toDelete.length === 0) {
    console.log(`\nAlready within the keep window (${args.keep}). Nothing to delete.`);
    return;
  }

  if (!args.execute) {
    console.log(`\n[DRY-RUN] Nothing was deleted. Re-run with --execute to actually delete ${toDelete.length} deployment(s).`);
    return;
  }

  console.log(`\nDeleting ${toDelete.length} deployment(s)...`);
  let ok = 0;
  for (const d of toDelete) {
    try {
      await api(args.token, `/v13/deployments/${encodeURIComponent(d.id)}`, { method: "DELETE", team: args.team });
      ok++;
      console.log(`  deleted ${d.id}`);
    } catch (err) {
      console.error(`  FAILED  ${d.id}: ${err.message}`);
    }
  }
  console.log(`\nDone: deleted ${ok}/${toDelete.length}. Kept ${kept.length} (incl. the current production deployment).`);
}

main().catch((err) => fail(err.message || String(err)));
