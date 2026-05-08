import { motion } from "framer-motion";
import { ChartBarIcon, ChatBubbleLeftRightIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const proofMetrics = [
  { label: "Cycle time", example: "e.g. -35% time-to-release" },
  { label: "Operational load", example: "e.g. -50% manual processing" },
  { label: "Performance", example: "e.g. LCP < 2.5s on key flows" },
  { label: "Reliability", example: "e.g. uptime / error budget targets" },
  { label: "Security posture", example: "e.g. audit trails + access reviews" },
  { label: "Adoption", example: "e.g. +20% weekly active users" },
];

const caseStudyPlaceholders = [
  {
    title: "Confidential client — Operations portal modernization",
    tags: ["Architecture", "RBAC", "Integrations"],
    challenge: "Fragmented workflows, manual reporting, and limited auditability across teams.",
    approach: ["Domain modeling + phased rollout", "Role-based access + audit logs", "Automation for reporting and approvals"],
    outcomes: ["Example: -40% manual processing", "Example: -30% faster onboarding", "Example: improved audit readiness"],
  },
  {
    title: "High-growth business — Customer self-service platform",
    tags: ["Web", "Performance", "Analytics"],
    challenge: "Slow pages, inconsistent UX, and low conversion on key journeys.",
    approach: ["Design system + UX cleanup", "Performance budgets + monitoring", "Event tracking + KPI dashboards"],
    outcomes: ["Example: LCP < 2.5s on top pages", "Example: +15% conversion rate", "Example: fewer support tickets"],
  },
  {
    title: "Institution — Secure access + internal workflows",
    tags: ["Security", "Compliance-ready", "Automation"],
    challenge: "Access control gaps and heavy admin load for routine internal processes.",
    approach: ["Secure auth patterns + reviews", "Workflow automation with approvals", "Documentation + handover"],
    outcomes: ["Example: reduced access incidents", "Example: faster approvals", "Example: clearer audit trails"],
  },
];

const testimonialPlaceholders = [
  {
    quote:
      "Vickins delivered a clean, maintainable platform with clear documentation and a reliable delivery cadence.",
    author: "Head of Product (Placeholder)",
    company: "Enterprise client (NDA)",
  },
  {
    quote:
      "Strong engineering leadership — architecture decisions were clear, pragmatic, and aligned to our risk profile.",
    author: "CTO (Placeholder)",
    company: "Growth-stage business",
  },
];

export default function ProofSection() {
  return (
    <motion.section
      id="proof"
      className="py-8 sm:py-10 lg:py-12 scroll-mt-[96px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
        <div className="max-w-2xl">
          <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Social Proof</p>
          <h2 className="text-2xl sm:text-3xl font-semibold mt-3">Proof, not promises.</h2>
          <p className="text-[15px] text-[var(--foreground)]/78 mt-3">
            We share NDA-friendly case studies and metrics where possible. Swap the placeholder examples below with
            verified results as you publish new work.
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/60">
          Metrics-focused storytelling
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-8">
        <div className="grid grid-cols-1 gap-4 sm:gap-5">
          {caseStudyPlaceholders.map((item) => (
            <div key={item.title} className="glass-panel p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-[var(--foreground)]/70 mt-2">{item.challenge}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface-muted)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--foreground)]/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[var(--foreground)]/60">
                    <ShieldCheckIcon className="h-4 w-4 text-[var(--accent)]" />
                    Approach
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--foreground)]/75">
                    {item.approach.map((line) => (
                      <li key={line} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]/70" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[var(--foreground)]/60">
                    <ChartBarIcon className="h-4 w-4 text-[var(--accent)]" />
                    Outcomes
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--foreground)]/75">
                    {item.outcomes.map((line) => (
                      <li key={line} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]/70" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-6 sm:p-7 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--foreground)]/60">Metrics</p>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">Examples</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold mt-3">What enterprise teams care about.</h3>
            <p className="text-[15px] text-[var(--foreground)]/75 mt-3">
              Use this as a checklist for what to capture in case studies, quarterly reviews, and exec updates.
            </p>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {proofMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-4"
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--foreground)]/60">
                    {metric.label}
                  </p>
                  <p className="text-sm text-[var(--foreground)]/75 mt-2">{metric.example}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-6 sm:p-7 shadow-[var(--shadow-tight)]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[var(--foreground)]/60">
              <ChatBubbleLeftRightIcon className="h-4 w-4 text-[var(--accent)]" />
              Testimonials (Placeholders)
            </div>
            <div className="mt-4 space-y-3">
              {testimonialPlaceholders.map((t) => (
                <div key={t.author} className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-4">
                  <p className="text-sm text-[var(--foreground)]/80 leading-relaxed">“{t.quote}”</p>
                  <p className="mt-3 text-xs text-[var(--foreground)]/60">
                    {t.author} · <span className="font-medium">{t.company}</span>
                  </p>
                </div>
              ))}
            </div>
            <a
              href="#contact"
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[var(--button-bg)] px-5 py-2.5 text-xs uppercase tracking-[0.24em] font-semibold text-white shadow-[var(--shadow-tight)]"
            >
              Ask for references
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

