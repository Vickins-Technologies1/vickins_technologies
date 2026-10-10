import type { Metadata } from "next";
import ProductProfilePage from "@/components/ProductProfilePage";
import { googlePlayDiraUrl, organizationId, pageMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Dira OS | Vickins Business Operating System",
  description:
    "Learn about Dira OS, the Vickins-built Android business operating system for POS, inventory, finance, reporting, teams, and offline-first workflows.",
  path: "/products/dira-os",
});

export default function DiraOsProductPage() {
  return (
    <ProductProfilePage
      name="Dira OS"
      eyebrow="Vickins Technologies · Flagship product"
      description="Dira OS is an Android business operating system that brings point of sale, inventory, finance, reporting, customers, teams, and offline-first workflows together in one connected platform."
      image="/products/dira-os-logo.png"
      imageAlt="Dira OS business operating system logo"
      officialUrl="https://dira-os.vickinstechnologies.com/"
      officialLabel="Visit the Dira OS website"
      features={[
        "Point of sale workflows",
        "Inventory and stock management",
        "Sales and expense tracking",
        "Business reporting",
        "Team and branch operations",
        "Offline-first work continuity",
      ]}
      structuredData={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/products/dira-os#software`,
        name: "Dira OS",
        url: "https://dira-os.vickinstechnologies.com/",
        description: "An Android business operating system for point of sale, inventory, finance, reporting, teams, and offline-first workflows.",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Android",
        image: `${siteUrl}/products/dira-os-logo.png`,
        downloadUrl: googlePlayDiraUrl,
        publisher: { "@id": organizationId },
        sameAs: [googlePlayDiraUrl],
      }}
    />
  );
}
