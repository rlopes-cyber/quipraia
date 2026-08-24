/* eslint-disable @next/next/no-html-link-for-pages */
import { UserIdentity } from "../components/UserIdentity";
import { HomeForecast } from "../components/ForecastVisuals";
import { featuredBeach } from "../lib/beaches";

// A data mostrada no cabeçalho precisa refletir o dia real de cada visita, não um valor fixo
// travado no protótipo original (que sempre dizia "Quinta, 20 de agosto", errado em qualquer
// outro dia). force-dynamic garante que o servidor recalcule isso a cada requisição.
export const dynamic = "force-dynamic";

const Icon=({name}:{name:string})=><svg aria-hidden="true"><use href={`/handoff-assets/quipraia-icons.svg#icon-${name}`}/></svg>;

function todayLabel() {
  const label = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", timeZone: "America/Bahia" });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export default function AppHome(){return <main className="approved-app">
  <aside className="approved-side"><img src="/brand/final/quipraia-3c-wordmark-dark-approved.svg" alt="QuiPraia"/><small>Previsão de surf</small><nav><a className="active" href="/app"><Icon name="waves"/>Hoje</a><a href="/mapa"><Icon name="map"/>Mapa</a><a href="/comparar"><Icon name="compare"/>Comparar</a><a href="/comunidade"><Icon name="community"/>Comunidade</a><a href="/perfil"><Icon name="profile"/>Perfil</a></nav><UserIdentity className="approved-user" /></aside>
  <section className="approved-main">
    <header><div><small>{todayLabel()}</small><h1>Qual praia hoje?</h1></div><label>⌕ <input aria-label="Buscar praia ou cidade" placeholder="Buscar praia ou cidade"/></label><button>● Salvador, BA</button></header>
    <div className="approved-grid">
      <article className="approved-highlight"><img src="/images/quipraia-stella-maris-hero-v1.png" alt="Stella Maris"/><div><span className="hot-kicker">Praia em destaque</span><h2>Stella Maris</h2><p>Salvador · atualização há 8 min</p><b>● Bom</b><small>Session pulse</small><i/><footer>Melhor janela <strong>06:20–08:10</strong><a href="/praias/stella-maris">Ver praia</a></footer></div></article>
      <HomeForecast beach={featuredBeach} />
      <article className="approved-near"><span className="hot-kicker">Perto de você</span><h2>Compare rapidamente</h2>{[["Praia do Flamengo","1.4 m · 10 s · L 12 km/h","Bom"],["Itapuã","1.1 m · 8 s · L 16 km/h","Regular"],["Jaguaribe","1.3 m · 9 s · NE 13 km/h","Bom"]].map(x=><a href="/comparar" key={x[0]}><Icon name="waves"/><span><strong>{x[0]}</strong><small>{x[1]}</small></span><b>{x[2]}</b></a>)}</article>
    </div>
    <aside className="approved-app-ad"><span><small>Espaço parceiro</small><strong>Anuncie aqui. Fortaleça o movimento surf.</strong></span><p>Conecte sua marca à comunidade que vive o mar.</p><a href="mailto:anuncie@quipraia.com">Quero anunciar</a></aside>
  </section>
</main>}
