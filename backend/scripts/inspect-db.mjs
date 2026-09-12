import { readFileSync, existsSync } from "node:fs";
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
const SUPABASE_URL = env.SUPABASE_URL;
const TOKEN = env.SUPABASE_MANAGEMENT_TOKEN;
if (!SUPABASE_URL || !TOKEN) {
  console.error("Missing SUPABASE_URL or SUPABASE_MANAGEMENT_TOKEN in .env");
  process.exit(1);
}
const ref = new URL(SUPABASE_URL).hostname.split(".")[0];
const API = `https://api.supabase.com/v1/projects/${ref}/database/query`;

/**
 * The Management /database/query endpoint returns, for a SELECT:
 *   { results: [ { col1: [r1v, r2v], col2: [r1v, r2v] } ] }   (column-major)
 * For DML/DDL it returns a result object or an empty one.
 * This decodes column-major back into row objects.
 */
async function q(sql) {
  const res = await fetch(API, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: sql }),
  });
  const text = await res.text();
  let parsed = null;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = text;
  }
  let rows = [];
  // The Management API returns a JSON array of row objects directly.
  if (Array.isArray(parsed)) {
    rows = parsed;
  } else if (Array.isArray(parsed?.results)) {
    // Fallback: column-major { col: [values] }
    for (const block of parsed.results) {
      if (block && typeof block === "object" && !Array.isArray(block)) {
        const cols = Object.keys(block);
        const n = cols.length ? Math.max(...cols.map((c) => block[c].length)) : 0;
        for (let i = 0; i < n; i++) {
          const row = {};
          for (const c of cols) row[c] = block[c][i];
          rows.push(row);
        }
      }
    }
  }
  return { status: res.status, rows, raw: parsed };
}

async function section(title, sql) {
  console.log(`\n========== ${title} ==========`);
  const { status, rows, raw } = await q(sql);
  if (status >= 400 || (raw && typeof raw === "object" && !Array.isArray(raw) && raw.error)) {
    console.log(`(HTTP ${status}) ${JSON.stringify(raw.error ?? raw).slice(0, 400)}`);
  } else if (rows.length) {
    for (const r of rows) console.log("  " + JSON.stringify(r));
    console.log(`  [${rows.length} rows]`);
  } else {
    console.log("(no rows / statement executed)");
  }
}

async function main() {
  await section("Tables (public schema)", `
    SELECT table_name,
      (SELECT count(*) FROM information_schema.table_constraints tc
        WHERE tc.table_name=t.table_name AND tc.constraint_type='FOREIGN KEY') AS fk_count
    FROM information_schema.tables t
    WHERE table_schema='public' AND table_type='BASE TABLE'
    ORDER BY table_name`);

  await section("RLS enabled per table", `
    SELECT relname AS table, relrowsecurity AS rls_enabled
    FROM pg_class
    WHERE relnamespace = 'public'::regnamespace AND relkind = 'r'
    ORDER BY relname`);

  await section("profiles columns", `
    SELECT column_name, data_type, is_nullable, column_default
    FROM information_schema.columns
    WHERE table_name='profiles' AND table_schema='public'
    ORDER BY ordinal_position`);

  await section("The 5 owners — DB-level truth", `
    SELECT p.id, p.full_name, p.role, p.credits, p.credits_limit,
      p.premium_status, p.premium_approved_at
    FROM profiles p
    WHERE p.id IN (
      SELECT u.id FROM auth.users u WHERE u.email IN (
        'harindarsah98172@gmail.com','yashsah231@gmail.com',
        'sahrocky81@gmail.com','ravikisan1814@gmail.com','planephoto88@gmail.com'
      )
    )
    ORDER BY p.full_name`);

  await section("auth.users confirm status for the 5", `
    SELECT u.email, u.email_confirmed_at, u.confirmed_at, u.last_sign_in_at
    FROM auth.users u
    WHERE u.email IN (
      'harindarsah98172@gmail.com','yashsah231@gmail.com',
      'sahrocky81@gmail.com','ravikisan1814@gmail.com','planephoto88@gmail.com'
    )
    ORDER BY u.email`);
}

main().catch((e) => {
  console.error("Fatal:", e.message ?? e);
});
