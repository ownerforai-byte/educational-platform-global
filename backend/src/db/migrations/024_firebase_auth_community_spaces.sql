-- 024_firebase_auth_community_spaces.sql — Firebase UIDs on Community Spaces
-- Idempotent; apply with backend/scripts/migrate.mjs after 020/021.
--
-- 014 stored user_id as uuid references auth.users. Firebase Auth uids are
-- text (typically 28 chars). Inserts of those values 500 with 22P02 until
-- this conversion. Existing UUID strings are kept (no destructive sweep).

alter table public.community_threads drop constraint if exists community_threads_user_id_fkey;
alter table public.community_replies drop constraint if exists community_replies_user_id_fkey;
alter table public.community_upvotes drop constraint if exists community_upvotes_user_id_fkey;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'community_threads'
      and column_name = 'user_id'
      and udt_name = 'uuid'
  ) then
    alter table public.community_threads
      alter column user_id type text using user_id::text;
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'community_replies'
      and column_name = 'user_id'
      and udt_name = 'uuid'
  ) then
    alter table public.community_replies
      alter column user_id type text using user_id::text;
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'community_upvotes'
      and column_name = 'user_id'
      and udt_name = 'uuid'
  ) then
    alter table public.community_upvotes
      alter column user_id type text using user_id::text;
  end if;
end $$;

comment on column public.community_threads.user_id is
  'Firebase Auth uid (text). FK to auth.users removed in 024.';
comment on column public.community_replies.user_id is
  'Firebase Auth uid (text). FK to auth.users removed in 024.';
comment on column public.community_upvotes.user_id is
  'Firebase Auth uid (text). FK to auth.users removed in 024.';
