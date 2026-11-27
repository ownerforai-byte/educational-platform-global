-- 036_service_role_only_social_tables.sql
-- Lock down API-owned social and storage-metadata tables.
-- Client access goes through backend routes using the service role; no anon or
-- authenticated policies are needed for these tables.
-- Idempotent — safe to re-run. Apply from backend/: node scripts/migrate.mjs

alter table public.profile_follows enable row level security;
alter table public.storage_objects enable row level security;
alter table public.community_feed_reposts enable row level security;
alter table public.social_notifications enable row level security;
alter table public.community_feed_reports enable row level security;
alter table public.social_blocks enable row level security;

revoke all on table public.profile_follows from anon, authenticated;
revoke all on table public.storage_objects from anon, authenticated;
revoke all on table public.community_feed_reposts from anon, authenticated;
revoke all on table public.social_notifications from anon, authenticated;
revoke all on table public.community_feed_reports from anon, authenticated;
revoke all on table public.social_blocks from anon, authenticated;

grant all on table public.profile_follows to service_role;
grant all on table public.storage_objects to service_role;
grant all on table public.community_feed_reposts to service_role;
grant all on table public.social_notifications to service_role;
grant all on table public.community_feed_reports to service_role;
grant all on table public.social_blocks to service_role;

-- Keep the existing own-row SELECT/INSERT policies and service-role lifecycle
-- writes. Clients may update only delivery metadata, never approval state,
-- ownership, timestamps, or other workflow columns.
revoke update on table public.user_access_requests from anon, authenticated;
grant update (fcm_token, deep_link) on table public.user_access_requests to authenticated;
