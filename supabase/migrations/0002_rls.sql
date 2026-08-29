-- ============================================================================
-- 0002_rls.sql
-- NEB Study Vault — Row Level Security + server-side authorization
-- Supabase PostgreSQL. Apply after 0001_init_schema.sql.
-- RLS is the PRIMARY authorization boundary. Frontend role checks are UX only.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Role helper functions (SECURITY DEFINER to read profiles without recursion)
-- ---------------------------------------------------------------------------
create or replace function public.current_role()
returns user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_content_manager()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('TEACHER', 'ADMIN', 'OWNER')
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('ADMIN', 'OWNER')
  );
$$;

create or replace function public.is_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'OWNER'
  );
$$;

-- ---------------------------------------------------------------------------
-- New-user signup: auto-create profile with STUDENT role (never OWNER/ADMIN/TEACHER)
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Prevent privilege escalation: only OWNER may change roles; inserts must be STUDENT
-- ---------------------------------------------------------------------------
create or replace function public.enforce_role_change()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' and new.role <> 'STUDENT' then
    raise exception 'New profiles must default to the STUDENT role.';
  end if;
  if tg_op = 'UPDATE' and new.role is distinct from old.role then
    if not public.is_owner() then
      raise exception 'Only an OWNER may change user roles.';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_enforce_role_change on public.profiles;
create trigger trg_enforce_role_change
  before insert or update on public.profiles
  for each row execute function public.enforce_role_change();

-- ===========================================================================
-- Enable RLS on every table
-- ===========================================================================
alter table education_levels enable row level security;
alter table classes           enable row level security;
alter table subjects          enable row level security;
alter table chapters          enable row level security;
alter table topics            enable row level security;
alter table resources         enable row level security;
alter table resource_references enable row level security;
alter table tags              enable row level security;
alter table resource_tags     enable row level security;
alter table profiles          enable row level security;
alter table user_progress     enable row level security;
alter table bookmarks         enable row level security;
alter table flashcard_reviews enable row level security;
alter table quiz_attempts     enable row level security;
alter table premium_requests  enable row level security;
alter table audit_events      enable row level security;
alter table settings          enable row level security;

-- ===========================================================================
-- Curriculum catalog: public read; writes require content-manager
-- ===========================================================================
create policy el_select on education_levels for select using (true);
create policy el_write  on education_levels for all to authenticated
  using (public.is_content_manager()) with check (public.is_content_manager());

create policy cl_select on classes for select using (true);
create policy cl_write  on classes for all to authenticated
  using (public.is_content_manager()) with check (public.is_content_manager());

create policy su_select on subjects for select using (true);
create policy su_write  on subjects for all to authenticated
  using (public.is_content_manager()) with check (public.is_content_manager());

create policy ch_select on chapters for select using (true);
create policy ch_write  on chapters for all to authenticated
  using (public.is_content_manager()) with check (public.is_content_manager());

create policy to_select on topics for select using (true);
create policy to_write  on topics for all to authenticated
  using (public.is_content_manager()) with check (public.is_content_manager());

-- ===========================================================================
-- Resources: published are public; authors/admins see their own; only managers write
-- ===========================================================================
create policy res_select on resources for select using (
  is_published
  or created_by = auth.uid()
  or public.is_content_manager()
);
create policy res_insert on resources for insert to authenticated
  with check (public.is_content_manager() and (created_by is null or created_by = auth.uid()));
create policy res_update on resources for update to authenticated
  using (public.is_content_manager()) with check (public.is_content_manager());
create policy res_delete on resources for delete to authenticated
  using (public.is_content_manager());

create policy rr_select on resource_references for select using (true);
create policy rr_write  on resource_references for all to authenticated
  using (public.is_content_manager()) with check (public.is_content_manager());

create policy tg_select on tags for select using (true);
create policy tg_write  on tags for all to authenticated
  using (public.is_content_manager()) with check (public.is_content_manager());

create policy rt_select on resource_tags for select using (true);
create policy rt_write  on resource_tags for all to authenticated
  using (public.is_content_manager()) with check (public.is_content_manager());

-- ===========================================================================
-- Profiles: self or admin read; self or admin update; admin delete
-- (role changes further constrained by trg_enforce_role_change)
-- ===========================================================================
create policy prof_select on profiles for select using (id = auth.uid() or public.is_admin());
create policy prof_update on profiles for update to authenticated
  using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());
create policy prof_insert on profiles for insert to authenticated with check (id = auth.uid());
create policy prof_delete on profiles for delete to authenticated
  using (public.is_admin());

-- ===========================================================================
-- User-owned data: row owner only
-- ===========================================================================
create policy up_all on user_progress for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy bm_all on bookmarks for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy fr_all on flashcard_reviews for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy qa_all on quiz_attempts for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ===========================================================================
-- Premium requests: own row readable/creatable; only admin reviews
-- ===========================================================================
create policy pr_select on premium_requests for select using (user_id = auth.uid() or public.is_admin());
create policy pr_insert on premium_requests for insert to authenticated with check (user_id = auth.uid());
create policy pr_update on premium_requests for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
create policy pr_delete on premium_requests for delete to authenticated
  using (public.is_admin());

-- ===========================================================================
-- Audit + settings: admin-only read; audit writable by any authenticated user
-- (audit write will be tightened in Phase 12)
-- ===========================================================================
create policy ae_select on audit_events for select using (public.is_admin());
create policy ae_insert on audit_events for insert to authenticated with check (true);

create policy set_select on settings for select using (public.is_admin());
create policy set_write  on settings for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
