-- Reposts (simple boost — no quote body).
create table if not exists public.community_feed_reposts (
  post_id uuid not null references public.community_feed_posts (id) on delete cascade,
  user_id text not null,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

create index if not exists community_feed_reposts_post_idx
  on public.community_feed_reposts (post_id);

create index if not exists community_feed_reposts_user_idx
  on public.community_feed_reposts (user_id);