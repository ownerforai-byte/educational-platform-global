# android-native — Ravikisan Platform (Kotlin + Jetpack Compose)

Native client built under the parallel-delivery mandate in
[`docs/guides/android-native-compose-migration-plan.md`](../docs/guides/android-native-compose-migration-plan.md).

**Status tracker / resume point: [`docs/guides/android-native-STATUS.md`](../docs/guides/android-native-STATUS.md) — read it first.**

- Legacy Play app (`android-twa/android`, Java + WebView) is untouched and stays
  the production artifact until Phase 8 promotion.
- This project installs side-by-side in dev as `com.ravikisan.platform.compose`.

## Build

```bash
cd android-native
JAVA_HOME="C:/Users/ASUS/.bubblewrap/jdk-17" ./gradlew assembleDebug
```

Requires the Android SDK at `C:/Users/ASUS/.bubblewrap/android-sdk` (via `local.properties`).

## Firebase

`app/google-services.json` is generated (not committed):

```bash
npx firebase-tools apps:sdkconfig ANDROID <appId> > app/google-services.json
```

The google-services plugin is applied only when that file exists (same pattern as legacy).
CI never has this file — the `android-native-assemble` workflow builds without FCM.

## Deep links

Registered in `AndroidManifest.xml` + `navigation/DeepLinks`:

- `rn://app` — custom scheme, opens Home.
- `https://harindrasah.com.np/*` — web app links with `autoVerify`. App Links
  verification needs `assetlinks.json` served at
  `https://harindrasah.com.np/.well-known/assetlinks.json` with the release
  SHA-256 fingerprint. Until the site serves it, links may show a disambiguation
  dialog (still functional).

## Play release notes

See [`docs/guides/android-native-play-checklist.md`](../docs/guides/android-native-play-checklist.md)
for the full Phase 8 promotion checklist. Summary:

- Dev builds install side-by-side as `com.ravikisan.platform.compose`; promotion
  flips `applicationId` to `com.ravikisan.platform` with a monotonic `versionCode`
  above the legacy TWA's highest.
- Keystore / `key.properties` / `google-services.json` stay out of git forever.
- Signing is done locally by the owner; CI only assembles debug APKs.

## Layout (plan §4)

```
app/src/main/java/com/ravikisan/platform/compose/
├── RnApp.kt            # @HiltAndroidApp
├── MainActivity.kt     # single-activity Compose host
├── navigation/         # NavHost, typed routes
└── ui/
    ├── screens/        # Home (placeholder), Settings (Phase 1 port)
    └── theme/          # placeholder tokens — replace in UX pass
```
