"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRightIcon, BanknotesIcon, BoltIcon, ChartBarIcon, CheckIcon, ChevronDownIcon, CircleStackIcon, MoonIcon, ShieldCheckIcon, SunIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export const dynamic = "force-dynamic";

const features = [
  { icon: ShieldCheckIcon, eyebrow: "Access", title: "Account access", copy: "Create an account, sign in, and continue with a session-backed VornShield workspace." },
  { icon: CircleStackIcon, eyebrow: "Resources", title: "Proxy credentials", copy: "View provisioned HTTP and SOCKS5 credentials from the authenticated dashboard." },
  { icon: BanknotesIcon, eyebrow: "Traffic", title: "Traffic balance", copy: "Track remaining proxy traffic and use plans to add more through the billing flow." },
  { icon: ChartBarIcon, eyebrow: "Usage", title: "Usage snapshots", copy: "Review recent bandwidth usage recorded for your account." },
  { icon: BoltIcon, eyebrow: "Checkout", title: "Flutterwave checkout", copy: "Select an active proxy plan and open a Flutterwave payment checkout." },
  { icon: UserGroupIcon, eyebrow: "Control", title: "Admin controls", copy: "Admin accounts can sync proxy daemon configuration for active users." },
] as const;

const process = [
  ["01", "Create an account", "Register with your display name, email, and password."],
  ["02", "Open your dashboard", "Sign in to see your balance, plans, payments, usage, and credentials."],
  ["03", "Choose a plan", "Review an active proxy traffic package with its currency and GB allocation."],
  ["04", "Complete checkout", "Continue to Flutterwave, then return after backend payment confirmation."],
] as const;

function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => { const stored = window.localStorage.getItem("vguard_theme"); const next = stored === "light" ? "light" : "dark"; setDark(next === "dark"); document.documentElement.dataset.theme = next; }, []);
  function toggle() { const next = dark ? "light" : "dark"; setDark(!dark); document.documentElement.dataset.theme = next; window.localStorage.setItem("vguard_theme", next); }
  return <button type="button" onClick={toggle} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} className="theme-toggle">{dark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}</button>;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={{ opacity: 0, y: reduced ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55, delay }}>{children}</motion.div>;
}

function DashboardPreview() {
  return <div className="preview-shell"><div className="preview-topbar"><div className="preview-brand"><span className="preview-dot" /> VORNSHIELD</div><span className="preview-avatar">A</span></div><div className="preview-body"><div className="preview-sidebar"><span className="preview-sidebar-active">Overview</span><span>Usage</span><span>Billing</span><span>Settings</span></div><div className="preview-content"><div className="preview-heading"><div><small>WELCOME BACK</small><strong>Control center</strong></div><span className="preview-status">● Active</span></div><div className="preview-stat-grid"><div><small>Traffic balance</small><strong>7.16 GB</strong></div><div><small>Plans</small><strong>available</strong></div><div><small>Usage</small><strong>2.84 GB</strong></div></div><div className="preview-lower"><div className="preview-panel"><small>PROXY CREDENTIALS</small><div className="preview-line"><span>HTTP</span><b>credential ready</b></div><div className="preview-line"><span>SOCKS5</span><b>credential ready</b></div></div><div className="preview-panel"><small>TRAFFIC STATE</small><div className="preview-bars"><i /><i /><i /><i /><i /></div><span className="preview-caption">Recent traffic usage</span></div></div></div></div></div>;
}

export default function HomePage() {
  return <main>
    <header className="site-header"><div className="site-nav"><Link href="/" className="brand" aria-label="VornShield home"><Image src="/v-guard-logo.png" alt="VornShield logo" width={44} height={44} priority /><span>VORNSHIELD <small>SYSTEM</small></span></Link><nav className="desktop-nav" aria-label="Primary navigation"><a href="#platform">Platform</a><a href="#features">Features</a><a href="#how-it-works">How it works</a><Link href="/billing">Plans</Link></nav><div className="nav-actions"><ThemeToggle /><Link href="/login" className="nav-login">Login</Link><Link href="/login" className="button button-small">Get started <ArrowRightIcon className="h-4 w-4" /></Link></div></div></header>

    <section className="hero" id="platform"><div className="hero-grid" /><div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" /><div className="container hero-layout"><div className="hero-copy"><Reveal><div className="eyebrow"><span className="eyebrow-line" /> PROXY ACCESS CONTROL</div></Reveal><Reveal delay={0.06}><h1>Keep proxy access<br /><em>under control.</em></h1></Reveal><Reveal delay={0.12}><p className="hero-lede">V-Guard brings account access, proxy credentials, traffic balance, usage and checkout into one focused workspace.</p></Reveal><Reveal delay={0.18}><div className="hero-actions"><Link href="/login" className="button">Create your account <ArrowRightIcon className="h-5 w-5" /></Link><a href="#features" className="text-link">Explore the platform <ChevronDownIcon className="h-4 w-4" /></a></div></Reveal><Reveal delay={0.24}><div className="hero-note"><CheckIcon className="h-4 w-4" /> Built around the functionality available in V-Guard today</div></Reveal></div><Reveal delay={0.2} className="hero-visual"><DashboardPreview /></Reveal></div><div className="container hero-foot"><span>VICKINS TECHNOLOGIES PRODUCT</span><span className="hero-foot-rule" /><span>ACCESS · TRAFFIC · USAGE</span></div></section>

    <section className="section intro-section"><div className="container intro-grid"><Reveal><p className="section-kicker">A focused control plane</p><h2>Everything you need to manage an active account.</h2></Reveal><Reveal delay={0.1}><p className="section-copy">V-Guard keeps the core workflow close: authenticate, see what is available, choose a plan, use your proxy credentials, and review the account activity that matters.</p></Reveal></div></section>

    <section className="section features-section" id="features"><div className="container"><Reveal><div className="section-heading"><div><p className="section-kicker">What V-Guard gives you</p><h2>Practical controls.<br /><span>Clear account state.</span></h2></div><p className="section-copy">No noise. Just the surfaces that are implemented and useful.</p></div></Reveal><div className="feature-grid">{features.map((feature, index) => { const Icon = feature.icon; return <Reveal key={feature.title} delay={index * 0.05}><article className="feature-card"><div className="feature-icon"><Icon className="h-5 w-5" /></div><p className="feature-eyebrow">{feature.eyebrow}</p><h3>{feature.title}</h3><p>{feature.copy}</p></article></Reveal>; })}</div></div></section>

    <section className="section showcase-section"><div className="container showcase-grid"><Reveal className="showcase-copy"><p className="section-kicker">Inside the workspace</p><h2>See the state of your account at a glance.</h2><p className="section-copy">The authenticated dashboard brings together the information returned by V-Guard: traffic balance, active plans, recent payments, usage snapshots, proxy credentials, and account status.</p><div className="showcase-list"><span><CheckIcon /> Traffic balance and GB remaining</span><span><CheckIcon /> HTTP and SOCKS5 credentials</span><span><CheckIcon /> Recent payments and usage</span><span><CheckIcon /> Active account state</span></div><Link href="/login" className="text-link">Open the dashboard <ArrowRightIcon className="h-4 w-4" /></Link></Reveal><Reveal delay={0.12} className="showcase-visual"><DashboardPreview /></Reveal></div></section>

    <section className="section process-section" id="how-it-works"><div className="container"><Reveal><div className="section-heading"><div><p className="section-kicker">How it works</p><h2>From account to<br /><span>active resources.</span></h2></div><p className="section-copy">A direct path from sign-up to managing the resources available to your account.</p></div></Reveal><div className="process-grid">{process.map(([number, title, copy], index) => <Reveal key={number} delay={index * 0.06}><article className="process-card"><span>{number}</span><h3>{title}</h3><p>{copy}</p></article></Reveal>)}</div></div></section>

    <section className="cta-section"><div className="container"><Reveal><div className="cta-panel"><div><p className="section-kicker">Ready when you are</p><h2>Start with a clear view<br />of your proxy account.</h2></div><div className="cta-actions"><Link href="/login" className="button">Get started <ArrowRightIcon className="h-5 w-5" /></Link><Link href="/billing" className="button button-secondary">View plans</Link></div></div></Reveal></div></section>

    <footer className="site-footer"><div className="container footer-inner"><Link href="/" className="brand"><Image src="/v-guard-logo.png" alt="V-Guard logo" width={36} height={36} /><span>V-GUARD <small>SYSTEM</small></span></Link><div className="footer-links"><a href="#platform">Platform</a><a href="#features">Features</a><a href="#how-it-works">How it works</a><Link href="/billing">Plans</Link><Link href="/login">Login</Link></div><p>© {new Date().getFullYear()} V-Guard System. All rights reserved.</p></div></footer>
  </main>;
}
