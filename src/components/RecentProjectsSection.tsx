// src/components/RecentProjectsSection.tsx
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ExternalLink, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

// Fallback images
const FALLBACK_MAIN = "/images/placeholder-4x3.png";
const FALLBACK_SQUARE = "/images/placeholder-square.png";

// ── Types ────────────────────────────────────────────────────────────────
type DevProject = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  isDev: true;
};

type GraphicProject = {
  id: number;
  title: string;
  category: string;
  description: string;
  mainImage: string;
  tags: string[];
  link: string;
  isDev: false;
  subProjects: Array<{ subTitle: string; subImage: string }>;
};

type ProjectItem = DevProject | GraphicProject;

// ── Featured Projects ───────────────────────────────────────────────────
const featuredProjects: ProjectItem[] = [
  {
    id: 2,
    title: "Smart Choice Rental Portal",
    category: "Fullstack Application",
    description:
      "Secure client portal with real-time dashboards, authentication and business management features.",
    image: "/projects/scr.png",
    tags: ["TypeScript", "React", "Dashboard", "Fullstack"],
    link: "https://smartchoicerentalmanagement.com",
    isDev: true,
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
    isDev: true,
  },
  {
    id: 100,
    title: "Branding & Graphic Design Collection",
    category: "Graphic Design",
    description:
      "A curated showcase of logos, brand identities, social media kits, posters, packaging concepts and visual storytelling.",
    mainImage: "/projects/vp.jpg",
    tags: ["Branding", "Logo Design", "Graphic Design", "Visual Identity"],
    link: "/portfolio",
    isDev: false,
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
  },
];

export default function RecentProjectsSection() {
  const [selectedGraphicIndex, setSelectedGraphicIndex] = useState<number | null>(null);

  const graphicProject = featuredProjects.find((p) => !p.isDev) as GraphicProject | undefined;
  const currentSlide = selectedGraphicIndex !== null 
    ? graphicProject?.subProjects[selectedGraphicIndex] 
    : null;

  const totalSlides = graphicProject?.subProjects.length ?? 0;

  const goToPrevious = useCallback(() => {
    if (selectedGraphicIndex === null) return;
    setSelectedGraphicIndex((prev) => 
      prev === null ? null : prev === 0 ? totalSlides - 1 : prev - 1
    );
  }, [selectedGraphicIndex, totalSlides]);

  const goToNext = useCallback(() => {
    if (selectedGraphicIndex === null) return;
    setSelectedGraphicIndex((prev) => 
      prev === null ? null : prev === totalSlides - 1 ? 0 : prev + 1
    );
  }, [selectedGraphicIndex, totalSlides]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") setSelectedGraphicIndex(null);
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  }, [goToPrevious, goToNext]);

  const openFullImage = () => {
    if (currentSlide?.subImage) {
      window.open(currentSlide.subImage, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-transparent to-[var(--card-bg)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[var(--button-bg)] font-medium uppercase tracking-wider text-xs sm:text-sm mb-2 sm:mb-3"
          >
            Featured Work
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-4"
          >
            Recent Projects
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[var(--foreground)]/80"
          >
            A selection of fullstack solutions and premium graphic & branding work
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className={`group relative bg-[var(--card-bg)] rounded-2xl overflow-hidden border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col h-full ${
                !project.isDev ? "cursor-pointer" : ""
              }`}
              onClick={() => !project.isDev && setSelectedGraphicIndex(0)}
            >
              {/* ... card content remains the same ... */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.isDev ? (project as DevProject).image || FALLBACK_MAIN : (project as GraphicProject).mainImage || FALLBACK_MAIN}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500" />
                
                {!project.isDev && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <span className="text-white text-2xl sm:text-3xl font-bold tracking-wide drop-shadow-2xl mb-3">
                      Graphic Design
                    </span>
                    <span className="text-white/90 text-base sm:text-lg font-medium">
                      Click to explore collection
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 sm:p-6 md:p-7 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-black/40 backdrop-blur-md text-white rounded-full border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-[var(--button-bg)] transition-colors line-clamp-2">
                  {project.title}
                </h3>

                <p className="text-sm sm:text-base text-[var(--foreground)]/80 mb-5 line-clamp-3 flex-1">
                  {project.description}
                </p>

                {project.isDev ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[var(--button-bg)] font-medium hover:underline mt-auto text-sm sm:text-base"
                  >
                    View Project
                    <ExternalLink size={18} />
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-2 text-[var(--button-bg)] font-medium mt-auto text-sm sm:text-base group-hover:underline">
                    Explore Collection
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 sm:mt-16 md:mt-20">
          <motion.a
            href="/portfolio"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--button-bg)] text-white font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-2xl text-base sm:text-lg group"
          >
            View All Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </motion.a>
        </div>
      </div>

      {/* ── Very Compact Premium Modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {selectedGraphicIndex !== null && graphicProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-6"
            onClick={() => setSelectedGraphicIndex(null)}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              className="relative w-full max-w-5xl h-[75vh] sm:h-[84vh] lg:h-[88vh] bg-gradient-to-b from-gray-900/95 to-black/95 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Very small close button ── */}
              <button
                onClick={() => setSelectedGraphicIndex(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30 p-2 bg-black/70 backdrop-blur-xl rounded-full text-white hover:bg-black/90 transition-all duration-300 shadow-md hover:scale-110"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Full image */}
              <div className="relative w-full h-full">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={selectedGraphicIndex}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentSlide?.subImage || FALLBACK_SQUARE}
                      alt={currentSlide?.subTitle || "Graphic design work"}
                      fill
                      className="object-cover"
                      priority
                      quality={92}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Very small navigation arrows ── */}
              <button
                onClick={goToPrevious}
                className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/70 backdrop-blur-xl rounded-full text-white hover:bg-black/90 transition-all duration-300 shadow-md hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/70 backdrop-blur-xl rounded-full text-white hover:bg-black/90 transition-all duration-300 shadow-md hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>

              {/* Bottom bar – with very compact Full Size button */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pb-5 sm:pb-8 pt-14 px-5 sm:px-8">
                <div className="flex items-center justify-between max-w-5xl mx-auto">
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white drop-shadow-lg mb-0.5 sm:mb-1">
                      {graphicProject.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/90">
                      {currentSlide?.subTitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="text-right text-xs sm:text-sm font-medium text-white/80">
                      {selectedGraphicIndex + 1} / {totalSlides}
                    </div>

                    {/* ── Very small Full Size button ── */}
                    <button
                      onClick={openFullImage}
                      className="p-2 bg-black/70 backdrop-blur-xl rounded-full text-white hover:bg-black/90 transition-all duration-300 shadow-md hover:scale-110"
                      aria-label="View full size"
                      title="Open full resolution image"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}