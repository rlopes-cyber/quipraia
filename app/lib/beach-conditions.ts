import type { Beach } from "./beaches";
import { fetchOpenMeteoForecast, type ForecastPoint } from "./open-meteo";
import { conditionFromScore, scoreFromForecast, type Condition } from "./condition";

export type LiveCondition = {
  waveHeight: number | null;
  wavePeriod: number | null;
  waveDirection: number | null;
  windSpeed: number | null;
  windDirection: number | null;
  seaLevel: number | null;
  waterTemperature: number | null;
  condition: Condition;
  score: number | null;
  live: boolean;
};

// Escolhe o ponto horário mais próximo de "agora" (mesma regra usada no widget de previsão
// no cliente), para exibir a condição atual em cards que não têm o widget completo.
function currentPoint(points: ForecastPoint[]): ForecastPoint | null {
  if (!points.length) return null;
  const now = Date.now();
  const index = points.findIndex((point) => new Date(point.time).getTime() >= now - 30 * 60 * 1000);
  return points[index < 0 ? 0 : index] ?? null;
}

// Busca a condição real (Open-Meteo) de uma praia para uso em componentes de servidor.
// Se a busca falhar (API fora do ar, rede instável), cai para os valores estáticos de
// demonstração cadastrados em beaches.ts — a página nunca quebra, só deixa de estar "ao vivo".
export async function getLiveCondition(beach: Beach): Promise<LiveCondition> {
  try {
    const points = await fetchOpenMeteoForecast(beach);
    const point = currentPoint(points);
    const score = scoreFromForecast(point);
    return {
      waveHeight: point?.waveHeight ?? null,
      wavePeriod: point?.wavePeriod ?? null,
      waveDirection: point?.waveDirection ?? null,
      windSpeed: point?.windSpeed ?? null,
      // BUG corrigido: antes este campo pegava point?.waveDirection (duplicando a direção da onda
      // e nunca mostrando a direção real do vento nos cards que usam LiveCondition).
      windDirection: point?.windDirection ?? null,
      seaLevel: point?.seaLevel ?? null,
      waterTemperature: point?.waterTemperature ?? null,
      condition: conditionFromScore(score),
      score,
      live: point != null,
    };
  } catch {
    return { waveHeight: null, wavePeriod: null, waveDirection: null, windSpeed: null, windDirection: null, seaLevel: null, waterTemperature: null, condition: beach.condition, score: beach.score, live: false };
  }
}

export async function getLiveConditions(list: Beach[]): Promise<Map<string, LiveCondition>> {
  const entries = await Promise.all(list.map(async (beach) => [beach.slug, await getLiveCondition(beach)] as const));
  return new Map(entries);
}

// Encontra a janela de 2h com a melhor nota dentro das próximas ~24h, para substituir o
// texto fixo "Melhor janela 06:20–08:10" que antes nunca mudava.
export async function getBestWindow(beach: Beach): Promise<{ start: string; end: string } | null> {
  try {
    const points = await fetchOpenMeteoForecast(beach);
    if (points.length < 2) return null;
    let bestIndex = 0;
    let bestScore = -Infinity;
    for (let index = 0; index < points.length - 1; index += 1) {
      const a = scoreFromForecast(points[index]) ?? 0;
      const b = scoreFromForecast(points[index + 1]) ?? 0;
      const combined = a + b;
      if (combined > bestScore) { bestScore = combined; bestIndex = index; }
    }
    const start = formatHour(points[bestIndex]?.time);
    const end = formatHour(points[bestIndex + 1]?.time);
    if (!start || !end) return null;
    return { start, end };
  } catch {
    return null;
  }
}

function formatHour(value?: string) {
  const match = value?.match(/T(\d{2}):(\d{2})/);
  return match ? `${match[1]}:${match[2]}` : null;
}
