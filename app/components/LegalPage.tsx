/* eslint-disable @next/next/no-html-link-for-pages */
import type { ReactNode } from "react";
import { LEGAL_LINKS, LEGAL_PLACEHOLDER_NOTICE, LEGAL_CONTACT } from "../lib/legal";

export function LegalPlaceholder({ children }: { children: ReactNode }) {
  return <span className="legal-placeholder">{children}</span>;
}

export function LegalPage({ kicker, title, children }: { kicker: string; title: string; children: ReactNode }) {
  return <main className="legal-page">
    <div className="legal-shell">
      <header className="legal-header">
        <a href="/"><img src="/brand/final/quipraia-3c-wordmark-dark-approved.svg" alt="QuiPraia" /></a>
        <a className="legal-back" href="/">← Voltar ao início</a>
      </header>
      <div className="legal-notice" role="note">{LEGAL_PLACEHOLDER_NOTICE}</div>
      <span className="hot-kicker">{kicker}</span>
      <h1>{title}</h1>
      <p className="legal-updated">Última atualização: <LegalPlaceholder>{LEGAL_CONTACT.vigencia}</LegalPlaceholder></p>
      <div className="legal-prose">{children}</div>
      <nav className="legal-crosslinks" aria-label="Outros documentos legais">
        {LEGAL_LINKS.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      </nav>
    </div>
  </main>;
}
