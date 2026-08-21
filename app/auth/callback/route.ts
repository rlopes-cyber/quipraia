import { NextResponse } from "next/server";
import { safeAuthDestination } from "../../lib/auth-paths";
import { getSupabaseServerClient, hasServerSupabaseConfig } from "../../lib/supabase-server";
import { LEGAL_DRAFT_VERSION } from "../../lib/legal";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const next = safeAuthDestination(requestUrl.searchParams.get("next"));
  const code = requestUrl.searchParams.get("code");

  if (!hasServerSupabaseConfig()) return NextResponse.redirect(new URL(`${next}${next.includes("?") ? "&" : "?"}modo=demonstracao`, requestUrl.origin));
  if (!code) return NextResponse.redirect(new URL("/entrar?erro=callback", requestUrl.origin));

  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase!.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(new URL("/entrar?erro=callback", requestUrl.origin));

  const userId = data.session?.user.id;
  if (userId) {
    // Registra o aceite dos Termos e da Política de Privacidade na primeira sessão autenticada.
    // Não sobrescreve um aceite já existente (preserva o carimbo de tempo original).
    await supabase!.from("legal_acceptances").upsert(
      [
        { user_id: userId, document_type: "termos", version: LEGAL_DRAFT_VERSION },
        { user_id: userId, document_type: "privacidade", version: LEGAL_DRAFT_VERSION },
      ],
      { onConflict: "user_id,document_type", ignoreDuplicates: true },
    );
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
