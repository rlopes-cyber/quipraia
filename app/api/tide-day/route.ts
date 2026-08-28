import { fetchTideExtremesForDate } from "../../lib/tide-database";
import { getSunMoonInfo } from "../../lib/sun-moon";

// YYYY-MM-DD, sempre no fuso de Salvador (-03:00 fixo).
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(request: Request) {
  const requestedDate = new URL(request.url).searchParams.get("date");
  const date = requestedDate && DATE_PATTERN.test(requestedDate) ? requestedDate : todayInBahia();

  try {
    const [extremes, sunMoon] = await Promise.all([
      fetchTideExtremesForDate(date),
      // getSunMoonInfo é síncrono (cálculo local), mas embrulhamos numa promise pra rodar em
      // paralelo com a busca de rede da maré em vez de esperar ela terminar primeiro à toa.
      Promise.resolve(getSunMoonInfo(date)),
    ]);
    return Response.json({
      date,
      model: "Cálculo harmônico de maré (TICON-4) + posição solar/lunar (suncalc)",
      extremes,
      sunMoon,
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Falha ao calcular a maré desse dia." },
      { status: 502 }
    );
  }
}

function todayInBahia(): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bahia", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}
