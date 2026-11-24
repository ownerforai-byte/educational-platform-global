#!/usr/bin/env node
/**
 * Static gate: native security files must stay present (run from repo root).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ANDROID = path.join(ROOT, "android", "app", "src", "main");

const REQUIRED = [
  "java/com/ravikisan/platform/security/FieldCipher.java",
  "java/com/ravikisan/platform/security/AuthSessionInvalidator.java",
  "java/com/ravikisan/platform/security/SecureDeepLink.java",
  "java/com/ravikisan/platform/security/SecureWindow.java",
  "java/com/ravikisan/platform/security/SecurityContract.java",
  "java/com/ravikisan/platform/security/AppSignatureGuard.java",
  "java/com/ravikisan/platform/security/OwnerBypassGuard.java",
  "java/com/ravikisan/platform/web/WebHostFragment.java",
  "java/com/ravikisan/platform/fcm/NotificationChannels.java",
  "res/layout/fragment_web_host.xml",
  "res/xml/network_security_config.xml",
  "AndroidManifest.xml",
].map((p) => path.join(ANDROID, p));

const TLS_PIN_FILE = path.join(ROOT, "security", "tls-pins.json");

const FORBIDDEN_SNIPPETS = [
  { file: "java/com/ravikisan/platform/session/SessionManager.java", text: "MODE_PRIVATE" },
  { file: "AndroidManifest.xml", text: 'android:allowBackup="true"' },
  { file: "AndroidManifest.xml", text: "asset_statements" },
];

let failed = false;
for (const file of REQUIRED) {
  if (!fs.existsSync(file)) {
    console.error(`::error::Missing ${path.relative(ROOT, file)}`);
    failed = true;
  }
}
for (const { file, text } of FORBIDDEN_SNIPPETS) {
  const full = path.join(ANDROID, file);
  if (fs.existsSync(full) && fs.readFileSync(full, "utf8").includes(text)) {
    console.error(`::error::Forbidden pattern in ${file}: ${text}`);
    failed = true;
  }
}
if (!fs.existsSync(TLS_PIN_FILE)) {
  console.error(`::error::Missing ${path.relative(ROOT, TLS_PIN_FILE)}`);
  failed = true;
} else {
  const pins = JSON.parse(fs.readFileSync(TLS_PIN_FILE, "utf8"));
  if (!Array.isArray(pins.pinsSha256SpkiBase64) || pins.pinsSha256SpkiBase64.length < 2) {
    console.error("::error::tls-pins.json must list at least 2 SPKI pins");
    failed = true;
  }
}

const nsc = fs.readFileSync(path.join(ANDROID, "res/xml/network_security_config.xml"), "utf8");
if (!nsc.includes("<pin-set")) {
  console.error("::error::network_security_config.xml missing pin-set");
  failed = true;
}

const contract = fs.readFileSync(
  path.join(ANDROID, "java/com/ravikisan/platform/security/SecurityContract.java"),
  "utf8",
);
if (!contract.includes("sahrocky81@gmail.com")) {
  console.error("::error::SecurityContract missing owner email");
  failed = true;
}

const backendNative = path.join(
  ROOT,
  "..",
  "backend",
  "src",
  "lib",
  "native-android-security.ts",
);
if (!fs.existsSync(backendNative)) {
  console.error(`::error::Missing ${path.relative(ROOT, backendNative)}`);
  failed = true;
} else {
  const backendText = fs.readFileSync(backendNative, "utf8");
  const javaCerts = [...contract.matchAll(/"([0-9A-F]{64})"/g)].map((m) => m[1]);
  const tsCerts = [...backendText.matchAll(/"([0-9A-F]{64})"/g)].map((m) => m[1]);
  const javaSet = new Set(javaCerts);
  for (const c of tsCerts) {
    if (!javaSet.has(c)) {
      console.error(`::error::Cert in backend missing from SecurityContract: ${c.slice(0, 8)}…`);
      failed = true;
    }
  }
  if (javaCerts.length !== tsCerts.length || javaSet.size !== tsCerts.length) {
    console.error(
      `::error::Signing cert count mismatch (Java ${javaCerts.length} vs TS ${tsCerts.length})`,
    );
    failed = true;
  }
}

if (failed) process.exit(1);
console.log("native security verify OK");