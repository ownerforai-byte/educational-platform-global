-- 005_profile_access_status.sql
--
-- Owner-approval signup flow (owner policy 2026-09-26):
--   * NEW accounts are created PENDING — the user sees a status screen
--     ("account created, awaiting approval") and CANNOT log in until the
--     owner grants access from the owner panel.
--   * EXISTING accounts are all ACTIVE — nobody loses access.
--   * The owner may also mark an account REJECTED (login stays blocked and
--     the status screen reports it).
--
-- access_status: PENDING | ACTIVE | REJECTED
-- The column DEFAULT is what makes every new signup pending, whatever
-- mechanism inserts the profile row (auth hook/trigger/backend).
--
-- Applied to the live project via the Supabase Management API on 2026-09-26.
-- Run once in the Supabase SQL editor if provisioning a fresh project.

alter table public.profiles
  add column if not exists access_status text not null default 'ACTIVE';

-- Every profile that exists right now predates the approval flow → ACTIVE.
update public.profiles set access_status = 'ACTIVE' where access_status is null;

-- Future inserts (new signups) default to PENDING…
alter table public.profiles
  alter column access_status set default 'PENDING';

alter table public.profiles
  add constraint access_status_valid
  check (access_status in ('PENDING', 'ACTIVE', 'REJECTED'));

create index if not exists profiles_access_status_idx on public.profiles (access_status);
