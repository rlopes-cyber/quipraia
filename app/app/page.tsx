/* eslint-disable @next/next/no-html-link-for-pages */
import { UserIdentity } from "../components/UserIdentity";

const Icon=({name}:{name:string})=><svg aria-hidden="true"><use href={`/handoff-assets/quipraia-icons.svg#icon-${name}`}/></svg>;
const Metric=({name,label,value}:{name:string,label:string,value:string})=><div className="approved-metric"><Icon name={name}/><span>{label}<strong>{value}</strong></span></div>;

export default function AppHome(){return <main className="approved-app">
  <aside className="approved-side"><img src="/brand/final/quipraia-3c-wordmark-dark-approved.svg" alt="QuiPraia"/><small>Previsão de surf</small><nav><a className="active" href="/app"><Icon name="waves"/>Hoje</a><a href="/mapa"><Icon name="map"/>Mapa</a><a href="/comparar"><Icon name="compare"/>Comparar</a><a href="/comunidade"><Icon name="community"/>Comunidade</a><a href="/perfil"><Icon name="profile"/>Perfil</a></nav><UserIdentity className="approved-user" /></aside>
  <section className="approved-main">
    <header><div><small>Quinta, 20 de agosto</small><h1>Qual praia hoje?</h1></div><label>⌕ <input aria-label="Buscar praia ou cidade" placeholder="Buscar praia ou cidade"/></label><button>● Salvador, BA</button></header>
    <div className="approved-grid">
      <article className="approved-highlight"><img src="/images/quipraia-stella-maris-hero-v1.png" alt="Stella Maris"/><div><span className="hot-kicker">Praia em destaque</span><h2>Stella Maris</h2><p>Salvador · atualização há 8 min</p><b>● Bom</b><small>Session pulse</small><i/><footer>Melhor janela <strong>06:20–08:10</strong><a href="/praias/stella-maris">Ver praia</a></footer></div></article>
      <article className="approved-condition"><span className="hot-kicker">Agora · 08:20</span><h2>Condição atual</h2><div><Metric name="waves" label="Ondas" value="1.6 m"/><Metric name="period" label="Período" value="11 s"/><Metric name="wind" label="Vento" value="14 km/h"/><Metric name="tide" label="Maré" value="0.6 m ↑"/></div></article>
      <article className="approved-tide"><div><span className="hot-kicker">Maré · próximas 12h</span><h2>Curva e extremos</h2></div><svg viewBox="0 0 800 180" role="img" aria-label="Curva da maré nas próximas 12 horas"><defs><linearGradient id="tidefill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9fd3c6" stopOpacity=".34"/><stop offset="1" stopColor="#9fd3c6" stopOpacity="0"/></linearGradient></defs><path className="fill" d="M0 140 C110 110 125 18 250 32 S390 166 520 150 S665 25 800 32 L800 180 L0 180Z"/><path d="M0 140 C110 110 125 18 250 32 S390 166 520 150 S665 25 800 32"/><line x1="95" y1="10" x2="95" y2="170"/><circle cx="95" cy="100" r="7"/><text x="0" y="176">06h</text><text x="190" y="176">09h</text><text x="385" y="176">12h</text><text x="580" y="176">15h</text><text x="765" y="176">18h</text></svg></article>
      <article className="approved-near"><span className="hot-kicker">Perto de você</span><h2>Compare rapidamente</h2>{[["Praia do Flamengo","1.4 m · 10 s · L 12 km/h","Bom"],["Itapuã","1.1 m · 8 s · L 16 km/h","Regular"],["Jaguaribe","1.3 m · 9 s · NE 13 km/h","Bom"]].map(x=><a href="/comparar" key={x[0]}><Icon name="waves"/><span><strong>{x[0]}</strong><small>{x[1]}</small></span><b>{x[2]}</b></a>)}</article>
    </div>
    <aside className="approved-app-ad"><span><small>Espaço parceiro</small><strong>Anuncie aqui. Fortaleça o movimento surf.</strong></span><p>Conecte sua marca à comunidade que vive o mar.</p><a href="mailto:anuncie@quipraia.com">Quero anunciar</a></aside>
  </section>
</main>}
