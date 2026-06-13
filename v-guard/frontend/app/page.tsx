import { ArrowRightIcon, BoltIcon, ShieldCheckIcon, CurrencyDollarIcon, ServerStackIcon } from "@heroicons/react/24/outline";
import { ButtonLink } from "../components/ui/button";

const highlights = [
  "HTTP and SOCKS5 proxy support",
  "Dynamic credentials per user",
  "Prepaid credits with Flutterwave",
  "Automatic credit deduction",
];

const features = [
  { icon: ShieldCheckIcon, title: "Role-based access", copy: "Admin and user roles with secure JWT and refresh sessions." },
  { icon: ServerStackIcon, title: "Proxy control", copy: "HTTP/Squid, 3proxy, and Dante-friendly credential generation." },
  { icon: CurrencyDollarIcon, title: "Multi-currency billing", copy: "Accept NGN, KES, GHS, ZAR, USD, and more via Flutterwave." },
  { icon: BoltIcon, title: "Instant crediting", copy: "Webhook-verified top-ups update credits with no manual steps." },
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-5 py-6 text-[var(--foreground)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="glass-strong panel relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(var(--accent-sky-rgb),0.15),transparent_30%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="panel-title">V-Guard control plane</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold sm:text-5xl lg:text-6xl">
                Glassy, premium proxy management for serious teams.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
                Manage prepaid proxy access, rate limits, usage deductions, and Flutterwave-powered payments from one
                clean dashboard.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {highlights.map((item) => (
                  <span key={item} className="rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.05)] px-4 py-2 text-sm text-[var(--foreground)]/90">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/dashboard">
                  Open Dashboard
                  <ArrowRightIcon className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="https://v-guard.vickinstechnologies.com" variant="secondary">
                  Launch live site
                </ButtonLink>
              </div>
            </div>

            <div className="glass panel overflow-hidden p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className="rounded-3xl border border-[var(--border)] bg-[rgba(255,255,255,0.06)] p-4">
                      <Icon className="h-6 w-6 text-[var(--accent-sky)]" />
                      <h2 className="mt-4 text-lg font-semibold">{feature.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{feature.copy}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
