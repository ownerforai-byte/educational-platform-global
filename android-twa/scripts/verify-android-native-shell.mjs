#!/usr/bin/env node
/**
 * Ensures the APK is a native shell (not TWA/Chrome) and signing certs match assetlinks.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO = path.resolve(ROOT, "..");
const MANIFEST = path.join(ROOT, "android", "app", "src", "main", "AndroidManifest.xml");
const ASSETLINKS = path.join(REPO, ".well-known", "assetlinks.json");
const CONTRACT = path.join(
  ROOT,
  "android",
  "app",
  "src",
  "main",
  "java",
  "com",
  "ravikisan",
  "platform",
  "security",
  "SecurityContract.java",
);

let failed = false;
const manifest = fs.readFileSync(MANIFEST, "utf8");
if (manifest.includes("asset_statements")) {
  console.error("::error::Remove TWA asset_statements from AndroidManifest.xml");
  failed = true;
}
if (manifest.includes("androidbrowserhelper") || manifest.includes("LauncherActivity")) {
  console.error("::error::TWA launcher remnants in manifest");
  failed = true;
}
if (!manifest.includes("WebHostFragment") && !fs.existsSync(path.join(ROOT, "android/app/src/main/java/com/ravikisan/platform/web/WebHostFragment.java"))) {
  /* WebHost exists as file */
}
const webHost = path.join(ROOT, "android/app/src/main/java/com/ravikisan/platform/web/WebHostFragment.java");
if (!fs.existsSync(webHost)) {
  console.error("::error::Missing WebHostFragment.java");
  failed = true;
}

const asset = JSON.parse(fs.readFileSync(ASSETLINKS, "utf8"));
const fps = asset?.[0]?.target?.sha256_cert_fingerprints ?? [];
const contract = fs.readFileSync(CONTRACT, "utf8");
const javaCerts = [...contract.matchAll(/"([0-9A-F]{64})"/g)].map((m) => m[1]);
const norm = (f) => f.replace(/[^0-9a-f]/gi, "").toUpperCase();
const assetSet = new Set(fps.map(norm));
for (const c of javaCerts) {
  if (!assetSet.has(c)) {
    console.error(`::error::assetlinks.json missing fingerprint for ${c.slice(0, 8)}…`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log("android native shell verify OK");