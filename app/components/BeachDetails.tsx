"use client";

import { useState } from "react";
import { beaches, type Beach } from "../lib/beaches";
import { DataIcon } from "./ProductShell";

const tabs = ["Visão geral", "Maré", "Ondas", "Vento", "Relatos"];

export function BeachDetails({ beach }: { beach: Beach }) {
  const [activeTab, setActiveTab] = useState("Visão geral");
  const index = beaches.findIndex((item) => item.slug === beach.slug);
  const gallery = [beach, beaches[(index + 1) % beaches.length], beaches[(index + beaches.length - 1) % beaches.length]];
  return <>
    <section className="beach-hero"><img src={beach.image} style={{ objectPosition: beach.imagePosition }} alt={`Vista editorial de ${beach.name}`} /><div><span className="hot-kicker">Praia em destaque</span><h2>{beach.name}</h2><p>Salvador · atualização há 8 min · imagem editorial</p><b className={`condition-pill ${beach.condition.toLowerCase()}`}>● {beach.condition}</b><div className="beach-pulse"><small>Session Pulse</small><i><span style={{ width: `${beach.score}%` }} /></i><strong>{beach.score}/100</strong></div></div></section>
    <nav className="beach-tabs" aria-label="Dados da praia">{tabs.map((tab) => <button className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)} key={tab}>{tab}</button>)}</nav>
    <section className="beach-data-grid">
      <article className="marine-summary"><Metric icon="waves" label="Ondas" value={`${beach.wave.toFixed(1)} m`} note="altura significativa" /><Metric icon="period" label="Período" value={`${beach.period} s`} note="consistente" /><Metric icon="wind" label="Vento" value={`${beach.wind} km/h`} note={`${beach.windDirection} · rajadas 19 km/h`} /><Metric icon="tide" label="Maré" value={`${beach.tide.toFixed(1)} m ↑`} note="enchendo" /></article>
      <article className="forecast-chart"><header><div><span className="hot-kicker">{activeTab === "Visão geral" ? "Próximas 12 horas" : activeTab}</span><h3>{activeTab === "Maré" ? "Curva e extremos" : activeTab === "Ondas" ? "Altura, período e direção" : activeTab === "Vento" ? "Média, rajadas e direção" : activeTab === "Relatos" ? "Condições confirmadas" : "Janela da sessão"}</h3></div><strong>Melhor janela 06:20 a 08:10</strong></header>{activeTab === "Relatos" ? <div className="inline-reports"><p><b>Marina · há 8 min</b> Entrando limpo, vento ainda fraco.</p><p><b>João · há 21 min</b> Séries demoradas, mas abrindo bem.</p></div> : <svg viewBox="0 0 800 210" role="img" aria-label="Evolução das condições nas próximas 12 horas"><defs><linearGradient id="detailfill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9fd3c6" stopOpacity=".35" /><stop offset="1" stopColor="#9fd3c6" stopOpacity="0" /></linearGradient></defs><path className="area" d="M0 155 C90 130 130 35 240 48 S390 180 520 155 S665 45 800 58 L800 200 L0 200Z" /><path d="M0 155 C90 130 130 35 240 48 S390 180 520 155 S665 45 800 58" /><line x1="110" y1="20" x2="110" y2="190" /><circle cx="110" cy="112" r="7" /><text x="0" y="207">06h</text><text x="195" y="207">09h</text><text x="390" y="207">12h</text><text x="585" y="207">15h</text><text x="765" y="207">18h</text></svg>}</article>
      <article className="beach-community"><header><div><span className="hot-kicker">Comunidade</span><h3>Quem está na água</h3></div><a href="/comunidade">Ver todos</a></header><p><strong>12 surfistas confirmam</strong><span>Atualizado há 8 min</span></p><button>Relatar condição</button></article>
    </section>
    <section className="beach-gallery"><header><div><span className="hot-kicker">Explore a costa</span><h3>{beach.name} e praias próximas</h3></div><small>Imagens editoriais QuiPraia</small></header><div>{gallery.map((item) => <a href={`/praias/${item.slug}`} key={item.slug}><img loading="lazy" src={item.image} style={{ objectPosition: item.imagePosition }} alt={`Vista editorial de ${item.name}`} /><span><strong>{item.name}</strong><small>{item.condition} · {item.wave.toFixed(1)} m</small></span></a>)}</div></section>
  </>;
}

function Metric({ icon, label, value, note }: { icon: string; label: string; value: string; note: string }) { return <div><DataIcon name={icon} /><span>{label}<strong>{value}</strong><small>{note}</small></span></div>; }
