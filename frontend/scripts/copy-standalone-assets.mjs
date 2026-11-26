#!/usr/bin/env node
/**
 * COPY STANDALONE ASSETS
 *
 * Why this is required:
 * Next.js with `output: "standalone"` produces `.next/standalone` with the minimal
 * Node.js server (`server.js`), but explicitly DOES NOT copy:
 *   1. `.next/static` (compiled CSS, client JS chunks, fonts)
 *   2. `public` (icons, manifest, images, root assets)
 *
 * Per official Next.js documentation (https://nextjs.org/docs/app/api-reference/config/next-config-js/output):
 * "This minimal server does not copy the public or .next/static folders by default as
 * these should ideally be handled by a CDN, although these folders can be copied to the
 * standalone/public and standalone/.next/static folders manually, after which server.js
 * will serve these automatically."
 *
 * On Firebase App Hosting / Cloud Run:
 * Next.js standalone runs behind the container's PORT. Without these assets inside
 * `.next/standalone/frontend/.next/static` and `.next/standalone/frontend/public`,
 * all requests to /_next/static/*.css, /_next/static/*.js, and /public assets 404!
 *
 * This script runs automatically in `postbuild` (after `next build`) to ensure
 * standalone bundles are immediately ready to serve static assets.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendRoot = path.resolve(__dirname, "..");

const srcStatic = path.join(frontendRoot, ".next", "static");
const srcPublic = path.join(frontendRoot, "public");

const standaloneRoot = path.join(frontendRoot, ".next", "standalone");
const standaloneFrontend = path.join(standaloneRoot, "frontend");

if (!fs.existsSync(standaloneRoot)) {
  console.log("[copy-standalone-assets] .next/standalone does not exist; skipping.");
  process.exit(0);
}

// Targets to populate
const targets = [standaloneFrontend, standaloneRoot].filter((p) => fs.existsSync(p));

for (const target of targets) {
  if (fs.existsSync(srcStatic)) {
    const destStatic = path.join(target, ".next", "static");
    fs.cpSync(srcStatic, destStatic, { recursive: true, force: true });
    console.log(`[copy-standalone-assets] Copied .next/static -> ${destStatic}`);
  }
  if (fs.existsSync(srcPublic)) {
    const destPublic = path.join(target, "public");
    fs.cpSync(srcPublic, destPublic, { recursive: true, force: true });
    console.log(`[copy-standalone-assets] Copied public -> ${destPublic}`);
  }
}
