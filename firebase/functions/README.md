# Firebase Cloud Functions — deploy note

## Firebase approval bot (Supabase→Firebase auth migration)

- `src/jobs/approvePendingProfiles.ts` — every run finds Firestore `profiles`
  with `access_status == "PENDING"` whose `created_at` is at least 300 s
  (5 min) old and sets `access_status: "ACTIVE"`.
- Exported from `src/index.ts`:
  - `approvalBotTick` — Cloud Scheduler (`every 1 minutes`), the primary trigger.
  - `approvalBotRunNow` — HTTPS manual/health trigger (POST; guarded by the
    `ACCESS_BOT_RUN_KEY` param + `x-access-bot-key` header when set).
- Safe to run repeatedly: only `PENDING` docs are written (a transaction
  re-checks status first), missing/unparseable `created_at` is logged and
  skipped, and every decision is logged with the profile uid.

## Deploy commands

Run from the `firebase/` directory (project `rn01-af00b`, see `.firebaserc`).
The predeploy hook runs `npm run build` (`tsc`) automatically.

```bash
# All functions (approval bot + existing access bot + credits reset)
firebase deploy --only functions

# Approval bot only
firebase deploy --only functions:approvalBotTick,functions:approvalBotRunNow

# Tail logs after deploy
firebase functions:log
```

Do not run these from inside the agent working tree unless the coordinator
asks for it — deploys are performed by the integrator.
