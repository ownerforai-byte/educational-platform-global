/**
 * run-sql.mjs — dependency-free SQL runner against the live Supabase project
 * using the Supabase Management API. This lets the agent (or you) execute
 * schema/migration SQL without a Postgres DSN.
 *
 * Requires in backend/.env:
 *   SUPABASE_URL             (already present)
 *   SUPABASE_MANAGEMENT_TOKEN (an sb_... Access token with Database scope)
 *
 * Usage:
 *   node scripts/run-sql.mjs                 # runs scripts/migrations/*.sql (if any) in name order
 *   node scripts/run-sql.mjs <file.sql>      # runs a single SQL file
 *   node scripts/run-sql.mjs -q "SELECT 1"   # runs an inline statement
 *
 * The project ref is derived from SUPABASE_URL (the subdomain), so you only
 * need the token.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const p = resolve(__dirname, "..", ".env");
  const v = {};
  if (existsSync(p)) {
    for (const l of readFileSync(p, "utf8").split(/\r?\n/)) {
      const m = l.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m && !l.trim().startsWith("#")) v[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
  return v;
}

const env = loadEnv();
const SUPABASE_URL = env.SUPABASE_URL || process.env.SUPABASE_URL;
const TOKEN =
  env.SUPABASE_MANAGEMENT_TOKEN || process.env.SUPABASE_MANAGEMENT_TOKEN;

if (!SUPABASE_URL || !TOKEN) {
  console.error(
    "Missing SUPABASE_URL or SUPABASE_MANAGEMENT_TOKEN.\n" +
      "Add SUPABASE_MANAGEMENT_TOKEN (an sb_... token, Database scope) to backend/.env."
  );
  process.exit(1);
}

// Project ref = subdomain of the supabase project URL.
const ref = new URL(SUPABASE_URL).hostname.split(".")[0];
const API = `https://api.supabase.com/v1/projects/${ref}/database/query`;

async function runQuery(sql, label) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });
  const text = await res.text();
  let parsed = null;
  try {
    parsed = JSON.parse(text);
  } catch {}

  const ok = res.status >= 200 && res.status < 300;
  console.log(`\n──── ${label} → ${res.status} ${ok ? "OK" : "ERROR"} ────`);
  if (ok && parsed?.data?.length) {
    // show first few rows of SELECTs
    for (const row of parsed.data.slice(0, 20)) console.log(JSON.stringify(row));
    if (parsed.data.length > 20) console.log(`... (${parsed.data.length} rows total)`);
  } else if (!ok) {
    console.log(text.slice(0, 800));
  }
  return ok;
}

function collectSql() {
  const args = process.argv.slice(2);
  const inline = args.indexOf("-q");
  if (inline !== -1) {
    const stmt = args.slice(inline + 1).join(" ");
    return [{ label: "inline", sql: stmt }];
  }

  const fileArg = args.find((a) => !a.startsWith("-"));
  if (fileArg) {
    const p = resolve(__dirname, "..", fileArg);
    if (!existsSync(p)) {
      console.error("SQL file not found:", p);
      process.exit(1);
    }
    return [{ label: p, sql: readFileSync(p, "utf8") }];
  }

  // Default: run everything in scripts/migrations in sorted order.
  const dir = resolve(__dirname, "migrations");
  if (!existsSync(dir)) {
    console.log("No SQL file given and no scripts/migrations dir. Nothing to do.");
    console.log("Use:  node scripts/run-sql.mjs <file.sql>   or   -q \"SELECT 1\"");
    return [];
  }
  const files = readdirSync(dir)
    .filter((f) => f.endsWith(".sql"))
    .sort();
  return files.map((f) => ({
    label: `migrations/${f}`,
    sql: readFileSync(resolve(dir, f), "utf8"),
  }));
}

const jobs = collectSql();
let allOk = true;
for (const job of jobs) {
  allOk = (await runQuery(job.sql, job.label)) && allOk;
}
process.exit(allOk ? 0 : 1);
