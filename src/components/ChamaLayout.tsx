"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Menu,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  LogOut,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function ChamaLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setIsDarkMode(!isDarkMode);
  };

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
      if (mobile) setSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-[var(--foreground)] font-medium">Loading your ChamaHub space...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="glass-panel p-6 sm:p-8 max-w-lg text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--button-bg)]">
            <Sparkles size={16} />
            ChamaHub Access
          </div>
          <h2 className="text-2xl font-semibold">Sign in to manage your ChamaHub group</h2>
          <p className="text-sm text-[var(--muted)]">
            Please log in to view your ChamaHub dashboard and member activity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/member-login"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold"
            >
              Member login
            </Link>
            <Link
              href="/moderator-login"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-[var(--glass-border)] bg-white/70 text-sm font-semibold"
            >
              Moderator login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: "/chama", label: "Dashboard", icon: LayoutDashboard },
    { href: "/chama/groups", label: "Groups", icon: Users },
    { href: "/chama/ledger", label: "Contributions", icon: CalendarCheck },
  ];

  const roleList = session?.user?.role
    ? session.user.role.split(",").map((value: string) => value.trim())
    : [];
  const isModerator = roleList.includes("moderator") || roleList.includes("admin");
  const filteredNav = isModerator ? navItems : navItems.filter((item) => item.href !== "/chama/groups");

  const activeNav = filteredNav.find((item) => pathname?.startsWith(item.href));

  const handleSignOut = async () => {
    await authClient.signOut();
    const role = session?.user?.role ?? "";
    const isModerator = role.split(",").map((value) => value.trim()).includes("moderator");
    window.location.href = isModerator ? "/moderator-login" : "/member-login";
  };

  return (
    <div
      className="min-h-screen flex bg-[var(--background)] text-[var(--foreground)] antialiased dashboard-shell"
      data-density="compact"
    >
      {isMobile && sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`
          ${sidebarOpen ? "w-60" : "w-20"}
          ${isMobile ? "fixed left-0 top-0 z-40 h-screen" : "sticky top-0 h-screen"}
          ${isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
          transition-all duration-300 ease-in-out
          bg-[var(--sidebar-bg)]
          flex flex-col overflow-hidden
          shadow-[0_18px_40px_rgba(15,23,42,0.22)]
        `}
      >
        <div className="p-4 flex items-center justify-between">
          <div className={`flex items-center gap-2 ${!sidebarOpen && "hidden"}`}>
            <Image
              src="/chamahub-mark.svg"
              alt="ChamaHub logo"
              width={26}
              height={26}
              className="h-6 w-6"
            />
            <h1 className="font-semibold text-lg tracking-tight">ChamaHub</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-[var(--hover-bg)] text-[var(--sidebar-text)] transition-colors"
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-6">
          <div className={`${!sidebarOpen && "hidden"} rounded-2xl bg-white/55 p-3`}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
              ChamaHub Space
            </p>
            <p className="text-sm font-semibold mt-2 text-[var(--foreground)]">
              {session.user.name || session.user.email}
            </p>
            <p className="text-xs text-[var(--muted)] mt-1">
              {session.user.role?.includes("moderator") ? "Moderator" : "Member"} access
            </p>
          </div>
          <ul className="space-y-1">
            {filteredNav.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      dashboard-nav-link flex items-center gap-3 px-3 py-2.5 rounded-[16px] transition-all duration-200
                      ${isActive
                        ? "dashboard-nav-link--active text-[var(--foreground)] font-semibold"
                        : "text-[var(--sidebar-text)] hover:text-[var(--foreground)]"
                      }
                    `}
                  >
                    <span
                      className={`dashboard-nav-dot ${isActive ? "dashboard-nav-dot--active" : ""}`}
                    />
                    <Icon size={18} className="min-w-[18px] dashboard-icon" />
                    <span className={`${!sidebarOpen && "hidden"} truncate`}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          {isModerator && (
            <div className={`${!sidebarOpen && "hidden"} space-y-2`}>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
                Quick Actions
              </p>
              <Link
                href="/chama"
                className="dashboard-quick-link inline-flex items-center justify-between rounded-2xl px-3 py-2 text-xs font-semibold text-[var(--foreground)]"
              >
                Create Group
                <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </nav>

        <div className="p-4 space-y-3">
          <button
            onClick={handleSignOut}
            className={`w-full group flex items-center gap-2 px-3 py-2.5 rounded-xl border border-rose-200/60 bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 text-white text-sm font-semibold shadow-[0_10px_24px_rgba(244,63,94,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(244,63,94,0.45)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/60 ${!sidebarOpen && "justify-center"}`}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15">
              <LogOut size={16} />
            </span>
            <span className={`${!sidebarOpen && "hidden"}`}>Logout</span>
          </button>
          {sidebarOpen && (
            <div className="space-y-2">
              <div className="rounded-2xl border border-[var(--glass-border)] bg-white/70 px-3 py-3 text-[11px] text-[var(--muted)] leading-relaxed break-words">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--button-bg)]">
                  Security
                </p>
                <p className="mt-2">
                  Secure access for members and moderators with encrypted sessions.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--glass-border)] bg-white/60 px-3 py-2 text-[10px] uppercase tracking-[0.24em] text-[var(--muted)] leading-relaxed break-words">
                © 2026 Vickins Technologies. All rights reserved.
              </div>
            </div>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-14 bg-[var(--card-bg)]/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-5 sticky top-0 z-20 shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
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
                ChamaHub Workspace
              </p>
              <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-[var(--foreground)]">
                {activeNav?.label ?? "Dashboard"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-[var(--hover-bg)] text-[var(--foreground)] transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">{session.user.name || session.user.email}</p>
              <p className="text-xs text-[var(--muted)]">
                {session.user.role?.includes("moderator") ? "Moderator" : "Member"}
              </p>
            </div>
          </div>
        </header>

        <main className="relative flex-1 p-4 sm:p-5 md:p-6 overflow-y-auto">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="glow-orb float-slow"
              style={{
                top: "-10%",
                right: "-8%",
                width: "320px",
                height: "320px",
                background: "rgba(16, 185, 129, 0.18)",
              }}
            />
            <div
              className="glow-orb float-slower"
              style={{
                bottom: "-15%",
                left: "-10%",
                width: "360px",
                height: "360px",
                background: "rgba(56, 189, 248, 0.18)",
              }}
            />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
