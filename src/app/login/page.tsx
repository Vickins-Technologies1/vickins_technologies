// src/app/login/page.tsx
"use client";

import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white/70 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)]/40";

function LoginContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [adminExists, setAdminExists] = useState<boolean | null>(null);

  const callbackUrl = useMemo(() => searchParams.get("callbackUrl") ?? "/admin", [searchParams]);
  const safeCallback = useMemo(() => {
    if (!callbackUrl.startsWith("/")) return "/admin";
    if (callbackUrl.startsWith("/admin-signup") || callbackUrl.startsWith("/login")) {
      return "/admin";
    }
    return callbackUrl;
  }, [callbackUrl]);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch("/api/admin/bootstrap");
        const data = await response.json();
        if (response.ok && typeof data?.adminExists === "boolean") {
          setAdminExists(data.adminExists);
        } else {
          setAdminExists(null);
        }
      } catch {
        setAdminExists(null);
      }
    };

    checkAdmin();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();
    const { error: signinError } = await authClient.signIn.email({
      email: normalizedEmail,
      password,
    });

    if (signinError) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    const sessionResult = await authClient.getSession();
    const session =
      sessionResult && typeof sessionResult === "object" && "data" in sessionResult
        ? sessionResult.data
        : sessionResult;
    const role = session?.user?.role ?? "";
    const isAdmin = role.split(",").map((value: string) => value.trim()).includes("admin");

    if (!isAdmin) {
      await authClient.signOut();
      setError("Admin access only. Use the one-time admin signup if no admin exists.");
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
            background: "rgba(56, 189, 248, 0.22)",
          }}
        />
        <div
          className="glow-orb float-slower"
          style={{
            bottom: "-12%",
            right: "-6%",
            width: "360px",
            height: "360px",
            background: "rgba(99, 102, 241, 0.18)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-lg glass-panel p-6 sm:p-8">
        <div className="flex items-center gap-3 text-[var(--button-bg)] text-xs sm:text-sm uppercase tracking-[0.3em]">
          <ShieldCheck size={16} />
          Admin Login
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold mt-3 text-[var(--foreground)]">
          Secure access to your command center.
        </h2>
        <p className="text-sm text-[var(--muted)] mt-3">
          Log in with your admin credentials to manage inventory, cash flow, and operations.
        </p>

        {adminExists === false && (
          <div className="mt-5 rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4 text-sm text-[var(--foreground)]">
            No admin account exists yet. Use the one-time signup to create the first admin.
            <a
              href="/admin-signup"
              className="mt-3 inline-flex items-center gap-2 text-[var(--button-bg)] font-semibold hover:underline"
            >
              Go to one-time signup
              <ArrowRight size={16} />
            </a>
          </div>
        )}

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
            {loading ? "Processing..." : "Login"}
          </button>

          {error && (
            <p className="text-rose-500 text-center text-sm bg-rose-50 dark:bg-rose-900/30 py-2 rounded-lg">
              {error}
            </p>
          )}
        </form>

        {adminExists !== false && (
          <p className="text-center mt-6 text-[var(--muted)] text-xs">
            First admin setup?{" "}
            <a href="/admin-signup" className="text-[var(--button-bg)] font-medium hover:underline">
              Use one-time admin signup
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="glass-panel w-full max-w-md p-6 sm:p-8 text-center">
            Loading login...
          </div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
