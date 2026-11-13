/**
 * Minimal Supabase Management API SQL runner (shared by setup / link scripts).
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function loadBackendEnvFile() {
  const p = resolve(__dirname, "../.env");
  const v = {};
  if (!existsSync(p)) return v;
  for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !line.trim().startsWith("#")) {
      v[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
  return v;
}

export function resolveSupabaseMgmtCredentials() {
  const fileEnv = loadBackendEnvFile();
  const url = process.env.SUPABASE_URL?.trim() || fileEnv.SUPABASE_URL?.trim();
  const token =
    process.env.SUPABASE_MANAGEMENT_TOKEN?.trim() || fileEnv.SUPABASE_MANAGEMENT_TOKEN?.trim();
  if (!url || !token) {
    return { error: "Missing SUPABASE_URL or SUPABASE_MANAGEMENT_TOKEN in backend/.env" };
  }
  const ref = new URL(url).hostname.split(".")[0];
  return { api: `https://api.supabase.com/v1/projects/${ref}/database/query`, token };
}

export async function runMgmtSql(sql, { quiet = false } = {}) {
  const creds = resolveSupabaseMgmtCredentials();
  if (creds.error) throw new Error(creds.error);
  const res = await fetch(creds.api, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${creds.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });
  const text = await res.text();
  if (res.status < 200 || res.status >= 300) {
    if (!quiet) console.error(text.slice(0, 800));
    throw new Error(`Management SQL failed (${res.status})`);
  }
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/** Same as runMgmtSql but never throws — for optional setup steps. */
export async function tryMgmtSql(sql) {
  try {
    await runMgmtSql(sql);
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, message };
  }
}
