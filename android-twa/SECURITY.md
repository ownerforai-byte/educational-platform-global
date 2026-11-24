# Android app security (data-at-rest & in-transit)

This APK stores **session tokens**, **profile/feed offline cache**, and **FCM registration**. The controls below reduce extraction after install (ADB backup, MITM, screenshots, plaintext disk).

## Data at rest

| Asset | Protection |
|-------|------------|
| Access token + user JSON | `EncryptedSharedPreferences` (AES-256-GCM via Android Keystore). **No plaintext fallback.** |
| Offline API cache (Room) | JSON sealed with `FieldCipher` (AES-256-GCM, Keystore-backed key `rn_offline_cache_v1`). |
| Sign-out | Clears encrypted prefs **and** wipes Room cache. |
| Upgrade from older builds | One-time bootstrap clears legacy plaintext cache (`SecureStorageBootstrap`). |
| Cloud/device backup | `android:allowBackup="false"`, `fullBackupContent="false"`, `data_extraction_rules` exclude all domains. |

## Data in transit

- HTTPS only (`cleartextTrafficPermitted="false"`).
- Release builds trust **system CAs only** — user-installed MITM certs (Charles, etc.) cannot intercept traffic.
- `debug-overrides` restores user CAs for local debugging.

## UI / surface

- `FLAG_SECURE` on **Login** and **Main** — blocks screenshots, screen recorders, and sensitive recents thumbnails.
- Login password field cleared when the activity stops.
- Release builds disable WebView remote debugging.

## Binary

- R8 minify + resource shrink in release; ProGuard keeps only Room entities, FCM service, and Firebase stubs (app code is obfuscated).

## Network client (mirrors web API hardening)

- `User-Agent: RavikisanAndroid/…` and `X-Rn-Client: android-native` identify the official app.
- No redirect follows except same-origin `/api/*` paths on `harindrasah.com.np`.
- Response bodies capped at **2 MB**; login/JSON errors truncated before display.
- **401/403** on authenticated calls → wipe encrypted session + cache and return to login (stops dead-token sync loops).
- Push/deep links sanitized (`SecureDeepLink`) — no `..`, schemes, or off-site URLs in `MainActivity` intents.
- WorkManager sync capped at **4 attempts**; foreground sync is **deduped** (`KEEP` unique work).

## Hardcoded trust (owner + Play)

| Control | Where |
|---------|--------|
| **Play signing keys** | `SecurityContract.OFFICIAL_SIGNING_CERT_SHA256` (= `.well-known/assetlinks.json` / CI) — unofficial APKs blocked at launch; **one wrong hex digit in assetlinks breaks App Links** (Chrome opens the site instead of the APK) |
| **API attestation** | Every native request sends `X-Rn-Client` + `X-Rn-Signing-Cert`; backend rejects unknown certs (`native-android-security.ts`) |
| **TLS pinning** | `network_security_config.xml` + `security/tls-pins.json` (leaf + ISRG + Google Trust R4 backup, expires 2027-12-31) |
| **Push** | Native FCM tray + 3 channels; deep links open `WebHostFragment` on the same route as web; web FCM skipped when `__RN_NATIVE_ANDROID__` |
| **Root / emulator** | Blocked in **release** for member accounts; **only** `sahrocky81@gmail.com` may continue (matches web `OWNER_EMAIL`) |
| **Owner email** | Hardcoded in `SecurityContract` — not configurable from the APK UI |

## Limits (honest)

- A **rooted** device or **physical** access with unlocked bootloader can still attack any mobile app (memory dumps, hooks). We do not claim absolute immunity.
- Certificate **pinning** is not enabled, to avoid breaking production when Vercel/Cloudflare rotates certs. System-CA-only trust is the balance.

## Build

```bash
cd android-twa/android
./gradlew bundleRelease
```

Requires `key.properties` + `google-services.json` (local, gitignored). Bump `versionCode` when shipping a security fix.