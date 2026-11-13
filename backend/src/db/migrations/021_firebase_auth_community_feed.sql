-- 021_firebase_auth_community_feed.sql — Firebase UIDs on community feed (after 020)
-- Idempotent; apply with backend/scripts/migrate.mjs.

alter table public.community_feed_posts drop constraint if exists community_feed_posts_author_id_fkey;
alter table public.community_feed_likes drop constraint if exists community_feed_likes_user_id_fkey;
alter table public.community_feed_comments drop constraint if exists community_feed_comments_author_id_fkey;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'community_feed_posts'
      and column_name = 'author_id'
      and udt_name = 'uuid'
  ) then
    alter table public.community_feed_posts
      alter column author_id type text using author_id::text;
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'community_feed_likes'
      and column_name = 'user_id'
      and udt_name = 'uuid'
  ) then
    alter table public.community_feed_likes
      alter column user_id type text using user_id::text;
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'community_feed_comments'
      and column_name = 'author_id'
      and udt_name = 'uuid'
  ) then
    alter table public.community_feed_comments
      alter column author_id type text using author_id::text;
  end if;
end $$;

comment on column public.community_feed_posts.author_id is
  'Firebase Auth uid (text). FK to auth.users removed in 021.';
comment on column public.community_feed_likes.user_id is
  'Firebase Auth uid (text). FK to auth.users removed in 021.';
comment on column public.community_feed_comments.author_id is
  'Firebase Auth uid (text). FK to auth.users removed in 021';

-- Remove feed data tied to deleted non-root profiles (020 keeps root profile only).
delete from public.community_feed_attachments a
where a.post_id in (
  select p.id from public.community_feed_posts p
  where p.author_id not in (select id from public.profiles)
);

delete from public.community_feed_likes l
where l.post_id in (
  select p.id from public.community_feed_posts p
  where p.author_id not in (select id from public.profiles)
);

delete from public.community_feed_comments c
where c.post_id in (
  select p.id from public.community_feed_posts p
  where p.author_id not in (select id from public.profiles)
);

delete from public.community_feed_posts p
where p.author_id not in (select id from public.profiles);
