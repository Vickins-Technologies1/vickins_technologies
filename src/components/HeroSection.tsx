import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--navbar-bg) 0%, var(--button-bg) 100%)',
      }}
    >
      {/* Animated tech background particles */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.12)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] animate-pulse-slow" />
      </div>

      {/* Floating tech accent shapes */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-[var(--button-bg)]/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-[var(--button-bg)]/15 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], rotate: [0, -10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white to-[var(--button-bg)] bg-clip-text text-transparent">
              Igniting Success
            </span>
            <br className="sm:hidden" />
            <span className="text-white/90"> with Next-Gen Technology</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl sm:text-2xl lg:text-3xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            We build powerful, scalable digital solutions that transform businesses and drive measurable growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <a
              href="#services"
              className="group relative inline-flex items-center gap-3 bg-white text-[var(--button-bg)] font-bold px-10 py-5 rounded-full shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              <span className="relative z-10">Explore Our Solutions</span>
              <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              <span className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-500 hover:scale-105"
            >
              Get a Free Consultation
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
          </motion.div>

          {/* Subtle trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-white/70 text-sm uppercase tracking-wider font-medium"
          >
            <div>Trusted by 20+ Businesses</div>
            <div>100% Client Satisfaction</div>
            <div>4+ Years of Excellence</div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}