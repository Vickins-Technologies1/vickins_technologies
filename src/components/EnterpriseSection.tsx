import { motion } from "framer-motion";
import { ShieldCheckIcon, CpuChipIcon, ChartBarIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const enterprisePillars = [
  {
    title: "Architecture you can scale",
    description: "Clear boundaries, sane defaults, and decisions documented for long-term ownership.",
    icon: ChartBarIcon,
  },
  {
    title: "Security + compliance alignment",
    description: "Threat-aware patterns, access control, audit trails, and data handling mapped to your requirements.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Operational readiness",
    description: "CI/CD, monitoring, and release practices built for reliability — not heroic launches.",
    icon: CpuChipIcon,
  },
  {
    title: "Documentation + handover",
    description: "Runbooks, diagrams, and onboarding so internal teams can confidently take over.",
    icon: DocumentTextIcon,
  },
];

export default function EnterpriseSection() {
  return (
    <motion.section
      id="enterprise"
      className="py-8 sm:py-10 lg:py-12 scroll-mt-[96px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
        <div className="max-w-2xl">
          <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Enterprise</p>
          <h2 className="text-2xl sm:text-3xl font-semibold mt-3">A delivery model built for enterprise teams.</h2>
          <p className="text-[15px] text-[var(--foreground)]/78 mt-3">
            For high-growth businesses and institutions that need reliability, integrations, and long-term
            maintainability — not just a quick build.
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/60">
          Procurement-ready delivery
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {enterprisePillars.map((pillar) => (
            <div key={pillar.title} className="glass-panel p-5 sm:p-6">
              <pillar.icon className="h-7 w-7 text-[var(--accent)] mb-3" />
              <h3 className="text-base sm:text-lg font-semibold">{pillar.title}</h3>
              <p className="text-sm text-[var(--foreground)]/70 mt-2">{pillar.description}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-6 sm:p-7 shadow-[var(--shadow-soft)]">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--foreground)]/60">Engagements</p>
            <h3 className="text-xl sm:text-2xl font-semibold mt-3">Build, modernize, or integrate.</h3>
            <p className="text-[15px] text-[var(--foreground)]/75 mt-3">
              We plug into your team as a strategic partner — from discovery to delivery to ongoing support.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["New platforms", "Modernization", "Integrations", "Automation + AI", "Support plans"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface)] px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/70"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-6 sm:p-7 shadow-[var(--shadow-tight)]">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--foreground)]/60">How we run delivery</p>
            <ul className="mt-4 space-y-2 text-[15px] text-[var(--foreground)]/75">
              {[
                "NDA-friendly engagements and clear scope control",
                "Milestone-based delivery with review checkpoints",
                "Documentation and handover included by default",
                "Support options with defined response targets (by agreement)",
              ].map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]/70" />
                  {line}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[var(--button-bg)] px-5 py-2.5 text-xs uppercase tracking-[0.24em] font-semibold text-white shadow-[var(--shadow-tight)]"
            >
              Start an enterprise conversation
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

