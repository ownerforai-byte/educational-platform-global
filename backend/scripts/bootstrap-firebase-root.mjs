/**
 * Ensure root owner exists in Firebase Auth (idempotent).
 * Does NOT enable USE_FIREBASE_AUTH — only prepares identity for migration.
 *
 * Requires Firebase Admin creds in backend/.env or repo root .env:
 *   FIREBASE_SERVICE_ACCOUNT_JSON  OR
 *   FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY
 *
 * Optional: FIREBASE_ROOT_PASSWORD or OWNER_NEW_PASSWORD to set password on create.
 *
 * Usage: node backend/scripts/bootstrap-firebase-root.mjs
 */
import { readFileSync } from "node:fs";
import { readServiceAccountFromPath } from "./firebase-sa-path.mjs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

const OWNER_EMAIL = "sahrocky81@gmail.com";
const OWNER_NAME = "Sah Rocky";

function loadEnvFile(path) {
  const v = {};
  try {
    for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m && !line.trim().startsWith("#")) {
        v[m[1]] = m[2].replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    /* missing */
  }
  return v;
}

function hydrateEnv() {
  const backendEnv = loadEnvFile(resolve(__dirname, "../.env"));
  const rootEnv = loadEnvFile(resolve(__dirname, "../../.env"));
  for (const [k, val] of Object.entries({ ...rootEnv, ...backendEnv })) {
    if (process.env[k] === undefined) process.env[k] = val;
  }
}

function parseJsonServiceAccount(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const candidates = [trimmed];
  if (trimmed.includes("\\n") || trimmed.includes('\\"')) {
    candidates.push(trimmed.replace(/\\n/g, "\n").replace(/\\"/g, '"'));
  }
  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate);
    } catch {
      /* try next */
    }
  }
  return null;
}

function parseServiceAccount() {
  const pathRel = process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim();
  if (pathRel) {
    const raw = readServiceAccountFromPath(pathRel);
    if (raw) {
      const obj = parseJsonServiceAccount(raw);
      if (obj) return obj;
    }
    console.error(`FIREBASE_SERVICE_ACCOUNT_PATH not readable: ${pathRel}`);
    console.error("Expected file under backend/ (e.g. backend/firebase-service-account.json).");
    process.exit(1);
  }
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (raw) {
    const obj = parseJsonServiceAccount(raw);
    if (obj) return obj;
    console.error("FIREBASE_SERVICE_ACCOUNT_JSON is not valid JSON");
    process.exit(1);
  }
  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  let privateKey = process.env.FIREBASE_PRIVATE_KEY?.trim();
  if (!projectId || !clientEmail || !privateKey) return null;
  privateKey = privateKey.replace(/\\n/g, "\n");
  return { projectId, clientEmail, privateKey };
}

function requireAdmin() {
  const account = parseServiceAccount();
  if (!account) {
    console.error("Firebase Admin credentials missing.\n");
    console.error("Next steps:");
    console.error("  1. npm exec --yes firebase-tools@15.36.0 -- login");
    console.error("  2. node backend/scripts/generate-firebase-env-from-cli.mjs");
    console.error(
      "  3. Firebase Console → Project settings → Service accounts → Generate new private key",
    );
    console.error("  4. Set FIREBASE_SERVICE_ACCOUNT_JSON in backend/.env (gitignored)");
    console.error("  5. Re-run: node backend/scripts/bootstrap-firebase-root.mjs");
    process.exit(1);
  }

  let admin;
  try {
    admin = require("firebase-admin");
  } catch {
    console.error("firebase-admin not installed — run npm install from backend/");
    process.exit(1);
  }

  if (!admin.apps.length) {
    const bucket =
      process.env.FIREBASE_STORAGE_BUCKET?.trim() ||
      `${account.project_id ?? account.projectId ?? "app"}.appspot.com`;
    admin.initializeApp({
      credential: admin.credential.cert(account),
      storageBucket: bucket,
      projectId: account.project_id ?? account.projectId,
    });
  }
  return admin;
}

async function main() {
  hydrateEnv();
  const admin = requireAdmin();
  const auth = admin.auth();

  const password =
    process.env.FIREBASE_ROOT_PASSWORD?.trim() ||
    process.env.OWNER_NEW_PASSWORD?.trim() ||
    "";

  let record;
  let created = false;

  try {
    record = await auth.getUserByEmail(OWNER_EMAIL);
    console.log(`Firebase user already exists: uid=${record.uid} email=${OWNER_EMAIL}`);
  } catch (err) {
    const code = err && typeof err === "object" && "code" in err ? err.code : "";
    if (code !== "auth/user-not-found") {
      console.error("getUserByEmail failed:", err instanceof Error ? err.message : err);
      process.exit(1);
    }
    const props = {
      email: OWNER_EMAIL,
      emailVerified: true,
      displayName: OWNER_NAME,
    };
    if (password) props.password = password;
    else {
      console.warn(
        "No FIREBASE_ROOT_PASSWORD / OWNER_NEW_PASSWORD — creating user without password (use password reset or link provider).",
      );
    }
    record = await auth.createUser(props);
    created = true;
    console.log(`Created Firebase root user: uid=${record.uid} email=${OWNER_EMAIL}`);
  }

  if (!created && password) {
    await auth.updateUser(record.uid, { password, emailVerified: true });
    console.log("Updated password and confirmed email for existing root user.");
  }

  console.log("\n--- Profile linkage (Supabase Postgres) ---");
  console.log("Owner tier is applied on first API login via ensureAuthProfile + isOwnerEmail().");
  console.log("If profiles.id is still a legacy Supabase auth uuid, run in SQL editor:\n");
  console.log(
    `  UPDATE public.profiles SET id = '${record.uid}' WHERE id = '<legacy-supabase-uuid>';`,
  );
  console.log("\nSee backend/src/db/migrations/020_firebase_auth_profiles.sql for full notes.");
  console.log("\nDo not set USE_FIREBASE_AUTH=true until Admin creds and profile id are aligned.");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
