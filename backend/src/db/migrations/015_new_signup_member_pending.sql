-- Fix: every new account looked like owner.
--
-- Live `profiles.role` was still the legacy enum user_role
-- {STUDENT,TEACHER,ADMIN,OWNER}. The API writes ladder values
-- (member/plus/pro/owner), those updates silently failed, and the
-- default STUDENT (or leftover OWNER rows) normalized to the owner
-- rung. Convert the column to text, demote non-root accounts to
-- PENDING members, and refresh the signup trigger/defaults.
--
-- Safe to re-run.

-- 1) Drop the enum-backed default so we can change the type.
alter table public.profiles alter column role drop default;

-- 2) Convert role to text (ladder vocabulary).
do $$
begin
  if exists (
    select 1
    from pg_attribute a
    join pg_type t on t.oid = a.atttypid
    where a.attrelid = 'public.profiles'::regclass
      and a.attname = 'role'
      and not a.attisdropped
      and t.typtype = 'e'
  ) then
    alter table public.profiles
      alter column role type text using role::text;
  elsif exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'profiles'
      and column_name = 'role'
      and udt_name <> 'text'
  ) then
    alter table public.profiles
      alter column role type text using role::text;
  end if;
end $$;

-- 3) Remap legacy labels → ladder.
update public.profiles
set role = case upper(coalesce(role, ''))
  when 'STUDENT' then 'member'
  when 'TEACHER' then 'member'
  when 'ADMIN' then 'owner'
  when 'OWNER' then 'owner'
  when 'MEMBER' then 'member'
  when 'PLUS' then 'plus'
  when 'PRO' then 'pro'
  else lower(coalesce(role, 'member'))
end;

-- 4) Demote every non-root account that still sits on owner.
--    Root email is the only permanent owner; other owners are
--    re-granted live from the console after this cleanup.
update public.profiles p
set
  role = 'member',
  plan = 'member',
  premium_status = false,
  access_status = 'PENDING'
where lower(coalesce(p.role, '')) = 'owner'
  and p.id not in (
    select u.id from auth.users u where lower(u.email) = 'sahrocky81@gmail.com'
  );

-- 5) Ensure the root owner row is ACTIVE owner.
update public.profiles p
set
  role = 'owner',
  plan = 'pro',
  premium_status = true,
  access_status = 'ACTIVE'
from auth.users u
where p.id = u.id
  and lower(u.email) = 'sahrocky81@gmail.com';

-- 6) Defaults + check constraint for the ladder.
alter table public.profiles
  alter column role set default 'member';

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'profiles' and column_name = 'plan'
  ) then
    execute 'alter table public.profiles alter column plan set default ''member''';
  end if;
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'profiles' and column_name = 'access_status'
  ) then
    execute 'alter table public.profiles alter column access_status set default ''PENDING''';
  end if;
end $$;

alter table public.profiles drop constraint if exists profiles_role_ladder_check;
alter table public.profiles
  add constraint profiles_role_ladder_check
  check (role is null or role in ('member', 'plus', 'pro', 'owner'));

-- 7) Fresh auth.users inserts write PENDING members (never OWNER/STUDENT).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role, plan, access_status, premium_status)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    'member',
    'member',
    'PENDING',
    false
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- 8) Drop the unused legacy enum if nothing references it.
do $$
begin
  if exists (select 1 from pg_type where typname = 'user_role')
     and not exists (
       select 1 from pg_attribute a
       join pg_type t on t.oid = a.atttypid
       where t.typname = 'user_role' and not a.attisdropped
     ) then
    drop type public.user_role;
  end if;
exception when dependent_objects_still_exist then
  null;
end $$;
