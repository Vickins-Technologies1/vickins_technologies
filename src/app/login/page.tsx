// src/app/login/page.tsx
"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isSignup) {
      // Name is REQUIRED by Better Auth – provide a fallback if empty
      const displayName = name.trim() || "User"; // fallback to "User" (or email, etc.)

      const { error: signupError } = await authClient.signUp.email({
        email,
        password,
        name: displayName,
      });

      if (signupError) {
        const message = signupError.message ?? "";
        if (message.toLowerCase().includes("exists")) {
          setError("This email is already registered. Please log in.");
        } else {
          setError(message || "Signup failed. Try again.");
        }
      } else {
        window.location.href = "/admin";
      }
    } else {
      const { error: signinError } = await authClient.signIn.email({
        email,
        password,
      });

      if (signinError) {
        setError("Invalid email or password");
      } else {
        window.location.href = "/admin";
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-md p-8 bg-[var(--card-bg)] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center text-[var(--foreground)] mb-8">
          {isSignup ? "Create Admin Account" : "Admin Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name (required)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required // Make it required in the form too
              className="w-full px-4 py-3 bg-[var(--background)] text-[var(--foreground)] border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)]"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[var(--background)] text-[var(--foreground)] border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[var(--background)] text-[var(--foreground)] border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[var(--button-bg)] hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-70"
          >
            {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
          </button>

          {error && (
            <p className="text-red-500 text-center text-sm bg-red-50 dark:bg-red-900/30 py-2 rounded">
              {error}
            </p>
          )}
        </form>

        <p className="text-center mt-6 text-[var(--foreground)] text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
            }}
            className="text-[var(--button-bg)] font-medium hover:underline"
          >
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}