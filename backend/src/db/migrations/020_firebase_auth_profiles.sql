-- 020_firebase_auth_profiles.sql — Firebase Auth identity + profile cleanup
-- Idempotent notes; apply with backend/scripts/migrate.mjs against Supabase Postgres.
--
-- Identity model after cutover:
--   profiles.id = Firebase UID (text). Supabase auth.users is no longer the
--   source of truth; `handle_new_user` on auth.users is deprecated.
--   First-login profile rows are created by the Express API (ensureAuthProfile).

-- ── Deprecate Supabase-auth profile trigger ───────────────────────────────────
drop trigger if exists on_auth_user_created on auth.users;

comment on function public.handle_new_user() is
  'DEPRECATED (020): Supabase Auth signup trigger — profiles are created on Firebase first login via API.';

-- ── Relax FK to auth.users so Firebase string UIDs can be stored ─────────────
-- profiles.id may already be uuid; cast to text for Firebase ids (28-char strings).
alter table public.profiles drop constraint if exists profiles_id_fkey;

do $$
begin
  if to_regclass('public.profile_follows') is not null then
    alter table public.profile_follows drop constraint if exists profile_follows_follower_id_fkey;
    alter table public.profile_follows drop constraint if exists profile_follows_following_id_fkey;
  end if;
  if to_regclass('public.storage_objects') is not null then
    alter table public.storage_objects drop constraint if exists storage_objects_owner_id_fkey;
  end if;
end $$;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'profiles'
      and column_name = 'id'
      and udt_name = 'uuid'
  ) then
    alter table public.profiles alter column id type text using id::text;
  end if;
end $$;

do $$
begin
  if to_regclass('public.profile_follows') is not null then
    alter table public.profile_follows
      alter column follower_id type text using follower_id::text,
      alter column following_id type text using follower_id::text;
  end if;
  if to_regclass('public.storage_objects') is not null then
    alter table public.storage_objects
      alter column owner_id type text using owner_id::text;
  end if;
end $$;

comment on column public.profiles.id is
  'Firebase Auth uid (primary app identity). Was Supabase auth.users uuid before migration 020.';

-- ── One-time cleanup: keep root owner only (sahrocky81@gmail.com) ───────────
-- Requires auth.users still present for the email join (run before purging auth).
do $$
begin
  if to_regclass('public.profile_follows') is not null then
    delete from public.profile_follows pf
    where pf.follower_id in (
      select p.id from public.profiles p
      left join auth.users u on u.id::text = p.id::text
      where coalesce(lower(u.email), '') <> 'sahrocky81@gmail.com'
    )
       or pf.following_id in (
      select p.id from public.profiles p
      left join auth.users u on u.id::text = p.id::text
      where coalesce(lower(u.email), '') <> 'sahrocky81@gmail.com'
    );
  end if;

  if to_regclass('public.storage_objects') is not null then
    delete from public.storage_objects so
    using public.profiles p
    left join auth.users u on u.id::text = p.id::text
    where so.owner_id = p.id
      and coalesce(lower(u.email), '') <> 'sahrocky81@gmail.com';
  end if;

  delete from public.profiles p
  where not exists (
    select 1 from auth.users u
    where u.id::text = p.id::text
      and lower(u.email) = 'sahrocky81@gmail.com'
  );
end $$;

-- After root signs in with Firebase, update profiles.id to the new Firebase uid:
--   update public.profiles set id = '<firebase-uid>' where id = '<legacy-supabase-uuid>';
