"use client";

import { Settings, Bell, Palette, Lock, Globe } from "lucide-react";

const settings = [
  {
    title: "Notifications",
    description: "Receive real-time alerts for low stock and cash thresholds.",
    icon: Bell,
  },
  {
    title: "Brand Theme",
    description: "Keep admin visuals aligned with the premium homepage styling.",
    icon: Palette,
  },
  {
    title: "Security",
    description: "Rotate admin tokens and review sign-in activity.",
    icon: Lock,
  },
  {
    title: "Regional Settings",
    description: "Set currency, date formats, and preferred language.",
    icon: Globe,
  },
];

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <section className="glass-panel p-6 sm:p-8">
        <div className="flex items-center gap-3 text-[var(--button-bg)] text-xs sm:text-sm uppercase tracking-[0.3em]">
          <Settings size={16} />
          Settings
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold mt-3">Configure your admin experience.</h1>
        <p className="text-sm text-[var(--muted)] mt-3 max-w-2xl">
          Update preferences, security controls, and operational defaults for a refined admin workflow.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {settings.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="glass-panel p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--button-bg)]/10 text-[var(--button-bg)] flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-[var(--muted)] mt-2">{item.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
