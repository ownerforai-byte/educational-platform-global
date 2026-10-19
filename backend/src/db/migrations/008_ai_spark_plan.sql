-- 008_ai_spark_plan.sql
--
-- Membership plan tier behind the AI-spark daily allowance (owner 2026-10-13):
-- "restrict the ai spark to 1 for public, 7 for member and unlimited for
-- owner … create for plus and pro member also like 25 and 50".
--
--   plan = 'member'  → 7 Veer messages / UTC day
--   plan = 'plus'    → 25 Veer messages / UTC day
--   plan = 'plus_20'  → 25 Veer messages / UTC day, expires 20 days after activation
--   plan = 'pro'     → 50 Veer messages / UTC day
--   owner allowlist  → unlimited (never counted; see utils/aiSpark.ts)
--
-- plus_20 (owner 2026-10-18 "the plan 30$ for 20 days") is a TEMPORARY pass
-- with the same daily spark as plus, auto-expiring 20 days after activation.
-- `plan_expires_at` is the UTC timestamp; once it is in the past the resolver
-- in utils/aiSpark.ts falls back to 'member' (the count drops, the user is
-- not blocked, they simply see the lower daily cap).
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

alter table public.profiles
  add column if not exists plan_expires_at timestamptz;

alter table public.profiles
  add column if not exists plan_activated_at timestamptz;

-- Legacy PRO accounts become the pro tier.
update public.profiles
  set plan = 'pro'
  where premium_status = true and plan = 'member';

-- Backfill: any row that still says 'plus_20' from a future migration run
-- loses its expired pass and falls back to the regular member allowance.
update public.profiles
  set plan = 'member',
      plan_expires_at = null
  where plan = 'plus_20'
    and plan_expires_at is not null
    and plan_expires_at < now();

-- Guarded CHECK (add constraint has no IF NOT EXISTS).
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'profiles_plan_check'
  ) then
    alter table public.profiles
      add constraint profiles_plan_check
      check (plan in ('member', 'plus', 'plus_20', 'pro'));
  end if;
end $$;
