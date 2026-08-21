"use client";

import { useState } from "react";
import { beaches } from "../lib/beaches";
import { DataIcon } from "./ProductShell";

export function MapExperience() {
  const [selectedSlug, setSelectedSlug] = useState("stella-maris");
  const selected = beaches.find((beach) => beach.slug === selectedSlug) ?? beaches[0];
  return <div className="map-experience">
    <section className="session-map" aria-label="Mapa esquemático das praias de Salvador">
      <div className="map-water"><span>Oceano Atlântico</span></div><div className="map-land" /><div className="coast-line" />
      {beaches.map((beach, index) => <button key={beach.slug} onClick={() => setSelectedSlug(beach.slug)} className={`coast-marker condition-${beach.condition.toLowerCase()} ${selectedSlug === beach.slug ? "selected" : ""}`} style={{ top: `${8 + index * 8.4}%`, right: `${18 + index * 4.6}%` }} aria-label={`Selecionar ${beach.name}`}><i /> <span>{beach.name}</span></button>)}
      <div className="map-attribution">Diagrama geográfico de referência</div>
    </section>
    <aside className="map-detail"><figure><img src={selected.image} style={{ objectPosition: selected.imagePosition }} alt={`Vista editorial de ${selected.name}`} /><figcaption>Imagem editorial QuiPraia</figcaption></figure><span className="hot-kicker">Praia selecionada</span><h2>{selected.name}</h2><b className={`condition-pill ${selected.condition.toLowerCase()}`}>● {selected.condition}</b><div className="map-metrics"><Metric icon="waves" label="Ondas" value={`${selected.wave.toFixed(1)} m`} /><Metric icon="period" label="Período" value={`${selected.period} s`} /><Metric icon="wind" label="Vento" value={`${selected.windDirection} · ${selected.wind} km/h`} /><Metric icon="tide" label="Maré" value={`${selected.tide.toFixed(1)} m ↑`} /></div><p>Session Pulse <strong>{selected.score}/100</strong></p><div className="pulse-track"><i style={{ width: `${selected.score}%` }} /></div><a className="coral-action" href={`/praias/${selected.slug}`}>Abrir praia</a></aside>
  </div>;
}

function Metric({ icon, label, value }: { icon: string; label: string; value: string }) { return <div><DataIcon name={icon} /><span>{label}<strong>{value}</strong></span></div>; }
