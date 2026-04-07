// src/app/moderator-signup/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Users, Wallet } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white/70 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)]/40";

export default function ModeratorSignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    groupName: "",
    description: "",
    contributionAmount: "",
    frequency: "monthly",
    numberOfMembers: "5",
    startDate: new Date().toISOString().slice(0, 10),
    currency: "KES",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/chama/moderator-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          email: form.email.trim().toLowerCase(),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error ?? "Failed to create moderator account.");
      }

      const { error } = await authClient.signIn.email({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      if (error) {
        throw new Error("Account created, but sign-in failed. Please log in.");
      }

      setStatus("success");
      setMessage("Moderator account created. Redirecting...");
      const groupId = data?.groupId ? `?groupId=${data.groupId}` : "";
      const groupName = form.groupName ? `&groupName=${encodeURIComponent(form.groupName)}` : "";
      window.location.href = `/moderator/onboarding${groupId}${groupName}`;
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="glass-panel w-full max-w-3xl p-6 sm:p-8">
        <div className="flex items-center gap-3 text-[var(--button-bg)] text-xs sm:text-sm uppercase tracking-[0.3em]">
          <Sparkles size={16} />
          Moderator Signup
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold mt-3">
          Lease your first ChamaHub group in minutes.
        </h1>
        <p className="text-sm text-[var(--muted)] mt-3">
          Create your moderator account, set up your group, and invite members right away.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              className={inputClass}
              placeholder="Full name"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              required
            />
            <input
              className={inputClass}
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              required
            />
            <input
              className={inputClass}
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              required
            />
            <input
              className={inputClass}
              placeholder="Chama group name"
              value={form.groupName}
              onChange={(event) => setForm((prev) => ({ ...prev, groupName: event.target.value }))}
              required
            />
          </div>

          <input
            className={inputClass}
            placeholder="Group description (optional)"
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
              required
            />
            <select
              className={inputClass}
              value={form.frequency}
              onChange={(event) => setForm((prev) => ({ ...prev, frequency: event.target.value }))}
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
              onChange={(event) => setForm((prev) => ({ ...prev, startDate: event.target.value }))}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--muted)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-white/60 px-3 py-2">
              <Users size={14} />
              Lease per group
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-white/60 px-3 py-2">
              <Wallet size={14} />
              Member payments dashboard
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold disabled:opacity-70"
          >
            {status === "loading" ? "Creating moderator..." : "Create moderator account"}
            <ArrowRight size={16} />
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 rounded-2xl px-4 py-3 text-sm ${
              status === "success"
                ? "bg-emerald-500/10 text-emerald-600"
                : "bg-rose-500/10 text-rose-500"
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-6 text-sm text-[var(--muted)]">
          Already a moderator?{" "}
          <Link href="/moderator-login" className="text-[var(--button-bg)] font-semibold hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
