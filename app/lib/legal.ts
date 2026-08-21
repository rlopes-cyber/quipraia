// Versão técnica das minutas legais (não é a data de vigência jurídica).
// Atualizar sempre que o conteúdo de /termos ou /privacidade mudar.
export const LEGAL_DRAFT_VERSION = "rascunho-2026-08-21";

export const LEGAL_PLACEHOLDER_NOTICE =
  "Minuta em revisão. Este texto contém marcadores entre colchetes que precisam ser preenchidos com os dados reais do responsável pelo produto e revisados por um profissional jurídico antes de qualquer publicação comercial ou cobrança.";

export const LEGAL_CONTACT = {
  controlador: "[NOME EMPRESARIAL OU NOME DO CONTROLADOR]",
  documento: "[CPF OU CNPJ, CONFORME A ESTRUTURA JURÍDICA]",
  endereco: "[ENDEREÇO COMPLETO]",
  emailSuporte: "[E-MAIL DE SUPORTE]",
  emailPrivacidade: "[E-MAIL DE PRIVACIDADE]",
  encarregado: "[NOME OU IDENTIFICAÇÃO DO ENCARREGADO, QUANDO APLICÁVEL]",
  dominio: "[DOMÍNIO OFICIAL]",
  vigencia: "[DATA DE VIGÊNCIA]",
  foro: "[FORO COMPETENTE, SEM AFASTAR DIREITOS DO CONSUMIDOR]",
};

export const LEGAL_LINKS = [
  ["Privacidade", "/privacidade"],
  ["Termos", "/termos"],
  ["Cookies", "/cookies"],
  ["Diretrizes da comunidade", "/diretrizes-da-comunidade"],
  ["Assinatura e cancelamento", "/assinatura-e-cancelamento"],
  ["Política de anúncios", "/politica-de-anuncios"],
  ["Segurança e previsões", "/seguranca-e-previsoes"],
] as const;

export type ConsentCategory = "analytics" | "marketing" | "publicidade";

export const CONSENT_CATEGORIES: { key: ConsentCategory; label: string; description: string }[] = [
  { key: "analytics", label: "Analytics", description: "Ajuda a entender como o produto é usado, de forma agregada." },
  { key: "marketing", label: "Marketing", description: "Comunicações e conteúdo personalizado sobre o produto." },
  { key: "publicidade", label: "Publicidade", description: "Anúncios personalizados de parceiros, quando ativados." },
];
