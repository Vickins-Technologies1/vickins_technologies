"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  LockClosedIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

const trustSignals = [
  { icon: CpuChipIcon, label: "Senior-led" },
  { icon: LockClosedIcon, label: "Security-first" },
  { icon: Squares2X2Icon, label: "Maintainable architecture" },
  { icon: ShieldCheckIcon, label: "NDA-friendly" },
] as const;

const deliveryPillars = [
  {
    title: "Plan with precision",
    description: "Architecture baseline, risks, milestones, and delivery ownership.",
  },
  {
    title: "Build for reliability",
    description: "Secure auth, observability, and performance that holds up under load.",
  },
  {
    title: "Ship what your team can own",
    description: "Clean code, docs, and patterns your engineers can extend confidently.",
  },
] as const;

const industries = ["Fintech", "Logistics", "Healthcare", "Public sector", "SaaS", "Internal tools"] as const;

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const orbY = useTransform(scrollY, [0, 900], [0, shouldReduceMotion ? 0 : 120]);
  const gridY = useTransform(scrollY, [0, 900], [0, shouldReduceMotion ? 0 : 56]);

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
      className="hero-surface relative isolate min-h-[78vh] overflow-hidden text-[var(--foreground)] flex items-center"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--page-bg)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_12%_10%,rgba(var(--accent-sky-rgb),0.20),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_650px_at_82%_18%,rgba(var(--accent-rgb),0.16),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_50%_110%,rgba(var(--accent-sky-rgb),0.10),transparent_58%)]" />

        <motion.div aria-hidden="true" className="absolute inset-0 opacity-45 hero-grid-mask" style={{ y: gridY }} />
        <div aria-hidden="true" className="absolute inset-0 hero-dots hero-grid-mask opacity-55" />

        {/* Nairobi line art (subtle) */}
        <div aria-hidden="true" className="absolute -bottom-16 left-0 right-0 mx-auto w-[min(1100px,95vw)] opacity-[0.22]">
          <svg viewBox="0 0 1200 260" className="h-auto w-full">
            <defs>
              <linearGradient id="skylineStroke" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="var(--hero-skyline-a0)" />
                <stop offset="0.2" stopColor="var(--hero-skyline-a)" />
                <stop offset="0.5" stopColor="var(--hero-skyline-b)" />
                <stop offset="0.8" stopColor="var(--hero-skyline-c)" />
                <stop offset="1" stopColor="var(--hero-skyline-c0)" />
              </linearGradient>
            </defs>
            <path
              d="M15 214h60v-40h20v40h30V160h25v54h35V120h28v94h40V92h24v122h26V140h20v74h44V80h22v134h36V140h20v74h45V110h26v104h38V150h20v64h46V132h22v82h42V170h20v44h50"
              fill="none"
              stroke="url(#skylineStroke)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="3 9"
            />
            <path
              d="M20 230c190-18 305-24 360-18 88 9 126 9 206-3 102-16 250-12 395 21"
              fill="none"
              stroke="var(--hero-skyline-base)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Fade into the page background */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[var(--background)]" />
      </div>

      {/* Glow orbs */}
      <motion.div
        aria-hidden="true"
        className="glow-orb float-slow"
        style={{
          y: orbY,
          top: "-10%",
          left: "-7%",
          width: "380px",
          height: "380px",
          background: "rgba(var(--accent-sky-rgb),0.18)",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="glow-orb float-slower"
        style={{
          y: orbY,
          bottom: "-14%",
          right: "-8%",
          width: "460px",
          height: "460px",
          background: "rgba(var(--accent-rgb),0.20)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--hero-border)] bg-[var(--hero-chip-bg)] px-3 py-1.5 text-[10px] sm:text-xs uppercase tracking-[0.32em] text-[var(--hero-muted)] backdrop-blur-xl">
              Senior-led delivery
              <span className="h-1 w-6 rounded-full bg-[rgba(var(--accent-sky-rgb),0.85)]" />
              Security-first builds
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.03] tracking-[-0.03em] sm:text-5xl lg:text-6xl text-[var(--hero-ink)]">
              Secure platforms,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--hero-grad-a)] via-[var(--hero-grad-b)] to-[var(--hero-grad-c)]">
                {" "}
                built to scale.
              </span>
            </h1>

            <p className="mt-4 text-base leading-relaxed text-[var(--hero-sub)] sm:text-lg max-w-xl">
              We design, engineer, and ship web, mobile, and internal systems that stay maintainable for years — not
              quarters.
            </p>

            <p className="mt-3 text-sm text-[var(--hero-muted)] max-w-xl">
              Strong architecture, security-first execution, and clean handover — with senior ownership from kickoff to
              launch.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[image:var(--hero-primary-bg)] bg-[length:100%_100%] bg-no-repeat px-6 py-3 text-sm font-semibold text-[var(--hero-primary-fg)] shadow-[var(--hero-primary-shadow)] ring-1 ring-[var(--hero-border)] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent-sky-rgb),0.65)]"
              >
                Book Strategy Call
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/portfolio"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-[var(--hero-border)] bg-[var(--hero-chip-bg)] px-6 py-3 text-sm font-semibold text-[var(--hero-ink)] backdrop-blur-xl transition hover:bg-[var(--hero-chip-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent-sky-rgb),0.65)]"
              >
                See our work
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8 flex flex-wrap items-center gap-2"
            >
              {trustSignals.map((item) => {
                const Icon = item.icon;
                return (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--hero-border)] bg-[var(--hero-chip-bg)] px-3 py-1.5 text-[11px] font-medium text-[var(--hero-sub)] backdrop-blur-xl"
                  >
                    <Icon className="h-4 w-4 text-[rgba(var(--accent-sky-rgb),0.9)]" />
                    {item.label}
                  </span>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.65 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-10 flex items-center justify-between gap-6 border-t border-[var(--hero-border)] pt-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.34em] text-[var(--hero-muted)]">Built for</span>
                {industries.map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-[var(--hero-border)] bg-[var(--hero-chip-bg)] px-2.5 py-1 text-[11px] text-[var(--hero-muted)]"
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="hidden sm:flex items-center gap-3 text-[var(--hero-muted)]">
                <span className="text-[10px] uppercase tracking-[0.34em]">Scroll</span>
                <span className="relative h-9 w-5 rounded-full border border-[var(--hero-border)] bg-[var(--hero-chip-bg)]">
                  <span className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--hero-ink)]/60 hero-scroll-dot" />
                </span>
              </div>
            </motion.div>

            <p className="mt-4 text-xs text-[var(--hero-muted)] max-w-xl">
              Need physical security too?{" "}
              <Link
                href="/vickins-security"
                className="text-[rgba(var(--accent-sky-rgb),0.9)] hover:text-[rgba(var(--accent-sky-rgb),1)] underline underline-offset-4"
              >
                Vickins Security
              </Link>{" "}
              covers CCTV, access control, alarms, and more.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18 }}
            className="relative"
          >
            <div className="absolute -inset-2 rounded-[28px] hero-panel-glow blur-2xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-[var(--hero-border)] bg-[var(--hero-panel-bg)] p-6 shadow-[var(--hero-panel-shadow)] backdrop-blur-2xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.34em] text-[rgba(var(--accent-sky-rgb),0.75)]">
                    Delivery, not demos
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-[-0.02em] sm:text-2xl text-[var(--hero-ink)]">
                    Production-grade from week one.
                  </h2>
                </div>
                <div className="hidden sm:flex items-center gap-2 rounded-full border border-[var(--hero-border)] bg-[var(--hero-chip-bg)] px-3 py-1.5 text-xs text-[var(--hero-muted)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[rgba(var(--accent-sky-rgb),0.85)]" />
                  Reliability-focused
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {deliveryPillars.map((pillar) => (
                  <div key={pillar.title} className="rounded-2xl border border-[var(--hero-border)] bg-[var(--hero-chip-bg)] p-4">
                    <div className="text-sm font-semibold text-[var(--hero-ink)]">{pillar.title}</div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--hero-muted)]">{pillar.description}</p>
                  </div>
                ))}
              </div>

              {/* Micro diagram */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--hero-border)] bg-[var(--hero-diagram-bg)] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.34em] text-[var(--hero-muted)]">Platform blueprint</span>
                  <span className="text-[10px] uppercase tracking-[0.34em] text-[var(--hero-muted)]/70">v1.0</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                  {["Auth", "Data", "Ops"].map((label) => (
                    <div
                      key={label}
                      className="relative overflow-hidden rounded-xl border border-[var(--hero-border)] bg-[var(--hero-chip-bg)] px-3 py-3 text-[var(--hero-muted)]"
                    >
                      <div className="absolute inset-0 hero-card-sheen" aria-hidden="true" />
                      <div className="relative flex items-center justify-between">
                        <span className="font-semibold text-[var(--hero-ink)]">{label}</span>
                        <span className="h-2 w-2 rounded-full bg-[rgba(var(--accent-sky-rgb),0.7)] shadow-[var(--hero-dot-glow)]" />
                      </div>
                      <div className="relative mt-2 h-1.5 w-full rounded-full bg-[var(--hero-track)]">
                        <div className="h-1.5 w-[72%] rounded-full bg-[var(--hero-progress)]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
