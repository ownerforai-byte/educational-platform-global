# Play Store Publishing — Legal & Listing Pack

All the documents you need to publish **Ravikisan's Platform** on Google Play.
Everything was generated from the actual repo (data flow, third-party
providers, cookies, credit/premium system) so it matches reality.

## Folder layout

| File | What it is | Status |
|---|---|---|
| `publishing-checklist.md` | **Start here** — master checklist | ✅ |
| `app-listing.md` | Store listing copy, icons, links | ✅ |
| `privacy-policy.md` | Privacy policy (required Play URL) | ✅ |
| `terms-of-service.md` | Terms of use | ✅ |
| `cookie-policy.md` | Cookie / session policy | ✅ |
| `purchase-refund-policy.md` | Purchase & refund (IAP / premium) | ✅ |
| `data-safety.md` | Play Data Safety answers | ✅ |
| `content-rating.md` | IARC questionnaire answers | ✅ |
| `host/*.html` | **Ready-to-host** versions of the 4 policies | ✅ |

## How to use

1. **Read `publishing-checklist.md`** top to bottom.
2. **Verify the filled-in values** (developer name, address, jurisdiction,
   support site, refund window) in both the `.md` files and the `host/*.html`
   files are correct.
3. **Host the 4 legal pages** from `host/` at stable public URLs, e.g.:
   - `https://ravikisan.vercel.app/privacy-policy`
   - `https://ravikisan.vercel.app/terms`
   - `https://ravikisan.vercel.app/cookie-policy`
   - `https://ravikisan.vercel.app/purchase-refund-policy`

   The HTML files are self-contained (inline CSS, no external deps) — drop
   them into your Next.js frontend as static pages, or host on any static
   host (GitHub Pages, Netlify, Cloudflare Pages). Play requires a
   **publicly reachable URL**, not a PDF.
4. **Build the Android app** (this is a web PWA) — wrap
   `https://ravikisan.vercel.app` with **TWA/Bubblewrap** (recommended) or
   **Capacitor**, sign the `.aab`.
5. **Create the app in Play Console**, fill in every section using the files
   above, attach the hosted URLs, and submit for review.

## Facts these docs are based on (verified in repo)
- **Frontend host:** Vercel — `https://ravikisan.vercel.app`
- **Backend host:** Render — `https://rn01.onrender.com`
- **Data host:** Supabase (auth, PostgreSQL DB, storage, transactional email)
- **AI:** third-party provider chain (LLM + image generation) powering "Veer"
- **Cookies:** `sb-access-token` (~1h) + `sb-refresh-token` (30d), `httpOnly`,
  `Secure` in production, `SameSite=Lax`
- **Auth:** new accounts start **PENDING**, activated by an admin
- **Credits / premium:** daily AI-credit pool; premium = unlimited; failed AI
  actions auto-refund
- **No analytics / ad SDKs** (so Data Safety "Ads" = No)
- **Support email:** ravikisan1814@gmail.com

## ⚠️ Before submitting
- Have a **lawyer review** the 4 policies (they are a starting template, not
  legal advice).
- Make the **live site fully stable** — Play reviewers click through it.
- Keep the **Data Safety answers** (`data-safety.md`) in sync with the
  Privacy Policy; mismatched answers are a common Play rejection reason.
