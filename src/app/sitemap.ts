import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";

const publicRoutes = [
  { path: "/", changeFrequency: "monthly" as const, priority: 1 },
  { path: "/portfolio", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/products/dira-os", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/products/vornshield", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/vickins-security", changeFrequency: "monthly" as const, priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes = servicePages.map(({ slug }) => ({ path: `/services/${slug}`, changeFrequency: "monthly" as const, priority: 0.7 }));
  return [...publicRoutes, ...serviceRoutes].map(({ path, changeFrequency, priority }) => ({
    url: canonicalUrl(path),
    changeFrequency,
    priority,
  }));
}
