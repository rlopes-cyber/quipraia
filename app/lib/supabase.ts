import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

export function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function getSupabaseBrowserClient() {
  if (browserClient) return browserClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  browserClient = createClient(url, anonKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
  return browserClient;
}

export async function signInWithGoogle() {
  const client = getSupabaseBrowserClient();
  if (!client) return { configured: false as const };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin;
  const result = await client.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${siteUrl}/app` } });
  return { configured: true as const, ...result };
}

export async function signInWithPassword(email: string, password: string) {
  const client = getSupabaseBrowserClient();
  if (!client) return { configured: false as const };
  const result = await client.auth.signInWithPassword({ email, password });
  return { configured: true as const, ...result };
}

export async function signUpWithPassword(name: string, email: string, password: string) {
  const client = getSupabaseBrowserClient();
  if (!client) return { configured: false as const };
  const result = await client.auth.signUp({ email, password, options: { data: { name } } });
  return { configured: true as const, ...result };
}
