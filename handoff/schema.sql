-- Esqueleto de referência. O desenvolvedor deve transformar isto em migrations revisadas.
create extension if not exists postgis;

create type public.app_role as enum ('user', 'moderator', 'admin');
create type public.surf_level as enum ('beginner', 'intermediate', 'advanced');
create type public.moderation_status as enum ('pending', 'approved', 'rejected');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 2 and 60),
  avatar_path text,
  surf_level public.surf_level,
  city text,
  role public.app_role not null default 'user',
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.beaches (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  city text not null,
  state_code char(2) not null,
  location geography(point, 4326) not null,
  coast_order integer,
  orientation_deg numeric,
  is_active boolean not null default false,
  session_config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.favorites (
  user_id uuid references public.profiles(id) on delete cascade,
  beach_id uuid references public.beaches(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, beach_id)
);

create table public.forecast_runs (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  provider_run_at timestamptz,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  status text not null,
  error_summary text
);

create table public.forecast_points (
  id bigint generated always as identity primary key,
  beach_id uuid not null references public.beaches(id) on delete cascade,
  run_id uuid references public.forecast_runs(id) on delete set null,
  forecast_time timestamptz not null,
  wave_height_m numeric,
  wave_period_s numeric,
  wave_direction_deg numeric,
  swell_height_m numeric,
  swell_period_s numeric,
  swell_direction_deg numeric,
  wind_speed_kmh numeric,
  wind_gust_kmh numeric,
  wind_direction_deg numeric,
  sea_level_m numeric,
  sea_surface_temp_c numeric,
  provider text not null,
  provider_run_at timestamptz,
  ingested_at timestamptz not null default now(),
  unique (beach_id, forecast_time, provider)
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  beach_id uuid not null references public.beaches(id) on delete cascade,
  observed_at timestamptz not null default now(),
  condition text not null,
  crowd text,
  wave_height_estimate_m numeric,
  note text check (char_length(note) <= 240),
  photo_path text,
  moderation_status public.moderation_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.report_confirmations (
  report_id uuid references public.reports(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (report_id, user_id)
);

create table public.report_flags (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.reports(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  reason text not null,
  created_at timestamptz not null default now(),
  unique (report_id, user_id)
);

create table public.session_scores (
  beach_id uuid not null references public.beaches(id) on delete cascade,
  forecast_time timestamptz not null,
  score numeric not null check (score between 0 and 100),
  label text not null,
  algorithm_version text not null,
  explanation jsonb not null,
  created_at timestamptz not null default now(),
  primary key (beach_id, forecast_time, algorithm_version)
);

create table public.subscriptions (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  status text not null default 'inactive',
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

create table public.ad_campaigns (
  id uuid primary key default gen_random_uuid(),
  advertiser_name text not null,
  title text not null,
  destination_url text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  placements text[] not null,
  beach_ids uuid[] not null default '{}',
  status text not null default 'draft',
  created_at timestamptz not null default now()
);

create table public.ad_creatives (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.ad_campaigns(id) on delete cascade,
  image_path text not null,
  alt_text text not null,
  headline text not null,
  created_at timestamptz not null default now()
);

create table public.integration_health (
  integration text primary key,
  status text not null,
  last_success_at timestamptz,
  last_attempt_at timestamptz,
  consecutive_failures integer not null default 0,
  details jsonb not null default '{}'::jsonb
);

create table public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.beaches enable row level security;
alter table public.favorites enable row level security;
alter table public.forecast_runs enable row level security;
alter table public.forecast_points enable row level security;
alter table public.reports enable row level security;
alter table public.report_confirmations enable row level security;
alter table public.report_flags enable row level security;
alter table public.session_scores enable row level security;
alter table public.subscriptions enable row level security;
alter table public.ad_campaigns enable row level security;
alter table public.ad_creatives enable row level security;
alter table public.integration_health enable row level security;
alter table public.audit_log enable row level security;

create policy "profile owner read" on public.profiles for select to authenticated using (id = (select auth.uid()));
create policy "profile owner update" on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy "authenticated read active beaches" on public.beaches for select to authenticated using (is_active);
create policy "favorite owner all" on public.favorites for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "authenticated read forecasts" on public.forecast_points for select to authenticated using (true);
create policy "authenticated read approved reports" on public.reports for select to authenticated using (moderation_status = 'approved' or user_id = (select auth.uid()));
create policy "report owner insert" on public.reports for insert to authenticated with check (user_id = (select auth.uid()));
create policy "confirmation owner all" on public.report_confirmations for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "flag owner insert" on public.report_flags for insert to authenticated with check (user_id = (select auth.uid()));
create policy "authenticated read scores" on public.session_scores for select to authenticated using (true);
create policy "subscription owner read" on public.subscriptions for select to authenticated using (user_id = (select auth.uid()));
