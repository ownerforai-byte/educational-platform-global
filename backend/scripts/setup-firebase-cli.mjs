/**
 * One-shot Firebase + local env setup via CLI (no console clicking).
 *
 *   npm run firebase:setup
 *   npm run firebase:setup -- --skip-gcloud
 *
 * Steps:
 *  1. Firebase CLI login + project (firebase/.firebaserc)
 *  2. Public web SDK config → backend/.env.firebase.generated + merge into env files
 *  3. Optional: gcloud mints backend/firebase-service-account.json (if gcloud installed)
 *  4. Bootstrap root Firebase user (password from FIREBASE_ROOT_PASSWORD / OWNER_NEW_PASSWORD)
 *  5. Enable Email/Password sign-in on the project (Identity Toolkit API)
 *  6. Link Supabase owner profile id → Firebase uid
 *  7. Flip USE_FIREBASE_AUTH flags when Admin is ready
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveServiceAccountAbsolute } from "./firebase-sa-path.mjs";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "../..");
const firebaseDir = resolve(repoRoot, "firebase");
const backendEnv = resolve(__dirname, "../.env");
const frontendEnv = resolve(repoRoot, "frontend/.env.local");
const saPath = resolve(__dirname, "../firebase-service-account.json");
const skipGcloud = process.argv.includes("--skip-gcloud");

function run(cmd, args, opts = {}) {
  const result = spawnSync(cmd, args, {
    encoding: "utf8",
    shell: opts.shell ?? false,
    cwd: opts.cwd ?? repoRoot,
    maxBuffer: 4 * 1024 * 1024,
    windowsHide: true,
    ...opts,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error((result.stderr || result.stdout || `${cmd} exited ${result.status}`).trim());
  }
  return result.stdout ?? "";
}

/** Windows: npm exec + shell:true often exits non-zero while Firebase still succeeds. */
function firebaseCli(firebaseArgs) {
  const isWin = process.platform === "win32";
  const cmd = isWin ? "npx.cmd" : "npx";
  const result = spawnSync(cmd, ["--yes", "firebase-tools@15.36.0", ...firebaseArgs], {
    cwd: firebaseDir,
    encoding: "utf8",
    maxBuffer: 4 * 1024 * 1024,
    shell: false,
    windowsHide: true,
  });
  if (result.error && isWin) {
    return spawnSync("npm", ["exec", "--yes", "firebase-tools@15.36.0", "--", ...firebaseArgs], {
      cwd: firebaseDir,
      encoding: "utf8",
      maxBuffer: 4 * 1024 * 1024,
      shell: true,
      windowsHide: true,
    });
  }
  return result;
}

function firebaseCliSucceeded(result, pid) {
  const out = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
  return (
    result.status === 0 ||
    (result.status === null && /✔|Firebase projects/i.test(out)) ||
    out.includes(pid) ||
    /✔|project\(s\) total/i.test(out) ||
    /Preparing the list of your Firebase projects/i.test(out)
  );
}

function projectId() {
  const rc = JSON.parse(readFileSync(resolve(firebaseDir, ".firebaserc"), "utf8"));
  return rc?.projects?.default?.trim() || process.env.FIREBASE_PROJECT_ID?.trim() || "rn01-af00b";
}

function parseEnvFile(path) {
  const map = new Map();
  if (!existsSync(path)) return map;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !line.trim().startsWith("#")) map.set(m[1], m[2]);
  }
  return map;
}

function writeEnvFile(path, map) {
  const prior = existsSync(path) ? readFileSync(path, "utf8").split(/\r?\n/) : [];
  const keys = new Set(map.keys());
  const out = [];
  const written = new Set();

  for (const line of prior) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=/);
    if (m && keys.has(m[1])) {
      out.push(`${m[1]}=${map.get(m[1])}`);
      written.add(m[1]);
    } else {
      out.push(line);
    }
  }
  for (const [k, v] of map) {
    if (!written.has(k)) out.push(`${k}=${v}`);
  }
  writeFileSync(path, `${out.join("\n").replace(/\n*$/, "")}\n`);
}

function hydrateBackendEnv() {
  if (!existsSync(backendEnv)) return;
  for (const line of readFileSync(backendEnv, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !line.trim().startsWith("#") && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

function assertFirebaseLogin(pid) {
  const use = firebaseCli(["use", pid]);
  if (firebaseCliSucceeded(use, pid)) return;

  const list = firebaseCli(["projects:list"]);
  if (firebaseCliSucceeded(list, pid)) return;

  const out = `${list.stdout ?? ""}\n${list.stderr ?? ""}`.trim();
  console.error("Firebase CLI not logged in or project unreachable.");
  console.error("  npm run firebase:login");
  throw new Error(out.slice(0, 500) || `firebase projects:list exited ${list.status}`);
}

function mergeGeneratedEnv() {
  const genPath = resolve(__dirname, "../.env.firebase.generated");
  if (!existsSync(genPath)) {
    run("node", ["backend/scripts/generate-firebase-env-from-cli.mjs"], { cwd: repoRoot });
  }
  const gen = parseEnvFile(genPath);
  const backend = parseEnvFile(backendEnv);
  const frontend = parseEnvFile(frontendEnv);

  for (const [k, v] of gen) {
    if (k.startsWith("FIREBASE_") || k === "USE_FIREBASE_AUTH") backend.set(k, v);
    if (k.startsWith("NEXT_PUBLIC_FIREBASE_")) frontend.set(k, v);
  }

  backend.set("USE_FIREBASE_AUTH", "true");
  frontend.set("NEXT_PUBLIC_USE_FIREBASE_AUTH", "true");
  backend.set("FIREBASE_SERVICE_ACCOUNT_PATH", "firebase-service-account.json");

  writeEnvFile(backendEnv, backend);
  writeEnvFile(frontendEnv, frontend);
  console.log("Merged web config into backend/.env and frontend/.env.local");
}

function tryGcloudServiceAccount(pid) {
  const onDisk = resolveServiceAccountAbsolute("firebase-service-account.json");
  if (onDisk || existsSync(saPath)) {
    console.log("Service account file already present — skipping gcloud");
    return true;
  }
  if (skipGcloud) {
    console.warn("No service account file; pass --skip-gcloud only if you placed the JSON manually.");
    return existsSync(saPath);
  }
  const ver = spawnSync("gcloud", ["--version"], { shell: true, encoding: "utf8", windowsHide: true });
  if (ver.status !== 0) {
    console.warn("gcloud not installed — place firebase-service-account.json manually (one-time).");
    return false;
  }
  const list = spawnSync(
    "gcloud",
    [
      "iam",
      "service-accounts",
      "list",
      "--project",
      pid,
      "--filter=email:firebase-adminsdk",
      "--format=value(email)",
    ],
    { shell: true, encoding: "utf8" },
  );
  const email = (list.stdout || "").trim().split(/\r?\n/).find(Boolean);
  if (!email) {
    console.warn("No firebase-adminsdk service account visible to gcloud.");
    return false;
  }
  run("gcloud", [
    "iam",
    "service-accounts",
    "keys",
    "create",
    saPath,
    "--iam-account",
    email,
    "--project",
    pid,
  ]);
  console.log(`Wrote ${saPath} via gcloud`);
  return true;
}

async function enableEmailPasswordSignIn(pid) {
  const saFile = resolveServiceAccountAbsolute("firebase-service-account.json") || saPath;
  if (!existsSync(saFile)) {
    console.warn("Skipping sign-in provider enable (no service account).");
    return;
  }
  const account = JSON.parse(readFileSync(saFile, "utf8"));
  const admin = require("firebase-admin");
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(account),
      projectId: pid,
    });
  }
  const app = admin.app();
  const cred = app.options.credential;
  if (!cred?.getAccessToken) {
    console.warn("Could not obtain access token for Identity Toolkit API");
    return;
  }
  const { access_token: token } = await cred.getAccessToken();
  const url = `https://identitytoolkit.googleapis.com/v2/projects/${pid}/config?updateMask=signIn.email.enabled`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      signIn: {
        email: { enabled: true, passwordRequired: true },
      },
    }),
  });
  if (!res.ok) {
    console.warn("Email/Password enable:", (await res.text()).slice(0, 300));
    return;
  }
  console.log("Enabled Email + Password sign-in on Firebase project");
}

async function main() {
  const pid = projectId();
  console.log(`\n▶ Firebase setup — project ${pid}\n`);

  assertFirebaseLogin(pid);
  mergeGeneratedEnv();
  hydrateBackendEnv();
  const pathRel = process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim() || "firebase-service-account.json";
  if (!resolveServiceAccountAbsolute(pathRel)) {
    console.error(`Missing ${pathRel} under backend/ — add gitignored service account JSON first.`);
    process.exit(1);
  }

  const adminReady = tryGcloudServiceAccount(pid);
  if (!adminReady && !resolveServiceAccountAbsolute(process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "firebase-service-account.json")) {
    console.error("\nAdmin JSON required. Either:");
    console.error("  • Install gcloud and re-run (creates key via IAM)");
    console.error("  • Drop Console JSON at backend/firebase-service-account.json");
    process.exit(1);
  }

  run("node", ["backend/scripts/bootstrap-firebase-root.mjs"], { cwd: repoRoot });
  await enableEmailPasswordSignIn(pid);
  const link = spawnSync("node", ["backend/scripts/link-firebase-owner-profile.mjs"], {
    cwd: repoRoot,
    encoding: "utf8",
    shell: false,
    windowsHide: true,
  });
  if (link.status !== 0) {
    console.warn(
      "\nSupabase owner profile link skipped — refresh SUPABASE_MANAGEMENT_TOKEN in backend/.env, then:\n  npm run firebase:link-owner",
    );
    if (link.stderr?.trim()) console.warn(link.stderr.trim().slice(0, 400));
  }

  console.log("\n✓ Firebase CLI setup complete — restart dev servers.");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
