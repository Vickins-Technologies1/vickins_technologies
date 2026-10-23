"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import BrandLogo from "./BrandLogo";
import {
  ArrowUpRightIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  CubeIcon,
  HomeIcon,
  ShieldCheckIcon,
  TagIcon,
  WrenchScrewdriverIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const navItems = [
  { label: "Home", href: "/#home", icon: HomeIcon },
  { label: "Services", href: "/#services", icon: WrenchScrewdriverIcon },
  { label: "Enterprise", href: "/#enterprise", icon: BuildingOffice2Icon },
  { label: "Products", href: "/#products", icon: CubeIcon },
  { label: "Work", href: "/#work", icon: BriefcaseIcon },
  { label: "Pricing", href: "/#pricing", icon: TagIcon },
  { label: "Security", href: "/#security", icon: ShieldCheckIcon },
  { label: "Contact", href: "/#contact", icon: ChatBubbleLeftRightIcon },
];

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const reduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousOverscrollBehavior = document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        toggleSidebar();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overscrollBehavior = previousOverscrollBehavior;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, toggleSidebar]);

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
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.18 }}
        >
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={toggleSidebar}
            tabIndex={-1}
            className="absolute inset-0 cursor-default bg-slate-950/55 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
          />

          <motion.aside
            id="mobile-navigation-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 360, damping: 34, mass: 0.85 }
            }
            className="absolute inset-y-0 right-0 flex h-full w-[min(88vw,380px)] flex-col border-l border-[var(--navbar-border)] bg-[var(--sidebar-bg)] text-[var(--sidebar-text)] shadow-[var(--shadow-soft)] backdrop-blur-2xl"
          >
            <div className="flex min-h-0 flex-1 flex-col px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-[calc(1rem+env(safe-area-inset-top))] sm:px-5">
              <header className="flex shrink-0 items-center justify-between gap-4 border-b border-[var(--navbar-border)] pb-4">
                <Link href="/" onClick={toggleSidebar} aria-label="Vickins Technologies Home" className="min-w-0">
                  <div className="flex items-center gap-3">
                    <BrandLogo size={56} className="h-14 w-14" />
                    <div className="min-w-0 leading-tight">
                      <p className="truncate text-[10px] uppercase tracking-[0.34em] text-[var(--sidebar-text)]/75">
                        Vickins
                      </p>
                      <p className="truncate text-[10px] uppercase tracking-[0.22em] text-[var(--sidebar-text)]/55">
                        Technologies
                      </p>
                    </div>
                  </div>
                </Link>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={toggleSidebar}
                  aria-label="Close menu"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--navbar-border)] bg-[var(--navbar-surface)] text-[var(--sidebar-text)] transition hover:bg-[var(--navbar-surface-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </header>

              <div
                data-lenis-prevent
                className="mobile-sidebar-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1"
              >
                <div className="pt-5">
                  <h2 id="mobile-menu-title" className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--sidebar-text)]/55">
                    Navigate
                  </h2>

                  <ul className="mt-3 space-y-1.5" aria-label="Main navigation">
                    {navItems.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = activeId === item.href.replace("/#", "");

                      return (
                        <motion.li
                          key={item.label}
                          initial={{ x: reduceMotion ? 0 : 14, opacity: reduceMotion ? 1 : 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: reduceMotion ? 0 : 0.04 * index, duration: reduceMotion ? 0 : 0.22 }}
                        >
                          <Link
                            href={item.href}
                            aria-current={isActive ? "page" : undefined}
                            onClick={toggleSidebar}
                            className={[
                              "group flex min-h-12 w-full items-center gap-3 rounded-2xl border px-3.5 py-2.5 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                              isActive
                                ? "border-[rgba(var(--accent-rgb),0.32)] bg-[rgba(var(--accent-rgb),0.1)] text-[var(--sidebar-text)]"
                                : "border-transparent text-[var(--sidebar-text)]/78 hover:border-[var(--navbar-border)] hover:bg-[var(--navbar-surface)] hover:text-[var(--sidebar-text)]",
                            ].join(" ")}
                          >
                            <span
                              className={[
                                "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition",
                                isActive
                                  ? "border-[rgba(var(--accent-rgb),0.32)] bg-[rgba(var(--accent-rgb),0.12)] text-[var(--accent)]"
                                  : "border-[var(--navbar-border)] bg-[var(--navbar-surface)] text-[var(--sidebar-text)]/55 group-hover:text-[var(--accent)]",
                              ].join(" ")}
                            >
                              <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} aria-hidden="true" />
                            </span>
                            <span className="flex-1 text-[11px] font-semibold uppercase tracking-[0.22em]">
                              {item.label}
                            </span>
                            <ChevronRightIcon
                              className="h-4 w-4 shrink-0 text-[var(--sidebar-text)]/28 transition group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                              aria-hidden="true"
                            />
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>

                <section className="mt-7 border-t border-[var(--navbar-border)] pt-5" aria-labelledby="mobile-products-title">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <h2 id="mobile-products-title" className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--sidebar-text)]/55">
                        Product suite
                      </h2>
                      <p className="mt-1 text-xs text-[var(--sidebar-text)]/52">Systems built for daily operations.</p>
                    </div>
                    <CubeIcon className="h-5 w-5 text-[var(--accent)]/70" aria-hidden="true" />
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Link
                      href="/chama"
                      onClick={toggleSidebar}
                      className="group flex min-h-16 flex-col justify-between rounded-2xl border border-[var(--navbar-border)] bg-[var(--navbar-surface)] p-3 transition hover:border-[rgba(var(--accent-rgb),0.3)] hover:bg-[var(--navbar-surface-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sidebar-text)]/75">ChamaHub</span>
                      <ArrowUpRightIcon className="h-4 w-4 text-[var(--accent)]/70 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </Link>
                    <Link
                      href="/vtix"
                      onClick={toggleSidebar}
                      className="group flex min-h-16 flex-col justify-between rounded-2xl border border-[var(--navbar-border)] bg-[var(--navbar-surface)] p-3 transition hover:border-[rgba(var(--accent-rgb),0.3)] hover:bg-[var(--navbar-surface-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sidebar-text)]/75">V-Tix</span>
                      <ArrowUpRightIcon className="h-4 w-4 text-[var(--accent)]/70 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </Link>
                  </div>
                </section>
              </div>

              <footer className="shrink-0 space-y-2 border-t border-[var(--navbar-border)] pt-4">
                <Link
                  href="/#contact"
                  onClick={toggleSidebar}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-[rgba(var(--accent-rgb),0.4)] bg-[rgba(var(--accent-rgb),0.13)] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)] transition hover:bg-[rgba(var(--accent-rgb),0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] dark:text-white"
                >
                  Book Strategy Call
                  <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/vickins-security"
                  onClick={toggleSidebar}
                  className="flex min-h-12 items-center justify-center rounded-full border border-[var(--navbar-border)] bg-[var(--navbar-surface)] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--sidebar-text)]/78 transition hover:bg-[var(--navbar-surface-hover)] hover:text-[var(--sidebar-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  Vickins Security
                </Link>
              </footer>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
