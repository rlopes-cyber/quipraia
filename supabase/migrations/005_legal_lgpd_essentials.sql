create table if not exists public.legal_acceptances (
  user_id uuid not null references public.profiles(id) on delete cascade,
  document_type text not null check (document_type in ('termos', 'privacidade')),
  version text not null,
  accepted_at timestamptz not null default now(),
  primary key (user_id, document_type)
);

create table if not exists public.consent_preferences (
  user_id uuid not null references public.profiles(id) on delete cascade,
  category text not null check (category in ('analytics', 'marketing', 'publicidade')),
  granted boolean not null default false,
  changed_at timestamptz not null default now(),
  primary key (user_id, category)
);

create table if not exists public.privacy_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('acesso', 'correcao', 'exclusao', 'portabilidade', 'outro')),
  status text not null default 'aberta' check (status in ('aberta', 'em_andamento', 'concluida')),
  message text not null default '',
  opened_at timestamptz not null default now(),
  resolved_at timestamptz
);

alter table public.legal_acceptances enable row level security;
alter table public.consent_preferences enable row level security;
alter table public.privacy_requests enable row level security;

revoke all on public.legal_acceptances, public.consent_preferences, public.privacy_requests from anon;
grant select, insert on public.legal_acceptances to authenticated;
grant select, insert, update on public.consent_preferences to authenticated;
grant select, insert on public.privacy_requests to authenticated;

drop policy if exists "users manage own legal acceptances" on public.legal_acceptances;
drop policy if exists "users manage own consent preferences" on public.consent_preferences;
drop policy if exists "users manage own privacy requests" on public.privacy_requests;
drop policy if exists "admins read privacy requests" on public.privacy_requests;

create policy "users manage own legal acceptances" on public.legal_acceptances
for all to authenticated using (auth.uid() = user_id or public.is_admin()) with check (auth.uid() = user_id);

create policy "users manage own consent preferences" on public.consent_preferences
for all to authenticated using (auth.uid() = user_id or public.is_admin()) with check (auth.uid() = user_id);

create policy "users manage own privacy requests" on public.privacy_requests
for select to authenticated using (auth.uid() = user_id or public.is_admin());

create policy "users create own privacy requests" on public.privacy_requests
for insert to authenticated with check (auth.uid() = user_id);

revoke update on public.privacy_requests from authenticated;
grant update (status, resolved_at) on public.privacy_requests to authenticated;

create policy "admins update privacy requests" on public.privacy_requests
for update to authenticated using (public.is_admin()) with check (public.is_admin());
