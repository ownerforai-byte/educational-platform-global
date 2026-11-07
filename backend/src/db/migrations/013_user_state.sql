-- 013_user_state.sql
--
-- Account-backed user state (2026-11-07, approved by the owner as part of the
-- "finish everything remaining" instruction). Until now every personal store
-- (notes, SRS, goals, streaks, lab progress) lived in localStorage only, so a
-- reinstall, a cleared browser, or switching between web and the Android TWA
-- lost the student's work.
--
-- One row per (user, namespace). The payload is an opaque JSON document owned
-- by that namespace's client store; the server validates shape/size but never
-- interprets it. `version` is an optimistic-concurrency counter: a client MUST
-- send the version it last read as baseVersion, and a stale write gets 409.
--
-- Apply through the Supabase Management API:
--   cd backend && node scripts/run-sql.mjs src/db/migrations/013_user_state.sql
-- Idempotent — every statement below is safe to re-run.

create table if not exists public.user_state (
  user_id    uuid not null references auth.users (id) on delete cascade,
  namespace  text not null check (namespace ~ '^[a-z0-9_-]{1,64}$'),
  payload    jsonb not null default '{}'::jsonb,
  version    bigint not null default 1,
  updated_at timestamptz not null default now(),
  primary key (user_id, namespace),
  -- 256 KB ceiling per namespace: keeps the free-tier table bounded and stops
  -- a malformed client from pushing an unbounded blob.
  constraint user_state_payload_size check (octet_length(payload::text) <= 262144)
);

alter table public.user_state enable row level security;

-- The API writes with the service role (bypasses RLS) and ALWAYS scopes by the
-- session-derived user id. These policies protect any anon/authenticated-key
-- access, so no account can read or overwrite another account's state.
drop policy if exists user_state_select on public.user_state;
create policy user_state_select on public.user_state
  for select using (user_id = auth.uid());

drop policy if exists user_state_insert on public.user_state;
create policy user_state_insert on public.user_state
  for insert with check (user_id = auth.uid());

drop policy if exists user_state_update on public.user_state;
create policy user_state_update on public.user_state
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists user_state_delete on public.user_state;
create policy user_state_delete on public.user_state
  for delete using (user_id = auth.uid());
