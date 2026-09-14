"use client";

import Image from "next/image";
import { ArrowRightIcon, BuildingStorefrontIcon, ChartBarIcon, CloudArrowUpIcon, DevicePhoneMobileIcon, QueueListIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const capabilities = [
  [DevicePhoneMobileIcon, "POS"],
  [QueueListIcon, "Inventory"],
  [ChartBarIcon, "Finance"],
  [BuildingStorefrontIcon, "Teams & branches"],
  [Squares2X2Icon, "Reports"],
  [CloudArrowUpIcon, "Offline-first workflows"],
] as const;

export default function DiraOSSection() {
  return (
    <motion.section id="dira-os" className="py-10 sm:py-12 lg:py-16 scroll-mt-[96px]" initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.7 }}>
      <div className="relative overflow-hidden rounded-[38px] border border-[var(--glass-border-strong)] bg-[var(--card-bg)] shadow-[var(--shadow-soft)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(var(--accent-sky-rgb),0.18),transparent_38%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(var(--accent-rgb),0.15),transparent_34%)]" />
        <div className="relative z-10 grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Vickins Technologies · Flagship Product</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">Dira OS — Business Operating System</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--foreground)]/78">Run sales, inventory, finance, teams and branches from one connected operating system — even when connectivity is unreliable.</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--foreground)]/68">Built by Vickins Technologies, Dira OS brings the essential workflows of everyday business operations into one practical, modern system.</p>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {capabilities.map(([Icon, label]) => (
                <div key={label} className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-3">
                  <Icon className="h-5 w-5 text-[var(--accent)]" />
                  <p className="mt-3 text-sm font-semibold">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="https://dira-os.vickinstechnologies.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--button-bg)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_50px_rgba(var(--accent-rgb),0.22)] transition hover:-translate-y-0.5">
                Explore Dira OS <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border-strong)] bg-[var(--glass-surface)] px-5 py-3 text-sm font-semibold transition hover:bg-[var(--glass-surface-strong)]">Book Strategy Call</a>
            </div>
          </div>

          <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[28px] border border-[var(--glass-border-strong)] bg-[linear-gradient(145deg,rgba(7,15,32,0.98),rgba(11,41,83,0.9))] p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(var(--accent-sky-rgb),0.18),transparent_58%)]" />
            <div className="relative w-full max-w-[300px] rounded-[28px] border border-white/15 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-xl">
              <Image src="/products/dira-os-logo.png" alt="Dira OS business operating system logo" width={160} height={160} className="mx-auto h-28 w-28 object-contain" />
              <div className="mt-5 text-center">
                <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-200/70">Built for daily operations</p>
                <p className="mt-2 text-xl font-semibold text-white">Work continues.</p>
                <p className="mt-2 text-sm leading-relaxed text-white/65">Sync when connectivity returns.</p>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-[0.16em] text-white/55">
                <span className="rounded-xl border border-white/10 bg-white/[0.05] px-2 py-3">Sales</span><span className="rounded-xl border border-white/10 bg-white/[0.05] px-2 py-3">Stock</span><span className="rounded-xl border border-white/10 bg-white/[0.05] px-2 py-3">Reports</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
