-- 019_profile_storage.sql — public profiles, R2 image paths, storage quota, follows.
-- Idempotent — safe to re-run. Apply from backend/: node scripts/migrate.mjs

alter table public.profiles
  add column if not exists username text,
  add column if not exists bio text,
  add column if not exists location text,
  add column if not exists website text,
  add column if not exists avatar_path text,
  add column if not exists avatar_bytes integer not null default 0,
  add column if not exists cover_path text,
  add column if not exists cover_bytes integer not null default 0,
  add column if not exists storage_used_bytes bigint not null default 0,
  add column if not exists storage_limit_bytes bigint,
  add column if not exists profile_visibility text not null default 'public',
  add column if not exists profile_extras jsonb not null default '{}'::jsonb;

alter table public.profiles drop constraint if exists profiles_profile_visibility_check;
alter table public.profiles
  add constraint profiles_profile_visibility_check
  check (profile_visibility in ('public', 'members', 'private'));

create unique index if not exists profiles_username_unique_idx
  on public.profiles (lower(username))
  where username is not null;

create table if not exists public.profile_follows (
  follower_id uuid not null references auth.users (id) on delete cascade,
  following_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  constraint profile_follows_no_self check (follower_id <> following_id)
);

create index if not exists profile_follows_following_idx
  on public.profile_follows (following_id, created_at desc);

create index if not exists profile_follows_follower_idx
  on public.profile_follows (follower_id, created_at desc);

create table if not exists public.storage_objects (
  path text primary key,
  owner_id uuid not null references auth.users (id) on delete cascade,
  byte_size integer not null check (byte_size >= 0),
  ref_count integer not null default 1 check (ref_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists storage_objects_owner_idx on public.storage_objects (owner_id);

-- Backfill usernames from email local-part (unique, lowercase).
do $$
declare
  r record;
  base text;
  candidate text;
  n integer;
begin
  for r in
    select p.id, u.email
    from public.profiles p
    join auth.users u on u.id = p.id
    where p.username is null and u.email is not null
  loop
    base := lower(regexp_replace(split_part(r.email, '@', 1), '[^a-z0-9_-]', '', 'g'));
    if char_length(base) < 3 then
      base := 'user';
    end if;
    base := left(base, 24);
    candidate := base;
    n := 0;
    while exists (
      select 1 from public.profiles x where lower(x.username) = lower(candidate) and x.id <> r.id
    ) loop
      n := n + 1;
      candidate := base || n::text;
    end loop;
    update public.profiles set username = candidate where id = r.id;
  end loop;
end $$;
