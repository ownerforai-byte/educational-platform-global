-- 004_guest_chat_usage.sql
--
-- Server-side daily guest chat quota (owner policy 2026-09-26): 5 messages
-- per guest per UTC day. Replaces the previous in-memory Map, whose counts
-- vanished on every restart/deploy and silently refilled every guest pool.
--
--   client_key = "<UTC day>:sha256(client ip)[:32]" — one row per guest per
--   day, and raw IPs are never stored.
--
-- RLS is enabled with NO policies: only the service-role key (which bypasses
-- RLS) can touch the table, so guests/anonymous API users cannot read or
-- tamper with their quota through PostgREST.
--
-- Applied to the live project via the Supabase Management API on 2026-09-26.
-- Run once in the Supabase SQL editor if provisioning a fresh project.

create table if not exists public.guest_chat_usage (
  client_key text primary key,
  day date not null,
  count integer not null default 0
);

create index if not exists guest_chat_usage_day_idx on public.guest_chat_usage (day);

alter table public.guest_chat_usage enable row level security;
