import { motion } from "framer-motion";
import { DevicePhoneMobileIcon, GlobeAltIcon, TvIcon, ServerStackIcon } from "@heroicons/react/24/solid";

export default function TechnologySection() {
  const platforms = [
    { name: "Web Platforms", description: "High-performance web apps and portals.", icon: GlobeAltIcon },
    { name: "Mobile Experiences", description: "Native and cross-platform builds.", icon: DevicePhoneMobileIcon },
    { name: "Connected Screens", description: "TV, kiosks, and digital signage.", icon: TvIcon },
    { name: "Cloud Infrastructure", description: "Scalable backends and APIs.", icon: ServerStackIcon },
  ];

  const stack = [
    "Go",
    "Python",
    "PHP",
    "JavaScript",
    "TypeScript",
    "Java",
    "C#",
    "Ruby",
    "C++",
    "Next.js",
    "React",
    "Node.js",
    "PostgreSQL",
    "AWS",
    "Firebase",
    "Figma",
    "Stripe",
    "M-Pesa",
  ];

  return (
    <motion.section
      id="technology"
      className="py-10 sm:py-14 lg:py-16 mt-16 sm:mt-20 scroll-mt-[80px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-[var(--button-bg)] uppercase tracking-[0.35em] text-xs sm:text-sm">
          Technology
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-4">
          Built with modern, enterprise-ready tools.
        </h2>
        <p className="text-sm sm:text-base text-[var(--foreground)]/80 mt-4">
          We select the right platforms and frameworks to deliver stability, speed, and long-term maintainability.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-8">
        {platforms.map((platform) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-5 text-left"
          >
            <platform.icon className="h-7 w-7 text-[var(--button-bg)] mb-3" />
            <h3 className="text-base font-semibold mb-2">{platform.name}</h3>
            <p className="text-sm text-[var(--foreground)]/70">{platform.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {stack.map((item) => (
          <span key={item} className="glass-chip px-4 py-2 text-xs sm:text-sm text-[var(--foreground)]/80">
            {item}
          </span>
        ))}
      </div>
    </motion.section>
  );
}
