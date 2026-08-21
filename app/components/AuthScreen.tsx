/* eslint-disable @next/next/no-html-link-for-pages */
type AuthScreenProps = { mode: "login" | "signup" };

export function AuthScreen({ mode }: AuthScreenProps) {
  const signup = mode === "signup";
  return <main className="approved-auth">
    <a className="approved-auth-brand" href="/"><img src="/brand/final/quipraia-3c-wordmark-dark-approved.svg" alt="QuiPraia" /></a>
    <section className="approved-auth-card">
      <img src="/brand/final/quipraia-3c-wordmark-dark-approved.svg" alt="QuiPraia" />
      <span className="hot-kicker">{signup ? "Criar conta" : "Entrar"}</span>
      <h1>{signup ? "Entre para a comunidade." : "Que bom ter você de volta."}</h1>
      <p>{signup ? "Leva menos de um minuto." : "Entre para ver as condições das suas praias."}</p>
      <a className="approved-google" href="/app?provider=google"><i>G</i>{signup ? "Cadastrar com Google" : "Continuar com Google"}</a>
      <div className="approved-divider"><span/>{signup ? "ou preencha" : "ou use seu e-mail"}<span/></div>
      <form action="/app">
        {signup ? <label>Nome<input required name="name" autoComplete="name" placeholder="Como quer ser chamado?" /></label> : null}
        <label>E-mail<input required type="email" name="email" autoComplete="email" placeholder="voce@email.com" /></label>
        <label>{signup ? "Criar senha" : "Senha"}<input required minLength={8} type="password" name="password" autoComplete={signup ? "new-password" : "current-password"} placeholder={signup ? "Mínimo de 8 caracteres" : "••••••••"} /></label>
        {signup ? <label className="approved-check"><input required type="checkbox"/> Li e aceito os Termos de Uso e a Política de Privacidade.</label> : <div className="approved-options"><label><input type="checkbox"/> Manter conectado</label><a href="/recuperar-senha">Esqueci minha senha</a></div>}
        <button className="hot-button" type="submit">{signup ? "Criar minha conta" : "Entrar"}</button>
      </form>
      <p className="approved-switch">{signup ? "Já tem conta?" : "Ainda não tem conta?"} <a href={signup ? "/entrar" : "/cadastro"}>{signup ? "Entrar" : "Criar conta grátis"}</a></p>
    </section>
    <small>Google acelera o acesso; e-mail preserva a escolha do usuário. Apple não faz parte do escopo.</small>
  </main>;
}
