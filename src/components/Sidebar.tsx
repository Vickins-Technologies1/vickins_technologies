import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  isDarkMode: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, isDarkMode, toggleSidebar }: SidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed top-0 left-0 h-full w-64 bg-[var(--navbar-bg)]/95 text-[var(--navbar-text)] z-50 p-6 shadow-[12px_0_40px_rgba(0,0,0,0.2)] backdrop-blur-2xl border-r border-white/30 lg:hidden"
        >
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/35 via-transparent to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 relative z-10"
          >
            <Link href="/" onClick={toggleSidebar} aria-label="Vickins Technologies Home">
              <Image
                src={isDarkMode ? "/logo1.png" : "/logo2.png"}
                alt="Vickins Technologies Logo"
                width={90}
                height={36}
                className="w-20 transition-transform duration-300 hover:scale-105"
                sizes="80px"
              />
            </Link>
            <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.34em] text-[var(--navbar-text)]/60">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--button-bg)]" />
              Premium Studio
            </div>
          </motion.div>

          <motion.button
            onClick={toggleSidebar}
            aria-label="Close sidebar"
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition duration-300 z-10"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          <ul className="mt-6 space-y-2.5 relative z-10">
            {["Process", "About", "Services", "Portfolio", "Pricing", "Clients", "Contact"].map((item, index) => (
              <motion.li
                key={item}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.08 * (index + 1), duration: 0.3 }}
                whileHover={{ x: 5 }}
              >
                <Link
                  href={item === "Portfolio" ? "/portfolio" : `#${item.toLowerCase()}`}
                  className="flex items-center justify-between rounded-full border border-white/30 bg-white/40 px-4 py-2 text-[10px] uppercase tracking-[0.26em] font-semibold text-[var(--navbar-text)]/80 hover:text-[var(--button-bg)] hover:bg-white/70 transition duration-300 group"
                  onClick={toggleSidebar}
                >
                  {item}
                  <span className="h-1 w-6 rounded-full bg-[var(--button-bg)]/30 group-hover:bg-[var(--button-bg)]/80 transition" />
                </Link>
              </motion.li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={toggleSidebar}
            className="mt-8 inline-flex items-center justify-center w-full px-4 py-3 rounded-full bg-[var(--button-bg)] text-white text-[10px] font-semibold uppercase tracking-[0.2em] shadow-lg relative z-10"
          >
            Book a Call
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
