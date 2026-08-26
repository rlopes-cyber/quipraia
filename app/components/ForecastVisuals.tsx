"use client";

import type { Beach } from "../lib/beaches";
import type { ForecastPoint } from "../lib/open-meteo";
import { useForecast } from "../lib/forecast-client";
import { classifySwell, classifyWind } from "../lib/wind-swell";
import { DataIcon } from "./ProductShell";

export function BeachForecast({ beach, activeTab }: { beach: Beach; activeTab: string }) {
  const forecast = useForecast(beach);
  const current = forecast.current;
  const tideRising = (forecast.points[1]?.seaLevel ?? 0) >= (current.seaLevel ?? 0);
  const wind = classifyWind(current.windDirection, beach);
  const swell = classifySwell(current.waveDirection, beach);
  return <>
    <article className="marine-summary">
      <Metric icon="waves" label="Ondas" value={format(current.waveHeight, "m")} note={swell.label} />
      <Metric icon="period" label="Período" value={format(current.wavePeriod, "s", 0)} note="pico modelado" />
      <Metric icon="wind" label="Vento" value={format(current.windSpeed, "km/h", 0)} note={wind.label} />
      <Metric icon="tide" label="Nível do mar" value={`${format(current.seaLevel, "m")} ${tideRising ? "↑" : "↓"}`} note={`${tideRising ? "subindo" : "descendo"} · maré única p/ toda Salvador`} />
      <Metric icon="waves" label="Temp. da água" value={format(current.waterTemperature, "°C", 1)} note="superfície do mar" />
    </article>
    <article className="forecast-chart">
      <header><div><span className="hot-kicker">Próximas 12 horas</span><h3>{chartTitle(activeTab)}</h3></div><strong>{forecast.isLive ? `Atualizado ${timeLabel(forecast.updatedAt)}` : "Modo demonstração"}</strong></header>
      {activeTab === "Relatos" ? <div className="inline-reports"><p><b>Marina · há 8 min</b> Entrando limpo, vento ainda fraco.</p><p><b>João · há 21 min</b> Séries demoradas, mas abrindo bem.</p></div> : <ForecastChart points={forecast.points} tab={activeTab} />}
      {(forecast.error || !forecast.isLive) ? <p className="forecast-source">Prévia demonstrativa. A conexão automática tenta atualizar os dados novamente ao abrir a página.</p> : <p className="forecast-source">Fonte: {forecast.source}. Previsão modelada, não indicada para navegação ou segurança marítima.</p>}
    </article>
    {activeTab === "Visão geral" ? <SpotProfile beach={beach} /> : null}
  </>;
}

// Perfil do pico com dados pesquisados por praia (fundo, nível, direções favoráveis). Quando a fonte
// não trouxe algum dado, mostramos isso explicitamente em vez de inventar um valor plausível.
function SpotProfile({ beach }: { beach: Beach }) {
  const surf = beach.surf;
  if (!surf) return null;
  if (!surf.isSurfSpot) {
    return <article className="spot-profile spot-profile-warning">
      <header><span className="hot-kicker">Perfil do pico</span><h3>Isto não é considerado um pico de surf</h3></header>
      <p>{surf.notes}</p>
      {surf.source ? <p className="forecast-source">Fonte: {surf.source}</p> : null}
    </article>;
  }
  return <article className="spot-profile">
    <header><span className="hot-kicker">Perfil do pico</span><h3>O que as fontes dizem sobre {beach.name}</h3></header>
    <dl>
      <Field label="Fundo" value={surf.bottomType} />
      <Field label="Nível recomendado" value={surf.skillLevel} />
      <Field label="Melhor swell" value={surf.bestSwellDirections?.join(", ")} />
      <Field label="Melhor vento" value={surf.bestWindDirections?.join(", ") ?? (surf.facingDegrees != null ? "calculado pela orientação da praia (veja acima)" : undefined)} />
      <Field label="Maré ideal" value={surf.bestTideNote} />
    </dl>
    {surf.notes ? <p>{surf.notes}</p> : null}
    {surf.source ? <p className="forecast-source">Fonte: {surf.source}</p> : <p className="forecast-source">Nenhuma fonte confiável encontrada para os campos em branco acima — não preenchidos para evitar informação incorreta.</p>}
  </article>;
}

function Field({ label, value }: { label: string; value?: string }) {
  return <div><dt>{label}</dt><dd>{value ?? "Sem fonte confiável"}</dd></div>;
}

export function HomeForecast({ beach }: { beach: Beach }) {
  const forecast = useForecast(beach);
  const current = forecast.current;
  const tideRising = (forecast.points[1]?.seaLevel ?? 0) >= (current.seaLevel ?? 0);
  return <>
    <article className="approved-condition"><span className="hot-kicker">{forecast.isLive ? `Atualizado ${timeLabel(forecast.updatedAt)}` : "Prévia demonstrativa"}</span><h2>Condição atual</h2><div><HomeMetric name="waves" label="Ondas" value={format(current.waveHeight, "m")} /><HomeMetric name="period" label="Período" value={format(current.wavePeriod, "s", 0)} /><HomeMetric name="wind" label="Vento" value={format(current.windSpeed, "km/h", 0)} /><HomeMetric name="tide" label="Nível do mar" value={`${format(current.seaLevel, "m")} ${tideRising ? "↑" : "↓"}`} /></div></article>
    <article className="approved-tide"><div><span className="hot-kicker">Nível do mar · próximas 12h</span><h2>Curva modelada</h2></div><ForecastChart points={forecast.points} tab="Maré" compact /></article>
  </>;
}

function ForecastChart({ points, tab, compact = false }: { points: ForecastPoint[]; tab: string; compact?: boolean }) {
  const key: keyof ForecastPoint = tab === "Ondas" ? "waveHeight" : tab === "Vento" ? "windSpeed" : "seaLevel";
  const values = points.map((point) => typeof point[key] === "number" ? point[key] as number : 0);
  const width = 800;
  const height = compact ? 180 : 210;
  const baseline = height - 30;
  const top = 22;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const coords = values.map((value, index) => ({ x: index * width / Math.max(1, values.length - 1), y: baseline - ((value - min) / range) * (baseline - top) }));
  const line = coords.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
  const area = `${line} L${width} ${baseline} L0 ${baseline}Z`;
  const unit = tab === "Vento" ? "km/h" : "m";
  return <div className="forecast-svg-wrap"><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${chartTitle(tab)} nas próximas 12 horas`}><defs><linearGradient id={`forecastfill-${compact ? "home" : tab}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9fd3c6" stopOpacity=".35" /><stop offset="1" stopColor="#9fd3c6" stopOpacity="0" /></linearGradient></defs><path className="area fill" fill={`url(#forecastfill-${compact ? "home" : tab})`} d={area} /><path d={line} /><line x1={coords[0]?.x ?? 0} y1={top} x2={coords[0]?.x ?? 0} y2={baseline} /><circle cx={coords[0]?.x ?? 0} cy={coords[0]?.y ?? baseline} r="7" />{coords.filter((_, index) => index % 3 === 0).map((point, index) => <text x={Math.min(point.x, 765)} y={height - 4} key={point.x}>{hour(points[index * 3]?.time)}</text>)}</svg>{!compact ? <div className="chart-readings"><span>Agora<strong>{format(values[0], unit, tab === "Vento" ? 0 : 1)}</strong></span><span>Pico em 12h<strong>{format(max, unit, tab === "Vento" ? 0 : 1)}</strong></span>{tab === "Ondas" ? <span>Período<strong>{format(points[0]?.wavePeriod, "s", 0)}</strong></span> : null}{tab === "Ondas" ? <span>Direção<strong>{compass(points[0]?.waveDirection)}</strong></span> : null}{tab === "Vento" ? <span>Direção<strong>{compass(points[0]?.windDirection)}</strong></span> : null}</div> : null}</div>;
}

function Metric({ icon, label, value, note }: { icon: string; label: string; value: string; note: string }) { return <div><DataIcon name={icon} /><span>{label}<strong>{value}</strong><small>{note}</small></span></div>; }
function HomeMetric({ name, label, value }: { name: string; label: string; value: string }) { return <div className="approved-metric"><svg aria-hidden="true"><use href={`/handoff-assets/quipraia-icons.svg#icon-${name}`} /></svg><span>{label}<strong>{value}</strong></span></div>; }
function format(value: number | null | undefined, unit: string, decimals = 1) { return value == null ? "Indisponível" : `${value.toFixed(decimals)} ${unit}`; }
function hour(value?: string) { const match = value?.match(/T(\d{2}):(\d{2})/); return match ? `${match[1]}:${match[2]}` : ""; }
function timeLabel(value: string | null) { return value ? new Date(value).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "agora"; }
function compass(value: number | null | undefined) { if (value == null) return "Direção indisponível"; return ["N", "NE", "L", "SE", "S", "SO", "O", "NO"][Math.round(value / 45) % 8]; }
function chartTitle(tab: string) { if (tab === "Ondas") return "Altura e direção"; if (tab === "Vento") return "Velocidade e direção"; if (tab === "Maré") return "Nível do mar modelado"; if (tab === "Relatos") return "Condições confirmadas"; return "Evolução do nível do mar"; }
