-- Bot-scheduled posts: public daily digest vs profile-only discovery timeline.

alter table public.community_feed_posts
  drop constraint if exists community_feed_posts_visibility_check;

alter table public.community_feed_posts
  add constraint community_feed_posts_visibility_check
  check (visibility in ('public', 'profile_only'));