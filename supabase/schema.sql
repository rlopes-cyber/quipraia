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

create index reports_beach_created_idx on public.reports (beach_slug, created_at desc);
create index reports_user_created_idx on public.reports (user_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.favorites enable row level security;
alter table public.reports enable row level security;
alter table public.report_confirmations enable row level security;

revoke all on public.profiles, public.favorites, public.reports, public.report_confirmations from anon;
grant select on public.profiles, public.favorites, public.reports, public.report_confirmations to authenticated;
grant insert, delete on public.favorites, public.report_confirmations to authenticated;
grant insert, update, delete on public.reports to authenticated;
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
