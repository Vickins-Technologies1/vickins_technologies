import type { LoginResponse } from "./types";

const STORAGE_KEY = "vguard_session";

export function readSession(): LoginResponse | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as LoginResponse;
  } catch {
    return null;
  }
}

export function writeSession(session: LoginResponse) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearSession() {
  window.localStorage.removeItem(STORAGE_KEY);
}

export function getAccessToken() {
  return readSession()?.accessToken ?? "";
}
