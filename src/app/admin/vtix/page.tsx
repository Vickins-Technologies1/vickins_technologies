"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, CalendarCheck, Users, Ticket, Wallet, ArrowRight } from "lucide-react";
import { formatMoney } from "@/lib/vtix-utils";

type Metrics = {
  organizersCount: number;
  totalEvents: number;
  publishedEvents: number;
  ticketsCount: number;
  totalRevenue: number;
};

type EventRow = {
  id: string;
  title: string;
  status: string;
  city?: string;
  startsAt: string;
  createdBy: string;
};

export default function VtixAdminPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/vtix", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to load V-Tix analytics.");
      setMetrics(data.metrics ?? null);
      setEvents(data.events ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load analytics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      <section className="glass-panel p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_55%)]" />
        <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-[var(--button-bg)]">
              <Sparkles size={16} />
              V-Tix Africa Analytics
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-3">
              Oversee organizers, events, and ticket flow.
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted)] mt-3 max-w-2xl">
              Monitor platform adoption, revenue, and event activity across Africa.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/vtix"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--glass-border)] bg-white/60 text-[var(--foreground)] text-sm font-semibold hover:bg-[var(--hover-bg)] transition"
            >
              View marketplace
            </Link>
            <Link
              href="/vtix/dashboard"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold"
            >
              Open organizer view
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {error && <div className="glass-panel p-4 text-sm text-rose-500">{error}</div>}

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {[
          { label: "Organizers", value: metrics?.organizersCount ?? 0, icon: Users },
          { label: "Total Events", value: metrics?.totalEvents ?? 0, icon: CalendarCheck },
          { label: "Published", value: metrics?.publishedEvents ?? 0, icon: CalendarCheck },
          { label: "Tickets", value: metrics?.ticketsCount ?? 0, icon: Ticket },
          { label: "Revenue", value: formatMoney(metrics?.totalRevenue ?? 0, "KES"), icon: Wallet },
        ].map((stat) => (
          <div key={stat.label} className="glass-panel dash-card p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{stat.label}</p>
              <stat.icon size={18} className="text-[var(--button-bg)] dashboard-icon" />
            </div>
            <p className="text-lg sm:text-xl font-semibold mt-3">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="glass-panel p-6 sm:p-7 space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Event roster</p>
          <h2 className="text-xl sm:text-2xl font-semibold mt-2">Platform events</h2>
        </div>
        {loading ? (
          <div className="space-y-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-16 rounded-2xl border border-[var(--glass-border)] bg-white/60" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div>
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    {event.status} • {event.city || "Kenya"} •{" "}
                    {new Date(event.startsAt).toLocaleDateString("en-KE", { month: "short", day: "numeric" })}
                  </p>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Organizer: {event.createdBy}
                  </p>
                </div>
                <Link
                  href={`/vtix/dashboard/events/${event.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--glass-border)] bg-white/80 text-sm font-semibold"
                >
                  View event
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
            {events.length === 0 && <p className="text-sm text-[var(--muted)]">No events yet.</p>}
          </div>
        )}
      </section>
    </div>
  );
}
