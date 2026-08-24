/* eslint-disable @next/next/no-html-link-for-pages */
import { UserIdentity } from "../components/UserIdentity";
import { HomeForecast } from "../components/ForecastVisuals";
import { beaches, featuredBeach } from "../lib/beaches";
import { getBestWindow, getLiveConditions } from "../lib/beach-conditions";

// A data mostrada no cabeçalho precisa refletir o dia real de cada visita, não um valor fixo
// travado no protótipo original (que sempre dizia "Quinta, 20 de agosto", errado em qualquer
// outro dia). force-dynamic garante que o servidor recalcule isso a cada requisição.
export const dynamic = "force-dynamic";

const Icon=({name}:{name:string})=><svg aria-hidden="true"><use href={`/handoff-assets/quipraia-icons.svg#icon-${name}`}/></svg>;

function todayLabel() {
  const label = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", timeZone: "America/Bahia" });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

const nearbySlugs = ["praia-do-flamengo", "itapua", "jaguaribe"];

export default async function AppHome(){
  const nearby = nearbySlugs.map((slug) => beaches.find((beach) => beach.slug === slug)!);
  const [conditions, bestWindow] = await Promise.all([
    getLiveConditions([featuredBeach, ...nearby]),
    getBestWindow(featuredBeach),
  ]);
  const featuredLive = conditions.get(featuredBeach.slug);
  const windowLabel = bestWindow ? `${bestWindow.start}–${bestWindow.end}` : "indisponível agora";
  return <main className="approved-app">
  <aside className="approved-side"><img src="/brand/final/quipraia-3c-wordmark-dark-approved.svg" alt="QuiPraia"/><small>Previsão de surf</small><nav><a className="active" href="/app"><Icon name="waves"/>Hoje</a><a href="/mapa"><Icon name="map"/>Mapa</a><a href="/comparar"><Icon name="compare"/>Comparar</a><a href="/comunidade"><Icon name="community"/>Comunidade</a><a href="/perfil"><Icon name="profile"/>Perfil</a></nav><UserIdentity className="approved-user" /></aside>
  <section className="approved-main">
    <header><div><small>{todayLabel()}</small><h1>Qual praia hoje?</h1></div><label>⌕ <input aria-label="Buscar praia ou cidade" placeholder="Buscar praia ou cidade"/></label><button>● Salvador, BA</button></header>
    <div className="approved-grid">
      <article className="approved-highlight"><img src="/images/quipraia-stella-maris-hero-v1.png" alt="Stella Maris"/><div><span className="hot-kicker">Praia em destaque</span><h2>Stella Maris</h2><p>Salvador · {featuredLive?.live ? "condição ao vivo" : "modo demonstração"}</p><b>● {featuredLive?.condition ?? "Regular"}</b><small>Session pulse</small><i style={{ width: `${featuredLive?.score ?? 50}%` }}/><footer>Melhor janela <strong>{windowLabel}</strong><a href="/praias/stella-maris">Ver praia</a></footer></div></article>
      <HomeForecast beach={featuredBeach} />
      <article className="approved-near"><span className="hot-kicker">Perto de você</span><h2>Compare rapidamente</h2>{nearby.map((beach) => { const live = conditions.get(beach.slug); const wave = live?.waveHeight ?? beach.wave; const period = live?.wavePeriod ?? beach.period; const wind = live?.windSpeed != null ? Math.round(live.windSpeed) : beach.wind; const condition = live?.condition ?? beach.condition; return <a href="/comparar" key={beach.slug}><Icon name="waves"/><span><strong>{beach.name}</strong><small>{wave.toFixed(1)} m · {Math.round(period)} s · {beach.windDirection} {wind} km/h</small></span><b>{condition}</b></a>; })}</article>
    </div>
    <aside className="approved-app-ad"><span><small>Espaço parceiro</small><strong>Anuncie aqui. Fortaleça o movimento surf.</strong></span><p>Conecte sua marca à comunidade que vive o mar.</p><a href="mailto:anuncie@quipraia.com">Quero anunciar</a></aside>
  </section>
</main>}
