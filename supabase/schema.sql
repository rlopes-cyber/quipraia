create extension if not exists pgcrypto;

create type public.user_plan as enum ('gratuito', 'colaborador');
create type public.user_role as enum ('user', 'admin');
create type public.report_condition as enum ('fraco', 'regular', 'bom', 'classico');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '',
  city text not null default 'Salvador, BA',
  surf_level text not null default 'iniciante',
  plan public.user_plan not null default 'gratuito',
  role public.user_role not null default 'user',
  alerts_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.favorites (
  user_id uuid not null references public.profiles(id) on delete cascade,
  beach_slug text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, beach_slug)
);

create or replace function public.enforce_favorite_limit()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if (select count(*) from public.favorites where user_id = new.user_id) >= 5 then
    raise exception 'Cada usuário pode ter até cinco praias favoritas.';
  end if;
  return new;
end;
$$;

create trigger favorites_limit
before insert on public.favorites
for each row execute procedure public.enforce_favorite_limit();

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  beach_slug text not null,
  condition public.report_condition not null,
  text text not null check (char_length(text) between 3 and 240),
  status text not null default 'published' check (status in ('published', 'hidden', 'review')),
  created_at timestamptz not null default now()
);

create table public.report_confirmations (
  report_id uuid not null references public.reports(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (report_id, user_id)
);

create table public.beach_settings (
  beach_slug text primary key,
  active boolean not null default true,
  display_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table public.ads (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 100),
  body text not null default '',
  cta_label text not null default 'Conhecer parceiro',
  cta_url text not null,
  placement text not null default 'app' check (placement in ('hotsite', 'app', 'community', 'beach')),
  active boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.subscriptions (
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

create table public.plan_interests (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  plan public.user_plan not null default 'colaborador',
  created_at timestamptz not null default now()
);

create index reports_beach_created_idx on public.reports (beach_slug, created_at desc);
create index reports_user_created_idx on public.reports (user_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.favorites enable row level security;
alter table public.reports enable row level security;
alter table public.report_confirmations enable row level security;
alter table public.beach_settings enable row level security;
alter table public.ads enable row level security;
alter table public.subscriptions enable row level security;
alter table public.plan_interests enable row level security;

revoke all on public.profiles, public.favorites, public.reports, public.report_confirmations from anon;
revoke all on public.beach_settings, public.ads from anon;
revoke all on public.subscriptions, public.plan_interests from anon;
grant select on public.profiles, public.favorites, public.reports, public.report_confirmations to authenticated;
grant select, insert, update, delete on public.beach_settings, public.ads to authenticated;
grant select on public.subscriptions to authenticated;
grant select, insert, delete on public.plan_interests to authenticated;
grant insert, delete on public.favorites, public.report_confirmations to authenticated;
grant insert, update, delete on public.reports to authenticated;
revoke update on public.reports from authenticated;
grant update (condition, text) on public.reports to authenticated;
revoke update on public.profiles from authenticated;
grant update (name, city, surf_level, alerts_enabled, updated_at) on public.profiles to authenticated;

create policy "profiles readable by authenticated users" on public.profiles
for select to authenticated using (true);

create policy "users update own profile" on public.profiles
for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create policy "users manage own favorites" on public.favorites
for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "published reports are readable" on public.reports
for select to authenticated using (status = 'published');

create policy "users create own reports" on public.reports
for insert to authenticated with check (auth.uid() = user_id);

create policy "users update own reports" on public.reports
for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "confirmations are readable" on public.report_confirmations
for select to authenticated using (true);

create policy "users manage own confirmations" on public.report_confirmations
for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create policy "beach settings are readable" on public.beach_settings
for select to authenticated using (true);
create policy "admins manage beach settings" on public.beach_settings
for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "active ads are readable" on public.ads
for select to authenticated using (active or public.is_admin());
create policy "admins manage ads" on public.ads
for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins manage all reports" on public.reports
for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "users read own subscriptions" on public.subscriptions
for select to authenticated using (auth.uid() = user_id or public.is_admin());
create policy "users manage own plan interest" on public.plan_interests
for all to authenticated using (auth.uid() = user_id or public.is_admin()) with check (auth.uid() = user_id or public.is_admin());

create or replace function public.moderate_report(target_report uuid, next_status text)
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  if not public.is_admin() then raise exception 'Acesso negado.'; end if;
  if next_status not in ('published', 'hidden', 'review') then raise exception 'Status inválido.'; end if;
  update public.reports set status = next_status where id = target_report;
end;
$$;

create or replace function public.delete_report_admin(target_report uuid)
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  if not public.is_admin() then raise exception 'Acesso negado.'; end if;
  delete from public.reports where id = target_report;
end;
$$;

revoke all on function public.is_admin() from public, anon;
revoke all on function public.moderate_report(uuid, text) from public, anon;
revoke all on function public.delete_report_admin(uuid) from public, anon;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.moderate_report(uuid, text) to authenticated;
grant execute on function public.delete_report_admin(uuid) to authenticated;

insert into public.beach_settings (beach_slug, active, display_order) values
('praia-do-flamengo', true, 10), ('stella-maris', true, 20), ('itapua', true, 30),
('piata', true, 40), ('jaguaribe', true, 50), ('patamares-pituacu', true, 60),
('boca-do-rio', true, 70), ('amaralina', true, 80), ('buracao', true, 90),
('porto-da-barra', true, 100);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();
