"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import ProcessSection from "../components/ProcessSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import TechnologySection from "../components/TechnologySection";
import ClientsSection from "../components/ClientsSection";
import PricingSection from "../components/PricingSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Ensure light mode on first load
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
    setIsDarkMode(false);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen font-[var(--font-sans)] flex flex-col">
      {/* Navbar stays on top, full width */}
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        toggleSidebar={toggleSidebar}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        isDarkMode={isDarkMode}
        toggleSidebar={toggleSidebar}
      />

      {/* Hero Section: Full-bleed, full viewport height */}
      <HeroSection />

      {/* All other sections: Contained with proper inner padding */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <ProcessSection />
        <AboutSection />
        <ServicesSection />
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