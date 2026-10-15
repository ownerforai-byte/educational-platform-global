# Google Play Publishing — Master Checklist

**App:** Ravikisan's Platform · **Date:** 14 October 2026

All documents live in `play-store/` and already have real values filled in
(developer name, address, support email, refund window). Host the pages, then
tick this list before hitting **Create app**.

---

## 0) Prerequisites (do these first)
- [ ] A **Google Play developer account** (one-time $25 fee) —
      https://play.google.com/console
- [ ] A **real, public URL** for every legal page you link in Play
      (see §7). Play requires a URL, not a PDF, for the Privacy Policy.
- [ ] An **Android build** of the PWA (`.aab`), since this is a web app:
      - Recommended: **TWA (Bubblewrap)** or **Capacitor** wrapping
        `https://ravikisan.vercel.app`
      - Or a signed APK/AAB from a native wrapper
- [ ] Your app's **signing key** (Play App Signing will manage it)

## 1) App listing (Play Console → Store presence)
- [ ] App name, short description (≤80), full description (≤4,000)
      → `app-listing.md`
- [ ] Category = Education; sub-category if prompted
- [ ] App icon (512×512), feature graphic (1024×500), screenshots (phone +
      tablet)
- [ ] Website link: `https://ravikisan.vercel.app`
- [ ] "What's new" text for the first release

## 2) Links & contacts
- [ ] Privacy policy URL → **required** (`privacy-policy.md` hosted)
- [ ] Support email: `ravikisan1814@gmail.com`
- [ ] Support website (optional)
- [ ] Purchase/Refund policy URL (only if IAP/subscriptions enabled)

## 3) Data safety
- [ ] Complete the Data Safety form → `data-safety.md`
- [ ] Third parties: Supabase, Vercel, Render, AI provider
- [ ] "Data can be deleted" = Yes
- [ ] Ads = No (unless you add ads)

## 4) Content rating
- [ ] Answer IARC questionnaire → `content-rating.md` (expect Everyone / 10+)

## 5) App content / targets
- [ ] Target SDK = latest (Play requires a recent target for new apps)
- [ ] Minimum SDK per your wrapper (TWA needs API 21+/Capacitor min)
- [ ] App name brand match (developer name vs. app name)
- [ ] Target audience age: 13+

## 6) Policies
- [ ] Privacy Policy ✅ (`privacy-policy.md`)
- [ ] Terms of Service ✅ (`terms-of-service.md`)
- [ ] Cookie Policy ✅ (`cookie-policy.md`)
- [ ] Purchase / Refund Policy ✅ (`purchase-refund-policy.md`)
- [ ] **Lawyer-review** all four before submission (placeholders remain)

## 7) Host the legal pages (required for Play URLs)
- [x] **Already done** — 4 legal pages were added to the Next.js frontend and
      auto-publish on the live site (they deploy with every push to `main`):
      - `https://ravikisan.vercel.app/legal/privacy`
      - `https://ravikisan.vercel.app/legal/terms`
      - `https://ravikisan.vercel.app/legal/cookies`
      - `https://ravikisan.vercel.app/legal/purchases`
- [ ] After the next deploy, open each URL in a browser to confirm 200 + public
      (no login). They are public, never-gated pages.
- [ ] Put these URLs into the Play Console "Privacy policy" / "Website" fields.
      (Self-contained HTML fallback copies also live in `host/*.html` if you
      prefer a static host instead.)

## 8) Before you submit
- [ ] Test the wrapped app on a real Android device (install, login, AI, labs)
- [ ] Confirm the live site is **fully stable** (reviewer will click through)
- [ ] Run `npm run check:all` on `main` (repo gate)
- [ ] Add a **support email** that actually gets monitored (reviewer may test)
- [ ] Re-verify Play's "Data Safety" public section matches `privacy-policy.md`

## 9) After submission
- [ ] Watch for Play reviewer emails (1–3 days typical)
- [ ] Fix any rejection reason, resubmit
- [ ] Set up a **pre-launch / production** track once reviewed

---

## Files in this folder
| File | Purpose |
|---|---|
| `privacy-policy.md` | Privacy policy (required URL) |
| `terms-of-service.md` | Terms of use |
| `cookie-policy.md` | Cookie / session policy |
| `purchase-refund-policy.md` | Purchase & refund (IAP/premium) |
| `data-safety.md` | Play Data Safety answers |
| `content-rating.md` | IARC questionnaire answers |
| `app-listing.md` | Store listing copy, icons, links |
| `publishing-checklist.md` | This checklist |

---

# Play Store Release Checklist

This is the canonical, human-in-the-loop checklist for preparing the
**Ravikisan Android App** (TWA) for Google Play submission.

The current AAB lives at `play-store/ravikisan-platform-release.aab`.

## Pre-flight (still manual)
- [x] Signing keys are on disk and accounted for in `android-twa/` setup docs.
- [x] TWA manifest and PWA manifest are aligned on `com.ravikisan.platform`.
- [x] `frontend/public/.well-known/assetlinks.json` declares the package + fingerprint.
- [x] Mandatory legal pages exist (`/legal/privacy`, `/legal/terms`,
      `/legal/cookies`, `/legal/purchases`) and are linked from the footer.
- [x] Play Store metadata drafts exist locally:
      `play-store/app-listing.md`, `play-store/data-safety.md`,
      `play-store/publishing-checklist.md`.

## Store listing
- [ ] Finalize app title, short description, full description, screenshots, and
      feature graphic per `play-store/app-listing.md`.
- [ ] Confirm category (`Education`) and contact details in Play Console.

## Data safety
- [ ] Review `play-store/data-safety.md` against the actual app behavior before
      publishing.

## AAB upload
- [ ] Upload `play-store/ravikisan-platform-release.aab` to Play Console.
- [ ] Confirm signing config matches the Play Console release key.

## Store validation
- [ ] Deep link verification passes: `assetlinks.json` matches the live site and
      the AAB fingerprint.
- [ ] Universal links / app links open the app from the Play-registered domain.

## Notes
- The current CI assetlinks gate uses a placeholder fingerprint until the real
  release certificate is confirmed against Play Console and the live domain
  verifier.
- Play Console account access is the remaining publisher-side dependency.

