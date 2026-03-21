import { motion } from "framer-motion";
import { SparklesIcon, ChatBubbleLeftRightIcon, PencilSquareIcon, CodeBracketIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";

export default function ProcessSection() {
  const processSteps = [
    {
      number: "01",
      title: "Discovery",
      description: "We align on goals, stakeholders, and success metrics to frame the engagement.",
      icon: ChatBubbleLeftRightIcon,
    },
    {
      number: "02",
      title: "Experience Design",
      description: "We define flows, craft UI systems, and deliver premium prototypes.",
      icon: PencilSquareIcon,
    },
    {
      number: "03",
      title: "Engineering",
      description: "We ship scalable builds with performance, QA, and security baked in.",
      icon: CodeBracketIcon,
    },
    {
      number: "04",
      title: "Launch + Growth",
      description: "We launch, monitor, and optimize with analytics and support.",
      icon: RocketLaunchIcon,
    },
  ];

  return (
    <motion.section
      id="process"
      className="py-10 sm:py-14 lg:py-16 mt-16 sm:mt-20 scroll-mt-[80px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-[var(--button-bg)] uppercase tracking-[0.32em] text-xs sm:text-sm">
              Our Process
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-3">
              A premium delivery system built for clarity and speed.
            </h2>
            <p className="text-sm sm:text-base text-[var(--foreground)]/80 mt-4">
              We structure each engagement to move from insight to launch with precision and accountability.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/60">
            <SparklesIcon className="h-4 w-4" />
            Studio Workflow
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6 lg:gap-8">
          <div className="rounded-3xl border border-white/40 bg-gradient-to-br from-white/70 via-white/40 to-white/10 p-6 sm:p-7 shadow-[var(--shadow-soft)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_60%)]" />
            <div className="relative z-10 space-y-6">
              {processSteps.map((step) => (
                <div key={step.title} className="flex items-start gap-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/70 border border-white/50 text-[var(--button-bg)] text-sm font-semibold">
                    {step.number}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <step.icon className="h-4 w-4 text-[var(--button-bg)]" />
                      <h3 className="text-base sm:text-lg font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-sm text-[var(--foreground)]/70 mt-2">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-3xl border border-white/40 bg-white/60 p-5 shadow-[var(--shadow-tight)] backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--foreground)]/60">Step {step.number}</p>
                  <step.icon className="h-4 w-4 text-[var(--button-bg)]" />
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
