"use client";
/* eslint-disable @next/next/no-html-link-for-pages */

import { FormEvent, useState } from "react";
import { signInWithGoogle, signInWithPassword, signUpWithPassword } from "../lib/supabase";
type AuthScreenProps = { mode: "login" | "signup" };

export function AuthScreen({ mode }: AuthScreenProps) {
  const signup = mode === "signup";
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  async function google() { setLoading(true); const result = await signInWithGoogle(); if (!result.configured) { window.location.href = "/app?modo=demonstracao"; return; } if (result.error) setMessage(result.error.message); setLoading(false); }
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setLoading(true); setMessage(""); const form = new FormData(event.currentTarget); const email = String(form.get("email") ?? ""); const password = String(form.get("password") ?? ""); const result = signup ? await signUpWithPassword(String(form.get("name") ?? ""), email, password) : await signInWithPassword(email, password); if (!result.configured) { window.location.href = "/app?modo=demonstracao"; return; } if (result.error) setMessage(result.error.message); else if (signup) setMessage("Conta criada. Verifique seu e-mail para confirmar o acesso."); else window.location.href = "/app"; setLoading(false); }
  return <main className="approved-auth">
    <a className="approved-auth-brand" href="/"><img src="/brand/final/quipraia-3c-wordmark-dark-approved.svg" alt="QuiPraia" /></a>
    <section className="approved-auth-card">
      <img src="/brand/final/quipraia-3c-wordmark-dark-approved.svg" alt="QuiPraia" />
      <span className="hot-kicker">{signup ? "Criar conta" : "Entrar"}</span>
      <h1>{signup ? "Entre para a comunidade." : "Que bom ter você de volta."}</h1>
      <p>{signup ? "Leva menos de um minuto." : "Entre para ver as condições das suas praias."}</p>
      <button className="approved-google" type="button" onClick={google} disabled={loading}><i>G</i>{signup ? "Cadastrar com Google" : "Continuar com Google"}</button>
      <div className="approved-divider"><span/>{signup ? "ou preencha" : "ou use seu e-mail"}<span/></div>
      <form onSubmit={submit}>
        {signup ? <label>Nome<input required name="name" autoComplete="name" placeholder="Como quer ser chamado?" /></label> : null}
        <label>E-mail<input required type="email" name="email" autoComplete="email" placeholder="voce@email.com" /></label>
        <label>{signup ? "Criar senha" : "Senha"}<input required minLength={8} type="password" name="password" autoComplete={signup ? "new-password" : "current-password"} placeholder={signup ? "Mínimo de 8 caracteres" : "••••••••"} /></label>
        {signup ? <label className="approved-check"><input required type="checkbox"/> Li e aceito os Termos de Uso e a Política de Privacidade.</label> : <div className="approved-options"><label><input type="checkbox"/> Manter conectado</label><a href="/recuperar-senha">Esqueci minha senha</a></div>}
        {message ? <p className="auth-feedback" role="status">{message}</p> : null}
        <button className="hot-button" type="submit" disabled={loading}>{loading ? "Aguarde" : signup ? "Criar minha conta" : "Entrar"}</button>
      </form>
      <p className="approved-switch">{signup ? "Já tem conta?" : "Ainda não tem conta?"} <a href={signup ? "/entrar" : "/cadastro"}>{signup ? "Entrar" : "Criar conta grátis"}</a></p>
    </section>
    <small>Google acelera o acesso; e-mail preserva a escolha do usuário. Apple não faz parte do escopo.</small>
  </main>;
}
