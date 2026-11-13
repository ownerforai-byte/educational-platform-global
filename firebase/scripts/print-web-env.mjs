/**
 * @deprecated Use: npm run env:web  (from firebase/) or
 *   node backend/scripts/generate-firebase-env-from-cli.mjs
 */
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const script = resolve(repoRoot, "backend/scripts/generate-firebase-env-from-cli.mjs");
const r = spawnSync(process.execPath, [script], { stdio: "inherit", cwd: repoRoot });
process.exit(r.status ?? 1);
