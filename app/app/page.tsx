/* eslint-disable @next/next/no-html-link-for-pages */
const beaches = [
  ["Stella Maris", "1,2 m", "10 s", "SE 12 km/h", "86"],
  ["Praia do Flamengo", "1,0 m", "9 s", "E 10 km/h", "78"],
  ["Jaguaribe", "0,9 m", "8 s", "SE 14 km/h", "72"],
  ["Piatã", "0,7 m", "8 s", "E 11 km/h", "64"],
];

export default function AppHome() {
  return <main className="dashboard">
    <header className="app-header shell"><a href="/"><img src="/brand/final/quipraia-3c-wordmark-dark-approved.svg" alt="QuiPraia" /></a><nav><a className="active" href="/app">Início</a><a href="/mapa">Mapa</a><a href="/comunidade">Comunidade</a><a href="/perfil">Perfil</a></nav><button aria-label="Abrir perfil">RL</button></header>
    <section className="dash-hero shell">
      <div><p className="eyebrow dark"><span /> Salvador · sexta, 21 de agosto</p><h1>Bom dia,<br /><em>Ricardo.</em></h1><p>O melhor momento de hoje começa às 08:40 em Stella Maris.</p></div>
      <article className="best-card"><div className="best-photo"><img src="/images/quipraia-stella-maris-hero-v1.png" alt="Stella Maris"/><strong>Melhor escolha agora</strong></div><div className="best-body"><span>01 · Litoral norte</span><h2>Stella Maris</h2><div className="marine-row"><Metric icon="wave" value="1,2 m" label="Ondas"/><Metric icon="tide" value="0,8 m" label="Maré subindo"/><Metric icon="wind" value="12 km/h" label="Vento SE"/></div><a href="/praias/stella-maris">Ver praia <b>↗</b></a></div></article>
    </section>
    <section className="dash-content shell">
      <div className="dash-title"><div><p className="eyebrow dark"><span /> Condições agora</p><h2>Praias em destaque</h2></div><a href="/mapa">Abrir mapa ↗</a></div>
      <div className="beach-table">{beaches.map((beach, index)=><a href={`/praias/${beach[0].toLowerCase().replaceAll(" ","-")}`} className="beach-item" key={beach[0]}><span>{String(index+1).padStart(2,"0")}</span><div><strong>{beach[0]}</strong><small>Salvador · Bahia</small></div><Metric icon="wave" value={beach[1]} label="Altura"/><Metric icon="period" value={beach[2]} label="Período"/><Metric icon="wind" value={beach[3]} label="Vento"/><b>{beach[4]}<small>/100</small></b><i>→</i></a>)}</div>
    </section>
    <aside className="ad-slot shell"><div><span>Parceiro local</span><strong>Anuncie aqui.</strong></div><p>Fortaleça o movimento surf.</p><a href="mailto:anuncie@quipraia.com">Saiba mais ↗</a></aside>
  </main>;
}

function Metric({icon,value,label}:{icon:string,value:string,label:string}) { return <div className="metric"><svg aria-hidden="true"><use href={`/handoff-assets/quipraia-icons.svg#icon-${icon}`}/></svg><span><strong>{value}</strong><small>{label}</small></span></div>; }
