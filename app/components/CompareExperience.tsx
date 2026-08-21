"use client";

import { useState } from "react";
import { beaches } from "../lib/beaches";
import { DataIcon } from "./ProductShell";

const times = ["Agora", "+3h", "+6h", "+12h"];

export function CompareExperience() {
  const [timeIndex, setTimeIndex] = useState(0);
  const selected = ["stella-maris", "praia-do-flamengo", "jaguaribe"].map((slug) => beaches.find((beach) => beach.slug === slug)!);
  return <section className="compare-experience">
    <div className="time-tabs" role="tablist" aria-label="Horário da comparação">{times.map((time, index) => <button role="tab" aria-selected={timeIndex === index} className={timeIndex === index ? "active" : ""} onClick={() => setTimeIndex(index)} key={time}>{time}</button>)}</div>
    <div className="compare-grid">{selected.map((beach, index) => { const wave = Math.max(.2, beach.wave + timeIndex * .1 - index * .05); const score = Math.max(20, beach.score - timeIndex * 4); return <article className={index === 0 ? "best" : ""} key={beach.slug}><img className="compare-photo" src={beach.image} style={{ objectPosition: beach.imagePosition }} alt={`Vista editorial de ${beach.name}`} /><header><div><span className="hot-kicker">{index === 0 ? "Melhor escolha" : "Comparação"}</span><h2>{beach.name}</h2></div><b>{score}<small>/100</small></b></header><div className="compare-wave"><DataIcon name="waves" /><strong>{wave.toFixed(1)} m</strong><span>{beach.period} s · {beach.windDirection}</span></div><dl><div><dt>Vento</dt><dd>{beach.windDirection} · {beach.wind + timeIndex} km/h</dd></div><div><dt>Maré</dt><dd>{(beach.tide + timeIndex * .12).toFixed(1)} m subindo</dd></div><div><dt>Melhor para</dt><dd>{index === 0 ? "Intermediário" : "Todos os níveis"}</dd></div></dl><div className="score-track"><i style={{ width: `${score}%` }} /></div><a href={`/praias/${beach.slug}`}>Ver praia</a></article>})}</div>
    <div className="compare-note"><strong>Leitura sincronizada</strong><p>As três praias usam o mesmo horário de referência. Assim a comparação não mistura condições de momentos diferentes.</p></div>
  </section>;
}
