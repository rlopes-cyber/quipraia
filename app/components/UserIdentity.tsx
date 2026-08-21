"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient, signOut } from "../lib/supabase";

export function UserIdentity({ className }: { className: "product-user" | "approved-user" }) {
  const [identity, setIdentity] = useState({ name: "Ricardo", plan: "Colaborador", initials: "RL" });
  async function loadIdentity() { const client = getSupabaseBrowserClient(); if (!client) return; const { data: auth } = await client.auth.getUser(); if (!auth.user) return; const { data: profile } = await client.from("profiles").select("name, plan").eq("id", auth.user.id).single(); const name = profile?.name || auth.user.user_metadata?.name || auth.user.user_metadata?.full_name || auth.user.email?.split("@")[0] || "Surfista"; setIdentity({ name, plan: profile?.plan === "colaborador" ? "Colaborador" : "Gratuito", initials: initials(name) }); }
  async function logout() { await signOut(); window.location.href = "/"; }
  // Identity is loaded after the external authentication request resolves.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void loadIdentity(); }, []);
  return <div className={className}><b>{identity.initials}</b><span><strong>{identity.name}</strong><small>{identity.plan}</small></span><button type="button" onClick={logout} aria-label="Sair da conta">Sair</button></div>;
}

function initials(name: string) { return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "QP"; }

