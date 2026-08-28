// Maré calculada a partir de constantes harmônicas REAIS (TICON-4 — dataset público,
// licença CC BY 4.0, DGFI-TUM/SEANOE, baseado em anos de leitura de marégrafo), via a API
// gratuita e sem cadastro do openwaters.io (https://openwaters.io/api). Isso é literalmente
// "o mesmo cálculo" que sites como tabuademares.com fazem: soma de senoides harmônicas
// (M2, S2, K1, O1 etc.) ajustadas à estação de maré mais próxima — só que aqui rodamos
// contra uma estação real de Salvador (ticon/salvador-708b-bra-uhslc_rq), sem precisar
// raspar HTML de terceiro nem pagar por nenhuma API.
//
// Por que isso e não reimplementar a soma harmônica nós mesmos: o openwaters.io já publica
// o resultado do cálculo pronto (endpoint /tides/timeline), então não precisamos re-hospedar
// as constantes nem reescrever a fórmula — só consumir o resultado, do mesmo jeito que já
// fazíamos com o Open-Meteo para onda/vento. Preferimos o dado real de terceiro (com
// verificação e fallback) a fabricar constantes nossas sem fonte.

import { bahiaToday } from "./bahia-date";

export type TidePoint = { time: string; height: number };

// Ponto de referência único pra maré da cidade toda (mesmo ponto/raciocínio do
// CITY_TIDE_REFERENCE em open-meteo.ts): perto da boca da Baía de Todos os Santos, onde a
// estação real de Salvador do TICON-4 está ancorada.
const SALVADOR_REFERENCE = { lat: -12.9714, lon: -38.5014 };

type TimelineResponse = {
  station?: { id?: string; name?: string };
  timeline?: Array<{ time: string; level: number }>;
};

let timelinePromise: Promise<TidePoint[]> | null = null;

// Mesmo padrão de cache-por-render do fetchCityTide em open-meteo.ts: reaproveita a promise
// só entre chamadas concorrentes do mesmo request (as N praias buscadas em paralelo), depois
// libera — quem cuida do cache entre requests é o next.revalidate do próprio fetch.
export function fetchHarmonicTideTimeline(): Promise<TidePoint[]> {
  if (timelinePromise) return timelinePromise;
  const request = (async () => {
    // BUG REAL corrigido (achado ao vivo em produção): antes a janela começava em `new Date()`
    // (o instante exato da chamada). O array hourly.time do Open-Meteo (open-meteo.ts) começa
    // à MEIA-NOITE local do dia atual, não "agora" — então qualquer horário entre meia-noite e
    // o instante da chamada ficava ANTES do início desta janela, sem ponto "antes" pra
    // interpolar, e interpolateHarmonicTide() retornava null pra esses horários (inclusive o
    // "agora" exibido na tela, que é arredondado pra hora cheia). Começar à meia-noite do dia
    // de Salvador garante que a janela cobre o mesmo intervalo que o hourly.time do Open-Meteo.
    const start = new Date(`${bahiaToday()}T00:00:00-03:00`);
    const end = new Date(start.getTime() + 3 * 24 * 60 * 60 * 1000);
    const url = new URL("https://api.openwaters.io/tides/timeline");
    url.search = new URLSearchParams({
      latitude: String(SALVADOR_REFERENCE.lat),
      longitude: String(SALVADOR_REFERENCE.lon),
      start: start.toISOString(),
      end: end.toISOString(),
    }).toString();
    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error("Não foi possível calcular a maré (openwaters.io).");
    const data = (await response.json()) as TimelineResponse;
    const timeline = data.timeline ?? [];
    if (timeline.length < 10) throw new Error("Cálculo de maré vazio.");
    return timeline.map((point) => ({ time: point.time, height: point.level }));
  })();
  timelinePromise = request;
  request.finally(() => {
    timelinePromise = null;
  });
  return request;
}

// Interpola linearmente entre os dois pontos calculados (grade de ~10 em 10 min) mais
// próximos do horário pedido. Como os pontos já são o resultado da soma harmônica real
// (não extremos esparsos), a interpolação linear entre eles é precisa — diferente da
// aproximação por cosseno que usávamos em tide-scrape.ts entre preamar/baixa-mar distantes.
export function interpolateHarmonicTide(
  timeline: TidePoint[],
  atIso: string
): { height: number; rising: boolean } | null {
  const t = new Date(atIso).getTime();
  let before: TidePoint | null = null;
  let after: TidePoint | null = null;
  for (const point of timeline) {
    const pt = new Date(point.time).getTime();
    if (pt <= t && (!before || pt > new Date(before.time).getTime())) before = point;
    if (pt >= t && (!after || pt < new Date(after.time).getTime())) after = point;
  }
  if (!before || !after) return null;
  if (before.time === after.time) {
    return { height: Math.round(before.height * 100) / 100, rising: true };
  }
  const t0 = new Date(before.time).getTime();
  const t1 = new Date(after.time).getTime();
  const fraction = (t - t0) / (t1 - t0);
  const height = before.height + (after.height - before.height) * fraction;
  return { height: Math.round(height * 100) / 100, rising: after.height >= before.height };
}


// --- Consulta de maré por dia específico (passado ou futuro) ---------------------------------
// Diferente de fetchHarmonicTideTimeline() acima (que sempre olha "agora + 2 dias" pra
// alimentar o gráfico de previsão), isto aqui atende o recurso de "ver a maré de outro dia":
// o usuário escolhe uma data qualquer e buscamos só a preamar/baixa-mar (extremos) daquele dia,
// usando o endpoint /tides/extremes do openwaters.io, que já devolve os eventos classificados
// (high/low) prontos — sem precisarmos interpolar nada aqui.

export type TideExtremeEvent = { time: string; height: number; isHigh: boolean };

type ExtremesResponse = {
  extremes?: Array<{ time: string; level: number; high?: boolean; low?: boolean }>;
};

// `dateStr` é a data local em Salvador (YYYY-MM-DD). Cada chamada busca só aquele dia
// (00:00 às 24:00, fuso -03:00 fixo — Bahia não observa horário de verão desde 2019), sem
// cache de módulo: diferente da previsão "de agora", aqui cada data é um pedido independente
// do usuário (não faz sentido reaproveitar entre dias diferentes).
export async function fetchTideExtremesForDate(dateStr: string): Promise<TideExtremeEvent[]> {
  const start = new Date(`${dateStr}T00:00:00-03:00`);
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
  const url = new URL("https://api.openwaters.io/tides/extremes");
  url.search = new URLSearchParams({
    latitude: String(SALVADOR_REFERENCE.lat),
    longitude: String(SALVADOR_REFERENCE.lon),
    start: start.toISOString(),
    end: end.toISOString(),
  }).toString();
  // Datas passadas/futuras distantes não mudam de resultado (é cálculo, não medição ao vivo),
  // então um cache de 1 dia é só pra não bater a API à toa em cliques repetidos do usuário.
  const response = await fetch(url, { next: { revalidate: 86400 } });
  if (!response.ok) throw new Error("Não foi possível calcular a maré desse dia.");
  const data = (await response.json()) as ExtremesResponse;
  const extremes = data.extremes ?? [];
  return extremes.map((event) => ({
    time: event.time,
    height: Math.round(event.level * 100) / 100,
    isHigh: Boolean(event.high),
  }));
}
