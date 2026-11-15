import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  BellAlertIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

const services = [
  {
    title: "CCTV Surveillance",
    description: "HD/4K camera installation, remote viewing, monitoring, and support.",
    icon: VideoCameraIcon,
  },
  {
    title: "Intruder Alarms",
    description: "Sensors, sirens, instant alerts, and smart alarm systems.",
    icon: BellAlertIcon,
  },
  {
    title: "Access Control",
    description: "RFID/card access, PIN/password entry, and visitor management.",
    icon: LockClosedIcon,
  },
  {
    title: "Perimeter Security",
    description: "Electric fence, beam barriers, motion detection, and deterrence.",
    icon: ShieldCheckIcon,
  },
];

const quickHighlights = [
  "Advanced technology",
  "Reliable protection",
  "24/7 monitoring & support",
  "Expert team",
];

export default function SecurityServiceSection() {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      id="security"
      className="py-8 sm:py-10 lg:py-12 scroll-mt-[96px]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      variants={container}
    >
      <motion.div variants={item} className="text-center max-w-3xl mx-auto">
        <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Security</p>
        <h2 className="text-2xl sm:text-3xl font-semibold mt-3">Vickins Security.</h2>
        <p className="text-[15px] text-[var(--foreground)]/78 mt-3">
          CCTV, alarms, access control, and perimeter security — professionally installed, commissioned, and supported.
        </p>
      </motion.div>

      <motion.div variants={item} className="mt-7 flex flex-wrap justify-center gap-2">
        {quickHighlights.map((label) => (
          <span
            key={label}
            className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface)] px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/70"
          >
            {label}
          </span>
        ))}
      </motion.div>

      <div
        role="img"
        aria-label="Security network connecting CCTV, access control, monitoring, and infrastructure through a central security system."
        className="relative mx-auto mt-7 max-w-4xl overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-surface)] px-3 py-4 sm:px-6"
      >
        <svg aria-hidden="true" viewBox="0 0 600 168" preserveAspectRatio="none" className="pointer-events-none absolute inset-y-4 left-3 right-3 h-[calc(100%-2rem)] w-[calc(100%-1.5rem)] text-[var(--accent)] sm:left-6 sm:w-[calc(100%-3rem)]">
          {[
            "M300 34 L300 58",
            "M156 90 L226 90",
            "M374 90 L444 90",
            "M300 146 L300 122",
          ].map((path, index) => (
            <motion.path
              key={path}
              d={path}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.25 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.65, delay: 0.16 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </svg>
        <div className="relative grid grid-cols-3 grid-rows-[48px_72px_48px] items-center justify-items-center">
          {[
            { label: "CCTV", placement: "col-start-2 row-start-1" },
            { label: "ACCESS CONTROL", placement: "col-start-1 row-start-2" },
            { label: "MONITORING", placement: "col-start-3 row-start-2" },
            { label: "NETWORK / INFRASTRUCTURE", placement: "col-start-2 row-start-3" },
          ].map((node, index) => (
            <motion.span
              key={node.label}
              initial={{ opacity: 0, y: 7 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.38, delay: 0.32 + index * 0.08 }}
              className={`${node.placement} z-10 max-w-full rounded-full border border-[var(--glass-border-strong)] bg-[var(--glass-surface-strong)] px-2 py-1.5 text-center text-[8px] font-semibold uppercase tracking-[0.1em] text-[var(--foreground)]/75 sm:px-3 sm:text-[10px] sm:tracking-[0.16em]`}
            >
              {node.label}
            </motion.span>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="col-start-2 row-start-2 z-10 rounded-2xl border border-[rgba(var(--accent-rgb),0.4)] bg-[var(--card-bg)] px-4 py-3 text-center shadow-[var(--shadow-tight)]"
          >
            <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)] sm:text-[10px]">Security</span>
            <span className="mt-1 block text-[8px] uppercase tracking-[0.12em] text-[var(--foreground)]/55 sm:text-[9px]">Connected services</span>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-7">
        {services.map((service) => (
          <motion.div
            key={service.title}
            variants={item}
            className="glass-panel p-5 sm:p-6 group hover:-translate-y-1.5 transition-all duration-300"
          >
            <service.icon className="h-8 w-8 text-[var(--accent)] mb-3" />
            <h3 className="text-base sm:text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-[15px] text-[var(--foreground)]/75 mb-5">{service.description}</p>
            <Link
              href="/vickins-security"
              className="text-[var(--accent)] font-semibold text-sm inline-flex items-center gap-2"
            >
              Details
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div variants={item} className="mt-8 flex justify-center">
        <Link
          href="/vickins-security"
          className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-[var(--accent)] text-[var(--accent-contrast)] font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          View Vickins Security
          <ShieldCheckIcon className="w-5 h-5" />
        </Link>
      </motion.div>
    </motion.section>
  );
}
