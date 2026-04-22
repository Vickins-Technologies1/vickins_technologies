import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  CodeBracketIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  VideoCameraIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";

const services = [
  {
    title: "CCTV Installation",
    description: "Smart surveillance systems for home and enterprise environments.",
    icon: VideoCameraIcon,
  },
  {
    title: "WiFi Installations",
    description: "Fast, reliable connectivity with secure configuration and coverage planning.",
    icon: WifiIcon,
  },
  {
    title: "Cyber Security",
    description: "Protection against evolving threats, hardening, and security best practices.",
    icon: LockClosedIcon,
  },
  {
    title: "Software Security",
    description: "Secure code and stronger systems through reviews, fixes, and hardening.",
    icon: CodeBracketIcon,
  },
];

const quickHighlights = [
  "Trusted experts",
  "Advanced technology",
  "Tailored solutions",
  "24/7 support",
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
      className="py-10 sm:py-14 lg:py-16 mt-16 sm:mt-20 scroll-mt-[80px]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      variants={container}
    >
      <motion.div variants={item} className="text-center max-w-3xl mx-auto">
        <p className="text-[var(--button-bg)] uppercase tracking-[0.35em] text-xs sm:text-sm">
          Vickins Security
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-4">
          Securing today, protecting tomorrow.
        </h2>
        <p className="text-sm sm:text-base text-[var(--foreground)]/80 mt-4">
          Advanced security solutions for a safer, smarter future — from CCTV and WiFi installations to cyber security
          and software hardening.
        </p>
      </motion.div>

      <motion.div variants={item} className="mt-7 flex flex-wrap justify-center gap-2">
        {quickHighlights.map((label) => (
          <span key={label} className="glass-chip px-4 py-2 text-xs sm:text-sm text-[var(--foreground)]/80">
            {label}
          </span>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-8">
        {services.map((service) => (
          <motion.div
            key={service.title}
            variants={item}
            className="glass-panel p-5 sm:p-6 group hover:-translate-y-2 transition-all duration-300"
          >
            <service.icon className="h-8 w-8 text-[var(--button-bg)] mb-3" />
            <h3 className="text-base sm:text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-sm sm:text-base text-[var(--foreground)]/80 mb-5">{service.description}</p>
            <Link
              href="/vickins-security"
              className="text-[var(--button-bg)] font-semibold text-sm sm:text-base inline-flex items-center gap-2"
            >
              Explore service
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div variants={item} className="mt-8 flex justify-center">
        <Link
          href="/vickins-security"
          className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-[var(--button-bg)] text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          View Vickins Security
          <ShieldCheckIcon className="w-5 h-5" />
        </Link>
      </motion.div>
    </motion.section>
  );
}

