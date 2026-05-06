"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRightIcon, ShieldCheckIcon, CpuChipIcon } from "@heroicons/react/24/outline";
import AnimatedNumber from "./marketing/AnimatedNumber";

const highlights = [
  "Clear scope + milestones",
  "Design system + UI polish",
  "Full-stack build (web + mobile)",
  "Automation where it saves time",
  "Security baked in",
];

const stats = [
  { label: "Projects shipped", value: 40, suffix: "+" },
  { label: "Typical MVP", value: 3, prefix: "1–", suffix: " wks" },
  { label: "Client retention", value: 99, suffix: "%" },
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
      className="relative min-h-[78vh] flex items-center overflow-hidden text-white"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#030815] via-[#020612] to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,144,224,0.22),_transparent_58%)] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,_rgba(240,176,16,0.16),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_32%,_rgba(31,109,255,0.22),_transparent_56%)]" />
        <motion.div
          className="absolute inset-0 opacity-35"
          style={{
            y: gridY,
            backgroundImage:
              "linear-gradient(rgba(226,232,240,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(226,232,240,0.07) 1px, transparent 1px)",
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
          background: "rgba(31,109,255,0.35)",
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
          background: "rgba(240,176,16,0.26)",
        }}
      />

      <div className="relative z-10 w-full px-5 sm:px-6 lg:px-8 max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-7 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs uppercase tracking-[0.28em] text-white/70">
            Kenyan tech studio
            <span className="h-1 w-6 rounded-full bg-[var(--accent)]/70" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-5 leading-[1.06]">
            Build it right.
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70"> Ship it fast.</span>
          </h1>
          <p className="text-[15px] sm:text-base text-white/78 max-w-2xl mt-4">
            We design and build web platforms, mobile apps, and internal tools. Clear scope, tight timelines, and solid engineering.
          </p>
          <p className="text-sm text-white/62 max-w-2xl mt-3">
            Need physical security too?{" "}
            <Link href="/vickins-security" className="text-white/85 underline underline-offset-4 hover:text-white">
              Vickins Security
            </Link>
            {" "}covers CCTV, access control, alarms, electric fence and more.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {["Strategy", "Design", "Engineering", "Automation", "Security"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-white/72"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-2.5">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-full bg-[var(--accent)] text-[#0b1220] font-semibold shadow-[0_18px_46px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-0.5"
            >
              Start a project
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="group inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-full border border-white/18 text-white/86 font-semibold backdrop-blur-md hover:bg-white/7 transition-all duration-500"
            >
              Services
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-full border border-white/18 text-white/86 font-semibold backdrop-blur-md hover:bg-white/7 transition-all duration-500"
            >
              See work
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/vickins-security"
              className="group inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-full border border-[rgba(240,176,16,0.35)] text-[var(--accent)] font-semibold backdrop-blur-md hover:bg-[rgba(240,176,16,0.10)] transition-all duration-500"
            >
              Security
              <ShieldCheckIcon className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="shimmer-line rounded-2xl border border-white/12 bg-white/5 px-4 py-3"
              >
                <div className="text-xl font-semibold text-white">
                  {stat.prefix ?? ""}
                  <AnimatedNumber to={stat.value} />
                  {stat.suffix ?? ""}
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 mt-1">
                  {stat.label}
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
            Calm execution. Strong delivery.
          </h2>
          <p className="text-[15px] text-[var(--foreground)]/78 mt-3">
            We keep the build tight: scope, timelines, and weekly updates. You always know what’s shipping next.
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
                Engineering Excellence
              </div>
              <p className="text-xs text-[var(--foreground)]/70 mt-2">
                Performance budgets, clean architecture, and security checks that actually ship.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <ShieldCheckIcon className="w-4 h-4 text-[var(--accent)]" />
                Design Polish
              </div>
              <p className="text-xs text-[var(--foreground)]/70 mt-2">
                Compact UI, clean typography, and a system you can extend without breaking consistency.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
