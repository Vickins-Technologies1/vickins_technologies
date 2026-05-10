"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRightIcon, ShieldCheckIcon, CpuChipIcon } from "@heroicons/react/24/outline";

const highlights = [
  "Architecture + delivery plan",
  "Design system + UI polish",
  "Secure, scalable engineering",
  "Automation where it saves time",
  "Docs, handover, and support",
];

const trustSignals = [
  { title: "Senior-led delivery", description: "Clear ownership, crisp communication, reliable execution." },
  { title: "Security-first builds", description: "Best-practice auth, data handling, and review baked in." },
  { title: "Maintainable architecture", description: "Clean boundaries, testing strategy, and future-proof patterns." },
  { title: "NDA-friendly", description: "Confidential delivery with references available on request." },
];

export default function HeroSection() {
  const { scrollY } = useScroll();
  const orbY = useTransform(scrollY, [0, 900], [0, 140]);
  const gridY = useTransform(scrollY, [0, 900], [0, 70]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.1 }}
      id="home"
      className="relative min-h-[78vh] flex items-center overflow-hidden text-[var(--foreground)]"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--page-bg)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,_rgba(var(--accent-rgb),0.18),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_0%,_rgba(10,22,51,0.10),_transparent_60%)]" />
        <motion.div
          className="absolute inset-0 opacity-35"
          style={{
            y: gridY,
            backgroundImage: "var(--page-grid)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <motion.div
        className="glow-orb float-slow"
        style={{
          y: orbY,
          top: "-10%",
          left: "-7%",
          width: "360px",
          height: "360px",
          background: "rgba(10,22,51,0.18)",
        }}
      />
      <motion.div
        className="glow-orb float-slower"
        style={{
          y: orbY,
          bottom: "-12%",
          right: "-6%",
          width: "420px",
          height: "420px",
          background: "rgba(var(--accent-rgb),0.22)",
        }}
      />

      <div className="relative z-10 w-full px-5 sm:px-6 lg:px-8 max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-7 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--glass-surface)] border border-[var(--glass-border)] text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[var(--foreground)]/70">
            Smart solutions. Stronger futures.
            <span className="h-1 w-6 rounded-full bg-[var(--accent)]/80" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-5 leading-[1.06]">
            Enterprise-ready platforms,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-2)] via-[var(--accent-2)] to-[var(--accent)]">
              {" "}
              engineered to scale.
            </span>
          </h1>
          <p className="text-[15px] sm:text-base text-[var(--foreground)]/78 max-w-2xl mt-4">
            We partner with ambitious teams to design, build, and improve secure web platforms, mobile apps, and
            internal tools — built for reliability, maintainability, and measurable outcomes.
          </p>
          <p className="text-sm text-[var(--foreground)]/62 max-w-2xl mt-3">
            Need physical security too?{" "}
            <Link href="/vickins-security" className="text-[var(--accent-2)] underline underline-offset-4 hover:opacity-90">
              Vickins Security
            </Link>
            {" "}covers CCTV, access control, alarms, electric fence and more.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {["Architecture", "Engineering", "Reliability", "Compliance-ready", "Design systems"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface)] px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-[var(--foreground)]/72"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-2.5">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-full bg-[var(--button-bg)] text-white font-semibold shadow-[var(--shadow-tight)] transition-all duration-500 hover:-translate-y-0.5"
            >
              Request enterprise proposal
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#enterprise"
              className="group inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-full border border-[var(--glass-border)] text-[var(--foreground)]/86 font-semibold backdrop-blur-md hover:bg-[var(--hover-bg)] transition-all duration-500"
            >
              Enterprise delivery
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-full border border-[var(--glass-border)] text-[var(--foreground)]/86 font-semibold backdrop-blur-md hover:bg-[var(--hover-bg)] transition-all duration-500"
            >
              See work
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/vickins-security"
              className="group inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-full border border-[rgba(var(--accent-rgb),0.45)] text-[var(--accent-2)] font-semibold backdrop-blur-md hover:bg-[rgba(var(--accent-rgb),0.10)] transition-all duration-500"
            >
              Security
              <ShieldCheckIcon className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {trustSignals.map((signal) => (
              <div
                key={signal.title}
                className="shimmer-line rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-surface)] px-4 py-3"
              >
                <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--foreground)]/55 mt-1">
                  {signal.title}
                </div>
                <div className="text-sm text-[var(--foreground)]/72 mt-2 leading-snug">
                  {signal.description}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="glass-panel p-5 sm:p-6 text-[var(--foreground)]"
        >
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]/85" />
            How we work
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold mt-3">
            Clear plan. Production-grade build.
          </h2>
          <p className="text-[15px] text-[var(--foreground)]/78 mt-3">
            Scope, milestones, risk notes, and weekly updates. You always know what’s next — and what’s blocked.
          </p>

          <div className="mt-5 space-y-3.5">
            {highlights.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-[var(--accent)]/10 p-2">
                  <ShieldCheckIcon className="w-4 h-4 text-[var(--accent)]" />
                </div>
                <div className="text-sm text-[var(--foreground)]/78">{item}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <CpuChipIcon className="w-4 h-4 text-[var(--accent)]" />
                Engineering quality
              </div>
              <p className="text-xs text-[var(--foreground)]/70 mt-2">
                Performance budgets, clean boundaries, testing strategy, and security checks that actually ship.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <ShieldCheckIcon className="w-4 h-4 text-[var(--accent)]" />
                Maintainable UX
              </div>
              <p className="text-xs text-[var(--foreground)]/70 mt-2">
                Compact UI, clean typography, and a design system your team can extend without breaking consistency.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
