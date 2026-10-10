import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio | Software Projects & Digital Work",
  description:
    "Explore software products, web platforms, mobile experiences, and digital systems built or delivered by Vickins Technologies.",
  path: "/portfolio",
});

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
