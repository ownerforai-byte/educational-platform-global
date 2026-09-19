// Verify the 5 platform owner emails against Supabase.
// Usage: node scripts/verify-owner-emails.mjs   (from backend/)
// Read-only: lists auth accounts + profile rows. Prints only emails and
// status flags — never tokens, hashes, or other users' data.
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
dotenv.config({ path: "../.env" });

const OWNER_EMAILS = [
  "harindarsah98172@gmail.com",
  "yashsah231@gmail.com",
  "sahrocky81@gmail.com",
  "ravikisan1814@gmail.com",
  "planephoto88@gmail.com",
];

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const { createClient } = await import("@supabase/supabase-js");
const db = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

// Pull all auth users via the admin API (paginated).
const authByEmail = new Map();
let page = 1;
for (;;) {
  const { data, error } = await db.auth.admin.listUsers({ page, perPage: 200 });
  if (error) {
    console.error("listUsers failed:", error.message);
    process.exit(1);
  }
  for (const u of data.users) authByEmail.set((u.email ?? "").toLowerCase(), u);
  if (data.users.length < 200) break;
  page += 1;
}

// Profile rows for the owner ids we find.
const foundEmails = OWNER_EMAILS.map((e) => e.toLowerCase());
const ids = [...authByEmail.entries()]
  .filter(([email]) => foundEmails.includes(email))
  .map(([, u]) => u.id);
const { data: profiles } = ids.length
  ? await db.from("profiles").select("id, email, role, credits, premium_status").in("id", ids)
  : { data: [] };
const profileById = new Map((profiles ?? []).map((p) => [p.id, p]));

console.log("\n=== Owner email verification ===\n");
let ok = 0;
for (const email of OWNER_EMAILS) {
  const u = authByEmail.get(email.toLowerCase());
  if (!u) {
    console.log(`✗ ${email}\n    NO AUTH ACCOUNT — sign up once on the platform to create it.\n`);
    continue;
  }
  const p = profileById.get(u.id);
  const confirmed = u.email_confirmed_at != null;
  const role = p?.role ?? "(no profile row)";
  const credits = p?.credits ?? "-";
  const premium = p?.premium_status ?? "-";
  // Runtime OWNER power comes from the hard-coded allowlist in
  // backend/src/middleware/auth.ts, so role in DB is informational.
  console.log(`✓ ${email}`);
  console.log(`    auth: id=${u.id} confirmed=${confirmed} last_sign_in=${u.last_sign_in_at ?? "never"}`);
  console.log(`    profile: role=${role} credits=${credits} premium=${premium}\n`);
  ok += 1;
}
console.log(`--- ${ok}/5 have auth accounts. Runtime OWNER privileges derive from the`);
console.log("    allowlist in backend/src/middleware/auth.ts, independent of profile.role.\n");
