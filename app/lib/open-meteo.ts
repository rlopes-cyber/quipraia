import type { Beach } from "./beaches";

export type ForecastPoint = {
  time: string;
  waveHeight: number | null;
  wavePeriod: number | null;
  waveDirection: number | null;
  windSpeed: number | null;
  windDirection: number | null;
  seaLevel: number | null;
};

type HourlyResponse = { hourly?: Record<string, Array<string | number | null>> };

export async function fetchOpenMeteoForecast(beach: Beach): Promise<ForecastPoint[]> {
  const marineUrl = new URL("https://marine-api.open-meteo.com/v1/marine");
  marineUrl.search = new URLSearchParams({ latitude: String(beach.lat), longitude: String(beach.lon), hourly: "wave_height,wave_direction,wave_period,sea_level_height_msl", timezone: "America/Bahia", forecast_days: "2" }).toString();
  const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
  weatherUrl.search = new URLSearchParams({ latitude: String(beach.lat), longitude: String(beach.lon), hourly: "wind_speed_10m,wind_direction_10m", wind_speed_unit: "kmh", timezone: "America/Bahia", forecast_days: "2" }).toString();
  const [marineResponse, weatherResponse] = await Promise.all([fetch(marineUrl, { next: { revalidate: 3600 } }), fetch(weatherUrl, { next: { revalidate: 3600 } })]);
  if (!marineResponse.ok || !weatherResponse.ok) throw new Error("Não foi possível atualizar a previsão modelada.");
  const [marine, weather] = await Promise.all([marineResponse.json() as Promise<HourlyResponse>, weatherResponse.json() as Promise<HourlyResponse>]);
  const times = marine.hourly?.time ?? [];
  return times.map((time, index) => ({ time: String(time), waveHeight: numberAt(marine.hourly?.wave_height, index), wavePeriod: numberAt(marine.hourly?.wave_period, index), waveDirection: numberAt(marine.hourly?.wave_direction, index), windSpeed: numberAt(weather.hourly?.wind_speed_10m, index), windDirection: numberAt(weather.hourly?.wind_direction_10m, index), seaLevel: numberAt(marine.hourly?.sea_level_height_msl, index) }));
}

function numberAt(values: Array<string | number | null> | undefined, index: number) { const value = values?.[index]; return typeof value === "number" ? value : null; }
