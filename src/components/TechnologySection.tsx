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
      className="py-8 sm:py-10 lg:py-12 scroll-mt-[96px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Technology</p>
        <h2 className="text-2xl sm:text-3xl font-semibold mt-3">Tools we ship with.</h2>
        <p className="text-[15px] text-[var(--foreground)]/78 mt-3">
          Stable, maintainable, and fast — without over-engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-7">
        {platforms.map((platform) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-5 text-left"
          >
            <platform.icon className="h-7 w-7 text-[var(--accent)] mb-3" />
            <h3 className="text-base font-semibold mb-2">{platform.name}</h3>
            <p className="text-sm text-[var(--foreground)]/70">{platform.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap justify-center gap-2">
        {stack.map((item) => (
          <span
            key={item}
            className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface)] px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/70"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.section>
  );
}
