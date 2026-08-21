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

drop trigger if exists favorites_limit on public.favorites;
create trigger favorites_limit
before insert on public.favorites
for each row execute procedure public.enforce_favorite_limit();
