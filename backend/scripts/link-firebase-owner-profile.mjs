/**
 * Point the root owner profile at a Firebase uid (CLI — no SQL editor).
 *
 *   node backend/scripts/link-firebase-owner-profile.mjs
 *   node backend/scripts/link-firebase-owner-profile.mjs <firebase-uid>
 *
 * Resolves uid from argument or Firebase Admin (sahrocky81@gmail.com).
 */
import { createRequire } from "node:module";
import { existsSync, readFileSync } from "node:fs";
import { resolveServiceAccountAbsolute } from "./firebase-sa-path.mjs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runMgmtSql } from "./supabase-mgmt-sql.mjs";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

const OWNER_EMAIL = "sahrocky81@gmail.com";

function hydrateEnv() {
  const p = resolve(__dirname, "../.env");
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !line.trim().startsWith("#") && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

function readServiceAccount() {
  const pathRel = process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim();
  if (pathRel) {
    const abs = resolveServiceAccountAbsolute(pathRel);
    if (abs) return JSON.parse(readFileSync(abs, "utf8"));
  }
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      const norm = raw.replace(/\\n/g, "\n").replace(/\\"/g, '"');
      return JSON.parse(norm);
    }
  }
  return null;
}

async function resolveFirebaseUid(argUid) {
  if (argUid?.trim()) return argUid.trim();
  const account = readServiceAccount();
  if (!account) throw new Error("Firebase Admin creds missing — run firebase:setup first");
  const admin = require("firebase-admin");
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(account),
      projectId: account.project_id ?? account.projectId,
    });
  }
  const user = await admin.auth().getUserByEmail(OWNER_EMAIL);
  return user.uid;
}

async function main() {
  hydrateEnv();
  const arg = process.argv[2];
  const uid = await resolveFirebaseUid(arg);
  const esc = uid.replace(/'/g, "''");
  const emailEsc = OWNER_EMAIL.replace(/'/g, "''");

  const sql = `
DO $$
DECLARE
  legacy_id text;
BEGIN
  IF to_regclass('public.profiles') IS NULL THEN
    RAISE EXCEPTION 'public.profiles missing — run: npm run db:migrate';
  END IF;

  SELECT p.id::text INTO legacy_id
  FROM public.profiles p
  LEFT JOIN auth.users u ON u.id::text = p.id::text
  WHERE lower(coalesce(u.email, '')) = lower('${emailEsc}')
  LIMIT 1;

  IF legacy_id IS NULL THEN
    SELECT id::text INTO legacy_id FROM public.profiles ORDER BY id LIMIT 1;
  END IF;

  IF (
    SELECT data_type FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'id'
  ) = 'uuid' THEN
    RAISE EXCEPTION 'profiles.id is still uuid — run: npm run db:migrate (need migration 020)';
  END IF;

  IF legacy_id IS NOT NULL AND legacy_id <> '${esc}' THEN
    IF to_regclass('public.profile_follows') IS NOT NULL THEN
      UPDATE public.profile_follows SET follower_id = '${esc}' WHERE follower_id::text = legacy_id;
      UPDATE public.profile_follows SET following_id = '${esc}' WHERE following_id::text = legacy_id;
    END IF;
    IF to_regclass('public.storage_objects') IS NOT NULL THEN
      UPDATE public.storage_objects SET owner_id = '${esc}' WHERE owner_id::text = legacy_id;
    END IF;
    UPDATE public.profiles SET id = '${esc}' WHERE id::text = legacy_id;
  ELSIF legacy_id IS NULL THEN
    INSERT INTO public.profiles (id, role, access_status, plan, premium_status)
    VALUES ('${esc}', 'owner', 'ACTIVE', 'pro', true)
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;
`;

  await runMgmtSql(sql);
  console.log(`Linked owner profile → Firebase uid ${uid}`);
}

main()
  .then(() => {
    process.exitCode = 0;
  })
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  });
