#!/usr/bin/env node
/**
 * Prints APK signing SHA-256 (colon form) for Play / assetlinks.json.
 * Usage: gradlew signingReport  (then paste RELEASE variant SHA-256)
 * Or keytool -list -v -keystore your.jks -alias your_alias
 */
console.log(`
To verify your SHA-256 is in assetlinks.json:

  cd android-twa/android
  .\\gradlew.bat signingReport

Copy the **SHA-256** line for **release** (or debug if you test locally).
It must match one entry in:
  .well-known/assetlinks.json
  SecurityContract.OFFICIAL_SIGNING_CERT_SHA256
  backend/src/lib/native-android-security.ts

Debug keystores are NOT in the allowlist — use a release-signed APK for
full native API attestation (X-Rn-Client). Debug builds skip attestation headers.
`);