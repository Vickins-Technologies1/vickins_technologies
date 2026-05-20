"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  BellAlertIcon,
  BoltIcon,
  BuildingOffice2Icon,
  ChartBarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  FireIcon,
  FingerPrintIcon,
  HomeModernIcon,
  LightBulbIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  VideoCameraIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const quickSignals = [
  { label: "Professional installation", icon: ShieldCheckIcon },
  { label: "Maintenance plans", icon: WrenchScrewdriverIcon },
  { label: "Responsive support", icon: UserGroupIcon },
  { label: "Secure-by-design setup", icon: LockClosedIcon },
] as const;

const solutions = [
  {
    title: "CCTV Surveillance",
    icon: VideoCameraIcon,
    points: ["HD/4K install", "Remote viewing", "Recording + playback"],
  },
  {
    title: "Access Control",
    icon: LockClosedIcon,
    points: ["RFID / cards", "PIN + roles", "Visitor entry flow"],
  },
  {
    title: "Biometric Systems",
    icon: FingerPrintIcon,
    points: ["Time & attendance", "Multi-user management", "Tamper-aware devices"],
  },
  {
    title: "Intruder Alarms",
    icon: BellAlertIcon,
    points: ["Motion + door sensors", "Instant alerts", "Smart alarm options"],
  },
  {
    title: "Electric Fence",
    icon: BoltIcon,
    points: ["Perimeter deterrence", "Intrusion prevention", "24/7 protection"],
  },
  {
    title: "Electric Gates",
    icon: HomeModernIcon,
    points: ["Automatic gate systems", "Remote access", "Custom solutions"],
  },
  {
    title: "Fire Alarm Systems",
    icon: FireIcon,
    points: ["Smoke + heat detection", "Panels + sirens", "Early warnings"],
  },
  {
    title: "Video Intercom",
    icon: VideoCameraIcon,
    points: ["Audio + video calling", "Remote unlock", "Visitor verification"],
  },
  {
    title: "Perimeter Sensors",
    icon: ShieldCheckIcon,
    points: ["Outdoor motion", "Beam barriers", "Zone monitoring"],
  },
  {
    title: "Security Lighting",
    icon: LightBulbIcon,
    points: ["LED installs", "Motion activation", "Perimeter illumination"],
  },
] as const;

const trustBand = [
  { label: "End-to-end security solutions", icon: ShieldCheckIcon },
  { label: "Tailored for homes & businesses", icon: BuildingOffice2Icon },
  { label: "Scalable & future-ready", icon: ChartBarIcon },
  { label: "Dedicated support & maintenance", icon: WrenchScrewdriverIcon },
  { label: "Transparent service plans", icon: CurrencyDollarIcon },
] as const;

const deliverySteps = [
  { title: "Site survey", description: "Walk-through, requirements, and risk areas." },
  { title: "System design", description: "Device choices, wiring plan, and placement map." },
  { title: "Installation", description: "Clean routing, labeled cabling, tidy finishing." },
  { title: "Commissioning", description: "Testing, user training, and handover checklist." },
  { title: "Maintenance", description: "Health checks, adjustments, and replacements." },
] as const;

export default function VickinsSecurityPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const heroStats = useMemo(
    () => [
      { label: "Response time", value: "24 hrs" },
      { label: "Install window", value: "1–3 days" },
      { label: "Service coverage", value: "Kenya" },
    ],
    []
  );

  return (
    <div className="min-h-screen font-[var(--font-sans)] flex flex-col bg-[var(--background)]">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="relative overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[var(--page-bg)]" />
          <div className="absolute inset-0 bg-[radial-gradient(1000px_700px_at_12%_10%,rgba(var(--accent-sky-rgb),0.14),transparent_58%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_620px_at_84%_24%,rgba(var(--accent-rgb),0.12),transparent_60%)]" />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-45 hero-grid-mask"
            style={{ backgroundSize: "30px 30px" }}
          />
          <div aria-hidden="true" className="absolute inset-0 hero-dots hero-grid-mask opacity-35" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[var(--background)]" />
        </div>

        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 pt-12 sm:pt-14 lg:pt-16 pb-12 sm:pb-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.05 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--glass-surface)] px-3 py-1.5 text-[10px] sm:text-xs uppercase tracking-[0.32em] text-[var(--foreground)]/70 shadow-[var(--shadow-tight)] backdrop-blur-xl">
                Vickins Security
                <span className="h-1 w-6 rounded-full bg-[rgba(var(--accent-sky-rgb),0.85)]" />
                Systems + support
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.03] tracking-[-0.03em] text-[var(--foreground)]">
                Physical security,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-sky)] via-[rgba(var(--accent-rgb),0.95)] to-[var(--accent)]">
                  {" "}
                  installed right.
                </span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-[var(--foreground)]/78 max-w-2xl">
                CCTV, access control, alarms, and perimeter systems — installed cleanly, commissioned properly, and
                maintained with dependable support.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-[var(--button-bg)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent-sky-rgb),0.6)]"
                >
                  Request a site survey
                  <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#solutions"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-[var(--glass-surface)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] shadow-[var(--shadow-tight)] backdrop-blur-xl transition hover:bg-[var(--glass-surface-strong)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent-sky-rgb),0.6)]"
                >
                  Explore solutions
                  <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                {quickSignals.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-[var(--glass-surface)] px-4 py-3 shadow-[var(--shadow-tight)] backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-[rgba(var(--accent-rgb),0.10)] p-2">
                        <item.icon className="h-4 w-4 text-[var(--accent)]" />
                      </div>
                      <div className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[var(--foreground)]/75">
                        {item.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-xs text-[var(--foreground)]/60">
                Looking for software engineering?{" "}
                <Link href="/" className="text-[var(--accent)] underline underline-offset-4 hover:opacity-90">
                  Back to Vickins Technologies
                </Link>
                .
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="relative"
            >
              <div className="absolute -inset-2 rounded-[28px] hero-panel-glow blur-2xl" />
              <div className="relative overflow-hidden rounded-[28px] bg-[var(--card-bg)] shadow-[var(--shadow-soft)]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/vickins-security-promo-v2.png"
                    alt="Vickins Security installation preview"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 520px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-transparent to-transparent" />
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--foreground)]/60">
                        Installation + support
                      </p>
                      <h2 className="mt-2 text-lg sm:text-xl font-semibold tracking-[-0.02em] text-[var(--foreground)]">
                        Clean finishing. Reliable protection.
                      </h2>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 rounded-full bg-[var(--glass-surface)] px-3 py-1.5 text-xs text-[var(--foreground)]/70 shadow-[var(--shadow-tight)] backdrop-blur-xl">
                      <ClockIcon className="h-4 w-4 text-[var(--accent)]" />
                      24h response
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {heroStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-2xl bg-[var(--glass-surface)] p-3 shadow-[var(--shadow-tight)] backdrop-blur-xl"
                      >
                        <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--foreground)]/55">
                          {stat.label}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <main className="flex-1 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <motion.section
          id="solutions"
          className="scroll-mt-[96px]"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Solutions</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-3">
                One partner. Total protection.
              </h2>
              <p className="text-[15px] text-[var(--foreground)]/78 mt-3">
                Designed for homes, businesses, and institutions — with installation, commissioning, and maintenance.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/60">
              Security systems + support
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {solutions.map((solution) => (
              <div key={solution.title} className="glass-panel p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="h-11 w-11 rounded-2xl bg-[rgba(var(--accent-rgb),0.10)] flex items-center justify-center">
                    <solution.icon className="h-5 w-5 text-[var(--accent)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">{solution.title}</h3>
                    <ul className="mt-3 space-y-2 text-sm text-[var(--foreground)]/75">
                      {solution.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]/70" />
                          <span className="leading-snug">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mt-14 sm:mt-16"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative overflow-hidden rounded-[32px] bg-[var(--card-bg)] shadow-[var(--shadow-soft)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(var(--accent-sky-rgb),0.14),_transparent_55%)]" />
            <div className="relative p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="max-w-2xl">
                  <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Delivery</p>
                  <h3 className="text-xl sm:text-2xl font-semibold mt-3">
                    A clear process — from survey to maintenance.
                  </h3>
                  <p className="text-[15px] text-[var(--foreground)]/78 mt-3">
                    We design the right system for your space, install it neatly, and keep it running with support plans.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {["Site survey", "Installation", "Commissioning", "Maintenance"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-[var(--glass-surface)] px-4 py-2 text-xs sm:text-sm text-[var(--foreground)]/80 shadow-[var(--shadow-tight)] backdrop-blur-xl"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {deliverySteps.map((step, index) => (
                  <div key={step.title} className="rounded-2xl bg-[var(--glass-surface)] p-4 shadow-[var(--shadow-tight)] backdrop-blur-xl">
                    <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--foreground)]/55">
                      Step {index + 1}
                    </p>
                    <div className="mt-2 text-sm font-semibold text-[var(--foreground)]">{step.title}</div>
                    <p className="mt-2 text-sm text-[var(--foreground)]/70">{step.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {trustBand.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-[var(--glass-surface)] p-4 shadow-[var(--shadow-tight)]">
                    <div className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-[var(--foreground)]">
                      <item.icon className="h-4 w-4 text-[var(--accent)] mt-0.5" />
                      <span className="leading-snug">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl bg-[var(--glass-surface)] px-5 py-4 shadow-[var(--shadow-soft)] backdrop-blur-2xl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--foreground)]">
                    Get a site survey and a clear proposal.
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-[var(--foreground)]/75">
                    <a href="tel:+254794501005" className="inline-flex items-center gap-2 hover:text-[var(--accent)]">
                      <span className="rounded-full bg-[rgba(var(--accent-rgb),0.10)] px-2 py-1 text-xs">Call</span>
                      +254 794 501 005
                    </a>
                    <a
                      href="mailto:info@vickinstechnologies.com"
                      className="inline-flex items-center gap-2 hover:text-[var(--accent)]"
                    >
                      <span className="rounded-full bg-[rgba(var(--accent-rgb),0.10)] px-2 py-1 text-xs">Email</span>
                      info@vickinstechnologies.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

