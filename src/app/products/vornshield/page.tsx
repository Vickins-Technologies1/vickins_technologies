import type { Metadata } from "next";
import ProductProfilePage from "@/components/ProductProfilePage";
import { organizationId, pageMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "VornShield | Proxy Management Platform",
  description:
    "Learn about VornShield, the Vickins-built proxy management platform for controlled access, dynamic credentials, usage management, and prepaid infrastructure billing.",
  path: "/products/vornshield",
});

export default function VornShieldProductPage() {
  return (
    <ProductProfilePage
      name="VornShield"
      eyebrow="Vickins Technologies · Infrastructure product"
      description="VornShield is a proxy management platform for controlled proxy access, dynamic credentials, usage management, and prepaid infrastructure billing."
      image="/products/v-guard-logo.png"
      imageAlt="VornShield proxy management platform logo"
      officialUrl="https://vornshield.vickinstechnologies.com/"
      officialLabel="Visit the VornShield website"
      features={[
        "Controlled proxy access",
        "Dynamic credentials",
        "Usage management",
        "Prepaid infrastructure billing",
        "Platform operations",
        "Infrastructure visibility",
      ]}
      structuredData={{
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${siteUrl}/products/vornshield#product`,
        name: "VornShield",
        url: "https://vornshield.vickinstechnologies.com/",
        description: "A proxy management platform for controlled proxy access, dynamic credentials, usage management, and prepaid infrastructure billing.",
        image: `${siteUrl}/products/v-guard-logo.png`,
        brand: { "@id": organizationId },
        manufacturer: { "@id": organizationId },
      }}
    />
  );
}
