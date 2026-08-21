"use client";

import { FormEvent, useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "../lib/supabase";
import { LEGAL_CONTACT } from "../lib/legal";

type RequestType = "acesso" | "correcao" | "exclusao" | "portabilidade" | "outro";

export function PrivacyRequestForm() {
  const [userId, setUserId] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

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

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!userId) return;
    setLoading(true);
    setStatus(null);
    const form = new FormData(event.currentTarget);
    const type = String(form.get("type") ?? "outro") as RequestType;
    const message = String(form.get("message") ?? "");
    const client = getSupabaseBrowserClient();
    const { data, error } = await client!.from("privacy_requests").insert({ user_id: userId, type, message }).select("id").single();
    if (error) setStatus({ kind: "error", text: "Não foi possível registrar sua solicitação agora. Tente novamente ou escreva para o e-mail de privacidade." });
    else setStatus({ kind: "ok", text: `Solicitação registrada. Protocolo: ${data.id}` });
    setLoading(false);
    if (!error) event.currentTarget.reset();
  }

  if (checkingSession) return null;

  if (!userId) {
    return <>
      <p>Para abrir uma solicitação com protocolo, entre na sua conta primeiro.</p>
      <p>Se preferir, escreva diretamente para <a href={`mailto:${LEGAL_CONTACT.emailPrivacidade}`}>{LEGAL_CONTACT.emailPrivacidade}</a> descrevendo o que precisa (acesso, correção, portabilidade ou exclusão dos seus dados).</p>
    </>;
  }

  return <form className="legal-form" onSubmit={submit}>
    <label>Tipo de solicitação
      <select name="type" required defaultValue="acesso">
        <option value="acesso">Acesso aos meus dados</option>
        <option value="correcao">Correção de dados</option>
        <option value="portabilidade">Portabilidade</option>
        <option value="exclusao">Exclusão da conta e dados</option>
        <option value="outro">Outro</option>
      </select>
    </label>
    <label>Detalhes
      <textarea name="message" placeholder="Descreva o que você precisa." />
    </label>
    {status ? <p className={`legal-form-status${status.kind === "error" ? " error" : ""}`} role="status">{status.text}</p> : null}
    <button className="hot-button" type="submit" disabled={loading}>{loading ? "Enviando" : "Enviar solicitação"}</button>
  </form>;
}
