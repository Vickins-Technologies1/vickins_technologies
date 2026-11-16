import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { chamaPulseProduct, diraOsProduct, vornShieldProduct } from "@/lib/portfolio-collection";

const products = [
  { ...diraOsProduct, badge: "FLAGSHIP", title: "Dira OS", category: "Business Operating System", className: "lg:col-span-12" },
  { ...chamaPulseProduct, badge: "COMMUNITY PLATFORM", category: "Chama Management Platform", className: "lg:col-span-12" },
  { ...vornShieldProduct, badge: "INFRASTRUCTURE PLATFORM", category: "Proxy Infrastructure", className: "lg:col-span-12" },
];

const syncStages = [
  { label: "ONLINE", detail: "Sales + inventory" },
  { label: "OFFLINE", detail: "Work stays local" },
  { label: "RESTORE", detail: "Connection returns" },
  { label: "SYNCED", detail: "Records up to date" },
];

function OfflineSyncFlow() {
  return (
    <div
      role="group"
      aria-label="Dira OS keeps sales and inventory work available offline, then synchronizes records when the connection returns."
      className="mt-6 border-t border-[var(--glass-border)] pt-4"
    >
      <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[var(--foreground)]/55 sm:text-[10px]">
        Offline-first workflow
      </p>
      <div className="relative mt-3 grid grid-cols-4 gap-1 sm:gap-2">
        <motion.div
          aria-hidden="true"
          className="absolute left-[12.5%] right-[12.5%] top-[13px] h-px origin-left bg-[var(--accent)]/50"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.95, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
        {syncStages.map((stage, index) => (
          <motion.div
            key={stage.label}
            initial={{ opacity: 0, y: 9 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.38, delay: 0.16 + index * 0.1 }}
            className="relative z-10 flex min-w-0 flex-col items-center text-center"
          >
            <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full border border-[var(--glass-border-strong)] bg-[var(--card-bg)] text-[9px] font-semibold tabular-nums text-[var(--accent)] shadow-[var(--shadow-tight)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mt-2 text-[8px] font-bold uppercase tracking-[0.11em] text-[var(--foreground)] sm:text-[9px] sm:tracking-[0.16em]">
              {stage.label}
            </span>
            <span className="mt-1 text-[9px] leading-4 text-[var(--foreground)]/60 sm:text-[10px]">
              {stage.detail}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ProductsSection() {
  return (
    <motion.section
      id="products"
      className="py-8 sm:py-10 lg:py-12 scroll-mt-[96px]"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative overflow-hidden rounded-[36px] bg-[var(--card-bg)] p-5 shadow-[var(--shadow-soft)] sm:p-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(var(--accent-sky-rgb),0.14),transparent_48%)]" />
        <div className="relative z-10">
          <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Products</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Vickins-Built Products</h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--foreground)]/76">
            Products and platforms built by Vickins Technologies to solve real operational and infrastructure problems.
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-12">
            {products.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3, scale: 1.006 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative overflow-hidden rounded-[28px] border border-[var(--glass-border)] bg-[var(--glass-surface)] p-5 transition-[border-color,box-shadow] duration-300 hover:border-[rgba(var(--accent-sky-rgb),0.45)] hover:shadow-[var(--shadow-tight)] sm:p-7 ${product.className}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${index === 0 ? "bg-[var(--button-bg)] text-white" : "border border-[var(--glass-border)] text-[var(--foreground)]/65"}`}>
                      {product.badge}
                    </span>
                    <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{product.title}</h3>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]">{product.category}</p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.18 + index * 0.12 }}
                    className="shrink-0"
                  >
                    <Image src={product.image} alt={`${product.title} product logo`} width={64} height={64} className="h-14 w-14 object-contain" />
                  </motion.div>
                </div>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--foreground)]/76">{product.description}</p>
                {index === 0 && <OfflineSyncFlow />}
                <div className="mt-5 flex flex-wrap gap-2">
                  {product.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.16 + tagIndex * 0.035 }}
                      className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface-muted)] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--foreground)]/65"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-4 text-sm font-semibold text-[var(--accent)]">
                  <a href={product.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline">
                    Visit {product.title}
                    <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
                  </a>
                  <Link href={`/products/${product.id}`} className="text-[var(--foreground)]/70 hover:text-[var(--accent)] hover:underline">
                    Company profile
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
