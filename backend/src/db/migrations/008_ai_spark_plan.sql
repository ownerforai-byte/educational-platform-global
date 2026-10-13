-- 008_ai_spark_plan.sql
--
-- Membership plan tier behind the AI-spark daily allowance (owner 2026-10-13):
-- "restrict the ai spark to 1 for public, 7 for member and unlimited for
-- owner … create for plus and pro member also like 25 and 50".
--
--   plan = 'member' → 7 Veer messages / UTC day
--   plan = 'plus'   → 25 Veer messages / UTC day
--   plan = 'pro'    → 50 Veer messages / UTC day
--   owner allowlist → unlimited (never counted; see utils/aiSpark.ts)
--
-- Existing PRO accounts (premium_status = true) are backfilled to 'pro' —
-- the legacy flag still maps to the pro tier in code (utils/aiSpark.ts) so an
-- un-migrated environment degrades to the same behavior.
--
-- Apply on the live project the same way as 006:
--   cd backend && node scripts/run-sql.mjs src/db/migrations/008_ai_spark_plan.sql
-- Idempotent — every statement below is safe to re-run.

alter table public.profiles
  add column if not exists plan text not null default 'member';

-- Legacy PRO accounts become the pro tier.
update public.profiles
  set plan = 'pro'
  where premium_status = true and plan = 'member';

-- Guarded CHECK (add constraint has no IF NOT EXISTS).
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'profiles_plan_check'
  ) then
    alter table public.profiles
      add constraint profiles_plan_check check (plan in ('member', 'plus', 'pro'));
  end if;
end $$;
