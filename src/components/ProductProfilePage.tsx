import Image from "next/image";
import Link from "next/link";

type ProductProfilePageProps = {
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  imageAlt: string;
  officialUrl: string;
  officialLabel: string;
  features: string[];
  structuredData: Record<string, unknown>;
};

export default function ProductProfilePage({
  name,
  eyebrow,
  description,
  image,
  imageAlt,
  officialUrl,
  officialLabel,
  features,
  structuredData,
}: ProductProfilePageProps) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-xs text-[var(--foreground)]/60">
          <Link href="/" className="hover:text-[var(--accent)]">Vickins Technologies</Link>
          <span className="px-2" aria-hidden="true">/</span>
          <span>{name}</span>
        </nav>

        <section className="mt-8 grid items-center gap-10 rounded-[36px] bg-[var(--card-bg)] p-6 shadow-[var(--shadow-soft)] sm:p-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">{eyebrow}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">{name}</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--foreground)]/78 sm:text-lg">{description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-[var(--button-bg)] px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-tight)]">
                {officialLabel}
              </a>
              <Link href="/portfolio" className="inline-flex items-center rounded-full border border-[var(--glass-border-strong)] bg-[var(--glass-surface)] px-5 py-3 text-sm font-semibold">
                View portfolio
              </Link>
            </div>
          </div>

          <div className="flex min-h-[260px] items-center justify-center rounded-[28px] border border-[var(--glass-border-strong)] bg-[var(--glass-surface)] p-8">
            <Image src={image} alt={imageAlt} width={260} height={260} priority className="h-52 w-52 object-contain" />
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[28px] bg-[var(--glass-surface)] p-6 shadow-[var(--shadow-tight)]">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">Developed by Vickins</p>
            <h2 className="mt-3 text-2xl font-semibold">Part of the Vickins product ecosystem.</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]/72">
              Vickins Technologies builds digital products and platforms around practical business and infrastructure needs. Visit the official product destination for the current experience and availability.
            </p>
          </div>

          <div className="rounded-[28px] bg-[var(--card-bg)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">Capabilities</p>
            <h2 className="mt-3 text-2xl font-semibold">What this product is built to support.</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature} className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-4 text-sm font-medium">
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-[var(--glass-border)] bg-[var(--glass-surface)] p-5 text-sm text-[var(--foreground)]/72">
          <span>Looking for a custom platform or product build?</span>
          <Link href="/#contact" className="font-semibold text-[var(--accent)] hover:underline">Talk to Vickins Technologies</Link>
        </div>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
