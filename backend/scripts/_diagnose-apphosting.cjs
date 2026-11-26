/**
 * DIAGNOSTIC — App Hosting build/rollout status + Cloud Run + Cloud Build logs.
 * Uses the firebase-tools CLI's own stored refresh token. Prints statuses and
 * log lines only — never the token.
 *
 *   node scripts/_diagnose-apphosting.cjs
 */
const fs = require("fs");
const os = require("os");
const path = require("path");

const PROJECT = "rn01-af00b";
const LOCATION = "asia-southeast1";
const BACKEND = "harindrasah-web";
const CLIENT_ID = "563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com";
// firebase-tools' own public OAuth client secret (shipped in the OSS CLI source).
const CLIENT_SECRET = "j9iVZfS8kkCEFUPaAeJV0sAi";

const confPath = path.join(os.homedir(), ".config", "configstore", "firebase-tools.json");
const conf = JSON.parse(fs.readFileSync(confPath, "utf8"));

async function accessToken() {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: conf.tokens.refresh_token,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new Error("token exchange failed: " + (await res.text()).slice(0, 200));
  return (await res.json()).access_token;
}

function oneLine(value, max = 240) {
  return String(value ?? "").replace(/\s+/g, " ").slice(0, max);
}

(async () => {
  const token = await accessToken();
  const auth = { Authorization: `Bearer ${token}` };
  const base = `https://firebaseapphosting.googleapis.com/v1beta/projects/${PROJECT}/locations/${LOCATION}/backends/${BACKEND}`;

  // 1. Builds
  const buildsRes = await fetch(`${base}/builds?pageSize=6`, { headers: auth });
  const builds = (await buildsRes.json()).builds ?? [];
  console.log("== BUILDS ==");
  for (const b of builds) {
    const id = (b.name || "").split("/").pop();
    console.log(`${id}  ${b.state}`);
    if (b.error) console.log(`    error: ${oneLine(b.error.message)}`);
  }

  // 2. Rollouts
  const rolloutsRes = await fetch(`${base}/rollouts?pageSize=6`, { headers: auth });
  const rollouts = (await rolloutsRes.json()).rollouts ?? [];
  console.log("\n== ROLLOUTS ==");
  for (const r of rollouts) {
    const id = (r.name || "").split("/").pop();
    console.log(`${id}  ${r.state}${r.build ? ` (build ${(r.build || "").split("/").pop()})` : ""}`);
  }

  // 3. Cloud Run revision logs (the container's own stdout/stderr + audit)
  const logBody = {
    resourceNames: [`projects/${PROJECT}`],
    pageSize: 40,
    orderBy: "timestamp desc",
    filter:
      'resource.type="cloud_run_revision" AND resource.labels.service_name="harindrasah-web" AND timestamp>="-6h"',
  };
  const logRes = await fetch("https://logging.googleapis.com/v2/entries:list", {
    method: "POST",
    headers: { ...auth, "Content-Type": "application/json" },
    body: JSON.stringify(logBody),
  });
  const logJson = await logRes.json();
  console.log("\n== CLOUD RUN LOGS (last 6h, newest first) ==");
  for (const e of logJson.entries ?? []) {
    const ts = (e.timestamp || "").slice(5, 19);
    const payload = e.textPayload || oneLine(JSON.stringify(e.jsonPayload ?? e.protoPayload ?? e.insertId ?? ""));
    console.log(`${ts} ${e.severity} | ${payload}`);
  }

  // 4. Cloud Build steps (why a BUILD itself might fail)
  const cbRes = await fetch("https://logging.googleapis.com/v2/entries:list", {
    method: "POST",
    headers: { ...auth, "Content-Type": "application/json" },
    body: JSON.stringify({
      resourceNames: [`projects/${PROJECT}`],
      pageSize: 25,
      orderBy: "timestamp desc",
      filter: 'resource.type="build" AND severity>=WARNING AND timestamp>="-6h"',
    }),
  });
  const cbJson = await cbRes.json();
  console.log("\n== CLOUD BUILD LOGS (warnings+, last 6h) ==");
  for (const e of cbJson.entries ?? []) {
    const ts = (e.timestamp || "").slice(5, 19);
    console.log(`${ts} ${e.severity} | ${oneLine(e.textPayload || JSON.stringify(e.jsonPayload ?? ""))}`);
  }
})().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
