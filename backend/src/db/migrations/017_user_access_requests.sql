-- 017_user_access_requests.sql
--
-- Timed access-request workflow for Firebase Cloud Functions + FCM.
-- Complements profiles.access_status (PENDING|ACTIVE|REJECTED):
--   pending  → waiting for the auto-approval delay
--   approved → access granted until expires_at
--   expired  → access window closed
--
-- Applied live via Supabase MCP (2026-11-13). Safe to re-run.

create table if not exists public.user_access_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'expired')),
  requested_at timestamptz not null default now(),
  approved_at timestamptz,
  expires_at timestamptz,
  fcm_token text,
  deep_link text not null default '/home/member',
  reminder_sent_at timestamptz,
  guidance_sent_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists user_access_requests_status_requested_idx
  on public.user_access_requests (status, requested_at);

create index if not exists user_access_requests_status_expires_idx
  on public.user_access_requests (status, expires_at);

create index if not exists user_access_requests_user_id_idx
  on public.user_access_requests (user_id, requested_at desc);

create or replace function public.set_user_access_requests_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_user_access_requests_updated_at on public.user_access_requests;
create trigger trg_user_access_requests_updated_at
  before update on public.user_access_requests
  for each row execute function public.set_user_access_requests_updated_at();

alter table public.user_access_requests enable row level security;

grant select, insert, update on public.user_access_requests to authenticated;
grant all on public.user_access_requests to service_role;

drop policy if exists "users read own access requests" on public.user_access_requests;
create policy "users read own access requests"
  on public.user_access_requests
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "users insert own access requests" on public.user_access_requests;
create policy "users insert own access requests"
  on public.user_access_requests
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "users update own fcm token" on public.user_access_requests;
create policy "users update own fcm token"
  on public.user_access_requests
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
