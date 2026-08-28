// Helpers de data compartilhados entre servidor e cliente pro fuso de Salvador (Bahia não
// observa horário de verão desde 2019, então -03:00 é sempre correto). Ficam num arquivo só
// pra não duplicar a mesma lógica em cada lugar que precisa saber "que dia é hoje na Bahia".

export function bahiaToday(): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bahia", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

// Soma/subtrai dias de uma data "YYYY-MM-DD" (aritmética de calendário em UTC, não de horário
// — não precisa se preocupar com o offset de Bahia aqui, só com virar o dia certo).
export function addDays(dateStr: string, delta: number): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + delta));
  return date.toISOString().slice(0, 10);
}
