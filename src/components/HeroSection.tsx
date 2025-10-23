import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="home"
      className="text-center mb-8 sm:mb-16 relative overflow-hidden bg-gradient-to-br from-[var(--navbar-bg)] to-[var(--button-bg)] text-[var(--navbar-text)] p-8 sm:p-16 rounded-xl shadow-2xl"
    >
      <div className="absolute inset-0 opacity-20 bg-repeat"></div>
      <h2 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 relative z-10">Igniting Success with Innovative Technology</h2>
      <p className="text-lg sm:text-xl mb-6 sm:mb-8 relative z-10">Transform your business with state-of-the-art solutions and unparalleled expertise.</p>
      <a href="#services" className="bg-[var(--card-bg)] text-[var(--button-bg)] px-6 py-2 sm:px-8 sm:py-3 rounded-full hover:bg-opacity-90 transition duration-300 relative z-10 font-semibold shadow-md">
        Discover Our Solutions
      </a>
    </motion.section>
  );
}