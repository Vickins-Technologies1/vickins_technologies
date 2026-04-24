"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed top-0 left-0 h-full w-72 bg-[var(--navbar-bg)] text-white z-50 p-6 border-r border-[var(--navbar-border)] shadow-[0_18px_45px_rgba(15,23,42,0.22)] backdrop-blur-2xl lg:hidden"
        >
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/12 via-transparent to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 relative z-10"
          >
            <Link href="/" onClick={toggleSidebar} aria-label="Vickins Technologies Home">
              <Image
                src="/logo1.png"
                alt="Vickins Technologies Logo"
                width={90}
                height={36}
                className="w-20 transition-transform duration-300 hover:scale-105"
                sizes="80px"
              />
            </Link>
            <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.34em] opacity-60">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--button-bg)]" />
              Premium Studio
            </div>
            <div className="mt-3 rounded-2xl border border-[var(--navbar-border)] bg-[var(--navbar-surface)] px-3 py-2 text-[10px] uppercase tracking-[0.26em] opacity-75">
              ChamaHub • Groups • Payments
            </div>
          </motion.div>

          <motion.button
            onClick={toggleSidebar}
            aria-label="Close sidebar"
            className="absolute top-4 right-4 inline-flex items-center justify-center p-2 rounded-full border border-[var(--navbar-border)] bg-[var(--navbar-surface)] hover:bg-[var(--navbar-surface-hover)] transition duration-300 z-10"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          <ul className="mt-6 space-y-2.5 relative z-10">
            {["Process", "About", "Services", "Security", "ChamaHub", "Portfolio", "Pricing", "Clients", "Contact"].map((item, index) => (
              <motion.li
                key={item}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.08 * (index + 1), duration: 0.3 }}
                whileHover={{ x: 5 }}
              >
                <Link
                  href={
                    item === "Portfolio"
                      ? "/portfolio"
                      : item === "ChamaHub"
                      ? "/chama"
                      : item === "Security"
                      ? "/vickins-security"
                      : `/#${item.toLowerCase()}`
                  }
                  className="flex items-center justify-between rounded-2xl border border-[var(--navbar-border)] bg-[var(--navbar-surface)] px-4 py-2 text-[10px] uppercase tracking-[0.26em] font-semibold opacity-90 hover:opacity-100 hover:bg-[var(--navbar-surface-hover)] hover:text-[var(--accent-2)] transition duration-300 group"
                  onClick={toggleSidebar}
                >
                  {item}
                  <span className="h-1 w-6 rounded-full bg-[var(--button-bg)] opacity-30 group-hover:opacity-80 transition" />
                </Link>
              </motion.li>
            ))}
          </ul>

          <div className="mt-7 space-y-3 relative z-10">
            <div className="rounded-2xl border border-[var(--navbar-border)] bg-[var(--navbar-surface)] px-4 py-3 text-[10px] uppercase tracking-[0.24em] opacity-75">
              ChamaHub Access
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Link
                href="/chama"
                onClick={toggleSidebar}
                className="inline-flex items-center justify-between rounded-2xl border border-[var(--navbar-border)] bg-[var(--navbar-surface-strong)] px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-semibold opacity-90 hover:opacity-100 hover:bg-[var(--navbar-surface-hover)] hover:text-[var(--accent-2)] transition"
              >
                ChamaHub
                <span className="h-1 w-6 rounded-full bg-[var(--button-bg)] opacity-40" />
              </Link>
              <Link
                href="/member-login"
                onClick={toggleSidebar}
                className="inline-flex items-center justify-between rounded-2xl border border-[var(--navbar-border)] bg-[var(--navbar-surface-strong)] px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-semibold opacity-90 hover:opacity-100 hover:bg-[var(--navbar-surface-hover)] hover:text-[var(--accent-2)] transition"
              >
                Member Login
                <span className="h-1 w-6 rounded-full bg-[var(--button-bg)] opacity-40" />
              </Link>
            </div>
            <Link
              href="/vtix"
              onClick={toggleSidebar}
              className="inline-flex items-center justify-center w-full px-4 py-3 rounded-full bg-[var(--button-bg)] text-white text-[10px] font-semibold uppercase tracking-[0.2em] shadow-lg"
            >
              V-Tix
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
