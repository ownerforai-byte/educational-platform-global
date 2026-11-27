-- 037_quiz_attempt_integrity.sql
-- Server-verifiable quiz attempts and fail-closed leaderboard history.
-- Idempotent; apply from backend/: node scripts/migrate.mjs
--
-- `quiz_attempts` is service-role only. It stores the exact normalized question
-- snapshot and answer metadata before the client receives an opaque attempt id.
-- `quiz_history.verification_status` defaults to unverified, so every legacy row
-- is neutralized for leaderboard XP without deleting readable history.

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  title text not null default 'Quiz',
  class_slug text,
  subject_slug text,
  topic text,
  difficulty text check (difficulty in ('easy', 'intermediate', 'hard')),
  format text not null check (
    format in ('mcq', 'true-false', 'fill-blank', 'short-answer', 'long-answer')
  ),
  question_count integer not null check (question_count between 1 and 20),
  content_hash text not null check (content_hash ~ '^[0-9a-f]{64}$'),
  questions jsonb not null check (jsonb_typeof(questions) = 'array'),
  expires_at timestamptz not null,
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.quiz_history
  add column if not exists verification_status text not null default 'unverified',
  add column if not exists verification_reason text,
  add column if not exists attempt_id uuid,
  add column if not exists question_count integer,
  add column if not exists format text,
  add column if not exists responses jsonb,
  add column if not exists verified_at timestamptz;

-- Old rows remain visible in personal history but can never earn global XP.
update public.quiz_history
set verification_reason = 'legacy-unverified'
where verification_status = 'unverified'
  and attempt_id is null
  and verification_reason is null;

update public.quiz_history
set question_count = case
  when jsonb_typeof(questions) = 'array' then least(jsonb_array_length(questions), 40)
  else 0
end
where question_count is null;

update public.quiz_history
set format = coalesce(questions->0->>'format', 'mcq')
where format is null;

do $$ begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'quiz_history_counts_valid'
      and conrelid = 'public.quiz_history'::regclass
  ) then
    alter table public.quiz_history
      add constraint quiz_history_counts_valid check (
        answered >= 0 and correct >= 0 and correct <= answered
      ) not valid;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'quiz_history_score_valid'
      and conrelid = 'public.quiz_history'::regclass
  ) then
    alter table public.quiz_history
      add constraint quiz_history_score_valid check (
        score_pct is null or score_pct between 0 and 100
      ) not valid;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'quiz_history_verification_valid'
      and conrelid = 'public.quiz_history'::regclass
  ) then
    alter table public.quiz_history
      add constraint quiz_history_verification_valid check (
        verification_status in ('verified', 'unverified')
      );
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'quiz_history_unverified_reason_valid'
      and conrelid = 'public.quiz_history'::regclass
  ) then
    alter table public.quiz_history
      add constraint quiz_history_unverified_reason_valid check (
        verification_status <> 'unverified' or verification_reason is not null
      ) not valid;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'quiz_history_verified_attempt_valid'
      and conrelid = 'public.quiz_history'::regclass
  ) then
    alter table public.quiz_history
      add constraint quiz_history_verified_attempt_valid check (
        verification_status <> 'verified'
        or (
          attempt_id is not null
          and question_count between 1 and 20
          and answered = question_count
          and correct between 0 and answered
          and score_pct between 0 and 100
          and score_pct = round((correct::numeric / answered) * 100)::integer
          and verified_at is not null
          and verification_reason is null
          and format in ('mcq', 'true-false', 'fill-blank')
        )
      );
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'quiz_history_attempt_id_key'
      and conrelid = 'public.quiz_history'::regclass
  ) then
    alter table public.quiz_history
      add constraint quiz_history_attempt_id_key unique (attempt_id);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'quiz_history_attempt_id_fkey'
      and conrelid = 'public.quiz_history'::regclass
  ) then
    alter table public.quiz_history
      add constraint quiz_history_attempt_id_fkey
      foreign key (attempt_id) references public.quiz_attempts (id) on delete restrict;
  end if;
end $$;

-- The count/score constraints are intentionally left NOT VALID so corrupt
-- legacy rows cannot block deployment. They still enforce every new/updated
-- row; legacy rows remain excluded by verification_status.

create index if not exists quiz_attempts_user_expires_idx
  on public.quiz_attempts (user_id, expires_at desc);
create index if not exists quiz_attempts_open_expiry_idx
  on public.quiz_attempts (expires_at)
  where consumed_at is null;
create index if not exists quiz_history_verified_created_idx
  on public.quiz_history (verification_status, created_at desc);
create index if not exists quiz_history_user_verified_created_idx
  on public.quiz_history (user_id, verification_status, created_at desc);
create index if not exists quiz_history_attempt_id_idx
  on public.quiz_history (attempt_id)
  where attempt_id is not null;

-- API-owned tables: no direct browser reads/writes, including verified flags.
alter table public.quiz_attempts enable row level security;
alter table public.quiz_history enable row level security;
drop policy if exists quiz_history_select on public.quiz_history;
drop policy if exists quiz_history_insert on public.quiz_history;
drop policy if exists quiz_history_delete on public.quiz_history;
revoke all on table public.quiz_attempts from anon, authenticated;
revoke all on table public.quiz_history from anon, authenticated;
grant all on table public.quiz_attempts to service_role;
grant all on table public.quiz_history to service_role;

comment on table public.quiz_attempts is
  'Service-role-only, short-lived, single-use quiz grading snapshots.';
comment on column public.quiz_history.verification_status is
  'Only server-verified rows contribute leaderboard XP; legacy rows are unverified.';
