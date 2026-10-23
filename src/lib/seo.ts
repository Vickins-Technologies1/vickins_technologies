import type { Metadata } from "next";

export const siteUrl = "https://www.vickinstechnologies.com";
export const siteName = "Vickins Technologies";
export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;
export const socialImagePath = "/opengraph-image";
export const googlePlayDiraUrl = "https://play.google.com/store/apps/details?id=com.bizpro.vickins";

export const officialProfiles = [
  "https://x.com/vickins_tech",
  "https://www.facebook.com/profile.php?id=61569016955138",
  "https://instagram.com/vickins.technologies",
  "https://github.com/vickins1",
];

export const canonicalUrl = (path = "/") => {
  const normalizedPath = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  return new URL(normalizedPath, siteUrl).toString();
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  type?: "website" | "article";
};

export const pageMetadata = ({
  title,
  description,
  path,
  image = socialImagePath,
  imageWidth = 1200,
  imageHeight = 630,
  imageAlt = "Vickins Technologies — digital platforms, mobile apps, and security solutions",
  type = "website",
}: PageMetadataOptions): Metadata => {
  const url = canonicalUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "en_KE",
      type,
      images: [{ url: image, width: imageWidth, height: imageHeight, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": organizationId,
  name: siteName,
  alternateName: "Vickins",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/icon-512.png`,
    width: 512,
    height: 512,
  },
  description:
    "Vickins Technologies designs and engineers web platforms, mobile applications, automation, and security solutions for organizations in Kenya and beyond.",
  email: "info@vickinstechnologies.com",
  telephone: "+254794501005",
  founder: {
    "@type": "Person",
    "@id": "https://kelvinthuo.vickinstechnologies.com/#person",
    name: "Kelvin Thuo",
    url: "https://kelvinthuo.vickinstechnologies.com/",
    jobTitle: "Software Engineer and IT Specialist",
    worksFor: { "@id": organizationId },
  },
  sameAs: officialProfiles,
};

export const homepageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: siteName,
      alternateName: "Vickins",
      url: siteUrl,
      description:
        "Vickins Technologies builds web platforms, mobile applications, automation systems, and security solutions for teams that need reliable digital products.",
      inLanguage: "en-KE",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Vickins Technologies | Digital Platforms, Mobile Apps & Security",
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
      inLanguage: "en-KE",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#dira-os`,
      name: "Dira OS",
      url: "https://dira-os.vickinstechnologies.com/",
      description:
        "An offline-first business operating system combining POS, inventory, finance, reporting, teams, and branch operations into one connected platform.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Android",
      image: `${siteUrl}/products/dira-os-logo.png`,
      downloadUrl: googlePlayDiraUrl,
      featureList: [
        "Point of sale",
        "Inventory management",
        "Sales and expense tracking",
        "Business reporting",
        "Team and branch operations",
        "Offline-first workflows",
      ],
      publisher: { "@id": organizationId },
      sameAs: [googlePlayDiraUrl],
    },
    {
      "@type": "Product",
      "@id": `${siteUrl}/#vornshield`,
      name: "VornShield",
      url: "https://vornshield.vickinstechnologies.com/",
      description:
        "A proxy infrastructure product with a shared gateway for currently supported HTTP, HTTPS CONNECT, and SOCKS5 access, account controls, traffic purchases, and usage visibility.",
      category: "Proxy infrastructure",
      brand: { "@id": organizationId },
      manufacturer: { "@id": organizationId },
    },
  ],
};
