# Verner Firebase (free-tier / Spark)

Project: **rn01** (`rn01-af00b`) · Web app: `ravikisan.vercel.app`

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

## Backend env (Render)

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
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=rn01-af00b.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=rn01-af00b
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=rn01-af00b.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=906118704805
NEXT_PUBLIC_FIREBASE_APP_ID=1:906118704805:web:3f5d4efee58a246bb7e74c
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-MYB98RBWSH
# VAPID from Console → Project settings → Cloud Messaging → Web Push certificates
NEXT_PUBLIC_FIREBASE_VAPID_KEY=
```

## Access bot (Cloud Functions + FCM)

See functions under `firebase/functions/`. Deploy when ready:

```bash
cd firebase
npx -y firebase-tools@latest deploy --only functions
```

Set secrets `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` for the scheduler.
