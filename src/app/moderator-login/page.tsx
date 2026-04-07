// src/app/moderator-login/page.tsx
"use client";

import { authClient } from "@/lib/auth-client";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white/70 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)]/40";

function ModeratorLoginContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const callbackUrl = useMemo(() => searchParams.get("callbackUrl") ?? "/chama", [searchParams]);
  const safeCallback = useMemo(() => {
    if (!callbackUrl.startsWith("/")) return "/chama";
    if (callbackUrl.startsWith("/admin")) return "/chama";
    return callbackUrl;
  }, [callbackUrl]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();
    const { error: signinError } = await authClient.signIn.email({
      email: normalizedEmail,
      password,
    });

    if (signinError) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    const sessionResult = await authClient.getSession();
    const session =
      sessionResult && typeof sessionResult === "object" && "data" in sessionResult
        ? sessionResult.data
        : sessionResult;
    const role = session?.user?.role ?? "";
    const roleList = role.split(",").map((value: string) => value.trim());
    const isModerator = roleList.includes("moderator");

    if (!isModerator) {
      await authClient.signOut();
      setError("This login is for ChamaHub moderators only.");
      setLoading(false);
      return;
    }

    window.location.href = safeCallback;
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="glow-orb float-slow"
          style={{
            top: "-10%",
            left: "-8%",
            width: "320px",
            height: "320px",
            background: "rgba(27, 92, 255, 0.22)",
          }}
        />
        <div
          className="glow-orb float-slower"
          style={{
            bottom: "-12%",
            right: "-6%",
            width: "360px",
            height: "360px",
            background: "rgba(20, 184, 166, 0.18)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-lg glass-panel p-6 sm:p-8">
        <div className="flex items-center gap-3 text-[var(--button-bg)] text-xs sm:text-sm uppercase tracking-[0.3em]">
          <Sparkles size={16} />
          Moderator Login
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold mt-3 text-[var(--foreground)]">
          Run your ChamaHub group with confidence.
        </h2>
        <p className="text-sm text-[var(--muted)] mt-3">
          Manage members, contributions, and payouts from your moderator command center.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputClass}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[var(--button-bg)] hover:bg-blue-700 text-white font-semibold rounded-full transition disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          {error && (
            <p className="text-rose-500 text-center text-sm bg-rose-50 dark:bg-rose-900/30 py-2 rounded-lg">
              {error}
            </p>
          )}
        </form>

        <div className="mt-6 text-sm text-[var(--muted)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Link href="/moderator-signup" className="text-[var(--button-bg)] font-semibold hover:underline">
            Create a moderator account
          </Link>
          <Link href="/member-login" className="inline-flex items-center gap-2 hover:underline">
            Member login
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ModeratorLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="glass-panel w-full max-w-md p-6 sm:p-8 text-center">
            Loading moderator login...
          </div>
        </div>
      }
    >
      <ModeratorLoginContent />
    </Suspense>
  );
}
