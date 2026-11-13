import type { Metadata } from "next";
import ProductProfilePage from "@/components/ProductProfilePage";
import { organizationId, pageMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "ChamaPulse | Chama Management Platform by Vickins",
  description:
    "Meet ChamaPulse, the Vickins-built digital workspace for chama member coordination, contribution tracking, rotating payouts, meetings, and group records.",
  path: "/products/chamapulse",
});

export default function ChamaPulseProductPage() {
  return (
    <ProductProfilePage
      name="ChamaPulse"
      eyebrow="Vickins Technologies · Community finance product"
      description="ChamaPulse is a digital workspace for chama groups to coordinate members, track contributions and rotating payouts, and keep meetings and group records organized."
      image="/products/chamapulse-icon.png"
      imageAlt="ChamaPulse community platform icon"
      officialUrl="https://chamapulse.vickinstechnologies.com/"
      officialLabel="Visit the ChamaPulse website"
      features={[
        "Chama member coordination",
        "Contribution tracking",
        "Rotating payout coordination",
        "Meetings and attendance",
        "Announcements and group records",
      ]}
      structuredData={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/products/chamapulse#software`,
        name: "ChamaPulse",
        url: "https://chamapulse.vickinstechnologies.com/",
        description:
          "A digital workspace for chama groups to coordinate members, track contributions and rotating payouts, and keep meetings and group records organized.",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        image: `${siteUrl}/products/chamapulse-icon.png`,
        featureList: [
          "Chama member coordination",
          "Contribution tracking",
          "Rotating payout coordination",
          "Meetings and attendance",
          "Announcements and group records",
        ],
        publisher: { "@id": organizationId },
      }}
    />
  );
}
