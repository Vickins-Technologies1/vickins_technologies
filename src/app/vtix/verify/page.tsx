"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

type VerifyResult = {
  status: "valid" | "invalid" | "used";
  attendee?: string;
  ticketType?: string;
  eventTitle?: string;
};

export default function VtixVerifyPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [loading, setLoading] = useState(false);

  const verifyCode = async () => {
    setLoading(true);
    setResult(null);
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

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="glass-panel p-6 sm:p-8 space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            V-Tix Verification
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold mt-2">Verify a ticket</h1>
          <p className="text-sm text-[var(--muted)] mt-2">
            Paste a ticket QR code value to confirm its validity.
          </p>
        </div>
        <input
          className="glass-input"
          placeholder="Ticket code"
          value={code}
          onChange={(event) => setCode(event.target.value)}
        />
        <button
          type="button"
          onClick={verifyCode}
          className="inline-flex items-center justify-center w-full px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Ticket"}
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
  );
}
