// Extrai a tábua de maré real (preamar/baixa-mar) do Porto de Salvador a partir da página pública
// do surfguru, que redistribui a previsão oficial da Marinha do Brasil para esse porto:
// https://surfguru.com.br/previsao/mare/40140
//
// Por quê: o Open-Meteo (usado para onda/vento/temperatura) documenta que sea_level_height_msl
// "tem precisão limitada em áreas costeiras" e "não substitui a tábua de maré náutica" — ele mistura
// maré astronômica com efeito de pressão atmosférica e variação oceânica, e pode divergir da maré
// real até na direção (subindo/descendo). Usar os horários e alturas reais de preamar/baixa-mar e
// interpolar entre eles é muito mais fiel à curva real do que esse modelo meteorológico.
//
// Fragilidade conhecida: isto é raspagem de uma página pública, não uma API com contrato. Se o
// surfguru mudar o layout/formato, o parser pode parar de encontrar dados — nesse caso o código que
// chama isto cai de volta para a estimativa do Open-Meteo (ver fetchCityTide em open-meteo.ts).

export type TideExtreme = { time: string; height: number };

const SURFGURU_PORT_ID = "40140"; // PORTO DE SALVADOR - BA (conferido em surfguru.com.br/previsao/mare/40140)
const WEEKDAYS = "Dom|Seg|Ter|Qua|Qui|Sex|Sab";

function bahiaNow(): { day: number; month: number; year: number } {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Bahia", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  return { day: get("day"), month: get("month"), year: get("year") };
}

function nextMonth(month: number, year: number) {
  return month === 12 ? { month: 1, year: year + 1 } : { month: month + 1, year };
}

// O parser trabalha em cima do TEXTO visível da página (tags removidas), não de nomes de classe
// CSS — é o que menos muda se o site for redesenhado. Achatamos TUDO pra uma única string (tags
// viram espaço, não quebra de linha) porque não temos garantia de qual elemento é inline ou bloco
// no HTML real — depender de quebras de linha específicas já se mostrou frágil em teste. Em cima
// dessa string achatada, procuramos, na ordem em que aparecem no documento, cabeçalhos de dia
// ("01 - Sab") e entradas de maré ("HH:MMh X.Xm"; uma por preamar/baixa-mar). A linha de
// nascer/pôr do sol e da lua (horários separados por "|") nunca bate no formato de entrada de
// maré, então é ignorada naturalmente.
function parseMonthPage(html: string, month: number, year: number): TideExtreme[] {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ");

  const tokenRe = new RegExp(`(\\d{1,2})\\s*-\\s*(${WEEKDAYS})\\b|(\\d{1,2}):(\\d{2})h\\s+(-?\\d+(?:\\.\\d+)?)m`, "g");
  const extremes: TideExtreme[] = [];
  let currentDay: number | null = null;
  let match: RegExpExecArray | null;
  while ((match = tokenRe.exec(text)) !== null) {
    if (match[2]) {
      currentDay = Number(match[1]);
      continue;
    }
    if (currentDay == null) continue;
    const [, , , hh, mm, heightStr] = match;
    const mo = String(month).padStart(2, "0");
    const da = String(currentDay).padStart(2, "0");
    extremes.push({ time: `${year}-${mo}-${da}T${hh.padStart(2, "0")}:${mm}:00-03:00`, height: Number(heightStr) });
  }
  return extremes;
}

let extremesPromise: Promise<TideExtreme[]> | null = null;

// Busca o mês atual + o mês seguinte (cobre virada de mês sem precisar recalcular em cima da hora),
// com cache de 6h — a tábua de maré de um mês não muda de um request para o outro, então não faz
// sentido raspar a cada acesso. Mesma estratégia de promise-por-render de fetchCityTide: dedupe
// dentro do mesmo request, sem cache permanente em memória do módulo.
export function fetchCityTideExtremes(): Promise<TideExtreme[]> {
  if (extremesPromise) return extremesPromise;
  const request = (async () => {
    const now = bahiaNow();
    const next = nextMonth(now.month, now.year);
    const urls = [
      `https://surfguru.com.br/previsao/mare/${SURFGURU_PORT_ID}/m?mes=${now.month}&ano=${String(now.year).slice(2)}`,
      `https://surfguru.com.br/previsao/mare/${SURFGURU_PORT_ID}/m?mes=${next.month}&ano=${String(next.year).slice(2)}`,
    ];
    const responses = await Promise.all(urls.map((url) => fetch(url, { next: { revalidate: 21600 }, headers: { "User-Agent": "Mozilla/5.0 (compatible; QuiPraiaBot/1.0; +https://quipraia.vercel.app)" } })));
    if (responses.some((response) => !response.ok)) throw new Error("Não foi possível ler a tábua de maré.");
    const htmls = await Promise.all(responses.map((response) => response.text()));
    const extremes = [
      ...parseMonthPage(htmls[0], now.month, now.year),
      ...parseMonthPage(htmls[1], next.month, next.year),
    ].sort((a, b) => a.time.localeCompare(b.time));
    if (extremes.length < 4) throw new Error("Tábua de maré vazia ou fora do formato esperado.");
    return extremes;
  })();
  extremesPromise = request;
  request.finally(() => { extremesPromise = null; });
  return request;
}

// Interpola a curva de maré entre os dois extremos (preamar/baixa-mar) mais próximos de `atIso`,
// usando meia-onda de cosseno — aproximação padrão para o formato da curva de maré real entre um
// pico e o próximo. "rising" vem direto da comparação entre os dois extremos reais, não de ruído
// de modelo hora a hora.
export function interpolateTide(extremes: TideExtreme[], atIso: string): { height: number; rising: boolean } | null {
  const t = new Date(atIso).getTime();
  let before: TideExtreme | null = null;
  let after: TideExtreme | null = null;
  for (const extreme of extremes) {
    const et = new Date(extreme.time).getTime();
    if (et <= t && (!before || et > new Date(before.time).getTime())) before = extreme;
    if (et >= t && (!after || et < new Date(after.time).getTime())) after = extreme;
  }
  if (!before || !after) return null;
  if (before.time === after.time) return { height: before.height, rising: true };
  const t0 = new Date(before.time).getTime();
  const t1 = new Date(after.time).getTime();
  const fraction = (t - t0) / (t1 - t0);
  const height = before.height + (after.height - before.height) * (1 - Math.cos(fraction * Math.PI)) / 2;
  return { height: Math.round(height * 100) / 100, rising: after.height >= before.height };
}
