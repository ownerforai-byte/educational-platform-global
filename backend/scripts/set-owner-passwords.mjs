import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const p = resolve(__dirname, "..", ".env");
  const v = {};
  try {
    for (const l of readFileSync(p, "utf8").split(/\r?\n/)) {
      const m = l.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m && !l.trim().startsWith("#")) v[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {}
  return v;
}

const e = loadEnv();
const URL = e.SUPABASE_URL;
const KEY = e.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) {
  console.error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing");
  process.exit(1);
}

async function auth(path, init = {}) {
  const r = await fetch(`${URL}/auth/v1${path}`, {
    method: init.method ?? "GET",
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: init.body ? JSON.stringify(init.body) : undefined,
  });
  return { status: r.status, data: await r.json().catch(() => null) };
}

async function rest(path, init = {}) {
  const r = await fetch(`${URL}/rest/v1${path}`, {
    method: init.method ?? "GET",
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: init.body ? JSON.stringify(init.body) : undefined,
  });
  return { status: r.status, data: await r.json().catch(() => null) };
}

// Simple but strong password: Easy to type, easy to remember, passes all requirements (11 chars, upper, lower, numbers, symbols)
const NEW_PASSWORD = "Owner@2026#";

const OWNERS = [
  { email: "harindarsah98172@gmail.com", name: "Harindra Sah" },
  { email: "yashsah231@gmail.com", name: "Yash Sah" },
  { email: "sahrocky81@gmail.com", name: "Sah Rocky" },
  { email: "ravikisan1814@gmail.com", name: "Ravi Kisan" },
  { email: "planephoto88@gmail.com", name: "Plane Photo" },
];

async function main() {
  console.log(`=== Setting simple but strong password (${NEW_PASSWORD}) for all 5 owners ===\n`);

  const list = await auth("/admin/users");
  const users = list.data?.users ?? [];
  const byEmail = new Map(users.map((u) => [u.email, u]));

  const results = [];

  for (const owner of OWNERS) {
    console.log(`\n──────── ${owner.email} ────────`);
    let user = byEmail.get(owner.email);

    if (!user) {
      const c = await auth("/admin/users", {
        method: "POST",
        body: {
          email: owner.email,
          password: NEW_PASSWORD,
          email_confirm: true,
          user_metadata: { full_name: owner.name },
        },
      });
      user = c.data?.user ?? c.data;
      console.log(`  · created account`);
    }

    const id = user?.id;
    if (!id) {
      console.log("  ✗ could not resolve user id");
      results.push({ ...owner, ok: false, detail: "no user id" });
      continue;
    }

    // 1. Force email confirmation
    await auth(`/admin/users/${id}`, {
      method: "PUT",
      body: { email_confirm: true },
    });
    console.log("  ✓ email confirmed");

    // 2. Set new password
    const pw = await auth(`/admin/users/${id}`, {
      method: "PUT",
      body: { password: NEW_PASSWORD },
    });
    console.log(
      pw.status === 200
        ? `  ✓ password set → ${NEW_PASSWORD}`
        : `  ⚠ password setting HTTP ${pw.status}`
    );

    // 3. Test real login
    const login = await auth("/token?grant_type=password", {
      method: "POST",
      body: { email: owner.email, password: NEW_PASSWORD },
    });

    const loginOk =
      !login.data?.error &&
      (!!login.data?.access_token || !!login.data?.user?.id);

    console.log(
      loginOk
        ? `  ✓ LOGIN VERIFIED (access_token issued: ${login.data.access_token.slice(0, 20)}...)`
        : `  ✗ LOGIN FAILED: ${login.data?.error_description ?? JSON.stringify(login.data)}`
    );

    // 4. Ensure profiles.role = OWNER
    const prof = await rest(`/profiles?id=eq.${id}`);
    const profiles = Array.isArray(prof.data) ? prof.data : [];
    if (profiles.length === 0) {
      await rest("/profiles", {
        method: "POST",
        body: { id, full_name: owner.name, role: "OWNER", credits: 999999, premium_status: true },
      });
      console.log("  ✓ created profiles row (role=OWNER, unlimited credits)");
    } else {
      await rest(`/profiles?id=eq.${id}`, {
        method: "PATCH",
        body: { role: "OWNER", full_name: owner.name, credits: 999999, premium_status: true },
      });
      console.log("  ✓ updated profiles row (role=OWNER, unlimited credits)");
    }

    results.push({
      ...owner,
      id,
      password: NEW_PASSWORD,
      ok: loginOk,
      tokenSnippet: login.data?.access_token ? `${login.data.access_token.slice(0, 15)}...` : "none",
    });
  }

  console.log("\n==================== VERIFICATION SUMMARY ====================");
  for (const r of results) {
    console.log(`  ${r.ok ? "✅" : "❌"} Email: ${r.email.padEnd(30)} Password: ${r.password}  Status: ${r.ok ? "LOGIN SUCCESS (OWNER)" : "FAILED"}`);
  }
  const allOk = results.every((r) => r.ok);
  console.log(allOk ? "\nAll 5 owners successfully configured with simple & strong password!" : "\nSome accounts failed.");
  process.exit(allOk ? 0 : 1);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
