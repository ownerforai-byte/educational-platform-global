-- 012_practice_attempts.sql
--
-- Per-user practice attempt log for the textbook solution corpus
-- (content/practice/solutions/** — the per-exercise files, e.g. the
-- Sukunda X1 62-exercise layer). One row every time a student submits
-- or self-grades a practice question on a /practice solutions page.
--
-- `user_journey` (migration 006) tracks topic-level started/completed;
-- this table tracks the FINER grain: which individual question, right
-- or wrong, how long, optionally the student's answer payload.
--
-- Apply through the Supabase Management API:
--   cd backend && node scripts/run-sql.mjs src/db/migrations/012_practice_attempts.sql
-- Idempotent — every statement below is safe to re-run.
--
-- The backend writes with the service-role key (bypasses RLS). If the anon
-- key is ever used directly, users can only see their own rows.

create table if not exists public.practice_attempts (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null references auth.users (id) on delete cascade,

  -- Which question: the content topicSlug plus its in-file label
  -- (e.g. topic 'algebra-textbook-ex-1-1-sets', label 'Q2(b)').
  class_slug text not null default 'class-11',
  subject_slug text not null default 'mathematics',
  topic_slug text not null,
  question_label text not null default 'Q1',

  -- Display/debug context: the source file key or book exercise id.
  source text,

  -- The student's answer + how it was graded. `correct` is nullable:
  -- null = ungraded (the client had no expected answer to compare).
  answer jsonb,
  correct boolean,
  time_ms integer,

  -- Free-form student note ("keep forgetting trig identities").
  note text check (char_length(note) <= 500),

  attempted_at timestamptz not null default now()
);

-- Newest-first per-user browsing (the history list).
create index if not exists practice_attempts_user_attempted_idx
  on public.practice_attempts (user_id, attempted_at desc);

-- Per-question dedupe/aggregation (mastery rollups, wrong-answer lists).
create index if not exists practice_attempts_user_topic_idx
  on public.practice_attempts (user_id, topic_slug, question_label);

alter table public.practice_attempts enable row level security;

drop policy if exists practice_attempts_select on public.practice_attempts;
create policy practice_attempts_select on public.practice_attempts
  for select using (user_id = auth.uid());

drop policy if exists practice_attempts_insert on public.practice_attempts;
create policy practice_attempts_insert on public.practice_attempts
  for insert with check (user_id = auth.uid());

drop policy if exists practice_attempts_delete on public.practice_attempts;
create policy practice_attempts_delete on public.practice_attempts
  for delete using (user_id = auth.uid());
