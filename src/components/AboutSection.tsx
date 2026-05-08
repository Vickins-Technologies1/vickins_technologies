import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { SparklesIcon, ShieldCheckIcon, ChartBarIcon } from "@heroicons/react/24/outline";

function AnimatedCounter({
  target,
  label,
  delay = 0,
  prefix,
  suffix,
}: {
  target: number;
  label: string;
  delay?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / target));
    const timeout = setTimeout(() => {
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= target) {
          clearInterval(timer);
        }
      }, stepTime);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [target, delay]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-surface)] px-4 py-3 shadow-[var(--shadow-tight)]"
    >
      <span className="text-xl font-semibold text-[var(--accent)]">
        {prefix ?? ""}
        {count}
        {suffix ?? ""}
      </span>
      <p className="text-xs sm:text-sm text-[var(--foreground)]/70 mt-1">{label}</p>
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <motion.section
      id="about"
      className="py-8 sm:py-10 lg:py-12 scroll-mt-[96px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">About</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-3">
              A Nairobi-based technology partner for long-term systems.
            </h2>
            <p className="text-[15px] text-[var(--foreground)]/78 mt-3">
              We help teams modernize, integrate, and scale — with senior-led delivery, clean architecture, and
              documentation your engineers will thank you for.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/60">
            <SparklesIcon className="h-4 w-4" />
            Studio Snapshot
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10">
          <div className="space-y-6">
            <div className="glass-panel p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <SparklesIcon className="h-5 w-5 text-[var(--accent)]" />
                <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--foreground)]/60">Who we are</p>
              </div>
              <p className="text-[15px] text-[var(--foreground)]/78 mt-4">
                We build web and mobile products for teams that want speed without shortcuts — and quality that lasts.
              </p>
              <p className="text-[15px] text-[var(--foreground)]/78 mt-3">
                You get clear milestones, clean UI systems, and engineering that is maintainable, testable, and
                operationally sound.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Architecture", "Design systems", "Engineering", "Security", "Support"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface-muted)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-5 shadow-[var(--shadow-tight)]">
                <ShieldCheckIcon className="h-5 w-5 text-[var(--accent)]" />
                <h3 className="text-sm font-semibold mt-3">Security & compliance</h3>
                <p className="text-xs text-[var(--foreground)]/70 mt-2">
                  Secure-by-design patterns, privacy-aware data handling, and review baked into delivery.
                </p>
              </div>
              <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-5 shadow-[var(--shadow-tight)]">
                <ChartBarIcon className="h-5 w-5 text-[var(--accent)]" />
                <h3 className="text-sm font-semibold mt-3">Outcome-driven</h3>
                <p className="text-xs text-[var(--foreground)]/70 mt-2">
                  KPIs, analytics, and reporting wired up so your investment is measurable.
                </p>
              </div>
              <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-5 shadow-[var(--shadow-tight)]">
                <SparklesIcon className="h-5 w-5 text-[var(--accent)]" />
                <h3 className="text-sm font-semibold mt-3">Clean handover</h3>
                <p className="text-xs text-[var(--foreground)]/70 mt-2">
                  Documentation, runbooks, and a codebase your team can confidently own.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <Image
                src="/pnt.png"
                alt="Vickins Technologies"
                width={520}
                height={340}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <AnimatedCounter target={40} label="Platforms delivered" suffix="+" />
              <AnimatedCounter target={25} label="Client teams supported" delay={0.2} suffix="+" />
              <AnimatedCounter target={4} label="Years operating" delay={0.4} suffix="+" />
              <AnimatedCounter target={400} label="Monthly active users" delay={0.6} suffix="+" />
              <AnimatedCounter target={92} label="Repeat engagements" delay={0.8} suffix="%" />
              <AnimatedCounter target={12} label="Industries served" delay={1.0} suffix="+" />
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-xs uppercase tracking-[0.22em] font-semibold text-[#0b1220]"
            >
              Talk to our team
              <SparklesIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
