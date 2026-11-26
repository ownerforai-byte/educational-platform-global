/**
 * START WRAPPER — the command the App Hosting container actually runs.
 *
 * Why this exists (2026-11-26 outage): with no `runCommand` in
 * apphosting.yaml, App Hosting fell back to the ROOT package.json `start`,
 * which starts the BACKEND workspace (`node dist/index.js`). `backend/dist`
 * is a build artifact that is not committed, so the container died with
 * `Cannot find module '/workspace/backend/dist/index.js'` before ever
 * listening on $PORT — every rollout failed and the domain 404'd.
 *
 * This wrapper is the frontend's own start and is safe to run from any cwd
 * via `npm run start --workspace=educational-platform-frontend` (npm sets
 * cwd to the workspace root, which is `frontend/`).
 *
 * HOSTNAME=0.0.0.0 is NOT cosmetic: a Linux container's HOSTNAME env is the
 * container id, which /etc/hosts maps to loopback. Next's standalone server
 * binds `process.env.HOSTNAME || "0.0.0.0"`, so left alone it binds
 * 127.0.0.1 — Cloud Run's STARTUP TCP probe connects to the container IP,
 * not loopback, and the revision is killed as "failed to listen on PORT".
 */
process.env.HOSTNAME = "0.0.0.0";

await import("../.next/standalone/frontend/server.js");
