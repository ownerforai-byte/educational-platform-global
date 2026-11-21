-- 031_community_post_kind_spaces.sql — feed content types + optional study-space join
-- Idempotent; apply with backend/scripts/migrate.mjs

alter table public.community_feed_posts
  add column if not exists kind text not null default 'discussion';

alter table public.community_feed_posts
  drop constraint if exists community_feed_posts_kind_check;

alter table public.community_feed_posts
  add constraint community_feed_posts_kind_check
  check (kind in ('discussion', 'question', 'resource', 'announcement', 'study_note'));

alter table public.community_feed_posts
  add column if not exists accepted_comment_id uuid;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'community_feed_posts_accepted_comment_fkey'
  ) then
    alter table public.community_feed_posts
      add constraint community_feed_posts_accepted_comment_fkey
      foreign key (accepted_comment_id) references public.community_feed_comments (id) on delete set null;
  end if;
end $$;

create index if not exists community_feed_posts_kind_created_idx
  on public.community_feed_posts (kind, created_at desc);

create index if not exists community_feed_posts_category_kind_idx
  on public.community_feed_posts (category, kind, created_at desc);

create table if not exists public.community_space_members (
  space_id text not null,
  user_id text not null references public.profiles (id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (space_id, user_id)
);

create index if not exists community_space_members_space_idx
  on public.community_space_members (space_id);

alter table public.community_space_members enable row level security;

revoke all on table public.community_space_members from anon, authenticated;
grant all on table public.community_space_members to service_role;