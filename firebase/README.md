# Verner Firebase (free-tier / Spark)

Project: **rn01** (`rn01-af00b`) · Web app: `harindrasah.com.np`

## Free-tier three lanes

| Tier | Provider | Free plan | Use |
|---|---|---|---|
| 1 | Supabase Postgres | Free | Relational CRUD (profiles, journey, scores…) |
| 2 | **Firebase Firestore** | Spark | FCM tokens, notification logs, access sessions |
| 3 | **Cloudflare R2** | 10GB free | **All** binaries (PDF, images, AV, uploads) |

### Why not Firebase Storage on free tier?

New Firebase projects require a **Blaze** upgrade to create Storage. Spark cannot host Storage buckets. This repo defaults to:

- `FIREBASE_STORAGE_ENABLED` unset/false → every file upload goes to **R2**
- Firestore stays on Spark for realtime-ish docs
- Set `FIREBASE_STORAGE_ENABLED=true` only after you voluntarily move to Blaze

## Already done on `rn01-af00b`

- Firestore `(default)` database in `asia-south1`
- Firestore security rules deployed (`firestore.rules`)
- Storage rules file ready (`storage.rules`) — deploy after Blaze if ever needed

## Backend env (Cloud Functions / backend)

```bash
# Tier 2 — Firestore via Admin SDK (create a service account key in GCP IAM)
FIREBASE_PROJECT_ID=rn01-af00b
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
# or: FIREBASE_SERVICE_ACCOUNT_JSON={...}

# Leave unset on Spark free tier:
# FIREBASE_STORAGE_ENABLED=false

# Tier 3 — R2 (required for uploads on free tier)
R2_ACCOUNT_ID=
R2_BUCKET=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_PUBLIC_BASE_URL=
```

## Frontend env (Vercel) — public web config

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBGJm9-JoDwSGp7VAyc_rlsIo6R8NUOO5g
# Auth handler domain — your own domain, NOT the default rn01-af00b.firebaseapp.com.
# See "Custom domain instead of *.firebaseapp.com" below before switching.
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=auth.harindrasah.com.np
NEXT_PUBLIC_FIREBASE_PROJECT_ID=rn01-af00b
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=rn01-af00b.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=906118704805
NEXT_PUBLIC_FIREBASE_APP_ID=1:906118704805:web:3f5d4efee58a246bb7e74c
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-MYB98RBWSH
# VAPID (public) — CLI cannot export this; use Console or sync from Vercel:
#   cd frontend && vercel env pull .env.local --yes
# Console → Project settings → Cloud Messaging → Web Push certificates
NEXT_PUBLIC_FIREBASE_VAPID_KEY=
```

## Custom domain instead of `*.firebaseapp.com`

Google sign-in popups/redirects and Firebase email action links are served from
`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` (default: `rn01-af00b.firebaseapp.com`).
To show `harindrasah.com.np` instead — apex/www stays on Vercel, so use a
dedicated subdomain for Firebase:

1. **Firebase Console → Hosting → Add custom domain** →
   `auth.harindrasah.com.np`. Add the DNS record Firebase prints
   (a `CNAME` → `rn01-af00b.web.app`). Firebase Hosting then serves the auth
   handler on it automatically (`/__/auth/handler`, `/__/auth/action`) —
   no `firebase.json` change needed, works on the Spark plan.
2. **Firebase Console → Authentication → Settings → Authorized domains** →
   Add domain `auth.harindrasah.com.np` (required for OAuth redirects).
3. Set `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=auth.harindrasah.com.np` in Vercel
   env **and** `frontend/.env.local`, then redeploy the frontend.

Notes:

- Email/password sign-in is unaffected; only Google popup/redirect and Firebase
  email action links use this domain.
- Password-reset / verification emails open Firebase's action URL first, then
  land on the `continueUrl` passed by the backend (already wired in
  `backend/src/auth/firebase-admin-auth.ts`), so users end up on your domain.
- Want `harindrasah.com.np` instead of `auth.`? That means pointing the
  apex/www DNS at Firebase Hosting, which would take the site away from Vercel —
  only do that if you intend to serve the app from Firebase Hosting.
- **Until Hosting is live:** keep `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=rn01-af00b.firebaseapp.com`
  (Vercel production/dev already use this). `auth.harindrasah.com.np` currently resolves to
  Vercel, not Firebase — OAuth breaks if you point `authDomain` there without step 1.

### Local env cheat sheet

From the **repo root** (works on Windows PowerShell 5 — uses npm’s shell, not `&&` in PS):

```bash
npm run firebase:refresh-local     # env:web + verify-env + sdkconfig (prints JSON)
npm run firebase:pull-vercel-env # VAPID + NEXT_PUBLIC_* → frontend/.env.local
```

PowerShell 5 does **not** support `&&`. Use `;` between commands, or the npm scripts above:

```powershell
cd C:\Users\ASUS\Desktop\rn
npm run firebase:refresh-local
npm run firebase:pull-vercel-env
```

Bash / PowerShell 7+:

```bash
cd firebase && npm run sdkconfig:web
cd firebase && npm run env:web
cd firebase && npm run env:pull-frontend
npm run firebase:verify-env
```

## Approval bot (Cloud Functions — Firestore only)

Supabase is **storage-only** for files/buckets; access automation on Firebase
uses Firestore `profiles` (PENDING → ACTIVE after 5 min). See
`firebase/functions/README.md`.

```bash
cd firebase
npx -y firebase-tools@latest deploy --only functions:approvalBotTick,functions:approvalBotRunNow
```

No Supabase secrets are required for this deploy. Delete legacy remote functions
`accessBotTick`, `accessBotRunNow`, and `creditsDailyReset` if they still exist
from older bundles.

## Realtime chat (Firestore client)

- UI: Community → **Chat** (`/ai/community/chat`) — signed-in lobby (`realtime_chats/{roomId}/messages`)
- Rules: `firebase/firestore.rules` (deploy below)
- Auth: Email/Password, Google (phone identity removed 2026-11-16 — SMS OTP remains only as the enrolled-user MFA second factor) via `frontend/lib/firebase/client-auth.ts`
- Enable Phone: `npm run firebase:enable-phone` (adds test `+9779800000000` → `123456`)

**Phone identity removed (2026-11-16)** — the phone sign-in/sign-up panel is gone from `/login` and `/signup`. Phone numbers are collected only during MFA enrollment (`MfaSmsPanel`); existing `phone+…@phone.signin.harindrasah.com.np` accounts still work at the API level (backend maps the phone to that synthetic email before profile lookup).

**MFA SMS prerequisites (staging or prod)**:

1. Vercel: `NEXT_PUBLIC_USE_FIREBASE_AUTH=true` and all `NEXT_PUBLIC_FIREBASE_*` keys for `rn01-af00b`.
2. Backend API: `USE_FIREBASE_AUTH=true` plus Firebase Admin credentials (`FIREBASE_PROJECT_ID`, service account JSON / individual fields — or none on Cloud Functions, where ADC supplies them).
3. Firebase Console → Authentication → Phone **enabled** (needed for MFA OTP delivery); authorized domains include your site origin and `rn01-af00b.firebaseapp.com`.

```bash
cd firebase
npx -y firebase-tools@latest deploy --only firestore:rules,firestore:indexes,auth
```
