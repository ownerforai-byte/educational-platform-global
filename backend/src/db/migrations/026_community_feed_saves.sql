-- 026_community_feed_saves.sql — public "saved" toggles for community feed posts
-- (bookmark-style saves, separate from likes). Mirrors community_feed_likes.
-- Idempotent; apply with backend/scripts/migrate.mjs.

create table if not exists public.community_feed_saves (
  post_id uuid not null references public.community_feed_posts (id) on delete cascade,
  user_id text not null,
  created_at timestamptz not null default now(),
  constraint community_feed_saves_post_user_key unique (post_id, user_id)
);

create index if not exists community_feed_saves_post_idx
  on public.community_feed_saves (post_id);

alter table public.community_feed_saves enable row level security;

grant all on table public.community_feed_saves to service_role;

-- Keep anon/authenticated blocked (018 intent).
revoke all on table public.community_feed_saves from anon, authenticated;

comment on column public.community_feed_saves.user_id is
  'Firebase Auth uid (text). No FK to auth.users, matching 021.';
