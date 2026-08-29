-- ============================================================================
-- 0004_credits_system.sql
-- NEB Study Vault — Advanced Credit System
-- Free users get limited features; owners manage credits via admin panel
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Add credit columns to profiles
-- ---------------------------------------------------------------------------
do $$ begin
  alter table public.profiles add column if not exists credits integer not null default 0;
  alter table public.profiles add column if not exists premium_approved_at timestamptz;
  alter table public.profiles add column if not exists credits_limit integer default 100;
exception when duplicate_column then null; end $$;

-- ---------------------------------------------------------------------------
-- Credit transactions audit table
-- ---------------------------------------------------------------------------
create table if not exists credit_transactions (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  actor_id      uuid references auth.users(id),
  amount        int not null,
  type          text not null check (type in ('GRANT', 'SPEND', 'ADJUST')),
  reason        text,
  reference_id  uuid,
  created_at    timestamptz default now()
);

create index if not exists idx_credit_tx_user on credit_transactions(user_id);
create index if not exists idx_credit_tx_actor on credit_transactions(actor_id);
create index if not exists idx_credit_tx_created on credit_transactions(created_at desc);

-- ---------------------------------------------------------------------------
-- RLS for credit system
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table credit_transactions enable row level security;

-- Credits: owners/admins can view all; users can view their own
create policy prof_credits_select on profiles for select to authenticated
  using (public.is_owner() or public.is_admin() or id = auth.uid());

create policy prof_credits_update on profiles for update to authenticated
  using (public.is_owner() or public.is_admin())
  with check (public.is_owner() or public.is_admin());

-- Credit transactions: owners/admins full access; users view their own
create policy ct_select on credit_transactions for select to authenticated
  using (public.is_owner() or public.is_admin() or user_id = auth.uid());

create policy ct_insert on credit_transactions for insert to authenticated
  with check (public.is_owner() or public.is_admin());

-- ---------------------------------------------------------------------------
-- Function: adjust user credits (admin only)
-- ---------------------------------------------------------------------------
create or replace function public.adjust_user_credits(
  target_user_id uuid,
  amount int,
  actor_id uuid,
  reason text
) returns void
language plpgsql
security definer
as $$
begin
  if not (select exists (
    select 1 from public.profiles
    where id = actor_id and role in ('OWNER', 'ADMIN')
  )) then
    raise exception 'Only owners or admins can adjust credits';
  end if;

  update public.profiles
  set credits = GREATEST(0, credits + amount)
  where id = target_user_id;

  insert into public.credit_transactions (user_id, actor_id, amount, type, reason)
  values (target_user_id, actor_id, amount,
          case when amount > 0 then 'GRANT' else 'ADJUST' end,
          reason);
end;
$$;

-- ---------------------------------------------------------------------------
-- Function: request premium (auto-creates premium_request)
-- ---------------------------------------------------------------------------
create or replace function public.request_premium(
  user_id uuid,
  message text
) returns uuid
language plpgsql
security definer
as $$
declare
  request_id uuid;
begin
  insert into public.premium_requests (user_id, message, status)
  values (user_id, message, 'PENDING')
  returning id into request_id;
  return request_id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Function: approve premium request (owner only)
-- ---------------------------------------------------------------------------
create or replace function public.approve_premium_request(
  request_id uuid,
  actor_id uuid
) returns void
language plpgsql
security definer
as $$
declare
  req_record record;
begin
  select * into req_record
  from public.premium_requests
  where id = request_id and status = 'PENDING';

  if not found then
    raise exception 'Premium request not found or already processed';
  end if;

  if not (select exists (
    select 1 from public.profiles
    where id = actor_id and role = 'OWNER'
  )) then
    raise exception 'Only owners can approve premium requests';
  end if;

  update public.premium_requests
  set status = 'APPROVED', reviewed_by = actor_id, reviewed_at = now()
  where id = request_id;

  update public.profiles
  set premium_status = true, premium_approved_at = now()
  where id = req_record.user_id;

  insert into public.credit_transactions (user_id, actor_id, amount, type, reason, reference_id)
  values (req_record.user_id, actor_id, 500, 'GRANT', 'Premium approved', request_id);
end;
$$;

-- ---------------------------------------------------------------------------
-- Function: reject premium request
-- ---------------------------------------------------------------------------
create or replace function public.reject_premium_request(
  request_id uuid,
  actor_id uuid
) returns void
language plpgsql
security definer
as $$
begin
  update public.premium_requests
  set status = 'REJECTED', reviewed_by = actor_id, reviewed_at = now()
  where id = request_id and status = 'PENDING';
end;
$$;

-- ---------------------------------------------------------------------------
-- View: user summary with credits (for admin panel)
-- ---------------------------------------------------------------------------
create or replace view public.user_summary as
select
  p.id,
  p.full_name,
  p.email,
  p.role,
  p.credits,
  p.credits_limit,
  p.premium_status,
  p.premium_approved_at,
  p.created_at,
  count(pr.id) filter (where pr.status = 'PENDING') as pending_premium_requests,
  count(ct.id) filter (where ct.type = 'GRANT') as total_credits_granted,
  count(ct.id) filter (where ct.type = 'SPEND') as total_credits_spent
from public.profiles p
left join public.premium_requests pr on pr.user_id = p.id
left join public.credit_transactions ct on ct.user_id = p.id
group by p.id, p.full_name, p.email, p.role, p.credits, p.credits_limit,
         p.premium_status, p.premium_approved_at, p.created_at;
