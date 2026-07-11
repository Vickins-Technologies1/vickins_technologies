"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { getDefaultDevProjects, type DevProject } from "@/lib/portfolio-collection";

const FALLBACK_MAIN = "/images/placeholder-4x3.png";

const projects = getDefaultDevProjects();

const isExternalLink = (href: string) => href.startsWith("http");

function ProjectCard({
  project,
  featured = false,
  index = 0,
}: {
  project: DevProject;
  featured?: boolean;
  index?: number;
}) {
  const external = isExternalLink(project.link);

  return (
    <motion.a
      href={project.link}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={[
        "group block overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-surface)] shadow-[var(--shadow-tight)] backdrop-blur-xl transition",
        featured ? "hover:-translate-y-1.5" : "hover:-translate-y-1",
      ].join(" ")}
    >
      <div className={featured ? "grid gap-0 lg:grid-cols-[1.05fr_0.95fr]" : "grid gap-0 sm:grid-cols-[170px_1fr]"}>
        <div
          className={[
            "relative overflow-hidden bg-white/60",
            featured ? "min-h-[240px] sm:min-h-[300px]" : "min-h-[180px]",
          ].join(" ")}
        >
          <Image
            src={project.image || FALLBACK_MAIN}
            alt={project.title}
            fill
            className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.03]"
            sizes={featured ? "(max-width: 1024px) 100vw, 55vw" : "(max-width: 640px) 100vw, 180px"}
          />
        </div>

        <div className={featured ? "p-5 sm:p-6 lg:p-7" : "p-5 sm:p-6"}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--foreground)]/55">
                {project.category}
              </p>
              <h3 className={featured ? "mt-3 text-2xl sm:text-3xl font-semibold tracking-[-0.02em]" : "mt-2 text-lg sm:text-xl font-semibold tracking-[-0.02em]"}>
                {project.title}
              </h3>
            </div>
            <ExternalLink className="mt-1 h-4 w-4 text-[var(--button-bg)] opacity-70 transition group-hover:opacity-100" />
          </div>

          <p className={featured ? "mt-4 text-[15px] leading-relaxed text-[var(--foreground)]/78" : "mt-3 text-[14px] leading-relaxed text-[var(--foreground)]/74"}>
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.slice(0, featured ? 5 : 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface-muted)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/70"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
            View project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export default function RecentProjectsSection() {
  const featuredProject = projects[0];
  const supportProjects = projects.slice(1);

  return (
    <section id="work" className="py-8 sm:py-10 lg:py-12 scroll-mt-[96px]">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-7">
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Work</p>
            <h2 className="text-2xl sm:text-3xl font-semibold mt-3">Projects that show how we deliver.</h2>
            <p className="text-[15px] text-[var(--foreground)]/78 mt-3">
              A focused view of the web, platform, and product work we have built for clients and in-house products.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--button-bg)] text-white px-5 py-3 text-xs uppercase tracking-[0.24em] font-semibold shadow-lg hover:shadow-xl transition"
            >
              Request a call
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

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-5 lg:gap-6">
          <ProjectCard project={featuredProject} featured index={0} />

          <div className="grid gap-4">
            {supportProjects.map((project, index) => (
              <ProjectCard key={project.id ?? project.title} project={project} index={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
