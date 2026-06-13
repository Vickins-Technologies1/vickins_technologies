"use client";

import { ArrowRightIcon, ShieldCheckIcon, CurrencyDollarIcon, ClockIcon, SignalIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const tiers = [
  {
    name: "Starter",
    price: "From USD 15",
    credits: "15 proxy credits",
    features: ["HTTP + SOCKS5 access", "Dynamic credentials", "Email support"],
    accent: "rgba(var(--accent-sky-rgb),0.85)",
  },
  {
    name: "Growth",
    price: "From USD 45",
    credits: "60 proxy credits",
    features: ["Priority support", "Usage analytics", "Auto top-up workflows"],
    accent: "rgba(var(--accent-rgb),0.85)",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    credits: "Dedicated cluster",
    features: ["Role-based admin", "Webhook crediting", "SLA-backed onboarding"],
    accent: "rgba(var(--accent-2-rgb),0.9)",
  },
] as const;

const productFacts = [
  {
    icon: ShieldCheckIcon,
    title: "Secure access control",
    description: "JWT auth, refresh sessions, role-based admin tooling, and audit-friendly account states.",
  },
  {
    icon: SignalIcon,
    title: "Bandwidth-aware billing",
    description: "Usage snapshots compute deltas efficiently and convert them into prepaid credit deductions.",
  },
  {
    icon: CurrencyDollarIcon,
    title: "Flutterwave payments",
    description: "Prepaid credit top-ups across NGN, KES, GHS, ZAR, USD, and other Flutterwave-supported currencies.",
  },
  {
    icon: ClockIcon,
    title: "Fast webhook crediting",
    description: "Verified webhooks trigger instant crediting, so users see balance updates without delay.",
  },
] as const;

export default function VGuardSection() {
  return (
    <motion.section
      id="v-guard"
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
                V-Guard proxy management for teams that need control, credits, and clean operations.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--foreground)]/76">
                A production-grade proxy panel for HTTP and SOCKS5 traffic, dynamic user credentials, prepaid billing,
                automatic credit deduction, and real-time webhook crediting.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://v-guard.vickinstechnologies.com"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--button-bg)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_50px_rgba(var(--accent-rgb),0.22)] transition hover:-translate-y-0.5"
              >
                Get Started
                <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border-strong)] bg-[var(--glass-surface)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] backdrop-blur-xl transition hover:bg-[var(--glass-surface-strong)]"
              >
                Talk to us
              </a>
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="glass-panel p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {productFacts.map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <div
                      key={fact.title}
                      className="rounded-3xl border border-[var(--glass-border-strong)] bg-[rgba(255,255,255,0.42)] p-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(var(--accent-sky-rgb),0.12)] text-[var(--accent)]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <p className="font-semibold">{fact.title}</p>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]/72">{fact.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-[28px] border p-5 backdrop-blur-2xl ${
                    "featured" in tier
                      ? "border-[rgba(var(--accent-rgb),0.35)] bg-[rgba(9,18,40,0.74)] text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]"
                      : "border-[var(--glass-border-strong)] bg-[rgba(255,255,255,0.52)] text-[var(--foreground)] shadow-[0_18px_50px_rgba(15,23,42,0.1)]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.34em]" style={{ color: tier.accent }}>
                        {tier.name}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold">{tier.price}</h3>
                    </div>
                    <div
                      className="h-12 w-12 rounded-2xl border"
                      style={{
                        borderColor: tier.accent,
                        background: `linear-gradient(135deg, ${tier.accent}, rgba(255,255,255,0.08))`,
                      }}
                    />
                  </div>

                  <p className={`mt-3 text-sm ${"featured" in tier ? "text-white/74" : "text-[var(--foreground)]/72"}`}>
                    {tier.credits}
                  </p>

                  <div className="mt-4 space-y-2">
                    {tier.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-[rgba(var(--accent-sky-rgb),0.9)]" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
