"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { getDefaultDevProjects, type DevProject } from "@/lib/portfolio-collection";

const FALLBACK_MAIN = "/images/placeholder-4x3.png";
const projects = getDefaultDevProjects();
const featuredProjects = projects.slice(0, 2);
const clientProjects = projects.slice(2);
const isExternalLink = (href: string) => href.startsWith("http");

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reducedMotion = useReducedMotion();
  return <motion.div initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>;
}

function ProjectVisual({ project, featured = false }: { project: DevProject; featured?: boolean }) {
  const officialLogo = project.id === "my-accurate-rent";
  return <div className={["work-visual relative overflow-hidden", featured ? "min-h-[310px] sm:min-h-[440px]" : "min-h-[230px] sm:min-h-[300px]"].join(" ")}>
    <div className="absolute inset-0 work-visual-grid" aria-hidden="true" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(var(--accent-sky-rgb),.2),transparent_34%),radial-gradient(circle_at_20%_90%,rgba(var(--accent-rgb),.16),transparent_38%)]" aria-hidden="true" />
    {officialLogo ? <div className="absolute inset-0 z-[1] flex items-center justify-center p-5 sm:p-7"><div className="relative aspect-square w-[min(100%,250px)]"><Image src={project.image} alt="Official My Accurate Rent logo" fill className="object-contain" sizes="(max-width: 640px) 80vw, 250px" /></div></div> : <Image src={project.image || FALLBACK_MAIN} alt={`${project.title} project visual`} fill priority={featured} className={["relative z-[1] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.045]", featured ? "p-12 sm:p-20" : "p-9 sm:p-12"].join(" ")} sizes={featured ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 640px) 100vw, 50vw"} />}
    <div className="absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-t from-black/25 to-transparent opacity-60" aria-hidden="true" />
    <span className="absolute left-5 top-5 z-[3] text-[10px] font-semibold uppercase tracking-[0.3em] text-white/75">Project visual</span>
  </div>;
}

function ProjectMeta({ project, featured = false }: { project: DevProject; featured?: boolean }) {
  const external = isExternalLink(project.link);
  return <div className={featured ? "p-6 sm:p-8 lg:p-10" : "p-5 sm:p-7"}>
    <div className="flex items-start justify-between gap-5"><div><p className="work-kicker">{project.category}</p><h3 className={featured ? "mt-4 max-w-xl text-3xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-4xl lg:text-[3.15rem]" : "mt-3 text-2xl font-semibold leading-[1.05] tracking-[-0.045em]"}>{project.title}</h3>{project.attribution && <p className="mt-2 text-xs font-medium tracking-wide text-[var(--foreground)]/55">{project.attribution}</p>}</div><span className="work-index" aria-hidden="true">{featured ? "0" : ""}</span></div>
    <p className={featured ? "mt-5 max-w-xl text-[15px] leading-7 text-[var(--foreground)]/70 sm:text-base" : "mt-4 text-sm leading-6 text-[var(--foreground)]/70"}>{project.description}</p>
    <div className="mt-6 flex flex-wrap gap-x-2 gap-y-2">{project.tags.slice(0, featured || project.id === "my-accurate-rent" ? 5 : 4).map((tag) => <span key={tag} className="work-tag">{tag}</span>)}</div>
    <span className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)] transition group-hover:gap-3">{project.actionLabel || (external ? "View project" : "View portfolio")}{external ? <ExternalLink className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}</span>
  </div>;
}

function FeaturedProject({ project, index }: { project: DevProject; index: number }) {
  const external = isExternalLink(project.link);
  const reverse = index % 2 === 1;
  return <Reveal delay={index * 0.08}><a href={project.link} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={["work-feature group", reverse ? "lg:grid-cols-[0.88fr_1.12fr]" : "lg:grid-cols-[1.12fr_0.88fr]"].join(" ")} aria-label={`View ${project.title}`}>
    <div className={reverse ? "lg:order-2" : ""}><ProjectVisual project={project} featured /></div><div className={["flex flex-col justify-center", reverse ? "lg:order-1" : ""].join(" ")}><ProjectMeta project={project} featured /></div>
  </a></Reveal>;
}

function ClientCard({ project, index }: { project: DevProject; index: number }) {
  const external = isExternalLink(project.link);
  const span = index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : index === 2 ? "lg:col-span-5" : index === 3 ? "lg:col-span-7" : "lg:col-span-12";
  return <Reveal delay={(index % 3) * 0.07} className={["group", span].join(" ")}><a href={project.link} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="work-card block h-full" aria-label={`View ${project.title}`}><ProjectVisual project={project} /><ProjectMeta project={project} /></a></Reveal>;
}

export default function RecentProjectsSection() {
  return <section id="work" className="work-section scroll-mt-[96px]"><div className="mx-auto max-w-6xl">
    <Reveal><div className="work-intro"><div><p className="work-kicker text-[var(--accent)]">Work / Selected projects</p><h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-5xl lg:text-7xl">Products built with purpose.</h2></div><p className="max-w-sm text-[15px] leading-7 text-[var(--foreground)]/68 lg:pb-1">We design and engineer digital products, platforms and systems built to perform in the real world.</p></div></Reveal>
    <div className="mt-16 space-y-7 sm:mt-20 lg:mt-24 lg:space-y-10">{featuredProjects.map((project, index) => <FeaturedProject key={project.id ?? project.title} project={project} index={index} />)}</div>
    <Reveal className="mt-24 sm:mt-32"><div className="flex items-end justify-between gap-5 border-b border-[var(--border)] pb-5"><div><p className="work-kicker text-[var(--accent)]">02 — Client work</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">Selected client work</h2></div><span className="hidden text-xs uppercase tracking-[0.24em] text-[var(--foreground)]/45 sm:block">Built for the real world</span></div></Reveal>
    <div className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-7">{clientProjects.map((project, index) => <ClientCard key={project.id ?? project.title} project={project} index={index} />)}</div>
    <Reveal className="mt-20 sm:mt-28"><div className="work-cta"><div><p className="work-kicker text-[var(--accent)]">Next chapter</p><h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-5xl">Have something ambitious in mind?</h2><p className="mt-4 text-[15px] text-[var(--foreground)]/65">Let&apos;s design and build it.</p></div><a href="#contact" className="work-cta-link">Start a project <ArrowUpRight className="h-4 w-4" /></a></div></Reveal>
  </div></section>;
}
