# Vickins Technologies SEO audit and implementation record

Updated: 2026-10-10

## Scope and verified identity

The canonical website is `https://www.vickinstechnologies.com/`. The repository is a Next.js App Router application with server-rendered public marketing routes and client-rendered authenticated workspaces.

Verified company identity used in the implementation:

- Name: Vickins Technologies
- Alternate name: Vickins
- Public contact: `info@vickinstechnologies.com`, `+254 794 501 005`
- Location stated on the public site: Ruiru, Kenya / Nairobi-based team
- Official profiles currently represented in the site footer: X, Facebook, Instagram, GitHub
- Product relationships: Dira OS and VornShield are represented as Vickins-built products; client work remains labelled as client work

The Google Play listing for Dira OS was verified separately at `https://play.google.com/store/apps/details?id=com.bizpro.vickins`. No ratings, review counts, or customer counts are claimed in structured data.

## Public route inventory

Indexable targets:

| Route | Purpose | Canonical | Sitemap |
| --- | --- | --- | --- |
| `/` | Company homepage and entity hub | Self | Yes |
| `/portfolio` | Products and selected client work | Self | Yes |
| `/products/dira-os` | Vickins product profile for Dira OS | Self | Yes |
| `/products/vornshield` | Vickins product profile for VornShield | Self | Yes |
| `/vickins-security` | Security solutions | Self | Yes |
| `/vtix` | Public event ticketing marketplace | Self | Yes |
| `/policy` | Privacy policy | Self | Yes |
| `/terms` | Terms of service | Self | Yes |

Non-indexable or excluded surfaces include `/admin/*`, `/api/*`, `/chama/*`, login and signup routes, `/moderator/*`, `/vtix/dashboard/*`, and `/vtix/verify`.

## Problems found and fixes

| Severity | Finding | Fix |
| --- | --- | --- |
| High | No generated `robots.txt` or `sitemap.xml` existed on the deployed corporate site | Added App Router `robots.ts` and `sitemap.ts` with absolute canonical URLs and private-route exclusions |
| High | Organization JSON-LD was emitted with inconsistent product-shaped data and no stable entity ID | Added one stable `Organization` entity at `/#organization` and referenced it from the homepage graph |
| High | Root metadata described products but did not establish a complete company/entity graph | Added `WebSite`, `WebPage`, `SoftwareApplication` for Dira OS, and `Product` for VornShield |
| Medium | Page-specific canonical and social metadata was missing on most public routes | Added centralized `pageMetadata` helper and route layouts for public pages |
| Medium | Authenticated workspaces could be discoverable through HTML links | Added route metadata and proxy `X-Robots-Tag: noindex, nofollow` protections |
| Medium | Homepage brand identity was not explicit in the opening copy | Updated the hero introduction to name Vickins Technologies naturally and added a verified Dira OS Google Play CTA |
| Medium | Products were only described in homepage cards with no dedicated company-owned profiles | Added `/products/dira-os` and `/products/vornshield` with verified descriptions, internal links, external official links, and product structured data |
| Low | SEO validation was manual and lint had no ESLint 9 flat config | Added `scripts/validate-seo.mjs` and `eslint.config.mjs` |

## Structured data

The root layout emits one consistent Organization entity. The homepage adds a graph connecting:

- WebSite → Organization publisher
- WebPage → WebSite and Organization
- Dira OS SoftwareApplication → Organization publisher and Google Play listing
- VornShield Product → Organization brand/manufacturer

This is descriptive markup only. It does not guarantee rich results, rankings, autocomplete, or brand-name suggestions.

## External link and product checks

- Dira OS: `https://dira-os.vickinstechnologies.com/` is linked from the homepage and portfolio. The official Google Play URL is linked from the Dira OS section and referenced in structured data.
- VornShield: `https://vornshield.vickinstechnologies.com/` is the current product URL used in the product inventory. The legacy `v-guard` hostname did not resolve during the audit and is not used as the canonical product URL.
- Client projects are presented as client work and are not represented as Vickins-owned products.
- No fabricated reviews, ratings, awards, customer counts, or case-study outcomes were added.

## Validation performed

Local checks:

- TypeScript: `pnpm exec tsc --noEmit` passed.
- Unit tests: `pnpm test` passed before the SEO changes (2 files, 3 tests).
- SEO source assertions: run with `node scripts/validate-seo.mjs`.
- Lint: ESLint 9 flat configuration was added; run `pnpm lint` after dependency installation/cache refresh.
- Production build: run `pnpm build` in the deployment environment; the previous build attempt in this workspace stalled during Next optimized compilation.

Post-deployment HTTP checks to run:

```powershell
Invoke-WebRequest https://www.vickinstechnologies.com/robots.txt
Invoke-WebRequest https://www.vickinstechnologies.com/sitemap.xml
Invoke-WebRequest https://www.vickinstechnologies.com/
```

Confirm each response is 200, the sitemap contains only the six canonical public targets above, and the page source contains one Organization entity ID plus the homepage graph.

## Remaining domain-owner actions

1. Deploy the changes to the production domain.
2. In Google Search Console, add and verify the domain property, submit `https://www.vickinstechnologies.com/sitemap.xml`, and inspect `/`, `/portfolio`, `/vickins-security`, and `/vtix` for indexing.
3. In Bing Webmaster Tools, verify the domain, submit the same sitemap, and review crawl/index coverage.
4. Confirm ownership and accuracy of every social profile in the footer; replace any personal or outdated profile with an official company profile where necessary.
5. Measure Core Web Vitals in Search Console and field data after deployment. No performance improvement is claimed without measurement.

## 90-day brand authority plan

### Days 0–30: technical baseline

- Deploy and validate canonical tags, robots, sitemap, structured data, status codes, and private-route exclusions.
- Record Search Console and Bing baseline impressions, clicks, indexed pages, branded queries, and crawl errors.
- Confirm logo, company description, contact details, and product URLs are identical across official profiles.

### Days 31–60: first-party depth

- Publish one reviewed, original engineering or product article based on an actual Vickins build, such as offline-first business software or mobile application delivery.
- Add dedicated project pages only when approved project facts, screenshots, roles, and public URLs are available.
- Improve image filenames, alt text, and explicit dimensions as new project assets are added.

### Days 61–90: credible references

- Request client-approved case studies and links from genuine project owners.
- Submit products to relevant, legitimate directories only where the listing is accurate and independently useful.
- Review branded versus non-branded landing-page performance monthly and update content based on actual search queries rather than keyword assumptions.
