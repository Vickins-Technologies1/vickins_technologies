"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  FingerPrintIcon,
  CloudIcon,
  EnvelopeOpenIcon,
  GlobeAltIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

const privacyCards = [
  {
    title: "Data we collect",
    description:
      "Contact details, project requirements, and the content you choose to share with us. We also collect basic analytics to understand site performance.",
    icon: FingerPrintIcon,
  },
  {
    title: "How we use it",
    description:
      "To respond to inquiries, deliver services, send project updates, and improve our digital experiences.",
    icon: SparklesIcon,
  },
  {
    title: "Sharing and disclosure",
    description:
      "We only share data with trusted service providers who help us run the site and deliver projects. We do not sell your data.",
    icon: GlobeAltIcon,
  },
];

const policyDetails = [
  {
    title: "Cookies and analytics",
    body: "We use lightweight analytics to understand what content resonates. You can block cookies in your browser settings at any time.",
    icon: CloudIcon,
  },
  {
    title: "Data retention",
    body: "We keep project files and communications for as long as needed to support active work or maintain records, then archive or delete them securely.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Your choices",
    body: "You can request access, updates, or deletion of your information by emailing us. We respond promptly and transparently.",
    icon: EnvelopeOpenIcon,
  },
];

export default function PolicyPage() {
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
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,_rgba(20,184,166,0.2),_transparent_55%)]" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/60 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--button-bg)]">
                <ShieldCheckIcon className="h-4 w-4" />
                Privacy Policy
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-5 max-w-3xl">
                A privacy-first approach that keeps your data protected and your brand respected.
              </h1>
              <p className="text-sm sm:text-base text-[var(--foreground)]/80 mt-4 max-w-2xl">
                We collect the minimum data needed to deliver great work, keep it secure, and never trade it.
                Last updated April 10, 2026.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-10 sm:pb-14">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {privacyCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-3xl border border-white/40 bg-white/70 p-5 sm:p-6 shadow-[var(--shadow-tight)]"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
                    <Icon className="h-5 w-5 text-[var(--button-bg)]" />
                    {card.title}
                  </div>
                  <p className="text-sm text-[var(--foreground)]/75 mt-3">{card.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-10">
            <div className="space-y-4">
              {policyDetails.map((item) => {
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

            <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-6 sm:p-8 shadow-[var(--shadow-soft)]">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--button-bg)]">
                Transparency
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold mt-4">
                You stay in control of your information.
              </h2>
              <p className="text-sm text-[var(--foreground)]/80 mt-4">
                If you need a copy of your data or want us to delete it, email us and we will take care of
                it quickly. We only keep what we need to serve you well.
              </p>
              <div className="mt-6 rounded-2xl border border-white/40 bg-white/70 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--button-bg)]">
                  <EnvelopeOpenIcon className="h-4 w-4" />
                  Contact
                </div>
                <p className="text-sm text-[var(--foreground)]/75 mt-2">
                  Reach us at info@vickinstechnologies.com for any privacy-related request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
