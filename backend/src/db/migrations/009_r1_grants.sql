-- 009_r1_grants.sql
--
-- Owner-granted access to the R1 layer (the daily-life app: activities, plans,
-- journal, habits). R1 is open to the hardcoded owner emails plus any email an
-- owner has granted here. Grants are keyed by EMAIL (pre-signup grants are
-- valid: the email gets R1 the moment an account with it appears).
--
-- Applied to the live project through the Supabase Management API:
--   cd backend && node scripts/run-sql.mjs src/db/migrations/009_r1_grants.sql
-- Idempotent — every statement below is safe to re-run.

create table if not exists public.r1_grants (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  granted_by  uuid references auth.users (id) on delete set null,
  note        text,
  created_at  timestamptz not null default now(),
  revoked_at  timestamptz
);

-- One row per email; re-granting revives the row instead of stacking duplicates.
-- Emails are normalized to lowercase on write (API layer), so a plain unique
-- index is the PostgREST upsert target.
create unique index if not exists r1_grants_email_key
  on public.r1_grants (email);

-- Active-grant lookup on every R1 request (cached app-side, but keep it cheap).
create index if not exists r1_grants_active_idx
  on public.r1_grants (email) where revoked_at is null;

alter table public.r1_grants enable row level security;

-- Service-role-only table (like guest_chat_usage): grants are managed through
-- /api/owner/r1-grants, never by clients.
