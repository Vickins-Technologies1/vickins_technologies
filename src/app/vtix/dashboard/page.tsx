"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Ticket, Wallet, Sparkles } from "lucide-react";
import { formatMoney } from "@/lib/vtix-utils";

type DashboardMetrics = {
  totalEvents: number;
  publishedEvents: number;
  ticketsSold: number;
  totalRevenue: number;
};

type EventSummary = {
  id: string;
  title: string;
  startsAt: string;
  status: string;
  city?: string;
  startingPrice?: number;
  currency?: string;
};

export default function VtixDashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/vtix/events?scope=dashboard", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Failed to load dashboard.");
      setMetrics(data.metrics ?? null);
      setEvents(data.events ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const upcomingEvents = useMemo(() => {
    return events
      .filter((event) => new Date(event.startsAt) >= new Date())
      .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
      .slice(0, 4);
  }, [events]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="glass-panel p-6 sm:p-8 h-40 shimmer-line" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="glass-panel p-6 h-24 shimmer-line" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="glass-panel p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_55%)]" />
        <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
              <Sparkles size={16} />
              V-Tix Organizer
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-3">
              Manage events, tickets, and real-time sales.
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted)] mt-3 max-w-2xl">
              Create experiences across Africa and keep ticketing operations fully synchronized.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/vtix/dashboard/events"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold shadow-lg hover:-translate-y-0.5 transition"
            >
              Create event
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/vtix"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--glass-border)] bg-white/70 text-sm font-semibold"
            >
              Open marketplace
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {error && <div className="glass-panel p-4 text-sm text-rose-500">{error}</div>}

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            label: "Total events",
            value: metrics?.totalEvents ?? 0,
            icon: CalendarCheck,
          },
          {
            label: "Published events",
            value: metrics?.publishedEvents ?? 0,
            icon: CalendarCheck,
          },
          {
            label: "Tickets sold",
            value: metrics?.ticketsSold ?? 0,
            icon: Ticket,
          },
          {
            label: "Revenue",
            value: formatMoney(metrics?.totalRevenue ?? 0, "KES"),
            icon: Wallet,
          },
        ].map((stat) => (
          <div key={stat.label} className="glass-panel dash-card p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{stat.label}</p>
              <stat.icon size={18} className="text-[var(--accent)] dashboard-icon" />
            </div>
            <p className="text-lg sm:text-xl font-semibold mt-3">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="glass-panel p-6 sm:p-7 space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Upcoming events</p>
            <h2 className="text-xl font-semibold mt-2">Next on your calendar</h2>
          </div>
          {upcomingEvents.length === 0 ? (
            <div className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4 text-sm text-[var(--muted)]">
              No upcoming events yet. Create a new event to get started.
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4"
                >
                  <div>
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-xs text-[var(--muted)] mt-1">
                      {new Date(event.startsAt).toLocaleDateString("en-KE", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      • {event.city || "Kenya"}
                    </p>
                  </div>
                  <Link
                    href={`/vtix/dashboard/events/${event.id}`}
                    className="text-[var(--button-bg)] text-sm font-semibold"
                  >
                    Open
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-panel p-6 sm:p-7 space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Sales pulse</p>
            <h2 className="text-xl font-semibold mt-2">Ticket momentum</h2>
          </div>
          <div className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4 text-sm text-[var(--muted)]">
            Real-time sales charts will appear here as soon as ticket orders start flowing in.
          </div>
          <Link
            href="/vtix/dashboard/tickets"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--button-bg)]"
          >
            Review ticket activity
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
