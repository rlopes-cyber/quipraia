create table if not exists public.beach_settings (
  beach_slug text primary key,
  active boolean not null default true,
  display_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.ads (
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

alter table public.beach_settings enable row level security;
alter table public.ads enable row level security;
revoke update on public.reports from authenticated;
grant update (condition, text) on public.reports to authenticated;
revoke all on public.beach_settings, public.ads from anon;
grant select, insert, update, delete on public.beach_settings, public.ads to authenticated;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin'); $$;

drop policy if exists "beach settings are readable" on public.beach_settings;
drop policy if exists "admins manage beach settings" on public.beach_settings;
drop policy if exists "active ads are readable" on public.ads;
drop policy if exists "admins manage ads" on public.ads;
drop policy if exists "admins manage all reports" on public.reports;
create policy "beach settings are readable" on public.beach_settings for select to authenticated using (true);
create policy "admins manage beach settings" on public.beach_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "active ads are readable" on public.ads for select to authenticated using (active or public.is_admin());
create policy "admins manage ads" on public.ads for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins manage all reports" on public.reports for all to authenticated using (public.is_admin()) with check (public.is_admin());

create or replace function public.moderate_report(target_report uuid, next_status text)
returns void language plpgsql security definer set search_path = public
as $$
begin
  if not public.is_admin() then raise exception 'Acesso negado.'; end if;
  if next_status not in ('published', 'hidden', 'review') then raise exception 'Status inválido.'; end if;
  update public.reports set status = next_status where id = target_report;
end;
$$;

create or replace function public.delete_report_admin(target_report uuid)
returns void language plpgsql security definer set search_path = public
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
('porto-da-barra', true, 100)
on conflict (beach_slug) do nothing;
