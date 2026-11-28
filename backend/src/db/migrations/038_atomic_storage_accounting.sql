-- 038_atomic_storage_accounting.sql
-- Serialize quota reservations and ledger changes on the owner's profile row.
-- Forward-only; not applied automatically by tests or local validation.

create or replace function public.adjust_storage_object(
  p_mode text,
  p_owner_id text,
  p_path text,
  p_byte_size bigint,
  p_limit_bytes bigint,
  p_old_path text default null
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_profile public.profiles%rowtype;
  v_existing public.storage_objects%rowtype;
  v_old public.storage_objects%rowtype;
  v_used bigint;
  v_limit bigint;
  v_prior bigint := 0;
  v_old_bytes bigint := 0;
  v_delta bigint;
  v_projected bigint;
  v_refs integer;
  v_target_found boolean;
  v_now timestamptz := pg_catalog.clock_timestamp();
begin
  if current_user is distinct from 'service_role' then
    raise exception insufficient_privilege using message = 'service_role required';
  end if;
  if p_mode not in ('reserve', 'account', 'release', 'replace', 'promote') then
    return pg_catalog.jsonb_build_object('ok', false, 'reason', 'invalid_mode');
  end if;
  if p_owner_id is null or p_path is null or pg_catalog.char_length(p_path) = 0 then
    return pg_catalog.jsonb_build_object('ok', false, 'reason', 'invalid_path');
  end if;
  if p_mode <> 'release' and (p_byte_size is null or p_byte_size < 0 or p_byte_size > 2147483647) then
    return pg_catalog.jsonb_build_object('ok', false, 'reason', 'invalid_size');
  end if;

  select * into v_profile
  from public.profiles
  where id = p_owner_id
  for update;
  if not found then
    return pg_catalog.jsonb_build_object('ok', false, 'reason', 'missing_profile');
  end if;

  v_used := greatest(0, coalesce(v_profile.storage_used_bytes, 0));
  v_limit := coalesce(v_profile.storage_limit_bytes, p_limit_bytes, 9223372036854775807);
  if v_limit < 0 then
    return pg_catalog.jsonb_build_object('ok', false, 'reason', 'invalid_limit');
  end if;

  select * into v_existing
  from public.storage_objects
  where path = p_path and owner_id = p_owner_id;
  v_target_found := found;
  if not v_target_found then
    select * into v_existing
    from public.storage_objects
    where path = p_path;
    if found then
      return pg_catalog.jsonb_build_object('ok', false, 'reason', 'owner_mismatch');
    end if;
  end if;

  if p_mode = 'release' then
    if not v_target_found then
      return pg_catalog.jsonb_build_object('ok', true, 'reason', 'not_found', 'used_bytes', v_used, 'ref_count', 0);
    end if;
    v_refs := greatest(1, coalesce(v_existing.ref_count, 1));
    if v_refs > 1 then
      update public.storage_objects
      set ref_count = v_refs - 1, updated_at = v_now
      where path = p_path and owner_id = p_owner_id;
      v_refs := v_refs - 1;
    else
      delete from public.storage_objects where path = p_path and owner_id = p_owner_id;
      v_used := greatest(0, v_used - coalesce(v_existing.byte_size, 0));
      update public.profiles set storage_used_bytes = v_used where id = p_owner_id;
      v_refs := 0;
    end if;
    return pg_catalog.jsonb_build_object('ok', true, 'used_bytes', v_used, 'ref_count', v_refs);
  end if;

  v_prior := coalesce(v_existing.byte_size, 0);

  if p_mode = 'promote' then
    if p_old_path is null or p_old_path = '' then
      return pg_catalog.jsonb_build_object('ok', false, 'reason', 'invalid_path');
    end if;
    select * into v_old
    from public.storage_objects
    where path = p_old_path and owner_id = p_owner_id;
    if not found then
      return pg_catalog.jsonb_build_object('ok', false, 'reason', 'missing_source');
    end if;
    if p_path = p_old_path then
      return pg_catalog.jsonb_build_object('ok', false, 'reason', 'invalid_path');
    end if;
    if v_target_found then
      return pg_catalog.jsonb_build_object('ok', false, 'reason', 'target_exists');
    end if;
    v_delta := p_byte_size - coalesce(v_old.byte_size, 0);
    if v_used + v_delta > v_limit then
      return pg_catalog.jsonb_build_object('ok', false, 'reason', 'quota', 'used_bytes', v_used, 'ref_count', v_old.ref_count);
    end if;
    update public.storage_objects
    set path = p_path, byte_size = p_byte_size, updated_at = v_now
    where path = p_old_path and owner_id = p_owner_id;
    v_used := v_used + v_delta;
    update public.profiles set storage_used_bytes = v_used where id = p_owner_id;
    return pg_catalog.jsonb_build_object('ok', true, 'used_bytes', v_used, 'ref_count', coalesce(v_old.ref_count, 1), 'byte_size', p_byte_size, 'path', p_path);
  end if;

  if p_mode = 'replace' and nullif(p_old_path, '') is not null and p_old_path <> p_path then
    select * into v_old
    from public.storage_objects
    where path = p_old_path and owner_id = p_owner_id;
    if not found then
      select * into v_old
      from public.storage_objects
      where path = p_old_path;
      if found then
        return pg_catalog.jsonb_build_object('ok', false, 'reason', 'owner_mismatch');
      end if;
      v_old_bytes := 0;
    else
      v_old_bytes := case when coalesce(v_old.ref_count, 1) <= 1 then coalesce(v_old.byte_size, 0) else 0 end;
    end if;
  end if;

  if p_mode = 'replace' and p_old_path = p_path then
    p_mode := 'account';
  end if;

  if v_target_found and p_mode = 'reserve' then
    if coalesce(v_existing.ref_count, 1) >= 2147483647 then
      return pg_catalog.jsonb_build_object('ok', false, 'reason', 'ref_overflow');
    end if;
    v_refs := coalesce(v_existing.ref_count, 1) + 1;
  elsif v_target_found then
    v_refs := greatest(1, coalesce(v_existing.ref_count, 1));
  else
    v_refs := 1;
  end if;

  v_delta := p_byte_size - v_prior;
  v_projected := v_used + v_delta - v_old_bytes;
  if v_projected > v_limit then
    return pg_catalog.jsonb_build_object('ok', false, 'reason', 'quota', 'used_bytes', v_used, 'ref_count', v_refs);
  end if;

  if v_target_found then
    update public.storage_objects
    set byte_size = p_byte_size, ref_count = v_refs, updated_at = v_now
    where path = p_path and owner_id = p_owner_id;
  else
    insert into public.storage_objects(path, owner_id, byte_size, ref_count, created_at, updated_at)
    values (p_path, p_owner_id, p_byte_size, v_refs, v_now, v_now);
  end if;
  if v_delta <> 0 then
    v_used := greatest(0, v_used + v_delta);
    update public.profiles set storage_used_bytes = v_used where id = p_owner_id;
  end if;

  return pg_catalog.jsonb_build_object('ok', true, 'used_bytes', v_used, 'ref_count', v_refs, 'byte_size', p_byte_size, 'path', p_path);
end;
$$;

revoke all on function public.adjust_storage_object(text, text, text, bigint, bigint, text) from public, anon, authenticated;
grant execute on function public.adjust_storage_object(text, text, text, bigint, bigint, text) to service_role;
