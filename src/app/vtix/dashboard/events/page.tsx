"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus, Sparkles } from "lucide-react";
import { formatMoney } from "@/lib/vtix-utils";

type EventRow = {
  id: string;
  title: string;
  status: string;
  startsAt: string;
  city?: string;
  currency?: string;
  startingPrice?: number;
  ticketsSold?: number;
  revenue?: number;
};

type TicketTypeForm = {
  name: string;
  price: string;
  quantityLimit: string;
  tier: string;
  isEarlyBird: boolean;
};

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white/70 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)]/40";

export default function VtixEventsDashboardPage() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    category: "Football Matches",
    startsAt: "",
    endsAt: "",
    venueName: "",
    venueAddress: "",
    city: "Nairobi",
    country: "Kenya",
    mapEmbedUrl: "",
    coverImageUrl: "",
  });
  const [ticketTypes, setTicketTypes] = useState<TicketTypeForm[]>([
    { name: "General Admission", price: "1500", quantityLimit: "200", tier: "General", isEarlyBird: false },
  ]);

  const loadEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/vtix/events?scope=organizer", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to load events.");
      setEvents(data.events ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const addTicketType = () => {
    setTicketTypes((prev) => [
      ...prev,
      { name: "", price: "", quantityLimit: "", tier: "VIP", isEarlyBird: false },
    ]);
  };

  const updateTicketType = (index: number, updates: Partial<TicketTypeForm>) => {
    setTicketTypes((prev) => prev.map((item, idx) => (idx === index ? { ...item, ...updates } : item)));
  };

  const removeTicketType = (index: number) => {
    setTicketTypes((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleCreateEvent = async () => {
    setMessage("");
    setError("");
    try {
      const response = await fetch("/api/vtix/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...eventForm,
          ticketTypes,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to create event.");
      setMessage("Event created. You can now publish and sell tickets.");
      setEventForm({
        title: "",
        description: "",
        category: "Football Matches",
        startsAt: "",
        endsAt: "",
        venueName: "",
        venueAddress: "",
        city: "Nairobi",
        country: "Kenya",
        mapEmbedUrl: "",
        coverImageUrl: "",
      });
      await loadEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create event.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="glass-panel p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_55%)]" />
        <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
              <Sparkles size={16} />
              Events Management
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-3">
              Create, publish, and track your event lineup.
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted)] mt-3 max-w-2xl">
              Manage ticket types, monitor sales, and keep every attendee informed.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/vtix"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--glass-border)] bg-white/70 text-sm font-semibold"
            >
              View marketplace
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {error && <div className="glass-panel p-4 text-sm text-rose-500">{error}</div>}
      {message && <div className="glass-panel p-4 text-sm text-[var(--foreground)]">{message}</div>}

      <section className="glass-panel p-6 sm:p-7 space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Launch event</p>
          <h2 className="text-xl sm:text-2xl font-semibold mt-2">Create a new event</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className={inputClass}
            placeholder="Event title"
            value={eventForm.title}
            onChange={(event) => setEventForm((prev) => ({ ...prev, title: event.target.value }))}
          />
          <input
            className={inputClass}
            placeholder="Category"
            value={eventForm.category}
            onChange={(event) => setEventForm((prev) => ({ ...prev, category: event.target.value }))}
          />
          <input
            className={inputClass}
            type="datetime-local"
            value={eventForm.startsAt}
            onChange={(event) => setEventForm((prev) => ({ ...prev, startsAt: event.target.value }))}
          />
          <input
            className={inputClass}
            type="datetime-local"
            value={eventForm.endsAt}
            onChange={(event) => setEventForm((prev) => ({ ...prev, endsAt: event.target.value }))}
          />
          <input
            className={inputClass}
            placeholder="Venue name"
            value={eventForm.venueName}
            onChange={(event) => setEventForm((prev) => ({ ...prev, venueName: event.target.value }))}
          />
          <input
            className={inputClass}
            placeholder="Venue address"
            value={eventForm.venueAddress}
            onChange={(event) =>
              setEventForm((prev) => ({ ...prev, venueAddress: event.target.value }))
            }
          />
          <input
            className={inputClass}
            placeholder="City"
            value={eventForm.city}
            onChange={(event) => setEventForm((prev) => ({ ...prev, city: event.target.value }))}
          />
          <input
            className={inputClass}
            placeholder="Country"
            value={eventForm.country}
            onChange={(event) => setEventForm((prev) => ({ ...prev, country: event.target.value }))}
          />
          <input
            className={inputClass}
            placeholder="Cover image URL"
            value={eventForm.coverImageUrl}
            onChange={(event) =>
              setEventForm((prev) => ({ ...prev, coverImageUrl: event.target.value }))
            }
          />
          <input
            className={inputClass}
            placeholder="Map embed URL"
            value={eventForm.mapEmbedUrl}
            onChange={(event) =>
              setEventForm((prev) => ({ ...prev, mapEmbedUrl: event.target.value }))
            }
          />
          <textarea
            className={`${inputClass} md:col-span-2 min-h-[120px]`}
            placeholder="Event description"
            value={eventForm.description}
            onChange={(event) =>
              setEventForm((prev) => ({ ...prev, description: event.target.value }))
            }
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Ticket types</p>
              <h3 className="text-lg font-semibold mt-2">Pricing & limits</h3>
            </div>
            <button
              type="button"
              onClick={addTicketType}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--glass-border)] bg-white/70 text-xs font-semibold"
            >
              <Plus size={14} />
              Add ticket type
            </button>
          </div>
          <div className="space-y-3">
            {ticketTypes.map((ticket, index) => (
              <div key={`${ticket.name}-${index}`} className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <input
                    className={inputClass}
                    placeholder="Ticket name"
                    value={ticket.name}
                    onChange={(event) => updateTicketType(index, { name: event.target.value })}
                  />
                  <input
                    className={inputClass}
                    type="number"
                    placeholder="Price (KES)"
                    value={ticket.price}
                    onChange={(event) => updateTicketType(index, { price: event.target.value })}
                  />
                  <input
                    className={inputClass}
                    type="number"
                    placeholder="Quantity limit"
                    value={ticket.quantityLimit}
                    onChange={(event) =>
                      updateTicketType(index, { quantityLimit: event.target.value })
                    }
                  />
                  <input
                    className={inputClass}
                    placeholder="Tier (VIP/VVIP)"
                    value={ticket.tier}
                    onChange={(event) => updateTicketType(index, { tier: event.target.value })}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={ticket.isEarlyBird}
                      onChange={(event) => updateTicketType(index, { isEarlyBird: event.target.checked })}
                    />
                    Early bird
                  </label>
                  {ticketTypes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTicketType(index)}
                      className="text-rose-500 text-xs font-semibold"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleCreateEvent}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold"
        >
          Create event
        </button>
      </section>

      <section className="glass-panel p-6 sm:p-7 space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Your events</p>
          <h2 className="text-xl sm:text-2xl font-semibold mt-2">Manage existing events</h2>
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
                className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
              >
                <div>
                  <p className="font-semibold text-lg">{event.title}</p>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    {new Date(event.startsAt).toLocaleDateString("en-KE", { month: "short", day: "numeric" })} •{" "}
                    {event.city || "Kenya"} • {event.status}
                  </p>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Starting at {formatMoney(event.startingPrice ?? 0, event.currency || "KES")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/vtix/dashboard/events/${event.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--glass-border)] bg-white/80 text-sm font-semibold"
                  >
                    Manage
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
            {events.length === 0 && (
              <p className="text-sm text-[var(--muted)]">No events yet. Create your first event above.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
