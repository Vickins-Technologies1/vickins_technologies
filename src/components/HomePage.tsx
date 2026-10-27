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
        <svg className="site-programming-traces" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <path d="M-30 182h174q28 0 28 28v71q0 28 28 28h96" />
          <path d="M1468 145h-116q-30 0-30 30v75q0 30-30 30h-44" />
          <path d="M-20 734h220q30 0 30-30v-76q0-28 28-28h74" />
          <path d="M1460 680h-164q-30 0-30 30v88q0 28-28 28h-88" />
          <path d="M1120 -24v108q0 26-26 26h-44" />
          <circle cx="296" cy="309" r="3" /><circle cx="1278" cy="280" r="3" />
          <circle cx="332" cy="600" r="3" /><circle cx="1166" cy="826" r="3" />
        </svg>
        <div className="site-code site-code--top" aria-hidden="true">
          <span className="site-code__label">SYSTEM / API</span>
          <code><i>const</i> service = <b>createPlatform</b>&#40;&#123;</code>
          <code>&nbsp;&nbsp;secure: <b>true</b>, region: <em>&quot;KE-EA&quot;</em></code>
          <code>&#125;&#41;; <span className="site-code__cursor">_</span></code>
        </div>
        <div className="site-code site-code--right" aria-hidden="true">
          <span className="site-code__label">02 / ARCHITECTURE</span>
          <code><i>interface</i> System &#123;</code>
          <code>&nbsp;&nbsp;uptime: <b>99.98</b>;</code>
          <code>&nbsp;&nbsp;access: <em>&quot;verified&quot;</em>;</code>
          <code>&#125;</code>
        </div>
        <div className="site-code site-code--lower" aria-hidden="true">
          <span className="site-code__label">DEPLOY / PRODUCTION</span>
          <code><i>await</i> ship&#40;quality, <b>atScale</b>&#41;;</code>
        </div>
        <span className="site-code__meta site-code__meta--left">VICKINS / DIGITAL INFRASTRUCTURE</span>
        <span className="site-code__meta site-code__meta--right">TLS 1.3 &nbsp;·&nbsp; EDGE / 01</span>
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
