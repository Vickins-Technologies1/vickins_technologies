"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ExternalLink, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import {
  getDefaultGraphicCollection,
  mergeGraphicCollection,
  type GraphicCollection,
} from "@/lib/portfolio-collection";

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

type GraphicProject = GraphicCollection & { isDev: false };

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
    link: "https://soranapropertymanagers.com",
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
];

const shouldUnoptimize = (src: string) => src.startsWith("data:") || src.startsWith("http");

export default function RecentProjectsSection() {
  const [selectedGraphicIndex, setSelectedGraphicIndex] = useState<number | null>(null);
  const [graphicProject, setGraphicProject] = useState<GraphicProject>(() => ({
    ...getDefaultGraphicCollection(),
    isDev: false,
  }));

  const devProjects = featuredProjects.filter((p) => p.isDev) as DevProject[];

  useEffect(() => {
    let isMounted = true;
    const loadCollection = async () => {
      try {
        const response = await fetch("/api/portfolio", { cache: "no-store" });
        const data = await response.json();
        if (response.ok && isMounted) {
          setGraphicProject({
            ...mergeGraphicCollection(data?.collection),
            isDev: false,
          });
        }
      } catch (error) {
        // Keep defaults if loading fails.
      }
    };
    loadCollection();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalSlides = graphicProject.subProjects.length;

  useEffect(() => {
    if (selectedGraphicIndex === null) return;
    if (totalSlides === 0) {
      setSelectedGraphicIndex(null);
      return;
    }
    if (selectedGraphicIndex >= totalSlides) {
      setSelectedGraphicIndex(0);
    }
  }, [selectedGraphicIndex, totalSlides]);

  const currentSlide = selectedGraphicIndex !== null
    ? graphicProject.subProjects[selectedGraphicIndex]
    : null;

  const goToPrevious = useCallback(() => {
    if (selectedGraphicIndex === null || totalSlides === 0) return;
    setSelectedGraphicIndex((prev) =>
      prev === null ? null : prev === 0 ? totalSlides - 1 : prev - 1
    );
  }, [selectedGraphicIndex, totalSlides]);

  const goToNext = useCallback(() => {
    if (selectedGraphicIndex === null || totalSlides === 0) return;
    setSelectedGraphicIndex((prev) =>
      prev === null ? null : prev === totalSlides - 1 ? 0 : prev + 1
    );
  }, [selectedGraphicIndex, totalSlides]);

  const openGallery = () => {
    if (graphicProject.subProjects.length === 0) return;
    setSelectedGraphicIndex(0);
  };

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
    <section id="work" className="py-8 sm:py-10 lg:py-12 scroll-mt-[96px]">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-7">
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Work</p>
            <h2 className="text-2xl sm:text-3xl font-semibold mt-3">Selected builds.</h2>
            <p className="text-[15px] text-[var(--foreground)]/78 mt-3">
              A few projects across product engineering and design.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--button-bg)] text-white px-5 py-3 text-xs uppercase tracking-[0.24em] font-semibold shadow-lg hover:shadow-xl transition"
            >
              Book a call
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/portfolio"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] font-semibold text-[var(--accent)] hover:text-[var(--accent)]/90 transition"
            >
              Explore Portfolio
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-5 lg:gap-6">
          <div className="space-y-4">
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
                className="group flex flex-col sm:flex-row gap-4 rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-4 sm:p-5 shadow-[var(--shadow-tight)] backdrop-blur-xl hover:-translate-y-1 transition"
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
                    <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--foreground)]/60">
                      {project.category}
                    </p>
                    <ExternalLink className="h-4 w-4 text-[var(--button-bg)] opacity-70 group-hover:opacity-100" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mt-2 text-[var(--foreground)]">
                    {project.title}
                  </h3>
                  <p className="text-[15px] text-[var(--foreground)]/75 mt-2 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-[10px] uppercase tracking-[0.22em] border border-[var(--glass-border)] bg-[var(--glass-surface-muted)] text-[var(--foreground)]/70 rounded-full"
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
              className="relative overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-5 sm:p-6 shadow-[var(--shadow-soft)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,144,224,0.18),_transparent_60%)]" />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--foreground)]/60">
                    Graphic Design
                  </p>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
                    Curated Collection
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mt-3">
                  {graphicProject.title}
                </h3>
                <p className="text-[15px] text-[var(--foreground)]/75 mt-3">
                  {graphicProject.description}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  {graphicProject.subProjects.slice(0, 6).map((item) => (
                    <div
                      key={item.id ?? item.subTitle}
                      className="relative h-20 sm:h-24 rounded-2xl overflow-hidden border border-white/10"
                    >
                      <Image
                        src={item.subImage || FALLBACK_SQUARE}
                        alt={item.subTitle}
                        fill
                        className="object-cover"
                        sizes="120px"
                        unoptimized={shouldUnoptimize(item.subImage || FALLBACK_SQUARE)}
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={openGallery}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface)] px-4 py-2 text-xs uppercase tracking-[0.24em] font-semibold text-[var(--foreground)]/80 hover:bg-[var(--glass-surface-strong)] transition"
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
                      className="object-contain"
                      priority
                      quality={92}
                      unoptimized={shouldUnoptimize(currentSlide?.subImage || FALLBACK_SQUARE)}
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
