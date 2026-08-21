import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { safeAuthDestination } from "./app/lib/auth-paths";

const protectedPrefixes = ["/app", "/mapa", "/comparar", "/comunidade", "/perfil", "/praias"];

export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return NextResponse.next();

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;
  const requiresUser = protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

  if (!user && (requiresUser || pathname.startsWith("/admin"))) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/entrar";
    loginUrl.search = "";
    loginUrl.searchParams.set("returnTo", safeAuthDestination(`${pathname}${request.nextUrl.search}`));
    return NextResponse.redirect(loginUrl);
  }

  if (user && pathname.startsWith("/admin")) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") {
      const appUrl = request.nextUrl.clone();
      appUrl.pathname = "/app";
      appUrl.search = "?acesso=negado";
      return NextResponse.redirect(appUrl);
    }
  }

  if (user && (pathname === "/entrar" || pathname === "/cadastro")) {
    const destination = safeAuthDestination(request.nextUrl.searchParams.get("returnTo"));
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return response;
}

export const config = {
  matcher: ["/app/:path*", "/mapa/:path*", "/comparar/:path*", "/comunidade/:path*", "/perfil/:path*", "/praias/:path*", "/admin/:path*", "/entrar", "/cadastro"],
};

