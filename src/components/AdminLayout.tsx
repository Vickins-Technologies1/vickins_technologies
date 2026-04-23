// src/components/AdminLayout.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { PremiumDashboardShellLoader } from "@/components/dashboard/DashboardLoaders";
import AdminLteShell from "@/components/dashboard/AdminLteShell";
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  Boxes,
  Wallet,
  Briefcase,
  Sparkles,
  Palette,
  Ticket,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.push("/login");
      return;
    }

    if (session.user.role !== "admin") {
      router.push("/admin/unauthorized");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return <PremiumDashboardShellLoader tone="sky" label="Loading admin panel..." />;
  }

  if (!session?.user || session.user.role !== "admin") {
    return null;
  }

  const generalNavItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/work", label: "Work Hub", icon: Briefcase },
    { href: "/admin/portfolio", label: "Portfolio", icon: Palette },
    { href: "/admin/inventory", label: "Inventory", icon: Boxes },
    { href: "/admin/finance", label: "Expenses & Cash", icon: Wallet },
    { href: "/admin/quotations", label: "Quotations", icon: FileText },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const productNavItems = [
    { href: "/admin/chamahub", label: "ChamaHub", icon: Sparkles },
    { href: "/admin/vtix", label: "V-Tix Africa", icon: Ticket },
  ];

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <AdminLteShell
      appName="Admin Suite"
      appHref="/admin"
      headerKicker="Admin Panel"
      navSections={[
        { label: "Overview", items: generalNavItems },
        { label: "Products", items: productNavItems },
      ]}
      quickActions={[
        { href: "/admin/chamahub", label: "Open ChamaHub" },
        { href: "/moderator-signup", label: "Add moderator" },
      ]}
      user={{
        primary: session.user.email,
        secondary: session.user.role,
      }}
      onSignOut={handleSignOut}
    >
      {children}
    </AdminLteShell>
  );
}

