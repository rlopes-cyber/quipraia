"use client";

import { useState } from "react";
import { beaches, type Beach } from "../lib/beaches";
import { useForecast } from "../lib/forecast-client";
import { conditionFromScore, scoreFromForecast } from "../lib/condition";
import { BeachForecast } from "./ForecastVisuals";

const tabs = ["Visão geral", "Maré", "Ondas", "Vento", "Relatos"];

export function BeachDetails({ beach }: { beach: Beach }) {
  const [activeTab, setActiveTab] = useState("Visão geral");
  const index = beaches.findIndex((item) => item.slug === beach.slug);
  const gallery = [beach, beaches[(index + 1) % beaches.length], beaches[(index + beaches.length - 1) % beaches.length]];
  const forecast = useForecast(beach);
  const score = scoreFromForecast(forecast.current) ?? beach.score;
  const condition = conditionFromScore(scoreFromForecast(forecast.current));
  const freshness = forecast.isLive && forecast.updatedAt ? `atualizado ${new Date(forecast.updatedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}` : "modo demonstração";
  return <>
    <section className="beach-hero"><img src={beach.image} style={{ objectPosition: beach.imagePosition }} alt={`Vista editorial de ${beach.name}`} /><div><span className="hot-kicker">Praia em destaque</span><h2>{beach.name}</h2><p>Salvador · {freshness} · imagem editorial</p><b className={`condition-pill ${condition.toLowerCase()}`}>● {condition}</b><div className="beach-pulse"><small>Session Pulse</small><i><span style={{ width: `${score}%` }} /></i><strong>{score}/100</strong></div></div></section>
    <nav className="beach-tabs" aria-label="Dados da praia">{tabs.map((tab) => <button className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)} key={tab}>{tab}</button>)}</nav>
    <section className="beach-data-grid">
      <BeachForecast beach={beach} activeTab={activeTab} />
      <article className="beach-community"><header><div><span className="hot-kicker">Comunidade</span><h3>Quem está na água</h3></div><a href="/comunidade">Ver todos</a></header><p><strong>12 surfistas confirmam</strong><span>Atualizado há 8 min</span></p><button>Relatar condição</button></article>
    </section>
    <section className="beach-gallery"><header><div><span className="hot-kicker">Explore a costa</span><h3>{beach.name} e praias próximas</h3></div><small>Imagens editoriais QuiPraia</small></header><div>{gallery.map((item) => <a href={`/praias/${item.slug}`} key={item.slug}><img loading="lazy" src={item.image} style={{ objectPosition: item.imagePosition }} alt={`Vista editorial de ${item.name}`} /><span><strong>{item.name}</strong><small>{item.condition} · {item.wave.toFixed(1)} m</small></span></a>)}</div></section>
  </>;
}
