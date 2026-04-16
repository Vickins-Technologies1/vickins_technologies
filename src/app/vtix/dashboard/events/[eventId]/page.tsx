"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { formatMoney } from "@/lib/vtix-utils";

type TicketType = {
  id: string;
  name: string;
  price: number;
  quantityLimit?: number;
  quantitySold?: number;
};

type Attendee = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  ticketType?: string;
  status?: string;
};

type EventDetail = {
  id: string;
  title: string;
  description: string;
  status: string;
  startsAt: string;
  city?: string;
  venueName?: string;
  currency?: string;
  ticketTypes: TicketType[];
  ticketsSold: number;
  revenue: number;
  attendees: Attendee[];
};

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white/70 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)]/40";

export default function VtixEventManagePage() {
  const params = useParams();
  const eventId = params?.eventId as string;
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "draft",
  });

  const loadEvent = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/vtix/events/${eventId}`, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to load event.");
      setEvent(data.event ?? null);
      setForm({
        title: data.event?.title ?? "",
        description: data.event?.description ?? "",
        status: data.event?.status ?? "draft",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load event.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) loadEvent();
  }, [eventId]);

  const handleUpdate = async () => {
    setMessage("");
    setError("");
    try {
      const response = await fetch(`/api/vtix/events/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to update event.");
      setMessage("Event updated.");
      await loadEvent();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update event.");
    }
  };

  const csvContent = useMemo(() => {
    if (!event?.attendees?.length) return "";
    const header = "Name,Email,Phone,Ticket Type,Status";
    const rows = event.attendees.map((attendee) =>
      [
        attendee.name || "",
        attendee.email || "",
        attendee.phone || "",
        attendee.ticketType || "",
        attendee.status || "",
      ]
        .map((value) => `"${value.replace(/"/g, '""')}"`)
        .join(",")
    );
    return [header, ...rows].join("\n");
  }, [event?.attendees]);

  const downloadCsv = () => {
    if (!csvContent) return;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `vtix-attendees-${eventId}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (loading || !event) {
    return (
      <div className="space-y-6">
        <div className="glass-panel h-32 shimmer-line" />
        <div className="glass-panel h-72 shimmer-line" />
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
              Event Control
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-3">
              {event.title}
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted)] mt-3 max-w-2xl">
              {event.city || "Kenya"} • {event.status}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, status: prev.status === "published" ? "draft" : "published" }))}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold"
            >
              {form.status === "published" ? "Unpublish" : "Publish"}
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--glass-border)] bg-white/70 text-sm font-semibold"
            >
              Save changes
            </button>
          </div>
        </div>
      </section>

      {error && <div className="glass-panel p-4 text-sm text-rose-500">{error}</div>}
      {message && <div className="glass-panel p-4 text-sm">{message}</div>}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Tickets sold", value: event.ticketsSold },
          { label: "Revenue", value: formatMoney(event.revenue, event.currency || "KES") },
          { label: "Status", value: event.status },
        ].map((stat) => (
          <div key={stat.label} className="glass-panel dash-card p-4 sm:p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{stat.label}</p>
            <p className="text-lg sm:text-xl font-semibold mt-3">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="glass-panel p-6 sm:p-7 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Event details</p>
            <h2 className="text-xl font-semibold mt-2">Update core information</h2>
          </div>
          <input
            className={inputClass}
            placeholder="Event title"
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          />
          <textarea
            className={`${inputClass} min-h-[140px]`}
            placeholder="Description"
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
          />
        </div>

        <div className="glass-panel p-6 sm:p-7 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Ticket types</p>
            <h2 className="text-xl font-semibold mt-2">Inventory overview</h2>
          </div>
          <div className="space-y-3">
            {event.ticketTypes.map((ticket) => (
              <div key={ticket.id} className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{ticket.name}</p>
                  <p className="text-sm font-semibold">
                    {formatMoney(ticket.price, event.currency || "KES")}
                  </p>
                </div>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Sold {ticket.quantitySold ?? 0} / {ticket.quantityLimit ?? "∞"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Attendee list</p>
            <h2 className="text-xl font-semibold mt-2">Verified tickets</h2>
          </div>
          <button
            type="button"
            onClick={downloadCsv}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--glass-border)] bg-white/70 text-xs font-semibold"
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>
        {event.attendees.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">No attendees yet.</p>
        ) : (
          <div className="space-y-3">
            {event.attendees.map((attendee) => (
              <div
                key={attendee.id}
                className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div>
                  <p className="font-semibold">{attendee.name || attendee.email || "Guest"}</p>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    {attendee.ticketType || "Ticket"} • {attendee.status}
                  </p>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--button-bg)]">
                  {attendee.email || attendee.phone || "No contact"}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
