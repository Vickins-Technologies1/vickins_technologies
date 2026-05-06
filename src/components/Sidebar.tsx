"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "./ThemePreloaderProvider";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const { isDarkMode, toggleTheme } = useTheme();
  const navItems = [
    { label: "Home", href: "/#home" },
    { label: "Services", href: "/#services" },
    { label: "Products", href: "/#products" },
    { label: "Work", href: "/#work" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Security", href: "/#security" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 lg:hidden"
          aria-modal="true"
          role="dialog"
        >
          <motion.button
            aria-label="Close menu"
            onClick={toggleSidebar}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            className="absolute right-0 top-0 h-full w-[86vw] max-w-[380px] border-l border-white/12 bg-[rgba(2,8,23,0.86)] text-white shadow-2xl backdrop-blur-2xl"
          >
            <div className="relative h-full px-5 py-5">
              <div className="flex items-center justify-between">
                <Link href="/" onClick={toggleSidebar} aria-label="Vickins Technologies Home">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/logo1.png"
                      alt="Vickins Technologies Logo"
                      width={90}
                      height={36}
                      className="w-14"
                      sizes="56px"
                    />
                    <div className="leading-tight">
                      <p className="text-[10px] uppercase tracking-[0.34em] text-white/70">
                        Vickins
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">
                        Technologies
                      </p>
                    </div>
                  </div>
                </Link>

                <button
                  onClick={toggleSidebar}
                  aria-label="Close menu"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 hover:bg-white/10 transition"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">Theme</p>
                <button
                  onClick={toggleTheme}
                  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition"
                >
                  {isDarkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
                </button>
              </div>

              <ul className="mt-5 space-y-2">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ x: 14, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * index, duration: 0.25 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-[10px] uppercase tracking-[0.28em] font-semibold text-white/85 hover:text-white hover:bg-white/10 transition"
                      onClick={toggleSidebar}
                    >
                      {item.label}
                      <span className="h-1 w-6 rounded-full bg-white/15" />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-6 space-y-2">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/55 px-1">
                  Products
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/chama"
                    onClick={toggleSidebar}
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-[10px] uppercase tracking-[0.24em] font-semibold text-white/80 hover:bg-white/10 transition text-center"
                  >
                    ChamaHub
                  </Link>
                  <Link
                    href="/vtix"
                    onClick={toggleSidebar}
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-[10px] uppercase tracking-[0.24em] font-semibold text-white/80 hover:bg-white/10 transition text-center"
                  >
                    V-Tix
                  </Link>
                </div>
              </div>

              <div className="absolute bottom-5 left-5 right-5 space-y-2">
                <Link
                  href="/#contact"
                  onClick={toggleSidebar}
                  className="flex items-center justify-center gap-2 rounded-full border border-[rgba(240,176,16,0.35)] bg-[rgba(240,176,16,0.14)] px-4 py-3 text-[10px] uppercase tracking-[0.26em] font-semibold text-[var(--accent)] hover:bg-[rgba(240,176,16,0.18)] transition"
                >
                  Schedule Consultation
                </Link>
                <Link
                  href="/vickins-security"
                  onClick={toggleSidebar}
                  className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-[10px] uppercase tracking-[0.26em] font-semibold text-white/80 hover:bg-white/10 transition"
                >
                  Vickins Security
                </Link>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
