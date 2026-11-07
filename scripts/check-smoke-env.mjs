#!/usr/bin/env node
/**
 * check-smoke-env — name the missing E2E secrets instead of failing mysteriously.
 *
 *   node scripts/check-smoke-env.mjs            # fails only when the app cannot boot
 *   node scripts/check-smoke-env.mjs --strict   # also fails on missing test credentials
 *
 * The E2E smoke workflow used to fail deep inside Playwright ("owner sign-in")
 * with no indication that the real cause was an empty NEXT_PUBLIC_* value.
 * This preflight prints the exact variable names, never their values, and
 * emits GitHub Actions annotations so the fix is one glance away.
 */
import assert from "node:assert/strict";

const PUBLIC_ENV = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_API_URL",
  "NEXT_PUBLIC_SITE_URL",
];
const CREDENTIALS = [
  "SMOKE_OWNER_EMAIL",
  "SMOKE_OWNER_PASSWORD",
  "SMOKE_MEMBER_EMAIL",
  "SMOKE_MEMBER_PASSWORD",
];
const STRICT = process.argv.includes("--strict");

const missing = (names) => names.filter((name) => !(process.env[name] ?? "").trim());

if (process.argv.includes("--self-test")) {
  process.env.PROBE_SET = "value";
  delete process.env.PROBE_UNSET;
  process.env.PROBE_WHITESPACE = "   ";
  assert.deepEqual(missing(["PROBE_SET", "PROBE_UNSET", "PROBE_WHITESPACE"]), [
    "PROBE_UNSET",
    "PROBE_WHITESPACE",
  ]);
  console.log("check-smoke-env: self-test PASS (set / unset / whitespace-only)");
  process.exit(0);
}

const missingPublic = missing(PUBLIC_ENV);
const missingCredentials = missing(CREDENTIALS);

console.log("E2E smoke environment preflight (values are never printed):");
for (const name of [...PUBLIC_ENV, ...CREDENTIALS]) {
  console.log(`  ${(process.env[name] ?? "").trim() ? "ok     " : "MISSING"} ${name}`);
}

for (const name of missingPublic) {
  console.log(`::error::Missing required repo secret ${name} — the app cannot boot without it.`);
}
for (const name of missingCredentials) {
  console.log(`::warning::Missing repo secret ${name} — the corresponding sign-in smoke test will be skipped.`);
}

if (missingPublic.length) {
  console.error(
    `\nAdd these secrets in GitHub → Settings → Secrets and variables → Actions: ${missingPublic.join(", ")}`,
  );
  process.exit(1);
}
if (STRICT && missingCredentials.length) {
  console.error(`\n--strict: missing credentials: ${missingCredentials.join(", ")}`);
  process.exit(1);
}

console.log(
  missingCredentials.length
    ? `\nPreflight OK for boot; ${missingCredentials.length} credential(s) absent — auth tests will skip.`
    : "\nPreflight OK — all E2E secrets present.",
);
