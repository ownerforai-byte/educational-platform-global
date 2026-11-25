# Runbook: Frontend deploy

**Primary target:** Firebase App Hosting (`rn01-af00b`, backend `harindrasah-web`, region `asia-southeast1`).

**Live default URL (after first successful rollout):**  
`https://harindrasah-web--rn01-af00b.asia-southeast1.hosted.app`

**Legacy / cutover:** Vercel project `ravikisan` until Cloudflare points at Firebase.

## App Hosting (Next.js SSR monorepo)

Config: repo root `firebase.json` (`rootDir: frontend`), `frontend/apphosting.yaml`.

Env: pull production from Vercel when needed:

```bash
cd frontend && vercel env pull .env.production.local --environment=production --yes
```

Prefer Firebase Console env overrides for secrets; `apphosting.yaml` lists `NEXT_PUBLIC_*` only.

### Deploy path

1. **GitHub rollouts (recommended)** — the repo is ~270MB+ of `content/`; CLI source zip hits GCS `EntityTooLarge`.
   - [App Hosting console](https://console.firebase.google.com/project/rn01-af00b/apphosting) → `harindrasah-web` → connect `ownerforai-byte/educational-platform-global`, app root **`frontend`**, live branch **`main`**.
   - Push `firebase.json`, `frontend/apphosting.yaml`, and `.firebaserc` (root) on `main`, then:
     ```bash
     npx firebase-tools@15.36.0 apphosting:rollouts:create harindrasah-web --git-branch main --project rn01-af00b
     ```
2. **CLI source** — only if the zipped tree is under the signed-upload cap (unlikely with full curriculum):
   ```bash
   npx firebase-tools@15.36.0 deploy --only apphosting:harindrasah-web --project rn01-af00b
   ```
   Do **not** combine with `--only functions` unless you intend to redeploy backend.

DNS cutover (after smoke on `*.hosted.app`): App Hosting → Custom domains → `harindrasah.com.np` → use records Firebase prints (often CNAME apex/www to the backend `*.hosted.app` host, plus TXT verify).

Auth: add `harindrasah-web--rn01-af00b.asia-southeast1.hosted.app` to Firebase Auth authorized domains before OAuth smoke on the default URL.

## Symptoms

Preview/production build fails; site 500s after promote.

## Checks

1. App Hosting rollout logs — install (`npm ci --workspace=…`) then Next build errors.
2. Confirm `frontend/package.json` / lockfile / `tsconfig` paths for `features/` aliases.
3. Preview URL `/home` and `/login` return 200.

## Fix

- Prefer fixing shims/paths over deleting feature modules.
- Do not force-push `main`.

## Verify

`npm run build:frontend` from repo root; smoke `/home` and `/login` on the hosted.app URL (or custom domain after cutover).
