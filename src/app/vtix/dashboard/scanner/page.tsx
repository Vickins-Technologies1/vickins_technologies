"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

type VerifyResult = {
  status: "valid" | "invalid" | "used";
  attendee?: string;
  ticketType?: string;
  eventTitle?: string;
};

export default function VtixScannerPage() {
  const [manualCode, setManualCode] = useState("");
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [loading, setLoading] = useState(false);

  const verifyCode = async (code: string) => {
    if (!code) return;
    setLoading(true);
    try {
      const response = await fetch("/api/vtix/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Invalid ticket.");
      setResult(data.result ?? null);
    } catch {
      setResult({ status: "invalid" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let scanner:
      | {
          clear: () => Promise<void>;
          render: (
            onSuccess: (decodedText: string) => void,
            onFailure?: (error: string) => void
          ) => void;
        }
      | null = null;
    const initScanner = async () => {
      try {
        const mod = await import("html5-qrcode");
        if (!document.getElementById("vtix-scanner")) return;
        const Html5QrcodeScanner = mod.Html5QrcodeScanner;
        scanner = new Html5QrcodeScanner(
          "vtix-scanner",
          { fps: 10, qrbox: 220 },
          false
        );
        scanner.render(
          (decodedText: string) => {
            verifyCode(decodedText);
          },
          () => null
        );
      } catch {
        // Camera scanner failed; manual verification stays available.
      }
    };
    initScanner();
    return () => {
      if (scanner) {
        scanner.clear().catch(() => null);
      }
    };
  }, []);

  return (
    <div className="space-y-8">
      <section className="glass-panel p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Ticket scanner</p>
        <h1 className="text-2xl sm:text-3xl font-semibold mt-2">Validate attendees</h1>
        <p className="text-sm text-[var(--muted)] mt-2">
          Scan QR codes using your device camera or verify manually.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="glass-panel p-6 sm:p-7 space-y-4">
          <div id="vtix-scanner" className="rounded-2xl overflow-hidden" />
          <p className="text-xs text-[var(--muted)]">
            If camera access is blocked, use manual verification on the right.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-7 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Manual check</p>
            <h2 className="text-xl font-semibold mt-2">Enter ticket code</h2>
          </div>
          <input
            className="glass-input"
            placeholder="Paste QR code value"
            value={manualCode}
            onChange={(event) => setManualCode(event.target.value)}
          />
          <button
            type="button"
            onClick={() => verifyCode(manualCode)}
            className="inline-flex items-center justify-center w-full px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify ticket"}
          </button>

          {result && (
            <div
              className={`rounded-2xl border p-4 ${
                result.status === "valid"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : result.status === "used"
                  ? "border-amber-200 bg-amber-50 text-amber-700"
                  : "border-rose-200 bg-rose-50 text-rose-700"
              }`}
            >
              <div className="flex items-center gap-2 font-semibold">
                {result.status === "valid" ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                {result.status === "valid"
                  ? "Ticket Valid"
                  : result.status === "used"
                  ? "Ticket Already Used"
                  : "Invalid Ticket"}
              </div>
              {result.attendee && (
                <p className="text-xs mt-2">
                  {result.attendee} • {result.ticketType} • {result.eventTitle}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
