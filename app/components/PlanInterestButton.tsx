"use client";

import { useState } from "react";
import { getSupabaseBrowserClient } from "../lib/supabase";

export function PlanInterestButton() {
  const [feedback, setFeedback] = useState("");
  const [saving, setSaving] = useState(false);

  async function register() {
    setSaving(true);
    const client = getSupabaseBrowserClient();
    if (!client) {
      setFeedback("Interesse registrado nesta demonstração. Ao conectar o banco, a lista passa a ser persistente.");
      setSaving(false);
      return;
    }
    const { data } = await client.auth.getUser();
    if (!data.user) { window.location.href = "/entrar?returnTo=/planos"; return; }
    const { error } = await client.from("plan_interests").upsert({ user_id: data.user.id, plan: "colaborador" });
    setFeedback(error ? "Não foi possível registrar seu interesse." : "Você entrou na lista do plano Colaborador.");
    setSaving(false);
  }

  return <div className="plan-interest"><button className="hot-button" type="button" disabled={saving} onClick={() => void register()}>{saving ? "Registrando..." : "Quero ser Colaborador"}</button>{feedback ? <small role="status">{feedback}</small> : null}</div>;
}
