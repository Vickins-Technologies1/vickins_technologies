// src/app/portfolio/page.tsx
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Expand,
  Minimize2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

const FALLBACK = "/images/placeholder-square.png";

type DevProject = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
};

type GraphicCollection = {
  id: number;
  title: string;
  category: string;
  description: string;
  mainImage: string;
  tags: string[];
  link: string;
  subProjects: { subTitle: string; subImage: string }[];
};

const devProjects: DevProject[] = [
  {
    id: 1,
    title: "Smart Choice Rental Management SaaS",
    category: "Fullstack + UI/UX",
    description:
      "Kenya's leading property management platform: tenant tracking, M-Pesa payments, invoicing, SMS notifications, property listings, and admin dashboard.",
    image: "/projects/scr.png",
    tags: ["TypeScript", "React/Next.js", "Dashboard", "Authentication", "Fullstack"],
    link: "https://smartchoicerentalmanagement.com",
  },
  {
    id: 2,
    title: "Baggit – Premium E-commerce Platform",
    category: "Fullstack + E-commerce",
    description:
      "Modern e-commerce site offering premium fashion, tech essentials, discounts, free shipping, and exclusive deals with a clean, conversion-focused design.",
    image: "/projects/Baggit.png",
    tags: ["Next.js", "React", "Tailwind", "E-commerce", "UI/UX", "Responsive"],
    link: "https://baggit-ashy.vercel.app/",
  },
  {
    id: 3,
    title: "Wanjahi Group – Motors, Property & Business Solutions",
    category: "Fullstack + Corporate Website",
    description:
      "Professional company website for Wanjahi Group showcasing premium vehicles, property services, business solutions, client testimonials, and performance stats.",
    image: "/projects/wanjahi.png",
    tags: ["Next.js", "TypeScript", "Tailwind", "Corporate", "UI/UX", "Responsive"],
    link: "https://wanjahi-group.vercel.app/",
  },
  {
    id: 4,
    title: "Macdee Entertainment Platform",
    category: "Enterprise Web App",
    description:
      "Enterprise-level web application with robust backend, user management, and custom UI components.",
    image: "/projects/k28.png",
    tags: ["JavaScript", "Fullstack", "Enterprise", "Custom UI"],
    link: "https://macdeeentertainment.com",
  },
  {
    id: 5,
    title: "Vickins Technologies Portfolio (Current)",
    category: "Web & Brand Identity",
    description:
      "Modern agency portfolio with dark/light mode, smooth animations, responsive layout, and integrated branding.",
    image: "/projects/vbi.png",
    tags: ["Next.js 14", "Tailwind CSS", "Framer Motion", "UI/UX", "Branding"],
    link: "/",
  },
];

const graphicCollection: GraphicCollection = {
  id: 100,
  title: "Branding & Graphic Design Collection",
  category: "Graphic Design",
  description:
    "A curated showcase of logos, brand identities, social templates, posters, packaging concepts and visual storytelling.",
  mainImage: "/projects/vp.jpg",
  tags: ["Branding", "Logo Design", "Graphic Design", "Visual Identity"],
  link: "/portfolio",
  subProjects: [
    { subTitle: "Vickins Brand System", subImage: "/projects/teshlie-cake-main.jpg" },
    { subTitle: "Social Media Templates", subImage: "/projects/vp.jpg" },
    { subTitle: "Client Logo Suite", subImage: "/projects/APD-1.jpg" },
    { subTitle: "Event & Promo Posters", subImage: "/projects/KN-1.jpg" },
    { subTitle: "Packaging Concepts", subImage: "/projects/TSH-1.jpg" },
    { subTitle: "Visual Storytelling", subImage: "/projects/MDS-1.jpg" },
    { subTitle: "Brand Collateral Designs", subImage: "/projects/JDTGE-1.jpg" },
    { subTitle: "Digital Ad Creatives", subImage: "/projects/VICKINS-GD-1" },
    { subTitle: "Illustrative Graphics", subImage: "/projects/P-XMASS-1.jpg" },
    { subTitle: "Typography Experiments", subImage: "/projects/M-XMASS-1" },
    { subTitle: "Color Palette Studies", subImage: "/projects/CNJ-1.jpg" },
    { subTitle: "Layout & Composition", subImage: "/projects/BPPN-1.jpg" },
    { subTitle: "Iconography Sets", subImage: "/projects/J-1.jpg" },
    { subTitle: "Creative Direction Samples", subImage: "/projects/MDAJ-1.jpg" },
    { subTitle: "Brand Guidelines Excerpts", subImage: "/projects/MCR-1.jpg" },
  ],
};

const categories = [
  "All",
  "Fullstack + UI/UX",
  "Fullstack Application",
  "Business Application",
  "Enterprise Web App",
  "Web & Brand Identity",
  "Fullstack + E-commerce",
  "Fullstack + Corporate Website",
  "Graphic Design",
];

export default function Portfolio() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"contain" | "cover">("contain");

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const filteredProjects =
    activeCategory === "All"
      ? [...devProjects, graphicCollection]
      : activeCategory === "Graphic Design"
      ? [graphicCollection]
      : devProjects.filter((p) => p.category === activeCategory);

  const totalSlides = graphicCollection.subProjects.length;

  const goPrev = useCallback(() => {
    setSelectedSlideIndex((prev) => (prev === 0 ? totalSlides - 1 : (prev ?? 0) - 1));
  }, [totalSlides]);

  const goNext = useCallback(() => {
    setSelectedSlideIndex((prev) => (prev === totalSlides - 1 ? 0 : (prev ?? 0) + 1));
  }, [totalSlides]);

  return (
    <div className="min-h-screen font-[var(--font-sans)] flex flex-col bg-[var(--background)]">
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} isDarkMode={isDarkMode} toggleSidebar={toggleSidebar} />

      <section className="pt-16 pb-10 md:pt-22 md:pb-14">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-[var(--button-bg)] uppercase tracking-[0.32em] text-xs sm:text-sm">
                Portfolio
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-3">
                Selected work crafted with premium execution.
              </h1>
              <p className="text-sm sm:text-base text-[var(--foreground)]/80 mt-4">
                Explore platform builds and visual design systems delivered for brands across Kenya and beyond.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/60">
              <Sparkles className="h-4 w-4" />
              Featured Archive
            </div>
          </div>
        </div>
      </section>

      <section className="pb-6 md:pb-10">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.24em] font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-[var(--button-bg)] text-white shadow-md"
                    : "bg-white/60 text-[var(--foreground)]/70 hover:bg-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-8"
            >
              <div className="space-y-5">
                {filteredProjects
                  .filter((project) => "image" in project)
                  .map((project, index) => (
                    <motion.a
                      key={project.id}
                      href={project.link}
                      target={project.link.startsWith("http") ? "_blank" : undefined}
                      rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.08 }}
                      className="group flex flex-col sm:flex-row gap-4 rounded-3xl border border-white/40 bg-white/55 p-4 sm:p-5 shadow-[var(--shadow-tight)] backdrop-blur-xl hover:-translate-y-1 transition"
                    >
                      <div className="relative w-full sm:w-40 h-28 sm:h-24 rounded-2xl overflow-hidden">
                        <Image
                          src={project.image || FALLBACK}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 160px"
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--foreground)]/60">
                            {project.category}
                          </p>
                          <ExternalLink className="h-4 w-4 text-[var(--button-bg)] opacity-70 group-hover:opacity-100" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mt-2 text-[var(--foreground)]">
                          {project.title}
                        </h3>
                        <p className="text-sm text-[var(--foreground)]/75 mt-2 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 text-[10px] uppercase tracking-[0.22em] bg-white/70 text-[var(--foreground)]/70 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.a>
                  ))}
              </div>

              {activeCategory === "Graphic Design" || activeCategory === "All" ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-br from-white/70 via-white/40 to-white/10 p-6 sm:p-7 shadow-[var(--shadow-soft)]"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_60%)]" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--foreground)]/60">
                        Graphic Design
                      </p>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--button-bg)]">
                        Curated Gallery
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold mt-3">{graphicCollection.title}</h3>
                    <p className="text-sm text-[var(--foreground)]/75 mt-3">
                      {graphicCollection.description}
                    </p>

                    <div className="mt-6 grid grid-cols-3 gap-2">
                      {graphicCollection.subProjects.slice(0, 9).map((item, idx) => (
                        <button
                          key={item.subTitle}
                          onClick={() => setSelectedSlideIndex(idx)}
                          className="relative h-20 sm:h-24 rounded-2xl overflow-hidden"
                        >
                          <Image
                            src={item.subImage || FALLBACK}
                            alt={item.subTitle}
                            fill
                            className="object-cover"
                            sizes="120px"
                          />
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedSlideIndex(0)}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.24em] font-semibold text-[var(--foreground)]/80 hover:bg-white transition"
                    >
                      Open Gallery
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="rounded-3xl border border-white/40 bg-white/55 p-6 shadow-[var(--shadow-tight)]">
                  <h3 className="text-lg font-semibold">Graphic Design Collection</h3>
                  <p className="text-sm text-[var(--foreground)]/70 mt-2">
                    Switch to the Graphic Design category to view the full collection.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {selectedSlideIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-6"
            onClick={() => setSelectedSlideIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              className="relative w-full max-w-6xl h-[78vh] sm:h-[84vh] bg-[#0b0f1a] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 bg-gradient-to-b from-black/80 to-transparent">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">Graphic Gallery</p>
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    {graphicCollection.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode((prev) => (prev === "contain" ? "cover" : "contain"))}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/80"
                  >
                    {viewMode === "contain" ? (
                      <>
                        <Expand className="h-3 w-3" />
                        Fill
                      </>
                    ) : (
                      <>
                        <Minimize2 className="h-3 w-3" />
                        Fit
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setSelectedSlideIndex(null)}
                    className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="relative w-full h-full">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={selectedSlideIndex}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={graphicCollection.subProjects[selectedSlideIndex]?.subImage || FALLBACK}
                      alt={graphicCollection.subProjects[selectedSlideIndex]?.subTitle || "Graphic work"}
                      fill
                      className={viewMode === "contain" ? "object-contain" : "object-cover"}
                      priority
                      quality={92}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition"
              >
                <ChevronRight size={18} />
              </button>

              <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 to-transparent px-4 sm:px-6 pb-4 pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-white/80">
                    {graphicCollection.subProjects[selectedSlideIndex]?.subTitle}
                  </p>
                  <p className="text-xs text-white/60">
                    {selectedSlideIndex + 1} / {totalSlides}
                  </p>
                </div>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                  {graphicCollection.subProjects.map((item, idx) => (
                    <button
                      key={item.subTitle}
                      onClick={() => setSelectedSlideIndex(idx)}
                      className={`relative h-12 w-16 rounded-xl overflow-hidden border ${
                        idx === selectedSlideIndex ? "border-white/70" : "border-white/20"
                      }`}
                    >
                      <Image
                        src={item.subImage || FALLBACK}
                        alt={item.subTitle}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
