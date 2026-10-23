import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { organizationId, pageMetadata, siteUrl } from "@/lib/seo";
import { servicePageBySlug, servicePages } from "@/lib/service-pages";

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = servicePageBySlug[slug];
  if (!page) return {};
  return pageMetadata({ title: page.metaTitle, description: page.description, path: `/services/${page.slug}` });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = servicePageBySlug[slug];
  if (!page) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${siteUrl}/services/${page.slug}#service`,
        name: page.title,
        serviceType: page.title,
        description: page.description,
        url: `${siteUrl}/services/${page.slug}`,
        provider: { "@id": organizationId },
        areaServed: { "@type": "Country", name: "Kenya" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/#services` },
          { "@type": "ListItem", position: 3, name: page.title, item: `${siteUrl}/services/${page.slug}` },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link href="/" className="font-semibold tracking-wide">Vickins Technologies</Link>
        <nav aria-label="Service page navigation" className="flex items-center gap-4 text-sm">
          <Link href="/services/web-development">Services</Link>
          <Link href="/#products">Products</Link>
          <Link href="/#contact" className="rounded-full bg-[var(--button-bg)] px-4 py-2 font-semibold text-white">Enquire</Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="pt-6 text-sm text-[var(--foreground)]/65">
          <Link href="/">Home</Link><span aria-hidden="true"> / </span><Link href="/#services">Services</Link><span aria-hidden="true"> / </span><span aria-current="page">{page.title}</span>
        </nav>

        <section className="hero-surface mt-6 rounded-3xl px-6 py-14 sm:px-10 sm:py-20">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">Vickins Technologies · Services</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--foreground)]/78">{page.intro}</p>
          <Link href="/#contact" className="mt-8 inline-flex rounded-full bg-[var(--button-bg)] px-6 py-3 font-semibold text-white">Discuss your project</Link>
        </section>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-semibold">The problem this service addresses</h2>
              <p className="mt-3 leading-relaxed text-[var(--foreground)]/78">{page.problem}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold">What the work can include</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {page.deliverables.map((item) => <li key={item} className="glass-panel p-4">{item}</li>)}
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold">How we approach it</h2>
              <ol className="mt-4 space-y-3">
                {page.process.map((item, index) => <li key={item} className="glass-panel flex gap-4 p-4"><span className="font-semibold text-[var(--accent)]">0{index + 1}</span><span>{item}</span></li>)}
              </ol>
            </section>
            <section>
              <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
              <div className="mt-4 space-y-4">
                {page.faqs.map((faq) => <article key={faq.question} className="glass-panel p-5"><h3 className="font-semibold">{faq.question}</h3><p className="mt-2 leading-relaxed text-[var(--foreground)]/75">{faq.answer}</p></article>)}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="glass-panel p-6">
              <h2 className="text-xl font-semibold">Relevant use cases</h2>
              <ul className="mt-4 space-y-3 text-[var(--foreground)]/78">{page.useCases.map((item) => <li key={item}>• {item}</li>)}</ul>
            </section>
            {page.productUrl && <section className="glass-panel p-6"><h2 className="text-xl font-semibold">Related product</h2><p className="mt-3 leading-relaxed text-[var(--foreground)]/75">Dira OS is a Vickins Technologies product for POS, inventory and business operations.</p><a className="mt-4 inline-block font-semibold text-[var(--accent)] underline underline-offset-4" href={page.productUrl}>{page.productLabel}</a></section>}
            <section className="glass-panel p-6">
              <h2 className="text-xl font-semibold">Related services</h2>
              <ul className="mt-4 space-y-3">{page.related.map((relatedSlug) => { const related = servicePageBySlug[relatedSlug]; return <li key={relatedSlug}><Link className="text-[var(--accent)] underline underline-offset-4" href={`/services/${relatedSlug}`}>{related.title}</Link></li>; })}</ul>
              <Link href="/portfolio" className="mt-6 inline-block text-[var(--accent)] underline underline-offset-4">Explore selected projects</Link>
            </section>
          </aside>
        </div>
      </main>

      <footer className="border-t border-[var(--glass-border)] px-4 py-8 text-center text-sm text-[var(--foreground)]/65"><Link href="/">Vickins Technologies</Link> · <Link href="/#contact">Contact the team</Link></footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
