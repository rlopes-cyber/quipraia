"use client";

import { useEffect, useState } from "react";
import type { TideExtremeEvent } from "./tide-database";
import type { SunMoonInfo } from "./sun-moon";

type TideDayResponse = { date: string; model: string; extremes: TideExtremeEvent[]; sunMoon: SunMoonInfo };

// Mesmo padrão do useForecast (forecast-client.ts): sem estado de "loading" separado setado
// direto no efeito (o eslint react-hooks recomenda derivar em vez de chamar setState síncrono
// logo no início do efeito) — "carregando" aqui é só "ainda não chegou nem deu erro".
export function useTideDay(dateStr: string) {
  const [data, setData] = useState<TideDayResponse | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/tide-day?date=${encodeURIComponent(dateStr)}`, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error("tide-day"); return response.json() as Promise<TideDayResponse>; })
      .then((response) => { setData(response); setError(false); })
      .catch((reason: unknown) => { if (!(reason instanceof DOMException && reason.name === "AbortError")) setError(true); });
    return () => controller.abort();
  }, [dateStr]);

  return { data, error, loading: data === null && !error };
}
