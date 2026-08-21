/* eslint-disable @next/next/no-html-link-for-pages */
import { PlanInterestButton } from "../components/PlanInterestButton";
import { LEGAL_LINKS } from "../lib/legal";

export default function PlansPage() {
  return <main className="hot-page plans-page">
    <header className="hot-header hot-shell"><a href="/"><img src="/brand/final/quipraia-3c-wordmark-dark-approved.svg" alt="QuiPraia" /></a><div><a href="/app">Voltar ao produto</a><a className="hot-button" href="/perfil">Meu perfil</a></div></header>
    <section className="hot-plans hot-shell"><span className="hot-kicker">Participação transparente</span><h1>Escolha como viver o QuiPraia.</h1><p className="plans-intro">O acesso gratuito mantém a informação essencial. O Colaborador amplia os recursos e ajuda a fortalecer a operação local.</p><div className="hot-plan-grid">
      <article><h3>Gratuito</h3><div className="hot-price">R$ 0 <small>para começar</small></div><ul><li>Condição atual e próximas 12 horas</li><li>Praias de Salvador e relatos da comunidade</li><li>Experiência apoiada por anúncios de parceiros</li><li>Até cinco praias favoritas</li></ul><a className="hot-button outline" href="/cadastro">Criar conta grátis</a></article>
      <article className="recommended"><b>Mais completo</b><h3>Colaborador</h3><div className="hot-price">R$ 9,90 <small>por mês</small></div><ul><li>Tudo do plano Gratuito</li><li>Previsão estendida e comparação avançada</li><li>Alertas personalizados de melhor janela</li><li>Experiência sem anúncios</li><li>Apoio direto ao movimento surf</li></ul><PlanInterestButton /><small className="billing-note">A cobrança será ativada somente após a integração segura com o provedor de pagamentos.</small></article>
    </div></section>
    <footer className="hot-footer hot-shell"><img src="/brand/final/quipraia-3c-lockup-dark-approved.svg" alt="QuiPraia: Qual praia hoje?"/><nav className="hot-footer-legal" aria-label="Links legais">{LEGAL_LINKS.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav><span>Salvador, BA · Swell · Maré · Vento</span></footer>
  </main>;
}
