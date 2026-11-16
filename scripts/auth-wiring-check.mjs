/**
 * Quick production wiring checks (no secrets). Run: node scripts/auth-wiring-check.mjs
 */
const SITE = process.env.AUTH_CHECK_SITE || "https://www.harindrasah.com.np";
const API = process.env.AUTH_CHECK_API || "https://us-central1-rn01-af00b.cloudfunctions.net/api";
const FIREBASE_AUTH_DOMAIN =
  process.env.AUTH_CHECK_FIREBASE_DOMAIN || "rn01-af00b.firebaseapp.com";

async function head(url) {
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    return { url, status: res.status, ok: res.ok };
  } catch (err) {
    return { url, status: 0, ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

async function postJson(url, body) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = { raw: text.slice(0, 200) };
    }
    return { url, status: res.status, body: json };
  } catch (err) {
    return { url, status: 0, error: err instanceof Error ? err.message : String(err) };
  }
}

const checks = [
  ["Site", head(SITE)],
  ["API health", head(`${API}/api/health`)],
  ["Firebase auth handler", head(`https://${FIREBASE_AUTH_DOMAIN}/__/auth/handler`)],
  [
    "Login rejects bad token (expects 401 + FIREBASE_TOKEN_REJECTED)",
    postJson(`${API}/api/auth/login`, { idToken: "not-a-real-token" }),
  ],
  [
    "Signup rejects bad token (expects 401 + FIREBASE_TOKEN_REJECTED)",
    postJson(`${API}/api/auth/signup`, { idToken: "not-a-real-token", fullName: "Wiring Check" }),
  ],
];

const results = await Promise.all(checks.map(([, p]) => p));
for (let i = 0; i < checks.length; i++) {
  const [name] = checks[i];
  console.log(`\n## ${name}`);
  console.log(JSON.stringify(results[i], null, 2));
}

const login = results[3];
const signup = results[4];
if (login?.body?.code === "FIREBASE_ADMIN_NOT_CONFIGURED" || signup?.body?.code === "FIREBASE_ADMIN_NOT_CONFIGURED") {
  console.error(
    "\nFAIL: Render is missing Firebase Admin credentials (FIREBASE_PROJECT_ID + service account).",
  );
  process.exitCode = 1;
} else if (login?.status === 401 && signup?.status === 401) {
  console.log("\nOK: API verified Firebase mode (bad tokens rejected on login + signup).");
}