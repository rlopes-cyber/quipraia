"use client";

import { useEffect, useState } from "react";
import type { Beach } from "./beaches";
import type { ForecastPoint } from "./open-meteo";

type ForecastResponse = { beach: { name: string; slug: string }; model: string; notice: string; updatedAt: string; points: ForecastPoint[] };

export function useForecast(beach: Beach) {
  const [data, setData] = useState<ForecastResponse | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/forecast?slug=${encodeURIComponent(beach.slug)}`, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error("forecast"); return response.json() as Promise<ForecastResponse>; })
      .then((response) => { setData(response); setError(false); })
      .catch((reason: unknown) => { if (!(reason instanceof DOMException && reason.name === "AbortError")) setError(true); });
    return () => controller.abort();
  }, [beach.slug]);

  const livePoints = data?.points?.length ? futureWindow(data.points) : [];
  const points = livePoints.length ? livePoints : fallbackPoints(beach);
  return { points, current: points[0], updatedAt: data?.updatedAt ?? null, source: data?.model ?? "Dados demonstrativos", isLive: Boolean(data), error };
}

function futureWindow(points: ForecastPoint[]) {
  const now = Date.now();
  const index = points.findIndex((point) => new Date(point.time).getTime() >= now - 30 * 60 * 1000);
  return points.slice(index < 0 ? 0 : index, (index < 0 ? 0 : index) + 13);
}

function fallbackPoints(beach: Beach): ForecastPoint[] {
  return Array.from({ length: 13 }, (_, index) => ({
    time: `2026-01-01T${String(6 + index).padStart(2, "0")}:00`,
    waveHeight: round(beach.wave + Math.sin(index / 2.6) * 0.18),
    wavePeriod: round(beach.period + Math.sin(index / 3) * 0.8),
    waveDirection: 95 + index * 2,
    windSpeed: round(beach.wind + index * 0.45),
    windDirection: 90 + index * 3,
    seaLevel: round(beach.tide + Math.sin((index - 1.5) / 2.1) * 0.65),
    // Sem dado ao vivo (modo demonstração): usamos uma média típica da água em Salvador só para a
    // interface não quebrar. Isso já vem com o aviso de "modo demonstração" no restante da tela.
    waterTemperature: round(27 + Math.sin(index / 5) * 0.3),
  }));
}

function round(value: number) { return Math.round(value * 10) / 10; }
