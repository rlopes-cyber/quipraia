"use client";

import { acceptAllOptional, rejectAllOptional, useCookieConsent } from "../lib/cookie-consent";

export function CookieConsentBanner() {
  const consent = useCookieConsent();
  if (consent.decidedAt !== null) return null;

  return <div className="cookie-banner" role="dialog" aria-label="Preferências de cookies">
    <p>Usamos cookies necessários para manter sua sessão e, com sua permissão, cookies opcionais de analytics, marketing e publicidade. Veja a <a href="/cookies">Política de Cookies</a>. Fechar esta mensagem não equivale a aceitar.</p>
    <div className="cookie-banner-actions">
      <button type="button" className="cookie-accept" onClick={() => acceptAllOptional()}>Aceitar opcionais</button>
      <button type="button" className="cookie-reject" onClick={() => rejectAllOptional()}>Recusar opcionais</button>
      <a className="cookie-configure" href="/configuracoes/privacidade">Configurar</a>
    </div>
  </div>;
}
