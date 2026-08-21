"use client";

import { FormEvent, useEffect, useState } from "react";
import { beaches } from "../lib/beaches";
import { getSupabaseBrowserClient } from "../lib/supabase";
import { DataIcon } from "./ProductShell";

type Report = { id: string; author: string; beach: string; time: string; text: string; condition: string; confirmations: number };
const initialReports: Report[] = [
  { id: "demo-1", author: "Marina B.", beach: "Stella Maris", time: "há 8 min", text: "Entrando limpo, vento ainda fraco. Séries demoradas, mas abrindo bem.", condition: "Bom", confirmations: 12 },
  { id: "demo-2", author: "João L.", beach: "Praia do Flamengo", time: "há 21 min", text: "Séries moderadas e pouca gente. Melhor perto do canal.", condition: "Bom", confirmations: 7 },
  { id: "demo-3", author: "Caio R.", beach: "Itapuã", time: "há 36 min", text: "Vento já mexendo. Ainda dá para entrar com prancha maior.", condition: "Regular", confirmations: 4 },
];
const beachNames = Object.fromEntries(beaches.map((beach) => [beach.slug, beach.name]));

export function CommunityExperience() {
  const [reports, setReports] = useState(initialReports);
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState<Set<string>>(() => new Set());
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function loadReports() {
    const client = getSupabaseBrowserClient();
    if (!client) return;
    const { data: auth } = await client.auth.getUser();
    if (!auth.user) return;
    const [{ data, error }, { data: userConfirmations }] = await Promise.all([
      client.from("reports").select("id, beach_slug, condition, text, created_at, profiles(name), report_confirmations(count)").eq("status", "published").order("created_at", { ascending: false }).limit(20),
      client.from("report_confirmations").select("report_id").eq("user_id", auth.user.id),
    ]);
    if (!error && data) setReports(data.map((item) => ({ id: String(item.id), author: profileName(item.profiles), beach: beachNames[String(item.beach_slug)] ?? String(item.beach_slug), time: relativeTime(String(item.created_at)), text: String(item.text), condition: titleCase(String(item.condition)), confirmations: confirmationCount(item.report_confirmations) })));
    if (userConfirmations) setConfirmed(new Set(userConfirmations.map((item) => String(item.report_id))));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const reportText = String(form.get("text") ?? "").trim();
    if (reportText.length < 3) return;
    const beachSlug = String(form.get("beach"));
    const condition = String(form.get("condition"));
    setSubmitting(true);
    setFeedback("");
    const client = getSupabaseBrowserClient();
    const user = client ? (await client.auth.getUser()).data.user : null;
    if (client && user) {
      const { error } = await client.from("reports").insert({ user_id: user.id, beach_slug: beachSlug, condition, text: reportText });
      if (error) { setFeedback("Não foi possível publicar seu relato. Tente novamente."); setSubmitting(false); return; }
      await loadReports();
    } else {
      setReports((current) => [{ id: `local-${Date.now()}`, author: "Ricardo L.", beach: beachNames[beachSlug], time: "agora", text: reportText, condition: titleCase(condition), confirmations: 0 }, ...current]);
    }
    formElement.reset();
    setOpen(false);
    setSubmitting(false);
    setFeedback("Relato publicado. Obrigado por fortalecer a comunidade.");
  }

  async function confirm(id: string) {
    const wasConfirmed = confirmed.has(id);
    const next = new Set(confirmed);
    if (wasConfirmed) next.delete(id); else next.add(id);
    setConfirmed(next);
    setFeedback("");
    const client = getSupabaseBrowserClient();
    const user = client ? (await client.auth.getUser()).data.user : null;
    if (!client || !user || id.startsWith("demo-") || id.startsWith("local-")) return;
    const result = wasConfirmed ? await client.from("report_confirmations").delete().eq("report_id", id).eq("user_id", user.id) : await client.from("report_confirmations").insert({ report_id: id, user_id: user.id });
    if (result.error) { setConfirmed(new Set(confirmed)); setFeedback("Não foi possível registrar sua confirmação."); }
  }

  // The state update happens only after the external Supabase request resolves.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void loadReports(); }, []);

  return <div className="community-layout">
    <section><div className="community-heading"><div><span className="hot-kicker">Relatos recentes</span><h2>De quem está na água</h2></div><button className="coral-action" onClick={() => { setOpen((value) => !value); setFeedback(""); }}>{open ? "Fechar" : "Relatar condição"}</button></div>
      {open ? <form className="report-form" onSubmit={submit}><label>Praia<select name="beach" defaultValue="stella-maris">{beaches.map((beach) => <option value={beach.slug} key={beach.slug}>{beach.name}</option>)}</select></label><label>Condição<select name="condition"><option value="bom">Bom</option><option value="regular">Regular</option><option value="fraco">Fraco</option><option value="classico">Clássico</option></select></label><label className="wide">O que você está vendo?<textarea name="text" minLength={3} maxLength={240} required placeholder="Conte sobre formação, vento, lotação e melhor ponto." /></label><button className="coral-action" type="submit" disabled={submitting}>{submitting ? "Publicando..." : "Publicar relato"}</button></form> : null}
      {feedback ? <p className="form-feedback" role="status">{feedback}</p> : null}
      <div className="report-list">{reports.length ? reports.map((report) => <article key={report.id}><div className="report-avatar">{initials(report.author)}</div><div><header><h3>{report.author} · {report.beach}</h3><span>{report.time}</span></header><p>{report.text}</p><small>Condição informada: {report.condition}</small></div><button aria-pressed={confirmed.has(report.id)} className={confirmed.has(report.id) ? "confirmed" : ""} onClick={() => void confirm(report.id)}>● {confirmed.has(report.id) ? "Confirmado" : "Confirmar"} · {report.confirmations + (confirmed.has(report.id) ? 1 : 0)}</button></article>) : <div className="community-empty"><strong>Ainda não há relatos.</strong><span>Se você está na praia, conte para a comunidade como está o mar.</span></div>}</div>
    </section>
    <aside className="community-side"><span className="hot-kicker">Agora em Salvador</span><h2>Pulso da comunidade</h2><div><DataIcon name="community" /><strong>{reports.length}</strong><span>relatos recentes</span></div><dl>{reports.slice(0, 3).map((report) => <div key={report.id}><dt>{report.beach}</dt><dd>{report.confirmations} confirmações</dd></div>)}</dl><p>Relatos passam por moderação. Nunca use informações da comunidade para navegação marítima ou segurança.</p></aside>
  </div>;
}

function titleCase(value: string) { return value ? value[0].toUpperCase() + value.slice(1) : value; }
function relativeTime(value: string) { const minutes = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 60000)); if (minutes < 1) return "agora"; if (minutes < 60) return `há ${minutes} min`; const hours = Math.floor(minutes / 60); return hours < 24 ? `há ${hours} h` : `há ${Math.floor(hours / 24)} d`; }
function profileName(value: unknown) { if (Array.isArray(value)) return String(value[0]?.name ?? "Surfista QuiPraia"); if (value && typeof value === "object" && "name" in value) return String((value as { name?: string }).name ?? "Surfista QuiPraia"); return "Surfista QuiPraia"; }
function confirmationCount(value: unknown) { if (Array.isArray(value)) return Number(value[0]?.count ?? 0); return 0; }
function initials(name: string) { return name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase(); }
