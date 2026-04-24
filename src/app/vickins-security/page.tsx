"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  BuildingOffice2Icon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  CodeBracketIcon,
  HomeModernIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  VideoCameraIcon,
  WifiIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const valueProps = [
  { label: "Trusted security experts", icon: ShieldCheckIcon },
  { label: "Advanced technology", icon: CodeBracketIcon },
  { label: "Tailored solutions", icon: WrenchScrewdriverIcon },
  { label: "24/7 support & maintenance", icon: ClockIcon },
];

const coreServices = [
  {
    title: "CCTV Installation",
    description: "Smart surveillance systems for homes, offices, and enterprise sites.",
    icon: VideoCameraIcon,
  },
  {
    title: "WiFi Installations",
    description: "Reliable network setups with coverage planning and secure configuration.",
    icon: WifiIcon,
  },
  {
    title: "Cyber Security",
    description: "Threat detection, hardening, and best-practice protection for your data.",
    icon: LockClosedIcon,
  },
  {
    title: "Software Security",
    description: "Secure code reviews, application hardening, and risk reduction for systems.",
    icon: CodeBracketIcon,
  },
];

const coverage = [
  { label: "Enterprise solutions", icon: BuildingOffice2Icon },
  { label: "Residential solutions", icon: HomeModernIcon },
  { label: "Compliance & reliability", icon: ClipboardDocumentCheckIcon },
  { label: "24/7 monitoring options", icon: ClockIcon },
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
        className="relative overflow-hidden text-white"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-navy-950)] via-[var(--brand-navy-900)] to-[var(--brand-navy-950)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,80,240,0.42),_transparent_55%)] opacity-85" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(0,144,224,0.26),_transparent_48%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,_rgba(0,80,240,0.3),_transparent_52%)]" />
          <div
            className="absolute inset-0 opacity-35"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="glow-orb float-slow" style={{ top: "-10%", left: "-6%", width: "380px", height: "380px", background: "rgba(0,80,240,0.5)" }} />
        <div className="glow-orb float-slower" style={{ bottom: "-14%", right: "-8%", width: "460px", height: "460px", background: "rgba(0,144,224,0.42)" }} />

        <div className="relative z-10 w-full px-6 sm:px-8 lg:px-10 max-w-6xl mx-auto pt-14 sm:pt-18 lg:pt-20 pb-12 sm:pb-14">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm uppercase tracking-[0.2em]">
                Vickins Security
                <span className="h-1 w-8 rounded-full bg-[var(--accent-2)]/70" />
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-6 leading-[1.08]">
                Securing today,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] via-[#fbbf24] to-[#f59e0b]">
                  {" "}
                  protecting tomorrow
                </span>
                .
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-2xl mt-5">
                Advanced security solutions for a safer, smarter future — from CCTV and WiFi installations to cyber
                security and software hardening.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-white text-[#0b1220] font-semibold shadow-[0_20px_50px_rgba(15,23,42,0.25)] transition-all duration-500 hover:-translate-y-1"
                >
                  Request a Quote
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#solutions"
                  className="group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full border border-white/40 text-white/90 font-semibold backdrop-blur-md hover:bg-white/10 transition-all duration-500"
                >
                  View Solutions
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                {valueProps.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-white/10 p-2 border border-white/15">
                        <item.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-xs sm:text-sm uppercase tracking-[0.18em] text-white/80">
                        {item.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-xs text-white/70">
                Looking for our digital studio?{" "}
                <Link href="/" className="text-white underline underline-offset-4 hover:text-white/90">
                  Back to Vickins Technologies
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28 }}
              className="glass-panel p-4 sm:p-5"
            >
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-white/15 bg-white/5">
                <Image
                  src="/images/vickins-security-banner.png"
                  alt="Vickins Security banner"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 520px"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0b1220]/70 via-transparent to-transparent" />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {coverage.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white">
                      <item.icon className="w-4 h-4 text-[var(--accent-2)]" />
                      {item.label}
                    </div>
                  </div>
                ))}
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
            <p className="text-[var(--button-bg)] uppercase tracking-[0.35em] text-xs sm:text-sm">
              Security Services
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-4">
              End-to-end solutions designed to protect what matters most.
            </h2>
            <p className="text-sm sm:text-base text-[var(--foreground)]/80 mt-4">
              We plan, install, and support security infrastructure with clean execution, responsive handover, and
              ongoing maintenance options.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-8">
            {coreServices.map((service) => (
              <div
                key={service.title}
                className="glass-panel p-5 sm:p-6 group hover:-translate-y-2 transition-all duration-300"
              >
                <service.icon className="h-8 w-8 text-[var(--button-bg)] mb-3" />
                <h3 className="text-base sm:text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm sm:text-base text-[var(--foreground)]/80">{service.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-panel p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-[var(--button-bg)] uppercase tracking-[0.32em] text-xs sm:text-sm">
                  Coverage
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold mt-3">
                  Built for homes, offices, and high-traffic environments.
                </h3>
                <p className="text-sm sm:text-base text-[var(--foreground)]/80 mt-3">
                  From small installations to multi-site rollouts, we deliver consistent standards, tidy cabling, and
                  security best practices throughout.
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

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {coverage.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/40 bg-white/60 p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <item.icon className="w-4 h-4 text-[var(--button-bg)]" />
                    {item.label}
                  </div>
                  <p className="text-xs text-[var(--foreground)]/70 mt-2">
                    Ask for a tailored plan based on your space, risk profile, and budget.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
