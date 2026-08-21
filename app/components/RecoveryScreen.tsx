"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { friendlyAuthError } from "../lib/auth-paths";
import { requestPasswordReset, updatePassword } from "../lib/supabase";

export function RecoveryScreen({ mode, initialMessage = "" }: { mode: "request" | "update"; initialMessage?: string }) {
  const update = mode === "update";
  const [message, setMessage] = useState(initialMessage);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const result = update ? await updatePassword(String(form.get("password") ?? "")) : await requestPasswordReset(String(form.get("email") ?? ""));
    if (!result.configured) {
      setMessage("Modo de demonstração ativo. Configure o Supabase para enviar e-mails de recuperação.");
    } else if (result.error) {
      setMessage(friendlyAuthError(result.error.message));
    } else if (update) {
      window.location.href = "/entrar?status=password_updated";
      return;
    } else {
      setComplete(true);
      setMessage("Confira seu e-mail. Enviamos um link para criar uma nova senha.");
    }
    setLoading(false);
  }

  return <main className="approved-auth">
    <Link className="approved-auth-brand" href="/"><img src="/brand/final/quipraia-3c-wordmark-dark-approved.svg" alt="QuiPraia" /></Link>
    <section className="approved-auth-card">
      <span className="hot-kicker">{update ? "Nova senha" : "Recuperar acesso"}</span>
      <h1>{update ? "Crie uma nova senha." : "Vamos recuperar sua conta."}</h1>
      <p>{update ? "Use pelo menos 8 caracteres para proteger seu acesso." : "Informe o e-mail usado no cadastro."}</p>
      <form onSubmit={submit}>
        {update ? <label>Nova senha<input required minLength={8} type="password" name="password" autoComplete="new-password" placeholder="Mínimo de 8 caracteres" /></label> : <label>E-mail<input required type="email" name="email" autoComplete="email" placeholder="voce@email.com" disabled={complete} /></label>}
        {message ? <p className="auth-feedback" role="status">{message}</p> : null}
        {!complete ? <button className="hot-button" type="submit" disabled={loading}>{loading ? "Aguarde" : update ? "Salvar nova senha" : "Enviar link de recuperação"}</button> : null}
      </form>
      <p className="approved-switch"><Link href="/entrar">Voltar para entrar</Link></p>
    </section>
    <small>Seu acesso é protegido pelo Supabase. A QuiPraia nunca solicitará sua senha por mensagem.</small>
  </main>;
}
