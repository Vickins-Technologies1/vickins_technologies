"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import ProductsSection from "../components/ProductsSection";
import ProcessSection from "../components/ProcessSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import EnterpriseSection from "../components/EnterpriseSection";
import SecurityServiceSection from "../components/SecurityServiceSection";
import TechnologySection from "../components/TechnologySection";
import ClientsSection from "../components/ClientsSection";
import PricingSection from "../components/PricingSection";
import ContactSection from "../components/ContactSection";
import RecentProjectsSection from "../components/RecentProjectsSection";
import ProofSection from "../components/ProofSection";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen font-[var(--font-sans)] flex flex-col">
      {/* Navbar stays on top, full width */}
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Hero Section: Full-bleed, full viewport height */}
      <HeroSection />
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ProductsSection />
      </div>

      {/* All other sections: Contained with proper inner padding */}
      <main className="flex-1 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <ProcessSection />
        <AboutSection />
        <ServicesSection />
        <EnterpriseSection />
        <SecurityServiceSection />
        <RecentProjectsSection />
        <ProofSection />
        <TechnologySection />
        <ClientsSection />
        <PricingSection />
        <ContactSection />
      </main>

      {/* Footer: Full width or contained — your choice */}
      <Footer />
    </div>
  );
}
