"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ExternalLink, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const FALLBACK_MAIN = "/images/placeholder-4x3.png";
const FALLBACK_SQUARE = "/images/placeholder-square.png";

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
  const devProjects = featuredProjects.filter((p) => p.isDev) as DevProject[];

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
    <section className="py-10 sm:py-14 lg:py-16">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-[var(--button-bg)] uppercase tracking-[0.32em] text-xs sm:text-sm">
              Featured Work
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-3">
              Premium delivery across product and visual design.
            </h2>
            <p className="text-sm sm:text-base text-[var(--foreground)]/80 mt-4">
              Select engagements highlighting fullstack engineering and brand-forward creative systems.
            </p>
          </div>
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] font-semibold text-[var(--button-bg)]"
          >
            Explore Portfolio
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-8">
          <div className="space-y-5">
            {devProjects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group flex flex-col sm:flex-row gap-4 rounded-3xl border border-white/40 bg-white/50 p-4 sm:p-5 shadow-[var(--shadow-tight)] backdrop-blur-xl hover:-translate-y-1 transition"
              >
                <div className="relative w-full sm:w-40 h-28 sm:h-24 rounded-2xl overflow-hidden">
                  <Image
                    src={project.image || FALLBACK_MAIN}
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

          {graphicProject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
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
                    Curated Collection
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mt-3">
                  {graphicProject.title}
                </h3>
                <p className="text-sm text-[var(--foreground)]/75 mt-3">
                  {graphicProject.description}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  {graphicProject.subProjects.slice(0, 6).map((item) => (
                    <div key={item.subTitle} className="relative h-20 sm:h-24 rounded-2xl overflow-hidden">
                      <Image
                        src={item.subImage || FALLBACK_SQUARE}
                        alt={item.subTitle}
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedGraphicIndex(0)}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.24em] font-semibold text-[var(--foreground)]/80 hover:bg-white transition"
                >
                  Open Gallery
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

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
              <button
                onClick={() => setSelectedGraphicIndex(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30 p-2 bg-black/70 backdrop-blur-xl rounded-full text-white hover:bg-black/90 transition-all duration-300 shadow-md hover:scale-110"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

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

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pb-5 sm:pb-8 pt-14 px-5 sm:px-8">
                <div className="flex items-center justify-between max-w-5xl mx-auto">
                  <div>
                    <h3 className="text-lg sm:text-2xl font-semibold text-white drop-shadow-lg mb-0.5 sm:mb-1">
                      {graphicProject.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/90">{currentSlide?.subTitle}</p>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="text-right text-xs sm:text-sm font-medium text-white/80">
                      {selectedGraphicIndex + 1} / {totalSlides}
                    </div>

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
