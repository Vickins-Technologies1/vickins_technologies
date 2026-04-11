"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarCheck, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { formatMoney } from "@/lib/vtix-utils";

type EventCard = {
  id: string;
  slug: string;
  title: string;
  startsAt: string;
  venueName?: string;
  city?: string;
  country?: string;
  category?: string;
  coverImageUrl?: string;
  organizerName?: string;
  startingPrice: number;
  currency?: string;
};

const categories = [
  "All Categories",
  "Football Matches",
  "Concerts",
  "Cultural Festivals",
  "Theater",
  "Expos",
  "Corporate Events",
  "Worship",
  "Sports",
];

const locations = [
  "All Cities",
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Kampala",
  "Dar es Salaam",
  "Lagos",
  "Accra",
  "Johannesburg",
];

const dateFilters = ["Any date", "This week", "This month", "Upcoming"];
const priceFilters = ["Any price", "Under KES 1,000", "KES 1,000 - 5,000", "Above KES 5,000"];

export default function VtixEventsPage() {
  const [events, setEvents] = useState<EventCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [location, setLocation] = useState(locations[0]);
  const [dateFilter, setDateFilter] = useState(dateFilters[0]);
  const [priceFilter, setPriceFilter] = useState(priceFilters[0]);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/vtix/events?status=published", { cache: "no-store" });
      const data = await response.json();
      setEvents(data.events ?? []);
    } catch {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();
    const now = new Date();
    return events.filter((event) => {
      const matchesSearch = !query || event.title.toLowerCase().includes(query);
      const matchesCategory =
        category === "All Categories" || event.category?.toLowerCase() === category.toLowerCase();
      const matchesLocation =
        location === "All Cities" || event.city?.toLowerCase() === location.toLowerCase();

      const eventDate = new Date(event.startsAt);
      const matchesDate = (() => {
        if (dateFilter === "Any date") return true;
        if (dateFilter === "Upcoming") return eventDate >= now;
        if (dateFilter === "This week") {
          const inSevenDays = new Date(now);
          inSevenDays.setDate(now.getDate() + 7);
          return eventDate >= now && eventDate <= inSevenDays;
        }
        if (dateFilter === "This month") {
          return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
        }
        return true;
      })();

      const matchesPrice = (() => {
        if (priceFilter === "Any price") return true;
        if (priceFilter === "Under KES 1,000") return event.startingPrice < 1000;
        if (priceFilter === "KES 1,000 - 5,000")
          return event.startingPrice >= 1000 && event.startingPrice <= 5000;
        if (priceFilter === "Above KES 5,000") return event.startingPrice > 5000;
        return true;
      })();

      return matchesSearch && matchesCategory && matchesLocation && matchesDate && matchesPrice;
    });
  }, [events, search, category, location, dateFilter, priceFilter]);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden pt-10 pb-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.2),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,_rgba(20,184,166,0.2),_transparent_50%)]" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="glass-panel p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--button-bg)]">
              V-Tix Africa by Vickins Technologies
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold mt-4">
              Book Tickets for Football Matches, Concerts, Festivals & More Across Africa
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted)] mt-4 max-w-3xl">
              Discover curated events, pay securely with M-Pesa or Stripe, and receive instant QR tickets.
            </p>
            <div className="mt-6 flex flex-col lg:flex-row gap-3">
              <div className="flex-1 flex items-center gap-3 rounded-2xl border border-[var(--glass-border)] bg-white/70 px-4 py-3">
                <Search size={18} className="text-[var(--muted)]" />
                <input
                  className="flex-1 bg-transparent text-sm outline-none"
                  placeholder="Search events, artists, teams..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <Link
                href="/vtix/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--button-bg)] text-white px-5 py-3 text-xs sm:text-sm font-semibold"
              >
                Organizer dashboard
                <SlidersHorizontal size={16} />
              </Link>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            <select
              className="glass-input"
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
            >
              {dateFilters.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select
              className="glass-input"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            >
              {locations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select
              className="glass-input"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select
              className="glass-input"
              value={priceFilter}
              onChange={(event) => setPriceFilter(event.target.value)}
            >
              {priceFilters.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14">
        <div className="flex items-center justify-between mt-6 mb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Featured Events</p>
            <h2 className="text-2xl font-semibold mt-2">Explore the marketplace</h2>
          </div>
          <span className="text-xs text-[var(--muted)]">{filteredEvents.length} events</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[0, 1, 2].map((item) => (
              <div key={item} className="glass-panel h-72 shimmer-line" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="glass-panel overflow-hidden flex flex-col shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={event.coverImageUrl || "/bgd.jpg"}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5 space-y-4 flex-1 flex flex-col">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                      {event.category || "Live Event"}
                    </p>
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                  </div>
                  <div className="text-xs text-[var(--muted)] space-y-1">
                    <div className="flex items-center gap-2">
                      <CalendarCheck size={14} />
                      {new Date(event.startsAt).toLocaleDateString("en-KE", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      {event.venueName || "Venue"} • {event.city || "Kenya"}
                    </div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--button-bg)]">
                      {event.organizerName || "V-Tix Partner"}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                        Starts from
                      </p>
                      <p className="text-lg font-semibold">
                        {formatMoney(event.startingPrice, event.currency || "KES")}
                      </p>
                    </div>
                    <Link
                      href={`/vtix/events/${event.slug}`}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[var(--button-bg)] text-white text-xs font-semibold"
                    >
                      Buy Tickets
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {filteredEvents.length === 0 && (
              <div className="glass-panel p-6 text-sm text-[var(--muted)] col-span-full">
                No events match your filters yet. Try adjusting your search.
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
