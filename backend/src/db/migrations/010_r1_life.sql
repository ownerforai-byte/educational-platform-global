-- 010_r1_life.sql
--
-- Per-user data for the R1 daily-life layer: activity log, plans, journal and
-- habits. Every table is strictly own-row (user_id scoping in the API + RLS
-- here) — one user's life data is invisible to every other account.
--
-- Applied to the live project through the Supabase Management API:
--   cd backend && node scripts/run-sql.mjs src/db/migrations/010_r1_life.sql
-- Idempotent — every statement below is safe to re-run.

-- ── Daily activity log ──────────────────────────────────────────────────────

create table if not exists public.r1_activities (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  activity_date date not null,
  start_time    text,
  end_time      text,
  category      text not null default 'general',
  title         text not null,
  description   text,
  minutes       integer,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists r1_activities_user_date_idx
  on public.r1_activities (user_id, activity_date desc);

-- ── Plans / upcoming tasks ──────────────────────────────────────────────────

create table if not exists public.r1_plans (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  title       text not null,
  description text,
  due_date    date,
  status      text not null default 'planned'
              check (status in ('planned', 'in_progress', 'done', 'cancelled')),
  priority    text not null default 'medium'
              check (priority in ('low', 'medium', 'high')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists r1_plans_user_due_idx
  on public.r1_plans (user_id, due_date);

create index if not exists r1_plans_user_status_idx
  on public.r1_plans (user_id, status);

-- ── Journal (one entry per user per day) ────────────────────────────────────

create table if not exists public.r1_journal (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  entry_date date not null,
  title      text not null default '',
  body       text not null,
  mood       text,
  tags       text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists r1_journal_user_day_key
  on public.r1_journal (user_id, entry_date);

create index if not exists r1_journal_user_date_idx
  on public.r1_journal (user_id, entry_date desc);

-- ── Habits + daily check-ins ────────────────────────────────────────────────

create table if not exists public.r1_habits (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  name       text not null,
  color      text,
  archived   boolean not null default false,
  created_at timestamptz not null default now()
);

create unique index if not exists r1_habits_user_name_key
  on public.r1_habits (user_id, name);

create table if not exists public.r1_habit_checkins (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  habit_id     uuid not null references public.r1_habits (id) on delete cascade,
  checkin_date date not null,
  created_at   timestamptz not null default now()
);

create unique index if not exists r1_habit_checkins_habit_day_key
  on public.r1_habit_checkins (habit_id, checkin_date);

create index if not exists r1_habit_checkins_user_date_idx
  on public.r1_habit_checkins (user_id, checkin_date desc);

-- ── RLS: own-row-only on every table (API writes with the service role) ─────

alter table public.r1_activities enable row level security;
alter table public.r1_plans enable row level security;
alter table public.r1_journal enable row level security;
alter table public.r1_habits enable row level security;
alter table public.r1_habit_checkins enable row level security;

drop policy if exists r1_activities_own on public.r1_activities;
create policy r1_activities_own on public.r1_activities
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists r1_plans_own on public.r1_plans;
create policy r1_plans_own on public.r1_plans
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists r1_journal_own on public.r1_journal;
create policy r1_journal_own on public.r1_journal
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists r1_habits_own on public.r1_habits;
create policy r1_habits_own on public.r1_habits
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists r1_habit_checkins_own on public.r1_habit_checkins;
create policy r1_habit_checkins_own on public.r1_habit_checkins
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
