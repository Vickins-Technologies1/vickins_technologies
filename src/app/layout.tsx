import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Instrument_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ThemePreloaderProvider from "../components/ThemePreloaderProvider";
import FloatingActionsGate from "../components/FloatingActionsGate";
import LenisRoot from "../components/LenisRoot";
import { organizationJsonLd, siteName, siteUrl } from "@/lib/seo";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const instrumentSans = Instrument_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dashboard",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vickins Technologies | Software Development Company in Kenya",
    template: "%s | Vickins Technologies",
  },
  description:
    "Vickins Technologies builds custom software, websites, mobile apps, business platforms and automation solutions for organizations in Kenya and beyond.",
  authors: [
    {
      name: siteName,
      url: siteUrl,
    },
  ],
  openGraph: {
    title: "Vickins Technologies | Digital Platforms, Mobile Apps & Security",
    description:
      "Web platforms, mobile applications, automation, and security solutions engineered by Vickins Technologies.",
    siteName,
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Vickins Technologies — digital platforms, mobile apps, and security solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vickins Technologies | Digital Platforms, Mobile Apps & Security",
    description:
      "Web platforms, mobile applications, automation, and security solutions engineered by Vickins Technologies.",
    creator: "@VickinsTech",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-v2.ico", sizes: "32x32", type: "image/x-icon" },
      {
        url: "/favicon-light-16.png",
        sizes: "16x16",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-light-32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-light-48.png",
        sizes: "48x48",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark-16.png",
        sizes: "16x16",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon-dark-32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon-dark-48.png",
        sizes: "48x48",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${instrumentSans.variable} w-full h-full`}
    >
      <Script id="theme-init" strategy="beforeInteractive">
        {`try { var t = localStorage.getItem("theme"); var theme = t === "dark" || (!t && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light"; document.documentElement.setAttribute("data-theme", theme); document.querySelectorAll('link[rel~="icon"]').forEach(function(link) { var href = link.getAttribute("href") || ""; if (href.includes("/favicon-light-") || href.includes("/favicon-dark-")) link.media = href.includes("/favicon-" + theme + "-") ? "all" : "not all"; }); } catch { document.documentElement.setAttribute("data-theme", "light"); }`}
      </Script>
      <body className="antialiased relative min-h-screen w-full overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
        <ThemePreloaderProvider>
          <LenisRoot>
            {children}
            <FloatingActionsGate />
          </LenisRoot>
        </ThemePreloaderProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </body>
    </html>
  );
}
