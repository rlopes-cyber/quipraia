"use client";
/* eslint-disable @next/next/no-html-link-for-pages */

import { useState } from "react";

const reports = [
  {
    beach: "Stella Maris",
    author: "Marina S.",
    time: "há 18 min",
    text: "Linha boa no outside. Vento segurando.",
    status: "Publicado",
  },
  {
    beach: "Praia do Flamengo",
    author: "Caio R.",
    time: "há 42 min",
    text: "Mais cheio perto do canal.",
    status: "Publicado",
  },
  {
    beach: "Jaguaribe",
    author: "Rafael M.",
    time: "há 1h",
    text: "Onda pequena, boa para começar.",
    status: "Aguardando",
  },
];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(() =>
    typeof window !== "undefined" && window.localStorage.getItem("quipraia-admin-auth") === "true"
  );
  const [section, setSection] = useState("Visão geral");
  const [reportState, setReportState] = useState(() => {
    if (typeof window === "undefined") return reports;
    const saved = window.localStorage.getItem("quipraia-reports");
    return saved ? [...JSON.parse(saved), ...reports] : reports;
  });
  if (!authenticated)
    return (
      <AdminLogin
        onSuccess={() => {
          window.localStorage.setItem("quipraia-admin-auth", "true");
          setAuthenticated(true);
        }}
      />
    );
  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="/">
          <span className="quipraia-logo-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="quipraia-wordmark">
            <b>qui</b>
            <em>praia</em>
          </span>
        </a>
        <span className="admin-label">ADMINISTRAÇÃO</span>
        <nav>
          {[
            "Visão geral",
            "Relatos",
            "Praias",
            "Anúncios",
            "Fontes",
            "Configurações",
          ].map((item) => (
            <button
              className={section === item ? "selected" : ""}
              key={item}
              onClick={() => setSection(item)}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="admin-user">
          <i>R</i>
          <span>
            <b>Ricardo Lopes</b>
            <small>Administrador</small>
          </span>
        </div>
      </aside>
      <section className="admin-main">
        <header className="admin-header">
          <div>
            <span className="eyebrow">QUIPRAIA · BETA SALVADOR</span>
            <h1>{section}</h1>
          </div>
          <a className="view-site" href="/">
            Ver site ↗
          </a>
        </header>
        {section === "Visão geral" && (
          <>
            <div className="admin-stats">
              <article>
                <span>USUÁRIOS</span>
                <b>0</b>
                <small>beta ainda não iniciado</small>
              </article>
              <article>
                <span>RELATOS HOJE</span>
                <b>2</b>
                <small>
                  <em>+2</em> últimos 60 min
                </small>
              </article>
              <article>
                <span>PRAIAS ATIVAS</span>
                <b>4</b>
                <small>Salvador · litoral norte</small>
              </article>
              <article>
                <span>STATUS DAS FONTES</span>
                <b className="ok">●</b>
                <small>todas respondendo</small>
              </article>
            </div>
            <div className="admin-grid">
              <div className="admin-panel">
                <div className="panel-head">
                  <div>
                    <span className="eyebrow">ATIVIDADE RECENTE</span>
                    <h2>Relatos para revisar</h2>
                  </div>
                  <button onClick={() => setSection("Relatos")}>
                    Ver todos ↗
                  </button>
                </div>
                {reportState.map((report, index) => (
                  <div
                    className="admin-report"
                    key={`${report.author}-${index}`}
                  >
                    <span className="admin-avatar">{report.author[0]}</span>
                    <div>
                      <b>{report.beach}</b>
                      <p>“{report.text}”</p>
                      <small>
                        {report.author} · {report.time}
                      </small>
                    </div>
                    <span
                      className={
                        report.status === "Publicado"
                          ? "status live"
                          : "status waiting"
                      }
                    >
                      {report.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="admin-panel source-panel">
                <div className="panel-head">
                  <div>
                    <span className="eyebrow">INTEGRAÇÕES</span>
                    <h2>Saúde dos dados</h2>
                  </div>
                </div>
                <div className="source-row">
                  <span>
                    <i className="source-dot" />
                    Open-Meteo
                  </span>
                  <b>Atualizado</b>
                </div>
                <div className="source-row">
                  <span>
                    <i className="source-dot" />
                    Maré · DHN / Marinha
                  </span>
                  <b>Configurar</b>
                </div>
                <div className="source-row">
                  <span>
                    <i className="source-dot" />
                    Mapa
                  </span>
                  <b>Atualizado</b>
                </div>
                <p className="source-tip">
                  O QuiPraia mostra o horário e a fonte em cada leitura para
                  manter a confiança da comunidade.
                </p>
              </div>
            </div>
          </>
        )}
        {section === "Relatos" && (
          <div className="admin-panel full-panel">
            <div className="panel-head">
              <div>
                <span className="eyebrow">MODERAÇÃO</span>
                <h2>Relatos da comunidade</h2>
              </div>
              <button className="admin-filter">Filtrar ≡</button>
            </div>
            {reportState.map((report, index) => (
              <div className="moderation-row" key={`${report.author}-${index}`}>
                <div>
                  <b>{report.beach}</b>
                  <p>“{report.text}”</p>
                  <small>
                    {report.author} · {report.time}
                  </small>
                </div>
                <span
                  className={
                    report.status === "Publicado"
                      ? "status live"
                      : "status waiting"
                  }
                >
                  {report.status}
                </span>
                <div className="moderation-actions">
                  {report.status === "Aguardando" ? (
                    <button
                      onClick={() =>
                        setReportState(
                          reportState.map((item, i) =>
                            i === index
                              ? { ...item, status: "Publicado" }
                              : item,
                          ),
                        )
                      }
                    >
                      Aprovar
                    </button>
                  ) : (
                    <button className="muted-action">Ocultar</button>
                  )}
                  <button
                    className="deny"
                    onClick={() =>
                      setReportState(reportState.filter((_, i) => i !== index))
                    }
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {section !== "Visão geral" && section !== "Relatos" && (
          <div className="admin-panel empty-panel">
            <span className="empty-symbol">◌</span>
            <h2>{section} será configurado nesta etapa</h2>
            <p>
              A estrutura administrativa já está preparada. Aqui entrarão os
              registros, filtros e ações de operação do beta.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  function submit(event: React.FormEvent) {
    event.preventDefault();
    const demoEmail = process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL;
    const demoPassword = process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD;
    if (demoEmail && demoPassword && email.trim().toLowerCase() === demoEmail.toLowerCase() && password === demoPassword)
      onSuccess();
    else setError("E-mail ou senha incorretos.");
  }
  return (
    <main className="admin-login">
      <div className="admin-login-card">
        <a className="admin-brand" href="/">
          <span className="quipraia-logo-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="quipraia-wordmark">
            <b>qui</b>
            <em>praia</em>
          </span>
        </a>
        <span className="admin-label">ACESSO ADMINISTRATIVO</span>
        <h1>
          Operar o mar
          <br />
          <em>com contexto.</em>
        </h1>
        <p>
          Área exclusiva para moderar relatos, praias, anúncios e fontes do
          QuiPraia.
        </p>
        <form onSubmit={submit}>
          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@quipraia.com"
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Sua senha"
            />
          </label>
          {error && <span className="admin-login-error">{error}</span>}
          <button type="submit">Entrar no painel ↗</button>
        </form>
        <a className="back-to-site" href="/">
          ← Voltar para o site
        </a>
      </div>
    </main>
  );
}
