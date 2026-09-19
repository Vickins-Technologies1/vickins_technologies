import type { CheckoutResponse, DashboardData, LoginResponse, ProxyLocation, ProxyNode, ProxyPlan, ProxyProviderCapabilities, ProxySyncResult } from "./types";
import { clearSession, getAccessToken, readSession, writeSession } from "./session";

const API_BASE = normalizeAPIBase(process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api/v1");

function normalizeAPIBase(value: string) {
  return value.replace(/\/+$/, "");
}

export class ApiError extends Error {
  status: number;
  code?: string;
  constructor(message: string, status: number, code?: string) { super(message); this.name = "ApiError"; this.status = status; this.code = code; }
}

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
    if (response.status === 401 && !path.startsWith("/auth/")) {
      clearSession();
    }
    const payload = await response.json().catch(() => ({}));
    throw new ApiError(payload?.error ?? `Request failed with status ${response.status}`, response.status, payload?.code);
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

export async function createTrafficCheckout(trafficGB: string) {
	return request<CheckoutResponse>("/traffic/purchase", {
		method: "POST",
		body: JSON.stringify({ trafficGB }),
	});
}

export async function syncProxyDaemons() {
  return request<{ data: ProxySyncResult }>("/admin/proxy/sync", { method: "POST" });
}

export async function loadProxyCapabilities() {
  const payload = await request<{ data: ProxyProviderCapabilities }>("/proxy/capabilities", { method: "GET" });
  return payload.data;
}

export async function loadProxyLocations() {
  const payload = await request<{ data: ProxyLocation[] }>("/proxy/locations", { method: "GET" });
  return Array.isArray(payload.data) ? payload.data : [];
}

export async function loadProxyInventory(filters: Record<string, string> = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => { if (value.trim()) params.set(key, value.trim()); });
  const suffix = params.toString() ? `?${params.toString()}` : "";
  const payload = await request<{ data: ProxyNode[] }>(`/proxy/inventory${suffix}`, { method: "GET" });
  return Array.isArray(payload.data) ? payload.data : [];
}

export async function loadCredentials() {
  const payload = await request<{ data: DashboardData["httpProxy"] }>("/proxy/credentials", { method: "GET" });
  return payload.data;
}
