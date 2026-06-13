import type { CheckoutResponse, DashboardData, LoginResponse, ProxyPlan, ProxySyncResult } from "./types";
import { getAccessToken, readSession, writeSession } from "./session";

const API_BASE = "/api/v1";

async function request<T>(path: string, init: RequestInit = {}, retry = true): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  const token = getAccessToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
    credentials: "include",
  });
  if (!response.ok) {
    if (response.status === 401 && retry && !path.startsWith("/auth/")) {
      const refreshed = await refreshSession();
      if (refreshed) {
        return request<T>(path, init, false);
      }
    }
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload?.error ?? `Request failed with status ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function refreshSession() {
  const session = readSession();
  if (!session?.refreshToken) {
    return null;
  }
  try {
    const response = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: session.refreshToken }),
      credentials: "include",
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as LoginResponse;
    writeSession(payload);
    return payload;
  } catch {
    return null;
  }
}

export async function login(email: string, password: string) {
  return request<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function register(email: string, password: string, displayName: string) {
  return request<LoginResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, displayName }),
  });
}

export async function loadDashboard() {
  const payload = await request<{ data: DashboardData }>("/dashboard", { method: "GET" });
  return payload.data;
}

export async function loadPlans() {
  const payload = await request<{ data: ProxyPlan[] }>("/plans", { method: "GET" });
  return payload.data;
}

export async function createCheckout(planId: string) {
  return request<CheckoutResponse>("/checkout", {
    method: "POST",
    body: JSON.stringify({ planId }),
  });
}

export async function syncProxyDaemons() {
  return request<{ data: ProxySyncResult }>("/admin/proxy/sync", { method: "POST" });
}
