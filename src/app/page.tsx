import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { homepageJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Digital Platforms, Mobile Apps & Security",
  description:
    "Vickins Technologies designs and engineers web platforms, mobile applications, automation systems, and security solutions for teams that need reliable digital products.",
  path: "/",
});

export default function Page() {
  return (
    <>
      <HomePage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
      />
    </>
  );
}
