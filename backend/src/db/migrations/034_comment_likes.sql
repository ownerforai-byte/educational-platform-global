-- 034_comment_likes.sql — Twitter-style likes on community feed comments
-- Mirrors community_feed_likes but for comment rows. user_id is text so it
-- holds Firebase uids (same convention as the 032 uuid→text swap).
-- Idempotent; apply with backend/scripts/migrate.mjs.

create table if not exists public.community_comment_likes (
  comment_id uuid not null references public.community_feed_comments (id) on delete cascade,
  user_id text not null,
  created_at timestamptz not null default now(),
  primary key (comment_id, user_id)
);

create index if not exists community_comment_likes_comment_idx
  on public.community_comment_likes (comment_id);

alter table public.community_comment_likes enable row level security;

revoke all on table public.community_comment_likes from anon, authenticated;

-- Anyone may read like counts; only the owner writes their own like.
drop policy if exists "comment likes readable" on public.community_comment_likes;
create policy "comment likes readable" on public.community_comment_likes
  for select using (true);

drop policy if exists "own comment likes insert" on public.community_comment_likes;
create policy "own comment likes insert" on public.community_comment_likes
  for insert with check (auth.uid()::text = user_id);

drop policy if exists "own comment likes delete" on public.community_comment_likes;
create policy "own comment likes delete" on public.community_comment_likes
  for delete using (auth.uid()::text = user_id);

grant select on table public.community_comment_likes to authenticated;
grant insert, delete on table public.community_comment_likes to authenticated;
grant all on table public.community_comment_likes to service_role;
