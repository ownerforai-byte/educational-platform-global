-- 007_image_history.sql
--
-- Image Hub history, saved to every user's account (owner request 2026-10-04:
-- "enable saving of image for every user … hardcode its history saving").
--
-- One row per drawing a student makes in the Image Hub:
--   kind = 'picture' → a raster image drawn by the server chain or puter.js
--                       (url points at the generated image)
--   kind = 'figure'  → a vector academic figure (svg holds the whole drawing,
--                       parts carries the hoverable legend as JSON)
--
-- The server draw endpoints (/api/ai/image, /api/ai/figure) insert their own
-- rows on every success; POST /api/ai/image-history adds browser-drawn
-- puter.js results. Reads/deletes are always scoped to user_id.
--
-- Apply through the Supabase Management API:
--   cd backend && node scripts/run-sql.mjs src/db/migrations/007_image_history.sql
-- Idempotent — every statement below is safe to re-run.

create table if not exists public.image_history (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  kind       text not null check (kind in ('figure', 'picture')),
  prompt     text not null,
  url        text,
  svg        text,
  caption    text,
  archetype  text,
  engine     text,
  parts      jsonb,
  created_at timestamptz not null default now()
);

-- The hub loads one account's gallery, newest first.
create index if not exists image_history_user_created_idx
  on public.image_history (user_id, created_at desc);

alter table public.image_history enable row level security;

-- Own-row-only policies, mirroring public.chat_messages. The API writes with
-- the service role (bypasses RLS); these protect any anon/authenticated-key
-- access — no account can ever read or delete another account's drawings.
drop policy if exists image_history_select on public.image_history;
create policy image_history_select on public.image_history
  for select using (user_id = auth.uid());

drop policy if exists image_history_insert on public.image_history;
create policy image_history_insert on public.image_history
  for insert with check (user_id = auth.uid());

drop policy if exists image_history_delete on public.image_history;
create policy image_history_delete on public.image_history
  for delete using (user_id = auth.uid());
