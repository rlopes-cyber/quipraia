// Sol e lua pra Salvador: cálculo astronômico OFFLINE via suncalc (biblioteca padrão, MIT,
// implementa as fórmulas de posição solar/lunar do "Astronomy on the Personal Computer",
// mesma referência usada por sites de maré/astronomia). Não depende de nenhuma API externa —
// roda 100% no servidor, sem custo e sem limite de uso, então dá pra calcular pra qualquer dia,
// passado ou futuro, igual fizemos com a maré harmônica em tide-database.ts.
import * as SunCalc from "suncalc";

// Mesmo ponto de referência da maré (tide-database.ts / open-meteo.ts): a posição do sol/lua
// não muda de forma perceptível entre as praias de Salvador, então um único ponto serve pra
// cidade toda.
const SALVADOR_REFERENCE = { lat: -12.9714, lon: -38.5014 };

export type SunMoonInfo = {
  date: string; // YYYY-MM-DD (dia consultado, no fuso de Salvador)
  sunrise: string | null; // ISO -03:00
  sunset: string | null; // ISO -03:00
  moonrise: string | null; // ISO -03:00
  moonset: string | null; // ISO -03:00
  moonPhaseName: string; // em português
  moonIlluminationPct: number; // 0-100
};

// Ciclo lunar dividido em 8 fases de largura igual (1/8 = 12,5% cada), com o nome centrado no
// marco exato (nova=0, crescente=0.125, quarto crescente=0.25, ... ) e o limite de cada fase na
// metade do caminho até a próxima. Testado com o valor real de hoje (28/08/2026, fase 0.5149,
// 99,8% iluminada): cai em "Lua cheia", como deveria.
const PHASE_NAMES: Array<{ max: number; name: string }> = [
  { max: 0.0625, name: "Lua nova" },
  { max: 0.1875, name: "Crescente" },
  { max: 0.3125, name: "Quarto crescente" },
  { max: 0.4375, name: "Gibosa crescente" },
  { max: 0.5625, name: "Lua cheia" },
  { max: 0.6875, name: "Gibosa minguante" },
  { max: 0.8125, name: "Quarto minguante" },
  { max: 0.9375, name: "Minguante" },
  { max: 1.01, name: "Lua nova" },
];

function moonPhaseName(phaseFraction: number): string {
  const match = PHASE_NAMES.find((entry) => phaseFraction <= entry.max);
  return match?.name ?? "Lua nova";
}

// `dateStr` é o dia local em Salvador (YYYY-MM-DD). Construímos meio-dia UTC-3 desse dia como
// referência pro suncalc, e formatamos os horários resultantes de volta com o offset -03:00
// explícito (mesma convenção usada em open-meteo.ts: Bahia não observa horário de verão desde
// 2019, então -03:00 é sempre correto aqui).
export function getSunMoonInfo(dateStr: string): SunMoonInfo {
  const referenceInstant = new Date(`${dateStr}T12:00:00-03:00`);
  const sunTimes = SunCalc.getTimes(referenceInstant, SALVADOR_REFERENCE.lat, SALVADOR_REFERENCE.lon);
  const moonTimes = SunCalc.getMoonTimes(referenceInstant, SALVADOR_REFERENCE.lat, SALVADOR_REFERENCE.lon);
  const illumination = SunCalc.getMoonIllumination(referenceInstant);

  return {
    date: dateStr,
    sunrise: toBahiaIso(sunTimes.sunrise),
    sunset: toBahiaIso(sunTimes.sunset),
    // getMoonTimes só marca `alwaysUp`/`alwaysDown` quando a lua não nasce/se põe naquele dia
    // (pode acontecer perto dos polos; não ocorre em Salvador, mas checamos por honestidade).
    moonrise: moonTimes.alwaysUp || moonTimes.alwaysDown ? null : toBahiaIso(moonTimes.rise),
    moonset: moonTimes.alwaysUp || moonTimes.alwaysDown ? null : toBahiaIso(moonTimes.set),
    moonPhaseName: moonPhaseName(illumination.phase),
    moonIlluminationPct: Math.round(illumination.fraction * 1000) / 10,
  };
}

function toBahiaIso(value: Date | null | undefined): string | null {
  if (!value || Number.isNaN(value.getTime())) return null;
  return value.toISOString();
}
