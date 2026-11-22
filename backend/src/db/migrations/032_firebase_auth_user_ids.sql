-- 032_firebase_auth_user_ids.sql — Firebase UIDs on every remaining user table
-- Idempotent; apply with backend/scripts/migrate.mjs after 031.
--
-- 021 converted community_feed_posts/likes/comments and 024 converted the
-- legacy community_threads tables, but the per-user feature tables from
-- migrations 001/006/007/011/012/017/019 still store user_id as
-- `uuid references auth.users`. The platform now authenticates through
-- Firebase Auth, whose uids are opaque text (typically 28 chars), so every
-- insert 500s with 22P02 ("invalid input syntax for type uuid") — most
-- visibly "Your answer could not be saved to history." on chat history.
--
-- This migration converts every remaining uuid user column to text and drops
-- the auth.users foreign keys, exactly like 021/024. Existing UUID strings
-- are preserved (no destructive sweep). RLS policies comparing user_id to
-- auth.uid() keep working for text columns (auth.uid() is text-cast by
-- Postgres automatically in the comparison).

-- ── chat_messages (001) — AI chat history ─────────────────────────────────
alter table public.chat_messages drop constraint if exists chat_messages_user_id_fkey;
do $$ begin
  if exists (select 1 from information_schema.columns
             where table_schema = 'public' and table_name = 'chat_messages'
               and column_name = 'user_id' and udt_name = 'uuid') then
    alter table public.chat_messages alter column user_id type text using user_id::text;
  end if;
end $$;
comment on column public.chat_messages.user_id is
  'Firebase Auth uid (text). FK to auth.users removed in 032.';

-- ── user_journey (006) — topic visit tracking ──────────────────────────────
alter table public.user_journey drop constraint if exists user_journey_user_id_fkey;
do $$ begin
  if exists (select 1 from information_schema.columns
             where table_schema = 'public' and table_name = 'user_journey'
               and column_name = 'user_id' and udt_name = 'uuid') then
    alter table public.user_journey alter column user_id type text using user_id::text;
  end if;
end $$;
comment on column public.user_journey.user_id is
  'Firebase Auth uid (text). FK to auth.users removed in 032.';

-- ── image_history (007) ────────────────────────────────────────────────────
alter table public.image_history drop constraint if exists image_history_user_id_fkey;
do $$ begin
  if exists (select 1 from information_schema.columns
             where table_schema = 'public' and table_name = 'image_history'
               and column_name = 'user_id' and udt_name = 'uuid') then
    alter table public.image_history alter column user_id type text using user_id::text;
  end if;
end $$;
comment on column public.image_history.user_id is
  'Firebase Auth uid (text). FK to auth.users removed in 032.';

-- ── quiz_history (011) ─────────────────────────────────────────────────────
alter table public.quiz_history drop constraint if exists quiz_history_user_id_fkey;
do $$ begin
  if exists (select 1 from information_schema.columns
             where table_schema = 'public' and table_name = 'quiz_history'
               and column_name = 'user_id' and udt_name = 'uuid') then
    alter table public.quiz_history alter column user_id type text using user_id::text;
  end if;
end $$;
comment on column public.quiz_history.user_id is
  'Firebase Auth uid (text). FK to auth.users removed in 032.';

-- ── practice_attempts (012) ────────────────────────────────────────────────
alter table public.practice_attempts drop constraint if exists practice_attempts_user_id_fkey;
do $$ begin
  if exists (select 1 from information_schema.columns
             where table_schema = 'public' and table_name = 'practice_attempts'
               and column_name = 'user_id' and udt_name = 'uuid') then
    alter table public.practice_attempts alter column user_id type text using user_id::text;
  end if;
end $$;
comment on column public.practice_attempts.user_id is
  'Firebase Auth uid (text). FK to auth.users removed in 032.';

-- ── user_access_requests (017) — also carries the FCM push tokens ─────────
alter table public.user_access_requests drop constraint if exists user_access_requests_user_id_fkey;
do $$ begin
  if exists (select 1 from information_schema.columns
             where table_schema = 'public' and table_name = 'user_access_requests'
               and column_name = 'user_id' and udt_name = 'uuid') then
    alter table public.user_access_requests alter column user_id type text using user_id::text;
  end if;
end $$;
comment on column public.user_access_requests.user_id is
  'Firebase Auth uid (text). FK to auth.users removed in 032.';

-- ── profile_follows (019) — follow graph ───────────────────────────────────
alter table public.profile_follows drop constraint if exists profile_follows_follower_id_fkey;
alter table public.profile_follows drop constraint if exists profile_follows_following_id_fkey;
do $$ begin
  if exists (select 1 from information_schema.columns
             where table_schema = 'public' and table_name = 'profile_follows'
               and column_name = 'follower_id' and udt_name = 'uuid') then
    alter table public.profile_follows alter column follower_id type text using follower_id::text;
  end if;
  if exists (select 1 from information_schema.columns
             where table_schema = 'public' and table_name = 'profile_follows'
               and column_name = 'following_id' and udt_name = 'uuid') then
    alter table public.profile_follows alter column following_id type text using following_id::text;
  end if;
end $$;
comment on column public.profile_follows.follower_id is
  'Firebase Auth uid (text). FK to auth.users removed in 032.';
comment on column public.profile_follows.following_id is
  'Firebase Auth uid (text). FK to auth.users removed in 032.';

-- ── service_role grants for the tables the API writes through ─────────────
-- 022 granted the first wave of feed tables; the later ones were applied
-- without their grant sections and PostgREST answers 42501 to service_role.
grant all on table public.chat_messages to service_role;
grant all on table public.user_journey to service_role;
grant all on table public.image_history to service_role;
grant all on table public.quiz_history to service_role;
grant all on table public.practice_attempts to service_role;
grant all on table public.user_access_requests to service_role;
grant all on table public.profile_follows to service_role;
grant all on table public.community_feed_reposts to service_role;
grant all on table public.community_feed_reports to service_role;
grant all on table public.social_notifications to service_role;
grant all on table public.social_blocks to service_role;
