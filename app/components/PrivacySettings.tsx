"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "../lib/supabase";
import { CONSENT_CATEGORIES, type ConsentCategory } from "../lib/legal";
import { acceptAllOptional, rejectAllOptional, setCategory, useCookieConsent } from "../lib/cookie-consent";

export function PrivacySettings() {
  const consent = useCookieConsent();
  const [userId, setUserId] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [saving, setSaving] = useState<ConsentCategory | null>(null);

  useEffect(() => {
    let cancelled = false;
    const client = getSupabaseBrowserClient();
    const settle = client ? client.auth.getUser().then(({ data }) => data.user?.id ?? null) : Promise.resolve(null);
    settle.then((id) => {
      if (cancelled) return;
      setUserId(id);
      setCheckingSession(false);
    });
    return () => { cancelled = true; };
  }, []);

  async function toggle(category: ConsentCategory) {
    const nextGranted = !consent[category];
    setCategory(category, nextGranted);
    if (!userId) return;
    setSaving(category);
    const client = getSupabaseBrowserClient();
    await client?.from("consent_preferences").upsert(
      { user_id: userId, category, granted: nextGranted, changed_at: new Date().toISOString() },
      { onConflict: "user_id,category" },
    );
    setSaving(null);
  }

  return <>
    <h2>Cookies e comunicações opcionais</h2>
    <p>Cookies necessários (sessão e segurança) ficam sempre ativos e não aparecem aqui. Os opcionais abaixo só são ativados com a sua escolha explícita.</p>

    <div className="legal-form" style={{ maxWidth: "none" }}>
      {CONSENT_CATEGORIES.map((item) => (
        <div className="consent-row" key={item.key}>
          <div>
            <strong>{item.label}</strong>
            <p>{item.description}</p>
          </div>
          <button
            type="button"
            className="consent-toggle"
            data-on={consent[item.key]}
            aria-pressed={consent[item.key]}
            aria-label={`Cookies de ${item.label}`}
            disabled={saving === item.key}
            onClick={() => toggle(item.key)}
          ><span /></button>
        </div>
      ))}
    </div>

    <div className="cookie-banner-actions" style={{ marginTop: 18 }}>
      <button type="button" className="cookie-accept" onClick={() => acceptAllOptional()}>Aceitar todos os opcionais</button>
      <button type="button" className="cookie-reject" onClick={() => rejectAllOptional()}>Recusar todos os opcionais</button>
    </div>

    {!checkingSession && !userId ? <p className="legal-form-status" style={{ marginTop: 20 }}>Você não está autenticado. Essa escolha vale apenas para este navegador. Entre na sua conta para que a preferência também fique salva no seu perfil.</p> : null}

    <h2>Seus dados</h2>
    <p>Exportação automática dos seus dados e exclusão de conta com um clique ainda não estão disponíveis neste preview. Para pedir acesso, correção, portabilidade ou exclusão dos seus dados, use a <a href="/privacidade/solicitacao">Central de privacidade</a>: sua solicitação fica registrada com protocolo e é tratada manualmente pela equipe até que o fluxo automático exista.</p>
  </>;
}
