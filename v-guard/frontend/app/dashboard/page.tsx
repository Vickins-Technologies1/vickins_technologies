"use client";

import { useCallback, useEffect, useState } from "react";
import DashboardShell from "../../components/dashboard/DashboardShell";
import { loadDashboard, loadProxyInventory, syncProxyDaemons } from "../../lib/api";
import { clearSession, readSession } from "../../lib/session";
import type { DashboardData, ProxySyncResult } from "../../lib/types";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncingProxy, setSyncingProxy] = useState(false);
  const [syncResult, setSyncResult] = useState<ProxySyncResult | null>(null);
  const [providerConnected, setProviderConnected] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [payload, inventory] = await Promise.all([loadDashboard(), loadProxyInventory().catch(() => [])]);
      setData(normalizeDashboardData(payload));
      setProviderConnected(inventory.length > 0);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load dashboard";
      if (message.includes("status 401") || message.toLowerCase().includes("unauthorized")) {
        clearSession();
      }
      setData(null);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const syncProxy = useCallback(async () => {
    setSyncingProxy(true);
    setError(null);
    try {
      const response = await syncProxyDaemons();
      setSyncResult(response.data);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sync proxy daemons");
    } finally {
      setSyncingProxy(false);
    }
  }, [refresh]);

  useEffect(() => {
    if (readSession()) {
      void refresh();
    } else {
      setLoading(false);
    }
  }, [refresh]);

  return (
    <DashboardShell
      data={data}
      loading={loading}
      error={error}
      onRefresh={refresh}
      onSyncProxy={syncProxy}
      syncingProxy={syncingProxy}
      syncResult={syncResult}
      providerConnected={providerConnected}
    />
  );
}

function normalizeDashboardData(data: DashboardData): DashboardData {
  return {
    ...data,
    plans: Array.isArray(data.plans) ? data.plans : [],
    payments: Array.isArray(data.payments) ? data.payments : [],
    usage: Array.isArray(data.usage) ? data.usage : [],
  };
}
