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
      description: "Roadmapping, discovery workshops, and technical planning aligned to business outcomes.",
      icon: ComputerDesktopIcon,
    },
    {
      title: "Web Platforms",
      description: "High-performance web applications engineered for speed, scale, and conversions.",
      icon: CodeBracketIcon,
    },
    {
      title: "Mobile Experiences",
      description: "iOS and Android apps with premium UX, offline support, and secure integrations.",
      icon: DevicePhoneMobileIcon,
    },
    {
      title: "Cloud & DevOps",
      description: "Resilient cloud infrastructure, automated deployments, and performance monitoring.",
      icon: CloudIcon,
    },
    {
      title: "Automation & AI",
      description: "Workflow automation, AI assistants, and smart integrations that save teams time.",
      icon: CpuChipIcon,
    },
    {
      title: "Data & Analytics",
      description: "Dashboards, reporting, and tracking that turn usage data into actionable insight.",
      icon: ChartBarIcon,
    },
    {
      title: "Brand & UI Systems",
      description: "Premium visual identity, UI kits, and design systems that elevate perception.",
      icon: PaintBrushIcon,
    },
    {
      title: "Security & Compliance",
      description: "Threat modeling, secure architecture, and compliance support built in.",
      icon: ShieldCheckIcon,
    },
    {
      title: "Growth Enablement",
      description: "SEO, performance optimization, and marketing tech that fuels demand.",
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
      className="py-10 sm:py-14 lg:py-16 mt-16 sm:mt-20 scroll-mt-[80px]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      variants={container}
    >
      <motion.div variants={item} className="text-center max-w-3xl mx-auto">
        <p className="text-[var(--button-bg)] uppercase tracking-[0.35em] text-xs sm:text-sm">
          Services
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-4">
          Premium solutions tailored to your growth stage.
        </h2>
        <p className="text-sm sm:text-base text-[var(--foreground)]/80 mt-4">
          We deliver end-to-end digital capabilities that strengthen your brand, streamline operations, and accelerate revenue.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-8">
        {services.map((service) => (
          <motion.div
            key={service.title}
            variants={item}
            className="glass-panel p-5 sm:p-6 group hover:-translate-y-2 transition-all duration-300"
          >
            <service.icon className="h-8 w-8 text-[var(--button-bg)] mb-3" />
            <h3 className="text-base sm:text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-sm sm:text-base text-[var(--foreground)]/80 mb-5">{service.description}</p>
            <a
              href="#contact"
              className="text-[var(--button-bg)] font-semibold text-sm sm:text-base inline-flex items-center gap-2"
            >
              Learn more
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
