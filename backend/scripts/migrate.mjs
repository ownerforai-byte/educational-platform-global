/**
 * migrate.mjs — apply pending SQL under src/db/migrations/ in filename order.
 *
 * Uses the same Supabase Management API transport as run-sql.mjs.
 *
 *   node scripts/migrate.mjs           # apply pending
 *   node scripts/migrate.mjs --check   # exit 1 if pending or checksum drift
 *
 * Note: files 009 and 010 do not exist — intentional gap in the sequence.
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { checksum, listMigrationFiles, diffMigrations } from "./migrate-lib.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = resolve(__dirname, "..", "src", "db", "migrations");
const CHECK_ONLY = process.argv.includes("--check");

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

async function runQuery(api, token, sql) {
  const res = await fetch(api, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });
  const text = await res.text();
  let parsed = null;
  try {
    parsed = JSON.parse(text);
  } catch {
    /* ignore */
  }
  if (res.status < 200 || res.status >= 300) {
    const detail =
      typeof parsed === "object" ? JSON.stringify(parsed).slice(0, 500) : text.slice(0, 500);
    throw new Error(`SQL failed (${res.status}): ${detail}`);
  }
  return parsed;
}

async function main() {
  const fileEnv = loadEnv();
  const SUPABASE_URL = process.env.SUPABASE_URL || fileEnv.SUPABASE_URL;
  const TOKEN =
    process.env.SUPABASE_MANAGEMENT_TOKEN || fileEnv.SUPABASE_MANAGEMENT_TOKEN;
  if (!SUPABASE_URL || !TOKEN) {
    console.error(
      "Missing SUPABASE_URL or SUPABASE_MANAGEMENT_TOKEN — cannot run migrations.",
    );
    process.exit(1);
  }

  const ref = new URL(SUPABASE_URL).hostname.split(".")[0];
  const API = `https://api.supabase.com/v1/projects/${ref}/database/query`;

  const bootstrap = readFileSync(
    resolve(MIGRATIONS_DIR, "000_schema_migrations.sql"),
    "utf8",
  );
  await runQuery(API, TOKEN, bootstrap);

  const files = listMigrationFiles(MIGRATIONS_DIR);
  const rows = await runQuery(
    API,
    TOKEN,
    "select filename, checksum from public.schema_migrations order by filename",
  );
  const appliedRows = Array.isArray(rows)
    ? rows
    : Array.isArray(rows?.data)
      ? rows.data
      : [];

  const { pending, changed } = diffMigrations(MIGRATIONS_DIR, files, appliedRows);

  if (changed.length > 0) {
    console.error(`Checksum drift (edited after apply): ${changed.join(", ")}`);
    process.exit(1);
  }

  if (CHECK_ONLY) {
    if (pending.length > 0) {
      console.error(`Pending migrations: ${pending.join(", ")}`);
      process.exit(1);
    }
    console.log(`OK — ${files.length} migrations applied, none pending.`);
    return;
  }

  if (pending.length === 0) {
    console.log("No pending migrations.");
    return;
  }

  for (const file of pending) {
    const full = resolve(MIGRATIONS_DIR, file);
    const sql = readFileSync(full, "utf8");
    const sum = checksum(sql);
    console.log(`Applying ${file}…`);
    await runQuery(API, TOKEN, sql);
    await runQuery(
      API,
      TOKEN,
      `insert into public.schema_migrations (filename, checksum)
       values ('${file.replace(/'/g, "''")}', '${sum}')
       on conflict (filename) do update set checksum = excluded.checksum, applied_at = now()`,
    );
    console.log(`  ✓ ${file}`);
  }
  console.log(`Applied ${pending.length} migration(s).`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
