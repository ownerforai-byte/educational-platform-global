// Lists Supabase auth users (email + role metadata) using the backend service key.
const fs = require("fs");
const env = fs.readFileSync("backend/.env", "utf8");
function pick(k) {
  const m = env.match(new RegExp("^" + k + "=(.*)$", "m"));
  return m ? m[1].trim() : null;
}
const url = pick("SUPABASE_URL");
const key = pick("SUPABASE_SERVICE_ROLE_KEY");
if (!url || !key) { console.log("missing env"); process.exit(1); }
fetch(url + "/auth/v1/admin/users?per_page=50", {
  headers: { apikey: key, Authorization: "Bearer " + key },
})
  .then(async (r) => {
    if (!r.ok) { console.log("HTTP " + r.status); process.exit(1); }
    const d = await r.json();
    console.log("total users: " + d.users.length);
    for (const u of d.users) {
      const meta = u.user_metadata || {};
      console.log("- " + (u.email || "(no email)") + " | confirmed: " + !!u.email_confirmed_at + " | role: " + (meta.role || u.role || "(none)") + " | id: " + u.id);
    }
  })
  .catch((e) => console.log("FAIL: " + e.message));