const DEFAULT_AUTH_DESTINATION = "/app";

export function safeAuthDestination(value: string | null | undefined, fallback = DEFAULT_AUTH_DESTINATION) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return fallback;
  try {
    const url = new URL(value, "https://quipraia.local");
    if (url.origin !== "https://quipraia.local") return fallback;
    if (["/entrar", "/cadastro", "/recuperar-senha", "/auth/callback"].includes(url.pathname)) return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

export function authMessageFromCode(code: string | null) {
  const messages: Record<string, string> = {
    callback: "Não foi possível concluir o acesso. Tente entrar novamente.",
    session: "Sua sessão expirou. Entre novamente para continuar.",
    denied: "Este acesso não está disponível para a sua conta.",
    confirmed: "E-mail confirmado. Agora você já pode entrar.",
    password_updated: "Senha atualizada. Entre com a nova senha.",
  };
  return code ? messages[code] ?? "Não foi possível concluir esta ação. Tente novamente." : "";
}

export function friendlyAuthError(message: string) {
  const normalized = message.toLowerCase();
  if (normalized.includes("invalid login credentials")) return "E-mail ou senha incorretos. Confira os dados e tente novamente.";
  if (normalized.includes("email not confirmed")) return "Confirme seu e-mail antes de entrar. Enviamos um link para sua caixa de entrada.";
  if (normalized.includes("user already registered")) return "Este e-mail já possui uma conta. Entre com sua senha ou recupere o acesso.";
  if (normalized.includes("password should be")) return "Crie uma senha com pelo menos 8 caracteres.";
  if (normalized.includes("rate limit") || normalized.includes("too many")) return "Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.";
  return "Não foi possível concluir agora. Confira os dados e tente novamente.";
}

