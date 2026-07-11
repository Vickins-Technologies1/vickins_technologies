"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { getDefaultDevProjects, mergeDevProjects, type DevProject } from "@/lib/portfolio-collection";

const FALLBACK = "/images/placeholder-4x3.png";

export default function Portfolio() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [devProjects, setDevProjects] = useState<DevProject[]>(() => getDefaultDevProjects());

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    let isMounted = true;

    const loadCollection = async () => {
      try {
        const response = await fetch("/api/portfolio", { cache: "no-store" });
        const data = await response.json();
        if (response.ok && isMounted) {
          setDevProjects(mergeDevProjects(data?.devProjects));
        }
      } catch {
        // Keep the bundled defaults if live data is unavailable.
      }
    };

    loadCollection();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(devProjects.map((project) => project.category).filter(Boolean)))],
    [devProjects]
  );

  const filteredProjects =
    activeCategory === "All"
      ? devProjects
      : devProjects.filter((project) => project.category === activeCategory);

  const featuredProjects = filteredProjects.slice(0, 3);
  const supportingProjects = filteredProjects.slice(3);

  return (
    <div className="min-h-screen font-[var(--font-sans)] flex flex-col bg-[var(--background)]">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <section className="hero-surface relative isolate overflow-hidden pt-10 sm:pt-14 lg:pt-16 pb-10 sm:pb-14">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_12%_10%,rgba(var(--accent-sky-rgb),0.18),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(1000px_650px_at_82%_18%,rgba(var(--accent-rgb),0.14),transparent_58%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_50%_110%,rgba(var(--accent-sky-rgb),0.08),transparent_58%)]" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[var(--background)]" />
        </div>

        <div className="relative z-10 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--hero-border)] bg-[var(--hero-chip-bg)] px-3 py-1.5 text-[10px] sm:text-xs uppercase tracking-[0.32em] text-[var(--hero-muted)] backdrop-blur-xl">
                Portfolio
                <span className="h-1 w-6 rounded-full bg-[rgba(var(--accent-sky-rgb),0.85)]" />
                Selected projects
              </div>

              <h1 className="mt-6 text-4xl font-semibold leading-[1.03] tracking-[-0.03em] sm:text-5xl lg:text-6xl text-[var(--hero-ink)]">
                Projects that feel polished,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--hero-grad-a)] via-[var(--hero-grad-b)] to-[var(--hero-grad-c)]">
                  {" "}
                  useful, and built to last.
                </span>
              </h1>

              <p className="mt-4 text-base leading-relaxed text-[var(--hero-sub)] sm:text-lg max-w-2xl">
                A focused archive of the web platforms, product builds, and brand-led digital work we’ve shipped with
                production discipline and client-ready presentation.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[image:var(--hero-primary-bg)] bg-[length:100%_100%] bg-no-repeat px-6 py-3 text-sm font-semibold text-[var(--hero-primary-fg)] shadow-[var(--hero-primary-shadow)] ring-1 ring-[var(--hero-border)] transition hover:-translate-y-0.5"
                >
                  Book a Strategy Call
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-[var(--hero-border)] bg-[var(--hero-chip-bg)] px-6 py-3 text-sm font-semibold text-[var(--hero-ink)] backdrop-blur-xl transition hover:bg-[var(--hero-chip-hover)]"
                >
                  Back to Home
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-2">
                {["Web platforms", "Dashboards", "Mobile apps", "Client portals", "Brand systems"].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-[var(--hero-border)] bg-[var(--hero-chip-bg)] px-3 py-1.5 text-[11px] font-medium text-[var(--hero-sub)] backdrop-blur-xl"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 rounded-[28px] hero-panel-glow blur-2xl" />
              <div className="relative overflow-hidden rounded-[28px] border border-[var(--hero-border)] bg-[var(--hero-panel-bg)] p-6 shadow-[var(--hero-panel-shadow)] backdrop-blur-2xl">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.34em] text-[rgba(var(--accent-sky-rgb),0.75)]">
                      Archive snapshot
                    </p>
                    <h2 className="mt-2 text-xl font-semibold tracking-[-0.02em] sm:text-2xl text-[var(--hero-ink)]">
                      Clean work, clear outcomes.
                    </h2>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 rounded-full border border-[var(--hero-border)] bg-[var(--hero-chip-bg)] px-3 py-1.5 text-xs text-[var(--hero-muted)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[rgba(var(--accent-sky-rgb),0.85)]" />
                    Client-ready
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "Projects shown", value: devProjects.length.toString() },
                    { label: "Active filters", value: categories.length.toString() },
                    { label: "Featured cards", value: "3" },
                    { label: "Theme", value: "Aligned" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-[var(--hero-border)] bg-[var(--hero-chip-bg)] p-4">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--hero-muted)]">{item.label}</p>
                      <p className="mt-2 text-2xl font-semibold text-[var(--hero-ink)]">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-[var(--hero-border)] bg-[var(--hero-diagram-bg)] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.34em] text-[var(--hero-muted)]">What clients get</span>
                    <Sparkles className="h-4 w-4 text-[rgba(var(--accent-sky-rgb),0.9)]" />
                  </div>
                  <div className="mt-4 grid gap-2">
                    {[
                      "Clear category grouping",
                      "Confident visual hierarchy",
                      "Polished project presentation",
                      "Direct path to contact",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-[var(--hero-border)] bg-[var(--hero-chip-bg)] px-3 py-2 text-sm text-[var(--hero-muted)]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 lg:pb-20">
        <section className="py-2 sm:py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Filter</p>
              <h2 className="mt-3 text-2xl sm:text-3xl font-semibold">Browse by project type.</h2>
              <p className="mt-3 text-[15px] text-[var(--foreground)]/78">
                The same premium visual language, now organized to help clients move quickly from interest to the
                right kind of work.
              </p>
            </div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/60">
              Built from live project data
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={[
                  "rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.24em] font-semibold transition-all",
                  activeCategory === category
                    ? "bg-[var(--button-bg)] text-white shadow-[var(--shadow-tight)]"
                    : "bg-[var(--glass-surface)] text-[var(--foreground)]/70 shadow-[var(--shadow-tight)] hover:bg-[var(--glass-surface-strong)]",
                ].join(" ")}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="space-y-5">
              {featuredProjects.map((project, index) => (
                <motion.a
                  key={project.id}
                  href={project.link}
                  target={project.link.startsWith("http") ? "_blank" : undefined}
                  rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="group block overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-surface)] shadow-[var(--shadow-tight)] backdrop-blur-xl transition hover:-translate-y-1.5"
                >
                  <div className="grid gap-0 sm:grid-cols-[190px_1fr]">
                    <div className="relative min-h-[190px] bg-white/60">
                      <Image
                        src={project.image || FALLBACK}
                        alt={project.title}
                        fill
                        className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, 190px"
                      />
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--foreground)]/55">
                            {project.category}
                          </p>
                          <h3 className="mt-3 text-xl sm:text-2xl font-semibold tracking-[-0.02em]">
                            {project.title}
                          </h3>
                        </div>
                        <ExternalLink className="h-4 w-4 text-[var(--button-bg)] opacity-70 transition group-hover:opacity-100" />
                      </div>

                      <p className="mt-4 text-[15px] leading-relaxed text-[var(--foreground)]/78">
                        {project.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface-muted)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="space-y-5">
              <div className="rounded-3xl bg-[var(--card-bg)] p-6 sm:p-7 shadow-[var(--shadow-soft)]">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--foreground)]/60">Why this works</p>
                <h3 className="mt-3 text-xl sm:text-2xl font-semibold">The portfolio now reads like a premium case-study reel.</h3>
                <p className="mt-3 text-[15px] text-[var(--foreground)]/75">
                  No extra gallery branch, no mixed signals, and no section that competes with the main story. Each
                  project is presented with the same visual weight and the same polished finish.
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    "Projects only, no design gallery split",
                    "Same glass + gradient language as the landing page",
                    "Category filtering stays simple",
                    "Contact CTA stays visible and direct",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl bg-[var(--glass-surface)] p-4 shadow-[var(--shadow-tight)]">
                      <p className="text-sm text-[var(--foreground)]/75">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-[var(--glass-surface)] p-6 sm:p-7 shadow-[var(--shadow-tight)]">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--foreground)]/60">Contact</p>
                <h3 className="mt-3 text-xl font-semibold">Need something like this?</h3>
                <p className="mt-3 text-[15px] text-[var(--foreground)]/75">
                  If you want a platform, a redesign, or a clean product build, let’s scope it properly.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--button-bg)] px-5 py-3 text-xs uppercase tracking-[0.24em] font-semibold text-white shadow-[var(--shadow-tight)]"
                  >
                    Start a Project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/#pricing"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface)] px-5 py-3 text-xs uppercase tracking-[0.24em] font-semibold text-[var(--foreground)] hover:bg-[var(--glass-surface-strong)] transition"
                  >
                    View Pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {supportingProjects.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">More work</p>
                  <h3 className="mt-3 text-xl sm:text-2xl font-semibold">Additional projects in the archive.</h3>
                </div>
                <span className="hidden sm:inline-flex text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/60">
                  {supportingProjects.length} more
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {supportingProjects.map((project, index) => (
                  <motion.a
                    key={project.id}
                    href={project.link}
                    target={project.link.startsWith("http") ? "_blank" : undefined}
                    rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.55, delay: index * 0.06 }}
                    className="group flex flex-col rounded-3xl bg-[var(--glass-surface)] p-5 sm:p-6 shadow-[var(--shadow-tight)] backdrop-blur-xl transition hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--foreground)]/55">
                        {project.category}
                      </p>
                      <ExternalLink className="h-4 w-4 text-[var(--button-bg)] opacity-70 transition group-hover:opacity-100" />
                    </div>

                    <h3 className="mt-3 text-lg sm:text-xl font-semibold">{project.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--foreground)]/75">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface-muted)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
