'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Moon, 
  LogOut,
  Copyright,
  Mail,
  FileText // New icon for Quotations
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Theme toggle with persistence
  const toggleTheme = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setIsDarkMode(!isDarkMode);
  };

  // Load saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      setIsDarkMode(savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
      setIsDarkMode(true);
    }
  }, []);

  // Auth check
  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/login');
      return;
    }

    if (session.user.role !== 'admin') {
      router.push('/admin/unauthorized');
    }
  }, [session, status, router]);

  if (status === 'loading' || !session || session.user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-[var(--foreground)] font-medium">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/quotations', label: 'Quotations', icon: FileText }, // Added Quotations nav item
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-[var(--background)] text-[var(--foreground)] antialiased">
      {/* Sidebar */}
      <aside
        className={`
          ${sidebarOpen ? 'w-64' : 'w-20'} 
          transition-all duration-300 ease-in-out
          bg-[var(--sidebar-bg)] border-r border-[var(--border)]
          flex flex-col h-screen sticky top-0 overflow-hidden
          shadow-lg
        `}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-[var(--border)]">
          <h1
            className={`
              font-bold text-xl tracking-tight text-[var(--sidebar-text)]
              ${!sidebarOpen && 'hidden'}
            `}
          >
            Admin
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-[var(--hover-bg)] text-[var(--sidebar-text)] transition-colors"
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
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
                        ? 'bg-[var(--primary)]/15 text-[var(--primary)] font-medium shadow-sm' 
                        : 'text-[var(--sidebar-text)] hover:bg-[var(--hover-bg)] hover:text-[var(--foreground)]'
                      }
                    `}
                  >
                    <Icon size={20} className="min-w-[20px]" />
                    <span className={`${!sidebarOpen && 'hidden'} truncate`}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-[var(--border)] p-4">
          <div className={`flex items-center gap-3 text-xs text-[var(--muted)] ${!sidebarOpen && 'justify-center'}`}>
            <Copyright size={14} />
            <span className={`${!sidebarOpen && 'hidden'}`}>
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
        <header className="h-16 bg-[var(--card-bg)]/80 backdrop-blur-md border-b border-[var(--border)] flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            Admin Panel
          </h2>

          <div className="flex items-center gap-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-[var(--hover-bg)] text-[var(--foreground)] transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* User Info & Logout */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium text-[var(--foreground)]">
                  {session.user.email}
                </p>
                <p className="text-xs text-[var(--muted)] capitalize">
                  {session.user.role}
                </p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="
                  flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 
                  text-white text-sm font-medium rounded-lg 
                  transition-colors shadow-sm
                "
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-gradient-to-br from-[var(--background)] to-[var(--background)]/90">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}