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

## Limits (honest)

- A **rooted** device or **physical** access with unlocked bootloader can still attack any mobile app (memory dumps, hooks). We do not claim absolute immunity.
- Certificate **pinning** is not enabled, to avoid breaking production when Vercel/Cloudflare rotates certs. System-CA-only trust is the balance.

## Build

```bash
cd android-twa/android
./gradlew bundleRelease
```

Requires `key.properties` + `google-services.json` (local, gitignored). Bump `versionCode` when shipping a security fix.