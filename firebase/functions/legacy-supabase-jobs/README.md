# Legacy Supabase Postgres Cloud Functions (not deployed)

These files implemented `accessBotTick`, `accessBotRunNow`, and
`creditsDailyReset` against Supabase Postgres + FCM. They are **archived** here
because the platform direction keeps Supabase for **storage only**; profile
access approval runs on Firestore via `approvalBot*` in `src/index.ts`.

Do not move this folder back into `src/` without an explicit product decision.
Daily credits refill remains on the Render API (`ensureDailyCredits` lazy path).