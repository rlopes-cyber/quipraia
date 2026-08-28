"use client";

import { useState } from "react";
import type { Beach } from "../lib/beaches";
import type { ForecastPoint } from "../lib/open-meteo";
import { useForecast } from "../lib/forecast-client";
import { useTideDay } from "../lib/tide-day-client";
import { addDays, bahiaToday } from "../lib/bahia-date";
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
      <Metric icon="wind" label="Vento" value={format(current.windSpeed, "km/h", 0)} note={wind.label} />
      <Metric icon="tide" label="Nível do mar" value={`${format(current.seaLevel, "m")} ${tideRising ? "↑" : "↓"}`} note={`${tideRising ? "subindo" : "descendo"} · maré única p/ toda Salvador`} />
      <Metric icon="water-temp" label="Temp. da água" value={format(current.waterTemperature, "°C", 1)} note="superfície do mar" />
      <Metric icon="uv" label="Índice UV" value={current.uvIndex == null ? "N/D" : String(Math.round(current.uvIndex))} note={uvLabel(current.uvIndex)} />
    </article>
    <article className="forecast-chart">
      <header><div><span className="hot-kicker">Próximas 12 horas</span><h3>{chartTitle(activeTab)}</h3></div><strong>{forecast.isLive ? `Atualizado ${timeLabel(forecast.updatedAt)}` : "Modo demonstração"}</strong></header>
      {activeTab === "Relatos" ? <div className="inline-reports"><p>Os relatos da comunidade ficam reunidos na aba Comunidade, com o que foi publicado nas últimas 24 horas.</p><a className="coral-action" href="/comunidade">Ver relatos da comunidade</a></div> : <ForecastChart points={forecast.points} tab={activeTab} />}
      {(forecast.error || !forecast.isLive) ? <p className="forecast-source">Prévia demonstrativa. A conexão automática tenta atualizar os dados novamente ao abrir a página.</p> : <p className="forecast-source">Fonte: {forecast.source}. Previsão modelada, não indicada para navegação ou segurança marítima.</p>}
    </article>
    {activeTab === "Maré" ? <TideDayExplorer /> : null}
    {activeTab === "Visão geral" ? <SpotProfile beach={beach} /> : null}
  </>;
}

// Tábua de maré de outro dia (passado ou futuro), mais sol e lua daquele dia. Reusa o mesmo
// cálculo harmônico real (tide-database.ts) e o cálculo astronômico offline (sun-moon.ts) já
// usados no resto do app: nenhuma fonte nova, só uma nova janela sobre os mesmos dados.
function TideDayExplorer() {
  const [dateStr, setDateStr] = useState(() => bahiaToday());
  const { data, error, loading } = useTideDay(dateStr);
  const isToday = dateStr === bahiaToday();
  const dateLabel = new Date(`${dateStr}T12:00:00-03:00`).toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });

  return (
    <article className="spot-profile tide-day-explorer">
      <header>
        <span className="hot-kicker">Tábua de maré</span>
        <h3>Ver maré de outro dia</h3>
      </header>
      <div className="tide-day-nav">
        <button type="button" onClick={() => setDateStr((current) => addDays(current, -1))} aria-label="Dia anterior">
          ‹
        </button>
        <label className="tide-day-date">
          <span>{dateLabel}</span>
          <input type="date" value={dateStr} onChange={(event) => { if (event.target.value) setDateStr(event.target.value); }} />
        </label>
        <button type="button" onClick={() => setDateStr((current) => addDays(current, 1))} aria-label="Próximo dia">
          ›
        </button>
        {!isToday ? (
          <button type="button" className="tide-day-today" onClick={() => setDateStr(bahiaToday())}>
            Hoje
          </button>
        ) : null}
      </div>

      {loading ? <p className="forecast-source">Calculando maré desse dia.</p> : null}
      {error ? <p className="forecast-source">Não foi possível calcular a maré desse dia. Tente de novo.</p> : null}

      {data ? (
        <>
          <ul className="tide-day-events">
            {data.extremes.length ? data.extremes.map((event) => (
              <li key={event.time} className={event.isHigh ? "tide-high" : "tide-low"}>
                <span>{event.isHigh ? "Preamar" : "Baixa-mar"}</span>
                <strong>{formatHour(event.time)}</strong>
                <small>{event.height.toFixed(2)} m</small>
              </li>
            )) : <li className="tide-day-empty">N/D para este dia.</li>}
          </ul>
          <dl>
            <Field label="Nascer do sol" value={formatHour(data.sunMoon.sunrise)} />
            <Field label="Pôr do sol" value={formatHour(data.sunMoon.sunset)} />
            <Field label="Nascer da lua" value={formatHour(data.sunMoon.moonrise)} />
            <Field label="Pôr da lua" value={formatHour(data.sunMoon.moonset)} />
            <Field label="Fase da lua" value={`${data.sunMoon.moonPhaseName}, ${data.sunMoon.moonIlluminationPct}% iluminada`} />
          </dl>
          <p className="forecast-source">Fonte: {data.model}. Cálculo, não medição ao vivo. Não usar para navegação marítima.</p>
        </>
      ) : null}
    </article>
  );
}

function formatHour(value?: string | null): string {
  if (!value) return "N/D";
  return new Date(value).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Bahia" });
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
    {surf.source ? <p className="forecast-source">Fonte: {surf.source}</p> : <p className="forecast-source">Nenhuma fonte confiável encontrada para os campos em branco acima. Não preenchidos para evitar informação incorreta.</p>}
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
    <article className="approved-condition"><span className="hot-kicker">{forecast.isLive ? `Atualizado ${timeLabel(forecast.updatedAt)}` : "Prévia demonstrativa"}</span><h2>Condição atual</h2><div><HomeMetric name="waves" label="Ondas" value={format(current.waveHeight, "m")} /><HomeMetric name="wind" label="Vento" value={format(current.windSpeed, "km/h", 0)} /><HomeMetric name="tide" label="Nível do mar" value={`${format(current.seaLevel, "m")} ${tideRising ? "↑" : "↓"}`} /><HomeMetric name="uv" label="Índice UV" value={current.uvIndex == null ? "N/D" : String(Math.round(current.uvIndex))} /></div></article>
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
  return <div className="forecast-svg-wrap"><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${chartTitle(tab)} nas próximas 12 horas`}><defs><linearGradient id={`forecastfill-${compact ? "home" : tab}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9fd3c6" stopOpacity=".35" /><stop offset="1" stopColor="#9fd3c6" stopOpacity="0" /></linearGradient></defs><path className="area fill" fill={`url(#forecastfill-${compact ? "home" : tab})`} d={area} /><path d={line} /><line x1={coords[0]?.x ?? 0} y1={top} x2={coords[0]?.x ?? 0} y2={baseline} /><circle cx={coords[0]?.x ?? 0} cy={coords[0]?.y ?? baseline} r="7" />{coords.filter((_, index) => index % 3 === 0).map((point, index) => <text x={Math.min(point.x, 765)} y={height - 4} key={point.x}>{hour(points[index * 3]?.time)}</text>)}</svg>{!compact ? <div className="chart-readings"><span>Agora<strong>{format(values[0], unit, tab === "Vento" ? 0 : 1)}</strong></span><span>Pico em 12h<strong>{format(max, unit, tab === "Vento" ? 0 : 1)}</strong></span>{tab === "Ondas" ? <span>Direção<strong>{compass(points[0]?.waveDirection)}</strong></span> : null}{tab === "Vento" ? <span>Direção<strong>{compass(points[0]?.windDirection)}</strong></span> : null}</div> : null}</div>;
}

function Metric({ icon, label, value, note }: { icon: string; label: string; value: string; note: string }) { return <div><DataIcon name={icon} /><span>{label}<strong>{value}</strong><small>{note}</small></span></div>; }
function HomeMetric({ name, label, value }: { name: string; label: string; value: string }) { return <div className="approved-metric"><svg aria-hidden="true"><use href={`/handoff-assets/quipraia-icons.svg#icon-${name}`} /></svg><span>{label}<strong>{value}</strong></span></div>; }
function format(value: number | null | undefined, unit: string, decimals = 1) { return value == null ? "Indisponível" : `${value.toFixed(decimals)} ${unit}`; }
function hour(value?: string) { const match = value?.match(/T(\d{2}):(\d{2})/); return match ? `${match[1]}:${match[2]}` : ""; }
function timeLabel(value: string | null) { return value ? new Date(value).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "agora"; }
function compass(value: number | null | undefined) { if (value == null) return "Direção indisponível"; return ["N", "NE", "L", "SE", "S", "SO", "O", "NO"][Math.round(value / 45) % 8]; }
// Classificação oficial da OMS pro índice UV (0 a 11+). Pico do dia, não hora a hora (ver
// comentário em open-meteo.ts sobre a limitação da API).
function uvLabel(value: number | null | undefined): string {
  if (value == null) return "Sem dado disponível";
  if (value < 3) return "Baixo · pico do dia";
  if (value < 6) return "Moderado · pico do dia";
  if (value < 8) return "Alto · pico do dia";
  if (value < 11) return "Muito alto · pico do dia";
  return "Extremo · pico do dia";
}
function chartTitle(tab: string) { if (tab === "Ondas") return "Altura e direção"; if (tab === "Vento") return "Velocidade e direção"; if (tab === "Maré") return "Nível do mar modelado"; if (tab === "Relatos") return "Condições confirmadas"; return "Evolução do nível do mar"; }
