import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/login",
        "/member-login",
        "/moderator-login",
        "/vtix/dashboard/",
        "/vtix/verify",
        "/preview/",
        "/test/",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
