"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white/70 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)]/40";

export default function AdminSignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/admin/bootstrap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error ?? "Failed to create admin.");
      }

      setStatus("success");
      setMessage("Admin account created. You can now log in.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="glass-panel w-full max-w-xl p-6 sm:p-8">
        <div className="flex items-center gap-3 text-[var(--button-bg)] text-xs sm:text-sm uppercase tracking-[0.3em]">
          <ShieldCheck size={16} />
          One-Time Admin Signup
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold mt-3">
          Bootstrap your admin access securely.
        </h1>
        <p className="text-sm text-[var(--muted)] mt-3">
          This signup is available only until the first admin account is created. After that, it closes
          automatically.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold disabled:opacity-70"
          >
            {status === "loading" ? "Creating admin..." : "Create Admin Account"}
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
          Already have an admin?{" "}
          <Link href="/login" className="text-[var(--button-bg)] font-semibold hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
