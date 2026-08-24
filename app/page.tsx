import { beaches } from "./lib/beaches";
import { LEGAL_LINKS } from "./lib/legal";
import { getLiveConditions } from "./lib/beach-conditions";

const MarineIcon = ({ name }: { name: string }) => <svg aria-hidden="true"><use href={`/handoff-assets/quipraia-icons.svg#icon-${name}`} /></svg>;

export default async function Home() {
  const featured = [beaches[0], beaches[1], beaches[2], beaches[4]];
  const conditions = await getLiveConditions(featured);
  return <main className="hot-page">
    <header className="hot-header hot-shell">
      <a href="#inicio"><img src="/brand/final/quipraia-3c-wordmark-dark-approved.svg" alt="QuiPraia" /></a>
      <nav aria-label="Navegação principal"><a href="#como">Como funciona</a><a href="#praias">Praias</a><a href="#comunidade">Comunidade</a><a href="#planos">Planos</a></nav>
      <div><a href="/entrar">Entrar</a><a className="hot-button" href="/cadastro">Criar conta <b>→</b></a></div>
    </header>

    <section className="hot-hero" id="inicio">
      <img className="hot-hero-photo" src="/images/quipraia-stella-maris-hero-v1.png" alt="Mar e ondas em Stella Maris" />
      <div className="hot-hero-overlay" />
      <div className="hot-shell hot-hero-grid">
        <div className="hot-hero-copy">
          <span className="hot-kicker">Previsão + comunidade surf</span>
          <h1>Qual praia hoje?</h1>
          <h2>Decida melhor. Chegue na hora certa.</h2>
          <p>Maré, ondas, vento e relatos de quem está na água: reunidos em uma leitura simples para o seu próximo surf.</p>
          <div className="hot-actions"><a className="hot-button" href="/cadastro">✉ <strong>Criar conta com e-mail</strong></a><a className="hot-button outline" href="/entrar?provider=google"><i>G</i><strong>Continuar com Google</strong></a></div>
          <small>Escolha Google ou cadastro com e-mail · sem cartão · acesso gratuito</small>
          <ul><li>Começando por Salvador</li><li>Dados atualizados</li><li>Feito para surfistas</li></ul>
        </div>
        <div className="hot-phone" aria-label="Prévia do QuiPraia no celular"><div className="hot-phone-speaker"/><img src="/images/quipraia-app-preview.png" alt="Tela inicial do QuiPraia" /></div>
      </div>
    </section>

    <section className="hot-info hot-shell" id="como">
      <span className="hot-kicker">Tudo o que muda a sessão</span><h2>Informação completa, sem complicar a leitura.</h2>
      <div className="hot-info-grid">
        <article><MarineIcon name="waves"/><div><h3>Ondas</h3><p>Altura, período, direção e energia.</p></div></article>
        <article><MarineIcon name="tide"/><div><h3>Maré</h3><p>Curva, preamar, baixa-mar e movimento.</p></div></article>
        <article><MarineIcon name="wind"/><div><h3>Vento</h3><p>Média, rajadas e direção ao longo do dia.</p></div></article>
      </div>
    </section>

    <section className="hot-beaches hot-shell" id="praias">
      <div className="hot-section-heading"><div><span className="hot-kicker">Salvador de ponta a ponta</span><h2>Veja a praia antes de escolher.</h2></div><a href="/mapa">Explorar todas as praias →</a></div>
      <div>{featured.map((beach) => { const live = conditions.get(beach.slug); const wave = live?.waveHeight ?? beach.wave; const period = live?.wavePeriod ?? beach.period; const condition = live?.condition ?? beach.condition; return <a href={`/praias/${beach.slug}`} key={beach.slug}><img loading="lazy" src={beach.image} style={{ objectPosition: beach.imagePosition }} alt={`Vista editorial de ${beach.name}`} /><span><strong>{beach.name}</strong><small><b className={condition.toLowerCase()}>{condition}</b>{wave.toFixed(1)} m · {Math.round(period)} s</small></span></a>; })}</div>
    </section>

    <section className="hot-plans hot-shell" id="planos">
      <span className="hot-kicker">Escolha como participar</span><h2>Comece grátis. Fortaleça quando quiser.</h2>
      <div className="hot-plan-grid">
        <article><h3>Gratuito</h3><div className="hot-price">R$ 0 <small>para começar</small></div><ul><li>Condição atual e próximas 12 horas</li><li>Praias de Salvador e relatos da comunidade</li><li>Apoiado por anúncios de parceiros</li></ul><a className="hot-button outline" href="/cadastro">Criar conta grátis</a></article>
        <article className="recommended"><b>Recomendado</b><h3>Colaborador</h3><div className="hot-price">R$ 9,90 <small>por mês</small></div><ul><li>Tudo do Gratuito + previsão estendida</li><li>Comparação, alertas e favoritos sem limite</li><li>Navegação sem anúncios e apoio ao movimento surf</li></ul><a className="hot-button" href="/cadastro?plano=colaborador">Quero colaborar</a></article>
      </div>
    </section>

    <aside className="hot-ad hot-shell"><strong>Anuncie aqui</strong><span>Fortaleça o movimento surf e conecte sua marca à comunidade.</span><a href="mailto:anuncie@quipraia.com">Quero anunciar →</a></aside>
    <footer className="hot-footer hot-shell">
      <img src="/brand/final/quipraia-3c-lockup-dark-approved.svg" alt="QuiPraia: Qual praia hoje?"/>
      <nav className="hot-footer-legal" aria-label="Links legais">{LEGAL_LINKS.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
      <span>Salvador, BA · Swell · Maré · Vento</span>
    </footer>
  </main>;
}
