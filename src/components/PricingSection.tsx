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
    price: "KES 50,000+",
    features: [
      "Free Domain Name",
      "Website Security",
      "Free Lifetime Hosting",
      "1-5 Pages",
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
    price: "KES 150,000+",
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
    price: "KES 100,000+",
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const slideshowRef = useRef<HTMLDivElement | null>(null);
  const extendedPricingPlans = [...pricingPlans, ...pricingPlans];

  useEffect(() => {
    const handleResize = () => {
      if (slideshowRef.current) {
        const firstSlide = slideshowRef.current.querySelector('.flex > div') as HTMLElement | null;
        if (firstSlide) {
          setSlideWidth(firstSlide.getBoundingClientRect().width);
        }
        setCurrentSlide((prev) => prev % pricingPlans.length);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => {
      let next = prev - 1;
      if (next < 0) {
        next = extendedPricingPlans.length + next;
        setTimeout(() => {
          setCurrentSlide(next % pricingPlans.length);
        }, 800);
      }
      return next;
    });
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => {
      let next = prev + 1;
      if (next >= extendedPricingPlans.length) {
        next = next % extendedPricingPlans.length;
        setTimeout(() => {
          setCurrentSlide(next);
        }, 800);
      } else if (next >= pricingPlans.length) {
        setTimeout(() => {
          setCurrentSlide(next - pricingPlans.length);
        }, 800);
      }
      return next;
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="pricing"
      className="py-8 sm:py-12 lg:py-16 relative overflow-hidden mt-16 sm:mt-20 scroll-mt-[80px]"
      style={{ background: 'linear-gradient(to bottom right, var(--background), var(--card-bg))' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 lg:mb-12" style={{ color: 'var(--foreground)' }}>
          Our Pricing Plans
        </h2>
        <p className="text-center mb-6 sm:mb-8 lg:mb-12 text-sm sm:text-base lg:text-lg" style={{ color: 'var(--foreground)' }}>
          Professional Solutions Tailored to Your Business Needs
        </p>
        <div className="relative overflow-hidden" ref={slideshowRef}>
          <motion.div
            className="flex"
            animate={{ x: -currentSlide * slideWidth }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            {extendedPricingPlans.map((plan, index) => (
              <motion.div
                key={`${plan.name}-${index}`}
                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 sm:px-3 mb-4 sm:mb-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div
                  className={`relative p-4 sm:p-6 rounded-xl shadow-lg h-[360px] sm:h-[400px] lg:h-[420px] flex flex-col justify-between transition-all duration-300 ${
                    plan.popular ? "border-2 border-[var(--button-bg)]" : "border border-[var(--card-bg)]"
                  }`}
                  style={{ backgroundColor: 'var(--card-bg)' }}
                >
                  {plan.popular && (
                    <span
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full shadow-md"
                      style={{ backgroundColor: 'var(--button-bg)' }}
                    >
                      Most Popular
                    </span>
                  )}
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 text-center" style={{ color: 'var(--foreground)' }}>
                      {plan.name}
                    </h3>
                    <p className="text-center text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: 'var(--foreground)' }}>
                      {plan.description}
                    </p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-center mb-2 sm:mb-3" style={{ color: 'var(--button-bg)' }}>
                      From {plan.price}
                    </p>
                    <ul className="space-y-1 sm:space-y-2 mb-2 sm:mb-3 max-h-28 sm:max-h-32 lg:max-h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--button-bg)] scrollbar-track-[var(--card-bg)]">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center text-xs sm:text-sm" style={{ color: 'var(--foreground)' }}>
                          <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" style={{ color: 'var(--button-bg)' }} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    {plan.idealFor && (
                      <p className="text-center text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: 'var(--foreground)' }}>
                        <span className="font-semibold">Ideal for:</span> {plan.idealFor}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.button
            onClick={goToPrevSlide}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white p-2 sm:p-3 rounded-full shadow-lg transition duration-300"
            style={{ backgroundColor: 'var(--button-bg)' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </motion.button>
          <motion.button
            onClick={goToNextSlide}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white p-2 sm:p-3 rounded-full shadow-lg transition duration-300"
            style={{ backgroundColor: 'var(--button-bg)' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}