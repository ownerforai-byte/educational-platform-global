-- Live "Check now" counter for the pending-approval screen.
-- Incremented by GET /api/auth/account-status — not a browser-only tally.

alter table public.profiles
  add column if not exists status_check_count integer not null default 0;

alter table public.profiles
  alter column status_check_count set default 0;
