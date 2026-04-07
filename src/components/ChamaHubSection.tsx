import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  UserGroupIcon,
  WalletIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const highlights = [
  {
    title: "Lease per group",
    description:
      "Each ChamaHub subscription is tied to one chama group, so moderators only pay for the group they manage.",
  },
  {
    title: "Moderator command center",
    description:
      "Invite members, set contribution schedules, and track rotations from a dedicated group dashboard.",
  },
  {
    title: "Member payments",
    description:
      "Members log in to view dues, submit payments, and confirm their payout status at any time.",
  },
];

const accessCards = [
  {
    title: "Moderator Dashboard",
    description: "Create a group lease, invite members, and run the rotation.",
    href: "/chama",
    icon: UserGroupIcon,
  },
  {
    title: "Member Payments",
    description: "Track contributions, receipts, and upcoming payout dates.",
    href: "/chama/ledger",
    icon: WalletIcon,
  },
  {
    title: "Admin Panel",
    description: "Oversee all ChamaHub data, groups, and platform health.",
    href: "/admin",
    icon: ShieldCheckIcon,
  },
];

export default function ChamaHubSection() {
  return (
    <motion.section
      id="chamahub"
      className="py-10 sm:py-14 lg:py-16 mt-16 sm:mt-20 scroll-mt-[80px]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7 }}
    >
      <div className="relative overflow-hidden rounded-[32px] border border-[var(--glass-border)] bg-[var(--card-bg)] shadow-[var(--shadow-soft)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(27,92,255,0.18),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,_rgba(20,184,166,0.2),_transparent_50%)]" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 p-6 sm:p-10">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/60 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--button-bg)]">
              <Image
                src="/chamahub-mark.svg"
                alt="ChamaHub logo mark"
                width={28}
                height={28}
                className="h-6 w-6"
              />
              ChamaHub
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-5">
              Lease the platform per chama group and keep every member in sync.
            </h2>
            <p className="text-sm sm:text-base text-[var(--foreground)]/80 mt-4 max-w-2xl">
              ChamaHub is built for rotating savings groups. Moderators lease one group at a time,
              members get their own payment view, and your main admin panel keeps the full network visible.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {highlights.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/40 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--button-bg)]">
                    {item.title}
                  </p>
                  <p className="text-sm text-[var(--foreground)]/80 mt-2">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/moderator-signup"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--button-bg)] text-white px-5 py-3 text-xs sm:text-sm font-semibold"
              >
                Become a moderator
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/member-login"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-white/80 px-5 py-3 text-xs sm:text-sm font-semibold text-[var(--foreground)]"
              >
                Member login
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {accessCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-2xl border border-[var(--glass-border)] bg-white/70 p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <Icon className="h-5 w-5 text-[var(--button-bg)]" />
                        {card.title}
                      </div>
                      <p className="text-sm text-[var(--muted)] mt-2">{card.description}</p>
                    </div>
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-white/80 px-3 py-2 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--hover-bg)] transition"
                    >
                      Open
                      <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}

            <div className="rounded-2xl border border-[var(--glass-border)] bg-white/70 p-5 sm:p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--button-bg)]">
                Redirect links
              </p>
              <p className="text-sm text-[var(--muted)] mt-2">
                Moderator, member, and admin routes are wired so every role lands in the right
                ChamaHub workspace.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/chama"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--button-bg)] text-white px-4 py-2 text-xs font-semibold"
                >
                  Moderator Dashboard
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
                <Link
                  href="/chama/ledger"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-white/80 px-4 py-2 text-xs font-semibold text-[var(--foreground)]"
                >
                  Member Ledger
                </Link>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-white/80 px-4 py-2 text-xs font-semibold text-[var(--foreground)]"
                >
                  Admin Console
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
