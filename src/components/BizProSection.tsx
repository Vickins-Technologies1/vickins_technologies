"use client";

import Image from "next/image";
import { ArrowRightIcon, BuildingStorefrontIcon, ChartBarIcon, CloudArrowUpIcon, DevicePhoneMobileIcon, QueueListIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const capabilityCards = [
  {
    icon: DevicePhoneMobileIcon,
    title: "POS",
    description: "Fast checkout flows that keep counters moving and staff focused on customers.",
  },
  {
    icon: QueueListIcon,
    title: "Inventory Management",
    description: "Track stock, movement, and replenishment with clear operational visibility.",
  },
  {
    icon: ChartBarIcon,
    title: "Finance + Reporting",
    description: "See the numbers that matter and turn day-to-day activity into useful reporting.",
  },
  {
    icon: BuildingStorefrontIcon,
    title: "Team + Branch Management",
    description: "Coordinate permissions, users, and branch operations from one platform.",
  },
  {
    icon: Squares2X2Icon,
    title: "Business OS",
    description: "Bring sales, stock, finance, and operations together in one operating layer.",
  },
  {
    icon: CloudArrowUpIcon,
    title: "Offline-first",
    description: "Keep working even when connectivity drops, then sync when it returns.",
  },
] as const;

export default function BizProSection() {
  return (
    <motion.section
      id="bizpro"
      className="py-10 sm:py-12 lg:py-16 scroll-mt-[96px]"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7 }}
    >
      <div className="relative overflow-hidden rounded-[38px] border border-[var(--glass-border-strong)] bg-[linear-gradient(160deg,rgba(var(--accent-2-rgb),0.16),rgba(255,255,255,0.62))] shadow-[var(--shadow-soft)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(var(--accent-sky-rgb),0.18),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(var(--accent-rgb),0.16),transparent_38%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),transparent_40%,rgba(255,255,255,0.08))]" />

        <div className="relative z-10 p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Featured product</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                BizPro business operating system for teams that need sales, stock, finance, and branch control in one
                place.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--foreground)]/76">
                BizPro is an all-in-one Business OS that brings POS, inventory, finance, reporting, team management,
                and branch operations together in one powerful platform, with offline-first functionality that keeps
                businesses running when the internet goes down.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://bizpro.vickinstechnologies.com/"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--button-bg)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_50px_rgba(var(--accent-rgb),0.22)] transition hover:-translate-y-0.5"
              >
                Explore BizPro
                <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border-strong)] bg-[var(--glass-surface)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] backdrop-blur-xl transition hover:bg-[var(--glass-surface-strong)]"
              >
                Book Strategy Call
              </a>
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="glass-panel p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-3 rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface)] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
                  <Image
                    src="/projects/bz.png"
                    alt="BizPro logo mark"
                    width={28}
                    height={28}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  BizPro
                </div>
                <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/60">
                  Built by Vickins Technologies
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold mt-5">
                Run your business from one platform, even when connectivity drops.
              </h3>
              <p className="text-[15px] text-[var(--foreground)]/78 mt-3 max-w-2xl">
                Manage operations with a practical, production-ready system built for modern businesses that need
                reliable day-to-day control and clean workflows.
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {capabilityCards.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(var(--accent-sky-rgb),0.12)] text-[var(--accent)]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <p className="font-semibold">{item.title}</p>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]/75">{item.description}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {["Offline-first", "Sync when connectivity returns", "Next.js", "TypeScript"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface-muted)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[28px] border border-[var(--glass-border-strong)] bg-[rgba(255,255,255,0.52)] p-5 backdrop-blur-2xl shadow-[0_18px_50px_rgba(15,23,42,0.1)]">
                <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Platform snapshot</p>
                <h3 className="mt-3 text-xl font-semibold">Business operations, simplified.</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]/72">
                  BizPro is positioned as a Vickins-built product, not a brochure site. It is meant to support real
                  sales, inventory, finance, and branch workflows.
                </p>
              </div>

              <div className="rounded-[28px] border border-[var(--glass-border-strong)] bg-[rgba(255,255,255,0.52)] p-5 backdrop-blur-2xl shadow-[0_18px_50px_rgba(15,23,42,0.1)]">
                <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Key outcomes</p>
                <div className="mt-4 space-y-3">
                  {[
                    "One platform for sales, stock, and reporting",
                    "Clear team and branch operations",
                    "Offline-first workflows with reconnect sync",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-surface)] px-4 py-3 text-sm text-[var(--foreground)]/75"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-[var(--glass-border-strong)] bg-[rgba(255,255,255,0.52)] p-5 backdrop-blur-2xl shadow-[0_18px_50px_rgba(15,23,42,0.1)]">
                <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Explore</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="https://bizpro.vickinstechnologies.com/"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--button-bg)] px-4 py-2 text-xs font-semibold text-white"
                  >
                    Open BizPro
                    <ArrowRightIcon className="h-4 w-4" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface)] px-4 py-2 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--glass-surface-strong)] transition"
                  >
                    Book Strategy Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
