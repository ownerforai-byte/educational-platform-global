-- 003_daily_credits_reset.sql
--
-- Daily credit pool for every logged user (owner policy 2026-09-26):
--   * 1 credit spent per AI chat message
--   * every user's credits reset to 8 at 12:00 AM (UTC day rollover)
--
-- The backend enforces the policy lazily (per-user on first AI call of the
-- day, see backend/src/utils/credits.ts) AND eagerly (midnight cron job,
-- see backend/src/jobs/creditsResetJob.ts). This column is the watermark:
-- credits_reset_date = the UTC date the current credit pool belongs to.
--
-- Applied to the live project via the Supabase Management API on 2026-09-26:
--   alter table public.profiles add column if not exists credits_reset_date date;
--   create index if not exists profiles_credits_reset_idx on public.profiles (credits_reset_date);
--
-- Run once in the Supabase SQL editor if provisioning a fresh project.

alter table public.profiles add column if not exists credits_reset_date date;
create index if not exists profiles_credits_reset_idx on public.profiles (credits_reset_date);
