import { motion } from "framer-motion";
import Image from "next/image";

export default function ClientsSection() {
  const clients = [
    { src: "/Macdee.png", alt: "Macdee", url: "https://macdeeentertainment.com" },
    { src: "/scr.png", alt: "SCR", url: "https://smartchoicerentalmanagement.com" },
    { src: "/Baggit.png", alt: "Baggit", url: "https://baggit-ashy.vercel.app/" },
    { src: "/2.png", alt: "Client 4", url: "https://leasecaptain.com" },
    { src: "/black.png", alt: "Client 5", url: "https://vickins-technologies.onrender.com" },
    { src: "/flexi.png", alt: "Flexi", url: "#" },
    { src: "/mti.png", alt: "crm", url: "#" },
    { src: "/store.png", alt: "store", url: "#" },
    { src: "/Jayden.png", alt: "ent", url: "#" },
    { src: "/lovense.png", alt: "Blog", url: "#" },
  ];

  const featured = clients.slice(0, 5);
  const extendedClients = [...clients, ...clients];

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
                className="group rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-4 shadow-[var(--shadow-tight)] backdrop-blur-xl hover:-translate-y-1 transition"
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

          <div className="relative overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-6 sm:p-7 shadow-[var(--shadow-soft)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(240,176,16,0.14),_transparent_60%)]" />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--foreground)]/60">
                  Brand Wall
                </p>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">Partners</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mt-3">A wider network of client brands.</h3>
              <p className="text-[15px] text-[var(--foreground)]/75 mt-3">
                A quick scroll through brands we’ve contributed to — with confidentiality respected where needed.
              </p>

              <div className="mt-6 overflow-hidden">
                <motion.div
                  className="flex"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 22 }}
                  style={{ width: "200%" }}
                >
                  {extendedClients.map((client, index) => (
                    <div
                      key={`${client.alt}-${index}`}
                      className="flex-shrink-0 px-3"
                      style={{ width: `${100 / clients.length}%` }}
                    >
                      <div className="relative h-12 sm:h-14">
                        <Image
                          src={client.src}
                          alt={client.alt}
                          fill
                          className="object-contain opacity-70"
                          sizes="120px"
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
