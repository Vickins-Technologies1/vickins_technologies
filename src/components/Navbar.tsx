"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { useTheme } from "./ThemePreloaderProvider";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const { isDarkMode, toggleTheme } = useTheme();
  const navItems = useMemo(() => [
    { label: "Home", href: "/#home" },
    { label: "Services", href: "/#services" },
    { label: "Products", href: "/#products" },
    { label: "Work", href: "/#work" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Security", href: "/#security" },
    { label: "Contact", href: "/#contact" },
  ], []);

  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 12);
  });

  const [activeId, setActiveId] = useState("home");
  useEffect(() => {
    const ids = navItems.map((item) => item.href.replace("/#", ""));
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0.05, 0.12, 0.2] }
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [navItems]);

  return (
    <nav className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          animate={{
            backgroundColor: isScrolled ? "var(--navbar-bg)" : "rgba(0,0,0,0)",
            borderColor: isScrolled ? "var(--navbar-border)" : "rgba(0,0,0,0)",
            boxShadow: isScrolled ? "var(--shadow-tight)" : "0 0 0 rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.25 }}
          className="mt-3 mb-2 rounded-[20px] border px-3 sm:px-4 py-2 text-[var(--navbar-text)] backdrop-blur-2xl"
        >
          <div className="grid grid-cols-[1fr_auto] lg:grid-cols-[auto_1fr_auto] items-center gap-3">
            <div className="flex items-center justify-between gap-3 lg:justify-start">
              <Link href="/" aria-label="Vickins Technologies Home">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="flex items-center gap-3"
                >
                  <Image
                    src="/logo1.png"
                    alt="Vickins Technologies Logo"
                    width={70}
                    height={28}
                    className="w-10 sm:w-11"
                    sizes="(max-width: 640px) 44px, 48px"
                  />
                  <div className="hidden sm:flex flex-col leading-tight">
                    <span className="text-[10px] uppercase tracking-[0.32em] opacity-75">
                      Vickins
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.24em] opacity-55">
                      Technologies
                    </span>
                  </div>
                </motion.div>
              </Link>

              <motion.button
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
                className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-full border border-[var(--navbar-border)] bg-[var(--navbar-surface)] hover:bg-[var(--navbar-surface-hover)] transition"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 380, damping: 18 }}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.6}
                    d="M4 7h16 M4 12h10 m-10 5h16"
                  />
                </svg>
              </motion.button>
            </div>

            <ul className="hidden lg:flex items-center justify-center gap-0.5 rounded-full border border-[var(--navbar-border)] bg-[var(--navbar-surface)] px-1.5 py-1">
              {navItems.map((item) => (
                <motion.li
                  key={item.label}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    href={item.href}
                    aria-current={activeId === item.href.replace("/#", "") ? "page" : undefined}
                    className={[
                      "inline-flex items-center rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.26em] font-semibold transition",
                      activeId === item.href.replace("/#", "")
                        ? "bg-[var(--navbar-surface-strong)] text-[var(--accent-2)]"
                        : "opacity-85 hover:opacity-100 hover:text-[var(--accent-2)] hover:bg-[var(--navbar-surface-hover)]",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="flex items-center justify-end gap-2">
              <motion.button
                onClick={toggleTheme}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                className="hidden sm:inline-flex items-center justify-center h-9 w-9 rounded-full border border-[var(--navbar-border)] bg-[var(--navbar-surface)] hover:bg-[var(--navbar-surface-hover)] transition"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 380, damping: 18 }}
              >
                <AnimatePresence mode="wait">
                  {isDarkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <SunIcon className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MoonIcon className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <Link
                href="/#contact"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(212,175,55,0.45)] bg-[rgba(212,175,55,0.14)] text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-2)] hover:bg-[rgba(212,175,55,0.18)] transition"
              >
                Schedule Consultation
                <span className="h-1 w-6 rounded-full bg-[var(--accent)]/80" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
