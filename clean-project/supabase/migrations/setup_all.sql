-- ============================================================================
-- NEB Study Vault — Complete Database Setup (SAFE ORDER)
-- Run ONCE in Supabase SQL Editor: https://supabase.com/dashboard/project/tsvbksfegvdjwczzfdcx/sql/new
-- ============================================================================

drop schema if exists public cascade;
create schema public;
grant all on schema public to postgres, anon, authenticated, service_role;

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- ENUMS (must be before tables that use them)
-- ---------------------------------------------------------------------------
do $$ begin
  create type public.user_role as enum ('STUDENT', 'TEACHER', 'ADMIN', 'OWNER');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.resource_type as enum ('SYLLABUS','MINDMAP','NOTES','NUMERICAL','FLASHCARD','QUIZ','VIDEO');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.content_type as enum ('ORIGINAL','REFERENCE','DERIVED');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.reference_type as enum ('INCLUDE','LINK','EMBED','CITE');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.premium_request_status as enum ('PENDING','APPROVED','REJECTED');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- HELPER FUNCTIONS (defined here, will work after profiles table exists)
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

-- These functions use dynamic SQL so they don't fail at creation time
create or replace function public.is_owner() returns boolean as $$
  declare result boolean;
  begin
    execute 'select exists (select 1 from auth.users u join public.profiles p on p.id = u.id where p.role = ''OWNER'' and u.id = auth.uid())' into result;
    return result;
  end;
$$ language plpgsql security definer;

create or replace function public.is_admin() returns boolean as $$
  declare result boolean;
  begin
    execute 'select exists (select 1 from auth.users u join public.profiles p on p.id = u.id where p.role in (''OWNER'',''ADMIN'') and u.id = auth.uid())' into result;
    return result;
  end;
$$ language plpgsql security definer;

create or replace function public.get_user_role() returns text as $$
  declare r text;
  begin
    execute 'select coalesce((select role::text from public.profiles where id = auth.uid()), ''GUEST'')' into r;
    return r;
  end;
$$ language plpgsql security definer;

-- ---------------------------------------------------------------------------
-- TABLES
-- ---------------------------------------------------------------------------
create table if not exists education_levels (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  "order" int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists classes (
  id uuid primary key default gen_random_uuid(),
  education_level_id uuid not null references education_levels(id) on delete cascade,
  slug text not null,
  name text not null,
  description text,
  "order" int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (education_level_id, slug)
);

create table if not exists subjects (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references classes(id) on delete cascade,
  slug text not null,
  name text not null,
  description text,
  icon text,
  "order" int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (class_id, slug)
);

create table if not exists chapters (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references subjects(id) on delete cascade,
  slug text not null,
  title text not null,
  description text,
  "order" int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (subject_id, slug)
);

create table if not exists topics (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references chapters(id) on delete cascade,
  slug text not null,
  title text not null,
  description text,
  "order" int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (chapter_id, slug)
);

create table if not exists resources (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references topics(id) on delete cascade,
  type resource_type not null,
  content_type content_type default 'ORIGINAL',
  canonical_resource_id uuid references resources(id) on delete set null,
  title text not null,
  content jsonb,
  media_url text,
  metadata jsonb,
  is_published boolean default false,
  created_by uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists resource_references (
  id uuid primary key default gen_random_uuid(),
  resource_id uuid not null references resources(id) on delete cascade,
  referenced_id uuid not null references resources(id) on delete cascade,
  reference_type reference_type not null,
  attribution text,
  created_at timestamptz default now(),
  unique (resource_id, referenced_id)
);

create table if not exists tags (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  slug text unique not null,
  created_at timestamptz default now()
);

create table if not exists resource_tags (
  id uuid primary key default gen_random_uuid(),
  resource_id uuid not null references resources(id) on delete cascade,
  tag_id uuid not null references tags(id) on delete cascade,
  unique (resource_id, tag_id)
);

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role user_role default 'STUDENT',
  premium_status boolean default false,
  credits int not null default 0,
  credits_limit int default 100,
  premium_approved_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_id uuid not null references topics(id) on delete cascade,
  completed boolean default false,
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id, topic_id)
);

create table if not exists bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  resource_id uuid not null references resources(id) on delete cascade,
  folder text,
  notes text,
  created_at timestamptz default now(),
  unique (user_id, resource_id)
);

create table if not exists flashcard_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  resource_id uuid not null references resources(id) on delete cascade,
  quality int,
  "interval" int default 0,
  repetition int default 0,
  ease_factor float default 2.5,
  next_review_at timestamptz default now(),
  reviewed_at timestamptz default now(),
  created_at timestamptz default now()
);

create table if not exists quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  resource_id uuid not null references resources(id) on delete cascade,
  score float,
  total int,
  answers jsonb,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists premium_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status premium_request_status default 'PENDING',
  message text,
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id),
  action text not null,
  entity_type text,
  entity_id uuid,
  details jsonb,
  created_at timestamptz default now()
);

create table if not exists settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb,
  updated_by uuid references auth.users(id),
  updated_at timestamptz default now()
);

create table if not exists credit_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  actor_id uuid references auth.users(id),
  amount int not null,
  type text not null check (type in ('GRANT','SPEND','ADJUST')),
  reason text,
  reference_id uuid,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- INDEXES
-- ---------------------------------------------------------------------------
create index if not exists idx_classes_level on classes(education_level_id);
create index if not exists idx_subjects_class on subjects(class_id);
create index if not exists idx_chapters_subject on chapters(subject_id);
create index if not exists idx_topics_chapter on topics(chapter_id);
create index if not exists idx_resources_topic on resources(topic_id);
create index if not exists idx_resources_published on resources(is_published);
create index if not exists idx_progress_topic on user_progress(topic_id);
create index if not exists idx_bookmarks_user on bookmarks(user_id);
create index if not exists idx_premium_user_status on premium_requests(user_id, status);
create index if not exists idx_audit_actor on audit_events(actor_id, created_at);
create index if not exists idx_credit_tx_user on credit_transactions(user_id);
create index if not exists idx_credit_tx_actor on credit_transactions(actor_id);

-- ---------------------------------------------------------------------------
-- TRIGGERS
-- ---------------------------------------------------------------------------
create trigger trg_el_updated before update on education_levels for each row execute function public.set_updated_at();
create trigger trg_classes_updated before update on classes for each row execute function public.set_updated_at();
create trigger trg_subjects_updated before update on subjects for each row execute function public.set_updated_at();
create trigger trg_chapters_updated before update on chapters for each row execute function public.set_updated_at();
create trigger trg_topics_updated before update on topics for each row execute function public.set_updated_at();
create trigger trg_resources_updated before update on resources for each row execute function public.set_updated_at();
create trigger trg_profiles_updated before update on profiles for each row execute function public.set_updated_at();
create trigger trg_premium_updated before update on premium_requests for each row execute function public.set_updated_at();
create trigger trg_settings_updated before update on settings for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS POLICIES
-- ---------------------------------------------------------------------------
alter table profiles enable row level security;
alter table user_progress enable row level security;
alter table bookmarks enable row level security;
alter table flashcard_reviews enable row level security;
alter table quiz_attempts enable row level security;
alter table premium_requests enable row level security;
alter table credit_transactions enable row level security;
alter table resources enable row level security;

create policy profiles_select on profiles for select to authenticated using (true);
create policy profiles_update on profiles for update to authenticated using (public.is_owner() or public.is_admin()) with check (public.is_owner() or public.is_admin());

create policy progress_select on user_progress for select to authenticated using (user_id = auth.uid());
create policy progress_insert on user_progress for insert to authenticated with check (user_id = auth.uid());
create policy progress_update on user_progress for update to authenticated using (user_id = auth.uid());

create policy bookmarks_select on bookmarks for select to authenticated using (user_id = auth.uid());
create policy bookmarks_insert on bookmarks for insert to authenticated with check (user_id = auth.uid());
create policy bookmarks_delete on bookmarks for delete to authenticated using (user_id = auth.uid());

create policy premium_select on premium_requests for select to authenticated using (true);
create policy premium_insert on premium_requests for insert to authenticated with check (user_id = auth.uid());

create policy ct_select on credit_transactions for select to authenticated using (public.is_owner() or public.is_admin() or user_id = auth.uid());
create policy ct_insert on credit_transactions for insert to authenticated with check (public.is_owner() or public.is_admin());

create policy resources_select on resources for select to authenticated using (is_published = true or created_by = auth.uid());
create policy resources_insert on resources for insert to authenticated with check (created_by = auth.uid());

-- ---------------------------------------------------------------------------
-- CREDIT / PREMIUM FUNCTIONS
-- ---------------------------------------------------------------------------
create or replace function public.adjust_user_credits(target_user_id uuid, amount int, actor_id uuid, reason text)
returns void language plpgsql security definer as $$
begin
  if not (select exists (select 1 from public.profiles where id = actor_id and role in ('OWNER','ADMIN'))) then
    raise exception 'Only owners or admins can adjust credits';
  end if;
  update public.profiles set credits = GREATEST(0, credits + amount) where id = target_user_id;
  insert into public.credit_transactions (user_id, actor_id, amount, type, reason)
  values (target_user_id, actor_id, amount, case when amount > 0 then 'GRANT' else 'ADJUST' end, reason);
end;
$$;

create or replace function public.request_premium(user_id uuid, message text) returns uuid
language plpgsql security definer as $$
declare request_id uuid;
begin
  insert into public.premium_requests (user_id, message, status)
  values (user_id, message, 'PENDING') returning id into request_id;
  return request_id;
end;
$$;

create or replace function public.approve_premium_request(request_id uuid, actor_id uuid) returns void
language plpgsql security definer as $$
declare req_record record;
begin
  select * into req_record from public.premium_requests where id = request_id and status = 'PENDING';
  if not found then raise exception 'Premium request not found or already processed'; end if;
  if not (select exists (select 1 from public.profiles where id = actor_id and role = 'OWNER')) then
    raise exception 'Only owners can approve premium requests';
  end if;
  update public.premium_requests set status = 'APPROVED', reviewed_by = actor_id, reviewed_at = now() where id = request_id;
  update public.profiles set premium_status = true, premium_approved_at = now() where id = req_record.user_id;
  insert into public.credit_transactions (user_id, actor_id, amount, type, reason, reference_id)
  values (req_record.user_id, actor_id, 500, 'GRANT', 'Premium approved', request_id);
end;
$$;

create or replace function public.reject_premium_request(request_id uuid, actor_id uuid) returns void
language plpgsql security definer as $$
begin
  update public.premium_requests set status = 'REJECTED', reviewed_by = actor_id, reviewed_at = now() where id = request_id and status = 'PENDING';
end;
$$;

-- ---------------------------------------------------------------------------
-- SEED DATA
-- ---------------------------------------------------------------------------
insert into education_levels (slug, name, description, "order", is_active) values
  ('neb', 'NEB (+2)', 'National Examination Board — Class 11 & 12', 1, true),
  ('loksewa', 'Loksewa Prep', 'Public Service Commission exam preparation', 2, true);

insert into classes (slug, name, education_level_id, "order", is_active)
select 'class-11', 'Class 11', id, 1, true from education_levels where slug = 'neb';

insert into classes (slug, name, education_level_id, "order", is_active)
select 'class-12', 'Class 12', id, 2, true from education_levels where slug = 'neb';

insert into subjects (slug, name, class_id, "order", is_active)
select 'physics', 'Physics', c.id, 1, true from classes c where c.slug = 'class-11';

insert into subjects (slug, name, class_id, "order", is_active)
select 'chemistry', 'Chemistry', c.id, 2, true from classes c where c.slug = 'class-11';

insert into subjects (slug, name, class_id, "order", is_active)
select 'mathematics', 'Mathematics', c.id, 3, true from classes c where c.slug = 'class-11';

insert into subjects (slug, name, class_id, "order", is_active)
select 'nepali', 'Nepali', c.id, 4, true from classes c where c.slug = 'class-11';

insert into subjects (slug, name, class_id, "order", is_active)
select 'english', 'English', c.id, 5, true from classes c where c.slug = 'class-11';

insert into subjects (slug, name, class_id, "order", is_active)
select 'biology', 'Biology', c.id, 6, true from classes c where c.slug = 'class-11';

insert into subjects (slug, name, class_id, "order", is_active)
select 'physics', 'Physics', c.id, 1, true from classes c where c.slug = 'class-12';

insert into subjects (slug, name, class_id, "order", is_active)
select 'chemistry', 'Chemistry', c.id, 2, true from classes c where c.slug = 'class-12';

insert into subjects (slug, name, class_id, "order", is_active)
select 'mathematics', 'Mathematics', c.id, 3, true from classes c where c.slug = 'class-12';

insert into subjects (slug, name, class_id, "order", is_active)
select 'nepali', 'Nepali', c.id, 4, true from classes c where c.slug = 'class-12';

insert into subjects (slug, name, class_id, "order", is_active)
select 'english', 'English', c.id, 5, true from classes c where c.slug = 'class-12';

insert into subjects (slug, name, class_id, "order", is_active)
select 'biology', 'Biology', c.id, 6, true from classes c where c.slug = 'class-12';

insert into profiles (id, full_name, role, credits, credits_limit, premium_status)
values
  ('167a3dc8-d3d2-45b6-ad35-c0a681cc8342', 'Harindra Sah', 'OWNER', 99999999, 99999999, true),
  ('feeade42-b902-4f4d-8b07-e96f093d8fbd', 'Yash Sah', 'OWNER', 99999999, 99999999, true),
  ('05874f64-b839-4079-9bba-b7a24c66a8ef', 'Sah Rocky', 'OWNER', 99999999, 99999999, true),
  ('ae7c9a35-4a94-469a-b725-34cc0bed784c', 'Ravi Kisan', 'OWNER', 99999999, 99999999, true),
  ('0735ec93-73a3-48b9-88f7-3d029c651130', 'Plane Photo', 'OWNER', 99999999, 99999999, true);

insert into settings (key, value) values
  ('owner_contact', '{"email":"ravikishan1814@gmail.com","name":"Ravi Kisan"}'),
  ('platform_name', '"Ravikisan''s Platform"');

-- ---------------------------------------------------------------------------
-- GRANT permissions — required after RLS policies
-- ---------------------------------------------------------------------------
grant all on schema public to postgres, anon, authenticated, service_role;
grant all on all tables in schema public to postgres, anon, authenticated, service_role;
grant all on all sequences in schema public to postgres, anon, authenticated, service_role;
grant all on all functions in schema public to postgres, authenticated, service_role;
alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on functions to postgres, authenticated, service_role;

select 'SUCCESS: Database setup complete!' as status;
