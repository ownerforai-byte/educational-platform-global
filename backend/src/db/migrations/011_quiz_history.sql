-- 011_quiz_history.sql
--
-- Per-user AI quiz history, saved automatically after every completed quiz.
-- One row per quiz session the student finished on /ai-quiz.
--
-- Apply through the Supabase Management API:
--   cd backend && node scripts/run-sql.mjs src/db/migrations/011_quiz_history.sql
-- Idempotent — every statement below is safe to re-run.
--
-- The backend writes with the service-role key (bypasses RLS). If the anon key
-- is ever used directly, users can only see their own rows.

create table if not exists public.quiz_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,

  -- Human-readable label the student can recognise later.
  title text not null default 'Quiz',

  -- The exact request that produced the quiz.
  class_slug text,
  subject_slug text,
  topic text,
  difficulty text check (difficulty in ('easy', 'intermediate', 'hard')),

  -- The generated quiz payload, kept intact so the history page can re-render
  -- the full quiz with per-option analysis exactly as the student first saw it.
  questions jsonb not null,

  -- How the student actually did.
  answered integer not null default 0,
  correct integer not null default 0,
  score_pct integer,

  created_at timestamptz not null default now()
);

-- Load one account's quiz history, newest first.
create index if not exists quiz_history_user_created_idx
  on public.quiz_history (user_id, created_at desc);

alter table public.quiz_history enable row level security;

drop policy if exists quiz_history_select on public.quiz_history;
create policy quiz_history_select on public.quiz_history
  for select using (user_id = auth.uid());

drop policy if exists quiz_history_insert on public.quiz_history;
create policy quiz_history_insert on public.quiz_history
  for insert with check (user_id = auth.uid());

drop policy if exists quiz_history_delete on public.quiz_history;
create policy quiz_history_delete on public.quiz_history
  for delete using (user_id = auth.uid());
