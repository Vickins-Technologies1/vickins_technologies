"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Sparkles, Users, Wallet, CalendarCheck, ArrowRight } from "lucide-react";

type Metrics = {
  totalGroups: number;
  activeGroups: number;
  totalMembers: number;
  activeMembers: number;
  openRounds: number;
  upcomingPayouts: number;
  totalCollected: number;
  totalContributions: number;
};

type GroupRow = {
  id: string;
  name: string;
  frequency: string;
  contributionAmount: number;
  currency: string;
  status: string;
  createdAt: string;
  createdBy: string;
  membersCount: number;
  activeMembers: number;
  openRound?: {
    roundNumber: number;
    dueDate?: string;
    potAmount: number;
  } | null;
  totalCollected: number;
  contributionsCount: number;
  lastContributionAt?: string | null;
};

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white/70 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)]/40";

export default function ChamaHubAdminPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [groups, setGroups] = useState<GroupRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/api/admin/chamahub", { cache: "no-store" });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Unable to load ChamaHub analytics.");
        }
        if (isMounted) {
          setMetrics(data.metrics ?? null);
          setGroups(data.groups ?? []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unable to load analytics.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredGroups = useMemo(() => {
    if (!search.trim()) return groups;
    const query = search.trim().toLowerCase();
    return groups.filter((group) => group.name.toLowerCase().includes(query));
  }, [groups, search]);

  const formatMoney = (amount: number, currency = "KES") => {
    if (!amount) return `${currency} 0`;
    try {
      return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch {
      return `${currency} ${amount.toLocaleString()}`;
    }
  };

  return (
    <div className="space-y-8">
      <section className="glass-panel p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top,_rgba(27,92,255,0.18),_transparent_55%)]" />
        <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-[var(--button-bg)]">
              <Sparkles size={16} />
              ChamaHub Analytics
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-3">
              Monitor group performance and member activity.
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted)] mt-3 max-w-2xl">
              Track leases per group, member participation, and contribution flow in one admin view.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/moderator-signup"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold shadow-lg hover:-translate-y-0.5 transition"
            >
              Add new moderator
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/chama"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--glass-border)] bg-white/60 text-[var(--foreground)] text-sm font-semibold hover:bg-[var(--hover-bg)] transition"
            >
              View ChamaHub
            </Link>
          </div>
        </div>
      </section>

      {error && <div className="glass-panel p-4 text-sm text-rose-500">{error}</div>}

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {[
          {
            label: "Active Groups",
            value: metrics ? `${metrics.activeGroups}/${metrics.totalGroups}` : "--",
            icon: Users,
          },
          {
            label: "Active Members",
            value: metrics ? `${metrics.activeMembers}/${metrics.totalMembers}` : "--",
            icon: Users,
          },
          {
            label: "Open Rounds",
            value: metrics ? `${metrics.openRounds}` : "--",
            icon: CalendarCheck,
          },
          {
            label: "Total Collected",
            value: metrics ? formatMoney(metrics.totalCollected) : "--",
            icon: Wallet,
          },
        ].map((stat) => (
          <div key={stat.label} className="glass-panel p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                {stat.label}
              </p>
              <stat.icon size={18} className="text-[var(--button-bg)]" />
            </div>
            <p className="text-xl sm:text-2xl font-semibold mt-3">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="glass-panel p-6 sm:p-7 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Group management</p>
            <h2 className="text-xl sm:text-2xl font-semibold mt-2">ChamaHub groups</h2>
            <p className="text-sm text-[var(--muted)] mt-2">
              View leased groups, member counts, and collection progress.
            </p>
          </div>
          <div className="w-full lg:w-80">
            <input
              className={inputClass}
              placeholder="Search groups..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-16 rounded-2xl border border-[var(--glass-border)] bg-white/60" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredGroups.map((group) => (
              <div
                key={group.id}
                className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
              >
                <div>
                  <p className="font-semibold text-lg">{group.name}</p>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    {group.frequency} • {group.status} • {group.membersCount} members
                  </p>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Contribution: {formatMoney(group.contributionAmount, group.currency)} • Total collected:{" "}
                    {formatMoney(group.totalCollected, group.currency)}
                  </p>
                  {group.openRound && (
                    <p className="text-xs text-[var(--muted)] mt-1">
                      Open round #{group.openRound.roundNumber} • Due{" "}
                      {group.openRound.dueDate
                        ? new Date(group.openRound.dueDate).toLocaleDateString()
                        : "TBD"}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/chama/groups/${group.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--glass-border)] bg-white/80 text-sm font-semibold"
                  >
                    View group
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
            {filteredGroups.length === 0 && (
              <p className="text-sm text-[var(--muted)]">No groups match your search.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
