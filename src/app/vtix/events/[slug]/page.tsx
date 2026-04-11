"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarCheck,
  Clock,
  MapPin,
  Share2,
  Ticket,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { formatMoney } from "@/lib/vtix-utils";
import { authClient } from "@/lib/auth-client";

type TicketType = {
  id: string;
  name: string;
  price: number;
  quantityLimit?: number;
  quantitySold?: number;
  tier?: string;
  isEarlyBird?: boolean;
};

type EventDetail = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category?: string;
  venueName?: string;
  venueAddress?: string;
  city?: string;
  country?: string;
  mapEmbedUrl?: string;
  coverImageUrl?: string;
  startsAt: string;
  endsAt?: string;
  organizerName?: string;
  currency?: string;
  ticketTypes: TicketType[];
};

type TicketIssued = {
  id: string;
  qrCode: string;
  ticketTypeName: string;
};

export default function VtixEventDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { data: session } = authClient.useSession();
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [purchaseMessage, setPurchaseMessage] = useState("");
  const [tickets, setTickets] = useState<TicketIssued[]>([]);
  const [now, setNow] = useState(Date.now());

  const loadEvent = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/vtix/events?slug=${slug}`, { cache: "no-store" });
      const data = await response.json();
      if (response.ok) {
        setEvent(data.event ?? null);
        setSelectedType(data.event?.ticketTypes?.[0]?.id ?? "");
      } else {
        setEvent(null);
      }
    } catch {
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) loadEvent();
  }, [slug]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const selectedTicketType = useMemo(
    () => event?.ticketTypes.find((item) => item.id === selectedType),
    [event, selectedType]
  );

  const totalPrice = useMemo(() => {
    if (!selectedTicketType) return 0;
    return selectedTicketType.price * quantity;
  }, [selectedTicketType, quantity]);

  const handlePurchase = async () => {
    setPurchaseMessage("");
    setTickets([]);
    if (!event || !selectedTicketType) {
      setPurchaseMessage("Select a ticket type first.");
      return;
    }
    try {
      const response = await fetch("/api/vtix/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          ticketTypeId: selectedTicketType.id,
          quantity,
          paymentMethod,
          buyerName,
          buyerEmail: buyerEmail || session?.user?.email,
          buyerPhone,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to complete purchase.");
      setPurchaseMessage("Payment received. Your tickets are ready.");
      setTickets(data.tickets ?? []);
    } catch (err) {
      setPurchaseMessage(err instanceof Error ? err.message : "Unable to complete purchase.");
    }
  };

  if (loading || !event) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="glass-panel h-72 shimmer-line" />
      </div>
    );
  }

  const startsAt = new Date(event.startsAt);
  const endsAt = event.endsAt ? new Date(event.endsAt) : null;

  const countdown = useMemo(() => {
    const diff = startsAt.getTime() - now;
    if (diff <= 0) return "Live now";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return `${days}d ${hours}h ${minutes}m`;
  }, [now, startsAt]);

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : `https://vickins-technologies.vercel.app/vtix/events/${event.slug}`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 pt-10 space-y-8">
      <div className="glass-panel p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--button-bg)]">
            <Sparkles size={16} />
            {event.category || "Live Event"}
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold">{event.title}</h1>
          <p className="text-sm text-[var(--muted)]">{event.description}</p>
          <div className="flex flex-wrap gap-4 text-xs text-[var(--muted)]">
            <span className="inline-flex items-center gap-2">
              <CalendarCheck size={14} />
              {startsAt.toLocaleDateString("en-KE", { month: "short", day: "numeric", weekday: "short" })}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock size={14} />
              {startsAt.toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit" })}
              {endsAt ? ` - ${endsAt.toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit" })}` : ""}
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkles size={14} />
              Countdown: {countdown}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} />
              {event.venueName || "Venue"}, {event.city || "Kenya"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                event.title
              )}&dates=${startsAt.toISOString().replace(/-|:|\\.\\d{3}/g, "")}/${(endsAt ?? startsAt)
                .toISOString()
                .replace(/-|:|\\.\\d{3}/g, "")}&details=${encodeURIComponent(
                event.description || ""
              )}&location=${encodeURIComponent(`${event.venueName || ""} ${event.city || ""}`)}`}
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--glass-border)] bg-white/70 text-xs font-semibold"
            >
              Add to Calendar
            </Link>
            <button
              type="button"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: event.title, url: shareUrl });
                } else {
                  navigator.clipboard?.writeText(shareUrl);
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--glass-border)] bg-white/70 text-xs font-semibold"
            >
              <Share2 size={14} />
              Share
            </button>
          </div>
        </div>
        <div className="relative h-56 w-full rounded-3xl overflow-hidden border border-[var(--glass-border)]">
          <Image
            src={event.coverImageUrl || "/bgd.jpg"}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="glass-panel p-6 sm:p-7 space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Ticket types</p>
            <h2 className="text-xl font-semibold mt-2">Choose your access</h2>
          </div>
          <div className="space-y-3">
            {event.ticketTypes.map((ticket) => {
              const available =
                ticket.quantityLimit === undefined
                  ? "Open"
                  : Math.max(ticket.quantityLimit - (ticket.quantitySold ?? 0), 0);
              return (
                <button
                  key={ticket.id}
                  type="button"
                  onClick={() => setSelectedType(ticket.id)}
                  className={`w-full text-left rounded-2xl border p-4 transition ${
                    selectedType === ticket.id
                      ? "border-[var(--button-bg)] bg-[var(--button-bg)]/10"
                      : "border-[var(--glass-border)] bg-white/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">{ticket.name}</p>
                      <p className="text-xs text-[var(--muted)] mt-1">
                        {ticket.tier || "General"} • {ticket.isEarlyBird ? "Early Bird" : "Standard"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        {formatMoney(ticket.price, event.currency || "KES")}
                      </p>
                      <p className="text-xs text-[var(--muted)] mt-1">{available} seats</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-7 space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Checkout</p>
            <h2 className="text-xl font-semibold mt-2">Secure your tickets</h2>
          </div>
          <div className="space-y-3">
            <input
              className="glass-input"
              placeholder="Full name"
              value={buyerName}
              onChange={(event) => setBuyerName(event.target.value)}
            />
            <input
              className="glass-input"
              placeholder="Email address"
              value={buyerEmail}
              onChange={(event) => setBuyerEmail(event.target.value)}
            />
            <input
              className="glass-input"
              placeholder="Phone (M-Pesa)"
              value={buyerPhone}
              onChange={(event) => setBuyerPhone(event.target.value)}
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                className="glass-input"
                value={paymentMethod}
                onChange={(event) => setPaymentMethod(event.target.value)}
              >
                <option value="mpesa">M-Pesa</option>
                <option value="stripe">Stripe</option>
              </select>
              <select
                className="glass-input"
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
              >
                {[1, 2, 3, 4, 5].map((count) => (
                  <option key={count} value={count}>
                    {count} ticket{count > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <div className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4 text-sm">
              <div className="flex items-center justify-between">
                <span>Selected ticket</span>
                <span className="font-semibold">{selectedTicketType?.name || "—"}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span>Total</span>
                <span className="font-semibold">{formatMoney(totalPrice, event.currency || "KES")}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handlePurchase}
              className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold"
            >
              <Ticket size={16} />
              Pay & Get Tickets
            </button>
            {purchaseMessage && (
              <p className="text-sm text-[var(--muted)]">{purchaseMessage}</p>
            )}
            {tickets.length > 0 && (
              <div className="rounded-2xl border border-[var(--glass-border)] bg-white/70 p-4 space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  Tickets issued
                </p>
                {tickets.map((ticketItem) => (
                  <div key={ticketItem.id} className="flex items-center justify-between text-sm">
                    <span>{ticketItem.ticketTypeName}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--button-bg)]">
                      QR {ticketItem.qrCode.slice(0, 8)}
                    </span>
                  </div>
                ))}
                <Link
                  href="/vtix/dashboard/tickets"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--button-bg)]"
                >
                  View My Tickets
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {event.mapEmbedUrl && (
        <div className="glass-panel p-0 overflow-hidden">
          <iframe
            src={event.mapEmbedUrl}
            className="w-full h-72"
            loading="lazy"
            title="Event map"
          />
        </div>
      )}
    </div>
  );
}
