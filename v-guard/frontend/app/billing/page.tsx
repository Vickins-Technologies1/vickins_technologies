"use client";

import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardStrong } from "../../components/ui/card";
import { createCheckout, loadPlans } from "../../lib/api";
import type { ProxyPlan, PaymentIntent } from "../../lib/types";

function formatMoney(plan: ProxyPlan) {
  return `${plan.currency} ${(plan.priceMinorUnits / 100).toLocaleString()}`;
}

export default function BillingPage() {
  const [plans, setPlans] = useState<ProxyPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyPlan, setBusyPlan] = useState<string | null>(null);
  const [checkout, setCheckout] = useState<PaymentIntent | null>(null);

  useEffect(() => {
    let mounted = true;
    async function run() {
      try {
        const result = await loadPlans();
        if (mounted) setPlans(result);
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : "Failed to load plans");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    void run();
    return () => {
      mounted = false;
    };
  }, []);

  async function handleCheckout(planId: string) {
    setBusyPlan(planId);
    setError(null);
    try {
      const response = await createCheckout(planId);
      const intent = response.data as PaymentIntent;
      setCheckout(intent);
      window.location.href = intent.flutterwaveLink;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setBusyPlan(null);
    }
  }

  return (
    <main className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <CardStrong className="p-6 sm:p-8">
          <p className="panel-title">Billing</p>
          <h1 className="mt-3 text-3xl font-semibold">Buy credits with Flutterwave</h1>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            Pick a plan, pay in your preferred African currency or USD, and get your account credited immediately
            once Flutterwave confirms the transaction.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {["NGN", "KES", "GHS", "ZAR", "USD"].map((currency) => (
              <span
                key={currency}
                className="rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.05)] px-3 py-1 text-xs font-semibold text-[var(--foreground)]"
              >
                {currency}
              </span>
            ))}
          </div>

          {error ? (
            <div className="mt-6 rounded-3xl border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.08)] p-4 text-sm text-red-100">
              {error}
            </div>
          ) : null}

          {checkout ? (
            <div className="mt-6 rounded-3xl border border-[rgba(var(--accent-rgb),0.25)] bg-[rgba(var(--accent-rgb),0.08)] p-4 text-sm text-[var(--foreground)]">
              Checkout created for reference <span className="font-semibold">{checkout.reference}</span>. You will be
              redirected to Flutterwave now.
            </div>
          ) : null}

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {loading ? (
              <Card className="p-5 text-sm text-[var(--muted)] md:col-span-3">Loading pricing tiers...</Card>
            ) : (
              plans.map((plan) => (
                <Card key={plan.id} className={`p-5 ${plan.isPopular ? "border-[rgba(var(--accent-rgb),0.32)] bg-[rgba(255,255,255,0.08)]" : ""}`}>
                  <p className="panel-title">{plan.name}</p>
                  <h2 className="mt-3 text-2xl font-semibold">{formatMoney(plan)}</h2>
                  <p className="mt-2 text-sm text-[var(--muted)]">{plan.credits} credits</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">{plan.bandwidthBytes / (1024 * 1024 * 1024)} GB bandwidth</p>
                  <p className="mt-4 text-sm text-[var(--muted)]">{plan.description}</p>
                  <Button
                    className="mt-6 w-full"
                    onClick={() => void handleCheckout(plan.id)}
                    disabled={busyPlan === plan.id}
                  >
                    {busyPlan === plan.id ? "Opening Flutterwave..." : "Pay with Flutterwave"}
                  </Button>
                </Card>
              ))
            )}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <Card className="p-5">
              <p className="panel-title">How it works</p>
              <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                <li>1. Select a credit pack.</li>
                <li>2. Pay securely via Flutterwave checkout.</li>
                <li>3. Webhook confirmation credits your account instantly.</li>
              </ul>
            </Card>
            <Card className="p-5">
              <p className="panel-title">Need a custom deal?</p>
              <p className="mt-4 text-sm text-[var(--muted)]">
                Enterprise customers can contact Vickins Technologies for custom bandwidth, longer validity, and
                dedicated proxy pools.
              </p>
            </Card>
          </div>
        </CardStrong>
      </div>
    </main>
  );
}
