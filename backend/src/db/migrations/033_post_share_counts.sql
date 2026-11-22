-- 033_post_share_counts.sql — share-link counters for community feed posts
-- The Share action copies the post's public link and bumps this counter so
-- shares are visible like likes/reposts. Idempotent; apply with
-- backend/scripts/migrate.mjs.

alter table public.community_feed_posts
  add column if not exists share_count integer not null default 0;

grant all on table public.community_feed_posts to service_role;
