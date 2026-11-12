#!/usr/bin/env node
/**
 * prune-vercel-deployments.mjs
 * ---------------------------------------------------------------------------
 * Cap retained Vercel deployments at a fixed count and auto-delete the overflow
 * to prevent unbounded storage growth on the account.
 *
 * Vercel has NO native "keep N deployments" setting — retention is time-based
 * (auto-expiry). This script provides the count-based cap: it keeps the current
 * production deployment + the most recent N-1 others, and deletes anything older.
 *
 * Zero dependencies: uses global `fetch` (Node >= 18). Safe defaults:
 *   - Never deletes the current production deployment.
 *   - Never touches in-flight (BUILDING / QUEUED / INITIALIZING) deployments.
 *   - `--dry-run` (default when no token present) previews without deleting.
 *
 * Usage:
 *   node scripts/prune-vercel-deployments.mjs [--limit 6] [--dry-run]
 *   node scripts/prune-vercel-deployments.mjs --from-json <file> [--dry-run]  # offline/test
 *
 * Env:
 *   VERCEL_TOKEN / VERCEL_AUTH_TOKEN   access token (Deployments + Projects scopes)
 *   VERCEL_TEAM_ID                     team scope (default: ownerforai-byte team)
 *   VERCEL_PROJECT_ID                  project id (default: ravikisan project)
 *   VERCEL_PROJECT_SLUG                project slug (default: ravikisan)
 *   PRUNE_LIMIT / PRUNE_DRY            overrides used by the scheduled workflow
 */

const API = "https://api.vercel.com";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Retry transient failures (403/429/5xx and network hiccups) with backoff.
// Vercel's API occasionally returns 403 "Not authorized" on a valid token
// under rapid load; a bounded retry makes the prune reliable.
async function fetchWithRetry(url, opts, { attempts = 5, label = "request" } = {}) {
  // Vercel rate-limits a classic token with 403 "Not authorized" when the
  // per-minute window is exceeded, so back off well past the throttle window:
  // ~3s, 9s, 18s, 30s, 45s.
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, opts);
      const retriable = res.status === 429 || res.status >= 500 || res.status === 403;
      if (res.ok || !retriable) return res;
      lastErr = new Error(`${label} ${res.status} ${await res.text().catch(() => "")}`);
    } catch (e) {
      lastErr = e;
    }
    await sleep([3000, 9000, 18000, 30000, 45000][i] ?? 45000);
    if (i < attempts - 1) console.error(`  retried ${label} in ${Math.round([3000, 9000, 18000, 30000, 45000][i] / 1000)}s`);
  }
  throw lastErr || new Error(`${label} failed after ${attempts} attempts`);
}

// Known targets for this repo's Vercel project (ids are not secret; the token is).
const DEFAULTS = {
  teamId: "team_HGJdEN3XP4NnZY7Gd8xRhD8g",
  projectId: "prj_U2KKPLkeAOqjzes00oGe1f1of2VV",
  projectSlug: "ravikisan",
};

// States that are still working and must never be deleted mid-flight.
const ACTIVE_STATES = new Set(["BUILDING", "QUEUED", "INITIALIZING"]);
// Terminal states that are safe to delete (frees storage).
const DELETABLE_STATES = new Set(["READY", "ERROR", "CANCELED"]);

function parseArgs() {
  const argv = process.argv.slice(2);
  const opts = { limit: Number(process.env.PRUNE_LIMIT) || 6, dryRun: false, fromJson: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--limit" || a === "-l") opts.limit = Number(argv[++i]);
    else if (a === "--dry-run" || a === "--no-delete") opts.dryRun = true;
    else if (a === "--from-json") opts.fromJson = argv[++i];
    else if (a === "-h" || a === "--help") { printHelp(); process.exit(0); }
    else { console.error(`unknown option: ${a}\n`); printHelp(); process.exit(2); }
  }
  if (String(process.env.PRUNE_DRY) === "true") opts.dryRun = true;
  if (!Number.isInteger(opts.limit) || opts.limit < 1) {
    console.error("limit must be a positive integer");
    process.exit(2);
  }
  return opts;
}

function printHelp() {
  console.log([
    "prune-vercel-deployments — cap retained Vercel deployments, auto-delete overflow",
    "",
    "  node scripts/prune-vercel-deployments.mjs [--limit 6] [--dry-run]",
    "  node scripts/prune-vercel-deployments.mjs --from-json <file> [--dry-run]",
    "",
    "  --limit N          keep at most N total deployments (default 6, or PRUNE_LIMIT)",
    "  --dry-run          preview deletions without calling DELETE",
    "  --from-json FILE   load a deployments array locally (offline/test, skips the API)",
  ].join("\n"));
}

function requireToken() {
  return process.env.VERCEL_TOKEN || process.env.VERCEL_AUTH_TOKEN || "";
}

async function fetchDeployments(opts, token) {
  const q = new URLSearchParams({ limit: "100" });
  if (process.env.VERCEL_TEAM_ID) q.set("teamId", process.env.VERCEL_TEAM_ID);
  // Filter by project. Classic account tokens accept `projectId` but reject
  // `slug`/team-scoped filters with 403, so prefer projectId and only fall
  // back to slug when no project id is available.
  const projectId =
    process.env.VERCEL_PROJECT_ID || (process.env.VERCEL_TEAM_ID ? undefined : DEFAULTS.projectId);
  if (projectId) q.set("projectId", projectId);
  else q.set("slug", process.env.VERCEL_PROJECT_SLUG || DEFAULTS.projectSlug);
  // Listing uses v7; deletion uses v13.
  const res = await fetchWithRetry(
    `${API}/v7/deployments?${q}`,
    { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } },
    { label: "listing deployments" },
  );
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Vercel API ${res.status} listing deployments: ${body.slice(0, 300)}\n` +
      "  -> a 403 usually means the token lacks access to the target scope. Run it " +
      "user-scoped (omit VERCEL_TEAM_ID) or use a token that has Deployments + " +
      "Projects scope for the target team.",
    );
  }
  const data = await res.json();
  const list = Array.isArray(data.deployments) ? data.deployments : [];
  // v7 lists use `uid` as the deployment id; normalize so the rest of the
  // script (delete + plan) can rely on `d.id`.
  return list.map((d) => ({ ...d, id: d.uid || d.id }));
}

/**
 * Decide which deployments to keep vs delete.
 * Returns { keep, delete, currentProduction, active } — pure and unit-testable.
 */
function plan({ deployments, limit }) {
  // The LIVE production deployment is the one currently holding the
  // production alias — Vercel flags it via `isRollbackCandidate`. A newer
  // production build that failed (ERROR) does NOT hold the alias, so never
  // shield that one just because it's the newest; fall back to the most
  // recent production deployment that reached READY.
  const prodCands = deployments
    .filter((d) => d.target === "production")
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  const prod =
    prodCands.find((d) => d.isRollbackCandidate) ||
    prodCands.find((d) => d.state === "READY") ||
    prodCands[0] ||
    null;

  const active = deployments.filter(
    (d) => d.id !== prod?.id && ACTIVE_STATES.has(d.state),
  );

  const deletable = deployments
    .filter((d) => d.id !== prod?.id && DELETABLE_STATES.has(d.state))
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  // Reserve one slot for the live production deployment.
  const reserved = prod ? 1 : 0;
  const keepCount = Math.max(0, limit - reserved);
  const keep = deletable.slice(0, keepCount);
  const del = deletable.slice(keepCount);

  return { keep, delete: del, currentProduction: prod, active };
}

async function main() {
  const opts = parseArgs();
  const token = requireToken();
  let deployments;

  if (opts.fromJson) {
    const fs = await import("node:fs");
    deployments = JSON.parse(fs.readFileSync(opts.fromJson, "utf8"));
    if (!Array.isArray(deployments)) throw new Error("--from-json file must contain a JSON array");
  } else {
    if (!token) {
      console.error("No VERCEL_TOKEN found. Set it, or use --from-json to test offline.");
      console.error("Running in DRY-RUN (no API calls) with the default project.");
      opts.dryRun = true;
      deployments = []; // nothing to plan against without the API
    } else {
      deployments = await fetchDeployments(opts, token);
    }
  }

  const p = plan({ deployments, limit: opts.limit });

  console.log(`Project scope : team=${process.env.VERCEL_TEAM_ID || DEFAULTS.teamId} ` +
              `project=${process.env.VERCEL_PROJECT_ID || DEFAULTS.projectId} ` +
              `slug=${process.env.VERCEL_PROJECT_SLUG || DEFAULTS.projectSlug}`);
  console.log(`Total found  : ${deployments.length}`);
  console.log(`Cap          : ${opts.limit} total (1 reserved for live production)`);
  console.log(`Current prod : ${p.currentProduction ? `${p.currentProduction.id} (${p.currentProduction.state})` : "none"}`);
  console.log(`Active (skip): ${p.active.map((d) => d.id).join(", ") || "none"}`);
  console.log(`Will keep    : ${p.currentProduction ? 1 : 0} prod + ${p.keep.length} recent = ` +
              `${(p.currentProduction ? 1 : 0) + p.keep.length} (plus ${p.active.length} in-flight)`);
  console.log(`Will delete  : ${p.delete.length}`);

  for (const d of p.delete) {
    const when = new Date(d.createdAt || 0).toISOString().slice(0, 16).replace("T", " ");
    const tag = d.target === "production" ? "[production]" : d.target ? `[${d.target}]` : "[preview]";
    console.log(`  ${opts.dryRun ? "dry" : "del"} ${d.id}  ${d.state?.padEnd(9)} ${tag}  created ${when}`);
  }

  if (p.delete.length === 0) {
    console.log("Within cap — nothing to delete.");
    return;
  }

  if (opts.dryRun) {
    console.log(`\nDRY RUN: ${p.delete.length} deployment(s) would be deleted. Re-run without --dry-run to apply.`);
    return;
  }

  let ok = 0, failed = 0;
  for (const d of p.delete) {
    const url =
      `${API}/v13/deployments/${encodeURIComponent(d.id)}` +
      (process.env.VERCEL_TEAM_ID ? `?teamId=${encodeURIComponent(process.env.VERCEL_TEAM_ID)}` : "");
    try {
      const res = await fetchWithRetry(
        url,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        },
        { label: `deleting ${d.id}` },
      );
      if (res.ok) ok++;
      else {
        failed++;
        console.error(`  failed to delete ${d.id}: ${res.status} ${(await res.text().catch(() => "")).slice(0, 160)}`);
      }
    } catch (e) {
      failed++;
      console.error(`  failed to delete ${d.id}: ${e.message}`);
    }
    await sleep(250);
  }
  console.log(`\nDeleted ${ok}, failed ${failed}. Vercel keeps deleted deployments recoverable for 30 days, then purges.`);
}

// Exported for offline tests.
export { plan };

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/"))) {
  main().catch((e) => { console.error(e.message || e); process.exit(1); });
}
