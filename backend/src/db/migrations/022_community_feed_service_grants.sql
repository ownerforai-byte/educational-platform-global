-- 022_community_feed_service_grants.sql
--
-- Migrations 018/019 created community + follow tables and revoked anon/authenticated
-- access, but never granted the API role (service_role). PostgREST then returns
-- 42501 "permission denied" and the feed handler surfaces HTTP 500.
--
-- Idempotent — safe to re-run. Apply from backend/: node scripts/migrate.mjs

grant all on table public.community_feed_posts to service_role;
grant all on table public.community_feed_attachments to service_role;
grant all on table public.community_feed_likes to service_role;
grant all on table public.community_feed_comments to service_role;

grant all on table public.profile_follows to service_role;
grant all on table public.storage_objects to service_role;

-- Keep anon/authenticated blocked (018 intent).
revoke all on table public.community_feed_posts from anon, authenticated;
revoke all on table public.community_feed_attachments from anon, authenticated;
revoke all on table public.community_feed_likes from anon, authenticated;
revoke all on table public.community_feed_comments from anon, authenticated;
