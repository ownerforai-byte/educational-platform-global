#!/usr/bin/env node
/**
 * prune-deployments.mjs — keep only the newest N Vercel production deployments, delete the rest.
 *
 * Why: Vercel retains every production build you have ever pushed. Each one costs
 * nothing by itself, but they pile up — dozens of full build outputs can reach
 * the plan's storage/bandwidth cap ("deployment storage is full").
 *
 * How it works (Vercel v2/v4 REST API — the v13 deployments API was retired):
 *   1. Resolve the project id from a project name/slug (GET /v9/projects/{slug}).
 *   2. Walk ALL production deployments, newest first (GET /v2/deployments?target=production).
 *   3. Keep the newest `--keep` (default 2). The deployment currently aliased to
 *      the production domain is ALWAYS protected, even if it falls outside the
 *      keep window (you never accidentally delete what visitors are on).
 *   4. Delete every other production deployment (any state — ERROR/BLOCKED builds
 *      keep their build output too, so they are eligible as well).
 *
 * SAFETY:
 *   - DRY-RUN BY DEFAULT. Nothing is deleted unless you pass --execute.
 *   - Preview/staging deployments are NOT touched (target=production only).
 *   - The current production alias is force-protected.
 *
 * Usage (from repo root):
 *   node scripts/prune-deployments.mjs <project-name>                 # dry run, keep 2
 *   node scripts/prune-deployments.mjs <project-name> --keep 5       # dry run, keep 5
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
  const args = { keep: 2, execute: false, token: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--execute" || a === "--yes") args.execute = true;
    else if (a === "--keep") args.keep = Math.max(1, parseInt(argv[++i] ?? "2", 10) || 2);
    else if (a === "--token") args.token = argv[++i];
    else if (a === "--help" || a === "-h") {
      console.log("Usage: node scripts/prune-deployments.mjs <project> [--keep N] [--execute] [--token T]");
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
  try { data = JSON.parse(text); } catch { data = { raw: text }; }
  if (!res.ok) {
    throw new Error(`API ${opts.method || "GET"} ${path} -> ${res.status}: ${text.slice(0, 400)}`);
  }
  return data;
}

function fmtTime(ms) {
  return ms ? new Date(ms).toISOString().replace("T", " ").slice(0, 19) + " UTC" : "unknown";
}

/** Find which production deployment currently owns each project alias. */
async function aliasedDeploymentIds(token, project) {
  const aliases = Array.isArray(project.alias) ? project.alias : project.alias ? [project.alias] : [];
  const ids = new Set();
  for (const alias of aliases) {
    const host = alias.includes("/") ? alias.split("/").pop() : alias;
    try {
      const r = await api(token, `/v4/aliases/${encodeURIComponent(host)}`);
      for (const a of r.aliases || []) {
        if (a.deployment?.id) ids.add(a.deployment.id);
      }
    } catch (err) {
      console.log(`  (could not resolve alias ${host}: ${err.message})`);
    }
  }
  return ids;
}

/** Walk ALL production deployments (v2), newest first. */
async function listProductionDeployments(token, projectId) {
  const all = [];
  let before = null;
  for (let page = 0; page < 60; page++) {
    const qs = new URLSearchParams();
    qs.set("projectId", projectId);
    qs.set("target", "production");
    qs.set("limit", "50");
    if (before) qs.set("before", before);
    const r = await api(token, `/v2/deployments?${qs.toString()}`);
    const items = r.deployments || [];
    all.push(...items);
    if (items.length < 50) break;
    before = items[items.length - 1].uid;
  }
  return all;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.project) fail("Missing <project> name/slug. Run with --help for usage.");
  if (!args.token) fail("No Vercel token found. Set VERCEL_TOKEN or pass --token <TOKEN>.");

  console.log(`\nVercel deployment pruner`);
  console.log(`  project : ${args.project}`);
  console.log(`  keep    : newest ${args.keep} production deployment(s)`);
  console.log(`  mode    : ${args.execute ? "EXECUTE (will delete)" : "DRY-RUN (no deletion)"}`);
  console.log("");

  const project = await api(args.token, `/v9/projects/${encodeURIComponent(args.project)}`);
  const protectedIds = await aliasedDeploymentIds(args.token, project);

  const deployments = await listProductionDeployments(args.token, project.id);
  deployments.sort((a, b) => (b.created || 0) - (a.created || 0));

  if (deployments.length === 0) {
    console.log("No production deployments found. Nothing to do.");
    return;
  }

  const keep = new Set(deployments.slice(0, args.keep).map((d) => d.uid));
  for (const id of protectedIds) keep.add(id); // force-protect the live alias(es)

  const toDelete = deployments.filter((d) => !keep.has(d.uid));
  const kept = deployments.filter((d) => keep.has(d.uid));

  console.log(`Found ${deployments.length} production deployment(s).`);
  console.log("");
  console.log(`KEEP (${kept.length}):`);
  for (const d of kept) {
    const marker = protectedIds.has(d.uid) ? "  <== production alias" : "";
    console.log(`  * ${d.uid}  ${fmtTime(d.created)}  ${d.url || ""}  (${d.readyState})${marker}`);
  }
  console.log("");
  console.log(`DELETE (${toDelete.length}):`);
  for (const d of toDelete) {
    console.log(`  - ${d.uid}  ${fmtTime(d.created)}  ${d.url || ""}  (${d.readyState})`);
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
      await api(args.token, `/v2/deployments/${encodeURIComponent(d.uid)}`, { method: "DELETE" });
      ok++;
      console.log(`  deleted ${d.uid}`);
    } catch (err) {
      // Aliased deployments may 400 "deployment is aliased"; everything else is logged and skipped.
      console.error(`  FAILED  ${d.uid}: ${err.message}`);
    }
  }
  console.log(`\nDone: deleted ${ok}/${toDelete.length}. Kept ${kept.length} (incl. the current production deployment).`);
}

main().catch((err) => fail(err.message || String(err)));
