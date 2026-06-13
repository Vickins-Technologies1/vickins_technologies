import Link from "next/link";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[260px_1fr]">
        <aside className="glass-strong panel p-5">
          <p className="panel-title">V-Guard</p>
          <h2 className="mt-3 text-2xl font-semibold">Admin console</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Secure proxy operations, credit management, billing, and analytics in one place.
          </p>
          <nav className="mt-6 grid gap-2 text-sm">
            {["Overview", "Users", "Plans", "Billing", "Usage", "Logs"].map((item) => (
              <a
                key={item}
                href="#"
                className="rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.05)] px-4 py-3 transition hover:bg-[rgba(255,255,255,0.08)]"
              >
                {item}
              </a>
            ))}
          </nav>
          <Link
            href="/login"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white"
          >
            Sign in
          </Link>
        </aside>
        <section>{children}</section>
      </div>
    </main>
  );
}
