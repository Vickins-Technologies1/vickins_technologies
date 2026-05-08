import { motion } from "framer-motion";
import {
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  PencilSquareIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

const processSteps = [
  {
    number: "01",
    title: "Discovery & Alignment",
    description: "We align on goals, constraints, stakeholders, and success metrics — before writing code.",
    deliverable: "Brief + plan",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    number: "02",
    title: "Architecture & Design",
    description: "We map flows, define the architecture, and design a UI system your teams can extend.",
    deliverable: "Arch + prototype",
    icon: PencilSquareIcon,
  },
  {
    number: "03",
    title: "Build & Validate",
    description: "We build, test, and review. Performance, security, and maintainability are non-negotiable.",
    deliverable: "Build + QA",
    icon: CodeBracketIcon,
  },
  {
    number: "04",
    title: "Launch & Operate",
    description: "We launch, monitor, and keep improving — with documentation, runbooks, and support options.",
    deliverable: "Deploy + operate",
    icon: RocketLaunchIcon,
  },
];

export default function ProcessSection() {
  return (
    <motion.section
      id="process"
      className="py-8 sm:py-10 lg:py-12 scroll-mt-[96px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Process</p>
            <h2 className="text-2xl sm:text-3xl font-semibold mt-3">How we ship.</h2>
            <p className="text-[15px] text-[var(--foreground)]/78 mt-3">
              Clear outputs, senior-led delivery, and weekly updates — built for fast execution and safe scale.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/60">
            <SparklesIcon className="h-4 w-4" />
            Studio Workflow
          </div>
        </div>

        <div className="glass-panel p-5 sm:p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.14),_transparent_60%)]" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-6 lg:gap-8">
            <div className="relative">
              <div className="absolute left-[18px] top-2 bottom-2 w-px bg-[var(--glass-border-strong)]" />
              <div className="space-y-5">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    className="grid grid-cols-[44px_1fr] gap-3"
                  >
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface-strong)] text-[var(--accent-2)] text-sm font-semibold">
                      {step.number}
                    </div>
                    <div className="pt-1">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <step.icon className="h-4 w-4 text-[var(--accent)]" />
                          <h3 className="text-base sm:text-lg font-semibold">{step.title}</h3>
                        </div>
                        <span className="hidden sm:inline-flex rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/65">
                          {step.deliverable}
                        </span>
                      </div>
                      <p className="text-[15px] text-[var(--foreground)]/75 mt-2">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-5">
              <div className="flex items-center gap-2">
                <SparklesIcon className="h-4 w-4 text-[var(--accent)]" />
                <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--foreground)]/60">
                  What you get
                </p>
              </div>
              <ul className="mt-4 space-y-2 text-[15px] text-[var(--foreground)]/75">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]/70" />
                  Clear scope, timeline, milestones, and risk notes
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]/70" />
                  Architecture choices documented and reviewable
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]/70" />
                  Performance, security, and QA baked into delivery
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]/70" />
                  Handover docs, runbooks, and support options after launch
                </li>
              </ul>
              <a
                href="#contact"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[var(--button-bg)] px-5 py-2.5 text-xs uppercase tracking-[0.24em] font-semibold text-white shadow-[var(--shadow-tight)]"
              >
                Book strategy call
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
