import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Vickins Security | Complete Security Solutions",
  description:
    "CCTV, alarms, access control, electric fencing, and related security solutions for homes, businesses, and institutions from Vickins Security.",
  path: "/vickins-security",
  image: "/images/vickins-security-promo-v2.png",
  imageWidth: 1200,
  imageHeight: 900,
  imageAlt: "Vickins Security solutions for homes and businesses",
});

export default function VickinsSecurityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
