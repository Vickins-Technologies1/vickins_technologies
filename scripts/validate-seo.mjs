import { readFile } from "node:fs/promises";
import { access } from "node:fs/promises";

const requiredFiles = [
  "src/app/robots.ts",
  "src/app/sitemap.ts",
  "src/lib/seo.ts",
  "src/app/page.tsx",
  "src/app/portfolio/layout.tsx",
  "src/app/vickins-security/layout.tsx",
  "src/app/vtix/layout.tsx",
  "src/app/products/dira-os/page.tsx",
  "src/app/products/vornshield/page.tsx",
];

for (const file of requiredFiles) {
  await access(file);
}

const seoSource = await readFile("src/lib/seo.ts", "utf8");
const robotsSource = await readFile("src/app/robots.ts", "utf8");
const sitemapSource = await readFile("src/app/sitemap.ts", "utf8");
const homepageSource = await readFile("src/app/page.tsx", "utf8");

const assertions = [
  [seoSource.includes('https://www.vickinstechnologies.com'), "canonical site URL"],
  [seoSource.includes("#organization"), "stable organization identifier"],
  [seoSource.includes("alternateName: \"Vickins\""), "brand alternate name"],
  [seoSource.includes("dira-os.vickinstechnologies.com"), "Dira OS official URL"],
  [seoSource.includes("vornshield.vickinstechnologies.com"), "VornShield official URL"],
  [robotsSource.includes("sitemap.xml"), "robots sitemap reference"],
  [robotsSource.includes('"/api/"'), "API crawl exclusion"],
  [sitemapSource.includes('path: "/portfolio"'), "portfolio sitemap route"],
  [sitemapSource.includes('path: "/vickins-security"'), "security sitemap route"],
  [sitemapSource.includes('path: "/products/dira-os"'), "Dira OS product route"],
  [sitemapSource.includes('path: "/products/vornshield"'), "VornShield product route"],
  [homepageSource.includes("homepageJsonLd"), "homepage entity graph"],
];

const failures = assertions.filter(([passed]) => !passed).map(([, label]) => label);
if (failures.length) {
  console.error(`SEO validation failed: ${failures.join(", ")}`);
  process.exit(1);
}

console.log(`SEO validation passed (${assertions.length} checks).`);
