-- 018_community_feed.sql
--
-- Public community feed (posts, attachments, likes, comments).
-- Does not alter community_threads / community_replies / community_upvotes.
--
-- Apply from backend/:
--   node scripts/migrate.mjs
-- Idempotent — safe to re-run.
--
-- The API writes with the service role (RLS bypass). No anon or authenticated
-- policies are granted. Attachment rows are also revoked from those roles so
-- data_base64 cannot be read with the anon key.

create table if not exists public.community_feed_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  body text not null,
  category text not null,
  visibility text not null default 'public',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint community_feed_posts_visibility_check check (visibility in ('public')),
  constraint community_feed_posts_category_check check (
    category in (
      'general',
      'physics',
      'chemistry',
      'biology',
      'mathematics',
      'english',
      'nepali'
    )
  )
);

create table if not exists public.community_feed_attachments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_feed_posts (id) on delete cascade,
  filename text not null,
  content_type text not null,
  byte_size integer not null,
  storage_path text,
  data_base64 text,
  created_at timestamptz not null default now()
);

create table if not exists public.community_feed_likes (
  post_id uuid not null references public.community_feed_posts (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

create table if not exists public.community_feed_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_feed_posts (id) on delete cascade,
  author_id uuid not null references auth.users (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists community_feed_posts_created_at_idx
  on public.community_feed_posts (created_at desc);

create index if not exists community_feed_posts_author_idx
  on public.community_feed_posts (author_id);

create index if not exists community_feed_posts_category_idx
  on public.community_feed_posts (category);

create index if not exists community_feed_comments_post_idx
  on public.community_feed_comments (post_id);

create index if not exists community_feed_likes_post_idx
  on public.community_feed_likes (post_id);

create index if not exists community_feed_attachments_post_idx
  on public.community_feed_attachments (post_id);

alter table public.community_feed_posts enable row level security;
alter table public.community_feed_attachments enable row level security;
alter table public.community_feed_likes enable row level security;
alter table public.community_feed_comments enable row level security;

revoke all on table public.community_feed_posts from anon, authenticated;
revoke all on table public.community_feed_attachments from anon, authenticated;
revoke all on table public.community_feed_likes from anon, authenticated;
revoke all on table public.community_feed_comments from anon, authenticated;

-- Backfill profiles for auth users that have none. Insert only — existing
-- rows stay as they are (do not flip them to ACTIVE).
insert into public.profiles (id, full_name, role, plan, access_status, premium_status)
select
  u.id,
  u.raw_user_meta_data->>'full_name',
  'member',
  'member',
  'PENDING',
  false
from auth.users u
where not exists (
  select 1 from public.profiles p where p.id = u.id
)
on conflict (id) do nothing;
