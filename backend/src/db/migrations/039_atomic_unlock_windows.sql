-- 039_atomic_unlock_windows.sql
-- Merge concurrent content unlocks under a per-profile row lock.
-- Forward-only; not applied automatically by tests or local validation.

create or replace function public.add_content_unlock_window(
  p_user_id text,
  p_identity_key text,
  p_expires_at bigint
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_windows jsonb;
begin
  if current_user is distinct from 'service_role' then
    raise exception insufficient_privilege using message = 'service_role required';
  end if;
  if p_user_id is null or pg_catalog.char_length(p_user_id) = 0 then
    return pg_catalog.jsonb_build_object('ok', false, 'reason', 'invalid_user');
  end if;
  if p_identity_key is null or pg_catalog.char_length(p_identity_key) = 0 or pg_catalog.char_length(p_identity_key) > 512 then
    return pg_catalog.jsonb_build_object('ok', false, 'reason', 'invalid_identity');
  end if;
  if p_expires_at is null or p_expires_at <= 0 then
    return pg_catalog.jsonb_build_object('ok', false, 'reason', 'invalid_expiry');
  end if;

  select credits_unlock into v_windows
  from public.profiles
  where id = p_user_id
  for update;
  if not found then
    return pg_catalog.jsonb_build_object('ok', false, 'reason', 'missing_profile');
  end if;

  v_windows := coalesce(v_windows, '{}'::jsonb);
  if jsonb_typeof(v_windows) is distinct from 'object' then
    v_windows := '{}'::jsonb;
  end if;
  v_windows := pg_catalog.jsonb_set(v_windows, ARRAY[p_identity_key], pg_catalog.to_jsonb(p_expires_at), true);

  update public.profiles
  set credits_unlock = v_windows
  where id = p_user_id;

  return pg_catalog.jsonb_build_object('ok', true, 'expires_at', p_expires_at);
end;
$$;

revoke all on function public.add_content_unlock_window(text, text, bigint) from public, anon, authenticated;
grant execute on function public.add_content_unlock_window(text, text, bigint) to service_role;
