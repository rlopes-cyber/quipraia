"use client";
/* eslint-disable @next/next/no-html-link-for-pages */

import { FormEvent, useState } from "react";
import { friendlyAuthError, safeAuthDestination } from "../lib/auth-paths";
import { signInWithGoogle, signInWithPassword, signUpWithPassword, getSupabaseBrowserClient } from "../lib/supabase";
import { LEGAL_DRAFT_VERSION } from "../lib/legal";
type AuthScreenProps = { mode: "login" | "signup" };

async function recordLegalAcceptance(userId: string) {
  const client = getSupabaseBrowserClient();
  if (!client) return;
  await client.from("legal_acceptances").upsert(
    [
      { user_id: userId, document_type: "termos", version: LEGAL_DRAFT_VERSION },
      { user_id: userId, document_type: "privacidade", version: LEGAL_DRAFT_VERSION },
    ],
    { onConflict: "user_id,document_type", ignoreDuplicates: true },
  );
}

export function AuthScreen({ mode, initialMessage = "" }: AuthScreenProps & { initialMessage?: string }) {
  const signup = mode === "signup";
  const [message, setMessage] = useState(initialMessage);
  const [loading, setLoading] = useState(false);
  function destination() { return safeAuthDestination(new URLSearchParams(window.location.search).get("returnTo")); }
  async function google() { setLoading(true); const result = await signInWithGoogle(destination()); if (!result.configured) { window.location.href = `${destination()}${destination().includes("?") ? "&" : "?"}modo=demonstracao`; return; } if (result.error) setMessage(friendlyAuthError(result.error.message)); setLoading(false); }
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setLoading(true); setMessage(""); const form = new FormData(event.currentTarget); const email = String(form.get("email") ?? ""); const password = String(form.get("password") ?? ""); const result = signup ? await signUpWithPassword(String(form.get("name") ?? ""), email, password, destination()) : await signInWithPassword(email, password); if (!result.configured) { window.location.href = `${destination()}${destination().includes("?") ? "&" : "?"}modo=demonstracao`; return; } if (result.error) setMessage(friendlyAuthError(result.error.message)); else if (signup && result.data.session) { await recordLegalAcceptance(result.data.session.user.id); window.location.href = destination(); } else if (signup) setMessage("Conta criada. Confira seu e-mail para confirmar o acesso."); else window.location.href = destination(); setLoading(false); }
  return <main className="approved-auth">
    <a className="approved-auth-brand" href="/"><img src="/brand/final/quipraia-3c-wordmark-dark-approved.svg" alt="QuiPraia" /></a>
    <section className="approved-auth-card">
      <img src="/brand/final/quipraia-3c-wordmark-dark-approved.svg" alt="QuiPraia" />
      <span className="hot-kicker">{signup ? "Criar conta" : "Entrar"}</span>
      <h1>{signup ? "Entre para a comunidade." : "Que bom ter você de volta."}</h1>
      <p>{signup ? "Leva menos de um minuto." : "Entre para ver as condições das suas praias."}</p>
      <button className="approved-google" type="button" onClick={google} disabled={loading}><i>G</i>{signup ? "Cadastrar com Google" : "Continuar com Google"}</button>
      {signup ? <small className="legal-inline-note">Ao continuar com o Google, você concorda com os <a href="/termos" target="_blank" rel="noopener noreferrer">Termos de Uso</a> e a <a href="/privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>.</small> : null}
      <div className="approved-divider"><span/>{signup ? "ou preencha" : "ou use seu e-mail"}<span/></div>
      <form onSubmit={submit}>
        {signup ? <label>Nome<input required name="name" autoComplete="name" placeholder="Como quer ser chamado?" /></label> : null}
        <label>E-mail<input required type="email" name="email" autoComplete="email" placeholder="voce@email.com" /></label>
        <label>{signup ? "Criar senha" : "Senha"}<input required minLength={8} type="password" name="password" autoComplete={signup ? "new-password" : "current-password"} placeholder={signup ? "Mínimo de 8 caracteres" : "••••••••"} /></label>
        {signup ? <label className="approved-check"><input required type="checkbox"/> Li e aceito os <a href="/termos" target="_blank" rel="noopener noreferrer">Termos de Uso</a> e a <a href="/privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>.</label> : <div className="approved-options"><span>Sessão protegida</span><a href="/recuperar-senha">Esqueci minha senha</a></div>}
        {message ? <p className="auth-feedback" role="status">{message}</p> : null}
        <button className="hot-button" type="submit" disabled={loading}>{loading ? "Aguarde" : signup ? "Criar minha conta" : "Entrar"}</button>
      </form>
      <p className="approved-switch">{signup ? "Já tem conta?" : "Ainda não tem conta?"} <a href={signup ? "/entrar" : "/cadastro"}>{signup ? "Entrar" : "Criar conta grátis"}</a></p>
    </section>
    <small>Google acelera o acesso; e-mail preserva a escolha do usuário. Apple não faz parte do escopo.</small>
    <nav className="legal-footer-note" aria-label="Links legais"><a href="/privacidade">Privacidade</a><a href="/termos">Termos</a><a href="/cookies">Cookies</a></nav>
  </main>;
}
