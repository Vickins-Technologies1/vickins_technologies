import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { SparklesIcon, ShieldCheckIcon, ChartBarIcon } from "@heroicons/react/24/outline";

function AnimatedCounter({
  target,
  label,
  delay = 0,
}: {
  target: number;
  label: string;
  delay?: number;
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
      className="rounded-2xl border border-white/40 bg-white/60 px-4 py-3 shadow-[var(--shadow-tight)]"
    >
      <span className="text-xl font-semibold text-[var(--button-bg)]">{count}+</span>
      <p className="text-xs sm:text-sm text-[var(--foreground)]/70 mt-1">{label}</p>
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <motion.section
      id="about"
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
              About Vickins
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-3">
              A premium technology studio built for modern growth.
            </h2>
            <p className="text-sm sm:text-base text-[var(--foreground)]/80 mt-4">
              We align strategy, design, and engineering to craft platforms that look exceptional and perform at scale.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/60">
            <SparklesIcon className="h-4 w-4" />
            Studio Snapshot
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/40 bg-gradient-to-br from-white/70 via-white/40 to-white/10 p-6 sm:p-7 shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-3">
                <SparklesIcon className="h-5 w-5 text-[var(--button-bg)]" />
                <p className="text-xs uppercase tracking-[0.32em] text-[var(--foreground)]/60">
                  Who We Are
                </p>
              </div>
              <p className="text-sm sm:text-base text-[var(--foreground)]/80 mt-4">
                We are a multidisciplinary team delivering high-impact digital products, automation systems, and premium brand experiences for ambitious organizations in Kenya and beyond.
              </p>
              <p className="text-sm sm:text-base text-[var(--foreground)]/80 mt-4">
                Our process blends rigorous engineering with elegant UI/UX, ensuring every engagement is measurable, secure, and future-ready.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Strategy", "Design Systems", "Engineering", "Growth"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/50 bg-white/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-3xl border border-white/40 bg-white/60 p-5 shadow-[var(--shadow-tight)]">
                <ShieldCheckIcon className="h-5 w-5 text-[var(--button-bg)]" />
                <h3 className="text-sm font-semibold mt-3">Security-led Delivery</h3>
                <p className="text-xs text-[var(--foreground)]/70 mt-2">
                  Privacy-first builds with resilience and compliance in mind.
                </p>
              </div>
              <div className="rounded-3xl border border-white/40 bg-white/60 p-5 shadow-[var(--shadow-tight)]">
                <ChartBarIcon className="h-5 w-5 text-[var(--button-bg)]" />
                <h3 className="text-sm font-semibold mt-3">Measured Outcomes</h3>
                <p className="text-xs text-[var(--foreground)]/70 mt-2">
                  Analytics and insights that inform continuous optimization.
                </p>
              </div>
              <div className="rounded-3xl border border-white/40 bg-white/60 p-5 shadow-[var(--shadow-tight)]">
                <SparklesIcon className="h-5 w-5 text-[var(--button-bg)]" />
                <h3 className="text-sm font-semibold mt-3">Premium Craft</h3>
                <p className="text-xs text-[var(--foreground)]/70 mt-2">
                  Thoughtful details and elevated visual storytelling.
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
              <AnimatedCounter target={40} label="Projects Completed" />
              <AnimatedCounter target={25} label="Happy Clients" delay={0.2} />
              <AnimatedCounter target={4} label="Years of Excellence" delay={0.4} />
              <AnimatedCounter target={400} label="Active Users" delay={0.6} />
              <AnimatedCounter target={92} label="Retention Rate %" delay={0.8} />
              <AnimatedCounter target={12} label="Industries Served" delay={1.0} />
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--button-bg)] px-5 py-2.5 text-xs uppercase tracking-[0.22em] font-semibold text-white"
            >
              Schedule a Consultation
              <SparklesIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
