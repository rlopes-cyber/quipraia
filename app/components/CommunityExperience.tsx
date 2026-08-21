"use client";

import { FormEvent, useEffect, useState } from "react";
import { DataIcon } from "./ProductShell";
import { getSupabaseBrowserClient } from "../lib/supabase";

type Report = { id: string; author: string; beach: string; time: string; text: string; condition: string; confirmations: number };
const initialReports: Report[] = [
  { id: "demo-1", author: "Marina B.", beach: "Stella Maris", time: "há 8 min", text: "Entrando limpo, vento ainda fraco. Séries demoradas, mas abrindo bem.", condition: "Bom", confirmations: 12 },
  { id: "demo-2", author: "João L.", beach: "Praia do Flamengo", time: "há 21 min", text: "Séries moderadas e pouca gente. Melhor perto do canal.", condition: "Bom", confirmations: 7 },
  { id: "demo-3", author: "Caio R.", beach: "Itapuã", time: "há 36 min", text: "Vento já mexendo. Ainda dá para entrar com prancha maior.", condition: "Regular", confirmations: 4 },
];

const beachSlugs: Record<string, string> = { "Stella Maris": "stella-maris", "Praia do Flamengo": "praia-do-flamengo", "Itapuã": "itapua", "Jaguaribe": "jaguaribe" };
const beachNames = Object.fromEntries(Object.entries(beachSlugs).map(([name, slug]) => [slug, name]));

export function CommunityExperience() {
  const [reports, setReports] = useState(initialReports);
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState<Set<string>>(() => new Set());
  async function loadReports() { const client = getSupabaseBrowserClient(); if (!client) return; const { data } = await client.from("reports").select("id, beach_slug, condition, text, created_at, profiles(name), report_confirmations(count)").eq("status", "published").order("created_at", { ascending: false }).limit(20); if (!data?.length) return; setReports(data.map((item) => ({ id: String(item.id), author: profileName(item.profiles), beach: beachNames[String(item.beach_slug)] ?? String(item.beach_slug), time: relativeTime(String(item.created_at)), text: String(item.text), condition: titleCase(String(item.condition)), confirmations: confirmationCount(item.report_confirmations) }))); }
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const form = new FormData(event.currentTarget); const text = String(form.get("text") ?? "").trim(); if (!text) return; const beach = String(form.get("beach")); const condition = String(form.get("condition")); const client = getSupabaseBrowserClient(); const user = client ? (await client.auth.getUser()).data.user : null; if (client && user) { const { error } = await client.from("reports").insert({ user_id: user.id, beach_slug: beachSlugs[beach], condition: condition.toLowerCase(), text }); if (!error) await loadReports(); } else { setReports((current) => [{ id: `local-${Date.now()}`, author: "Ricardo L.", beach, time: "agora", text, condition, confirmations: 0 }, ...current]); } setOpen(false); }
  async function confirm(id: string) { const wasConfirmed = confirmed.has(id); setConfirmed((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; }); const client = getSupabaseBrowserClient(); const user = client ? (await client.auth.getUser()).data.user : null; if (!client || !user || id.startsWith("demo-") || id.startsWith("local-")) return; if (wasConfirmed) await client.from("report_confirmations").delete().eq("report_id", id).eq("user_id", user.id); else await client.from("report_confirmations").insert({ report_id: id, user_id: user.id }); }
  // The state update happens only after the external Supabase request resolves.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void loadReports(); }, []);
  return <div className="community-layout">
    <section><div className="community-heading"><div><span className="hot-kicker">Relatos recentes</span><h2>De quem está na água</h2></div><button className="coral-action" onClick={() => setOpen((value) => !value)}>Relatar condição</button></div>
      {open ? <form className="report-form" onSubmit={submit}><label>Praia<select name="beach"><option>Stella Maris</option><option>Praia do Flamengo</option><option>Itapuã</option><option>Jaguaribe</option></select></label><label>Condição<select name="condition"><option>Bom</option><option>Regular</option><option>Fraco</option></select></label><label className="wide">O que você está vendo?<textarea name="text" maxLength={240} required placeholder="Conte sobre formação, vento, lotação e melhor ponto." /></label><button className="coral-action" type="submit">Publicar relato</button></form> : null}
      <div className="report-list">{reports.map((report) => <article key={report.id}><div className="report-avatar">{report.author.slice(0, 2).toUpperCase()}</div><div><header><h3>{report.author} · {report.beach}</h3><span>{report.time}</span></header><p>{report.text}</p><small>1.5 m · boa formação · lotação média</small></div><button className={confirmed.has(report.id) ? "confirmed" : ""} onClick={() => confirm(report.id)}>● {confirmed.has(report.id) ? "Confirmado" : "Confirmar"} · {report.confirmations + (confirmed.has(report.id) ? 1 : 0)}</button></article>)}</div>
    </section>
    <aside className="community-side"><span className="hot-kicker">Agora em Salvador</span><h2>Pulso da comunidade</h2><div><DataIcon name="community" /><strong>23</strong><span>surfistas ativos</span></div><dl><div><dt>Stella Maris</dt><dd>12 confirmações</dd></div><div><dt>Flamengo</dt><dd>7 confirmações</dd></div><div><dt>Itapuã</dt><dd>4 confirmações</dd></div></dl><p>Relatos passam por moderação. Nunca use informações da comunidade para navegação marítima ou segurança.</p></aside>
  </div>;
}

function titleCase(value: string) { return value ? value[0].toUpperCase() + value.slice(1) : value; }
function relativeTime(value: string) { const minutes = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 60000)); return minutes < 1 ? "agora" : `há ${minutes} min`; }
function profileName(value: unknown) { if (Array.isArray(value)) return String(value[0]?.name ?? "Surfista QuiPraia"); if (value && typeof value === "object" && "name" in value) return String((value as { name?: string }).name ?? "Surfista QuiPraia"); return "Surfista QuiPraia"; }
function confirmationCount(value: unknown) { if (Array.isArray(value)) return Number(value[0]?.count ?? 0); return 0; }
