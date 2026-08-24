import type { ForecastPoint } from "./open-meteo";

export type Condition = "Bom" | "Regular" | "Fraco";

// Heurística simples para transformar onda/período/vento em uma nota de 0-100 e um rótulo
// (Bom/Regular/Fraco) para a interface. Não é uma fórmula científica de "surf score" — soma
// pontos por onda maior e período mais longo, e desconta vento forte. Pode ser recalibrada
// depois com feedback real da comunidade; o objetivo aqui é só parar de mostrar sempre o
// mesmo número fixo de mockup em vez de reagir ao clima real.
export function scoreFromForecast(point: Pick<ForecastPoint, "waveHeight" | "wavePeriod" | "windSpeed"> | null | undefined): number | null {
  if (!point || point.waveHeight == null) return null;
  const wave = point.waveHeight;
  const period = point.wavePeriod ?? 8;
  const wind = point.windSpeed ?? 15;
  const raw = 40 + wave * 22 + period * 1.5 - wind * 1.1;
  return Math.max(5, Math.min(98, Math.round(raw)));
}

export function conditionFromScore(score: number | null): Condition {
  if (score == null) return "Regular";
  if (score >= 70) return "Bom";
  if (score >= 45) return "Regular";
  return "Fraco";
}
