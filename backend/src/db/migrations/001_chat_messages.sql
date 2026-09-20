-- Chat history for the AI assistant (per user).
-- Run once in the Supabase SQL editor — service-role credentials cannot run DDL.
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  session text not null default 'default',
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists chat_messages_user_session_idx
  on public.chat_messages (user_id, session, created_at);

-- Defense in depth: the backend always uses the service-role key (bypasses
-- RLS), but if the anon key is ever used directly, users can only see their
-- own rows.
alter table public.chat_messages enable row level security;

drop policy if exists "own rows select" on public.chat_messages;
create policy "own rows select" on public.chat_messages
  for select using (auth.uid() = user_id);

drop policy if exists "own rows insert" on public.chat_messages;
create policy "own rows insert" on public.chat_messages
  for insert with check (auth.uid() = user_id);

drop policy if exists "own rows delete" on public.chat_messages;
create policy "own rows delete" on public.chat_messages
  for delete using (auth.uid() = user_id);
