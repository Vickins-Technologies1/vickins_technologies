import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

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
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed top-0 left-0 h-full w-56 sm:w-64 lg:w-72 bg-[var(--navbar-bg)] text-[var(--navbar-text)] z-50 p-4 sm:p-6 lg:p-8 shadow-[4px_0_8px_rgba(0,0,0,0.2)] backdrop-blur-sm bg-opacity-95 lg:hidden"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 sm:mb-6 lg:mb-8"
          >
            <Link href="/" onClick={toggleSidebar} aria-label="Vickins Technologies Home">
              <Image
                src={isDarkMode ? '/logo1.png' : '/logo2.png'}
                alt="Vickins Technologies Logo"
                width={80}
                height={32}
                className="w-14 sm:w-16 lg:w-20 transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 640px) 56px, (max-width: 1024px) 64px, 80px"
              />
            </Link>
          </motion.div>

          <motion.button
            onClick={toggleSidebar}
            aria-label="Close sidebar"
            className="absolute top-4 sm:top-5 right-4 sm:right-5 p-1.5 sm:p-2 hover:bg-[var(--card-bg)] hover:bg-opacity-30 rounded-full transition duration-300"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <svg className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          <ul className="mt-4 sm:mt-6 lg:mt-8 space-y-3 sm:space-y-4 lg:space-y-5">
            {['Process', 'About', 'Services', 'Portfolio', 'Pricing', 'Clients', 'Contact'].map((item, index) => (
              <motion.li
                key={item}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * (index + 1), duration: 0.3 }}
                whileHover={{ x: 5 }}
              >
                <Link
                  href={item === 'Portfolio' ? '/portfolio' : `#${item.toLowerCase()}`}
                  className="relative text-sm sm:text-base lg:text-lg font-semibold tracking-wide text-[var(--navbar-text)] hover:text-[var(--button-bg)] transition duration-300 group"
                  onClick={toggleSidebar}
                >
                  {item}
                  <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[var(--button-bg)] transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}