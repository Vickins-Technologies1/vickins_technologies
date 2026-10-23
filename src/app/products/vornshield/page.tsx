import type { Metadata } from "next";
import ProductProfilePage from "@/components/ProductProfilePage";
import { organizationId, pageMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "VornShield | Proxy Infrastructure",
  description:
    "Learn about VornShield, the proxy infrastructure product with a shared gateway for supported HTTP, HTTPS CONNECT and SOCKS5 access, account controls and usage visibility.",
  path: "/products/vornshield",
});

export default function VornShieldProductPage() {
  return (
    <ProductProfilePage
      name="VornShield"
      eyebrow="Vickins Technologies · Infrastructure product"
      description="VornShield is a proxy infrastructure product with a shared gateway for currently supported HTTP, HTTPS CONNECT, and SOCKS5 access, account controls, traffic purchases, and usage visibility."
      image="/products/v-guard-logo.png"
      imageAlt="VornShield proxy infrastructure logo"
      officialUrl="https://vornshield.vickinstechnologies.com/"
      officialLabel="Visit the VornShield website"
      features={[
        "Shared gateway with supported HTTP, HTTPS CONNECT, and SOCKS5 access",
        "Account access and proxy credentials",
        "Traffic purchases and usage snapshots",
        "Usage-based traffic billing",
      ]}
      structuredData={{
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${siteUrl}/products/vornshield#product`,
        name: "VornShield",
        url: "https://vornshield.vickinstechnologies.com/",
        description: "A proxy infrastructure product with a shared gateway for currently supported HTTP, HTTPS CONNECT, and SOCKS5 access, account controls, traffic purchases, and usage visibility.",
        image: `${siteUrl}/products/v-guard-logo.png`,
        brand: { "@id": organizationId },
        manufacturer: { "@id": organizationId },
      }}
    />
  );
}
