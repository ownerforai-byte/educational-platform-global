-- In-app social notification log (poll from /api/community/notifications).
create table if not exists public.social_notifications (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  actor_id text,
  kind text not null,
  post_id uuid,
  comment_id uuid,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  constraint social_notifications_kind_check check (
    kind in ('like', 'comment', 'reply', 'follow', 'repost', 'mention')
  )
);

create index if not exists social_notifications_user_created_idx
  on public.social_notifications (user_id, created_at desc);

create index if not exists social_notifications_user_unread_idx
  on public.social_notifications (user_id, created_at desc)
  where read_at is null;