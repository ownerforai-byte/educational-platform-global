-- Tracks which SQL migration files have been applied (T10).
-- Idempotent: safe to re-run.
create table if not exists public.schema_migrations (
  filename text primary key,
  checksum text not null,
  applied_at timestamptz not null default now()
);

comment on table public.schema_migrations is
  'Ordered migration ledger; managed by backend/scripts/migrate.mjs';
