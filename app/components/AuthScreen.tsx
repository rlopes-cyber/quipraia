/* eslint-disable @next/next/no-html-link-for-pages */
type AuthScreenProps = { mode: "login" | "signup" };

export function AuthScreen({ mode }: AuthScreenProps) {
  const signup = mode === "signup";
  return (
    <main className="auth-page">
      <section className="auth-visual">
        <img src="/images/quipraia-stella-maris-hero-v1.png" alt="Surf em Stella Maris" />
        <div className="auth-visual-shade" />
        <a href="/" aria-label="Voltar ao início"><img className="auth-logo" src="/brand/final/quipraia-3c-wordmark-light-approved.svg" alt="QuiPraia" /></a>
        <div className="auth-quote"><p>“O mar muda.<br />Sua leitura também.”</p><span>Swell · Maré · Vento</span></div>
      </section>
      <section className="auth-form-wrap">
        <div className="auth-form">
          <p className="eyebrow dark"><span /> {signup ? "Sua próxima sessão começa aqui" : "Bom ter você de volta"}</p>
          <h1>{signup ? "Crie sua conta" : "Entre no QuiPraia"}</h1>
          <p>{signup ? "Salve praias, publique relatos e acompanhe o mar com a comunidade." : "Acesse suas praias favoritas e veja o que está funcionando agora."}</p>
          <a className="auth-google" href={signup ? "/app?novo=google" : "/app?login=google"}><GoogleMark /> Continuar com Google</a>
          <div className="form-divider"><span /> ou use seu e-mail <span /></div>
          <form action="/app">
            {signup ? <label>Nome<input required name="name" autoComplete="name" placeholder="Como podemos chamar você?" /></label> : null}
            <label>E-mail<input required type="email" name="email" autoComplete="email" placeholder="voce@email.com" /></label>
            <label>Senha<input required minLength={6} type="password" name="password" autoComplete={signup ? "new-password" : "current-password"} placeholder="Mínimo de 6 caracteres" /></label>
            <button className="button" type="submit">{signup ? "Criar conta" : "Entrar"} <span>↗</span></button>
          </form>
          <p className="auth-switch">{signup ? "Já tem uma conta?" : "Ainda não tem conta?"} <a href={signup ? "/entrar" : "/cadastro"}>{signup ? "Entrar" : "Cadastre-se grátis"}</a></p>
        </div>
      </section>
    </main>
  );
}

function GoogleMark() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="google-mark"><path fill="#4285F4" d="M22.6 12.2c0-.7-.1-1.5-.2-2.2H12v4.3h6a5.1 5.1 0 0 1-2.2 3.3v2.8h3.6c2.1-2 3.2-4.8 3.2-8.2Z"/><path fill="#34A853" d="M12 23c3 0 5.6-1 7.4-2.6l-3.6-2.8c-1 .7-2.3 1.1-3.8 1.1-2.9 0-5.4-2-6.3-4.7H2v2.9A11.2 11.2 0 0 0 12 23Z"/><path fill="#FBBC05" d="M5.7 14a6.8 6.8 0 0 1 0-4.1V7H2a11.1 11.1 0 0 0 0 9.9L5.7 14Z"/><path fill="#EA4335" d="M12 5.3c1.7 0 3.2.6 4.4 1.7l3.1-3.1A10.5 10.5 0 0 0 12 1 11.2 11.2 0 0 0 2 7l3.7 2.9c.9-2.7 3.4-4.6 6.3-4.6Z"/></svg>;
}
