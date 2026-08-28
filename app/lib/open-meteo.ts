import type { Beach } from "./beaches";
import { fetchHarmonicTideTimeline, interpolateHarmonicTide } from "./tide-database";
import { fetchCityTideExtremes, interpolateTide } from "./tide-scrape";

export type ForecastPoint = {
  time: string;
  waveHeight: number | null;
  wavePeriod: number | null;
  waveDirection: number | null;
  windSpeed: number | null;
  windDirection: number | null;
  seaLevel: number | null;
  waterTemperature: number | null;
  // Índice UV máximo do dia (escala OMS, 0 pra cima). A API do Open-Meteo só publica UV como
  // agregado diário (não por hora), então o mesmo valor se repete em todos os pontos daquele dia
  // — é assim que a maioria dos apps de tempo mostra UV mesmo (pico do dia, não variação hora a
  // hora).
  uvIndex: number | null;
};

type HourlyResponse = { hourly?: Record<string, Array<string | number | null>> };
type WeatherResponse = HourlyResponse & { daily?: Record<string, Array<string | number | null>> };

// Ponto de referência único para a maré de toda a cidade (ver getCityTide abaixo): perto da boca
// da Baía de Todos os Santos / Farol da Barra, região onde a Marinha do Brasil referencia a maré
// oficial de Salvador. Todas as praias do app ficam no mesmo regime de maré regional, então usar
// um único ponto remove uma variação artificial que era apenas ruído de grade do modelo, e não
// diferença real de maré entre as praias.
const CITY_TIDE_REFERENCE = { lat: -13.0100, lon: -38.5325 };

let cityTidePromise: Promise<HourlyResponse> | null = null;

// FALLBACK apenas: se a raspagem da tábua de maré real (tide-scrape.ts) falhar, caímos de volta
// pra estimativa do Open-Meteo (sea_level_height_msl) pra não deixar a tela sem nenhum dado de
// maré. O Next.js deduplica fetches idênticos dentro do mesmo request/render (Request Memoization),
// então mesmo chamando isso para cada praia, a rede só é acionada uma vez por render. O cache em
// memória do módulo cobre os casos em que isso roda fora desse ciclo.
function fetchCityTide(): Promise<HourlyResponse> {
  if (cityTidePromise) return cityTidePromise;
  const tideUrl = new URL("https://marine-api.open-meteo.com/v1/marine");
  tideUrl.search = new URLSearchParams({ latitude: String(CITY_TIDE_REFERENCE.lat), longitude: String(CITY_TIDE_REFERENCE.lon), hourly: "sea_level_height_msl", timezone: "America/Bahia", forecast_days: "2" }).toString();
  const request = fetch(tideUrl, { next: { revalidate: 3600 } })
    .then((response) => { if (!response.ok) throw new Error("Não foi possível atualizar a maré."); return response.json() as Promise<HourlyResponse>; });
  cityTidePromise = request;
  // Só reaproveitamos a promise para as chamadas concorrentes dentro do MESMO render (as N praias
  // são buscadas em paralelo). Depois que resolve/falha, limpamos a referência: a próxima renderização
  // chama fetch() de novo, e quem garante a atualização a cada 1h e o cache entre requests é o
  // próprio Next.js (next.revalidate), não esta variável de módulo.
  request.finally(() => { cityTidePromise = null; });
  return request;
}

export async function fetchOpenMeteoForecast(beach: Beach): Promise<ForecastPoint[]> {
  const marineUrl = new URL("https://marine-api.open-meteo.com/v1/marine");
  marineUrl.search = new URLSearchParams({ latitude: String(beach.lat), longitude: String(beach.lon), hourly: "wave_height,wave_direction,wave_period,sea_surface_temperature", timezone: "America/Bahia", forecast_days: "2" }).toString();
  const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
  // uv_index_max só existe como variável DIÁRIA na API (confirmado na documentação oficial do
  // Open-Meteo) — não tem versão por hora, então pedimos junto com o hourly de vento na mesma
  // chamada em vez de criar uma requisição extra só pra isso.
  weatherUrl.search = new URLSearchParams({ latitude: String(beach.lat), longitude: String(beach.lon), hourly: "wind_speed_10m,wind_direction_10m", daily: "uv_index_max", wind_speed_unit: "kmh", timezone: "America/Bahia", forecast_days: "2" }).toString();
  const [marineResponse, weatherResponse] = await Promise.all([
    fetch(marineUrl, { next: { revalidate: 3600 } }),
    fetch(weatherUrl, { next: { revalidate: 3600 } }),
  ]);
  if (!marineResponse.ok || !weatherResponse.ok) throw new Error("Não foi possível atualizar a previsão modelada.");
  const [marine, weather] = await Promise.all([marineResponse.json() as Promise<HourlyResponse>, weatherResponse.json() as Promise<WeatherResponse>]);
  const times = marine.hourly?.time ?? [];
  const uvIndexToday = numberAt(weather.daily?.uv_index_max, 0);

  // Maré, em ordem de preferência (cada nível só é buscado se o anterior falhar, pra não
  // gastar chamada à toa):
  //   1) Cálculo harmônico real (TICON-4 via openwaters.io, tide-database.ts) — mesmo tipo de
  //      cálculo que sites como tabuademares.com fazem, com dado de estação real de Salvador.
  //   2) Tábua de preamar/baixa-mar do Porto de Salvador raspada do surfguru (tide-scrape.ts).
  //   3) Estimativa do Open-Meteo (sea_level_height_msl) — a menos precisa das três, mas evita
  //      deixar a tela sem nenhum dado de maré se as duas fontes reais acima falharem.
  const harmonicTimeline = await fetchHarmonicTideTimeline().catch(() => null);
  const tideExtremes = harmonicTimeline ? null : await fetchCityTideExtremes().catch(() => null);
  const modelTide = harmonicTimeline || tideExtremes ? null : await fetchCityTide().catch(() => null);

  // Open-Meteo retorna horários locais "soltos" (ex.: 2026-08-24T18:00), sem offset de fuso.
  // Sem o offset explícito, o navegador do visitante interpretaria esse horário no SEU fuso local
  // (não no fuso da Bahia), o que pode selecionar a hora errada como "agora" e mostrar
  // maré/onda de um horário diferente do real. A Bahia não observa horário de verão desde 2019,
  // então o offset -03:00 é sempre correto aqui.
  return times.map((time, index) => {
    const iso = `${String(time)}-03:00`;
    const harmonic = harmonicTimeline ? interpolateHarmonicTide(harmonicTimeline, iso) : null;
    const scraped = !harmonic && tideExtremes ? interpolateTide(tideExtremes, iso) : null;
    const seaLevel = harmonic
      ? harmonic.height
      : scraped
        ? scraped.height
        : modelTide
          ? numberAt(modelTide.hourly?.sea_level_height_msl, index)
          : null;
    return {
      time: iso,
      waveHeight: numberAt(marine.hourly?.wave_height, index),
      wavePeriod: numberAt(marine.hourly?.wave_period, index),
      waveDirection: numberAt(marine.hourly?.wave_direction, index),
      windSpeed: numberAt(weather.hourly?.wind_speed_10m, index),
      windDirection: numberAt(weather.hourly?.wind_direction_10m, index),
      seaLevel,
      waterTemperature: numberAt(marine.hourly?.sea_surface_temperature, index),
      uvIndex: uvIndexToday,
    };
  });
}

function numberAt(values: Array<string | number | null> | undefined, index: number) { const value = values?.[index]; return typeof value === "number" ? value : null; }
