import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vickins Security | Complete Security Solutions",
  description:
    "End-to-end security solutions designed to protect what matters most. For homes. For businesses. For you.",
  openGraph: {
    title: "Vickins Security",
    description:
      "Complete security solutions. Total peace of mind — CCTV, alarms, access control, electric fence, and more.",
    images: [
      {
        url: "/images/vickins-security-promo.png",
        width: 1536,
        height: 1536,
        alt: "Vickins Security",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vickins Security",
    description:
      "Complete security solutions. Total peace of mind — CCTV, alarms, access control, electric fence, and more.",
    images: ["/images/vickins-security-promo.png"],
  },
};

export default function VickinsSecurityLayout({ children }: { children: React.ReactNode }) {
  return children;
}

