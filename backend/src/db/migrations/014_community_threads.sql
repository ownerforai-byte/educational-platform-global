-- 014_community_threads.sql
--
-- Peer discussions: threads per community space (the study spaces derived
-- from the syllabus, `<classSlug>-<subjectSlug>` ids), replies and upvotes.
-- This backs the surfaces that used to announce "needs a community backend,
-- which is not built yet" — the community space pages, thread pages and the
-- Ask board's peer-answers panel.
--
-- Apply through the Supabase Management API:
--   cd backend && node scripts/run-sql.mjs src/db/migrations/014_community_threads.sql
-- Idempotent — every statement below is safe to re-run.
--
-- The backend writes with the service-role key (bypasses RLS) and masks
-- author names server-side. RLS here only covers direct anon-key access:
-- everyone signed-in can read discussions, only the author writes their rows.

create table if not exists public.community_threads (
  id uuid primary key default gen_random_uuid(),
  -- CommunitySpace.id from the frontend: `<classSlug>-<subjectSlug>`.
  space_id text not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  body text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.community_replies (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.community_threads (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

-- One upvote per student per thread; re-clicking removes it (toggle).
create table if not exists public.community_upvotes (
  thread_id uuid not null references public.community_threads (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (thread_id, user_id)
);

-- Space listings, newest first.
create index if not exists community_threads_space_created_idx
  on public.community_threads (space_id, created_at desc);

-- Thread detail, replies oldest first.
create index if not exists community_replies_thread_created_idx
  on public.community_replies (thread_id, created_at);

-- Upvote counts per thread.
create index if not exists community_upvotes_thread_idx
  on public.community_upvotes (thread_id);

alter table public.community_threads enable row level security;
alter table public.community_replies enable row level security;
alter table public.community_upvotes enable row level security;

drop policy if exists community_threads_select on public.community_threads;
create policy community_threads_select on public.community_threads
  for select using (auth.uid() is not null);

drop policy if exists community_threads_insert on public.community_threads;
create policy community_threads_insert on public.community_threads
  for insert with check (user_id = auth.uid());

drop policy if exists community_threads_delete on public.community_threads;
create policy community_threads_delete on public.community_threads
  for delete using (user_id = auth.uid());

drop policy if exists community_replies_select on public.community_replies;
create policy community_replies_select on public.community_replies
  for select using (auth.uid() is not null);

drop policy if exists community_replies_insert on public.community_replies;
create policy community_replies_insert on public.community_replies
  for insert with check (user_id = auth.uid());

drop policy if exists community_replies_delete on public.community_replies;
create policy community_replies_delete on public.community_replies
  for delete using (user_id = auth.uid());

drop policy if exists community_upvotes_select on public.community_upvotes;
create policy community_upvotes_select on public.community_upvotes
  for select using (auth.uid() is not null);

drop policy if exists community_upvotes_insert on public.community_upvotes;
create policy community_upvotes_insert on public.community_upvotes
  for insert with check (user_id = auth.uid());

drop policy if exists community_upvotes_delete on public.community_upvotes;
create policy community_upvotes_delete on public.community_upvotes
  for delete using (user_id = auth.uid());
