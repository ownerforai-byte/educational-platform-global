-- scripts/local_tests.sql
-- Run as testuser (non-superuser, member of authenticated) to verify RLS, relationships, unauthorized rejection.
-- Uses Supabase auth.uid() which reads request.jwt.claim.sub

-- Helper: set simulated logged-in user via Supabase JWT sub claim
\set jwt_sub `echo "select set_config('request.jwt.claim.sub', '\''%s\''', false);" | sed 's/\\"/''/g'`

-- 1. Relationships: FK violation rejected
do $$
begin
  perform set_config('request.jwt.claim.sub', '33333333-3333-3333-3333-333333333333', false);
  begin
    insert into topics (chapter_id, slug, title) values ('00000000-0000-0000-0000-000000000000', 'bad-topic', 'Bad');
    raise notice '[RELATIONSHIPS] FAIL: FK violation accepted';
  exception when foreign_key_violation then
    raise notice '[RELATIONSHIPS] PASS: FK violation rejected';
  end;
end; $$;

-- 2. Unique constraint
do $$
declare
  v_level_id uuid;
begin
  select id into v_level_id from education_levels limit 1;
  perform set_config('request.jwt.claim.sub', '33333333-3333-3333-3333-333333333333', false);
  insert into classes (education_level_id, slug, name) values (v_level_id, 'dup-class-test', 'Dup');
  begin
    insert into classes (education_level_id, slug, name) values (v_level_id, 'dup-class-test', 'Dup2');
    raise notice '[RELATIONSHIPS] FAIL: duplicate slug accepted';
  exception when unique_violation then
    raise notice '[RELATIONSHIPS] PASS: duplicate slug rejected';
  end;
end; $$;

-- 3. Anon cannot see unpublished resources
do $$
declare
  v_count int;
begin
  perform set_config('request.jwt.claim.sub', '', false);
  select count(*) into v_count from resources where is_published = false;
  assert v_count = 0, 'Anon saw unpublished resources';
  raise notice '[RLS-ANON] PASS: unpublished resources hidden from anon';
exception when others then
  raise notice '[RLS-ANON] FAIL: %', SQLERRM;
end; $$;

-- 4. Anon CAN see published resources
do $$
declare
  v_count int;
begin
  perform set_config('request.jwt.claim.sub', '', false);
  select count(*) into v_count from resources where is_published;
  assert v_count >= 1, 'Anon cannot see published resources';
  raise notice '[RLS-ANON] PASS: published resource visible to anon';
exception when others then
  raise notice '[RLS-ANON] FAIL: %', SQLERRM;
end; $$;

-- 5. Student manages own progress only
do $$
declare
  v_topic_id uuid;
begin
  perform set_config('request.jwt.claim.sub', '22222222-2222-2222-2222-222222222222', false);
  select id into v_topic_id from topics limit 1;
  insert into user_progress (user_id, topic_id, completed)
  values ('22222222-2222-2222-2222-222222222222', v_topic_id, true);
  raise notice '[RLS-STUDENT] PASS: student can insert own progress';
exception when others then
  raise notice '[RLS-STUDENT] FAIL: %', SQLERRM;
end; $$;

do $$
declare
  v_topic_id uuid;
begin
  perform set_config('request.jwt.claim.sub', '22222222-2222-2222-2222-222222222222', false);
  select id into v_topic_id from topics limit 1;
  begin
    insert into user_progress (user_id, topic_id, completed)
    values ('33333333-3333-3333-3333-333333333333', v_topic_id, true);
    raise notice '[RLS-STUDENT] FAIL: student inserted progress for another user';
  exception when others then
    raise notice '[RLS-STUDENT] PASS: student blocked from other users progress';
  end;
end; $$;

-- 6. Teacher can insert resource; student cannot
do $$
declare
  v_topic_id uuid;
begin
  perform set_config('request.jwt.claim.sub', '33333333-3333-3333-3333-333333333333', false);
  select id into v_topic_id from topics limit 1;
  insert into resources (topic_id, type, title, is_published)
  values (v_topic_id, 'NOTES', 'Teacher Note', false);
  raise notice '[RLS-TEACHER] PASS: teacher can insert resource';
exception when others then
  raise notice '[RLS-TEACHER] FAIL: %', SQLERRM;
end; $$;

do $$
declare
  v_topic_id uuid;
begin
  perform set_config('request.jwt.claim.sub', '22222222-2222-2222-2222-222222222222', false);
  select id into v_topic_id from topics limit 1;
  begin
    insert into resources (topic_id, type, title, is_published)
    values (v_topic_id, 'NOTES', 'Student Note', false);
    raise notice '[RLS-TEACHER] FAIL: student inserted resource';
  exception when others then
    raise notice '[RLS-TEACHER] PASS: student blocked from inserting resource';
  end;
end; $$;

-- 7. Role escalation blocked
do $$
begin
  perform set_config('request.jwt.claim.sub', '22222222-2222-2222-2222-222222222222', false);
  begin
    update public.profiles set role = 'OWNER' where id = '22222222-2222-2222-2222-222222222222';
    raise notice '[RLS-ROLE] FAIL: student escalated to OWNER';
  exception when others then
    raise notice '[RLS-ROLE] PASS: student role escalation blocked';
  end;
end; $$;

-- 8. Unauthorized: anon cannot read profiles of others
do $$
declare
  v_count int;
begin
  perform set_config('request.jwt.claim.sub', '', false);
  select count(*) into v_count from public.profiles where role = 'OWNER';
  assert v_count = 0, 'Anon read profiles';
  raise notice '[RLS-ANON] PASS: anon cannot read profiles';
exception when others then
  raise notice '[RLS-ANON] FAIL: %', SQLERRM;
end; $$;

-- 9. Teacher can read own unpublished resource; student cannot
do $$
declare
  v_count int;
  v_res_id uuid;
begin
  perform set_config('request.jwt.claim.sub', '33333333-3333-3333-3333-333333333333', false);
  select id into v_res_id from resources where created_by = '33333333-3333-3333-3333-333333333333' limit 1;
  if v_res_id is null then
    raise notice '[RLS-TEACHER] SKIP: no teacher resource found';
    return;
  end if;
  select count(*) into v_count from resources where id = v_res_id;
  assert v_count = 1, 'Teacher cannot read own unpublished resource';
  raise notice '[RLS-TEACHER] PASS: teacher can read own unpublished resource';
exception when others then
  raise notice '[RLS-TEACHER] FAIL: %', SQLERRM;
end; $$;

do $$
declare
  v_count int;
  v_res_id uuid;
begin
  perform set_config('request.jwt.claim.sub', '22222222-2222-2222-2222-222222222222', false);
  select id into v_res_id from resources where created_by = '33333333-3333-3333-3333-333333333333' and is_published = false limit 1;
  if v_res_id is null then
    raise notice '[RLS-STUDENT] SKIP: no unpublished teacher resource found';
    return;
  end if;
  select count(*) into v_count from resources where id = v_res_id;
  assert v_count = 0, 'Student read unpublished teacher resource';
  raise notice '[RLS-STUDENT] PASS: student blocked from reading unpublished teacher resource';
exception when others then
  raise notice '[RLS-STUDENT] FAIL: %', SQLERRM;
end; $$;
