-- 006_user_journey.sql
--
-- Active per-user learning journey behind the "My Progress" page.
--
-- Origin of the 2026-10-04 "My Progress is stuck" fix (verified on the live
-- project before this migration):
--   * `GET /api/progress` only ever returned rows that already existed, and the
--     only writer in the app was the panel's own toggle — which can only toggle
--     rows that already exist. Chicken-and-egg: `public.user_progress` sat at 0
--     rows for every account (~10 real students plus the test emails), so the
--     page was forever stuck on "No progress yet".
--   * Nothing recorded a topic *view*, so a journey never actually started.
--   * `user_progress.topic_id` is a FK to `topics.id`, and `topics` only holds
--     the 66 seeded DB-curriculum rows (0 for biology, english, nepali). The 696
--     official syllabus topics students study live in `frontend/lib/syllabus.ts`
--     + `content/ravikishan/**`, so they cannot be referenced there at all.
--
-- This table keys the journey by the syllabus path instead — one row per
-- (user, class, subject, unit, topic):
--   no row               → not started
--   status = 'started'   → in progress (topic opened, not completed yet)
--   status = 'completed' → completed (completed_at stamped once, never downgraded)
--
-- Applied to the live project through the Supabase Management API:
--   cd backend && node scripts/run-sql.mjs src/db/migrations/006_user_journey.sql
-- Idempotent — every statement below is safe to re-run.

create table if not exists public.user_journey (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  class_slug    text not null,
  subject_slug  text not null,
  unit_slug     text not null,
  topic_slug    text not null,
  status        text not null default 'started'
                check (status in ('started', 'completed')),
  started_at    timestamptz not null default now(),
  last_viewed_at timestamptz not null default now(),
  view_count    integer not null default 1,
  completed_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- The upsert target: one journey row per user per syllabus topic.
create unique index if not exists user_journey_user_topic_key
  on public.user_journey (user_id, class_slug, subject_slug, unit_slug, topic_slug);

-- "My Progress" reads every row for one user, newest activity first.
create index if not exists user_journey_user_viewed_idx
  on public.user_journey (user_id, last_viewed_at desc);

create index if not exists user_journey_user_status_idx
  on public.user_journey (user_id, status);

alter table public.user_journey enable row level security;

-- Own-row-only policies, mirroring public.user_progress / public.bookmarks.
-- The API writes with the service role (bypasses RLS); these protect any
-- anon/authenticated-key access.
drop policy if exists journey_select on public.user_journey;
create policy journey_select on public.user_journey
  for select using (user_id = auth.uid());

drop policy if exists journey_insert on public.user_journey;
create policy journey_insert on public.user_journey
  for insert with check (user_id = auth.uid());

drop policy if exists journey_update on public.user_journey;
create policy journey_update on public.user_journey
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists journey_delete on public.user_journey;
create policy journey_delete on public.user_journey
  for delete using (user_id = auth.uid());
