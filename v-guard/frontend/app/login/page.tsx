"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { login, register } from "../../lib/api";
import { writeSession } from "../../lib/session";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const session =
        mode === "login"
          ? await login(email, password)
          : await register(email, password, displayName);
      writeSession(session);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="glass-strong panel w-full max-w-md p-6 sm:p-8">
        <p className="panel-title">V-Guard access</p>
        <h1 className="mt-3 text-3xl font-semibold">{mode === "login" ? "Sign in" : "Create account"}</h1>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {mode === "register" && (
            <input
              className="w-full rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.06)] px-4 py-3 outline-none placeholder:text-white/40"
              placeholder="Display name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
            />
          )}
          <input
            className="w-full rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.06)] px-4 py-3 outline-none placeholder:text-white/40"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="w-full rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.06)] px-4 py-3 outline-none placeholder:text-white/40"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            className="w-full rounded-full bg-[var(--accent)] px-4 py-3 font-semibold text-white disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? "Working..." : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>
        {error && <p className="mt-4 text-sm text-red-200">{error}</p>}
        <button
          className="mt-5 text-sm text-[var(--muted)] underline underline-offset-4"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          type="button"
        >
          {mode === "login" ? "Need an account? Register" : "Already have an account? Sign in"}
        </button>
      </div>
    </main>
  );
}
