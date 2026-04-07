"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Plus,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

type DashboardSummary = {
  activeGroups: number;
  nextContribution?: { dueDate: string; groupName: string } | null;
  nextPayout?: { dueDate: string; groupName: string } | null;
};

type GroupSummary = {
  id: string;
  name: string;
  contributionAmount: number;
  frequency: string;
  currency: string;
  role: string;
  status: string;
  openRound?: {
    id: string;
    roundNumber: number;
    recipientMemberId: string;
    dueDate?: string;
    totalContributions: number;
    potAmount: number;
  } | null;
};

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white/70 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)]/40";

export default function ChamaDashboardPage() {
  const { data: session } = authClient.useSession();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [groups, setGroups] = useState<GroupSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    contributionAmount: "",
    frequency: "monthly",
    numberOfMembers: "5",
    startDate: new Date().toISOString().slice(0, 10),
    currency: "KES",
  });

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 0,
      }),
    []
  );

  const isModerator =
    session?.user?.role?.split(",").map((value: string) => value.trim()).includes("moderator") ??
    false;
  const isAdmin =
    session?.user?.role?.split(",").map((value: string) => value.trim()).includes("admin") ??
    false;

  const loadDashboard = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/chama/dashboard", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Failed to load dashboard.");
      setSummary(data.summary);
      setGroups(data.groups ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleCreateGroup = async () => {
    setMessage("");
    setError("");
    if (!form.name.trim() || !form.contributionAmount) {
      setError("Provide a group name and contribution amount.");
      return;
    }

    try {
      const response = await fetch("/api/chama/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to create group.");
      setMessage("ChamaHub group created successfully.");
      setForm((prev) => ({ ...prev, name: "", description: "" }));
      await loadDashboard();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create group.");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="glass-panel p-6 sm:p-8 h-40" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0, 1, 2].map((item) => (
            <div key={item} className="glass-panel p-6 h-24" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="glass-panel p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_55%)]" />
        <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
              <Sparkles size={16} />
              ChamaHub Dashboard
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-3">
              Keep your merry-go-round contributions flowing.
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted)] mt-3 max-w-2xl">
              Track contributions, payout order, and upcoming obligations in one secure place.
            </p>
          </div>
          <Link
            href="/chama/groups"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold shadow-lg hover:-translate-y-0.5 transition"
          >
            View all groups
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {error && (
        <div className="glass-panel p-4 text-sm text-rose-500">{error}</div>
      )}
      {message && (
        <div className="glass-panel p-4 text-sm text-[var(--foreground)]">{message}</div>
      )}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: "Active Chama groups",
            value: summary?.activeGroups ?? 0,
            icon: Users,
          },
          {
            label: "Next Contribution",
            value: summary?.nextContribution
              ? `${summary.nextContribution.groupName} • ${new Date(
                  summary.nextContribution.dueDate
                ).toLocaleDateString()}`
              : "All clear",
            icon: CalendarCheck,
          },
          {
            label: "Next Payout",
            value: summary?.nextPayout
              ? `${summary.nextPayout.groupName} • ${new Date(
                  summary.nextPayout.dueDate
                ).toLocaleDateString()}`
              : "No payout soon",
            icon: Wallet,
          },
        ].map((stat) => (
          <div key={stat.label} className="glass-panel p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                {stat.label}
              </p>
              <stat.icon size={18} className="text-[var(--accent)]" />
            </div>
            <p className="text-lg sm:text-xl font-semibold mt-3">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="glass-panel p-6 sm:p-7 space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Your groups</p>
            <h2 className="text-xl font-semibold mt-2">Active merry-go-rounds</h2>
          </div>
          <div className="space-y-4">
            {groups.length === 0 && (
              <p className="text-sm text-[var(--muted)]">
                You have not joined any ChamaHub groups yet.
              </p>
            )}
            {groups.map((group) => (
              <div
                key={group.id}
                className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4 sm:p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="font-semibold">{group.name}</p>
                    <p className="text-xs text-[var(--muted)] mt-1">
                      {group.frequency} • {currencyFormatter.format(group.contributionAmount)} per round
                    </p>
                    <p className="text-xs text-[var(--muted)] mt-1 capitalize">
                      Role: {group.role} • Status: {group.status}
                    </p>
                  </div>
                  <Link
                    href={`/chama/groups/${group.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--glass-border)] bg-white/70 text-sm font-semibold"
                  >
                    Open group
                    <ArrowRight size={14} />
                  </Link>
                </div>
                {group.openRound && (
                  <div className="mt-4 text-xs text-[var(--muted)]">
                    Round {group.openRound.roundNumber} is open. Pot:{" "}
                    <span className="font-semibold text-[var(--foreground)]">
                      {currencyFormatter.format(group.openRound.potAmount)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-7 space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              Create group
            </p>
            <h2 className="text-xl font-semibold mt-2">Start a new Chama group</h2>
            <p className="text-sm text-[var(--muted)] mt-2">
              Each ChamaHub lease is per group. Set the contribution amount, schedule, and invite members later.
            </p>
          </div>

          {(isModerator || isAdmin) ? (
            <>
              <div className="grid grid-cols-1 gap-4">
                <input
                  className={inputClass}
                  placeholder="Group name"
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                />
                <input
                  className={inputClass}
                  placeholder="Description (optional)"
                  value={form.description}
                  onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    className={inputClass}
                    type="number"
                    placeholder="Contribution amount (KES)"
                    value={form.contributionAmount}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, contributionAmount: event.target.value }))
                    }
                  />
                  <select
                    className={inputClass}
                    value={form.frequency}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, frequency: event.target.value }))
                    }
                  >
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  <input
                    className={inputClass}
                    type="number"
                    placeholder="Expected members"
                    value={form.numberOfMembers}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, numberOfMembers: event.target.value }))
                    }
                  />
                  <input
                    className={inputClass}
                    type="date"
                    value={form.startDate}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, startDate: event.target.value }))
                    }
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleCreateGroup}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold"
              >
                <Plus size={16} />
                Create Chama group
              </button>
              <p className="text-xs text-[var(--muted)]">
                Tip: You can add members later by email or phone. Karibu!
              </p>
            </>
          ) : (
            <div className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4 text-sm text-[var(--muted)]">
              Only ChamaHub moderators can create a new group. Ask your moderator to
              invite you, or{" "}
              <Link href="/moderator-signup" className="text-[var(--button-bg)] font-semibold">
                sign up as a moderator
              </Link>{" "}
              to start one.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
