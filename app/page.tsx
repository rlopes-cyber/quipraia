"use client";

import { FormEvent, useEffect, useState } from "react";

type Beach = {
  id: string;
  name: string;
  place: string;
  score: number;
  wave: string;
  period: string;
  wind: string;
  color: string;
  image: string;
  note: string;
  coords: [number, number];
  bestFor: string;
  access: string;
  amenities: string;
};
type MarineData = { wave: string; period: string; direction: string };
type Report = {
  beach: string;
  author: string;
  time: string;
  text: string;
  status: "Publicado" | "Aguardando";
};
const photos = {
  stella:
    "https://www.surfbahia.com.br/midia/arquivosGerenciador/images/arquivo01Noticias/2019-03-28-pico-cobicado-stella-maris-bdc5.jpg",
  flamengo:
    "https://lirp.cdn-website.com/33a35e36/dms3rep/multi/opt/praia-do-flamengo-18-1920w.jpg",
  jaguaribe:
    "https://www.salvadordabahia.com/wp-content/uploads/2019/05/praia-de-jaguaribe--salvador-bahia--foto-amanda-oliveira-7-1024x683.jpg",
  barra:
    "https://www.salvadordabahia.com/wp-content/uploads/2019/05/farol-da-barra-salvador-bahia.jpg",
  itapua:
    "https://www.salvadordabahia.com/wp-content/uploads/2019/05/praia-de-itapua-salvador-bahia.jpg",
};
const beaches: Beach[] = [
  {
    id: "stella",
    name: "Stella Maris",
    place: "Litoral norte · Salvador",
    score: 86,
    wave: "1,2 m",
    period: "10 s",
    wind: "SE · 12 km/h",
    color: "#70d6c5",
    image: photos.stella,
    note: "Linha boa no outside, vento segurando e pouca gente na água.",
    coords: [-12.93, -38.32],
    bestFor: "Intermediário · performance",
    access: "Acesso fácil pela orla",
    amenities: "Estacionamento · quiosques",
  },
  {
    id: "flamengo",
    name: "Praia do Flamengo",
    place: "Litoral norte · Salvador",
    score: 78,
    wave: "1,0 m",
    period: "9 s",
    wind: "SE · 15 km/h",
    color: "#efbb67",
    image: photos.flamengo,
    note: "Onda divertida e espaço para remar fora do canal.",
    coords: [-12.91, -38.31],
    bestFor: "Intermediário · fun",
    access: "Acesso fácil pela orla",
    amenities: "Barracas · estacionamento",
  },
  {
    id: "itapua",
    name: "Itapuã",
    place: "Orla de Salvador",
    score: 71,
    wave: "0,8 m",
    period: "8 s",
    wind: "E · 17 km/h",
    color: "#79a5f4",
    image: photos.itapua,
    note: "Condição regular, melhor para uma sessão mais leve.",
    coords: [-12.95, -38.36],
    bestFor: "Iniciante · longboard",
    access: "Acesso pela Rua K",
    amenities: "Comércio · banheiros",
  },
  {
    id: "jaguaribe",
    name: "Jaguaribe",
    place: "Orla de Salvador",
    score: 68,
    wave: "0,7 m",
    period: "8 s",
    wind: "E · 18 km/h",
    color: "#e88977",
    image: photos.jaguaribe,
    note: "Boa porta de entrada para iniciantes e escolas locais.",
    coords: [-12.96, -38.38],
    bestFor: "Iniciante · escola",
    access: "Acesso pela orla",
    amenities: "Escolas · quiosques",
  },
  {
    id: "buracao",
    name: "Buracão",
    place: "Rio Vermelho · Salvador",
    score: 74,
    wave: "0,9 m",
    period: "9 s",
    wind: "E · 14 km/h",
    color: "#b892e8",
    image: photos.stella,
    note: "Pico mais protegido, com janela boa na maré enchendo.",
    coords: [-13.003, -38.485],
    bestFor: "Intermediário · parede",
    access: "Acesso por escadaria",
    amenities: "Comércio próximo",
  },
  {
    id: "farol",
    name: "Farol da Barra",
    place: "Barra · Salvador",
    score: 62,
    wave: "0,6 m",
    period: "7 s",
    wind: "E · 19 km/h",
    color: "#f18c70",
    image: photos.barra,
    note: "Ponto urbano para acompanhar a ondulação e o pôr do sol.",
    coords: [-13.01, -38.532],
    bestFor: "Longboard · passeio",
    access: "Acesso urbano",
    amenities: "Comércio · transporte",
  },
  {
    id: "porto",
    name: "Porto da Barra",
    place: "Barra · Salvador",
    score: 58,
    wave: "0,5 m",
    period: "7 s",
    wind: "E · 16 km/h",
    color: "#e7a95e",
    image: photos.barra,
    note: "Mais abrigada e com mar calmo; confira o movimento antes de entrar.",
    coords: [-13.006, -38.533],
    bestFor: "Iniciante · remada",
    access: "Acesso urbano",
    amenities: "Comércio · ducha",
  },
  {
    id: "piata",
    name: "Piatã",
    place: "Orla norte · Salvador",
    score: 73,
    wave: "0,9 m",
    period: "8 s",
    wind: "SE · 13 km/h",
    color: "#62b6db",
    image: photos.itapua,
    note: "Faixa extensa para distribuir a sessão e buscar a melhor formação.",
    coords: [-12.966, -38.397],
    bestFor: "Iniciante · intermediário",
    access: "Acesso pela orla",
    amenities: "Estacionamento · barracas",
  },
  {
    id: "patamares",
    name: "Patamares",
    place: "Orla sul · Salvador",
    score: 76,
    wave: "1,0 m",
    period: "9 s",
    wind: "SE · 12 km/h",
    color: "#77c48b",
    image: photos.jaguaribe,
    note: "Boa alternativa quando você quer fugir dos picos mais cheios.",
    coords: [-12.981, -38.426],
    bestFor: "Intermediário · crowd menor",
    access: "Acesso por ruas locais",
    amenities: "Estacionamento · comércio",
  },
];

function Logo() {
  return (
    <a className="brand" href="#top">
      <span className="ondai-logo-mark" aria-hidden="true">
        <i />
        <i />
      </span>
      <span>ondai</span>
    </a>
  );
}

function mapMarkerStyle(beach: Beach) {
  // Salvador's north/south order is preserved from the beach coordinates.
  // The map is still a lightweight prototype, so these values project the
  // real coordinates into the illustrated map instead of hardcoding positions.
  const north = -12.89;
  const south = -13.02;
  const west = -38.55;
  const east = -38.29;
  const top = Math.max(
    7,
    Math.min(87, ((beach.coords[0] - north) / (south - north)) * 100),
  );
  const left = Math.max(
    9,
    Math.min(86, ((beach.coords[1] - west) / (east - west)) * 100),
  );
  return { top: `${top}%`, left: `${left}%` };
}

function storeReport(report: Report) {
  const current = JSON.parse(
    window.localStorage.getItem("ondai-reports") || "[]",
  ) as Report[];
  window.localStorage.setItem(
    "ondai-reports",
    JSON.stringify([report, ...current]),
  );
}

export default function Home() {
  const [screen, setScreen] = useState<"landing" | "auth" | "app">("landing");
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup");
  useEffect(() => {
    if (window.localStorage.getItem("ondai-auth")) setScreen("app");
  }, []);
  if (screen === "auth")
    return (
      <AuthScreen
        mode={authMode}
        onBack={() => setScreen("landing")}
        onSuccess={() => setScreen("app")}
      />
    );
  if (screen === "app")
    return (
      <Dashboard
        onLogout={() => {
          window.localStorage.removeItem("ondai-auth");
          setScreen("landing");
        }}
      />
    );
  return (
    <Landing
      onSignup={() => {
        setAuthMode("signup");
        setScreen("auth");
      }}
      onLogin={() => {
        setAuthMode("login");
        setScreen("auth");
      }}
    />
  );
}

function Landing({
  onSignup,
  onLogin,
}: {
  onSignup: () => void;
  onLogin: () => void;
}) {
  return (
    <main className="landing" id="top">
      <header className="site-nav">
        <Logo />
        <nav>
          <a href="#como-funciona">Como funciona</a>
          <a href="#praias">Praias</a>
          <a href="#colaborador">Colaborador</a>
        </nav>
        <div className="nav-actions">
          <button className="ghost-button" onClick={onLogin}>
            Entrar
          </button>
          <button className="small-primary" onClick={onSignup}>
            Criar acesso
          </button>
        </div>
      </header>
      <section className="landing-hero">
        <div className="hero-word">
          <span className="eyebrow">
            CONDIÇÕES DO MAR · COMUNIDADE SURFISTA
          </span>
          <h1>
            O mar muda.
            <br />
            <em>Você se prepara.</em>
          </h1>
          <p>
            O Ondai reúne maré, ondas, vento e relatos reais para ajudar você a
            escolher melhor onde surfar.
          </p>
          <button className="hero-cta" onClick={onSignup}>
            Criar meu acesso gratuito <span>↗</span>
          </button>
          <small className="hero-note">
            Cadastro rápido · Salvador primeiro · sem cartão
          </small>
        </div>
        <div className="hero-photo">
          <img
            src={photos.stella}
            alt="Surfista entrando no mar em Stella Maris"
          />
          <div className="photo-caption">
            <span>STELLA MARIS · SALVADOR</span>
            <b>Leia o mar antes de cair.</b>
          </div>
          <div className="photo-stamp">
            01
            <br />
            <small>ONDAI</small>
          </div>
        </div>
      </section>
      <section className="proof-strip">
        <span>
          <b>01</b> mapa de praias
        </span>
        <span>
          <b>02</b> dados marítimos
        </span>
        <span>
          <b>03</b> relatos locais
        </span>
        <span>
          <b>04</b> recomendação por nível
        </span>
      </section>
      <section className="value-section" id="como-funciona">
        <div className="section-intro">
          <span className="eyebrow">POR QUE ONDAI?</span>
          <h2>
            Menos achismo.
            <br />
            <em>Mais sessão.</em>
          </h2>
          <p>
            Um lugar para olhar as condições com contexto, saber o que está
            acontecendo na água e decidir com mais segurança.
          </p>
        </div>
        <div className="value-grid">
          <article>
            <span className="value-icon wave-icon">⌁</span>
            <h3>Condição explicada</h3>
            <p>
              Maré, onda e vento em uma leitura que faz sentido para o seu
              nível.
            </p>
          </article>
          <article>
            <span className="value-icon map-icon">⌖</span>
            <h3>Praias conectadas</h3>
            <p>Compare Stella Maris, Flamengo e outros picos em um só mapa.</p>
          </article>
          <article>
            <span className="value-icon community-icon">◉</span>
            <h3>Olhar de quem está lá</h3>
            <p>
              Relatos recentes de surfistas ajudam a completar os dados
              técnicos.
            </p>
          </article>
        </div>
      </section>
      <section className="beach-photo-section" id="praias">
        <div className="section-heading">
          <div>
            <span className="eyebrow">COMEÇAMOS EM SALVADOR</span>
            <h2>O mapa começa onde você está.</h2>
          </div>
          <button className="text-link" onClick={onSignup}>
            Ver condições <span>↗</span>
          </button>
        </div>
        <div className="photo-grid">
          <button onClick={onSignup} className="photo-tile tile-wide">
            <img src={photos.stella} alt="Praia de Stella Maris" />
            <span>
              <b>Stella Maris</b>
              <small>onda consistente · 86/100</small>
            </span>
          </button>
          <button onClick={onSignup} className="photo-tile">
            <img src={photos.flamengo} alt="Praia do Flamengo" />
            <span>
              <b>Praia do Flamengo</b>
              <small>boa agora · 78/100</small>
            </span>
          </button>
          <button onClick={onSignup} className="photo-tile">
            <img src={photos.jaguaribe} alt="Praia de Jaguaribe" />
            <span>
              <b>Jaguaribe</b>
              <small>para iniciantes · 68/100</small>
            </span>
          </button>
        </div>
      </section>
      <section className="collab-explain" id="colaborador">
        <div>
          <span className="eyebrow">PARA QUEM QUER IR ALÉM</span>
          <h2>
            O gratuito ajuda.
            <br />
            <em>O Colaborador acompanha.</em>
          </h2>
        </div>
        <div className="plan-compare">
          <div>
            <span>GRATUITO</span>
            <b>O essencial para decidir.</b>
            <p>Condições, mapa, gráficos básicos e relatos da comunidade.</p>
            <button onClick={onSignup}>Começar grátis ↗</button>
          </div>
          <div className="featured-plan">
            <span>COLABORADOR</span>
            <b>Mais mar. Menos ruído.</b>
            <p>
              Sem anúncios, alertas personalizados, histórico e gráficos
              avançados.
            </p>
            <strong>
              R$ 4,90 <small>/ mês</small>
            </strong>
            <button onClick={onSignup}>Entrar na lista ↗</button>
          </div>
        </div>
      </section>
      <footer className="landing-footer">
        <Logo />
        <span>O mar para quem vive o surf.</span>
        <div>
          <a href="#como-funciona">Como funciona</a>
          <a href="#colaborador">Planos</a>
          <button onClick={onLogin}>Entrar</button>
        </div>
      </footer>
    </main>
  );
}

function AuthScreen({
  mode,
  onBack,
  onSuccess,
}: {
  mode: "signup" | "login";
  onBack: () => void;
  onSuccess: () => void;
}) {
  const [currentMode, setCurrentMode] = useState(mode);
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "")
      .trim()
      .toLowerCase();
    const password = String(form.get("password") || "");
    const nickname =
      String(form.get("nickname") || "Ricardo").trim() || "Ricardo";
    if (!email || !password) {
      setError("Preencha e-mail e senha para continuar.");
      return;
    }
    const users = JSON.parse(
      window.localStorage.getItem("ondai-users") || "[]",
    ) as Array<{ email: string; password: string; nickname: string }>;
    if (
      currentMode === "login" &&
      !users.some((user) => user.email === email && user.password === password)
    ) {
      setError(
        "Conta não encontrada. Crie seu acesso primeiro neste dispositivo.",
      );
      return;
    }
    if (
      currentMode === "signup" &&
      users.some((user) => user.email === email)
    ) {
      setError("Este e-mail já está cadastrado. Entre na sua conta.");
      return;
    }
    if (currentMode === "signup")
      window.localStorage.setItem(
        "ondai-users",
        JSON.stringify([...users, { email, password, nickname }]),
      );
    window.localStorage.setItem(
      "ondai-user",
      JSON.stringify({ email, nickname }),
    );
    window.localStorage.setItem("ondai-auth", "true");
    onSuccess();
  }
  return (
    <main className="auth-screen">
      <header className="auth-nav">
        <button onClick={onBack} className="back-link">
          ← voltar
        </button>
        <Logo />
        <span>Salvador · beta</span>
      </header>
      <div className="auth-layout">
        <div className="auth-copy">
          <span className="eyebrow">SEU MAR, SEU CONTEXTO</span>
          <h1>
            {currentMode === "signup" ? (
              <>
                Comece a<br />
                <em>ler o mar.</em>
              </>
            ) : (
              <>
                Bom te ver
                <br />
                <em>de volta.</em>
              </>
            )}
          </h1>
          <p>
            {currentMode === "signup"
              ? "Crie seu acesso para acompanhar praias, salvar favoritos e participar da comunidade Ondai."
              : "Entre para ver suas praias, seus relatos e as condições de hoje."}
          </p>
        </div>
        <form className="auth-card" onSubmit={submit}>
          <span className="card-kicker">
            {currentMode === "signup"
              ? "CRIAR ACESSO GRATUITO"
              : "ENTRAR NO ONDAI"}
          </span>
          <h2>
            {currentMode === "signup"
              ? "Sua próxima sessão começa aqui."
              : "Acesse sua conta."}
          </h2>
          <button
            className="google-button"
            type="button"
            onClick={() => {
              window.localStorage.setItem(
                "ondai-user",
                JSON.stringify({
                  email: "google-demo@ondai.local",
                  nickname: "Surfista Ondai",
                }),
              );
              window.localStorage.setItem("ondai-auth", "true");
              onSuccess();
            }}
          >
            <span className="google-mark">G</span> Continuar com Google
          </button>
          <div className="or-divider">
            <span>ou use seu e-mail</span>
          </div>
          {currentMode === "signup" && (
            <label>
              Como podemos chamar você?
              <input name="nickname" placeholder="Seu apelido no surf" />
            </label>
          )}
          <label>
            E-mail
            <input name="email" type="email" placeholder="voce@gmail.com" />
          </label>
          <label>
            Senha
            <input
              name="password"
              type="password"
              placeholder="Mínimo de 6 caracteres"
            />
          </label>
          {currentMode === "signup" && (
            <label className="check-label">
              <input type="checkbox" required />{" "}
              <span>Aceito os termos e a política de privacidade.</span>
            </label>
          )}
          {error && <div className="form-error">{error}</div>}
          <button className="form-submit" type="submit">
            {currentMode === "signup" ? "Criar meu acesso" : "Entrar"}{" "}
            <span>↗</span>
          </button>
          <button
            className="switch-auth"
            type="button"
            onClick={() =>
              setCurrentMode(currentMode === "signup" ? "login" : "signup")
            }
          >
            {currentMode === "signup"
              ? "Já tenho uma conta"
              : "Ainda não tenho acesso"}
          </button>
        </form>
      </div>
    </main>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeBeach, setActiveBeach] = useState(beaches[0]);
  const [tab, setTab] = useState("Agora");
  const [saved, setSaved] = useState(false);
  const [wind, setWind] = useState<number | null>(null);
  const [apiState, setApiState] = useState("sincronizando");
  const [view, setView] = useState<"home" | "profile">("home");
  const [mapFilter, setMapFilter] = useState("Todos");
  const [compare, setCompare] = useState<string[]>([]);
  const [mapZoom, setMapZoom] = useState(1);
  const [marine, setMarine] = useState<MarineData>({
    wave: activeBeach.wave,
    period: activeBeach.period,
    direction: "SE",
  });
  const [reportOpen, setReportOpen] = useState(false);
  const visibleBeaches =
    mapFilter === "Melhor agora"
      ? beaches.filter((beach) => beach.score >= 75)
      : mapFilter === "Iniciantes"
        ? beaches.filter((beach) =>
            beach.bestFor.toLowerCase().includes("iniciante"),
          )
        : beaches;
  function toggleCompare(beach: Beach) {
    setCompare((current) =>
      current.includes(beach.id)
        ? current.filter((id) => id !== beach.id)
        : current.length < 2
          ? [...current, beach.id]
          : [current[1], beach.id],
    );
  }
  function useLocation() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      () => setApiState("localização aproximada"),
      () => setApiState("Salvador · localização manual"),
    );
  }
  useEffect(() => {
    const [latitude, longitude] = activeBeach.coords;
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=wind_speed_10m,wind_direction_10m,temperature_2m&timezone=America%2FBahia`;
    const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${latitude}&longitude=${longitude}&current=wave_height,wave_period,wave_direction&timezone=America%2FBahia`;
    Promise.all([
      fetch(weatherUrl).then((r) => r.json()),
      fetch(marineUrl).then((r) => r.json()),
    ])
      .then(([weather, sea]) => {
        if (weather.current?.wind_speed_10m !== undefined)
          setWind(Math.round(weather.current.wind_speed_10m));
        const current = sea.current || {};
        if (current.wave_height !== undefined)
          setMarine({
            wave: `${Number(current.wave_height).toFixed(1).replace(".", ",")} m`,
            period: `${Math.round(current.wave_period || 0)} s`,
            direction: `${Math.round(current.wave_direction || 135)}°`,
          });
        setApiState("atualizado agora");
      })
      .catch(() => setApiState("última leitura local"));
  }, [activeBeach]);
  if (view === "profile")
    return (
      <>
        <header className="app-nav profile-nav">
          <Logo />
          <nav>
            <button onClick={() => setView("home")}>Condições</button>
            <button onClick={() => setView("home")}>Mapa</button>
            <button onClick={() => setView("home")}>Relatos</button>
            <button className="active" onClick={() => setView("profile")}>
              Perfil
            </button>
          </nav>
          <div className="app-user">
            <span className="free-pill">GRATUITO</span>
            <button className="user-dot" onClick={onLogout}>
              R
            </button>
          </div>
        </header>
        <ProfileView onBack={() => setView("home")} />
      </>
    );
  return (
    <main className="app-shell">
      <header className="app-nav">
        <Logo />
        <nav>
          <button className="active" onClick={() => setView("home")}>
            Condições
          </button>
          <button
            onClick={() =>
              document
                .getElementById("mapa")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Mapa
          </button>
          <button
            onClick={() =>
              document
                .getElementById("relatos")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Relatos
          </button>
          <button onClick={() => setView("profile")}>Perfil</button>
        </nav>
        <div className="app-user">
          <span className="free-pill">GRATUITO</span>
          <button className="user-dot" onClick={onLogout}>
            R
          </button>
        </div>
      </header>
      <section className="app-welcome" id="condicoes">
        <div>
          <span className="eyebrow">QUARTA, 19 DE AGOSTO · SALVADOR</span>
          <h1>
            Bom dia, Ricardo.
            <br />
            <em>O mar te espera.</em>
          </h1>
        </div>
        <button className="location-button" onClick={useLocation}>
          ⌖ Salvador　⌄
        </button>
      </section>
      <section className="app-recommendation">
        <div className="app-rec-photo">
          <img src={activeBeach.image} alt={activeBeach.name} />
          <span>ATUALIZAÇÃO DA COMUNIDADE · HÁ 18 MIN</span>
        </div>
        <div className="app-rec-copy">
          <span className="card-kicker">● MELHOR OPÇÃO AGORA</span>
          <h2>{activeBeach.name}</h2>
          <p>{activeBeach.note}</p>
          <div className="quick-stats">
            <span>
              <b>{marine.wave}</b>
              <small>onda</small>
            </span>
            <span>
              <b>{marine.period}</b>
              <small>período</small>
            </span>
            <span>
              <b>{wind ?? 12} km/h</b>
              <small>vento SE</small>
            </span>
          </div>
          <div className="recommendation-meta">
            <span>
              Melhor para <b>{activeBeach.bestFor}</b>
            </span>
            <span>{activeBeach.access}</span>
            <span>{activeBeach.amenities}</span>
          </div>
          <button className="primary-button" onClick={() => setSaved(!saved)}>
            {saved ? "Praia salva ♥" : "Salvar praia ♡"}
          </button>
        </div>
        <div className="app-score">
          <b>{activeBeach.score}</b>
          <span>/100</span>
          <small>índice Ondai</small>
        </div>
      </section>
      <section className="condition-section">
        <div className="condition-head">
          <div>
            <span className="eyebrow">
              {activeBeach.name.toUpperCase()} · PRÓXIMAS 12H
            </span>
            <h2>Escolha uma leitura.</h2>
          </div>
          <span className="source-state">● {apiState} · Open-Meteo</span>
        </div>
        <div className="condition-tabs">
          {[
            ["Agora", "◉"],
            ["Maré", "◒"],
            ["Ondas", "⌁"],
            ["Vento", "↘"],
          ].map(([item, icon]) => (
            <button
              className={tab === item ? "active" : ""}
              key={item}
              onClick={() => setTab(item)}
            >
              <span className="tab-icon">{icon}</span>
              {item}
            </button>
          ))}
        </div>
        <ConditionVisual type={tab} marine={marine} />
      </section>
      <section className="map-session" id="mapa">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              MAPA DE SESSÕES · {beaches.length} PRAIAS
            </span>
            <h2>Escolha o pico, veja a leitura.</h2>
          </div>
          <button className="text-link" onClick={() => setMapFilter("Todos")}>
            Limpar filtros　×
          </button>
        </div>
        <div className="map-tools">
          <div className="map-filters">
            {["Todos", "Melhor agora", "Iniciantes"].map((filter) => (
              <button
                key={filter}
                className={mapFilter === filter ? "active" : ""}
                onClick={() => setMapFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="map-actions">
            <button
              onClick={() => setMapZoom((value) => Math.min(1.25, value + 0.1))}
            >
              ＋
            </button>
            <button
              onClick={() => setMapZoom((value) => Math.max(0.9, value - 0.1))}
            >
              −
            </button>
            <button onClick={useLocation}>⌖ Minha localização</button>
          </div>
        </div>
        <div className="session-grid">
          <div
            className="session-map"
            style={{ "--map-zoom": mapZoom } as React.CSSProperties}
          >
            <div className="coast" />
            <span className="map-water-label">BAÍA DE TODOS-OS-SANTOS</span>
            {visibleBeaches.map((beach) => {
              const index = beaches.findIndex((item) => item.id === beach.id);
              return (
                <button
                  className={`session-marker marker-${index} ${activeBeach.id === beach.id ? "selected" : ""}`}
                  style={
                    {
                      "--marker": beach.color,
                      ...mapMarkerStyle(beach),
                    } as React.CSSProperties
                  }
                  key={beach.id}
                  onClick={() => setActiveBeach(beach)}
                >
                  <span>{beach.score}</span>
                  <small>{beach.name}</small>
                </button>
              );
            })}
          </div>
          <div className="session-photos">
            {visibleBeaches.slice(0, 6).map((beach) => (
              <button
                className={`session-photo ${activeBeach.id === beach.id ? "active" : ""}`}
                key={beach.id}
                onClick={() => {
                  setActiveBeach(beach);
                  toggleCompare(beach);
                }}
              >
                <img src={beach.image} alt={beach.name} />
                <span>
                  <b>{beach.name}</b>
                  <small>
                    {beach.wave} · {beach.period} · {beach.score}/100
                  </small>
                </span>
                <i>{compare.includes(beach.id) ? "✓" : "+"}</i>
              </button>
            ))}
          </div>
        </div>
        {compare.length > 0 && (
          <div className="compare-tray">
            <span>
              <b>COMPARAR SESSÕES</b> {compare.length}/2 selecionadas
            </span>
            <div>
              {compare.map((id) => {
                const beach = beaches.find((item) => item.id === id);
                return beach ? (
                  <button key={id} onClick={() => setActiveBeach(beach)}>
                    {beach.name}{" "}
                    <small>
                      {beach.wave} · {beach.score}
                    </small>
                  </button>
                ) : null;
              })}
            </div>
          </div>
        )}
      </section>
      <section className="app-reports" id="relatos">
        <div className="section-heading">
          <div>
            <span className="eyebrow">DA COMUNIDADE · AGORA</span>
            <h2>Relatos recentes</h2>
          </div>
          <button className="text-link">Ver todos ↗</button>
        </div>
        <div className="report-row">
          <article>
            <b>Stella Maris</b>
            <span>há 18 min</span>
            <p>
              “Linha boa no outside. Vento segurando e pouca gente na água.”
            </p>
            <small>Marina S. · intermediário</small>
          </article>
          <article>
            <b>Praia do Flamengo</b>
            <span>há 42 min</span>
            <p>“Mais cheio perto do canal, mas ainda tem espaço para remar.”</p>
            <small>Caio R. · avançado</small>
          </article>
          <button className="report-add" onClick={() => setReportOpen(true)}>
            <strong>＋</strong>
            <b>Você está no mar?</b>
            <span>Enviar relato</span>
          </button>
        </div>
      </section>
      <section className="upgrade-card">
        <div>
          <span className="eyebrow">PLANO COLABORADOR</span>
          <h2>Veja mais. Decida melhor.</h2>
          <p>Alertas, histórico e gráficos avançados sem anúncios.</p>
        </div>
        <b>
          R$ 4,90 <small>/mês</small>
        </b>
        <button>Conhecer plano ↗</button>
      </section>
      {reportOpen && (
        <ReportComposer
          beach={activeBeach}
          onClose={() => setReportOpen(false)}
        />
      )}
    </main>
  );
}

function ReportComposer({
  beach,
  onClose,
}: {
  beach: Beach;
  onClose: () => void;
}) {
  const [text, setText] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (text.trim().length < 10) return;
    const user = JSON.parse(
      window.localStorage.getItem("ondai-user") || "{}",
    ) as { nickname?: string };
    storeReport({
      beach: beach.name,
      author: user.nickname || "Surfista Ondai",
      time: "agora",
      text: text.trim(),
      status: "Aguardando",
    });
    onClose();
  }
  return (
    <div
      className="report-modal-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <form
        className="report-modal"
        onSubmit={submit}
        onClick={(event) => event.stopPropagation()}
      >
        <span className="eyebrow">RELATO DA COMUNIDADE</span>
        <h2>{beach.name}</h2>
        <p>
          Conte como está o mar. Seu relato será revisado antes de aparecer para
          todos.
        </p>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Ex.: linha abrindo, vento mudou, crowd..."
          minLength={10}
          required
        />
        <div>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit">Enviar para revisão ↗</button>
        </div>
      </form>
    </div>
  );
}

function ProfileView({ onBack }: { onBack: () => void }) {
  const [editing, setEditing] = useState(false);
  const [level, setLevel] = useState("Intermediário");
  const [nickname, setNickname] = useState("Ricardo");
  useEffect(() => {
    const user = JSON.parse(
      window.localStorage.getItem("ondai-user") || "{}",
    ) as { nickname?: string };
    if (user.nickname) setNickname(user.nickname);
  }, []);
  function saveProfile() {
    const user = JSON.parse(
      window.localStorage.getItem("ondai-user") || "{}",
    ) as Record<string, string>;
    window.localStorage.setItem(
      "ondai-user",
      JSON.stringify({ ...user, nickname, level }),
    );
    setEditing(false);
  }
  return (
    <main className="profile-page">
      <section className="profile-header">
        <button className="back-profile" onClick={onBack}>
          ← voltar para condições
        </button>
        <span className="eyebrow">MEU PERFIL · ONDAI</span>
        <div className="profile-identity">
          <div className="profile-avatar">R</div>
          <div>
            <h1>{nickname}</h1>
            <p>Salvador, Bahia · membro desde agosto de 2026</p>
          </div>
          <button
            className="edit-profile"
            onClick={() => (editing ? saveProfile() : setEditing(true))}
          >
            {editing ? "Salvar perfil" : "Editar perfil"}
          </button>
        </div>
      </section>
      <section className="profile-grid">
        <div className="profile-main-card">
          <div className="profile-card-head">
            <div>
              <span className="eyebrow">SOBRE VOCÊ</span>
              <h2>Seu jeito de entrar no mar.</h2>
            </div>
            <span className="profile-badge">GRATUITO</span>
          </div>
          {editing ? (
            <div className="profile-form">
              <label>
                Apelido
                <input
                  value={nickname}
                  onChange={(event) => setNickname(event.target.value)}
                />
              </label>
              <label>
                Nível
                <select
                  value={level}
                  onChange={(event) => setLevel(event.target.value)}
                >
                  <option>Iniciante</option>
                  <option>Intermediário</option>
                  <option>Avançado</option>
                </select>
              </label>
            </div>
          ) : (
            <div className="profile-fields">
              <div>
                <span>APELIDO</span>
                <b>{nickname}</b>
              </div>
              <div>
                <span>NÍVEL</span>
                <b>{level}</b>
              </div>
              <div>
                <span>MODALIDADES</span>
                <b>Surf · Longboard</b>
              </div>
            </div>
          )}
          <div className="profile-stats">
            <div>
              <b>04</b>
              <span>praias salvas</span>
            </div>
            <div>
              <b>02</b>
              <span>relatos publicados</span>
            </div>
            <div>
              <b>18</b>
              <span>confirmações</span>
            </div>
          </div>
        </div>
        <aside className="profile-side-card">
          <span className="eyebrow">PRAIAS FAVORITAS</span>
          <h2>Suas escolhas</h2>
          {beaches.slice(0, 3).map((beach) => (
            <div className="favorite-row" key={beach.id}>
              <img src={beach.image} alt="" />
              <span>
                <b>{beach.name}</b>
                <small>{beach.score}/100 agora</small>
              </span>
              <em>♡</em>
            </div>
          ))}
        </aside>
      </section>
      <section className="profile-history">
        <div className="section-heading">
          <div>
            <span className="eyebrow">MINHA CONTRIBUIÇÃO</span>
            <h2>Seus últimos relatos</h2>
          </div>
          <button className="text-link">Ver todos ↗</button>
        </div>
        <div className="profile-report">
          <span className="report-status-dot" />
          <div>
            <b>Stella Maris</b>
            <p>
              “Linha boa no outside. Vento segurando e pouca gente na água.”
            </p>
          </div>
          <small>há 18 min</small>
        </div>
        <div className="profile-report">
          <span className="report-status-dot" />
          <div>
            <b>Praia do Flamengo</b>
            <p>“Onda divertida e espaço para remar fora do canal.”</p>
          </div>
          <small>ontem</small>
        </div>
      </section>
    </main>
  );
}

function ConditionVisual({
  type,
  marine,
}: {
  type: string;
  marine?: MarineData;
}) {
  const wave = marine?.wave || "1,2 m";
  const period = marine?.period || "10 s";
  const direction = marine?.direction || "SE";
  if (type === "Maré")
    return (
      <div className="condition-content tide-content">
        <div className="tide-forecast-card">
          <div className="tide-forecast-head">
            <div>
              <span className="tide-overline">MARÉ · PRÓXIMAS 12H</span>
              <h3>Vazante agora</h3>
            </div>
            <div className="tide-live-value">
              <b>0,8</b>
              <span>
                m <small>agora</small>
              </span>
            </div>
          </div>
          <div className="tide-chart-shell">
            <div className="tide-y-labels">
              <span>2,0</span>
              <span>1,0</span>
              <span>0,0</span>
            </div>
            <div className="tide-plot">
              <div className="tide-grid-lines" />
              <svg
                viewBox="0 0 640 170"
                preserveAspectRatio="none"
                aria-label="Previsão de maré das próximas 12 horas"
              >
                <defs>
                  <linearGradient id="tideFillPro" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#75d8cc" stopOpacity=".46" />
                    <stop offset="100%" stopColor="#75d8cc" stopOpacity=".03" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 106 C52 103 78 41 133 47 S210 140 273 96 S351 22 419 46 S495 128 548 88 S603 30 640 37 L640 170 L0 170Z"
                  fill="url(#tideFillPro)"
                />
                <path
                  d="M0 106 C52 103 78 41 133 47 S210 140 273 96 S351 22 419 46 S495 128 548 88 S603 30 640 37"
                  fill="none"
                  stroke="#81e0d2"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                />
                <line
                  x1="273"
                  y1="0"
                  x2="273"
                  y2="170"
                  stroke="#b7f2e9"
                  strokeDasharray="4 5"
                />
                <circle
                  cx="273"
                  cy="96"
                  r="6"
                  fill="#f6c968"
                  stroke="#052b5c"
                  strokeWidth="3"
                />
              </svg>
              <div className="tide-now-tag">
                AGORA
                <br />
                <b>0,8 m</b>
              </div>
              <div className="tide-hours">
                <span>agora</span>
                <span>12h</span>
                <span>18h</span>
                <span>00h</span>
                <span>06h</span>
              </div>
            </div>
          </div>
          <div className="tide-events">
            <div>
              <i className="tide-event-dot low-dot" />
              <span>BAIXA</span>
              <b>0,2 m</b>
              <small>05:42</small>
            </div>
            <div>
              <i className="tide-event-dot high-dot" />
              <span>ALTA</span>
              <b>1,9 m</b>
              <small>12:18</small>
            </div>
            <div>
              <i className="tide-event-dot low-dot" />
              <span>BAIXA</span>
              <b>0,4 m</b>
              <small>18:47</small>
            </div>
          </div>
        </div>
        <div className="condition-aside tide-reading">
          <span className="metric-label">COMO LER</span>
          <strong>Descendo</strong>
          <p>
            A maré está vazando. A próxima alta chega às 12:18, com 1,9 m. Use
            esta leitura junto do vento e das ondas para escolher sua janela.
          </p>
          <span className="source-note">
            Maré: demonstração · integração oficial DHN pendente
          </span>
        </div>
      </div>
    );
  if (type === "Ondas")
    return (
      <div className="condition-content wave-content">
        <div className="wave-readings">
          <article>
            <span className="metric-label">ALTURA</span>
            <strong>
              {wave.replace(" m", "")} <small>m</small>
            </strong>
            <div className="wave-meter">
              <i style={{ width: "72%" }} />
            </div>
            <em>moderada</em>
          </article>
          <article>
            <span className="metric-label">PERÍODO</span>
            <strong>
              {period.replace(" s", "")} <small>s</small>
            </strong>
            <div className="wave-meter">
              <i style={{ width: "88%" }} />
            </div>
            <em>consistente</em>
          </article>
          <article>
            <span className="metric-label">DIREÇÃO</span>
            <strong>{direction}</strong>
            <div className="direction-arc">↘</div>
            <em>abrindo para a praia</em>
          </article>
        </div>
        <div className="wave-summary">
          <span className="metric-label">LEITURA DA ONDA</span>
          <strong>Dados atualizados</strong>
          <p>
            Altura, período e direção vêm da API Marine do Open-Meteo. Use esta
            leitura junto do vento, maré e relatos locais.
          </p>
          <span className="source-note">
            Fonte: Open-Meteo Marine · modelo de previsão
          </span>
        </div>
      </div>
    );
  if (type === "Vento")
    return (
      <div className="condition-content wind-content">
        <div className="wind-overview">
          <div className="wind-compass">
            <div className="compass-ring">
              <span>N</span>
              <span>L</span>
              <span>S</span>
              <span>O</span>
              <i>↘</i>
            </div>
            <b>SE</b>
            <small>direção atual</small>
          </div>
          <div className="wind-speed">
            <span className="metric-label">VELOCIDADE</span>
            <strong>
              12 <small>km/h</small>
            </strong>
            <em>lateral moderado</em>
          </div>
          <div className="wind-speed">
            <span className="metric-label">RAJADA</span>
            <strong>
              18 <small>km/h</small>
            </strong>
            <em>máxima prevista</em>
          </div>
        </div>
        <div className="wind-hours">
          <span className="metric-label">VENTO NAS PRÓXIMAS HORAS</span>
          <div className="wind-hour-list">
            <b>
              agora<small>12 km/h</small>
              <i style={{ height: "38%" }} />
            </b>
            <b>
              12h<small>14 km/h</small>
              <i style={{ height: "54%" }} />
            </b>
            <b>
              15h<small>16 km/h</small>
              <i style={{ height: "68%" }} />
            </b>
            <b>
              18h<small>10 km/h</small>
              <i style={{ height: "30%" }} />
            </b>
          </div>
          <p>Vento lateral moderado, tendendo a diminuir no fim da tarde.</p>
        </div>
      </div>
    );
  return (
    <div className="condition-content now-content">
      <div className="now-score">
        <b>86</b>
        <span>/100</span>
        <small>boa condição para o seu nível</small>
      </div>
      <div className="now-factors">
        <div>
          <span>ONDA</span>
          <b>1,2 m</b>
          <small>10 s · SE</small>
        </div>
        <div>
          <span>VENTO</span>
          <b>SE</b>
          <small>12 km/h · favorável</small>
        </div>
        <div>
          <span>MARÉ</span>
          <b>Vazante</b>
          <small>0,8 m · agora</small>
        </div>
      </div>
      <p className="confidence">
        ● Confiança alta　Dados atualizados agora + relato recente
      </p>
    </div>
  );
}
