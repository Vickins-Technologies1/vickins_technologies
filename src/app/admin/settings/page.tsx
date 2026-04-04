"use client";

import { useEffect, useState, type ComponentType } from "react";
import {
  Settings,
  Bell,
  Palette,
  Lock,
  Globe,
  Sparkles,
  Wallet,
  Briefcase,
} from "lucide-react";
import type { SettingsCard } from "@/lib/admin-config";

export default function AdminSettingsPage() {
  const [cards, setCards] = useState<SettingsCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const loadConfig = async () => {
      try {
        const response = await fetch("/api/admin/config", { cache: "no-store" });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Failed to load settings.");
        }
        if (isMounted) {
          setCards(data.config?.settings?.cards ?? []);
        }
      } catch (error) {
        if (isMounted) {
          setLoadError(error instanceof Error ? error.message : "Unable to load settings.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadConfig();
    return () => {
      isMounted = false;
    };
  }, []);

  const iconMap: Record<string, ComponentType<{ size?: number; className?: string }>> = {
    Bell,
    Palette,
    Lock,
    Globe,
    Sparkles,
    Wallet,
    Briefcase,
  };

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
        {loadError && (
          <p className="mt-3 text-sm text-rose-500">
            {loadError}
          </p>
        )}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {isLoading && (
          <div className="glass-panel p-6 sm:p-7">
            <p className="text-sm text-[var(--muted)]">Loading settings...</p>
          </div>
        )}
        {!isLoading && cards.map((item) => {
          const Icon = iconMap[item.icon] ?? Settings;
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
        {!isLoading && cards.length === 0 && !loadError && (
          <div className="glass-panel p-6 sm:p-7">
            <p className="text-sm text-[var(--muted)]">No settings configured yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}
