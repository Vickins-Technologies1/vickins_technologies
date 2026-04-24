"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  DocumentTextIcon,
  ScaleIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

const pillars = [
  {
    title: "Respectful use",
    description:
      "Use our sites, demos, and deliverables for lawful, ethical projects. Protect your users and comply with local rules.",
    icon: ScaleIcon,
  },
  {
    title: "Clear ownership",
    description:
      "You own your brand assets and approved deliverables. We retain rights to our tools, templates, and reusable frameworks.",
    icon: SparklesIcon,
  },
  {
    title: "Milestone billing",
    description:
      "Projects are scoped in phases with clear timelines and payment milestones so there are no surprises.",
    icon: CurrencyDollarIcon,
  },
];

const details = [
  {
    title: "Scope of service",
    body: "We provide strategy, design, and engineering services as described in signed proposals, statements of work, or written emails. Any work outside that scope will be quoted before starting.",
    icon: DocumentTextIcon,
  },
  {
    title: "Accounts and access",
    body: "If we create admin or hosting accounts on your behalf, you agree to keep credentials secure and notify us immediately if access changes or is compromised.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Content and assets",
    body: "You confirm that any text, imagery, or data you provide is licensed for the intended use. We can recommend stock providers if needed.",
    icon: GlobeAltIcon,
  },
  {
    title: "Revisions and approvals",
    body: "We include structured feedback rounds in every phase. Once a milestone is approved, further revisions are scoped separately.",
    icon: SparklesIcon,
  },
];

export default function TermsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen font-[var(--font-sans)] flex flex-col bg-[var(--background)]">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <section className="pt-16 pb-10 sm:pt-20 sm:pb-14">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[32px] border border-[var(--glass-border)] bg-[var(--card-bg)] shadow-[var(--shadow-soft)] p-6 sm:p-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(27,92,255,0.2),_transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(20,184,166,0.18),_transparent_55%)]" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/60 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--button-bg)]">
                <DocumentTextIcon className="h-4 w-4" />
                Terms of Service
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-5 max-w-3xl">
                Clear expectations that keep every project focused, creative, and on schedule.
              </h1>
              <p className="text-sm sm:text-base text-[var(--foreground)]/80 mt-4 max-w-2xl">
                These terms explain how we work together, how deliverables are approved, and what both teams
                can count on. Last updated April 10, 2026.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-10 sm:pb-14">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-3xl border border-white/40 bg-white/70 p-5 sm:p-6 shadow-[var(--shadow-tight)]"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
                    <Icon className="h-5 w-5 text-[var(--button-bg)]" />
                    {pillar.title}
                  </div>
                  <p className="text-sm text-[var(--foreground)]/75 mt-3">{pillar.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-10">
            <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-6 sm:p-8 shadow-[var(--shadow-soft)]">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--button-bg)]">
                Quick Summary
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold mt-4">
                We keep things structured, collaborative, and transparent.
              </h2>
              <p className="text-sm text-[var(--foreground)]/80 mt-4">
                We work in phases, align on milestones, and communicate clearly. You keep ownership of your
                brand and data, and we keep you updated with realistic timelines.
              </p>
              <div className="mt-6 rounded-2xl border border-white/40 bg-white/70 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--button-bg)]">
                  <ShieldCheckIcon className="h-4 w-4" />
                  Support Promise
                </div>
                <p className="text-sm text-[var(--foreground)]/75 mt-2">
                  If something slips, we communicate early and reset priorities together. No silent delays.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {details.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-[var(--glass-border)] bg-white/70 p-5 sm:p-6 shadow-[var(--shadow-tight)]"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Icon className="h-5 w-5 text-[var(--button-bg)]" />
                      {item.title}
                    </div>
                    <p className="text-sm text-[var(--foreground)]/75 mt-3">{item.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
