import { NextResponse } from "next/server";
import { safeAuthDestination } from "../../lib/auth-paths";
import { getSupabaseServerClient, hasServerSupabaseConfig } from "../../lib/supabase-server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const next = safeAuthDestination(requestUrl.searchParams.get("next"));
  const code = requestUrl.searchParams.get("code");

  if (!hasServerSupabaseConfig()) return NextResponse.redirect(new URL(`${next}${next.includes("?") ? "&" : "?"}modo=demonstracao`, requestUrl.origin));
  if (!code) return NextResponse.redirect(new URL("/entrar?erro=callback", requestUrl.origin));

  const supabase = await getSupabaseServerClient();
  const { error } = await supabase!.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(new URL("/entrar?erro=callback", requestUrl.origin));
  return NextResponse.redirect(new URL(next, requestUrl.origin));
}

