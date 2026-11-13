-- 023_community_ai_assistant.sql — Study Assistant bot profile + reply ledger
-- Idempotent; apply with backend/scripts/migrate.mjs

create table if not exists public.community_feed_ai_replies (
  post_id uuid primary key references public.community_feed_posts (id) on delete cascade,
  comment_id uuid not null references public.community_feed_comments (id) on delete cascade,
  approved_by text not null,
  created_at timestamptz not null default now()
);

create index if not exists community_feed_ai_replies_comment_idx
  on public.community_feed_ai_replies (comment_id);

alter table public.community_feed_ai_replies enable row level security;

revoke all on table public.community_feed_ai_replies from anon, authenticated;
grant all on table public.community_feed_ai_replies to service_role;

insert into public.profiles (
  id,
  full_name,
  username,
  role,
  plan,
  access_status,
  premium_status
)
values (
  'rn-study-assistant',
  'Community bot',
  'community-bot',
  'assistant',
  'pro',
  'ACTIVE',
  false
)
on conflict (id) do update set
  full_name = excluded.full_name,
  username = excluded.username,
  role = excluded.role,
  plan = excluded.plan,
  access_status = excluded.access_status;
