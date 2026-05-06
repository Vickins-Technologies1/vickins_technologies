import { motion } from "framer-motion";
import {
  CloudIcon,
  ComputerDesktopIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  RocketLaunchIcon,
  PaintBrushIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export default function ServicesSection() {
  const services = [
    {
      title: "Product Strategy",
      description: "Roadmap, discovery sessions, and technical planning before we build.",
      icon: ComputerDesktopIcon,
    },
    {
      title: "Web Platforms",
      description: "Fast Next.js builds with clean UX, SEO, and solid backend integrations.",
      icon: CodeBracketIcon,
    },
    {
      title: "Mobile Experiences",
      description: "iOS + Android apps with offline support, payments, and secure auth.",
      icon: DevicePhoneMobileIcon,
    },
    {
      title: "Cloud & DevOps",
      description: "Deployments, monitoring, and reliable infrastructure that’s easy to maintain.",
      icon: CloudIcon,
    },
    {
      title: "Automation & AI",
      description: "Automations and AI assistants for ops, support, sales, and internal workflows.",
      icon: CpuChipIcon,
    },
    {
      title: "Data & Analytics",
      description: "Dashboards, reporting, and tracking so you can make decisions with data.",
      icon: ChartBarIcon,
    },
    {
      title: "Brand & UI Systems",
      description: "Brand identity, UI kits, and design systems that stay consistent as you grow.",
      icon: PaintBrushIcon,
    },
    {
      title: "Security & Compliance",
      description: "Security checks, best practices, and reviews baked into delivery.",
      icon: ShieldCheckIcon,
    },
    {
      title: "Growth Enablement",
      description: "SEO, performance tuning, and conversion fixes after launch.",
      icon: RocketLaunchIcon,
    },
  ];

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      id="services"
      className="py-8 sm:py-10 lg:py-12 scroll-mt-[96px]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      variants={container}
    >
      <motion.div variants={item} className="text-center max-w-3xl mx-auto">
        <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Services</p>
        <h2 className="text-2xl sm:text-3xl font-semibold mt-3">What we build.</h2>
        <p className="text-[15px] text-[var(--foreground)]/78 mt-3">
          Clear deliverables, tight timelines, and a clean finish.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-7">
        {services.map((service) => (
          <motion.div
            key={service.title}
            variants={item}
            className="glass-panel p-5 sm:p-6 group hover:-translate-y-1.5 transition-all duration-300"
          >
            <service.icon className="h-8 w-8 text-[var(--accent)] mb-3" />
            <h3 className="text-base sm:text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-[15px] text-[var(--foreground)]/75 mb-5">{service.description}</p>
            <a
              href="#contact"
              className="text-[var(--accent)] font-semibold text-sm inline-flex items-center gap-2"
            >
              Talk to us
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
