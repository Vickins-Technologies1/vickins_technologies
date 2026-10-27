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
    <div className="min-h-screen font-[var(--font-sans)] flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="hero-scroll-stage">
        <div aria-hidden="true" className="hero-pinned-backdrop">
          <span className="hero-code-fragment hero-code-fragment--left">const innovation = &quot;Vickins Technologies&quot;;<br />function buildSolutions() &#123; ... &#125;</span>
          <span className="hero-code-fragment hero-code-fragment--right">class SecureInfrastructure &#123;<br />&nbsp; return scalableSolutions;<br />&#125;</span>
          <span className="hero-code-fragment hero-code-fragment--lower">if (secure &amp;&amp; scalable) &#123; deploy(); &#125;</span>
          <span className="hero-grid-cross hero-grid-cross--one" />
          <span className="hero-grid-cross hero-grid-cross--two" />
        </div>
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
  );
}
