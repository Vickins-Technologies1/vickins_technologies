"use client";

import { useCallback, useEffect, useState } from "react";
import DashboardShell from "../../components/dashboard/DashboardShell";
import { loadDashboard, syncProxyDaemons } from "../../lib/api";
import { readSession } from "../../lib/session";
import type { DashboardData, ProxySyncResult } from "../../lib/types";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncingProxy, setSyncingProxy] = useState(false);
  const [syncResult, setSyncResult] = useState<ProxySyncResult | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = await loadDashboard();
      setData(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
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
    />
  );
}
