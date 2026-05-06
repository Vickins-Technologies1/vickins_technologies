import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon, CpuChipIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";

const chamaHighlights = [
  {
    title: "Lease per group",
    description: "Moderators activate one group at a time with a clean, predictable subscription model.",
  },
  {
    title: "Moderator tools",
    description: "Invite members, schedule rotations, and keep every payout on track.",
  },
  {
    title: "Member ledger",
    description: "Members track contributions and upcoming payouts from one place.",
  },
];

const vtixHighlights = [
  {
    title: "Event marketplace",
    description: "Publish football matches, concerts, and festivals with instant ticket discovery.",
  },
  {
    title: "QR ticketing",
    description: "Issue secure QR tickets with real-time validation for every attendee.",
  },
  {
    title: "M-Pesa + Stripe",
    description: "Collect payments fast with Kenya-first checkout flows and global fallback.",
  },
];

const productTracks = [
  {
    title: "Custom Platforms",
    description: "Web and mobile platforms built to launch, modernize, and scale operations.",
    icon: RocketLaunchIcon,
    tags: ["Web", "Mobile", "Subscription"],
  },
  {
    title: "Automation Suites",
    description: "Workflow automation, AI copilots, and analytics maintained for reliable scale.",
    icon: CpuChipIcon,
    tags: ["Integrations", "AI", "Insights"],
  },
];

export default function ProductsSection() {
  return (
    <motion.section
      id="products"
      className="py-8 sm:py-10 lg:py-12 -mt-2 scroll-mt-[96px]"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7 }}
    >
      <div className="relative overflow-hidden rounded-[36px] border border-[var(--glass-border)] bg-[var(--card-bg)] shadow-[var(--shadow-soft)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,80,240,0.18),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,_rgba(240,176,16,0.18),_transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="relative z-10 p-5 sm:p-7">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Products</p>
              <h2 className="text-2xl sm:text-3xl font-semibold mt-3">
                Vickins-built platforms, shipped and maintained in-house.
              </h2>
              <p className="text-[15px] text-[var(--foreground)]/78 mt-3 max-w-2xl">
                ChamaHub and V‑Tix are live products we run day to day. The same team can build yours.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/chama"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--button-bg)] text-white px-4 py-2.5 text-xs font-semibold"
              >
                Open ChamaHub
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/vtix"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface)] px-4 py-2.5 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--glass-surface-strong)] transition"
              >
                Open V-Tix Africa
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-5">
              <div className="glass-panel p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-3 rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface)] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
                    <Image
                      src="/chamahub-mark.svg"
                      alt="ChamaHub logo mark"
                      width={28}
                      height={28}
                      className="h-6 w-6"
                    />
                    ChamaHub
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/60">
                    Flagship platform
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mt-5">
                  Rotating savings groups, coordinated from one place.
                </h3>
                <p className="text-[15px] text-[var(--foreground)]/78 mt-3 max-w-2xl">
                  Moderators manage rotations, members track contributions, and every payout stays visible.
                </p>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {chamaHighlights.map((highlight) => (
                    <div
                      key={highlight.title}
                      className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-4"
                    >
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
                        {highlight.title}
                      </p>
                      <p className="text-sm text-[var(--foreground)]/75 mt-2">
                        {highlight.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/chama"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--button-bg)] text-white px-4 py-2 text-xs font-semibold"
                  >
                    Moderator Dashboard
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/chama/ledger"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface)] px-4 py-2 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--glass-surface-strong)] transition"
                  >
                    Member Ledger
                  </Link>
                </div>
              </div>

              <div className="glass-panel p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-3 rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface)] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
                    <Image
                      src="/logo1.png"
                      alt="V-Tix Africa logo"
                      width={28}
                      height={28}
                      className="h-6 w-6"
                    />
                    V-Tix Africa
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/60">
                    Event Ticketing Platform
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold mt-5">
                  Event Ticketing & Booking Platform for Africa.
                </h3>
                <p className="text-[15px] text-[var(--foreground)]/78 mt-3 max-w-2xl">
                  Power football matches, concerts, festivals, and corporate events with mobile-first ticketing.
                </p>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {vtixHighlights.map((highlight) => (
                    <div
                      key={highlight.title}
                      className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-4"
                    >
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
                        {highlight.title}
                      </p>
                      <p className="text-sm text-[var(--foreground)]/75 mt-2">
                        {highlight.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/vtix"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--button-bg)] text-white px-4 py-2 text-xs font-semibold"
                  >
                    Open V-Tix Africa
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/vtix/dashboard"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface)] px-4 py-2 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--glass-surface-strong)] transition"
                  >
                    Organizer Dashboard
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {productTracks.map((track) => {
                const Icon = track.icon;
                return (
                  <div
                    key={track.title}
                    className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-5 sm:p-6"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Icon className="h-5 w-5 text-[var(--button-bg)]" />
                      {track.title}
                    </div>
                    <p className="text-sm text-[var(--muted)] mt-3">{track.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {track.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface-muted)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--foreground)]/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

