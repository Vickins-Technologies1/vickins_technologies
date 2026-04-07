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
  members: Array<{
    id: string;
    userId?: string | null;
    name?: string;
    email?: string;
    role?: string;
    status?: string;
  }>;
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
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);
  const [transferSelection, setTransferSelection] = useState<Record<string, string>>({});
  const [forceJoinEmail, setForceJoinEmail] = useState<Record<string, string>>({});
  const [actionMessage, setActionMessage] = useState("");

  const loadData = async (signal?: AbortSignal) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/chamahub", { cache: "no-store", signal });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Unable to load ChamaHub analytics.");
      }
      setMetrics(data.metrics ?? null);
      setGroups(data.groups ?? []);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Unable to load analytics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    loadData(controller.signal);
    return () => controller.abort();
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

  const updateGroup = async (payload: Record<string, string>) => {
    setActionMessage("");
    try {
      const response = await fetch("/api/admin/chamahub", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Unable to update group.");
      }
      setActionMessage(data?.message ?? "Update saved.");
      await loadData();
    } catch (err) {
      setActionMessage(err instanceof Error ? err.message : "Unable to update group.");
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
      {actionMessage && (
        <div className="glass-panel p-4 text-sm text-[var(--foreground)]">{actionMessage}</div>
      )}

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
          <div key={stat.label} className="glass-panel dash-card p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                {stat.label}
              </p>
              <stat.icon size={18} className="text-[var(--button-bg)] dashboard-icon" />
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
                className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4 sm:p-5 space-y-4"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
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
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedGroupId((prev) => (prev === group.id ? null : group.id))
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--glass-border)] bg-white/80 text-sm font-semibold"
                    >
                      {expandedGroupId === group.id ? "Hide controls" : "Manage"}
                    </button>
                  </div>
                </div>

                {expandedGroupId === group.id && (
                  <div className="rounded-2xl border border-[var(--glass-border)] bg-white/70 p-4 sm:p-5 space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                          Group controls
                        </p>
                        <p className="text-sm text-[var(--muted)] mt-2">
                          Deactivate a lease or transfer moderator ownership.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          updateGroup({
                            action: group.status === "archived" ? "activate" : "archive",
                            groupId: group.id,
                          })
                        }
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold"
                      >
                        {group.status === "archived" ? "Activate group" : "Deactivate group"}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-4">
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                          Members
                        </p>
                        <div className="space-y-2">
                          {group.members.map((member) => (
                            <div
                              key={member.id}
                              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-2xl border border-[var(--glass-border)] bg-white/80 px-3 py-2"
                            >
                              <div>
                                <p className="text-sm font-semibold">
                                  {member.name || member.email || "Member"}
                                </p>
                                <p className="text-xs text-[var(--muted)]">
                                  {member.email || "No email"} • {member.role}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {member.userId && (
                                    <span className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">
                                      Invite accepted
                                    </span>
                                  )}
                                  {member.userId && member.userId === group.createdBy && (
                                    <span className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                      Current moderator
                                    </span>
                                  )}
                                </div>
                              </div>
                              <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                                {member.status}
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {member.userId && member.status === "active" && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateGroup({
                                        action: "make-moderator",
                                        groupId: group.id,
                                        memberId: member.id,
                                      })
                                    }
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--glass-border)] bg-white/80 text-xs font-semibold"
                                  >
                                    Make moderator
                                  </button>
                                )}
                                {member.userId && member.userId === group.createdBy && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateGroup({
                                        action: "revoke-moderator",
                                        groupId: group.id,
                                        memberId: member.id,
                                      })
                                    }
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--glass-border)] bg-white/80 text-xs font-semibold"
                                  >
                                    Revoke moderator
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                          Transfer moderator
                        </p>
                        <select
                          className={inputClass}
                          value={transferSelection[group.id] ?? ""}
                          onChange={(event) =>
                            setTransferSelection((prev) => ({
                              ...prev,
                              [group.id]: event.target.value,
                            }))
                          }
                        >
                          <option value="">Select member</option>
                          {group.members
                            .filter((member) => member.userId && member.status === "active")
                            .map((member) => (
                              <option key={member.id} value={member.id}>
                                {member.name || member.email}
                              </option>
                            ))}
                        </select>
                        <button
                          type="button"
                          onClick={() =>
                            updateGroup({
                              action: "transfer",
                              groupId: group.id,
                              memberId: transferSelection[group.id],
                            })
                          }
                          disabled={!transferSelection[group.id]}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--glass-border)] bg-white/80 text-sm font-semibold disabled:opacity-60"
                        >
                          Transfer ownership
                        </button>
                        <p className="text-xs text-[var(--muted)]">
                          Only active members with a linked account can become moderator.
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-[var(--glass-border)] pt-4 space-y-3">
                      <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                        Force-join member
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          className={inputClass}
                          placeholder="member@email.com"
                          value={forceJoinEmail[group.id] ?? ""}
                          onChange={(event) =>
                            setForceJoinEmail((prev) => ({
                              ...prev,
                              [group.id]: event.target.value,
                            }))
                          }
                        />
                        <button
                          type="button"
                          onClick={() =>
                            updateGroup({
                              action: "force-join",
                              groupId: group.id,
                              email: forceJoinEmail[group.id],
                            })
                          }
                          disabled={!forceJoinEmail[group.id]}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[var(--glass-border)] bg-white/80 text-sm font-semibold disabled:opacity-60"
                        >
                          Attach member
                        </button>
                      </div>
                      <p className="text-xs text-[var(--muted)]">
                        Use this to attach a member by email, even if they haven’t accepted an invite.
                      </p>
                    </div>

                    <div className="border-t border-[var(--glass-border)] pt-4 space-y-3">
                      <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                        Invite reminders
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          updateGroup({
                            action: "send-reminders",
                            groupId: group.id,
                          })
                        }
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[var(--glass-border)] bg-white/80 text-sm font-semibold"
                      >
                        Send reminder emails
                      </button>
                      <p className="text-xs text-[var(--muted)]">
                        Sends reminders to invited members without linked accounts.
                      </p>
                    </div>
                  </div>
                )}
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
