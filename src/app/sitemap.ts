import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/seo";

const publicRoutes = [
  { path: "/", changeFrequency: "monthly" as const, priority: 1 },
  { path: "/portfolio", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/products/dira-os", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/products/vornshield", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/vickins-security", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/vtix", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/policy", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map(({ path, changeFrequency, priority }) => ({
    url: canonicalUrl(path),
    changeFrequency,
    priority,
  }));
}
