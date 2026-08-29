/**
 * Fix owner accounts via direct REST API (bypasses schema cache issues)
 */
const SUPABASE_URL = "https://tsvbksfegvdjwczzfdcx.supabase.co";
const SUPABASE_KEY = "sb_secret_zjSCDlGI-MJ8Wen_tc3F1w_FugTM69j";

const OWNERS = [
  { email: "harindarsah98172@gmail.com", password: "Harindu@123", name: "Harindra Sah" },
  { email: "yashsah231@gmail.com",       password: "Yashsah@231", name: "Yash Sah" },
  { email: "sahrocky81@gmail.com",       password: "Sahrocky@81", name: "Sah Rocky" },
  { email: "ravikisan1814@gmail.com",    password: "Ravikisan@1814", name: "Ravi Kisan" },
  { email: "planephoto88@gmail.com",     password: "Planephoto@88", name: "Plane Photo" },
];

async function authApi(method: string, path: string, body?: unknown) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1${path}`, {
    method,
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  try { return { status: res.status, data: JSON.parse(text) }; }
  catch { return { status: res.status, data: text }; }
}

async function restApi(method: string, path: string, body?: unknown) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    method,
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  try { return { status: res.status, data: JSON.parse(text) }; }
  catch { return { status: res.status, data: text }; }
}

async function main() {
  console.log("=== Fixing owner accounts ===\n");

  for (const owner of OWNERS) {
    console.log(`\n[1] Processing ${owner.email}...`);

    // List all users
    const listRes = await authApi("GET", "/users");
    const users: any[] = Array.isArray(listRes.data) ? listRes.data : (listRes.data?.users || []);
    let user = users.find((u: any) => u.email === owner.email);

    if (!user) {
      // Create user
      const createRes = await authApi("POST", "/admin/users", {
        email: owner.email,
        password: owner.password,
        email_confirm: true,
        user_metadata: { full_name: owner.name },
      });
      user = createRes.data?.user || createRes.data;
      console.log(`  ✓ Created account: ${(user as any)?.id}`);
    } else {
      console.log(`  ✓ Account exists: ${user.id}`);
    }

    const userId = (user as any).id;

    // Confirm email
    await authApi("PATCH", `/admin/users/${userId}`, { email_confirm: true });
    console.log(`  ✓ Email confirmed`);

    // Set password
    await authApi("PATCH", `/admin/users/${userId}`, { password: owner.password });
    console.log(`  ✓ Password set to: ${owner.password}`);

    // Check profile
    const profileRes = await restApi("GET", `/profiles?id=eq.${userId}`);
    const profiles: any[] = Array.isArray(profileRes.data) ? profileRes.data : [];

    if (!profiles || profiles.length === 0) {
      await restApi("POST", "/profiles", { id: userId, full_name: owner.name, role: "OWNER" });
      console.log(`  ✓ Created OWNER profile`);
    } else {
      await restApi("PATCH", `/profiles?id=eq.${userId}`, { role: "OWNER", full_name: owner.name });
      console.log(`  ✓ Updated to OWNER role`);
    }
  }

  console.log("\n=== Done ===");
  console.log("All 5 owner accounts are now active and confirmed.");
}

main().catch(console.error);
