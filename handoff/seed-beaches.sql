-- Coordenadas de referência obtidas via Nominatim/OpenStreetMap em 2026-08-20.
-- Revisar visualmente antes da produção e manter atribuição OpenStreetMap.
-- ST_MakePoint recebe longitude, latitude.

insert into public.beaches (name, slug, city, state_code, location, coast_order, is_active)
values
  ('Praia do Flamengo', 'praia-do-flamengo', 'Salvador', 'BA', ST_SetSRID(ST_MakePoint(-38.3179773, -12.9288115), 4326)::geography, 10, true),
  ('Stella Maris', 'stella-maris', 'Salvador', 'BA', ST_SetSRID(ST_MakePoint(-38.3306278, -12.9403301), 4326)::geography, 20, true),
  ('Itapuã', 'itapua', 'Salvador', 'BA', ST_SetSRID(ST_MakePoint(-38.3612107, -12.9535083), 4326)::geography, 30, true),
  ('Piatã', 'piata', 'Salvador', 'BA', ST_SetSRID(ST_MakePoint(-38.3839401, -12.9551749), 4326)::geography, 40, true),
  ('Jaguaribe', 'jaguaribe', 'Salvador', 'BA', ST_SetSRID(ST_MakePoint(-38.3897675, -12.9575730), 4326)::geography, 50, true),
  ('Patamares / Pituaçu', 'patamares-pituacu', 'Salvador', 'BA', ST_SetSRID(ST_MakePoint(-38.4019549, -12.9648790), 4326)::geography, 60, true),
  ('Boca do Rio', 'boca-do-rio', 'Salvador', 'BA', ST_SetSRID(ST_MakePoint(-38.4284291, -12.9822192), 4326)::geography, 70, true),
  ('Amaralina', 'amaralina', 'Salvador', 'BA', ST_SetSRID(ST_MakePoint(-38.4776485, -13.0146453), 4326)::geography, 80, true),
  ('Buracão', 'buracao', 'Salvador', 'BA', ST_SetSRID(ST_MakePoint(-38.4833065, -13.0150120), 4326)::geography, 90, true),
  ('Porto da Barra', 'porto-da-barra', 'Salvador', 'BA', ST_SetSRID(ST_MakePoint(-38.5328509, -13.0031670), 4326)::geography, 100, true)
on conflict (slug) do update
set location = excluded.location,
    coast_order = excluded.coast_order,
    updated_at = now();
