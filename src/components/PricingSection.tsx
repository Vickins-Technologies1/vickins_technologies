"use client";

import { motion } from "framer-motion";
import { CheckCircleIcon, SparklesIcon } from "@heroicons/react/24/solid";

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  features: string[];
  idealFor?: string;
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "E-commerce",
    description: "Complete online store",
    price: "KES 100,000+",
    features: [
      "Free Domain Name",
      "Enhanced Security",
      "5 Professional Emails",
      "Custom Store Design",
      "SEO Optimization",
      "Google Business Setup",
      "M-Pesa Integration",
      "Card Payments",
      "Admin Dashboard",
      "Sales Analytics",
      "24/7 Support",
    ],
    popular: true,
  },
  {
    name: "POS Systems",
    description: "Retail & payment solutions",
    price: "KES 80,000+",
    features: [
      "Inventory Management",
      "M-Pesa Integration",
      "Card Payments",
      "Sales Reporting",
      "Customer Management",
      "Multi-Device Sync",
      "Barcode Scanning",
      "Offline Mode",
      "Custom Dashboard",
      "24/7 Support",
    ],
    idealFor: "Retail, Restaurants",
  },
  {
    name: "Static Website",
    description: "Perfect for small businesses",
    price: "KES 30,000+",
    features: [
      "Free Domain Name",
      "Website Security",
      "Free Lifetime Hosting",
      "1-8 Pages",
      "5 Professional Emails",
      "Fast Loading Speed",
      "Unique Designs",
      "SEO Optimization",
      "Google Business Setup",
      "24/7 Support",
    ],
  },
  {
    name: "API & Automation",
    description: "Seamless integrations",
    price: "KES 30,000+",
    features: [
      "Payment Gateways",
      "Crypto Exchange APIs",
      "Social Media APIs",
      "Email Automation",
      "WhatsApp Integration",
      "Custom Workflows",
      "API Security",
      "Performance Optimization",
      "Analytics Tracking",
      "24/7 Support",
    ],
    idealFor: "E-commerce, FinTech",
  },
  {
    name: "Blockchain & Crypto",
    description: "Crypto websites & dApps",
    price: "KES 100,000+",
    features: [
      "Wallet Integration",
      "Smart Contracts",
      "Free Domain Name",
      "Token Presale Pages",
      "Web3 Authentication",
      "Staking Dashboards",
      "SEO Optimization",
      "Security Audits",
      "Real-time Analytics",
      "24/7 Support",
    ],
    idealFor: "DeFi, NFTs, Tokens",
  },
  {
    name: "Dynamic Website",
    description: "Database-driven sites",
    price: "KES 80,000+",
    features: [
      "CMS Integration",
      "Database Management",
      "Free Domain",
      "Content Updates",
      "User Management",
      "Advanced Search",
      "Custom Design",
      "Fast Performance",
      "Auto Backups",
      "24/7 Support",
    ],
    idealFor: "News, Education, Forums, Directories",
  },
  {
    name: "Custom Software",
    description: "Tailored business apps",
    price: "KES 200,000+",
    features: [
      "CRM Development",
      "Inventory Systems",
      "Workflow Automation",
      "Database Integration",
      "User Authentication",
      "Scalable Architecture",
      "Real-time Analytics",
      "Cloud Deployment",
      "Custom UI/UX",
      "24/7 Support",
    ],
    idealFor: "Enterprises, Startups",
  },
  {
    name: "Mobile App",
    description: "iOS & Android apps",
    price: "KES 250,000+",
    features: [
      "Native iOS & Android",
      "5 Professional Emails",
      "Fast Performance",
      "Store Publishing",
      "User Authentication",
      "Push Notifications",
      "Analytics Integration",
      "Real-time Sync",
      "API Integration",
      "24/7 Support",
    ],
  },
  {
    name: "Graphic Design",
    description: "Branding & digital assets",
    price: "KES 5,000+",
    features: [
      "Logo & Brand Identity",
      "Social Media Graphics",
      "Marketing Materials",
      "Print Design",
      "UI/UX Mockups",
      "Custom Illustrations",
      "High-Resolution Files",
      "Revisions Included",
      "Fast Turnaround",
      "24/7 Support",
    ],
  },
  {
    name: "IT Consulting",
    description: "Expert tech guidance",
    price: "KES 10,000+",
    features: [
      "IT Strategy",
      "System Audits",
      "Security Assessments",
      "Cloud Solutions",
      "Infrastructure Planning",
      "Cost Optimization",
      "Compliance Guidance",
      "Vendor Selection",
      "24/7 Support",
    ],
    idealFor: "SMEs, Enterprises",
  },
  {
    name: "Digital Marketing",
    description: "Boost your online presence",
    price: "KES 20,000+",
    features: [
      "SEO Optimization",
      "Social Media Management",
      "Content Creation",
      "Email Marketing",
      "PPC Campaigns",
      "Analytics & Reporting",
      "Brand Strategy",
      "Audience Targeting",
      "Conversion Optimization",
      "24/7 Support",
    ],
    idealFor: "All Business Sizes",
  },
  {
    name: "IT Support",
    description: "Reliable tech assistance",
    price: "KES 15,000+",
    features: [
      "24/7 Helpdesk",
      "Remote Support",
      "On-site Assistance",
      "System Monitoring",
      "Software Updates",
      "Security Management",
      "Backup Solutions",
      "Network Support",
      "Hardware Troubleshooting",
      "24/7 Support",
    ],
    idealFor: "SMEs, Enterprises",
  },
  {
    name: "Cybersecurity",
    description: "Protect your digital assets",
    price: "KES 30,000+",
    features: [
      "Vulnerability Assessments",
      "Penetration Testing",
      "Security Audits",
      "Incident Response",
      "Firewall Management",
      "Data Encryption",
      "Employee Training",
      "Compliance Consulting",
      "24/7 Monitoring",
      "24/7 Support",
    ],
    idealFor: "All Business Sizes",
  },
];

export default function Pricing() {
  return (
    <motion.section
      id="pricing"
      className="py-10 sm:py-14 lg:py-16 mt-16 sm:mt-20 scroll-mt-[80px]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-[var(--button-bg)] uppercase tracking-[0.32em] text-xs sm:text-sm">
              Pricing
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-3">
              Premium packages for every stage.
            </h2>
            <p className="text-sm sm:text-base text-[var(--foreground)]/80 mt-4">
              Transparent scopes with an emphasis on quality, performance, and future-ready support.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/60">
            Tailored Engagements
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-8">
          <div className="space-y-5">
            {pricingPlans.slice(0, 4).map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`rounded-3xl border border-white/40 bg-white/55 p-5 sm:p-6 shadow-[var(--shadow-tight)] backdrop-blur-xl ${
                  plan.popular ? "ring-1 ring-[var(--button-bg)]" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--foreground)]/60">
                      {plan.description}
                    </p>
                    <h3 className="text-lg sm:text-xl font-semibold mt-2">{plan.name}</h3>
                    <p className="text-sm text-[var(--foreground)]/70 mt-2">From {plan.price}</p>
                  </div>
                  {plan.popular && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--button-bg)]/15 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[var(--button-bg)]">
                      <SparklesIcon className="h-3 w-3" />
                      Popular
                    </span>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {plan.features.slice(0, 5).map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center gap-1 rounded-full border border-white/50 bg-white/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--foreground)]/70"
                    >
                      <CheckCircleIcon className="h-3 w-3 text-[var(--button-bg)]" />
                      {feature}
                    </span>
                  ))}
                </div>
                {plan.idealFor && (
                  <p className="mt-3 text-xs text-[var(--foreground)]/60">
                    Ideal for: <span className="font-medium">{plan.idealFor}</span>
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-br from-white/70 via-white/40 to-white/10 p-6 sm:p-7 shadow-[var(--shadow-soft)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_60%)]" />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--foreground)]/60">
                  Signature Plans
                </p>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--button-bg)]">
                  Premium Suite
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mt-3">Enterprise-grade engagements.</h3>
              <p className="text-sm text-[var(--foreground)]/75 mt-3">
                Ideal for teams that need custom engineering, advanced integrations, and dedicated delivery squads.
              </p>

              <div className="mt-6 space-y-3">
                {pricingPlans.slice(4, 8).map((plan) => (
                  <div
                    key={plan.name}
                    className="flex items-center justify-between rounded-2xl border border-white/40 bg-white/60 px-4 py-3"
                  >
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--foreground)]/60">
                        {plan.name}
                      </p>
                      <p className="text-xs text-[var(--foreground)]/70 mt-1">From {plan.price}</p>
                    </div>
                    <SparklesIcon className="h-4 w-4 text-[var(--button-bg)]" />
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/50 bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--foreground)]/60">Need a custom scope?</p>
                <p className="text-sm text-[var(--foreground)]/75 mt-2">
                  We will tailor a package around your timeline, platform requirements, and growth goals.
                </p>
                <a
                  href="#contact"
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--button-bg)] px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-white"
                >
                  Request Proposal
                  <SparklesIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
