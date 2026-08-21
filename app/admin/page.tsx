"use client";
/* eslint-disable @next/next/no-html-link-for-pages */

import { FormEvent, useEffect, useState } from "react";
import { beaches } from "../lib/beaches";
import { getSupabaseBrowserClient } from "../lib/supabase";

type AdminReport = { id: string; beach: string; author: string; time: string; text: string; status: string };
type Ad = { id: string; title: string; body: string; cta_label: string; cta_url: string; placement: string; active: boolean };
const demoReports: AdminReport[] = [
  { id: "demo-1", beach: "Stella Maris", author: "Marina S.", time: "há 18 min", text: "Linha boa no outside. Vento segurando.", status: "published" },
  { id: "demo-2", beach: "Praia do Flamengo", author: "Caio R.", time: "há 42 min", text: "Mais cheio perto do canal.", status: "published" },
  { id: "demo-3", beach: "Jaguaribe", author: "Rafael M.", time: "há 1 h", text: "Onda pequena, boa para começar.", status: "review" },
];
const beachNames = Object.fromEntries(beaches.map((beach) => [beach.slug, beach.name]));

export default function AdminPage() {
  const [section, setSection] = useState("Visão geral");
  const [reports, setReports] = useState(demoReports);
  const [activeBeaches, setActiveBeaches] = useState(() => new Set(beaches.map((beach) => beach.slug)));
  const [ads, setAds] = useState<Ad[]>([]);
  const [users, setUsers] = useState(0);
  const [sourceOnline, setSourceOnline] = useState(false);
  const [feedback, setFeedback] = useState("Modo demonstração. Conecte o Supabase para persistir as ações.");

  async function loadAdmin() {
    const client = getSupabaseBrowserClient();
    const sourceRequest = fetch("/api/forecast?slug=stella-maris").then((response) => response.ok).catch(() => false);
    if (!client) { setSourceOnline(await sourceRequest); return; }
    const [profileResult, reportResult, beachResult, adResult, sourceResult] = await Promise.all([
      client.from("profiles").select("id", { count: "exact", head: true }),
      client.from("reports").select("id, beach_slug, text, status, created_at, profiles(name)").order("created_at", { ascending: false }).limit(30),
      client.from("beach_settings").select("beach_slug, active").order("display_order"),
      client.from("ads").select("id, title, body, cta_label, cta_url, placement, active").order("created_at", { ascending: false }),
      sourceRequest,
    ]);
    setUsers(profileResult.count ?? 0);
    if (reportResult.data) setReports(reportResult.data.map((item) => ({ id: String(item.id), beach: beachNames[String(item.beach_slug)] ?? String(item.beach_slug), author: profileName(item.profiles), time: relativeTime(String(item.created_at)), text: String(item.text), status: String(item.status) })));
    if (beachResult.data) setActiveBeaches(new Set(beachResult.data.filter((item) => item.active).map((item) => item.beach_slug)));
    if (adResult.data) setAds(adResult.data as Ad[]);
    setSourceOnline(sourceResult);
    setFeedback("");
  }

  async function moderate(report: AdminReport, status: "published" | "hidden") {
    const previous = reports;
    setReports((current) => current.map((item) => item.id === report.id ? { ...item, status } : item));
    if (report.id.startsWith("demo-")) return;
    const client = getSupabaseBrowserClient();
    const { error } = client ? await client.rpc("moderate_report", { target_report: report.id, next_status: status }) : { error: null };
    if (error) { setReports(previous); setFeedback("Não foi possível moderar o relato."); }
  }

  async function deleteReport(report: AdminReport) {
    if (!window.confirm(`Excluir o relato de ${report.author} em ${report.beach}?`)) return;
    const previous = reports;
    setReports((current) => current.filter((item) => item.id !== report.id));
    if (report.id.startsWith("demo-")) return;
    const client = getSupabaseBrowserClient();
    const { error } = client ? await client.rpc("delete_report_admin", { target_report: report.id }) : { error: null };
    if (error) { setReports(previous); setFeedback("Não foi possível excluir o relato."); }
  }

  async function toggleBeach(slug: string) {
    const previous = new Set(activeBeaches);
    const next = new Set(activeBeaches);
    if (next.has(slug)) next.delete(slug); else next.add(slug);
    setActiveBeaches(next);
    const client = getSupabaseBrowserClient();
    if (!client) return;
    const { error } = await client.from("beach_settings").upsert({ beach_slug: slug, active: next.has(slug), display_order: beaches.find((item) => item.slug === slug)?.coastOrder ?? 0 });
    if (error) { setActiveBeaches(previous); setFeedback("Não foi possível atualizar a praia."); }
  }

  async function createAd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const ad = { title: String(form.get("title")), body: String(form.get("body")), cta_label: String(form.get("cta_label")), cta_url: String(form.get("cta_url")), placement: String(form.get("placement")), active: true };
    const client = getSupabaseBrowserClient();
    if (client) {
      const { data, error } = await client.from("ads").insert(ad).select("id, title, body, cta_label, cta_url, placement, active").single();
      if (error || !data) { setFeedback("Não foi possível criar o anúncio."); return; }
      setAds((current) => [data as Ad, ...current]);
    } else setAds((current) => [{ ...ad, id: `demo-ad-${Date.now()}` }, ...current]);
    formElement.reset();
    setFeedback("Anúncio criado com sucesso.");
  }

  // Data is loaded from external services after the first render.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void loadAdmin(); }, []);

  return <main className="admin-shell">
    <aside className="admin-sidebar"><a className="admin-brand" href="/"><img src="/brand/final/quipraia-3c-wordmark-dark-approved.svg" alt="QuiPraia" /></a><span className="admin-label">ADMINISTRAÇÃO</span><nav>{["Visão geral", "Relatos", "Praias", "Anúncios", "Fontes", "Configurações"].map((item) => <button className={section === item ? "selected" : ""} key={item} onClick={() => setSection(item)}>{item}</button>)}</nav><div className="admin-user"><i>R</i><span><b>Operação QuiPraia</b><small>Administrador</small></span></div></aside>
    <section className="admin-main"><header className="admin-header"><div><span className="eyebrow">QUIPRAIA · BETA SALVADOR</span><h1>{section}</h1></div><a className="view-site" href="/app">Ver produto ↗</a></header>{feedback ? <p className="admin-feedback" role="status">{feedback}</p> : null}
      {section === "Visão geral" ? <><div className="admin-stats"><Stat label="USUÁRIOS" value={String(users)} note="contas cadastradas" /><Stat label="RELATOS" value={String(reports.length)} note="últimos registros" /><Stat label="PRAIAS ATIVAS" value={String(activeBeaches.size)} note="Salvador" /><Stat label="STATUS DA PREVISÃO" value={sourceOnline ? "●" : "○"} note={sourceOnline ? "fonte respondendo" : "verificar integração"} ok={sourceOnline} /></div><div className="admin-grid"><ReportPanel reports={reports.slice(0, 5)} setSection={setSection} /><SourcePanel online={sourceOnline} /></div></> : null}
      {section === "Relatos" ? <div className="admin-panel full-panel"><PanelTitle kicker="MODERAÇÃO" title="Relatos da comunidade" />{reports.map((report) => <div className="moderation-row" key={report.id}><div><b>{report.beach}</b><p>“{report.text}”</p><small>{report.author} · {report.time}</small></div><Status value={report.status} /><div className="moderation-actions">{report.status !== "published" ? <button onClick={() => void moderate(report, "published")}>Publicar</button> : <button className="muted-action" onClick={() => void moderate(report, "hidden")}>Ocultar</button>}<button className="deny" onClick={() => void deleteReport(report)}>Excluir</button></div></div>)}</div> : null}
      {section === "Praias" ? <div className="admin-panel full-panel"><PanelTitle kicker="CATÁLOGO" title="Praias de Salvador" />{beaches.map((beach) => <div className="admin-manage-row" key={beach.slug}><img src={beach.image} alt="" /><span><b>{beach.name}</b><small>{beach.lat.toFixed(4)}, {beach.lon.toFixed(4)}</small></span><button aria-pressed={activeBeaches.has(beach.slug)} className={activeBeaches.has(beach.slug) ? "active" : ""} onClick={() => void toggleBeach(beach.slug)}>{activeBeaches.has(beach.slug) ? "Ativa" : "Inativa"}</button></div>)}</div> : null}
      {section === "Anúncios" ? <div className="admin-grid"><form className="admin-panel admin-ad-form" onSubmit={createAd}><PanelTitle kicker="NOVA CAMPANHA" title="Cadastrar anúncio" /><label>Título<input name="title" required minLength={3} maxLength={100} placeholder="Fortaleça o movimento surf" /></label><label>Texto<textarea name="body" maxLength={240} placeholder="Mensagem curta da campanha" /></label><label>Botão<input name="cta_label" required defaultValue="Conhecer parceiro" /></label><label>Destino<input name="cta_url" type="url" required placeholder="https://" /></label><label>Posição<select name="placement"><option value="app">Aplicativo</option><option value="hotsite">Hotsite</option><option value="community">Comunidade</option><option value="beach">Página de praia</option></select></label><button className="coral-action" type="submit">Criar anúncio</button></form><div className="admin-panel"><PanelTitle kicker="CAMPANHAS" title="Anúncios cadastrados" />{ads.length ? ads.map((ad) => <div className="source-row" key={ad.id}><span>{ad.title}<small>{ad.placement}</small></span><b>{ad.active ? "Ativo" : "Pausado"}</b></div>) : <p className="source-tip">Nenhum anúncio cadastrado. Os banners institucionais continuam visíveis.</p>}</div></div> : null}
      {section === "Fontes" ? <div className="admin-panel full-panel"><PanelTitle kicker="INTEGRAÇÕES" title="Saúde dos dados" /><SourcePanel online={sourceOnline} standalone /></div> : null}
      {section === "Configurações" ? <div className="admin-panel empty-panel"><span className="empty-symbol">◌</span><h2>Configurações protegidas</h2><p>Domínio, chaves, autenticação e pagamentos são definidos por variáveis seguras de ambiente, nunca pela interface pública.</p></div> : null}
    </section>
  </main>;
}

function Stat({ label, value, note, ok = false }: { label: string; value: string; note: string; ok?: boolean }) { return <article><span>{label}</span><b className={ok ? "ok" : ""}>{value}</b><small>{note}</small></article>; }
function PanelTitle({ kicker, title }: { kicker: string; title: string }) { return <div className="panel-head"><div><span className="eyebrow">{kicker}</span><h2>{title}</h2></div></div>; }
function ReportPanel({ reports, setSection }: { reports: AdminReport[]; setSection: (value: string) => void }) { return <div className="admin-panel"><div className="panel-head"><div><span className="eyebrow">ATIVIDADE RECENTE</span><h2>Relatos para revisar</h2></div><button onClick={() => setSection("Relatos")}>Ver todos ↗</button></div>{reports.map((report) => <div className="admin-report" key={report.id}><span className="admin-avatar">{report.author[0]}</span><div><b>{report.beach}</b><p>“{report.text}”</p><small>{report.author} · {report.time}</small></div><Status value={report.status} /></div>)}</div>; }
function SourcePanel({ online, standalone = false }: { online: boolean; standalone?: boolean }) { return <div className={standalone ? "source-panel" : "admin-panel source-panel"}>{standalone ? null : <PanelTitle kicker="INTEGRAÇÕES" title="Saúde dos dados" />}<div className="source-row"><span><i className="source-dot" />Open-Meteo</span><b>{online ? "Respondendo" : "Verificar"}</b></div><div className="source-row"><span><i className="source-dot" />OpenStreetMap</span><b>Configurado</b></div><div className="source-row"><span><i className="source-dot" />Supabase</span><b>{getSupabaseBrowserClient() ? "Conectado" : "Demonstração"}</b></div><p className="source-tip">O QuiPraia informa fonte e horário em cada leitura para manter transparência com a comunidade.</p></div>; }
function Status({ value }: { value: string }) { const label = value === "published" ? "Publicado" : value === "hidden" ? "Oculto" : "Revisar"; return <span className={`status ${value === "published" ? "live" : "waiting"}`}>{label}</span>; }
function profileName(value: unknown) { if (Array.isArray(value)) return String(value[0]?.name ?? "Surfista"); if (value && typeof value === "object" && "name" in value) return String((value as { name?: string }).name ?? "Surfista"); return "Surfista"; }
function relativeTime(value: string) { const minutes = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 60000)); return minutes < 60 ? `há ${minutes} min` : `há ${Math.floor(minutes / 60)} h`; }
