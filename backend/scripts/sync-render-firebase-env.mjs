/**
 * Push Firebase (and related) env vars to a Render web service via REST API.
 * Auth: RENDER_API_KEY or Render CLI saved credentials (%APPDATA%\\render\\cli.yaml on Windows).
 *
 * Usage:
 *   node backend/scripts/sync-render-firebase-env.mjs
 *   RENDER_SERVICE_ID=srv-xxx node backend/scripts/sync-render-firebase-env.mjs
 */
import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readServiceAccountFromPath } from "./firebase-sa-path.mjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const backendRoot = resolve(scriptDir, "..");
const repoRoot = resolve(backendRoot, "..");

const SERVICE_ID =
  process.env.RENDER_SERVICE_ID?.trim() || "srv-dacj1ah5efls73ek7ofg";

function loadDotEnv(filePath) {
  if (!existsSync(filePath)) return {};
  const out = {};
  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq < 1) continue;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    out[k] = v;
  }
  return out;
}

function resolveRenderApiKey() {
  if (process.env.RENDER_API_KEY?.trim()) {
    return process.env.RENDER_API_KEY.trim();
  }
  const candidates = [
    resolve(process.env.APPDATA || "", "render", "cli.yaml"),
    resolve(homedir(), ".render", "cli.yaml"),
  ];
  for (const p of candidates) {
    if (!existsSync(p)) continue;
    const m = readFileSync(p, "utf8").match(/^\s*key:\s*(\S+)/m);
    if (m?.[1]) return m[1];
  }
  return null;
}

async function listEnvKeys(apiKey) {
  const res = await fetch(
    `https://api.render.com/v1/services/${SERVICE_ID}/env-vars?limit=100`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
    },
  );
  if (!res.ok) {
    throw new Error(`List env vars failed: ${res.status} ${await res.text()}`);
  }
  const body = await res.json();
  const items = Array.isArray(body) ? body : body.envVars || [];
  return items.map((row) => row.envVar?.key || row.key).filter(Boolean);
}

async function putEnvVar(apiKey, key, value) {
  const res = await fetch(
    `https://api.render.com/v1/services/${SERVICE_ID}/env-vars/${encodeURIComponent(key)}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key, value }),
    },
  );
  if (!res.ok) {
    throw new Error(`PUT ${key} failed: ${res.status} ${await res.text()}`);
  }
}

function buildPayload() {
  const env = {
    ...loadDotEnv(resolve(repoRoot, "backend", ".env")),
    ...loadDotEnv(resolve(repoRoot, ".env")),
  };

  const pathRel =
    env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim() || "firebase-service-account.json";
  const saRaw = readServiceAccountFromPath(pathRel);
  if (!saRaw) {
    throw new Error(
      `Service account file not found for path "${pathRel}" (required for FIREBASE_SERVICE_ACCOUNT_JSON on Render).`,
    );
  }
  let saJson;
  try {
    saJson = JSON.stringify(JSON.parse(saRaw));
  } catch {
    throw new Error("Service account file is not valid JSON");
  }

  const vars = {};
  vars.USE_FIREBASE_AUTH = env.USE_FIREBASE_AUTH?.trim() || "true";
  if (env.FIREBASE_PROJECT_ID?.trim()) {
    vars.FIREBASE_PROJECT_ID = env.FIREBASE_PROJECT_ID.trim();
  }
  if (env.FIREBASE_STORAGE_BUCKET?.trim()) {
    vars.FIREBASE_STORAGE_BUCKET = env.FIREBASE_STORAGE_BUCKET.trim();
  }
  vars.FIREBASE_SERVICE_ACCOUNT_JSON = saJson;
  vars.FRONTEND_URL =
    env.FRONTEND_URL?.trim() || "https://www.harindrasah.com.np";

  return vars;
}

async function main() {
  const apiKey = resolveRenderApiKey();
  if (!apiKey) {
    console.error(
      "No Render API key. Run `render login` or set RENDER_API_KEY.",
    );
    process.exit(1);
  }

  const before = await listEnvKeys(apiKey);
  const payload = buildPayload();

  for (const [key, value] of Object.entries(payload)) {
    await putEnvVar(apiKey, key, value);
    console.log(`Set ${key} (${value.length} chars)`);
  }

  const after = await listEnvKeys(apiKey);
  const added = Object.keys(payload).filter((k) => !before.includes(k));
  console.log(
    `Done. Service ${SERVICE_ID}. New keys: ${added.length ? added.join(", ") : "(none — updated existing)"}.`,
  );
  console.log(
    "Render will auto-deploy on env change. Or: render deploys create " +
      SERVICE_ID +
      " --confirm --wait",
  );
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
