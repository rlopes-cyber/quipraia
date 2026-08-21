create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  provider text not null,
  provider_customer_id text,
  provider_subscription_id text unique,
  status text not null default 'pending' check (status in ('pending', 'trialing', 'active', 'past_due', 'canceled', 'unpaid')),
  plan public.user_plan not null default 'colaborador',
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.plan_interests (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  plan public.user_plan not null default 'colaborador',
  created_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;
alter table public.plan_interests enable row level security;
revoke all on public.subscriptions, public.plan_interests from anon;
grant select on public.subscriptions to authenticated;
grant select, insert, delete on public.plan_interests to authenticated;

drop policy if exists "users read own subscriptions" on public.subscriptions;
drop policy if exists "users manage own plan interest" on public.plan_interests;
create policy "users read own subscriptions" on public.subscriptions for select to authenticated using (auth.uid() = user_id or public.is_admin());
create policy "users manage own plan interest" on public.plan_interests for all to authenticated using (auth.uid() = user_id or public.is_admin()) with check (auth.uid() = user_id or public.is_admin());
