// src/components/PricingSection.tsx
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
  const [itemsPerView, setItemsPerView] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Update items per view on resize (client-side only)
  useEffect(() => {
    const updateItems = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      if (width >= 1280) return setItemsPerView(4);
      if (width >= 1024) return setItemsPerView(3);
      if (width >= 768) return setItemsPerView(2);
      if (width >= 640) return setItemsPerView(2);
      setItemsPerView(1);
    };

    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  const totalSlides = pricingPlans.length;
  const extendedPlans = [...pricingPlans, ...pricingPlans, ...pricingPlans];
  const offset = pricingPlans.length;

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  // Optional: Swipe support (touch gestures)
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let startX = 0;
    let diffX = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const onTouchMove = (e: TouchEvent) => {
      diffX = e.touches[0].clientX - startX;
    };

    const onTouchEnd = () => {
      if (diffX > 50) goToPrev();
      if (diffX < -50) goToNext();
      diffX = 0;
    };

    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchmove", onTouchMove);
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      id="pricing"
      className="py-12 sm:py-16 lg:py-20 mt-16 sm:mt-20 scroll-mt-[80px]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4" style={{ color: 'var(--foreground)' }}>
          Our Pricing Plans
        </h2>
        <p className="text-center text-base sm:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto opacity-80" style={{ color: 'var(--foreground)' }}>
          Professional Solutions Tailored to Your Business Needs
        </p>

        {/* Carousel Wrapper */}
        <div className="relative overflow-hidden">
          {/* Cards */}
          <motion.div
            ref={carouselRef}
            className="flex"
            animate={{ x: `-${(currentIndex + offset) * (100 / itemsPerView)}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {extendedPlans.map((plan, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-2 sm:px-3 md:px-4"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <motion.div
                  className={`relative h-full p-5 sm:p-6 rounded-2xl shadow-lg flex flex-col transition-all duration-300 border-2 ${
                    plan.popular ? "border-[var(--button-bg)] scale-105" : "border-transparent"
                  } bg-[var(--card-bg)]`}
                  whileHover={{ scale: 1.03, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {plan.popular && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold text-white shadow-md"
                      style={{ backgroundColor: 'var(--button-bg)' }}
                    >
                      Popular Choice
                    </span>
                  )}

                  <div className="text-center mb-5">
                    <h3 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
                      {plan.name}
                    </h3>
                    <p className="text-sm sm:text-base opacity-80 mb-3" style={{ color: 'var(--foreground)' }}>
                      {plan.description}
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--button-bg)' }}>
                      From {plan.price}
                    </p>
                  </div>

                  <ul className="space-y-2 sm:space-y-3 mb-6 flex-1 text-sm sm:text-base">
                    {plan.features.slice(0, 8).map((feature) => (
                      <li key={feature} className="flex items-start gap-2" style={{ color: 'var(--foreground)' }}>
                        <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--button-bg)' }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 8 && (
                      <li className="text-sm opacity-70 italic pl-7">...and more features</li>
                    )}
                  </ul>

                  {plan.idealFor && (
                    <p className="text-center text-sm opacity-80 mt-auto" style={{ color: 'var(--foreground)' }}>
                      <span className="font-medium">Ideal for:</span> {plan.idealFor}
                    </p>
                  )}
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* Navigation Buttons – visible on all screens */}
          <motion.button
            onClick={goToPrev}
            className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-3 sm:p-4 rounded-full shadow-xl bg-[var(--button-bg)]/90 text-white hover:bg-[var(--button-bg)] transition-all"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeftIcon className="h-6 w-6 sm:h-7 sm:w-7" />
          </motion.button>

          <motion.button
            onClick={goToNext}
            className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-3 sm:p-4 rounded-full shadow-xl bg-[var(--button-bg)]/90 text-white hover:bg-[var(--button-bg)] transition-all"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRightIcon className="h-6 w-6 sm:h-7 sm:w-7" />
          </motion.button>
        </div>

        {/* Dots Indicator – centered & responsive */}
        <div className="flex justify-center mt-6 sm:mt-8 space-x-2 sm:space-x-3">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2.5 sm:h-3 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-[var(--button-bg)] w-6 sm:w-8" : "bg-gray-400/50 w-2.5 sm:w-3"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}