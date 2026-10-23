import { motion } from "framer-motion";
import Image from "next/image";

export default function ClientsSection() {
  const clients = [
    { src: "/Macdee.png", alt: "Macdee", url: "https://macdee-entertainment.vercel.app/" },
    { src: "/clients/sorana.png", alt: "Sorana Property Managers", url: "https://www.soranapropertymanagers.com/" },
    { src: "/Baggit.png", alt: "Baggit", url: "https://baggit-psi.vercel.app/" },
  ];

  const featured = clients;

  return (
    <motion.section
      id="clients"
      className="py-8 sm:py-10 lg:py-12 scroll-mt-[96px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Clients</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-3">
              Teams we’ve supported.
            </h2>
            <p className="text-[15px] text-[var(--foreground)]/78 mt-3">
              Product engineering, design systems, and delivery support across multiple industries.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/60">
            Featured Clients
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {featured.map((client) => (
              <a
                key={client.alt}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl bg-[var(--glass-surface)] p-4 shadow-[var(--shadow-tight)] backdrop-blur-xl hover:-translate-y-1 transition"
              >
                <div className="relative h-12 sm:h-14">
                  <Image
                    src={client.src}
                    alt={client.alt}
                    fill
                    className="object-contain grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition"
                    sizes="160px"
                  />
                </div>
                <p className="mt-3 text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/60">
                  {client.alt}
                </p>
              </a>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-[var(--card-bg)] p-6 sm:p-7 shadow-[var(--shadow-soft)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(var(--accent-rgb),0.14),_transparent_60%)]" />
            <div className="relative z-10">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--foreground)]/60">Selected work</p>
              <h3 className="text-xl sm:text-2xl font-semibold mt-3">Explore projects and products.</h3>
              <p className="text-[15px] text-[var(--foreground)]/75 mt-3">
                Browse public project examples and Vickins-built products to see the kinds of digital systems we work on.
              </p>
              <a href="/portfolio" className="mt-6 inline-flex rounded-full bg-[var(--button-bg)] px-5 py-3 text-sm font-semibold text-white">
                View portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
