// src/app/admin/page.tsx
"use client";

import { useEffect, useState, type ComponentType } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import type { AdminConfig, DashboardStat } from "@/lib/admin-config";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Boxes,
  Wallet,
  FileText,
  ShieldCheck,
  Briefcase,
  ListChecks,
  DollarSign,
  Ticket,
} from "lucide-react";

function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <section className="glass-panel p-6 sm:p-8">
        <div className="space-y-4">
          <div className="h-3 w-36 rounded-full bg-[var(--border)]/60" />
          <div className="h-8 w-2/3 rounded-full bg-[var(--border)]/60" />
          <div className="h-4 w-full rounded-full bg-[var(--border)]/50" />
          <div className="h-4 w-5/6 rounded-full bg-[var(--border)]/50" />
          <div className="flex flex-wrap gap-3 pt-2">
            <div className="h-10 w-36 rounded-full bg-[var(--border)]/60" />
            <div className="h-10 w-32 rounded-full bg-[var(--border)]/50" />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[0, 1, 2].map((item) => (
          <div key={item} className="glass-panel p-5 sm:p-6 space-y-3">
            <div className="h-3 w-28 rounded-full bg-[var(--border)]/50" />
            <div className="h-8 w-24 rounded-full bg-[var(--border)]/60" />
            <div className="h-3 w-40 rounded-full bg-[var(--border)]/40" />
          </div>
        ))}
      </section>

      <section className="glass-panel p-6 sm:p-7">
        <div className="space-y-4">
          <div className="h-3 w-32 rounded-full bg-[var(--border)]/60" />
          <div className="h-7 w-1/2 rounded-full bg-[var(--border)]/60" />
          <div className="space-y-3">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="h-16 w-full rounded-2xl border border-[var(--glass-border)] bg-white/60"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AdminDashboard() {
  const { data: session, isPending } = authClient.useSession();
  const [dashboardConfig, setDashboardConfig] = useState<AdminConfig["dashboard"] | null>(null);
  const [dashboardStats, setDashboardStats] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  if (isPending) {
    return <DashboardSkeleton />;
  }

  if (!session?.user || session.user.role !== "admin") {
    return (
      <div className="p-4 sm:p-8 text-center">
        <p className="text-red-500">
          Access denied. You must be an admin to view this page.
        </p>
      </div>
    );
  }

  useEffect(() => {
    if (!session?.user || session.user.role !== "admin") return;
    let isMounted = true;
    const loadDashboard = async () => {
      setIsLoading(true);
      setLoadError("");
      try {
        const response = await fetch("/api/admin/dashboard", { cache: "no-store" });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Failed to load dashboard data.");
        }
        if (isMounted) {
          setDashboardConfig(data.config?.dashboard ?? null);
          setDashboardStats(data.stats ?? {});
        }
      } catch (error) {
        if (isMounted) {
          setLoadError(error instanceof Error ? error.message : "Unable to load dashboard.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadDashboard();
    return () => {
      isMounted = false;
    };
  }, [session?.user]);

  if (isLoading || !dashboardConfig) {
    return <DashboardSkeleton />;
  }

  const iconMap: Record<string, ComponentType<{ size?: number; className?: string }>> = {
    Boxes,
    Wallet,
    FileText,
    ShieldCheck,
    TrendingUp,
    Briefcase,
    ListChecks,
    DollarSign,
    Sparkles,
    Ticket,
  };

  const tagline = dashboardConfig.tagline?.trim() || "Admin Dashboard";
  const title = dashboardConfig.title?.trim() || "Welcome back,";
  const subtitle =
    dashboardConfig.subtitle?.trim() ||
    "Add your first hustle in Inventory to start tracking performance.";

  const formatStatValue = (stat: DashboardStat, value: number | undefined) => {
    if (value === undefined || value === null) return "--";
    if (stat.format === "currency") {
      return `$${value.toFixed(2)}`;
    }
    return `${value}`;
  };

  return (
    <div className="space-y-8">
      <section className="glass-panel p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%)]" />
        <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-[var(--button-bg)]">
              <Sparkles size={16} />
              {tagline}
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-3">
              {title} {session.user.name || session.user.email}.
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted)] mt-3 max-w-2xl">
              {subtitle}
            </p>
            {loadError && (
              <p className="mt-3 text-sm text-rose-500">
                {loadError}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {dashboardConfig.ctas.map((cta) => (
              <Link
                key={cta.href}
                href={cta.href}
                className={
                  cta.variant === "primary"
                    ? "inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold shadow-lg hover:-translate-y-0.5 transition"
                    : "inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--glass-border)] bg-white/60 text-[var(--foreground)] text-sm font-semibold hover:bg-[var(--hover-bg)] transition"
                }
              >
                {cta.label}
                <ArrowRight size={16} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {dashboardConfig.stats.length === 0 && (
          <div className="glass-panel p-5 sm:p-6 md:col-span-3">
            <p className="text-sm text-[var(--muted)]">No dashboard metrics configured yet.</p>
          </div>
        )}
        {dashboardConfig.stats.map((stat) => {
          const Icon = iconMap[stat.icon] ?? ShieldCheck;
          return (
            <div key={stat.id} className="glass-panel dash-card p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[var(--muted)] uppercase tracking-[0.2em]">{stat.label}</p>
                <Icon size={18} className="text-[var(--button-bg)] dashboard-icon" />
              </div>
              <p className="text-2xl sm:text-3xl font-semibold mt-3">
                {formatStatValue(stat, dashboardStats[stat.metric])}
              </p>
              <p className="text-xs text-[var(--muted)] mt-2">
                Live metrics update as you log sales and expenses.
              </p>
            </div>
          );
        })}
      </section>

      <section className="glass-panel p-6 sm:p-7">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--button-bg)]">Quick Actions</p>
        <h2 className="text-xl sm:text-2xl font-semibold mt-2 mb-6">Jump into the work</h2>
        <div className="space-y-4">
          {dashboardConfig.quickLinks.length === 0 && (
            <div className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4 text-sm text-[var(--muted)]">
              No quick actions configured yet.
            </div>
          )}
          {dashboardConfig.quickLinks.map((link) => {
            const Icon = iconMap[link.icon] ?? ShieldCheck;
            return (
              <Link
                key={link.title}
                href={link.href}
                className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--glass-border)] bg-white/70 hover:bg-[var(--hover-bg)] transition dash-card"
              >
                <div className="p-3 rounded-xl bg-[var(--button-bg)]/10 text-[var(--button-bg)]">
                  <Icon size={20} className="dashboard-icon" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{link.title}</p>
                  <p className="text-sm text-[var(--muted)]">{link.description}</p>
                </div>
                <ArrowRight size={16} className="text-[var(--muted)]" />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
