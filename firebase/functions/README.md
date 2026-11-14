# Firebase Cloud Functions — deploy note

## What ships from this bundle

Only the **Firestore approval bot** is exported and deployed:

- `src/jobs/approvePendingProfiles.ts` — each run finds Firestore `profiles`
  with `access_status == "PENDING"` whose `created_at` is at least 300 s
  (5 min) old and sets `access_status: "ACTIVE"`.
- Exported from `src/index.ts`:
  - `approvalBotTick` — Cloud Scheduler (`every 1 minutes`), primary trigger.
  - `approvalBotRunNow` — HTTPS manual/health trigger (POST; guarded by
    `ACCESS_BOT_RUN_KEY` + `x-access-bot-key` when set).

**Supabase** is storage-only for the product direction. The older Supabase
Postgres jobs (`accessBot*`, `creditsDailyReset`) are kept under
`legacy-supabase-jobs/` for reference only — they are **not** compiled or
deployed. Platform auth/profiles live on Firebase/Firestore; daily credits
safety net remains `ensureDailyCredits` on the Render API (see backend).

## Deploy commands

Run from the `firebase/` directory (project `rn01-af00b`, see `.firebaserc`).
The predeploy hook runs `npm run build` (`tsc`) automatically.

```bash
# Approval bot only (recommended)
firebase deploy --only functions:approvalBotTick,functions:approvalBotRunNow

# Same as targeting both exports explicitly
firebase deploy --only functions

# Tail logs after deploy
firebase functions:log
```

### Remove stale remote functions (one-time)

If `accessBotTick`, `accessBotRunNow`, or `creditsDailyReset` still exist in
the Firebase console from an earlier deploy, delete them after the trim:

```bash
firebase functions:delete accessBotTick accessBotRunNow creditsDailyReset --force
```

No Supabase secrets are required for the approval bot. Optional param:
`ACCESS_BOT_RUN_KEY` for manual run endpoints.

Do not run deploys from an agent working tree unless the coordinator asks —
production deploys are performed by the integrator.