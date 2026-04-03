"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Boxes,
  Wallet,
  FileText,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    title: "Define your side hustles",
    description: "Set up each hustle to keep stock, sales, and cash organized.",
    href: "/admin/inventory",
    icon: Compass,
  },
  {
    title: "Build your inventory list",
    description: "Add products, pricing, and reorder points for each hustle.",
    href: "/admin/inventory",
    icon: Boxes,
  },
  {
    title: "Record sales and stock changes",
    description: "Log every sale, restock, and adjustment to keep counts accurate.",
    href: "/admin/inventory",
    icon: CheckCircle2,
  },
  {
    title: "Track expenses and cash",
    description: "Capture every payout, supplier bill, and cash movement.",
    href: "/admin/finance",
    icon: Wallet,
  },
  {
    title: "Send premium quotations",
    description: "Generate clean, professional quotes in seconds.",
    href: "/admin/quotations",
    icon: FileText,
  },
];

export default function AdminWalkthroughPage() {
  return (
    <div className="space-y-8">
      <section className="glass-panel p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_55%)]" />
        <div className="relative z-10">
          <p className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-[var(--button-bg)]">
            <Sparkles size={16} />
            Admin Walkthrough
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-3">
            A guided flow to run every hustle like a premium brand.
          </h1>
          <p className="text-sm sm:text-base text-[var(--muted)] mt-3 max-w-3xl">
            Follow this quick tour to set up inventory, record sales, manage cash, and keep your operations
            polished. Each step links directly to the page where you can act immediately.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Link
              key={step.title}
              href={step.href}
              className="glass-panel p-6 sm:p-7 hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--button-bg)]/10 text-[var(--button-bg)] flex items-center justify-center">
                  <Icon size={22} />
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                    Step {index + 1}
                  </p>
                  <h2 className="text-lg sm:text-xl font-semibold mt-2">{step.title}</h2>
                  <p className="text-sm text-[var(--muted)] mt-2">{step.description}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--button-bg)]">
                    Go to page
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
