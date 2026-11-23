-- 035_notification_kinds_accept_quote.sql — extend notification kinds
-- Adds "accept" (your answer was marked accepted) and "quote" (your post was
-- quoted in a new discussion) to the social_notifications kind check.
-- Idempotent; apply with backend/scripts/migrate.mjs.

alter table public.social_notifications
  drop constraint if exists social_notifications_kind_check;

alter table public.social_notifications
  add constraint social_notifications_kind_check check (
    kind in ('like', 'comment', 'reply', 'follow', 'repost', 'mention', 'accept', 'quote')
  );
