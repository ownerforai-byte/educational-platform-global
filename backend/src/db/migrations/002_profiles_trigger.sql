-- Auto-create a `profiles` row for every new auth user.
--
-- Why: the backend resolves roles/credits/premium from `profiles` keyed by the
-- auth user id. Without this trigger, every fresh signup had no profile —
-- roles came back null and per-user features started from a broken state.
-- Installed in the live project via the Management API on 2026-09-24
-- (profiles were also backfilled for existing auth users missing one).
--
-- Run once in the Supabase SQL editor (service-role credentials cannot run DDL):
--   psql "$DATABASE_URL" -f backend/src/db/migrations/002_profiles_trigger.sql

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- One-time backfill for users created before the trigger existed:
-- insert into public.profiles (id, full_name)
--   select u.id, u.raw_user_meta_data->>'full_name'
--   from auth.users u
--   where not exists (select 1 from public.profiles p where p.id = u.id)
--   on conflict (id) do nothing;
