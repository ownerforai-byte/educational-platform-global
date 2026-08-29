-- scripts/local_setup.sql
-- TEST-ONLY setup for Supabase local Postgres image.
-- Uses existing auth schema provided by the Supabase image.

-- Create app user role
do $$ begin
  create role appuser with login password 'testpass';
exception when duplicate_object then null;
end $$;
grant usage on schema public to appuser;
grant all on all tables in schema public to appuser;
grant all on all sequences in schema public to appuser;
grant execute on all functions in schema public to appuser;
alter default privileges in schema public grant all on tables to appuser;
alter default privileges in schema public grant all on sequences to appuser;
alter default privileges in schema public grant all on functions to appuser;

-- Seed test users
insert into auth.users (id, email, raw_user_meta_data) values
  ('11111111-1111-1111-1111-111111111111', 'owner@test.local', '{}'),
  ('22222222-2222-2222-2222-222222222222', 'student@test.local', '{}'),
  ('33333333-3333-3333-3333-333333333333', 'teacher@test.local', '{}')
on conflict (id) do nothing;

do $$ begin
  drop trigger if exists trg_enforce_role_change on public.profiles;
exception when others then null;
end $$;

-- Insert profiles for test users (bypass role enforcement for initial seed)
insert into public.profiles (id, full_name, role) values
  ('11111111-1111-1111-1111-111111111111', 'Owner Test', 'OWNER'),
  ('22222222-2222-2222-2222-222222222222', 'Student Test', 'STUDENT'),
  ('33333333-3333-3333-3333-333333333333', 'Teacher Test', 'TEACHER')
on conflict (id) do update set role = excluded.role;

-- Recreate role enforcement trigger after seed
create trigger trg_enforce_role_change
  before insert or update on public.profiles
  for each row execute function public.enforce_role_change();

-- ensure a published resource exists for anon-read tests
insert into resources (topic_id, type, content_type, title, is_published, content)
select id, 'NOTES', 'ORIGINAL', 'Published Dev Notes', true, '{"body":"test"}'::jsonb
from topics limit 1
on conflict do nothing;
