/* eslint-disable @next/next/no-html-link-for-pages */
const Icon = ({ name }: { name: string }) => (
  <svg aria-hidden="true" className="feature-icon">
    <use href={`/handoff-assets/quipraia-icons.svg#icon-${name}`} />
  </svg>
);

const GoogleMark = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="google-mark">
    <path fill="#4285F4" d="M22.6 12.2c0-.7-.1-1.5-.2-2.2H12v4.3h6a5.1 5.1 0 0 1-2.2 3.3v2.8h3.6c2.1-2 3.2-4.8 3.2-8.2Z" />
    <path fill="#34A853" d="M12 23c3 0 5.6-1 7.4-2.6l-3.6-2.8c-1 .7-2.3 1.1-3.8 1.1-2.9 0-5.4-2-6.3-4.7H2v2.9A11.2 11.2 0 0 0 12 23Z" />
    <path fill="#FBBC05" d="M5.7 14a6.8 6.8 0 0 1 0-4.1V7H2a11.1 11.1 0 0 0 0 9.9L5.7 14Z" />
    <path fill="#EA4335" d="M12 5.3c1.7 0 3.2.6 4.4 1.7l3.1-3.1A10.5 10.5 0 0 0 12 1 11.2 11.2 0 0 0 2 7l3.7 2.9c.9-2.7 3.4-4.6 6.3-4.6Z" />
  </svg>
);

export default function Home() {
  return (
    <main>
      <header className="site-header shell">
        <a href="#inicio" className="brand-link" aria-label="QuiPraia — início">
          <img src="/brand/final/quipraia-3c-wordmark-dark-approved.svg" alt="QuiPraia" />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#como-funciona">Como funciona</a>
          <a href="#praias">Praias</a>
          <a href="#comunidade">Comunidade</a>
          <a href="#planos">Planos</a>
        </nav>
        <div className="header-actions">
          <a href="/entrar" className="link-button">Entrar</a>
          <a href="/cadastro" className="button button-small">Criar conta</a>
        </div>
      </header>

      <section className="hero" id="inicio">
        <img className="hero-photo" src="/images/quipraia-stella-maris-hero-v1.png" alt="Surfista entrando no mar em Stella Maris" />
        <div className="hero-shade" />
        <div className="hero-content shell">
          <p className="eyebrow"><span /> Previsão local. Decisão mais segura.</p>
          <h1>Qual praia<br /><em>hoje?</em></h1>
          <p className="hero-copy">Descubra onde o mar está funcionando em Salvador. Swell, maré, vento e relatos da comunidade em uma leitura simples.</p>
          <div className="hero-actions">
            <a className="button" href="/cadastro">Criar minha conta <span>↗</span></a>
            <a className="google-button" href="/entrar?provider=google"><GoogleMark /> Continuar com Google</a>
          </div>
          <p className="hero-note">Grátis para começar · sem cartão</p>
        </div>
        <a className="scroll-cue" href="#como-funciona" aria-label="Ver como funciona">Explorar <span>↓</span></a>
      </section>

      <section className="intro shell" id="como-funciona">
        <div className="section-lead">
          <p className="eyebrow dark"><span /> Tudo que muda sua sessão</p>
          <h2>Leia o mar.<br />Escolha seu pico.</h2>
        </div>
        <p className="section-copy">O QuiPraia combina previsão costeira e experiência de quem está na areia para transformar dados técnicos em uma decisão rápida.</p>
      </section>

      <section className="features shell" id="praias">
        <article className="feature-card featured">
          <div className="icon-frame"><Icon name="wave" /></div>
          <span>01</span>
          <h3>Ondas</h3>
          <p>Altura, período, direção e energia do swell organizados por horário.</p>
          <strong>Veja quando entra melhor ↗</strong>
        </article>
        <article className="feature-card">
          <div className="icon-frame"><Icon name="tide" /></div>
          <span>02</span>
          <h3>Maré</h3>
          <p>Curva, preamar, baixa-mar e movimento para entender cada janela.</p>
          <strong>Planeje pela maré ↗</strong>
        </article>
        <article className="feature-card">
          <div className="icon-frame"><Icon name="wind" /></div>
          <span>03</span>
          <h3>Vento</h3>
          <p>Direção, intensidade e rajadas com leitura de terral e maral.</p>
          <strong>Leia as condições ↗</strong>
        </article>
      </section>

      <section className="product" id="comunidade">
        <div className="product-inner shell">
          <div className="product-copy">
            <p className="eyebrow"><span /> Salvador ao vivo</p>
            <h2>Dez praias.<br />Uma leitura.</h2>
            <p>Acompanhe Stella Maris, Flamengo, Jaguaribe, Piatã, Itapuã e outros picos em uma navegação feita para quem surfa.</p>
            <ul>
              <li><span>●</span> Mapa costeiro e praias favoritas</li>
              <li><span>●</span> Relatos e fotos da comunidade</li>
              <li><span>●</span> Comparação entre condições</li>
            </ul>
            <a className="text-cta" href="/cadastro">Explorar praias <span>↗</span></a>
          </div>
          <div className="device-stage">
            <div className="coral-disc" />
            <img src="/images/quipraia-app-preview.png" alt="Prévia do aplicativo QuiPraia com previsão de surf" />
          </div>
        </div>
      </section>

      <aside className="ad-slot shell" aria-label="Espaço publicitário">
        <div><span>Espaço local</span><strong>Anuncie aqui.</strong></div>
        <p>Fortaleça o movimento surf.</p>
        <a href="mailto:anuncie@quipraia.com">Quero anunciar ↗</a>
      </aside>

      <section className="plans shell" id="planos">
        <div className="section-lead">
          <p className="eyebrow dark"><span /> Escolha como participar</p>
          <h2>Comece grátis.<br />Fortaleça depois.</h2>
        </div>
        <div className="plan-grid">
          <article className="plan-card">
            <p>Gratuito</p><h3>R$ 0</h3><span>para sempre</span>
            <ul><li>Previsão das praias</li><li>Mapa e favoritos</li><li>Relatos da comunidade</li></ul>
            <a className="button secondary" href="/cadastro">Criar conta</a>
          </article>
          <article className="plan-card collaborator">
            <div className="plan-label">Mais completo</div>
            <p>Colaborador</p><h3><small>R$</small> 9,90</h3><span>por mês</span>
            <ul><li>Tudo do plano gratuito</li><li>Mais dias e comparações</li><li>Experiência sem anúncios</li><li>Apoio direto ao projeto</li></ul>
            <a className="button" href="/cadastro?plano=colaborador">Quero colaborar</a>
          </article>
        </div>
      </section>

      <section className="final-cta">
        <img src="/brand/final/quipraia-3c-symbol-light-approved.svg" alt="" />
        <h2>O mar muda.<br /><em>Sua leitura também.</em></h2>
        <p>Crie sua conta e encontre a praia certa para a próxima sessão.</p>
        <a className="button light" href="/cadastro">Entrar no QuiPraia <span>↗</span></a>
      </section>

      <footer className="footer shell">
        <img src="/brand/final/quipraia-3c-wordmark-dark-approved.svg" alt="QuiPraia" />
        <p>Qual praia hoje?<br /><span>Swell · Maré · Vento</span></p>
        <nav><a href="#como-funciona">Produto</a><a href="#planos">Planos</a><a href="mailto:contato@quipraia.com">Contato</a></nav>
        <small>© 2026 QuiPraia. Feito em Salvador para o mar.</small>
      </footer>
    </main>
  );
}
