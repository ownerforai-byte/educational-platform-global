# android-native — Play promotion checklist (Phase 8)

Owner-facing checklist for promoting the native app to the existing Play listing.
Do nothing here before owner approval (migration plan §6, Phase 8).

## 1. Identity switch

- [ ] `android-native/app/build.gradle.kts`: `applicationId` → `com.ravikisan.platform`
      (dev id `com.ravikisan.platform.compose` must never ship).
- [ ] `versionCode` set **above** the legacy TWA's highest uploaded code
      (check Play Console → legacy app → App bundle explorer).
- [ ] `versionName` matches the intended release.

## 2. Signing (local only — never in git/CI)

- [ ] Upload keystore exists and is backed up (Play App Signing enabled).
- [ ] `key.properties` present locally, referenced but gitignored.
- [ ] `./gradlew bundleRelease` produces an `.aab` signed with the upload key.
- [ ] SHA-256 fingerprint of the upload key recorded for assetlinks.json.

## 3. Firebase / FCM

- [ ] `google-services.json` for `com.ravikisan.platform` (production app id)
      generated into `app/` before the release build.
- [ ] `POST /api/access-requests/fcm` reachable with the release client headers
      (Agent 3 owns the client side).

## 4. App Links verification

- [ ] `https://harindrasah.com.np/.well-known/assetlinks.json` serves the
      release signing fingerprint (statement list, `get: /.well-known/assetlinks.json`
      allowed in robots).
- [ ] `adb shell pm verify-app-links --re-verify <pkg>` then
      `adb shell pm get-app-links <pkg>` shows `verified` for the web domain.

## 5. Store listing

- [ ] Screenshots (phone + 7" + 10" if tablet layout claims support).
- [ ] Feature graphic 1024×500, icon 512×512.
- [ ] Data safety form answers match actual data flows (auth, FCM token, analytics).
- [ ] Target API level meets current Play policy (targetSdk 36 here).

## 6. Rollout

- [ ] Internal testing track first → closed → production staged (10% → 50% → 100%).
- [ ] Legacy TWA stays published until the native app is stable on production;
      then either unpublish or point both at the same backend (backend is shared).
- [ ] Crash reporting (Firebase Crashlytics or Play vitals) watched for 48h
      before widening the staged rollout.
