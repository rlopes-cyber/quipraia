"use client";

import { useEffect, useState } from "react";
import { beaches } from "../lib/beaches";
import { getSupabaseBrowserClient } from "../lib/supabase";

export function ProfileExperience() {
  const [favorites, setFavorites] = useState(() => new Set(["stella-maris", "praia-do-flamengo", "itapua"]));
  const [alerts, setAlerts] = useState(true);
  const [profile, setProfile] = useState({ name: "Ricardo Lopes", email: "ricardo@email.com", level: "Intermediário", city: "Salvador, BA", plan: "Colaborador" });
  async function loadProfile() { const client = getSupabaseBrowserClient(); if (!client) return; const { data: auth } = await client.auth.getUser(); if (!auth.user) return; const [{ data: row }, { data: favoriteRows }] = await Promise.all([client.from("profiles").select("name, city, surf_level, plan, alerts_enabled").eq("id", auth.user.id).single(), client.from("favorites").select("beach_slug").eq("user_id", auth.user.id)]); if (row) { setProfile({ name: row.name || auth.user.user_metadata?.name || "Surfista QuiPraia", email: auth.user.email ?? "", level: titleCase(row.surf_level), city: row.city, plan: titleCase(row.plan) }); setAlerts(row.alerts_enabled); } if (favoriteRows) setFavorites(new Set(favoriteRows.map((item) => item.beach_slug))); }
  async function toggleFavorite(slug: string) { const removing = favorites.has(slug); setFavorites((current) => { const next = new Set(current); if (next.has(slug)) next.delete(slug); else next.add(slug); return next; }); const client = getSupabaseBrowserClient(); const user = client ? (await client.auth.getUser()).data.user : null; if (!client || !user) return; if (removing) await client.from("favorites").delete().eq("user_id", user.id).eq("beach_slug", slug); else await client.from("favorites").insert({ user_id: user.id, beach_slug: slug }); }
  async function toggleAlerts() { const next = !alerts; setAlerts(next); const client = getSupabaseBrowserClient(); const user = client ? (await client.auth.getUser()).data.user : null; if (client && user) await client.from("profiles").update({ alerts_enabled: next, updated_at: new Date().toISOString() }).eq("id", user.id); }
  // The state update happens only after the external Supabase request resolves.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void loadProfile(); }, []);
  return <div className="profile-layout">
    <section className="profile-card"><div className="profile-intro"><b>{initials(profile.name)}</b><div><h2>{profile.name}</h2><p>{profile.level} · {profile.city}</p><span>● {profile.plan}</span></div><button>Editar perfil</button></div><div className="profile-details"><div>Nível de surf<strong>{profile.level}</strong></div><div>Cidade principal<strong>{profile.city}</strong></div><div>E-mail<strong>{profile.email}</strong></div></div></section>
    <section className="profile-plan"><span className="hot-kicker">Seu plano</span><h2>{profile.plan}</h2><strong>{profile.plan === "Colaborador" ? "R$ 9,90" : "R$ 0"} <small>por mês</small></strong><p>{profile.plan === "Colaborador" ? "Previsão estendida, comparação, alertas e experiência sem anúncios." : "Previsão essencial, comunidade e anúncios que fortalecem o surf local."}</p><button>{profile.plan === "Colaborador" ? "Gerenciar plano" : "Virar colaborador"}</button></section>
    <section className="favorite-card"><header><div><span className="hot-kicker">Preferências</span><h2>Praias favoritas</h2></div><small>Escolha até 5</small></header><div>{beaches.slice(0, 6).map((beach) => <button className={favorites.has(beach.slug) ? "selected" : ""} onClick={() => toggleFavorite(beach.slug)} key={beach.slug}><img src={beach.image} style={{ objectPosition: beach.imagePosition }} alt="" /><span>{favorites.has(beach.slug) ? "✓" : "+"}</span><strong>{beach.name}</strong><small>{beach.condition} · {beach.wave.toFixed(1)} m</small></button>)}</div></section>
    <section className="alert-card"><div><span className="hot-kicker">Notificações</span><h2>Melhor janela</h2><p>Receba um aviso quando uma praia favorita alcançar sua condição desejada.</p></div><button aria-label="Ativar alertas de melhor janela" aria-pressed={alerts} onClick={toggleAlerts} className={alerts ? "on" : ""}><i /></button></section>
  </div>;
}

function titleCase(value: string) { return value ? value[0].toUpperCase() + value.slice(1) : value; }
function initials(name: string) { return name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase(); }
