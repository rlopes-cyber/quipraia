import type { Beach } from "./beaches";

export type ForecastPoint = {
  time: string;
  waveHeight: number | null;
  wavePeriod: number | null;
  waveDirection: number | null;
  windSpeed: number | null;
  windDirection: number | null;
  seaLevel: number | null;
  waterTemperature: number | null;
};

type HourlyResponse = { hourly?: Record<string, Array<string | number | null>> };

// Ponto de referência único para a maré de toda a cidade (ver getCityTide abaixo): perto da boca
// da Baía de Todos os Santos / Farol da Barra, região onde a Marinha do Brasil referencia a maré
// oficial de Salvador. Todas as praias do app ficam no mesmo regime de maré regional, então usar
// um único ponto remove uma variação artificial que era apenas ruído de grade do modelo, e não
// diferença real de maré entre as praias.
const CITY_TIDE_REFERENCE = { lat: -13.0100, lon: -38.5325 };

let cityTidePromise: Promise<HourlyResponse> | null = null;

// Busca a maré (sea_level_height_msl) uma única vez para o ponto de referência da cidade. O Next.js
// deduplica automaticamente fetches idênticos feitos durante o mesmo request/render (Request
// Memoization), então mesmo chamando isso para cada praia, a rede só é acionada uma vez por render.
// O cache em memória do módulo cobre os casos em que isso roda fora desse ciclo (ex.: chamadas
// diretas em série no mesmo processo).
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
  weatherUrl.search = new URLSearchParams({ latitude: String(beach.lat), longitude: String(beach.lon), hourly: "wind_speed_10m,wind_direction_10m", wind_speed_unit: "kmh", timezone: "America/Bahia", forecast_days: "2" }).toString();
  const [marineResponse, weatherResponse, cityTide] = await Promise.all([
    fetch(marineUrl, { next: { revalidate: 3600 } }),
    fetch(weatherUrl, { next: { revalidate: 3600 } }),
    fetchCityTide().catch(() => null),
  ]);
  if (!marineResponse.ok || !weatherResponse.ok) throw new Error("Não foi possível atualizar a previsão modelada.");
  const [marine, weather] = await Promise.all([marineResponse.json() as Promise<HourlyResponse>, weatherResponse.json() as Promise<HourlyResponse>]);
  const times = marine.hourly?.time ?? [];
  // Open-Meteo retorna horários locais "soltos" (ex.: 2026-08-24T18:00), sem offset de fuso.
  // Sem o offset explícito, o navegador do visitante interpretaria esse horário no SEU fuso local
  // (não no fuso da Bahia), o que pode selecionar a hora errada como "agora" e mostrar
  // maré/onda de um horário diferente do real. A Bahia não observa horário de verão desde 2019,
  // então o offset -03:00 é sempre correto aqui.
  return times.map((time, index) => ({
    time: `${String(time)}-03:00`,
    waveHeight: numberAt(marine.hourly?.wave_height, index),
    wavePeriod: numberAt(marine.hourly?.wave_period, index),
    waveDirection: numberAt(marine.hourly?.wave_direction, index),
    windSpeed: numberAt(weather.hourly?.wind_speed_10m, index),
    windDirection: numberAt(weather.hourly?.wind_direction_10m, index),
    seaLevel: cityTide ? numberAt(cityTide.hourly?.sea_level_height_msl, index) : null,
    waterTemperature: numberAt(marine.hourly?.sea_surface_temperature, index),
  }));
}

function numberAt(values: Array<string | number | null> | undefined, index: number) { const value = values?.[index]; return typeof value === "number" ? value : null; }
