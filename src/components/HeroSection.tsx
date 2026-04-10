import { motion } from "framer-motion";
import { ArrowRightIcon, SparklesIcon, ShieldCheckIcon, CpuChipIcon } from "@heroicons/react/24/outline";

const highlights = [
  "Product strategy & discovery",
  "UI/UX and brand systems",
  "Full-stack engineering",
  "Automation and AI workflows",
  "Security-first delivery",
];

const stats = [
  { label: "Projects Delivered", value: "40+" },
  { label: "Avg. Launch Time", value: "1-3 weeks" },
  { label: "Client Retention", value: "99%" },
];

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.1 }}
      id="home"
      className="relative min-h-[85vh] flex items-center overflow-hidden text-white"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1220] via-[#0f1b35] to-[#0b1220]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_transparent_55%)] opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(45,212,191,0.25),_transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,_rgba(99,102,241,0.35),_transparent_50%)]" />
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      </div>

      <div className="glow-orb float-slow" style={{ top: "-8%", left: "-5%", width: "380px", height: "380px", background: "rgba(59,130,246,0.45)" }} />
      <div className="glow-orb float-slower" style={{ bottom: "-10%", right: "-5%", width: "420px", height: "420px", background: "rgba(20,184,166,0.35)" }} />

      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-10 max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm uppercase tracking-[0.2em]">
            Premium Digital Studio
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-6 leading-[1.08]">
            We design and engineer
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70"> digital products</span>
            <br />that elevate your business.
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-2xl mt-5">
            Vickins Technologies partners with growth-focused organizations to build secure, scalable web and mobile experiences, automation systems, and brand-forward platforms that drive measurable outcomes.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {["Strategy", "Design", "Engineering", "Growth"].map((item) => (
              <span key={item} className="glass-chip px-4 py-2 text-xs sm:text-sm text-white/90">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-white text-[#0b1220] font-semibold shadow-[0_20px_50px_rgba(15,23,42,0.25)] transition-all duration-500 hover:-translate-y-1"
            >
              Start a Project
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full border border-white/40 text-white/90 font-semibold backdrop-blur-md hover:bg-white/10 transition-all duration-500"
            >
              View Capabilities
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="shimmer-line rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
                <div className="text-xl font-semibold text-white">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-white/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="glass-panel p-5 sm:p-6 text-[var(--foreground)]"
        >
          <div className="flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-[var(--button-bg)]">
            <SparklesIcon className="w-5 h-5" />
            Why Clients Choose Us
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold mt-4">
            A premium build process with measurable results.
          </h2>
          <p className="text-sm text-[var(--foreground)]/80 mt-4">
            We align strategy, design, and engineering to deliver platforms that are elegant, resilient, and ready for scale.
          </p>

          <div className="mt-6 space-y-4">
            {highlights.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-[var(--button-bg)]/10 p-2">
                  <ShieldCheckIcon className="w-4 h-4 text-[var(--button-bg)]" />
                </div>
                <div className="text-sm sm:text-base text-[var(--foreground)]/80">{item}</div>
              </div>
            ))}
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/40 bg-white/60 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <CpuChipIcon className="w-4 h-4 text-[var(--button-bg)]" />
                Engineering Excellence
              </div>
              <p className="text-xs text-[var(--foreground)]/70 mt-2">
                Clean architecture, performance budgets, and enterprise-grade security baked in.
              </p>
            </div>
            <div className="rounded-2xl border border-white/40 bg-white/60 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <SparklesIcon className="w-4 h-4 text-[var(--button-bg)]" />
                Visual Craft
              </div>
              <p className="text-xs text-[var(--foreground)]/70 mt-2">
                Premium, glass-inspired UI with brand systems that feel timeless.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
