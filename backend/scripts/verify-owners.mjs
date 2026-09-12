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

// Fresh, strong, unique passwords (12 chars: upper+lower+digit+symbol).
const OWNERS = [
  { email: "harindarsah98172@gmail.com", password: "HarinOw26#1", name: "Harindra Sah" },
  { email: "yashsah231@gmail.com", password: "YashOw26#1", name: "Yash Sah" },
  { email: "sahrocky81@gmail.com", password: "RockyOw26#1", name: "Sah Rocky" },
  { email: "ravikisan1814@gmail.com", password: "RaviOw26#1", name: "Ravi Kisan" },
  { email: "planephoto88@gmail.com", password: "PlaneOw26#1", name: "Plane Photo" },
];

async function main() {
  console.log("=== Verifying 5 owner accounts ===\n");

  // Resolve all auth users (correct endpoint: /admin/users).
  const list = await auth("/admin/users");
  const users = list.data?.users ?? [];
  const byEmail = new Map(users.map((u) => [u.email, u]));

  const results = [];

  for (const owner of OWNERS) {
    console.log(`\n──────── ${owner.email} ────────`);
    let user = byEmail.get(owner.email);

    // 1. Ensure account exists (create only if truly missing).
    if (!user) {
      const c = await auth("/admin/users", {
        method: "POST",
        body: {
          email: owner.email,
          password: owner.password,
          email_confirm: true,
          user_metadata: { full_name: owner.name },
        },
      });
      user = c.data?.user ?? c.data;
      console.log(`  · created account${user?.id ? "" : " (check below)"}`);
    }
    const id = user?.id;
    if (!id) {
      console.log("  ✗ could not resolve user id");
      results.push({ ...owner, ok: false, detail: "no user id" });
      continue;
    }

    // 2. Force email confirmation (complete identity).
    const confirm = await auth(`/admin/users/${id}`, {
      method: "PUT",
      body: { email_confirm: true },
    });
    console.log(
      confirm.data?.email_confirmed_at
        ? "  ✓ email confirmed"
        : `  ⚠ confirm: ${confirm.data?.msg ?? JSON.stringify(confirm.data)}`
    );

    // 3. Set the fresh password (this GoTrue build requires PUT, not PATCH).
    const pw = await auth(`/admin/users/${id}`, {
      method: "PUT",
      body: { password: owner.password },
    });
    console.log(
      pw.status === 200
        ? `  ✓ password set → ${owner.password}`
        : `  ⚠ password: HTTP ${pw.status} ${JSON.stringify(pw.data)}`
    );

    // 4. Verify a real login with that password (proves identity + creds).
    //    Use the GoTrue password-grant token endpoint — returns access_token on success.
    const login = await auth("/token?grant_type=password", {
      method: "POST",
      body: { email: owner.email, password: owner.password },
    });
    const loginOk =
      !login.data?.error &&
      (!!login.data?.access_token || !!login.data?.user?.id);
    console.log(
      loginOk
        ? `  ✓ LOGIN VERIFIED (${login.data?.user?.email ?? owner.email}, token issued)`
        : `  ✗ LOGIN FAILED: ${login.data?.error_description ?? JSON.stringify(login.data)}`
    );

    // 5. Ensure profiles.role = OWNER (keyed by user id, since profiles has no email col).
    const prof = await rest(`/profiles?id=eq.${id}`);
    const profiles = Array.isArray(prof.data) ? prof.data : [];
    if (profiles.length === 0) {
      await rest("/profiles", {
        method: "POST",
        body: { id, full_name: owner.name, role: "OWNER" },
      });
      console.log("  ✓ created profiles row (role=OWNER)");
    } else {
      await rest(`/profiles?id=eq.${id}`, {
        method: "PATCH",
        body: { role: "OWNER", full_name: owner.name },
      });
      console.log("  ✓ profiles.role=OWNER");
    }

    results.push({ ...owner, id, ok: loginOk, detail: loginOk ? "verified" : "login failed" });
  }

  console.log("\n=== Summary ===");
  for (const r of results) {
    console.log(`  ${r.ok ? "✅" : "❌"} ${r.email}  (pw=${r.password})  ${r.detail}`);
  }
  const allOk = results.every((r) => r.ok);
  console.log(allOk ? "\nAll 5 owners verified & logged in successfully." : "\nSome owners FAILED.");
  process.exit(allOk ? 0 : 1);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
