import type { ReactNode } from "react";
import { UserIdentity } from "./UserIdentity";

const Icon = ({ name }: { name: string }) => <svg aria-hidden="true"><use href={`/handoff-assets/quipraia-icons.svg#icon-${name}`} /></svg>;

export function ProductShell({ active, title, eyebrow, children }: { active: string; title: string; eyebrow: string; children: ReactNode }) {
  const items = [["Hoje", "/app", "waves"], ["Mapa", "/mapa", "map"], ["Comparar", "/comparar", "compare"], ["Comunidade", "/comunidade", "community"], ["Perfil", "/perfil", "profile"]];
  return <main className="product-shell">
    <aside className="product-sidebar"><a href="/app"><img src="/brand/final/quipraia-3c-wordmark-dark-approved.svg" alt="QuiPraia" /></a><small>Previsão de surf</small><nav>{items.map(([label, href, icon]) => <a className={active === label ? "active" : ""} href={href} key={label}><Icon name={icon} />{label}</a>)}</nav><UserIdentity className="product-user" /></aside>
    <section className="product-main"><header className="product-header"><div><span>{eyebrow}</span><h1>{title}</h1></div><label>⌕ <input aria-label="Buscar praia ou cidade" placeholder="Buscar praia ou cidade" /></label><button>● Salvador, BA</button></header>{children}</section>
  </main>;
}

export function DataIcon({ name }: { name: string }) { return <Icon name={name} />; }
