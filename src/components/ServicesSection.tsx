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
      title: "Platform Strategy & Architecture",
      description: "Discovery, roadmap, and architecture decisions that reduce long-term cost and risk.",
      icon: ComputerDesktopIcon,
    },
    {
      title: "Web Apps & Portals",
      description: "Secure portals, dashboards, and customer platforms with performance, SEO, and clean UX.",
      icon: CodeBracketIcon,
    },
    {
      title: "Mobile Apps",
      description: "iOS + Android experiences with offline flows, payments, and enterprise-grade auth patterns.",
      icon: DevicePhoneMobileIcon,
    },
    {
      title: "Cloud, DevOps & Reliability",
      description: "CI/CD, monitoring, and scalable infrastructure with sensible SLOs and operational readiness.",
      icon: CloudIcon,
    },
    {
      title: "Automation & AI",
      description: "Automations and AI enablement for ops, support, sales, and internal workflows — safely and measurably.",
      icon: CpuChipIcon,
    },
    {
      title: "Data & Analytics",
      description: "Dashboards, reporting, and instrumentation so decisions are grounded in reliable data.",
      icon: ChartBarIcon,
    },
    {
      title: "Design Systems & UX",
      description: "Design systems, UI kits, and UX improvements that keep teams fast and interfaces consistent.",
      icon: PaintBrushIcon,
    },
    {
      title: "Security, Privacy & Compliance",
      description: "Threat-aware patterns, secure reviews, and compliance-ready delivery aligned to your requirements.",
      icon: ShieldCheckIcon,
    },
    {
      title: "Growth Enablement",
      description: "Performance tuning, conversion optimization, and post-launch iteration with measurable ROI.",
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
        <h2 className="text-2xl sm:text-3xl font-semibold mt-3">What we deliver.</h2>
        <p className="text-[15px] text-[var(--foreground)]/78 mt-3">
          Outcome-focused delivery for teams that care about quality, security, and long-term maintainability.
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
              Speak with us
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
