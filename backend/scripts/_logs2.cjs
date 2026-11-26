/**
 * DIAGNOSTIC 2 — wide-window Cloud Run logs + build commit lookup.
 *   node scripts/_logs2.cjs
 */
const fs = require("fs");
const os = require("os");
const path = require("path");

const PROJECT = "rn01-af00b";
const LOCATION = "asia-southeast1";
const BACKEND = "harindrasah-web";
const CLIENT_ID = "563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com";
const CLIENT_SECRET = "j9iVZfS8kkCEFUPaAeJV0sAi";

const conf = JSON.parse(fs.readFileSync(path.join(os.homedir(), ".config", "configstore", "firebase-tools.json"), "utf8"));

async function accessToken() {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID, client_secret: CLIENT_SECRET,
      refresh_token: conf.tokens.refresh_token, grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new Error("token exchange failed");
  return (await res.json()).access_token;
}

(async () => {
  const token = await accessToken();
  const auth = { Authorization: `Bearer ${token}` };
  const base = `https://firebaseapphosting.googleapis.com/v1beta/projects/${PROJECT}/locations/${LOCATION}/backends/${BACKEND}`;

  // Build 007 details
  const builds = (await (await fetch(`${base}/builds?pageSize=10`, { headers: auth })).json()).builds ?? [];
  for (const b of builds) {
    const id = (b.name || "").split("/").pop();
    if (!/007|006/.test(id)) continue;
    console.log(`== ${id} state=${b.state}`);
    console.log(`   commit: ${b.buildInput?.source?.updateSource?.commit || JSON.stringify(b.buildInput?.source ?? {}).slice(0, 200)}`);
    if (b.error) console.log(`   error: ${b.error.message}`);
  }

  // Any cloud_run logs, 24h, any service
  const logRes = await fetch("https://logging.googleapis.com/v2/entries:list", {
    method: "POST",
    headers: { ...auth, "Content-Type": "application/json" },
    body: JSON.stringify({
      resourceNames: [`projects/${PROJECT}`],
      pageSize: 60,
      orderBy: "timestamp desc",
      filter: 'resource.type="cloud_run_revision" AND timestamp>="2026-11-25T00:00:00Z"',
    }),
  });
  const j = await logRes.json();
  if (j.error) console.log("\nLOG API ERROR:", JSON.stringify(j.error).slice(0, 300));
  console.log(`\n== CLOUD RUN LOGS (24h, ${j.entries?.length ?? 0} entries) ==`);
  const seen = new Set();
  for (const e of j.entries ?? []) {
    const svc = e.resource?.labels?.service_name ?? "?";
    const loc = e.resource?.labels?.location ?? "?";
    const rev = e.resource?.labels?.revision_name ?? "?";
    const key = `${svc}|${rev}`;
    if (!seen.has(key)) { console.log(`--- service=${svc} loc=${loc} rev=${rev}`); seen.add(key); }
    const ts = (e.timestamp || "").slice(5, 19);
    const payload = e.textPayload || String(JSON.stringify(e.jsonPayload ?? e.protoPayload ?? "")).slice(0, 300);
    console.log(`${ts} ${e.severity ?? ""} | ${payload}`);
  }
})().catch((e) => { console.error("FAILED:", e.message); process.exit(1); });
