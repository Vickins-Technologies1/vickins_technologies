import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { diraOsProduct, vGuardProduct } from "@/lib/portfolio-collection";

const products = [
  { ...diraOsProduct, badge: "FLAGSHIP", title: "Dira OS", category: "Business Operating System", className: "lg:col-span-7" },
  { ...vGuardProduct, badge: "INFRASTRUCTURE PLATFORM", title: "V-Guard", category: "Proxy Management", className: "lg:col-span-5" },
];

export default function ProductsSection() {
  return (
    <motion.section id="products" className="py-8 sm:py-10 lg:py-12 scroll-mt-[96px]" initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.7 }}>
      <div className="relative overflow-hidden rounded-[36px] bg-[var(--card-bg)] p-5 shadow-[var(--shadow-soft)] sm:p-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(var(--accent-sky-rgb),0.14),transparent_48%)]" />
        <div className="relative z-10">
          <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Products</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Vickins-Built Products</h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--foreground)]/76">Products and platforms built by Vickins Technologies to solve real operational and infrastructure problems.</p>
          <div className="mt-8 grid gap-5 lg:grid-cols-12">
            {products.map((product, index) => (
              <a key={product.id} href={product.link} target="_blank" rel="noopener noreferrer" className={`group relative overflow-hidden rounded-[28px] border border-[var(--glass-border)] bg-[var(--glass-surface)] p-5 transition hover:-translate-y-1 hover:border-[rgba(var(--accent-sky-rgb),0.45)] sm:p-7 ${product.className}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${index === 0 ? "bg-[var(--button-bg)] text-white" : "border border-[var(--glass-border)] text-[var(--foreground)]/65"}`}>{product.badge}</span>
                    <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{product.title}</h3>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]">{product.category}</p>
                  </div>
                  <Image src={product.image} alt={`${product.title} product logo`} width={64} height={64} className="h-14 w-14 object-contain" />
                </div>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--foreground)]/76">{product.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">{product.tags.map((tag) => <span key={tag} className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface-muted)] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--foreground)]/65">{tag}</span>)}</div>
                <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">Explore {product.title} <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" /></div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
