"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { PremiumDashboardShellLoader } from "@/components/dashboard/DashboardLoaders";
import AdminLteShell from "@/components/dashboard/AdminLteShell";
import { LayoutDashboard, CalendarCheck, Ticket, QrCode, Sparkles } from "lucide-react";

export default function VtixLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname() || "";

  const isDashboardRoute = pathname.startsWith("/vtix/dashboard");

  if (!isDashboardRoute) {
    return <div className="min-h-screen bg-[var(--background)]">{children}</div>;
  }

  if (isPending) {
    return <PremiumDashboardShellLoader tone="sky" label="Loading your V-Tix workspace..." />;
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="glass-panel p-6 sm:p-8 max-w-lg text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--accent-2)]">
            <Sparkles size={16} />
            V-Tix Access
          </div>
          <h2 className="text-2xl font-semibold">Sign in to manage your V-Tix events</h2>
          <p className="text-sm text-[var(--muted)]">
            Log in to create events, manage ticket sales, and scan attendees.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/member-login"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold"
            >
              Attendee login
            </Link>
            <Link
              href="/moderator-login"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-[var(--glass-border)] bg-white/70 text-sm font-semibold"
            >
              Organizer login
            </Link>
          </div>
          <Link
            href="/vtix"
            className="inline-flex items-center justify-center text-xs font-semibold text-[var(--button-bg)]"
          >
            Continue to marketplace
          </Link>
        </div>
      </div>
    );
  }

  const roleList = session.user.role
    ? session.user.role.split(",").map((value: string) => value.trim())
    : [];
  const isOrganizer = roleList.includes("moderator") || roleList.includes("admin");

  const navItems = [
    { href: "/vtix/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/vtix/dashboard/events", label: "Events", icon: CalendarCheck },
    { href: "/vtix/dashboard/tickets", label: "Tickets", icon: Ticket },
    { href: "/vtix/dashboard/scanner", label: "Scanner", icon: QrCode },
  ];

  const filteredNav = isOrganizer ? navItems : navItems.filter((item) => item.href !== "/vtix/dashboard/scanner");

  const handleSignOut = async () => {
    await authClient.signOut();
    const role = session.user.role ?? "";
    const organizer = role.split(",").map((value) => value.trim()).includes("moderator");
    router.replace(organizer ? "/moderator-login" : "/member-login");
    router.refresh();
  };

  return (
    <AdminLteShell
      appName="V-Tix"
      appHref="/vtix/dashboard"
      headerKicker="V-Tix Workspace"
      navSections={[{ label: "Ticketing", items: filteredNav }]}
      quickActions={
        isOrganizer
          ? [
              { href: "/vtix/dashboard/events", label: "Create event" },
              { href: "/vtix/dashboard/scanner", label: "Open scanner" },
            ]
          : [{ href: "/vtix/dashboard/tickets", label: "My tickets" }]
      }
      user={{
        primary: session.user.name || session.user.email,
        secondary: isOrganizer ? "Organizer" : "Attendee",
      }}
      onSignOut={handleSignOut}
    >
      {children}
    </AdminLteShell>
  );
}

