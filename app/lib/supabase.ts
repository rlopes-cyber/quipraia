import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { safeAuthDestination } from "./auth-paths";

let browserClient: SupabaseClient | null = null;

export function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function getSupabaseBrowserClient() {
  if (browserClient) return browserClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  browserClient = createBrowserClient(url, anonKey);
  return browserClient;
}

function callbackUrl(next = "/app") {
  const destination = safeAuthDestination(next);
  return `${window.location.origin}/auth/callback?next=${encodeURIComponent(destination)}`;
}

export async function signInWithGoogle(next = "/app") {
  const client = getSupabaseBrowserClient();
  if (!client) return { configured: false as const };
  const result = await client.auth.signInWithOAuth({ provider: "google", options: { redirectTo: callbackUrl(next) } });
  return { configured: true as const, ...result };
}

export async function signInWithPassword(email: string, password: string) {
  const client = getSupabaseBrowserClient();
  if (!client) return { configured: false as const };
  const result = await client.auth.signInWithPassword({ email, password });
  return { configured: true as const, ...result };
}

export async function signUpWithPassword(name: string, email: string, password: string, next = "/app") {
  const client = getSupabaseBrowserClient();
  if (!client) return { configured: false as const };
  const result = await client.auth.signUp({ email, password, options: { data: { name }, emailRedirectTo: callbackUrl(next) } });
  return { configured: true as const, ...result };
}

export async function requestPasswordReset(email: string) {
  const client = getSupabaseBrowserClient();
  if (!client) return { configured: false as const };
  const result = await client.auth.resetPasswordForEmail(email, { redirectTo: callbackUrl("/nova-senha") });
  return { configured: true as const, ...result };
}

export async function updatePassword(password: string) {
  const client = getSupabaseBrowserClient();
  if (!client) return { configured: false as const };
  const result = await client.auth.updateUser({ password });
  return { configured: true as const, ...result };
}

export async function signOut() {
  const client = getSupabaseBrowserClient();
  if (!client) return { configured: false as const };
  const result = await client.auth.signOut();
  return { configured: true as const, ...result };
}
