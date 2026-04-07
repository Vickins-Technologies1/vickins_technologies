"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Plus,
  RefreshCcw,
  Sparkles,
  UserPlus,
} from "lucide-react";
import RotationWheel from "@/components/chama/RotationWheel";

type GroupDetail = {
  id: string;
  name: string;
  description: string;
  contributionAmount: number;
  frequency: string;
  numberOfMembers: number;
  startDate: string;
  currency: string;
  status: string;
  rotationType: string;
  rotationOrder: string[];
  currentRound: number;
};

type Member = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  role: string;
  status: string;
  joinedAt?: string;
  contributionTotal: number;
};

type Round = {
  id: string;
  roundNumber: number;
  recipientMemberId: string;
  status: string;
  potAmount: number;
  totalContributions: number;
  dueDate?: string;
  receivedAt?: string;
};

type Contribution = {
  id: string;
  roundId: string;
  memberId: string;
  amount: number;
  method: string;
  reference?: string;
  paidAt?: string;
};

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white/70 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)]/40";

export default function ChamaGroupPage() {
  const params = useParams();
  const groupId = params?.groupId as string;

  const [group, setGroup] = useState<GroupDetail | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [openRoundId, setOpenRoundId] = useState<string | null>(null);
  const [stats, setStats] = useState<{ membersCount: number; potAmount: number } | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [memberForm, setMemberForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "member",
  });

  const [contributionForm, setContributionForm] = useState({
    memberId: "",
    amount: "",
    method: "manual",
    reference: "",
  });

  const [groupForm, setGroupForm] = useState({
    name: "",
    description: "",
    contributionAmount: "",
    frequency: "monthly",
    startDate: "",
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

  const loadGroup = async () => {
    setLoading(true);
    setError("");
    try {
      const [groupRes, membersRes, roundsRes] = await Promise.all([
        fetch(`/api/chama/groups/${groupId}`, { cache: "no-store" }),
        fetch(`/api/chama/groups/${groupId}/members`, { cache: "no-store" }),
        fetch(`/api/chama/groups/${groupId}/rounds`, { cache: "no-store" }),
      ]);

      const groupData = await groupRes.json();
      const membersData = await membersRes.json();
      const roundsData = await roundsRes.json();

      if (!groupRes.ok) throw new Error(groupData?.error || "Failed to load group.");
      if (!membersRes.ok) throw new Error(membersData?.error || "Failed to load members.");
      if (!roundsRes.ok) throw new Error(roundsData?.error || "Failed to load rounds.");

      setGroup(groupData.group);
      setStats(groupData.stats);
      setMembers(membersData.members ?? []);
      setOpenRoundId(membersData.openRoundId ?? null);
      setRounds(roundsData.rounds ?? []);
      setGroupForm({
        name: groupData.group.name,
        description: groupData.group.description,
        contributionAmount: String(groupData.group.contributionAmount),
        frequency: groupData.group.frequency,
        startDate: groupData.group.startDate?.slice(0, 10) ?? "",
        currency: groupData.group.currency,
      });
      setContributionForm((prev) => ({
        ...prev,
        memberId: membersData.members?.[0]?.id ?? "",
        amount: String(groupData.group.contributionAmount ?? ""),
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load group.");
    } finally {
      setLoading(false);
    }
  };

  const loadContributions = async (roundId?: string | null) => {
    if (!roundId) {
      setContributions([]);
      return;
    }
    try {
      const response = await fetch(
        `/api/chama/groups/${groupId}/contributions?roundId=${roundId}`,
        { cache: "no-store" }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Failed to load contributions.");
      setContributions(data.contributions ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load contributions.");
    }
  };

  useEffect(() => {
    if (groupId) {
      loadGroup();
    }
  }, [groupId]);

  useEffect(() => {
    loadContributions(openRoundId);
  }, [openRoundId]);

  const handleAddMember = async () => {
    setMessage("");
    setError("");
    if (!memberForm.email && !memberForm.phone) {
      setError("Provide an email or phone number.");
      return;
    }
    try {
      const response = await fetch(`/api/chama/groups/${groupId}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberForm),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to invite member.");
      setMessage("Invite sent. Member is pending approval.");
      setMemberForm({ name: "", email: "", phone: "", role: "member" });
      await loadGroup();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to invite member.");
    }
  };

  const handleUpdateMember = async (memberId: string, updates: Record<string, string>) => {
    setMessage("");
    setError("");
    try {
      const response = await fetch(`/api/chama/groups/${groupId}/members/${memberId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to update member.");
      setMessage("Member updated.");
      await loadGroup();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update member.");
    }
  };

  const handleRecordContribution = async () => {
    setMessage("");
    setError("");
    if (!openRoundId) {
      setError("No open round available.");
      return;
    }
    if (!contributionForm.memberId || !contributionForm.amount) {
      setError("Select a member and amount.");
      return;
    }
    try {
      const response = await fetch(`/api/chama/groups/${groupId}/contributions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roundId: openRoundId,
          memberId: contributionForm.memberId,
          amount: contributionForm.amount,
          method: contributionForm.method,
          reference: contributionForm.reference,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to record contribution.");
      setMessage("Contribution recorded.");
      await loadGroup();
      await loadContributions(openRoundId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to record contribution.");
    }
  };

  const handleAdvanceRound = async () => {
    setMessage("");
    setError("");
    try {
      const response = await fetch(`/api/chama/groups/${groupId}/rounds`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "advance" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to advance round.");
      setMessage("Round advanced to next recipient.");
      await loadGroup();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to advance round.");
    }
  };

  const handleMarkReceived = async () => {
    setMessage("");
    setError("");
    try {
      const response = await fetch(`/api/chama/groups/${groupId}/rounds`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "mark-received" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to mark received.");
      setMessage("Recipient marked as paid.");
      await loadGroup();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to mark received.");
    }
  };

  const updateRotationOrder = async (nextOrder: string[], shuffle = false) => {
    setMessage("");
    setError("");
    try {
      const response = await fetch(`/api/chama/groups/${groupId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rotationOrder: nextOrder,
          shuffleRotation: shuffle,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to update rotation.");
      setMessage("Rotation order updated.");
      await loadGroup();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update rotation.");
    }
  };

  const handleGroupUpdate = async () => {
    setMessage("");
    setError("");
    try {
      const response = await fetch(`/api/chama/groups/${groupId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groupForm),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to update group.");
      setMessage("Group details updated.");
      await loadGroup();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update group.");
    }
  };

  const rotationMembers = useMemo(() => {
    if (!group?.rotationOrder?.length) return members;
    return group.rotationOrder
      .map((id) => members.find((member) => member.id === id))
      .filter(Boolean) as Member[];
  }, [group?.rotationOrder, members]);

  const rotationOrder = useMemo(() => {
    if (group?.rotationOrder?.length) return group.rotationOrder;
    return members.map((member) => member.id);
  }, [group?.rotationOrder, members]);

  if (loading || !group) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="glass-panel h-32" />
        <div className="glass-panel h-72" />
      </div>
    );
  }

  const openRound = rounds.find((round) => round.status === "open");
  const recipient = members.find((member) => member.id === openRound?.recipientMemberId);

  return (
    <div className="space-y-8">
      <section className="glass-panel p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_55%)]" />
        <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
              <Sparkles size={16} />
              {group.frequency} ChamaHub group
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-3">
              {group.name}
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted)] mt-3 max-w-2xl">
              {group.description || "Organize contributions, rotations, and payouts inside ChamaHub."}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="glass-chip px-4 py-2 text-xs">Currency: {group.currency}</span>
              <span className="glass-chip px-4 py-2 text-xs">
                Contribution: {currencyFormatter.format(group.contributionAmount)}
              </span>
              <span className="glass-chip px-4 py-2 text-xs">
                Members: {stats?.membersCount ?? 0}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleMarkReceived}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--glass-border)] bg-white/70 text-sm font-semibold"
            >
              <CheckCircle2 size={16} />
              Mark recipient paid
            </button>
            <button
              type="button"
              onClick={handleAdvanceRound}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold"
            >
              <ArrowRight size={16} />
              Move to next round
            </button>
          </div>
        </div>
      </section>

      {error && <div className="glass-panel p-4 text-sm text-rose-500">{error}</div>}
      {message && <div className="glass-panel p-4 text-sm">{message}</div>}

      <section className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="glass-panel p-6 sm:p-7 space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Current round</p>
            <h2 className="text-xl font-semibold mt-2">Cycle overview</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-6 items-center">
            <RotationWheel
              members={rotationMembers}
              highlightedId={openRound?.recipientMemberId ?? null}
            />
            <div className="space-y-4">
              <div className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  Recipient
                </p>
                <p className="text-lg font-semibold mt-2">
                  {recipient?.name || recipient?.email || "Pending"}
                </p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Round {openRound?.roundNumber ?? "--"} •{" "}
                  {openRound?.dueDate ? new Date(openRound.dueDate).toLocaleDateString() : "TBD"}
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Pot size</p>
                <p className="text-lg font-semibold mt-2">
                  {currencyFormatter.format(stats?.potAmount ?? 0)}
                </p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Contributions so far: {currencyFormatter.format(openRound?.totalContributions ?? 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-7 space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Rotation order</p>
            <h2 className="text-xl font-semibold mt-2">Update payout sequence</h2>
          </div>
          <div className="space-y-3">
            {rotationMembers.map((member, index) => (
              <div
                key={member.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--glass-border)] bg-white/60 p-3"
              >
                <div>
                  <p className="text-sm font-semibold">{member.name || member.email || "Member"}</p>
                  <p className="text-xs text-[var(--muted)] capitalize">{member.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!rotationOrder.length) return;
                      const next = [...rotationOrder];
                      if (index === 0) return;
                      [next[index - 1], next[index]] = [next[index], next[index - 1]];
                      updateRotationOrder(next);
                    }}
                    className="p-2 rounded-full border border-[var(--glass-border)] bg-white/70"
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!rotationOrder.length) return;
                      const next = [...rotationOrder];
                      if (index === next.length - 1) return;
                      [next[index + 1], next[index]] = [next[index], next[index + 1]];
                      updateRotationOrder(next);
                    }}
                    className="p-2 rounded-full border border-[var(--glass-border)] bg-white/70"
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => updateRotationOrder(rotationOrder, true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--glass-border)] bg-white/70 text-sm font-semibold"
          >
            <RefreshCcw size={16} />
            Shuffle order
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="glass-panel p-6 sm:p-7 space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              Members & roles
            </p>
            <h2 className="text-xl font-semibold mt-2">Manage contributors</h2>
          </div>
          <div className="space-y-3">
            {members.map((member) => (
              <div
                key={member.id}
                className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="font-semibold">{member.name || member.email || "Member"}</p>
                    <p className="text-xs text-[var(--muted)] mt-1">
                      {member.email || member.phone || "No contact"} •{" "}
                      {member.status}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <select
                      className="text-xs border border-[var(--glass-border)] rounded-full px-2 py-1 bg-white/70"
                      value={member.role}
                      onChange={(event) =>
                        handleUpdateMember(member.id, { role: event.target.value })
                      }
                    >
                      {["admin", "treasurer", "secretary", "member"].map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    {member.status !== "active" && (
                      <button
                        type="button"
                        onClick={() => handleUpdateMember(member.id, { status: "active" })}
                        className="text-xs px-3 py-1 rounded-full bg-[var(--button-bg)]/10 text-[var(--button-bg)]"
                      >
                        Accept
                      </button>
                    )}
                    {member.status !== "rejected" && (
                      <button
                        type="button"
                        onClick={() => handleUpdateMember(member.id, { status: "rejected" })}
                        className="text-xs px-3 py-1 rounded-full bg-rose-100 text-rose-600"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-xs text-[var(--muted)] mt-2">
                  Contribution this round: {currencyFormatter.format(member.contributionTotal)}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4 space-y-4">
            <div className="flex items-center gap-2">
              <UserPlus size={18} />
              <h3 className="font-semibold text-lg">Invite member</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                className={inputClass}
                placeholder="Full name"
                value={memberForm.name}
                onChange={(event) => setMemberForm((prev) => ({ ...prev, name: event.target.value }))}
              />
              <select
                className={inputClass}
                value={memberForm.role}
                onChange={(event) => setMemberForm((prev) => ({ ...prev, role: event.target.value }))}
              >
                {["member", "secretary", "treasurer", "admin"].map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <input
                className={inputClass}
                placeholder="Email"
                value={memberForm.email}
                onChange={(event) => setMemberForm((prev) => ({ ...prev, email: event.target.value }))}
              />
              <input
                className={inputClass}
                placeholder="Phone"
                value={memberForm.phone}
                onChange={(event) => setMemberForm((prev) => ({ ...prev, phone: event.target.value }))}
              />
            </div>
            <button
              type="button"
              onClick={handleAddMember}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold"
            >
              <Plus size={16} />
              Send invite
            </button>
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-7 space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              Contribution log
            </p>
            <h2 className="text-xl font-semibold mt-2">Record contributions</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <select
              className={inputClass}
              value={contributionForm.memberId}
              onChange={(event) =>
                setContributionForm((prev) => ({ ...prev, memberId: event.target.value }))
              }
            >
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name || member.email || "Member"}
                </option>
              ))}
            </select>
            <input
              className={inputClass}
              type="number"
              placeholder="Amount (KES)"
              value={contributionForm.amount}
              onChange={(event) =>
                setContributionForm((prev) => ({ ...prev, amount: event.target.value }))
              }
            />
            <input
              className={inputClass}
              placeholder="Method (manual / mpesa)"
              value={contributionForm.method}
              onChange={(event) =>
                setContributionForm((prev) => ({ ...prev, method: event.target.value }))
              }
            />
            <input
              className={inputClass}
              placeholder="Reference (optional)"
              value={contributionForm.reference}
              onChange={(event) =>
                setContributionForm((prev) => ({ ...prev, reference: event.target.value }))
              }
            />
          </div>
          <button
            type="button"
            onClick={handleRecordContribution}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--glass-border)] bg-white/70 text-sm font-semibold"
          >
            <Plus size={16} />
            Record contribution
          </button>

          <div className="space-y-3">
            {contributions.map((contribution) => {
              const member = members.find((item) => item.id === contribution.memberId);
              return (
                <div
                  key={contribution.id}
                  className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{member?.name || member?.email || "Member"}</p>
                    <span className="text-sm font-semibold">
                      {currencyFormatter.format(contribution.amount)}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    {contribution.method} •{" "}
                    {contribution.paidAt ? new Date(contribution.paidAt).toLocaleDateString() : "Today"}
                  </p>
                </div>
              );
            })}
            {contributions.length === 0 && (
              <p className="text-sm text-[var(--muted)]">No contributions logged yet.</p>
            )}
          </div>
        </div>
      </section>

      <section className="glass-panel p-6 sm:p-7 space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Group settings</p>
          <h2 className="text-xl font-semibold mt-2">Update core details</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className={inputClass}
            placeholder="Group name"
            value={groupForm.name}
            onChange={(event) => setGroupForm((prev) => ({ ...prev, name: event.target.value }))}
          />
          <input
            className={inputClass}
            placeholder="Description"
            value={groupForm.description}
            onChange={(event) =>
              setGroupForm((prev) => ({ ...prev, description: event.target.value }))
            }
          />
          <input
            className={inputClass}
            type="number"
            placeholder="Contribution amount"
            value={groupForm.contributionAmount}
            onChange={(event) =>
              setGroupForm((prev) => ({ ...prev, contributionAmount: event.target.value }))
            }
          />
          <select
            className={inputClass}
            value={groupForm.frequency}
            onChange={(event) =>
              setGroupForm((prev) => ({ ...prev, frequency: event.target.value }))
            }
          >
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <input
            className={inputClass}
            type="date"
            value={groupForm.startDate}
            onChange={(event) =>
              setGroupForm((prev) => ({ ...prev, startDate: event.target.value }))
            }
          />
          <input
            className={inputClass}
            placeholder="Currency"
            value={groupForm.currency}
            onChange={(event) =>
              setGroupForm((prev) => ({ ...prev, currency: event.target.value }))
            }
          />
        </div>
        <button
          type="button"
          onClick={handleGroupUpdate}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold"
        >
          Save changes
        </button>
      </section>
    </div>
  );
}
