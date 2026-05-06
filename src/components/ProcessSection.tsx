import { motion } from "framer-motion";
import { SparklesIcon, ChatBubbleLeftRightIcon, PencilSquareIcon, CodeBracketIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";

export default function ProcessSection() {
  const processSteps = [
    {
      number: "01",
      title: "Discovery",
      description: "We clarify scope, users, constraints, and what success looks like.",
      icon: ChatBubbleLeftRightIcon,
    },
    {
      number: "02",
      title: "Experience Design",
      description: "We map flows, design screens, and lock a clean UI system.",
      icon: PencilSquareIcon,
    },
    {
      number: "03",
      title: "Engineering",
      description: "We build, test, and review. Performance and security are not optional.",
      icon: CodeBracketIcon,
    },
    {
      number: "04",
      title: "Launch + Growth",
      description: "We launch, monitor, fix issues fast, and keep improving.",
      icon: RocketLaunchIcon,
    },
  ];

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
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Process</p>
            <h2 className="text-2xl sm:text-3xl font-semibold mt-3">How we ship.</h2>
            <p className="text-[15px] text-[var(--foreground)]/78 mt-3">
              Simple steps. Clear outputs. Weekly updates.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/60">
            <SparklesIcon className="h-4 w-4" />
            Studio Workflow
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6 lg:gap-8">
          <div className="glass-panel p-5 sm:p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(240,176,16,0.14),_transparent_60%)]" />
            <div className="relative z-10 space-y-6">
              {processSteps.map((step) => (
                <div key={step.title} className="flex items-start gap-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[var(--glass-surface)] border border-[var(--glass-border)] text-[var(--accent)] text-sm font-semibold">
                    {step.number}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <step.icon className="h-4 w-4 text-[var(--accent)]" />
                      <h3 className="text-base sm:text-lg font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-sm text-[var(--foreground)]/70 mt-2">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-5 shadow-[var(--shadow-tight)] backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--foreground)]/60">Step {step.number}</p>
                  <step.icon className="h-4 w-4 text-[var(--accent)]" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mt-3">{step.title}</h3>
                <p className="text-sm text-[var(--foreground)]/70 mt-3">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
