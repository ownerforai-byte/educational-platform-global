/**
 * Enable Phone sign-in on rn01-af00b via Identity Toolkit (Admin service account).
 *   node backend/scripts/enable-firebase-phone-auth.mjs
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { resolveServiceAccountAbsolute } from "./firebase-sa-path.mjs";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "../..");
const firebaseDir = resolve(repoRoot, "firebase");

function projectId() {
  const rc = JSON.parse(readFileSync(resolve(firebaseDir, ".firebaserc"), "utf8"));
  return rc?.projects?.default?.trim() || "rn01-af00b";
}

async function main() {
  const pid = projectId();
  const saFile =
    resolveServiceAccountAbsolute("firebase-service-account.json") ||
    resolve(__dirname, "../firebase-service-account.json");
  if (!existsSync(saFile)) {
    console.error("Missing backend/firebase-service-account.json");
    process.exit(1);
  }
  const account = JSON.parse(readFileSync(saFile, "utf8"));
  const admin = require("firebase-admin");
  if (!admin.apps.length) {
    admin.initializeApp({ credential: admin.credential.cert(account), projectId: pid });
  }
  const { access_token: token } = await admin.app().options.credential.getAccessToken();
  const mask = [
    "signIn.email.enabled",
    "signIn.phoneNumber.enabled",
    "signIn.phoneNumber.testPhoneNumbers",
  ].join(",");
  const url = `https://identitytoolkit.googleapis.com/v2/projects/${pid}/config?updateMask=${mask}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      signIn: {
        email: { enabled: true, passwordRequired: true },
        phoneNumber: {
          enabled: true,
          testPhoneNumbers: {
            "+9779800000000": "123456",
          },
        },
      },
    }),
  });
  const text = await res.text();
  if (!res.ok) {
    console.error("Identity Toolkit PATCH failed:", res.status, text.slice(0, 500));
    process.exit(1);
  }
  console.log("Phone sign-in enabled on", pid);
  console.log("Test number: +9779800000000 → code 123456");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});