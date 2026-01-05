"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  features: string[];
  idealFor?: string;
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  // ... (your pricingPlans array remains unchanged)
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1); // Default to 1 (safe for SSR)

  // Safely determine items per view only on client
  useEffect(() => {
    const updateItemsPerView = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth >= 1280) setItemsPerView(4);
      else if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 768) setItemsPerView(3);
      else if (window.innerWidth >= 640) setItemsPerView(2);
      else setItemsPerView(1);
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const totalSlides = pricingPlans.length;

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  // Triple the array for seamless infinite scroll
  const extendedPlans = [...pricingPlans, ...pricingPlans, ...pricingPlans];
  const offset = pricingPlans.length;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      id="pricing"
      className="py-10 lg:py-14 bg-gradient-to-br from-[var(--background)] to-[var(--card-bg)]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4" style={{ color: 'var(--foreground)' }}>
          Our Pricing Plans
        </h2>
        <p className="text-center text-sm sm:text-base mb-8 max-w-2xl mx-auto opacity-80" style={{ color: 'var(--foreground)' }}>
          Professional Solutions Tailored to Your Business Needs
        </p>

        <div className="relative">
          <motion.div
            className="flex"
            animate={{ x: `-${(currentIndex + offset) * (100 / itemsPerView)}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {extendedPlans.map((plan, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-2 sm:px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <motion.div
                  className={`relative h-full p-4 sm:p-5 rounded-xl shadow-md flex flex-col transition-all duration-300 border-2 ${
                    plan.popular ? "border-[var(--button-bg)]" : "border-transparent"
                  } bg-[var(--card-bg)]`}
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  {plan.popular && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-white shadow"
                      style={{ backgroundColor: 'var(--button-bg)' }}
                    >
                      Popular
                    </span>
                  )}

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-center mb-1" style={{ color: 'var(--foreground)' }}>
                      {plan.name}
                    </h3>
                    <p className="text-center text-xs sm:text-sm mb-3 opacity-80" style={{ color: 'var(--foreground)' }}>
                      {plan.description}
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-center mb-4" style={{ color: 'var(--button-bg)' }}>
                      From {plan.price}
                    </p>

                    <ul className="space-y-1.5 mb-3 flex-1 overflow-y-auto max-h-40 text-xs sm:text-sm scrollbar-thin scrollbar-thumb-[var(--button-bg)] scrollbar-track-transparent">
                      {plan.features.slice(0, 6).map((feature) => (
                        <li key={feature} className="flex items-start" style={{ color: 'var(--foreground)' }}>
                          <CheckCircleIcon className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" style={{ color: 'var(--button-bg)' }} />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {plan.features.length > 6 && (
                        <li className="text-xs opacity-70 italic">...and more</li>
                      )}
                    </ul>

                    {plan.idealFor && (
                      <p className="text-center text-xs opacity-80" style={{ color: 'var(--foreground)' }}>
                        <span className="font-medium">Ideal for:</span> {plan.idealFor}
                      </p>
                    )}
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* Navigation Buttons */}
          <motion.button
            onClick={goToPrev}
            className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-lg bg-[var(--button-bg)] text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </motion.button>

          <motion.button
            onClick={goToNext}
            className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-lg bg-[var(--button-bg)] text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-1.5">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-[var(--button-bg)] w-6" : "bg-gray-400 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}