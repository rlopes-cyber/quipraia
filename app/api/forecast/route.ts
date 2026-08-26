import { beaches } from "../../lib/beaches";
import { fetchOpenMeteoForecast } from "../../lib/open-meteo";

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug") ?? "stella-maris";
  const beach = beaches.find((item) => item.slug === slug);
  if (!beach) return Response.json({ error: "Praia não encontrada." }, { status: 404 });
  try {
    const points = await fetchOpenMeteoForecast(beach);
    return Response.json({ beach: { name: beach.name, slug: beach.slug }, model: "Open-Meteo (onda/vento/temp.) + tábua do Porto de Salvador (maré)", notice: "Previsão modelada. Não usar para navegação marítima.", updatedAt: new Date().toISOString(), points });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Falha ao atualizar a previsão." }, { status: 502 });
  }
}
