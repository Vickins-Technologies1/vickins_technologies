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
          <div className="hero-backdrop-wash" />
          <div className="hero-backdrop-grid" />
          <svg className="hero-blueprint" viewBox="0 0 1440 900" preserveAspectRatio="none">
            <path d="M920 0v146h118v82h130v-56h155v196h117" />
            <path d="M1440 566h-132v88h-116v92h-190v154" />
            <path d="M0 692h146v-92h126v-62h150" />
            <path d="M1110 0v102h-62m330 590h-90v-82" />
            <path d="M80 116h170v54h88" className="hero-blueprint-fine" />
            <circle cx="920" cy="146" r="4" /><circle cx="1168" cy="654" r="4" />
            <circle cx="272" cy="600" r="4" /><circle cx="250" cy="116" r="3" />
            <path d="M1016 228h46m-23-23v46M136 692h20m-10-10v20" className="hero-blueprint-mark" />
          </svg>
          <div className="hero-code-cluster hero-code-cluster--north">
            <span>01 / PLATFORM</span>
            <code><i>const</i> platform = <b>&quot;Vickins&quot;</b>;</code>
            <code><i>await</i> buildSolutions&#40;secure, scalable&#41;;</code>
          </div>
          <div className="hero-code-cluster hero-code-cluster--east">
            <span>02 / ARCHITECTURE</span>
            <code><i>interface</i> TechnologySolution &#123;</code>
            <code>&nbsp;&nbsp;reliable: <b>true</b>;</code>
            <code>&nbsp;&nbsp;builtFor: <b>&quot;people&quot;</b>;</code>
            <code>&#125;</code>
          </div>
          <div className="hero-code-cluster hero-code-cluster--south">
            <span>03 / DELIVERY</span>
            <code>ship&#40;quality, withOwnership&#41;;</code>
          </div>
          <span className="hero-coordinate hero-coordinate--east">01 — 37.9062° S / 1440</span>
          <span className="hero-coordinate hero-coordinate--west">SYSTEMS / ENGINEERED TO SCALE</span>
        </div>
        <HeroSection />
        <div className="hero-transition-runway" aria-hidden="true" />
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
