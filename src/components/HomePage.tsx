"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import ProductsSection from "../components/ProductsSection";
import ServicesSection from "../components/ServicesSection";
import RecentProjectsSection from "../components/RecentProjectsSection";
import ClientsSection from "../components/ClientsSection";
import ProcessSection from "../components/ProcessSection";
import EnterpriseSection from "../components/EnterpriseSection";
import SecurityServiceSection from "../components/SecurityServiceSection";
import DiraOSSection from "../components/DiraOSSection";
import AboutSection from "../components/AboutSection";
import TechnologySection from "../components/TechnologySection";
import PricingSection from "../components/PricingSection";
import ContactSection from "../components/ContactSection";

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="relative isolate min-h-screen flex flex-col font-[var(--font-sans)]">
      <div aria-hidden="true" className="site-programming-backdrop">
        <div className="site-background-image site-background-image--code" />
        <div className="site-background-image site-background-image--infrastructure" />
        <div className="site-background-wash" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="hero-scroll-stage">
          <HeroSection />
        </div>

        <main className="hero-scroll-main flex-1 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ServicesSection />
          <RecentProjectsSection />
          <ClientsSection />
          <ProcessSection />
          <EnterpriseSection />
          <SecurityServiceSection />
          <DiraOSSection />
          <AboutSection />
          <TechnologySection />
          <PricingSection />
          <ProductsSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </div>
  );
}
