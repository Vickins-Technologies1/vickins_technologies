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
  return (
    <nav className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 mb-3 flex items-center justify-between rounded-2xl border border-white/30 bg-[var(--navbar-bg)]/80 px-3 sm:px-4 py-2 backdrop-blur-2xl shadow-[var(--shadow-tight)]">
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
                className="w-12 sm:w-14"
                sizes="(max-width: 640px) 48px, 56px"
              />
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-[10px] uppercase tracking-[0.38em] text-[var(--navbar-text)]/70">
                  Vickins
                </span>
              </div>
            </motion.div>
          </Link>

          <div className="flex items-center gap-2">
            <ul className="hidden lg:flex items-center gap-1 rounded-full border border-white/40 bg-white/45 px-1 py-1">
              {["Process", "About", "Services", "Portfolio", "Pricing", "Clients"].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    href={item === "Portfolio" ? "/portfolio" : `#${item.toLowerCase()}`}
                    className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.26em] font-semibold text-[var(--navbar-text)]/75 hover:text-[var(--button-bg)] hover:bg-white/70 transition"
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

            <motion.button
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
              className="lg:hidden p-2 hover:bg-white/20 rounded-full transition duration-300"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 7h16 M4 12h10 m-10 5h16" />
              </svg>
            </motion.button>

            <a
              href="#contact"
              className="hidden lg:inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--button-bg)] text-white text-[10px] font-semibold uppercase tracking-[0.2em] shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              Book a Call
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
