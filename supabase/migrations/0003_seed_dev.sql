-- ============================================================================
-- 0003_seed_dev.sql
-- DEVELOPMENT / TEST DATA ONLY.
-- This is NOT official NEB content. It exists solely to exercise the schema,
-- relationships, and RLS during local verification. Do not use in production.
-- All seeded rows are flagged is_active = false / is_published = false.
-- ============================================================================

insert into education_levels (slug, name, description, is_active)
values ('dev-level', 'DevTest Education Level', 'DEV/TEST DATA — not official NEB content', false);

insert into classes (education_level_id, slug, name, description, is_active)
select id, 'dev-class-11', 'DevTest Class 11', 'DEV/TEST DATA — not official NEB content', false
from education_levels where slug = 'dev-level';

insert into subjects (class_id, slug, name, description, is_active)
select id, 'dev-physics', 'DevTest Physics', 'DEV/TEST DATA — not official NEB content', false
from classes where slug = 'dev-class-11';

insert into chapters (subject_id, slug, title, description, is_active)
select id, 'dev-mechanics', 'DevTest Mechanics', 'DEV/TEST DATA — not official NEB content', false
from subjects where slug = 'dev-physics';

insert into topics (chapter_id, slug, title, description, is_active)
select id, 'dev-topic', 'DevTest Topic', 'DEV/TEST DATA — not official NEB content', false
from chapters where slug = 'dev-mechanics';

insert into resources (topic_id, type, content_type, title, content, is_published)
select id, 'NOTES', 'ORIGINAL', 'DevTest Notes',
       '{"body":"DEV/TEST DATA — not official NEB content."}'::jsonb, false
from topics where slug = 'dev-topic';

-- Protected settings placeholder (replace via protected settings UI / OWNER)
insert into settings (key, value)
values ('owner_contact',
        '{"email":"dev@example.com","note":"DEV/TEST SETTING — replace via protected settings UI"}'::jsonb)
on conflict (key) do nothing;
