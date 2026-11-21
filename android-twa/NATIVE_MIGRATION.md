# Native migration audit — `com.ravikisan.platform`

## Preserve (Play Store continuity)

| Item | Current value | Action |
|------|---------------|--------|
| **applicationId** | `com.ravikisan.platform` | Unchanged |
| **versionCode** | was `10` in Gradle / `11` in `twa-manifest.json` | **12** (`1.0.10`) |
| **Upload signing** | `android/key.properties` + release keystore | Unchanged |
| **FCM** | `google-services.json` (local, gitignored) | Keep; used by native app |
| **Icons / splash assets** | `res/drawable-*`, `mipmap-*` | Keep |

## Remove (TWA / URL launcher)

| Component | Why |
|-----------|-----|
| `androidbrowserhelper` dependency | TWA / Custom Tabs |
| `LauncherActivity` (WebView shell) | Remote site as main UI |
| `DelegationService` | TWA notification delegation |
| `WebViewFallbackActivity`, `FocusActivity`, `NotificationPermissionRequestActivity` | Bubblewrap boilerplate |
| `asset_statements`, `web_manifest_url`, TWA `meta-data` on launcher | Digital Asset Links / PWA |
| `https://harindrasah.com.np` **MAIN** app-link filters | No longer opens website as app |
| `resValue launchUrl` as UI entry | Replaced by `BuildConfig.API_BASE` |

## Add (standalone native)

| Layer | Implementation |
|-------|----------------|
| **UI** | `SplashActivity` → `LoginActivity` / `MainActivity` + bottom nav (Home, Learn, Search, Profile, Settings) |
| **API** | OkHttp → `https://harindrasah.com.np/api` (auth, profile, community feed) |
| **Offline** | Room `app_cache` table + last-sync timestamps |
| **Sync** | WorkManager periodic refresh when online |
| **FCM** | `RnPushMessagingService` → tray + deep link into `MainActivity`; register on login; revoke on logout |
| **Permissions** | `INTERNET`, `ACCESS_NETWORK_STATE`, `POST_NOTIFICATIONS` |

## Backend (already in repo)

- Auth: `/api/auth/login`, `/api/auth/me`, `/api/auth/logout`
- FCM register: `POST /api/access-requests/fcm`
- FCM revoke: `DELETE /api/access-requests/fcm` (added with native app)
- Push send: Firebase Admin via `backend/src/storage/adapters/fcm.ts` + `sendNotification()`

## Make it work locally (checklist)

1. Copy Firebase **Android** config → `android/app/google-services.json` (same project as web; package `com.ravikisan.platform`).
2. Copy Play upload keystore settings → `android/key.properties` (see README).
3. Install **JDK 17** and set `JAVA_HOME` (Android Studio → `jbr` folder).
4. Build debug APK: `cd android-twa/android && gradlew.bat assembleDebug`
5. Sign in with the same email/password as the website (Firebase Auth → API session).

## Build release AAB (local)

```bash
cd android-twa/android
# Requires android/key.properties + google-services.json
./gradlew bundleRelease
# Output: app/build/outputs/bundle/release/app-release.aab
```

## Phase 2 (follow-up, not in this scaffold)

- Parity for all study routes (notes, labs, PYQs) as native WebViews **per screen** or fully native lists
- OAuth Google Sign-In native SDK
- Certificate pinning optional hardening