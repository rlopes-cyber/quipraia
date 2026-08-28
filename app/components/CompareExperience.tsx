"use client";

import { useState } from "react";
import { beaches } from "../lib/beaches";
import { useForecast } from "../lib/forecast-client";
import type { ForecastPoint } from "../lib/open-meteo";
import { scoreFromForecast } from "../lib/condition";
import { DataIcon } from "./ProductShell";

const times = ["Agora", "+3h", "+6h", "+12h"];
const offsets = [0, 3, 6, 12];

// Escolhe o ponto da previsão correspondente ao deslocamento de horas selecionado na aba
// (Agora/+3h/+6h/+12h), sem estourar o array quando a praia ainda está em modo demonstração
// (que tem menos pontos que uma previsão ao vivo completa).
function pointAt(points: ForecastPoint[], offset: number): ForecastPoint | null {
  if (!points.length) return null;
  return points[Math.min(offset, points.length - 1)] ?? null;
}

export function CompareExperience() {
  const [timeIndex, setTimeIndex] = useState(0);
  const selected = ["stella-maris", "praia-do-flamengo", "jaguaribe"].map((slug) => beaches.find((beach) => beach.slug === slug)!);
  // As três praias comparadas são fixas nesta versão, então chamar o hook 3 vezes aqui
  // (em vez de dentro de um .map) mantém a mesma quantidade de hooks a cada render.
  const forecastA = useForecast(selected[0]);
  const forecastB = useForecast(selected[1]);
  const forecastC = useForecast(selected[2]);
  const forecasts = [forecastA, forecastB, forecastC];
  const offset = offsets[timeIndex];

  const rows = selected.map((beach, index) => {
    const forecast = forecasts[index];
    const point = pointAt(forecast.points, offset);
    const nextPoint = pointAt(forecast.points, offset + 1);
    const wave = point?.waveHeight ?? beach.wave;
    const wind = point?.windSpeed != null ? Math.round(point.windSpeed) : beach.wind;
    const tide = point?.seaLevel ?? beach.tide;
    const tideRising = nextPoint?.seaLevel != null && point?.seaLevel != null ? nextPoint.seaLevel >= point.seaLevel : true;
    const score = scoreFromForecast(point) ?? beach.score;
    return { beach, wave, wind, tide, tideRising, score, isLive: forecast.isLive };
  });
  const bestIndex = rows.reduce((best, row, index) => (row.score > rows[best].score ? index : best), 0);
  const anyLive = rows.some((row) => row.isLive);

  return <section className="compare-experience">
    <div className="time-tabs" role="tablist" aria-label="Horário da comparação">{times.map((time, index) => <button role="tab" aria-selected={timeIndex === index} className={timeIndex === index ? "active" : ""} onClick={() => setTimeIndex(index)} key={time}>{time}</button>)}</div>
    <div className="compare-grid">{rows.map((row, index) => { const { beach, wave, wind, tide, tideRising, score } = row; const isBest = index === bestIndex; return <article className={isBest ? "best" : ""} key={beach.slug}><img className="compare-photo" src={beach.image} style={{ objectPosition: beach.imagePosition }} alt={`Vista editorial de ${beach.name}`} /><header><div><span className="hot-kicker">{isBest ? "Melhor escolha" : "Comparação"}</span><h2>{beach.name}</h2></div><b>{score}<small>/100</small></b></header><div className="compare-wave"><DataIcon name="waves" /><strong>{wave.toFixed(1)} m</strong><span>{beach.windDirection}</span></div><dl><div><dt>Vento</dt><dd>{beach.windDirection} · {wind} km/h</dd></div><div><dt>Maré</dt><dd>{tide.toFixed(1)} m {tideRising ? "subindo" : "descendo"}</dd></div><div><dt>Fundo</dt><dd>{beach.surf?.bottomType ?? "Sem fonte confiável"}</dd></div><div><dt>Melhor para</dt><dd>{beach.surf?.skillLevelShort ?? "Sem fonte confiável"}</dd></div></dl><div className="score-track"><i style={{ width: `${score}%` }} /></div><a href={`/praias/${beach.slug}`}>Ver praia</a></article>; })}</div>
    <div className="compare-note"><strong>Leitura sincronizada</strong><p>{anyLive ? "As três praias usam o mesmo horário de referência. Assim a comparação não mistura condições de momentos diferentes." : "Prévia demonstrativa: a conexão automática tenta atualizar os dados reais ao abrir a página."}</p></div>
  </section>;
}
