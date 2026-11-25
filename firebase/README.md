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

## Frontend env (App Hosting) — public web config

Production values live in `frontend/apphosting.yaml` (and App Hosting console overrides).
Local dev: `frontend/.env.local` from `frontend/.env.example`.

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=…
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=rn01-af00b.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=rn01-af00b
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=rn01-af00b.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=906118704805
NEXT_PUBLIC_FIREBASE_APP_ID=1:906118704805:web:3f5d4efee58a246bb7e74c
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-MYB98RBWSH
NEXT_PUBLIC_SITE_URL=https://harindrasah.com.np
# VAPID — Console → Project settings → Cloud Messaging → Web Push certificates
NEXT_PUBLIC_FIREBASE_VAPID_KEY=…
```

## Firebase Auth with App Hosting (recommended)

- **Site:** Next.js on **Firebase App Hosting** (`harindrasah-web`), custom domain `harindrasah.com.np`.
- **`authDomain`:** keep **`rn01-af00b.firebaseapp.com`**. Google/email action handlers
  use Firebase’s hosted `__/auth/*` endpoints on that domain — you do **not** need
  legacy **Standard Firebase Hosting** (`*.web.app`, `199.36.158.100`, or
  `auth.harindrasah.com.np` CNAME to `web.app`).
- **Authorized domains:** apex + `*.hosted.app` rollout URL + `localhost` (see
  `firebase/firebase.json`; deploy with `deploy --only auth`).
- **Google OAuth (GCP):** ensure authorized JavaScript origins and redirect URIs include
  `https://harindrasah.com.np` and `https://rn01-af00b.firebaseapp.com/__/auth/handler`.

### Local env cheat sheet

From the **repo root** (works on Windows PowerShell 5 — uses npm’s shell, not `&&` in PS):

```bash
npm run firebase:refresh-local     # env:web + verify-env + sdkconfig (prints JSON)
npm run firebase:pull-vercel-env # optional one-time VAPID + NEXT_PUBLIC_* → frontend/.env.local
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

1. App Hosting: `NEXT_PUBLIC_USE_FIREBASE_AUTH=true` and all `NEXT_PUBLIC_FIREBASE_*` keys for `rn01-af00b`.
2. Backend API: `USE_FIREBASE_AUTH=true` plus Firebase Admin credentials (`FIREBASE_PROJECT_ID`, service account JSON / individual fields — or none on Cloud Functions, where ADC supplies them).
3. Firebase Console → Authentication → Phone **enabled** (needed for MFA OTP delivery); authorized domains include your site origin and `rn01-af00b.firebaseapp.com`.

```bash
cd firebase
npx -y firebase-tools@latest deploy --only firestore:rules,firestore:indexes,auth
```
