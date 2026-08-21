"use client";

import { useSyncExternalStore } from "react";
import type { ConsentCategory } from "./legal";

const STORAGE_KEY = "quipraia-cookie-consent-v1";
const CHANGE_EVENT = "quipraia-consent-changed";

export type CookieConsent = { analytics: boolean; marketing: boolean; publicidade: boolean; decidedAt: string | null };

const DEFAULT_CONSENT: CookieConsent = { analytics: false, marketing: false, publicidade: false, decidedAt: null };

export function readCookieConsent(): CookieConsent {
  if (typeof window === "undefined") return DEFAULT_CONSENT;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONSENT;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_CONSENT, ...parsed };
  } catch {
    return DEFAULT_CONSENT;
  }
}

export function writeCookieConsent(consent: CookieConsent) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Armazenamento indisponível (modo privado etc.); a escolha vale apenas para a sessão atual.
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: consent }));
}

export function setCategory(category: ConsentCategory, granted: boolean) {
  const current = readCookieConsent();
  const next = { ...current, [category]: granted, decidedAt: new Date().toISOString() };
  writeCookieConsent(next);
  return next;
}

export function acceptAllOptional() {
  const next = { analytics: true, marketing: true, publicidade: true, decidedAt: new Date().toISOString() };
  writeCookieConsent(next);
  return next;
}

export function rejectAllOptional() {
  const next = { analytics: false, marketing: false, publicidade: false, decidedAt: new Date().toISOString() };
  writeCookieConsent(next);
  return next;
}

// --- Integração com useSyncExternalStore (evita setState dentro de efeitos) ---

let cachedRaw: string | null | undefined;
let cachedSnapshot: CookieConsent = DEFAULT_CONSENT;

function getSnapshot(): CookieConsent {
  if (typeof window === "undefined") return DEFAULT_CONSENT;
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }
  if (raw === cachedRaw) return cachedSnapshot;
  cachedRaw = raw;
  cachedSnapshot = readCookieConsent();
  return cachedSnapshot;
}

function getServerSnapshot(): CookieConsent {
  return DEFAULT_CONSENT;
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useCookieConsent(): CookieConsent {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
