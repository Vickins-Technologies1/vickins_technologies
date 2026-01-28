// src/app/portfolio/page.tsx
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

// Fallback
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
              description: "Kenya's leading property management platform: tenant tracking, M-Pesa payments, invoicing, SMS notifications, property listings, and admin dashboard.",
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
              image: "/projects/baggit 1.png", // ← add screenshot
              tags: ["Next.js", "React", "Tailwind", "E-commerce", "UI/UX", "Responsive"],
              link: "https://baggit-ashy.vercel.app/",
       },
       {
              id: 3,
              title: "Wanjahi Group – Motors, Property & Business Solutions",
              category: "Fullstack + Corporate Website",
              description:
                     "Professional company website for Wanjahi Group showcasing premium vehicles, property services, business solutions, client testimonials, and performance stats.",
              image: "/projects/wanjahi.png", // ← add screenshot
              tags: ["Next.js", "TypeScript", "Tailwind", "Corporate", "UI/UX", "Responsive"],
              link: "https://wanjahi-group.vercel.app/",
       },
       {
              id: 4,
              title: "Macdee Entertainment Platform",
              category: "Enterprise Web App",
              description: "Enterprise-level web application with robust backend, user management, and custom UI components.",
              image: "/projects/k28.png",
              tags: ["JavaScript", "Fullstack", "Enterprise", "Custom UI"],
              link: "https://macdeeentertainment.com",
       },
       {
              id: 5,
              title: "Vickins Technologies Portfolio (Current)",
              category: "Web & Brand Identity",
              description: "Modern agency portfolio with dark/light mode, smooth animations, responsive layout, and integrated branding.",
              image: "/projects/vbi.png",
              tags: ["Next.js 14", "Tailwind CSS", "Framer Motion", "UI/UX", "Branding"],
              link: "/",
       },
];

const graphicCollection: GraphicCollection = {
       id: 100,
       title: "Branding & Graphic Design Collection",
       category: "Graphic Design",
       description: "A curated showcase of logos, brand identities, social templates, posters, packaging concepts and visual storytelling.",
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

       const toggleTheme = () => {
              const newTheme = isDarkMode ? "light" : "dark";
              document.documentElement.setAttribute("data-theme", newTheme);
              setIsDarkMode(!isDarkMode);
       };

       const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

       const filteredProjects = activeCategory === "All"
              ? [...devProjects, graphicCollection]
              : activeCategory === "Graphic Design"
                     ? [graphicCollection]
                     : devProjects.filter(p => p.category === activeCategory);

       const totalSlides = graphicCollection.subProjects.length;

       const goPrev = useCallback(() => {
              setSelectedSlideIndex(prev => prev === 0 ? totalSlides - 1 : (prev ?? 0) - 1);
       }, [totalSlides]);

       const goNext = useCallback(() => {
              setSelectedSlideIndex(prev => prev === totalSlides - 1 ? 0 : (prev ?? 0) + 1);
       }, [totalSlides]);

       const openFullImage = () => {
              if (selectedSlideIndex !== null) {
                     const img = graphicCollection.subProjects[selectedSlideIndex]?.subImage;
                     if (img) window.open(img, "_blank", "noopener,noreferrer");
              }
       };

       return (
              <div className="min-h-screen font-[var(--font-sans)] flex flex-col bg-[var(--background)]">
                     <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} toggleSidebar={toggleSidebar} />
                     <Sidebar isOpen={isSidebarOpen} isDarkMode={isDarkMode} toggleSidebar={toggleSidebar} />

                     {/* Hero */}
                     <section className="pt-20 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                                   <motion.h1
                                          initial={{ opacity: 0, y: 30 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 md:mb-6"
                                   >
                                          Our Work
                                   </motion.h1>
                                   <motion.p
                                          initial={{ opacity: 0, y: 30 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.15 }}
                                          className="text-lg sm:text-xl md:text-2xl text-[var(--foreground)]/80 max-w-3xl mx-auto"
                                   >
                                          Selected fullstack developments and premium graphic design projects — crafted with precision.
                                   </motion.p>
                            </div>
                     </section>

                     {/* Filters */}
                     <section className="pb-8 md:pb-12">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                   <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
                                          {categories.map(cat => (
                                                 <button
                                                        key={cat}
                                                        onClick={() => setActiveCategory(cat)}
                                                        className={`px-4 sm:px-5 py-2 rounded-full text-sm sm:text-base font-medium transition-all ${activeCategory === cat
                                                               ? "bg-[var(--button-bg)] text-white shadow-md"
                                                               : "bg-[var(--card-bg)] text-[var(--foreground)]/80 hover:bg-[var(--card-bg)]/80"
                                                               }`}
                                                 >
                                                        {cat}
                                                 </button>
                                          ))}
                                   </div>
                            </div>
                     </section>

                     {/* Projects Grid */}
                     <section className="pb-16 sm:pb-20 md:pb-24 lg:pb-32">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                   <AnimatePresence mode="wait">
                                          <motion.div
                                                 key={activeCategory}
                                                 initial={{ opacity: 0 }}
                                                 animate={{ opacity: 1 }}
                                                 exit={{ opacity: 0 }}
                                                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
                                          >
                                                 {filteredProjects.map((project, index) => (
                                                        <motion.article
                                                               key={project.id}
                                                               initial={{ opacity: 0, y: 30 }}
                                                               animate={{ opacity: 1, y: 0 }}
                                                               transition={{ duration: 0.7, delay: index * 0.1 }}
                                                               className={`group relative bg-[var(--card-bg)] rounded-2xl overflow-hidden border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col h-full ${"subProjects" in project ? "cursor-pointer" : ""
                                                                      }`}
                                                               onClick={() => "subProjects" in project && setSelectedSlideIndex(0)}
                                                        >
                                                               {/* Image */}
                                                               <div className="relative aspect-[4/3] overflow-hidden">
                                                                      <Image
                                                                             src={"subProjects" in project ? project.mainImage : project.image}
                                                                             alt={project.title}
                                                                             fill
                                                                             className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                                             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                                      />
                                                                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500" />

                                                                      {"subProjects" in project && (
                                                                             <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                                                                                    <span className="text-white text-2xl sm:text-3xl font-bold tracking-wide drop-shadow-2xl">
                                                                                           Graphic Design Collection
                                                                                    </span>
                                                                             </div>
                                                                      )}
                                                               </div>

                                                               {/* Content */}
                                                               <div className="p-5 sm:p-6 md:p-7 flex flex-col flex-1">
                                                                      <div className="flex flex-wrap gap-2 mb-4">
                                                                             {project.tags.map(tag => (
                                                                                    <span key={tag} className="px-3 py-1 text-xs font-medium bg-black/40 backdrop-blur-md text-white rounded-full border border-white/20">
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

                                                                      <a
                                                                             href={project.link}
                                                                             target={project.link.startsWith("http") ? "_blank" : undefined}
                                                                             rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                                                                             className="inline-flex items-center gap-2 text-[var(--button-bg)] font-medium hover:underline mt-auto text-sm sm:text-base"
                                                                             onClick={(e) => "subProjects" in project && e.preventDefault()}
                                                                      >
                                                                             {"subProjects" in project ? "Explore Collection" : "View Project"}
                                                                             <ExternalLink size={18} />
                                                                      </a>
                                                               </div>
                                                        </motion.article>
                                                 ))}
                                          </motion.div>
                                   </AnimatePresence>
                            </div>
                     </section>

                     {/* Premium Graphic Design Modal */}
                     <AnimatePresence>
                            {selectedSlideIndex !== null && (
                                   <motion.div
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          exit={{ opacity: 0 }}
                                          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-6"
                                          onClick={() => setSelectedSlideIndex(null)}
                                   >
                                          <motion.div
                                                 initial={{ scale: 0.94, opacity: 0, y: 30 }}
                                                 animate={{ scale: 1, opacity: 1, y: 0 }}
                                                 exit={{ scale: 0.94, opacity: 0, y: 30 }}
                                                 transition={{ type: "spring", damping: 30, stiffness: 320 }}
                                                 className="relative w-full max-w-5xl h-[75vh] sm:h-[84vh] lg:h-[88vh] bg-gradient-to-b from-gray-900/95 to-black/95 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                                                 onClick={(e) => e.stopPropagation()}
                                          >
                                                 {/* Tiny close button */}
                                                 <button
                                                        onClick={() => setSelectedSlideIndex(null)}
                                                        className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30 p-2 bg-black/70 backdrop-blur-xl rounded-full text-white hover:bg-black/90 transition-all shadow-md hover:scale-110"
                                                        aria-label="Close"
                                                 >
                                                        <X size={18} />
                                                 </button>

                                                 {/* Image */}
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
                                                                             className="object-cover"
                                                                             priority
                                                                             quality={92}
                                                                      />
                                                               </motion.div>
                                                        </AnimatePresence>
                                                 </div>

                                                 {/* Tiny arrows */}
                                                 <button
                                                        onClick={goPrev}
                                                        className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 p-2 bg-black/70 backdrop-blur-xl rounded-full text-white hover:bg-black/90 transition-all shadow-md hover:scale-110"
                                                 >
                                                        <ChevronLeft size={18} />
                                                 </button>
                                                 <button
                                                        onClick={goNext}
                                                        className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 p-2 bg-black/70 backdrop-blur-xl rounded-full text-white hover:bg-black/90 transition-all shadow-md hover:scale-110"
                                                 >
                                                        <ChevronRight size={18} />
                                                 </button>

                                                 {/* Bottom bar */}
                                                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pb-5 sm:pb-8 pt-14 px-5 sm:px-8">
                                                        <div className="flex items-center justify-between max-w-5xl mx-auto">
                                                               <div>
                                                                      <h3 className="text-lg sm:text-2xl font-bold text-white drop-shadow-lg mb-0.5">
                                                                             {graphicCollection.title}
                                                                      </h3>
                                                                      <p className="text-xs sm:text-sm text-white/90">
                                                                             {graphicCollection.subProjects[selectedSlideIndex]?.subTitle}
                                                                      </p>
                                                               </div>
                                                               <div className="flex items-center gap-3">
                                                                      <span className="text-xs sm:text-sm font-medium text-white/80">
                                                                             {selectedSlideIndex + 1} / {totalSlides}
                                                                      </span>
                                                                      <button
                                                                             onClick={openFullImage}
                                                                             className="p-2 bg-black/70 backdrop-blur-xl rounded-full text-white hover:bg-black/90 transition-all shadow-md hover:scale-110"
                                                                             title="Open full resolution"
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

                     <Footer />
              </div>
       );
}