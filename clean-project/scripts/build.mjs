/**
 * Recursion-safe build wrapper for Cloudflare deployment.
 *
 * @cloudflare/next-on-pages internally runs `vercel build`, and Vercel CLI runs
 * the project's `build` script. If that script invoked next-on-pages directly,
 * it would recurse forever (Vercel CLI refuses with "must not recursively
 * invoke itself" once `__VERCEL_BUILD_RUNNING` is set).
 *
 * This wrapper detects whether it is running inside a `vercel build` and, if
 * so, only performs a plain `next build`. When invoked at the top level it runs
 * `next build` followed by `@cloudflare/next-on-pages`, which produces
 * `.vercel/output/static/_worker.js/index.js` for deployment.
 *
 * After next-on-pages finishes it writes `.assetsignore` into the generated
 * output directory so the worker (server-side code) is never uploaded as a
 * public asset by `wrangler deploy` / `wrangler pages deploy`.
 */
import { spawnSync } from "node:child_process";
import { writeFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const outputDir = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  ".vercel",
  "output",
  "static"
);

function runNode(binScript, args) {
  const result = spawnSync(process.execPath, [binScript, ...args], {
    stdio: "inherit",
    env: process.env,
  });
  if (result.error) {
    console.error(`Failed to run: ${binScript} ${args.join(" ")}`);
    console.error(result.error);
    process.exit(1);
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

const insideVercelBuild = Boolean(process.env.__VERCEL_BUILD_RUNNING);
const nextBin = "node_modules/next/dist/bin/next";
const nextOnPagesBin = "node_modules/@cloudflare/next-on-pages/bin/index.js";

if (insideVercelBuild) {
  runNode(nextBin, ["build"]);
} else {
  runNode(nextBin, ["build"]);
  runNode(nextOnPagesBin, []);
  writeFileSync(join(outputDir, ".assetsignore"), "_worker.js\n", "utf8");
  // nop-build-log.json (~8 MB) is written INSIDE _worker.js/ and would be
  // bundled into the deployed Worker, blowing the size limit. It is
  // diagnostic-only, so delete it from the deployable output.
  rmSync(join(outputDir, "_worker.js", "nop-build-log.json"), { force: true });
}