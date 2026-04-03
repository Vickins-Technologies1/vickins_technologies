// src/components/AdminLayout.tsx
"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Menu,
  Sun, 
  Moon, 
  LogOut,
  Copyright,
  Mail,
  FileText,
  Compass,
  Boxes,
  Wallet
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Theme toggle with persistence
  const toggleTheme = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setIsDarkMode(!isDarkMode);
  };

  // Load saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      setIsDarkMode(savedTheme === "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auth check – redirect if not authenticated or not admin
  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.push("/login");
      return;
    }

    if (session.user.role !== "admin") {
      router.push("/admin/unauthorized"); // or just "/login"
    }
  }, [session, isPending, router]);

  // Loading state
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-[var(--foreground)] font-medium">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Access denied (non-admin or no session)
  if (!session?.user || session.user.role !== "admin") {
    return null; // Redirect is handled in useEffect
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/walkthrough", label: "Walkthrough", icon: Compass },
    { href: "/admin/inventory", label: "Inventory", icon: Boxes },
    { href: "/admin/finance", label: "Expenses & Cash", icon: Wallet },
    { href: "/admin/quotations", label: "Quotations", icon: FileText },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const activeNav = navItems.find((item) => item.href === pathname);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-[var(--background)] text-[var(--foreground)] antialiased">
      {isMobile && sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
          ${sidebarOpen ? "w-64" : "w-20"} 
          ${isMobile ? "fixed left-0 top-0 z-40 h-screen" : "sticky top-0 h-screen"}
          ${isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
          transition-all duration-300 ease-in-out
          bg-[var(--sidebar-bg)] border-r border-[var(--border)]
          flex flex-col overflow-hidden
          shadow-lg
        `}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-[var(--border)]">
          <h1
            className={`
              font-bold text-xl tracking-tight text-[var(--sidebar-text)]
              ${!sidebarOpen && "hidden"}
            `}
          >
            Admin
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-[var(--hover-bg)] text-[var(--sidebar-text)] transition-colors"
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
                      ${isActive 
                        ? "bg-[var(--primary)]/15 text-[var(--primary)] font-medium shadow-sm" 
                        : "text-[var(--sidebar-text)] hover:bg-[var(--hover-bg)] hover:text-[var(--foreground)]"
                      }
                    `}
                  >
                    <Icon size={20} className="min-w-[20px]" />
                    <span className={`${!sidebarOpen && "hidden"} truncate`}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-[var(--border)] p-4">
          <div className={`flex items-center gap-3 text-xs text-[var(--muted)] ${!sidebarOpen && "justify-center"}`}>
            <Copyright size={14} />
            <span className={`${!sidebarOpen && "hidden"}`}>
              2026 Vickins. All rights reserved.
            </span>
          </div>
          {sidebarOpen && (
            <div className="mt-3 flex items-center gap-2 text-xs text-[var(--muted)]">
              <Mail size={14} />
              <a href="mailto:support@vickins.com" className="hover:text-[var(--primary)] transition-colors">
                support@vickins.com
              </a>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 bg-[var(--card-bg)]/80 backdrop-blur-md border-b border-[var(--border)] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-lg hover:bg-[var(--hover-bg)] text-[var(--foreground)] transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                Admin Panel
              </p>
              <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-[var(--foreground)]">
                {activeNav?.label ?? "Dashboard"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-[var(--hover-bg)] text-[var(--foreground)] transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* User Info & Logout */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="font-medium text-[var(--foreground)]">
                  {session.user.email}
                </p>
                <p className="text-xs text-[var(--muted)] capitalize">
                  {session.user.role}
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="
                  flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 
                  text-white text-sm font-medium rounded-lg 
                  transition-colors shadow-sm
                "
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="relative flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="glow-orb float-slow"
              style={{
                top: "-10%",
                right: "-8%",
                width: "320px",
                height: "320px",
                background: "rgba(56, 189, 248, 0.22)",
              }}
            />
            <div
              className="glow-orb float-slower"
              style={{
                bottom: "-15%",
                left: "-10%",
                width: "360px",
                height: "360px",
                background: "rgba(99, 102, 241, 0.18)",
              }}
            />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
