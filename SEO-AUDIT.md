# SEO implementation audit

Reviewed the Next.js App Router source and the live corporate homepage on 24 October 2026. This is a code and public-page audit; it is not a Search Console, analytics, full-site crawl, or Lighthouse report.

| Finding | Location | Impact | Action/status |
| --- | --- | --- | --- |
| Homepage exposed illustrative outcome figures and fabricated placeholder testimonials as social proof, with copy telling visitors to replace them. | `src/components/ProofSection.tsx` (rendered on `/`; confirmed on live page) | Misleads visitors and weakens credibility. | Removed the component and its homepage placement. |
| Homepage title/description and hero H1 described broad digital services but omitted the primary Kenya market and software-development positioning. | `src/app/page.tsx`, `src/app/layout.tsx`, `src/components/HeroSection.tsx` | Search snippets and first-screen content did not state the primary market clearly. | Updated metadata and H1/intro while retaining service links and the visual layout. |
| Sitemap included legal pages and `/vtix` without proving they are preferred organic landing pages; product and portfolio routes are established. | `src/app/sitemap.ts` | Unnecessary URLs dilute sitemap focus. | Kept homepage, portfolio, products, and security routes; removed `/vtix`, `/policy`, and `/terms`. Reassess if these are intentional search destinations. |
| Metadata helper already generates canonical, Open Graph, and Twitter metadata; global layout has Organization JSON-LD; homepage has WebSite/WebPage/product graph; robots handler references sitemap. | `src/lib/seo.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/robots.ts` | Strong foundation; no source-confirmed missing canonical/robots implementation. | Existing implementation retained. Live robots and sitemap endpoints could not be retrieved by the available web reader. |
| Several application, account, admin, and API routes exist alongside public marketing pages. | `src/app/**` | Accidental indexing could expose low-value or user-specific routes. | robots rules already disallow key private prefixes; production status/indexability requires crawl and hosting checks. |
| No dedicated service landing page routes exist for the listed software services; services appear in homepage sections. | `src/app/**`, `src/components/ServicesSection.tsx` | Limited route-level coverage for individual service searches. | Not added in this pass; needs distinct, company-verified service content to avoid thin pages. |

## Not verified from repository alone

- Live HTTP status, redirect chains, alternate host/protocol behavior, complete internal-link health, and live sitemap contents.
- Full image alt-text coverage, rendered mobile behavior, JavaScript-disabled experience, and real-user or lab Core Web Vitals.
- Search Console, Google Business Profile, Analytics, form-event tracking, and production deployment configuration.
- Correctness of company address, phone, client claims, and product feature claims beyond their presence in source. Business owner should confirm before expanding local or product claims.

## Recommended follow-up

1. Verify preferred host and redirects in production and fetch `/robots.txt` and `/sitemap.xml` directly.
2. Crawl every public route and validate rendered metadata, status codes, headings, links, images, and JSON-LD.
3. With owner verification, publish distinct service pages for web development, custom software, mobile apps, POS, and e-commerce, then add them to primary navigation/sitemap as appropriate.
4. Review Search Console indexing and mobile Core Web Vitals after deployment; do not infer ranking or field-performance gains from code changes alone.
