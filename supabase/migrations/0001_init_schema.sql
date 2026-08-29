-- ============================================================================
-- 0001_init_schema.sql
-- NEB Study Vault — initial schema (Phase 3 + Phase 5 database foundation)
-- Supabase PostgreSQL. Apply via Supabase CLI / SQL editor.
-- No Prisma. Relies on the existing Supabase `auth` schema (auth.users, auth.uid()).
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
do $$ begin
  create type user_role as enum ('STUDENT', 'TEACHER', 'ADMIN', 'OWNER');
exception when duplicate_object then null; end $$;

do $$ begin
  create type resource_type as enum
    ('SYLLABUS', 'MINDMAP', 'NOTES', 'NUMERICAL', 'FLASHCARD', 'QUIZ', 'VIDEO');
exception when duplicate_object then null; end $$;

do $$ begin
  create type content_type as enum ('ORIGINAL', 'REFERENCE', 'DERIVED');
exception when duplicate_object then null; end $$;

do $$ begin
  create type reference_type as enum ('INCLUDE', 'LINK', 'EMBED', 'CITE');
exception when duplicate_object then null; end $$;

do $$ begin
  create type premium_request_status as enum ('PENDING', 'APPROVED', 'REJECTED');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- Timestamp helper
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ===========================================================================
-- Curriculum hierarchy (data-driven: add levels/classes/subjects without code)
-- ===========================================================================
create table if not exists education_levels (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  description text,
  "order"     int default 0,
  is_active   boolean default true,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create table if not exists classes (
  id                  uuid primary key default gen_random_uuid(),
  education_level_id  uuid not null references education_levels(id) on delete cascade,
  slug                text not null,
  name                text not null,
  description         text,
  "order"             int default 0,
  is_active           boolean default true,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now(),
  unique (education_level_id, slug)
);

create table if not exists subjects (
  id             uuid primary key default gen_random_uuid(),
  class_id       uuid not null references classes(id) on delete cascade,
  slug           text not null,
  name           text not null,
  description    text,
  icon           text,
  "order"        int default 0,
  is_active      boolean default true,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now(),
  unique (class_id, slug)
);

create table if not exists chapters (
  id          uuid primary key default gen_random_uuid(),
  subject_id  uuid not null references subjects(id) on delete cascade,
  slug        text not null,
  title       text not null,
  description text,
  "order"     int default 0,
  is_active   boolean default true,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now(),
  unique (subject_id, slug)
);

create table if not exists topics (
  id          uuid primary key default gen_random_uuid(),
  chapter_id  uuid not null references chapters(id) on delete cascade,
  slug        text not null,
  title       text not null,
  description text,
  "order"     int default 0,
  is_active   boolean default true,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now(),
  unique (chapter_id, slug)
);

-- ===========================================================================
-- Resources + reusability (canonical / reference / derived)
-- ===========================================================================
create table if not exists resources (
  id                    uuid primary key default gen_random_uuid(),
  topic_id              uuid not null references topics(id) on delete cascade,
  type                  resource_type not null,
  content_type          content_type default 'ORIGINAL',
  canonical_resource_id uuid references resources(id) on delete set null,
  title                 text not null,
  content               jsonb,
  media_url             text,
  metadata              jsonb,
  is_published          boolean default false,
  created_by            uuid references auth.users(id),
  created_at            timestamptz default now(),
  updated_at            timestamptz default now(),
  -- Full-text search vector (PostgreSQL FTS; supports Phase 11)
  search_vector         tsvector
    generated always as (
      to_tsvector('english',
        coalesce(title, '') || ' ' || coalesce(content::text, ''))
    ) stored
);

create table if not exists resource_references (
  id            uuid primary key default gen_random_uuid(),
  resource_id   uuid not null references resources(id) on delete cascade,
  referenced_id uuid not null references resources(id) on delete cascade,
  reference_type reference_type not null,
  attribution   text,
  created_at    timestamptz default now(),
  unique (resource_id, referenced_id)
);

create table if not exists tags (
  id         uuid primary key default gen_random_uuid(),
  name       text unique not null,
  slug       text unique not null,
  created_at timestamptz default now()
);

create table if not exists resource_tags (
  id         uuid primary key default gen_random_uuid(),
  resource_id uuid not null references resources(id) on delete cascade,
  tag_id      uuid not null references tags(id) on delete cascade,
  unique (resource_id, tag_id)
);

-- ===========================================================================
-- Identity / profile (linked to Supabase auth.users)
-- ===========================================================================
create table if not exists profiles (
  id             uuid primary key references auth.users(id) on delete cascade,
  full_name      text,
  avatar_url     text,
  role           user_role default 'STUDENT',
  premium_status boolean default false,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

-- ===========================================================================
-- User activity
-- ===========================================================================
create table if not exists user_progress (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  topic_id     uuid not null references topics(id) on delete cascade,
  completed    boolean default false,
  completed_at timestamptz,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now(),
  unique (user_id, topic_id)
);

create table if not exists bookmarks (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  resource_id uuid not null references resources(id) on delete cascade,
  folder     text,
  notes      text,
  created_at timestamptz default now(),
  unique (user_id, resource_id)
);

create table if not exists flashcard_reviews (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  resource_id    uuid not null references resources(id) on delete cascade,
  quality        int,
  "interval"     int default 0,
  repetition     int default 0,
  ease_factor    float default 2.5,
  next_review_at timestamptz default now(),
  reviewed_at    timestamptz default now(),
  created_at     timestamptz default now()
);

create table if not exists quiz_attempts (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  resource_id  uuid not null references resources(id) on delete cascade,
  score        float,
  total        int,
  answers      jsonb,
  started_at   timestamptz,
  completed_at timestamptz,
  created_at   timestamptz default now()
);

-- ===========================================================================
-- Premium workflow + audit + settings
-- ===========================================================================
create table if not exists premium_requests (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  status      premium_request_status default 'PENDING',
  message     text,
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at  timestamptz default now()
);

create table if not exists audit_events (
  id          uuid primary key default gen_random_uuid(),
  actor_id    uuid references auth.users(id),
  action      text not null,
  entity_type text,
  entity_id   uuid,
  details     jsonb,
  created_at  timestamptz default now()
);

create table if not exists settings (
  id         uuid primary key default gen_random_uuid(),
  key        text unique not null,
  value      jsonb,
  updated_by uuid references auth.users(id),
  updated_at timestamptz default now()
);

-- ===========================================================================
-- Indexes (unique constraints already create indexes)
-- ===========================================================================
create index if not exists idx_classes_level        on classes(education_level_id);
create index if not exists idx_subjects_class       on subjects(class_id);
create index if not exists idx_chapters_subject     on chapters(subject_id);
create index if not exists idx_topics_chapter       on topics(chapter_id);
create index if not exists idx_resources_topic      on resources(topic_id);
create index if not exists idx_resources_type       on resources(type);
create index if not exists idx_resources_published  on resources(is_published);
create index if not exists idx_resources_canonical  on resources(canonical_resource_id);
create index if not exists idx_resources_search     on resources using gin(search_vector);
create index if not exists idx_resref_resource      on resource_references(resource_id);
create index if not exists idx_resref_referenced    on resource_references(referenced_id);
create index if not exists idx_restag_resource     on resource_tags(resource_id);
create index if not exists idx_restag_tag          on resource_tags(tag_id);
create index if not exists idx_progress_topic      on user_progress(topic_id);
create index if not exists idx_bookmarks_user      on bookmarks(user_id);
create index if not exists idx_flashcards_user     on flashcard_reviews(user_id, next_review_at);
create index if not exists idx_quiz_user           on quiz_attempts(user_id);
create index if not exists idx_premium_user_status on premium_requests(user_id, status);
create index if not exists idx_audit_actor         on audit_events(actor_id, created_at);

-- ===========================================================================
-- Updated-at triggers
-- ===========================================================================
create trigger trg_el_updated   before update on education_levels for each row execute function public.set_updated_at();
create trigger trg_classes_updated before update on classes for each row execute function public.set_updated_at();
create trigger trg_subjects_updated before update on subjects for each row execute function public.set_updated_at();
create trigger trg_chapters_updated before update on chapters for each row execute function public.set_updated_at();
create trigger trg_topics_updated before update on topics for each row execute function public.set_updated_at();
create trigger trg_resources_updated before update on resources for each row execute function public.set_updated_at();
create trigger trg_profiles_updated before update on profiles for each row execute function public.set_updated_at();
create trigger trg_premium_updated before update on premium_requests for each row execute function public.set_updated_at();
create trigger trg_settings_updated before update on settings for each row execute function public.set_updated_at();
