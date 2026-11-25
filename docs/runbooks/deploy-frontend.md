# Runbook: Frontend deploy

**Primary target:** Firebase App Hosting (`rn01-af00b`, backend `harindrasah-web`, region `asia-southeast1`).

**Live default URL (after a successful rollout):**  
`https://harindrasah-web--rn01-af00b.asia-southeast1.hosted.app`

**Production URL:** `https://harindrasah.com.np` (Cloudflare DNS → App Hosting custom domain).

## App Hosting (Next.js SSR monorepo)

| Item | Location |
|---|---|
| App Hosting backend | Root `firebase.json` → `apphosting[0].rootDir: frontend` |
| Runtime + env | `frontend/apphosting.yaml` |
| Monorepo build | Root `package.json` script `apphosting:build` (do **not** set a custom `buildCommand` in yaml — that disables the Next.js adapter) |

Env secrets: App Hosting console overrides; git carries `NEXT_PUBLIC_*` only in `apphosting.yaml`.

To copy secrets from a legacy Vercel pull (one-time migration):

```bash
cd frontend && vercel env pull .env.production.local --environment=production --yes
```

Do not commit `.env*`.

### Deploy path

1. **GitHub rollouts (required)** — full repo zip exceeds CLI upload limits (`EntityTooLarge`).
   - [App Hosting console](https://console.firebase.google.com/project/rn01-af00b/apphosting) → `harindrasah-web` → repo `ownerforai-byte/educational-platform-global`, app root **`frontend`**, live branch **`main`**.
   - Push to `main`, then optionally:
     ```bash
     npx firebase-tools@15.36.0 apphosting:rollouts:create harindrasah-web --git-branch main --project rn01-af00b
     ```
2. **CLI source upload** — only for small trees; unlikely with full `content/`.

### Auth (Firebase)

- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=rn01-af00b.firebaseapp.com` in `apphosting.yaml` (recommended with App Hosting — no Standard Hosting auth subdomain).
- Deploy auth config after edits: `cd firebase && npx firebase-tools@latest deploy --only auth`
- Authorized domains and Google redirect URIs: `firebase/firebase.json`

### DNS cutover

App Hosting → Custom domains → `harindrasah.com.np` → apply records in Cloudflare (remove legacy Standard Hosting A/TXT for `199.36.158.100` / `hosting-site=`).

## Symptoms

Preview/production build fails; site 404/500 after rollout; OAuth blocked on new host.

## Checks

1. Rollout / Cloud Build logs — `npm ci --workspace=educational-platform-frontend`, then `next build`.
2. `runConfig.maxInstances` × `cpu` must fit regional Cloud Run CPU quota (currently `10` × `2` vCPU for `asia-southeast1`).
3. Smoke `/home` and `/login` on `hosted.app` then on apex after DNS.

## Fix

- Prefer fixing shims/paths over deleting feature modules.
- Do not force-push `main`.

## Verify

```bash
npm run build:frontend
```

Smoke `/home` and `/login` on the rollout URL and production domain.