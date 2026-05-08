"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  ClockIcon,
  CurrencyDollarIcon,
  FireIcon,
  LightBulbIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  VideoCameraIcon,
  BellAlertIcon,
  BoltIcon,
  FingerPrintIcon,
  BuildingOffice2Icon,
  HomeModernIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const valueProps = [
  { label: "Professional installation", icon: ShieldCheckIcon },
  { label: "Reliable protection", icon: LockClosedIcon },
  { label: "Maintenance plans", icon: ClockIcon },
  { label: "Responsive support", icon: UserGroupIcon },
];

const solutions = [
  {
    title: "CCTV Surveillance",
    icon: VideoCameraIcon,
    points: ["HD/4K Camera Installation", "Remote Viewing", "24/7 Monitoring", "Maintenance & Support"],
  },
  {
    title: "Biometric Systems",
    icon: FingerPrintIcon,
    points: ["Access Control", "Time & Attendance", "Multi-user Management", "Secure & Accurate"],
  },
  {
    title: "Electric Fence",
    icon: BoltIcon,
    points: ["Perimeter Protection", "High Voltage Deterrent", "Intrusion Prevention", "24/7 Protection"],
  },
  {
    title: "Electric Gates",
    icon: HomeModernIcon,
    points: ["Automatic Gate Systems", "Remote Control Access", "Secure & Reliable", "Custom Solutions"],
  },
  {
    title: "Intruder Alarms",
    icon: BellAlertIcon,
    points: ["Motion & Door Sensors", "Siren & Strobe Alarms", "Instant Alerts", "Smart Alarm Systems"],
  },
  {
    title: "Access Control",
    icon: LockClosedIcon,
    points: ["RFID / Card Access", "PIN & Password Access", "Visitor Management", "Secure Entry Solutions"],
  },
  {
    title: "Video Intercom",
    icon: VideoCameraIcon,
    points: ["Audio & Video Calling", "Remote Door Unlock", "Visitor Verification", "Enhanced Security"],
  },
  {
    title: "Fire Alarm Systems",
    icon: FireIcon,
    points: ["Smoke & Heat Detection", "Fire Alarm Panels", "Early Warning Systems", "Life & Property Protection"],
  },
  {
    title: "Perimeter Security",
    icon: ShieldCheckIcon,
    points: ["Outdoor Motion Detectors", "Beam Barriers", "Perimeter Monitoring", "Maximum Deterrence"],
  },
  {
    title: "Security Lighting",
    icon: LightBulbIcon,
    points: ["LED Security Lights", "Motion Activated", "Perimeter Illumination", "Deter & Detect"],
  },
];

const trustBand = [
  { label: "End-to-end security solutions", icon: ShieldCheckIcon },
  { label: "Tailored for homes, businesses & institutions", icon: BuildingOffice2Icon },
  { label: "Scalable & future-ready", icon: ChartBarIcon },
  { label: "Dedicated support & maintenance", icon: WrenchScrewdriverIcon },
  { label: "Transparent pricing + service plans", icon: CurrencyDollarIcon },
];

export default function VickinsSecurityPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen font-[var(--font-sans)] flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.05 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 -z-10 bg-white" />
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,16,48,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,16,48,0.05) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="hidden lg:block absolute inset-y-0 right-0 w-[46%] -z-10">
          <div className="absolute inset-0 rounded-l-[180px] bg-gradient-to-b from-[var(--brand-navy-900)] to-[var(--brand-navy-950)] shadow-[0_40px_90px_rgba(0,0,0,0.35)] overflow-hidden">
            <Image
              src="/images/vickins-security-promo.png"
              alt="Vickins Security"
              fill
              className="object-cover opacity-90"
              priority
              sizes="(max-width: 1024px) 100vw, 680px"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--brand-navy-950)]/70 via-transparent to-transparent" />
            <div className="absolute inset-0 ring-1 ring-white/10 rounded-l-[180px]" />
          </div>
        </div>

        <div className="relative z-10 w-full px-6 sm:px-8 lg:px-10 max-w-6xl mx-auto pt-12 sm:pt-14 lg:pt-16 pb-10 sm:pb-12">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
              <div className="inline-flex items-center gap-3">
                <Image
                  src="/logo1.png"
                  alt="Vickins Technologies"
                  width={92}
                  height={36}
                  className="h-9 w-auto"
                  priority
                />
                <div className="leading-tight">
                  <div className="text-[10px] uppercase tracking-[0.38em] text-[var(--brand-blue-600)] font-semibold">
                    Vickins
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/70">
                    Technologies
                  </div>
                </div>
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-[var(--brand-navy-900)]">
                Vickins Security
              </h1>
              <p className="mt-3 text-xs sm:text-sm uppercase tracking-[0.38em] text-[var(--foreground)]/70">
                Security systems installed, commissioned, and supported in Kenya.
              </p>

              <p className="mt-6 text-sm sm:text-base text-[var(--foreground)]/80 max-w-2xl">
                End-to-end physical security for homes, businesses, and institutions — delivered with tidy installs,
                reliable hardware, and support you can depend on.
                <span className="block mt-1 font-semibold text-[var(--brand-blue-600)]">
                  Site survey → installation → maintenance plans.
                </span>
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-[var(--brand-blue-600)] text-white font-semibold shadow-[0_18px_45px_rgba(0,80,240,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(0,80,240,0.28)]"
                >
                  Request a site survey
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#solutions"
                  className="group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full border border-[var(--border)] bg-white/70 backdrop-blur-xl text-[var(--foreground)] font-semibold hover:bg-white transition-all duration-300"
                >
                  View Solutions
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                {valueProps.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-[var(--border)] bg-white/70 backdrop-blur-xl px-4 py-3 shadow-[var(--shadow-tight)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-[var(--brand-blue-600)]/10 p-2 border border-[var(--brand-blue-600)]/15">
                        <item.icon className="w-4 h-4 text-[var(--brand-blue-600)]" />
                      </div>
                      <div className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[var(--foreground)]/75">
                        {item.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 text-xs text-[var(--foreground)]/65">
                Looking for software engineering?{" "}
                <Link href="/" className="text-[var(--brand-blue-600)] underline underline-offset-4 hover:opacity-90">
                  Back to Vickins Technologies
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="lg:hidden glass-panel p-4 sm:p-5"
            >
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/15 bg-white/5">
                <Image
                  src="/images/vickins-security-promo.png"
                  alt="Vickins Security"
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0b1220]/55 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <main className="flex-1 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <motion.section
          id="solutions"
          className="scroll-mt-[90px]"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-[var(--brand-blue-600)] uppercase tracking-[0.35em] text-xs sm:text-sm">
              Our Comprehensive Security Solutions
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-4">
              One partner. Total protection.
            </h2>
            <p className="text-sm sm:text-base text-[var(--foreground)]/80 mt-4">
              Designed for homes, businesses, and institutions — with installation, monitoring options, and ongoing
              maintenance.
            </p>
          </div>

          <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
            {solutions.map((solution) => (
              <div
                key={solution.title}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[var(--brand-navy-900)] to-[var(--brand-navy-950)] text-white shadow-[0_20px_55px_rgba(0,0,0,0.28)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,80,240,0.42),_transparent_58%)] opacity-80" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_40%,_rgba(0,144,224,0.22),_transparent_55%)]" />
                <div className="relative p-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                      <solution.icon className="h-5 w-5 text-[var(--accent-2)]" />
                    </div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">{solution.title}</h3>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-white/85">
                    {solution.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70" />
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
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
          <div className="relative overflow-hidden rounded-[32px] border border-white/30 bg-white/60 backdrop-blur-2xl shadow-[var(--shadow-soft)]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/45 to-transparent opacity-80" />
            <div className="relative p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                <div className="max-w-2xl">
                  <p className="text-[var(--brand-blue-600)] uppercase tracking-[0.32em] text-xs sm:text-sm">
                    Total Peace of Mind
                  </p>
                  <h3 className="text-xl sm:text-2xl font-semibold mt-3">
                    Securing your world so you can focus on what matters most.
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--foreground)]/80 mt-3">
                    From site survey to installation, configuration, and maintenance — we deliver tidy execution and a
                    dependable support experience.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Site survey", "Installation", "Configuration", "Maintenance"].map((item) => (
                    <span key={item} className="glass-chip px-4 py-2 text-xs sm:text-sm text-[var(--foreground)]/80">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {trustBand.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/40 bg-white/70 p-4">
                    <div className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-[var(--foreground)]">
                      <item.icon className="w-4 h-4 text-[var(--brand-blue-600)] mt-0.5" />
                      <span className="leading-snug">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-white/35 bg-gradient-to-r from-[var(--brand-navy-900)] to-[var(--brand-navy-950)] text-white px-5 py-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="text-sm font-semibold uppercase tracking-[0.22em]">
                    Innovative solutions. <span className="text-[var(--accent-2)]">Real impact.</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-white/85">
                    <a href="tel:+254794501005" className="inline-flex items-center gap-2 hover:text-white">
                      <span className="rounded-full bg-white/10 border border-white/15 px-2 py-1 text-xs">Call</span>
                      +254 794 501 005
                    </a>
                    <a href="https://vickinstechnologies.com" className="inline-flex items-center gap-2 hover:text-white">
                      <span className="rounded-full bg-white/10 border border-white/15 px-2 py-1 text-xs">Web</span>
                      vickinstechnologies.com
                    </a>
                    <a
                      href="mailto:info@vickinstechnologies.com"
                      className="inline-flex items-center gap-2 hover:text-white"
                    >
                      <span className="rounded-full bg-white/10 border border-white/15 px-2 py-1 text-xs">Email</span>
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
