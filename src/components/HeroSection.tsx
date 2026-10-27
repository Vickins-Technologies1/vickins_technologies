"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  LockClosedIcon,
  Squares2X2Icon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const trustSignals = [
  { icon: LockClosedIcon, label: "Security-first" },
  { icon: Squares2X2Icon, label: "Maintainable architecture" },
  { icon: ShieldCheckIcon, label: "NDA-friendly" },
  { icon: GlobeAltIcon, label: "Business software ready" },
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

const primaryHeadlines = [
  "Technology That Drives Business Forward.",
  "Software Engineered for Real-World Impact.",
  "Building the Future Through Technology.",
  "Turning Complex Challenges Into Digital Solutions.",
  "Engineering Systems That Scale With Ambition.",
  "Software Development in Kenya, Built for Your Business.",
  "Powerful Technology. Practical Results.",
] as const;

const secondaryHeadlines = [
  "Engineering Digital Excellence.",
  "Building Powerful Software Solutions.",
  "Securing Critical Digital Infrastructure.",
  "Transforming Business Operations Through Technology.",
  "Designing Intelligent Digital Experiences.",
  "Connecting Systems. Empowering Growth.",
  "Delivering Reliable IT Infrastructure.",
  "Turning Ideas Into Production-Ready Products.",
] as const;

type RotatingHeadlineProps = {
  level: 1 | 2;
  statements: readonly string[];
  intervalMs: number;
  transitionMs: number;
  className: string;
  slotClassName: string;
  statementClassName?: string;
};

function RotatingHeadline({
  level,
  statements,
  intervalMs,
  transitionMs,
  className,
  slotClassName,
  statementClassName = "",
}: RotatingHeadlineProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<"reading" | "exiting" | "entering">("reading");
  const Heading = level === 1 ? "h1" : "h2";

  useEffect(() => {
    if (shouldReduceMotion || phase !== "reading" || statements.length < 2) return;

    const timer = window.setTimeout(() => setPhase("exiting"), intervalMs);

    return () => window.clearTimeout(timer);
  }, [intervalMs, phase, shouldReduceMotion, statements.length]);

  const completeExit = () => {
    if (phase !== "exiting") return;
    setActiveIndex((index) => (index + 1) % statements.length);
    setPhase("entering");
  };

  const completeEntrance = () => {
    if (phase === "entering") setPhase("reading");
  };

  return (
    <Heading className={className}>
      <span className={slotClassName} aria-live="off">
        <AnimatePresence initial={false} mode="wait" onExitComplete={completeExit}>
          {phase !== "exiting" && (
            <motion.span
              key={activeIndex}
              initial={phase === "entering" && !shouldReduceMotion ? { y: "18%", opacity: 0 } : false}
              animate={{ y: 0, opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { y: "-18%", opacity: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : transitionMs / 1000,
                ease: [0.22, 1, 0.36, 1],
              }}
              onAnimationComplete={completeEntrance}
              className={`block ${statementClassName}`}
            >
              {statements[activeIndex]}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </Heading>
  );
}

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
      className="hero-surface relative isolate min-h-[78vh] text-[var(--foreground)] flex items-center"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 py-12 sm:py-14 lg:pt-14 lg:pb-0">
        <div className="hero-content-layout grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <div className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[var(--hero-border)] bg-[var(--hero-chip-bg)] px-3 py-1.5 text-[7px] sm:text-[9px] lg:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.24em] text-[var(--hero-muted)] whitespace-nowrap backdrop-blur-xl">
              <span className="sm:hidden">Vickins Technologies • security-first</span>
              <span className="hidden sm:inline">Vickins Technologies • security-first digital delivery</span>
              <span className="h-1 w-6 rounded-full bg-[rgba(var(--accent-sky-rgb),0.85)]" />
            </div>

            <RotatingHeadline
              level={1}
              statements={primaryHeadlines}
              intervalMs={7_000}
              transitionMs={750}
              className="mt-6 lg:mt-2 text-3xl font-semibold leading-[1.04] tracking-[-0.03em] text-[var(--hero-ink)] sm:text-4xl lg:text-5xl xl:text-[2.5rem]"
              slotClassName="hero-headline-rotator mt-2 block min-h-[4.2em] sm:min-h-[2.8em] lg:min-h-[3.2em] xl:min-h-[2.2em]"
            />

            <RotatingHeadline
              level={2}
              statements={secondaryHeadlines}
              intervalMs={5_000}
              transitionMs={650}
              className="mt-3 sm:mt-4 text-xl font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--hero-ink)] sm:text-2xl"
              slotClassName="hero-headline-rotator block min-h-[3.6em] sm:min-h-[2.4em]"
              statementClassName="text-transparent bg-clip-text bg-gradient-to-r from-[var(--hero-grad-a)] via-[var(--hero-grad-b)] to-[var(--hero-grad-c)]"
            />

            <p className="mt-4 lg:mt-2 text-base leading-relaxed text-[var(--hero-sub)] sm:text-lg max-w-xl">
              Vickins Technologies designs, develops and supports custom software, web and mobile applications, business platforms and system integrations for organizations in Kenya and beyond.
            </p>

            <p className="mt-3 lg:mt-1 text-sm text-[var(--hero-muted)] max-w-xl">
              Strong architecture, security-first execution, and clean handover — with senior ownership from kickoff to
              launch.
            </p>

            <div className="mt-7 lg:mt-3 flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[image:var(--hero-primary-bg)] bg-[length:100%_100%] bg-no-repeat px-6 py-3 text-sm font-semibold text-[var(--hero-primary-fg)] shadow-[var(--hero-primary-shadow)] ring-1 ring-[var(--hero-border)] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent-sky-rgb),0.65)]"
              >
                Book Strategy Call
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="https://dira-os.vickinstechnologies.com/"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-[var(--hero-border)] bg-[var(--hero-chip-bg)] px-6 py-3 text-sm font-semibold text-[var(--hero-ink)] backdrop-blur-xl transition hover:bg-[var(--hero-chip-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent-sky-rgb),0.65)]"
              >
                Explore Dira OS
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8 lg:mt-2 flex flex-wrap items-center gap-2"
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
              className="mt-10 lg:mt-2 flex items-center justify-between gap-6 border-t border-[var(--hero-border)] pt-6 lg:pt-3"
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

            <p className="mt-4 lg:mt-1 text-xs text-[var(--hero-muted)] max-w-xl">
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
            <div className="hero-delivery-panel relative overflow-hidden rounded-[28px] border border-[var(--hero-border)] bg-[var(--hero-panel-bg)] p-6 shadow-[var(--hero-panel-shadow)] backdrop-blur-2xl">
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
