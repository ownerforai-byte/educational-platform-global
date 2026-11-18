-- 027_community_feed_comment_threads.sql — reply threading for feed comments
-- parent_comment_id links a reply to the comment it answers ("Replying to @x").
-- Deleting the parent keeps the reply but clears the link (on delete set null).
-- Idempotent; apply with backend/scripts/migrate.mjs.

alter table public.community_feed_comments
  add column if not exists parent_comment_id uuid
  references public.community_feed_comments (id) on delete set null;

create index if not exists community_feed_comments_parent_idx
  on public.community_feed_comments (parent_comment_id);
