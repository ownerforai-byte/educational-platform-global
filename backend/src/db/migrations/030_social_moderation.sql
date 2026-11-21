-- Report + block (client filters blocked authors; moderators see reports separately).
create table if not exists public.community_feed_reports (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_feed_posts (id) on delete cascade,
  reporter_id text not null,
  reason text,
  created_at timestamptz not null default now(),
  constraint community_feed_reports_unique unique (post_id, reporter_id)
);

create table if not exists public.social_blocks (
  blocker_id text not null,
  blocked_id text not null,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id)
);

create index if not exists social_blocks_blocker_idx
  on public.social_blocks (blocker_id);