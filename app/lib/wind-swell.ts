import type { Beach } from "./beaches";

// Mesma convenção de 8 pontos usada em ForecastVisuals.tsx (compass()): N, NE, L, SE, S, SO, O, NO.
const COMPASS_POINTS = ["N", "NE", "L", "SE", "S", "SO", "O", "NO"] as const;
const COMPASS_DEGREES: Record<(typeof COMPASS_POINTS)[number], number> = {
  N: 0, NE: 45, L: 90, SE: 135, S: 180, SO: 225, O: 270, NO: 315,
};

export function degreesToCompass(deg: number): (typeof COMPASS_POINTS)[number] {
  return COMPASS_POINTS[Math.round(deg / 45) % 8];
}

function angularDiff(a: number, b: number) {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
}

export type DirectionVerdict = {
  label: string;
  favorable: boolean | null; // null = sem dado suficiente para avaliar
};

// Vento: quando a praia tem uma direção de face sourced (facingDegrees), calculamos offshore/onshore
// por geometria (vento contrário à face = offshore = bom). Sem facingDegrees, comparamos a direção do
// vento ao vivo contra a lista de "melhores ventos" citada pela fonte para aquele pico.
export function classifyWind(windDirectionDeg: number | null | undefined, beach: Beach): DirectionVerdict {
  if (windDirectionDeg == null) return { label: "Direção do vento indisponível", favorable: null };
  const point = degreesToCompass(windDirectionDeg);
  const surf = beach.surf;
  if (surf?.facingDegrees != null) {
    const offshoreDir = (surf.facingDegrees + 180) % 360;
    const diffFromOffshore = angularDiff(windDirectionDeg, offshoreDir);
    if (diffFromOffshore <= 45) return { label: `${point} · terral (offshore) — favorável`, favorable: true };
    const diffFromOnshore = angularDiff(windDirectionDeg, surf.facingDegrees);
    if (diffFromOnshore <= 45) return { label: `${point} · maral (onshore) — desfavorável`, favorable: false };
    return { label: `${point} · vento de través (cross-shore)`, favorable: null };
  }
  if (surf?.bestWindDirections?.length) {
    const favorable = surf.bestWindDirections.includes(point);
    return { label: `${point} · ${favorable ? "dentro da janela citada pela fonte" : "fora da janela citada pela fonte"}`, favorable };
  }
  return { label: `${point} · sem dado de vento ideal para este pico`, favorable: null };
}

// Swell: só avaliamos quando a fonte cita explicitamente as direções que funcionam bem nesse pico.
export function classifySwell(waveDirectionDeg: number | null | undefined, beach: Beach): DirectionVerdict {
  if (waveDirectionDeg == null) return { label: "Direção de swell indisponível", favorable: null };
  const point = degreesToCompass(waveDirectionDeg);
  const surf = beach.surf;
  if (surf?.bestSwellDirections?.length) {
    const favorable = surf.bestSwellDirections.includes(point);
    return { label: `${point} · ${favorable ? "swell na direção favorável" : "swell fora da direção favorável"}`, favorable };
  }
  return { label: `${point} · sem dado de swell ideal para este pico`, favorable: null };
}

export { COMPASS_DEGREES };
