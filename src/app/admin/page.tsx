// src/app/admin/page.tsx
"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Boxes,
  Wallet,
  FileText,
  ShieldCheck,
} from "lucide-react";

export default function AdminDashboard() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="p-4 sm:p-8 text-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!session?.user || session.user.role !== "admin") {
    return (
      <div className="p-4 sm:p-8 text-center">
        <p className="text-red-500">
          Access denied. You must be an admin to view this page.
        </p>
      </div>
    );
  }

  const quickLinks = [
    {
      href: "/admin/inventory",
      title: "Inventory & Sales",
      description: "Track stock, record sales, and monitor item performance.",
      icon: Boxes,
    },
    {
      href: "/admin/finance",
      title: "Expenses & Cash",
      description: "Log expenses, manage cash flow, and view balances.",
      icon: Wallet,
    },
    {
      href: "/admin/quotations",
      title: "Quotations",
      description: "Generate polished quotes for your clients.",
      icon: FileText,
    },
  ];

  const steps = [
    {
      title: "Add your side hustles",
      description: "Create each hustle so inventory and cash stay separate.",
      href: "/admin/inventory",
    },
    {
      title: "Load your inventory",
      description: "Add products, set prices, and define reorder points.",
      href: "/admin/inventory",
    },
    {
      title: "Record sales and stock updates",
      description: "Track sales, restocks, and live stock counts.",
      href: "/admin/inventory",
    },
    {
      title: "Capture expenses and cash moves",
      description: "Log payments, payouts, and balances by account.",
      href: "/admin/finance",
    },
    {
      title: "Deliver professional quotations",
      description: "Send sleek quotes directly to clients.",
      href: "/admin/quotations",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="glass-panel p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%)]" />
        <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-[var(--button-bg)]">
              <Sparkles size={16} />
              Admin Command Center
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-3">
              Welcome back, {session.user.name || session.user.email}.
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted)] mt-3 max-w-2xl">
              Keep every side hustle running like a premium brand. Track inventory, sales, expenses, and cash
              in one clean, professional workspace.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/walkthrough"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold shadow-lg hover:-translate-y-0.5 transition"
            >
              Start Walkthrough
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/admin/inventory"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--glass-border)] bg-white/60 text-[var(--foreground)] text-sm font-semibold hover:bg-[var(--hover-bg)] transition"
            >
              Open Inventory
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { label: "Active Hustles", value: "3", icon: ShieldCheck },
          { label: "Stock Items Tracked", value: "28", icon: Boxes },
          { label: "Cash Runway", value: "62 days", icon: TrendingUp },
        ].map((stat) => (
          <div key={stat.label} className="glass-panel p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--muted)] uppercase tracking-[0.2em]">{stat.label}</p>
              <stat.icon size={18} className="text-[var(--button-bg)]" />
            </div>
            <p className="text-2xl sm:text-3xl font-semibold mt-3">{stat.value}</p>
            <p className="text-xs text-[var(--muted)] mt-2">
              Live metrics update as you log sales and expenses.
            </p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="glass-panel p-6 sm:p-7">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--button-bg)]">Walkthrough</p>
              <h2 className="text-xl sm:text-2xl font-semibold mt-2">Your admin flow in 5 steps</h2>
            </div>
            <Link
              href="/admin/walkthrough"
              className="text-sm font-semibold text-[var(--button-bg)] hover:underline"
            >
              View full tour
            </Link>
          </div>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <Link
                key={step.title}
                href={step.href}
                className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-2xl border border-[var(--glass-border)] bg-white/60 hover:bg-[var(--hover-bg)] transition"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--button-bg)]/10 text-[var(--button-bg)] font-semibold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{step.title}</p>
                  <p className="text-sm text-[var(--muted)]">{step.description}</p>
                </div>
                <ArrowRight size={16} className="text-[var(--muted)]" />
              </Link>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-7">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--button-bg)]">Quick Actions</p>
          <h2 className="text-xl sm:text-2xl font-semibold mt-2 mb-6">Jump into the work</h2>
          <div className="space-y-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--glass-border)] bg-white/60 hover:bg-[var(--hover-bg)] transition"
                >
                  <div className="p-3 rounded-xl bg-[var(--button-bg)]/10 text-[var(--button-bg)]">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{link.title}</p>
                    <p className="text-sm text-[var(--muted)]">{link.description}</p>
                  </div>
                  <ArrowRight size={16} className="text-[var(--muted)]" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
