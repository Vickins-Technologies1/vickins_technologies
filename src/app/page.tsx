import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { homepageJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Software Development Company in Kenya",
  description:
    "Vickins Technologies builds custom software, websites, mobile apps, business platforms and automation solutions for organizations in Kenya and beyond.",
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
