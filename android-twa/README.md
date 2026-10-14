# Android TWA Build — Ravikisan's Platform

This folder wraps the live PWA (`https://ravikisan.vercel.app`) into a native
Android **Trusted Web Activity (TWA)** app using Google's **Bubblewrap**.
The result is a Play-ready `.aab` that you upload to Play Console.

> A TWA is the Play-recommended way to ship a PWA: it's small, updates with
> your site, gets badging/guaranteed-installed, and works offline. The PWA
> already has the required `manifest.json`, icons, and a service worker.

## 1) One-time prerequisites

- **Node.js 18+** (you have Node 24 — fine)
- **Android Studio** (or at least):
  - Android SDK (`ANDROID_HOME` / `ANDROID_SDK_ROOT`)
  - A JDK 17
  - Accept the Android licenses (`sdkmanager --licenses`)
- Open **android-twa/** and run:

```bash
npm install
```

## 2) Generate the Android project

Run this in `android-twa/` (copy-paste):

```bash
npm run init
```

It will ask two questions:
- **"Do you want Bubblewrap to install the JDK?"** → answer **`n`** (you'll use your
  own JDK 17 from Android Studio), or **`y`** if you'd rather it download a
  portable JDK (large, slow first time).
- **"Path to your existing JDK 17"** → type the path, e.g.
  `C:\Program Files\Java\jdk-17` or your Android Studio JDK
  (`...\Android\jbr` / `...\Android Studio\jbr`).

Bubblewrap will:
- Pull `https://ravikisan.vercel.app/manifest.json`
- Download the 192/512 icons (from `/icon-192.png`, `/icon-512.png`)
- Scaffold `MainActivity`, `AndroidManifest.xml`, Gradle files, and assets

> If icon download fails, verify the two PNGs are reachable at
> `https://ravikisan.vercel.app/icon-512.png` and `/icon-192.png`.

## 3) Build

```bash
# Debug APK (quick local test on a device)
npm run dev

# Unsigned AAB (for you to sign, or to let Play App Signing handle it)
npm run build:unsigned
```

For Play Console, use **Play App Signing** and create a private upload key
locally. Keep the keystore and its password out of source control; configure
them only in your local Bubblewrap setup or a private CI secret store. Generated
AABs and keystores are ignored by git.

## 4) Test on a device

```bash
npm run serve        # starts a local server + QR + sideload
```

Open https://ravikisan.vercel.app on your phone, accept "Install app?", and
the TWA sideloads.

## 5) Package config

`bubblewrap.json` (checked in) locks the app's identity:

| Field | Value |
|---|---|
| `package` | `com.ravikisan.platform` |
| `name` | Ravikisan's Platform |
| `url` | `https://ravikisan.vercel.app` |
| `manifestPath` | `https://ravikisan.vercel.app/manifest.json` |
| `minSdk` | 30 (Android 11) — Play minimum for new apps is now higher; see below |
| `targetSdk` | 36 (Gradle property `twaTargetSdk`) |

> ⚠️ **Play target/minimum SDK:** Google periodically raises the required
> `targetSdk` for new Play submissions (set to **36** here). The Android
> build pins this using `twaTargetSdk` in `android/gradle.properties` because
> Bubblewrap's interactive `init` does not offer a target-SDK flag. Check Play's
> "Target API level" policy page before each submission.

## 6) Privacy / policy URLs

Play requires the privacy policy URL. Point it at your hosted page:
- `https://ravikisan.vercel.app/legal/privacy`
- Terms: `https://ravikisan.vercel.app/legal/terms`

Make sure the **live site** is stable before submitting — Play reviewers
open the TWA and it loads this site.

## 7) Submit to Play

1. Play Console → **Create app** → name + language
2. App content → screenshots, store listing (`../play-store/app-listing.md`)
3. Policies → link Privacy/Terms, complete **Data Safety**
   (`../play-store/data-safety.md`), answer **Content Rating**
   (`../play-store/content-rating.md`)
4. Testers (optional internal track) → upload the `.aab` to a track
5. Submit for review

---

## Troubleshooting
- **`init` hangs on icon download** → your site's `/icon-512.png` or
  `/icon-192.png` isn't reachable, or the manifest `icons` array doesn't list
  them. Check `frontend/public/manifest.json`.
- **Manifest warnings** → make sure `manifest.json` has `name`, `start_url`,
  `display: "standalone"`, `icons` (192 + 512), and `theme_color`. It does.
- **Offline not working** → the PWA service worker (`sw.js`) must be
  reachable at `/sw.js`; it is (served from `frontend/public`).
- **Build fails: no Android SDK** → install Android Studio / set
  `ANDROID_HOME` and configure JDK 17 before generating a release build.
