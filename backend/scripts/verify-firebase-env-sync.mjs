/**
 * Compare frontend/.env.local Firebase NEXT_PUBLIC_* keys with
 * backend/.env.firebase.generated (from npm run env:web).
 *
 * Usage: node backend/scripts/verify-firebase-env-sync.mjs
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "../..");
const localPath = resolve(repoRoot, "frontend/.env.local");
const genPath = resolve(__dirname, "../.env.firebase.generated");

const SDK_KEYS = [
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID",
];

function parseEnv(path) {
  const map = new Map();
  if (!existsSync(path)) return map;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !line.trim().startsWith("#")) {
      const v = m[2].replace(/^["']|["']$/g, "").trim();
      map.set(m[1], v);
    }
  }
  return map;
}

function main() {
  const local = parseEnv(localPath);
  const gen = parseEnv(genPath);
  let exit = 0;

  if (!local.get("NEXT_PUBLIC_FIREBASE_VAPID_KEY")) {
    console.error("FAIL: NEXT_PUBLIC_FIREBASE_VAPID_KEY missing in frontend/.env.local");
    console.error("  Fix: cd frontend && vercel env pull .env.local --yes");
    exit = 1;
  } else {
    console.log("OK: VAPID present in .env.local");
  }

  if (!existsSync(genPath)) {
    console.warn("WARN: backend/.env.firebase.generated missing — run: cd firebase && npm run env:web");
  } else {
    for (const k of SDK_KEYS) {
      const a = local.get(k);
      const b = gen.get(k);
      if (!a) {
        console.error(`FAIL: ${k} missing in .env.local`);
        exit = 1;
        continue;
      }
      if (b && a !== b) {
        console.error(`FAIL: ${k} mismatch\n  local:      ${a}\n  generated:  ${b}`);
        exit = 1;
      } else if (b) {
        console.log(`OK: ${k}`);
      }
    }
  }

  const sender = local.get("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID");
  if (sender && sender !== "906118704805") {
    console.warn(`WARN: messagingSenderId is ${sender} (expected 906118704805 for rn01-af00b)`);
  }

  const authDomain = local.get("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
  if (authDomain === "auth.harindrasah.com.np") {
    console.warn(
      "WARN: auth.harindrasah.com.np is not Firebase Hosting yet — use rn01-af00b.firebaseapp.com until custom domain is live",
    );
  }

  if (exit === 0) console.log("\nFirebase env sync check passed.");
  process.exit(exit);
}

main();