"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download, Ticket } from "lucide-react";
import { formatMoney } from "@/lib/vtix-utils";
import TicketPdf from "@/components/vtix/TicketPdf";

type TicketItem = {
  id: string;
  eventTitle: string;
  eventDate: string;
  venue?: string;
  ticketType: string;
  qrCode: string;
  currency?: string;
  price?: number;
};

export default function VtixMyTicketsPage() {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [qrMap, setQrMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/vtix/orders?scope=mine", { cache: "no-store" });
      const data = await response.json();
      setTickets(data.tickets ?? []);
    } catch {
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  useEffect(() => {
    const generateQr = async () => {
      const entries = await Promise.all(
        tickets.map(async (ticket) => {
          try {
            const url = await QRCode.toDataURL(ticket.qrCode);
            return [ticket.id, url] as const;
          } catch {
            return [ticket.id, ""] as const;
          }
        })
      );
      setQrMap(Object.fromEntries(entries));
    };
    if (tickets.length) {
      generateQr();
    }
  }, [tickets]);

  return (
    <div className="space-y-8">
      <section className="glass-panel p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">My tickets</p>
        <h1 className="text-2xl sm:text-3xl font-semibold mt-2">Your V-Tix passes</h1>
        <p className="text-sm text-[var(--muted)] mt-2">
          Present your QR code at the gate for instant validation.
        </p>
      </section>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[0, 1].map((item) => (
            <div key={item} className="glass-panel h-48 shimmer-line" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="glass-panel p-5 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--button-bg)]">
                  <Ticket size={14} />
                  {ticket.ticketType}
                </div>
                <h3 className="text-lg font-semibold">{ticket.eventTitle}</h3>
                <p className="text-xs text-[var(--muted)]">
                  {new Date(ticket.eventDate).toLocaleDateString("en-KE", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  • {ticket.venue || "Venue"}
                </p>
                {ticket.price !== undefined && (
                  <p className="text-sm font-semibold">
                    {formatMoney(ticket.price, ticket.currency || "KES")}
                  </p>
                )}
                <PDFDownloadLink
                  document={
                    <TicketPdf
                      eventTitle={ticket.eventTitle}
                      eventDate={new Date(ticket.eventDate).toLocaleDateString("en-KE", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                      venue={ticket.venue}
                      ticketType={ticket.ticketType}
                      qrDataUrl={qrMap[ticket.id]}
                    />
                  }
                  fileName={`vtix-${ticket.id}.pdf`}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--button-bg)]"
                >
                  <Download size={14} />
                  Download PDF
                </PDFDownloadLink>
              </div>
              <div className="flex items-center justify-center rounded-2xl border border-[var(--glass-border)] bg-white/70 p-3 min-w-[140px] min-h-[140px]">
                {qrMap[ticket.id] ? (
                  <img src={qrMap[ticket.id]} alt="QR code" className="w-28 h-28" />
                ) : (
                  <span className="text-xs text-[var(--muted)]">QR loading</span>
                )}
              </div>
            </div>
          ))}
          {tickets.length === 0 && (
            <div className="glass-panel p-6 text-sm text-[var(--muted)] col-span-full">
              No tickets yet. Purchase a ticket from the marketplace to see it here.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
