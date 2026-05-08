import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Instrument_Sans } from "next/font/google";
import "./globals.css";
import ThemePreloaderProvider from "../components/ThemePreloaderProvider";
import FloatingActionsGate from "../components/FloatingActionsGate";
import LenisRoot from "../components/LenisRoot";

const siteUrl = "https://www.vickinstechnologies.com";

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
    default: "Vickins Technologies | Enterprise Web & Mobile Platforms (Kenya)",
    template: "%s | Vickins Technologies",
  },
  description:
    "Vickins Technologies is a Nairobi-based technology partner building secure, scalable web platforms, mobile apps, and automation for enterprises and high-growth teams.",
  keywords: [
    "enterprise software development Kenya",
    "Nairobi software company",
    "platform engineering Kenya",
    "web development Kenya",
    "mobile app development Kenya",
    "automation and AI Kenya",
    "DevOps Kenya",
  ],
  authors: [
    {
      name: "Vickins Technologies",
      url: siteUrl,
    },
  ],
  openGraph: {
    title: "Vickins Technologies",
    description:
      "Enterprise-ready web platforms, mobile apps, and automation — engineered in Nairobi for reliability, security, and scale.",
    url: siteUrl,
    siteName: "Vickins Technologies",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vickins Technologies",
    description:
      "Enterprise-ready web platforms, mobile apps, and automation — engineered in Nairobi for reliability, security, and scale.",
    creator: "@VickinsTech",
  },
  alternates: {
    canonical: siteUrl,
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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo1.png", type: "image/png", sizes: "32x32" },
      { url: "/logo1.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
      <body className="antialiased min-h-screen w-full overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
        <ThemePreloaderProvider>
          <LenisRoot>
            {children}
            <FloatingActionsGate />
          </LenisRoot>
        </ThemePreloaderProvider>
      </body>
    </html>
  );
}
