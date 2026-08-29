import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.local" });
dotenv.config();

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL || !SERVICE_KEY) {
  console.error(
    [
      "",
      "Missing configuration. Add these lines to .env.local:",
      "",
      "  SUPABASE_SERVICE_ROLE_KEY=<paste from Supabase Dashboard > Project Settings > API keys > service_role>",
      "",
      "(NEXT_PUBLIC_SUPABASE_URL is also required.)",
      "",
    ].join("\n"),
  );
  process.exit(1);
}

const owners = [];
for (let i = 1; i <= 3; i++) {
  const email = process.env[`OWNER_EMAIL_${i}`];
  const password = process.env[`OWNER_PASSWORD_${i}`];
  if (email && password) owners.push({ email: email.trim(), password });
}

if (owners.length === 0) {
  console.error("No OWNER_EMAIL_*/OWNER_PASSWORD_* pairs found in environment.");
  process.exit(1);
}

const admin = createClient(URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function findUserIdByEmail(email) {
  let page = 1;
  const perPage = 200;
  for (;;) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const hit = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    if (hit) return hit.id;
    if (data.users.length < perPage) return null;
    page += 1;
    if (page > 25) return null;
  }
}

const results = [];

for (const { email, password } of owners) {
  let userId = await findUserIdByEmail(email);
  const mode = userId ? "updated" : "created";

  if (!userId) {
    const created = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    userId = created.data?.user?.id ?? null;
    if (!userId) userId = await findUserIdByEmail(email);
    if (!userId) {
      results.push({ email, status: "FAILED", detail: "could not create or resolve user" });
      continue;
    }
  }

  const upd = await admin.auth.admin.updateUserById(userId, {
    password,
    email_confirm: true,
  });
  if (upd.error) {
    results.push({ email, status: "FAILED", detail: upd.error.message });
    continue;
  }

  const ownerFields = { role: "owner", access_level: 1, status: "approved" };

  const existingRow = await admin
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  let prof;
  if (existingRow.data?.id) {
    prof = await admin
      .from("profiles")
      .update(ownerFields)
      .eq("id", userId)
      .select("id, role")
      .single();
  } else {
    prof = await admin
      .from("profiles")
      .insert({ id: userId, email, ...ownerFields })
      .select("id, role")
      .single();
  }

  if (prof.error) {
    results.push({ email, status: "FAILED", detail: `profile: ${prof.error.message}` });
    continue;
  }

  results.push({
    email,
    status: `${mode.toUpperCase()} + role=${prof.data.role}`,
    detail: "ok",
  });
}

console.log("\nOwner provisioning summary:");
for (const r of results) {
  console.log(`  ${r.email.padEnd(34)} ${r.status}${r.detail && r.detail !== "ok" ? ` (${r.detail})` : ""}`);
}
const failed = results.filter((r) => r.status === "FAILED").length;
console.log(`\n${results.length - failed}/${results.length} owners ready.`);
process.exit(failed > 0 ? 1 : 0);
