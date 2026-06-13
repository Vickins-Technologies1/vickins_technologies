"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearSession, readSession } from "../../lib/session";
import type { DashboardData, ProxySyncResult } from "../../lib/types";

type Props = {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onSyncProxy: () => Promise<void>;
  syncingProxy: boolean;
  syncResult: ProxySyncResult | null;
};

function formatBytes(bytes: number) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = bytes;
  let index = 0;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index += 1;
  }
  return `${size.toFixed(size >= 10 ? 0 : 1)} ${units[index]}`;
}

function formatCredits(value: number) {
  const safe = Number.isFinite(value) ? value : 0;
  return `${safe.toFixed(2)} credits`;
}

export default function DashboardShell({ data, loading, error, onRefresh, onSyncProxy, syncingProxy, syncResult }: Props) {
  const router = useRouter();
  const [sessionReady, setSessionReady] = useState(false);
  const [hasSession, setHasSession] = useState(true);

  useEffect(() => {
    setSessionReady(true);
    const session = readSession();
    setHasSession(Boolean(session));
    if (!session) {
      router.replace("/login");
    }
  }, [router]);

  if (!sessionReady || !hasSession) {
    return (
      <div className="glass-strong panel p-6 text-sm text-[var(--muted)]">
        Redirecting to sign in...
      </div>
    );
  }

  if (loading) {
    return <div className="glass-strong panel p-6 text-sm text-[var(--muted)]">Loading dashboard...</div>;
  }

  if (error || !data) {
    return (
      <div className="glass-strong panel p-6">
        <p className="text-sm text-red-200">{error ?? "Dashboard data is unavailable."}</p>
        <button
          className="mt-4 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white"
          onClick={onRefresh}
        >
          Retry
        </button>
      </div>
    );
  }

  const statCards = [
    { label: "Balance", value: formatCredits(data.stats.balanceCredits) },
    { label: "Plans", value: String(data.stats.availablePlans) },
    { label: "Payments", value: String(data.stats.recentPayments) },
    { label: "Usage", value: formatBytes(data.stats.totalUsedBytes) },
  ];

  const usageSeries = data.usage.length > 0 ? data.usage.slice(0, 10) : [];

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="panel-title">Welcome back</p>
          <h1 className="mt-2 text-3xl font-semibold">{data.user.displayName || data.user.email}</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">Role: {data.user.role}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            className="rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.05)] px-4 py-2 text-sm font-semibold"
            onClick={onRefresh}
          >
            Refresh
          </button>
          <button
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white"
            onClick={() => {
              clearSession();
              router.replace("/login");
            }}
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.label} className="glass-strong panel p-5">
            <p className="panel-title">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-strong panel p-5 sm:p-6">
          <p className="panel-title">Usage</p>
          <h2 className="mt-3 text-2xl font-semibold">Recent bandwidth usage</h2>
          <div className="mt-8 flex h-56 items-end gap-2">
            {usageSeries.length > 0 ? usageSeries.map((item, index) => {
              const height = Math.min(100, Math.max(12, Math.round((item.deltaBytes / Math.max(1, data.stats.totalUsedBytes)) * 300 + 20)));
              return (
                <div key={`${item.recordedAt}-${index}`} className="flex-1">
                  <div
                    className="rounded-t-2xl bg-[linear-gradient(180deg,rgba(var(--accent-sky-rgb),0.95),rgba(var(--accent-rgb),0.82))]"
                    style={{ height: `${height}%` }}
                    title={`${item.source} - ${formatBytes(item.deltaBytes)}`}
                  />
                </div>
              );
            }) : (
              <div className="text-sm text-[var(--muted)]">No usage data yet.</div>
            )}
          </div>
          <div className="mt-6 grid gap-3">
            {usageSeries.slice(0, 4).map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.05)] px-4 py-3">
                <div>
                  <p className="font-medium">{item.source}</p>
                  <p className="text-xs text-[var(--muted)]">{new Date(item.recordedAt).toLocaleString()}</p>
                </div>
                <p className="text-sm font-semibold">{formatBytes(item.deltaBytes)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-strong panel p-5 sm:p-6">
          <p className="panel-title">Billing</p>
          <h2 className="mt-3 text-2xl font-semibold">Recent top-ups</h2>
          <div className="mt-5 space-y-3">
            {data.payments.length > 0 ? data.payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.05)] px-4 py-3">
                <div>
                  <p className="font-medium">{payment.reference}</p>
                  <p className="text-sm text-[var(--muted)]">
                    {payment.currency} {payment.amountMinorUnits / 100} • {payment.status}
                  </p>
                </div>
                <span className="rounded-full border border-[rgba(var(--accent-sky-rgb),0.28)] bg-[rgba(var(--accent-sky-rgb),0.1)] px-3 py-1 text-xs font-semibold text-[var(--foreground)]">
                  +{payment.credits} cr
                </span>
              </div>
            )) : (
              <div className="rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.05)] px-4 py-3 text-sm text-[var(--muted)]">
                No recent payments.
              </div>
            )}
          </div>

          <div className="mt-6 rounded-3xl border border-[var(--border)] bg-[rgba(255,255,255,0.05)] p-4">
            <p className="panel-title">Proxy credentials</p>
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <p className="text-[var(--muted)]">HTTP</p>
                <p className="font-medium">
                  {data.httpProxy.username}@{data.httpProxy.host}:{data.httpProxy.port}
                </p>
              </div>
              <div>
                <p className="text-[var(--muted)]">SOCKS5</p>
                <p className="font-medium">
                  {data.socks5Proxy.username}@{data.socks5Proxy.host}:{data.socks5Proxy.port}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass-strong panel p-5 sm:p-6 lg:col-span-2">
          <p className="panel-title">Plans</p>
          <h2 className="mt-3 text-2xl font-semibold">Available proxy packages</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {data.plans.map((plan) => (
              <div key={plan.id} className={`rounded-3xl border p-5 ${plan.isPopular ? "border-[rgba(var(--accent-rgb),0.35)] bg-[rgba(255,255,255,0.08)]" : "border-[var(--border)] bg-[rgba(255,255,255,0.05)]"}`}>
                <p className="panel-title">{plan.name}</p>
                <p className="mt-2 text-2xl font-semibold">
                  {plan.currency} {plan.priceMinorUnits / 100}
                </p>
                <p className="mt-2 text-sm text-[var(--muted)]">{plan.credits} credits</p>
                <p className="mt-4 text-sm text-[var(--muted)]">{plan.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-strong panel p-5 sm:p-6">
          <p className="panel-title">Live profile</p>
          <h2 className="mt-3 text-2xl font-semibold">Account state</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.05)] px-4 py-3">
              <span>Credits</span>
              <span className="font-semibold">{data.user.credits}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.05)] px-4 py-3">
              <span>Proxy user</span>
              <span className="font-semibold">{data.user.proxyUsername || "Pending"}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.05)] px-4 py-3">
              <span>Status</span>
              <span className="font-semibold">{data.user.active ? "Active" : "Inactive"}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.05)] px-4 py-3">
              <span>Server time</span>
              <span className="font-semibold">{new Date(data.stats.serverTime).toLocaleTimeString()}</span>
            </div>
          </div>
          <Link
            href="/billing"
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white"
          >
            Top up credits
          </Link>
          {data.user.role === "admin" && (
            <div className="mt-3 space-y-3">
              <button
                className="inline-flex w-full items-center justify-center rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.05)] px-4 py-3 text-sm font-semibold"
                onClick={() => void onSyncProxy()}
                disabled={syncingProxy}
              >
                {syncingProxy ? "Syncing proxy daemons..." : "Sync proxy daemons"}
              </button>
              {syncResult ? (
                <div className="rounded-3xl border border-[var(--border)] bg-[rgba(255,255,255,0.05)] p-4 text-xs text-[var(--muted)]">
                  <p className="font-semibold text-[var(--foreground)]">Last sync</p>
                  <p className="mt-2">Users synced: {syncResult.userCount}</p>
                  <p className="mt-1 break-all">HTTP config: {syncResult.httpConfigPath}</p>
                  <p className="mt-1 break-all">SOCKS config: {syncResult.socksConfigPath}</p>
                  <p className="mt-1 break-all">Users file: {syncResult.usersPath}</p>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
