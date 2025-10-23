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
  const extendedClients = [...clients, ...clients];
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="clients"
      className="py-8 sm:py-12 lg:py-16 bg-[var(--background)] mt-16 sm:mt-20 scroll-mt-[80px]"
      style={{ background: 'linear-gradient(to bottom right, var(--background), var(--card-bg))' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 lg:mb-12" style={{ color: 'var(--foreground)' }}>
          Our Clients
        </h2>
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 20,
            }}
            style={{ width: "200%" }}
          >
            {extendedClients.map((client, index) => (
              <div
                key={`${client.alt}-${index}`}
                className="flex-shrink-0 px-1 sm:px-2 md:px-3 lg:px-4"
                style={{ width: `${100 / clients.length}%` }}
              >
                <a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative w-full h-12 sm:h-16 md:h-20 lg:h-24"
                >
                  <Image
                    src={client.src}
                    alt={client.alt}
                    fill
                    className="object-contain rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                    sizes="(max-width: 640px) 30vw, (max-width: 1024px) 20vw, 15vw"
                  />
                </a>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}