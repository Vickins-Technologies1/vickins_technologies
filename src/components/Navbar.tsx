import Link from "next/link";
import Image from "next/image";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

export default function Navbar({ isDarkMode, toggleTheme, toggleSidebar }: NavbarProps) {
  const navItems = ["Process", "About", "Services", "Security", "Portfolio", "Pricing", "Clients"];

  return (
    <nav className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 mb-3 rounded-[28px] bg-[var(--navbar-bg)]/75 px-4 sm:px-5 py-3 backdrop-blur-2xl shadow-[var(--shadow-tight)]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex items-center justify-between gap-3">
              <Link href="/" aria-label="Vickins Technologies Home">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="flex items-center gap-3"
                >
                  <Image
                    src={isDarkMode ? "/logo1.png" : "/logo2.png"}
                    alt="Vickins Technologies Logo"
                    width={70}
                    height={28}
                    className="w-11 sm:w-12"
                    sizes="(max-width: 640px) 48px, 56px"
                  />
                  <div className="hidden sm:flex flex-col leading-tight">
                    <span className="text-[10px] uppercase tracking-[0.34em] text-[var(--navbar-text)]/70">
                      Vickins
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--navbar-text)]/55">
                      Digital Studio
                    </span>
                  </div>
                </motion.div>
              </Link>

              <motion.button
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
                className="lg:hidden p-2 hover:bg-white/20 rounded-full transition duration-300"
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

            <div className="flex items-center justify-between lg:justify-end gap-2">
              <ul className="hidden lg:flex items-center gap-1 rounded-full border border-white/40 bg-white/50 px-2 py-1">
                {navItems.map((item) => (
                  <motion.li
                    key={item}
                    whileHover={{ y: -1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Link
                      href={
                        item === "Portfolio"
                          ? "/portfolio"
                          : item === "Security"
                          ? "/vickins-security"
                          : `/#${item.toLowerCase()}`
                      }
                      className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.26em] font-semibold text-[var(--navbar-text)]/80 hover:text-[var(--button-bg)] hover:bg-white/70 transition"
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                onClick={toggleTheme}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                className="p-2 hover:bg-white/20 rounded-full transition duration-300"
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
                href="/chama"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/60 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--navbar-text)]/80 hover:text-[var(--button-bg)] hover:bg-white/80 transition"
              >
                ChamaHub
              </Link>

              <Link
                href="/vtix"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--button-bg)] text-white text-[10px] font-semibold uppercase tracking-[0.2em] shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                V-Tix
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
