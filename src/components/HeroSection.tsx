import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Tech Video Background - Full bleed */}
      <div className="absolute inset-0 -z-10">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/bgd.jpg" // Optional: static fallback image for slow connections
        >
          {/* Option 1: Use a high-quality abstract tech video (recommended) */}
          <source src="/videos/techbg2.mp4" type="video/mp4" />
          <source src="/videos/techbg1.mp4" type="video/webm" />

          {/* Fallback content if video fails to load */}
          <div className="w-full h-full bg-gradient-to-br from-[var(--navbar-bg)] to-[var(--button-bg)]" />
        </video>

        {/* Dark overlay for text readability + premium feel */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Subtle animated glow accents on top of video */}
      <motion.div
        className="absolute top-20 left-0 w-96 h-96 bg-[var(--button-bg)]/30 rounded-full blur-3xl -translate-x-1/2"
        animate={{ scale: [1, 1.4, 1], rotate: [0, 25, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-x-1/3"
        animate={{ scale: [1.1, 1.5, 1.1], rotate: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Content - Centered and readable */}
      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-2xl">
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Igniting Success
            </span>
            <br className="sm:hidden" />
            <span className="text-white"> with Next-Gen Technology</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.9 }}
            className="text-xl sm:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed drop-shadow-lg"
          >
            We build powerful, scalable digital solutions that transform businesses and drive measurable growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <a
              href="#services"
              className="group relative inline-flex items-center gap-4 bg-white text-[var(--button-bg)] font-bold px-10 py-5 rounded-full shadow-2xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-3 overflow-hidden"
            >
              <span className="relative z-10">Explore Our Solutions</span>
              <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-300" />
              <span className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-full border-2 border-white/50 text-white font-semibold backdrop-blur-md hover:bg-white/10 hover:border-white/70 transition-all duration-500 hover:scale-110"
            >
              Get a Free Consultation
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-20 flex flex-wrap justify-center gap-8 text-white/80 text-sm uppercase tracking-widest font-medium drop-shadow"
          >
            <span>Trusted by 20+ Businesses</span>
            <span>•</span>
            <span>100% Client Satisfaction</span>
            <span>•</span>
            <span>4+ Years of Excellence</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}