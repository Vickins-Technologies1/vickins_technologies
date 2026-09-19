"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon, CheckIcon, CircleStackIcon, MoonIcon, ShieldCheckIcon, SignalIcon, SunIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { type FormEvent } from "react";
import { ApiError, login, register } from "../../lib/api";
import { writeSession } from "../../lib/session";

function AuthNetworkVisual() {
  return <div className="auth-visual" aria-label="Illustrative VornShield infrastructure visual"><div className="auth-visual-grid" /><div className="auth-route route-one" /><div className="auth-route route-two" /><div className="auth-route route-three" /><div className="auth-core"><Image src="/v-guard-logo.png" alt="" width={42} height={42} /><span>GATEWAY</span><strong>CONNECTED</strong></div><div className="auth-node auth-node-one"><SignalIcon /><span>NETWORK</span><strong>ACTIVE</strong></div><div className="auth-node auth-node-two"><ShieldCheckIcon /><span>SESSION</span><strong>SECURE</strong></div><div className="auth-node auth-node-three"><CircleStackIcon /><span>TRAFFIC</span><strong>MONITORED</strong></div><div className="auth-caption"><span className="status-dot" /> PRODUCT INTERFACE / ILLUSTRATIVE STATE</div></div>;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => { const stored = window.localStorage.getItem("vornshield-theme"); const next = stored === "light" ? "light" : "dark"; setTheme(next); document.documentElement.dataset.theme = next; }, []);
  function toggleTheme() { const next = theme === "dark" ? "light" : "dark"; setTheme(next); document.documentElement.dataset.theme = next; window.localStorage.setItem("vornshield-theme", next); }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError(null);
    try {
      const session = mode === "login" ? await login(email, password) : await register(email, password, displayName);
      writeSession(session); router.push("/dashboard");
    } catch (caught) {
      if (caught instanceof ApiError) {
        if (mode === "register" && caught.status === 400) setError("Enter a valid email and a password with at least 8 characters.");
        else if (mode === "register" && caught.status === 409) setError("An account with this email already exists. Sign in instead.");
        else if (caught.status === 401) setError(mode === "login" ? "The email or password is incorrect." : "Authentication was not accepted. Check your details and try again.");
        else if (caught.status >= 500) setError(mode === "register" ? "Registration service is temporarily unavailable. Please try again shortly." : "Authentication service is temporarily unavailable. Please try again shortly.");
        else setError("Authentication failed. Check your details and try again.");
      } else setError("Authentication failed. Check your details and try again.");
    } finally { setLoading(false); }
  }

  return <main className="auth-page"><div className="auth-shell"><section className="auth-visual-pane"><div className="auth-brand-row"><Link href="/" className="auth-brand"><Image src="/v-guard-logo.png" alt="" width={42} height={42} priority /><span>VORNSHIELD<small>NETWORK CONTROL</small></span></Link><button className="auth-theme-toggle" type="button" aria-label="Toggle theme" onClick={toggleTheme}>{theme === "dark" ? <MoonIcon /> : <SunIcon />}</button></div><div className="auth-visual-copy"><p className="eyebrow-blue">NETWORK INFRASTRUCTURE</p><h1>Built for modern<br /><span>workloads.</span></h1><p>Secure access, traffic visibility and proxy infrastructure in one focused control plane.</p></div><AuthNetworkVisual /><div className="auth-visual-foot"><span>VORNSHIELD BY VICKINS TECHNOLOGIES</span><span>ACCESS · TRAFFIC · CONTROL</span></div></section><section className="auth-form-pane"><div className="auth-form-wrap"><div className="auth-mobile-brand"><Link href="/" className="auth-brand"><Image src="/v-guard-logo.png" alt="" width={38} height={38} priority /><span>VORNSHIELD<small>NETWORK CONTROL</small></span></Link><button className="auth-theme-toggle" type="button" aria-label="Toggle theme" onClick={toggleTheme}>{theme === "dark" ? <MoonIcon /> : <SunIcon />}</button></div><div className="auth-form-heading"><p className="eyebrow-blue">{mode === "login" ? "SECURE ACCESS" : "NEW WORKSPACE"}</p><h2>{mode === "login" ? "Sign in to VornShield" : "Create your account"}</h2><p>{mode === "login" ? "Continue to your network control plane." : "Start managing proxy access and traffic from one workspace."}</p></div><form className="auth-form" onSubmit={handleSubmit}>{mode === "register" && <label><span>Display name</span><input autoComplete="name" placeholder="Your name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} required /></label>}<label><span>Email address</span><input autoComplete="email" placeholder="you@company.com" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label><span>Password</span><input autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder="Enter your password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} /></label>{mode === "login" && <div className="auth-form-meta"><span><CheckIcon /> Session-backed access</span><span className="auth-unavailable">Password recovery unavailable</span></div>}<button className="auth-submit" disabled={loading} type="submit">{loading ? <><span className="button-spinner" /> Working…</> : <>{mode === "login" ? "Sign in" : "Create account"}<ArrowRightIcon /></>}</button></form>{error && <div className="auth-error" role="alert">{error}</div>}<button className="auth-mode-toggle" type="button" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(null); }}>{mode === "login" ? "Need an account? Create one" : "Already have an account? Sign in"}</button><p className="auth-responsible">Use VornShield for legitimate business, development, testing and publicly available data workflows.</p></div></section></div></main>;
}
