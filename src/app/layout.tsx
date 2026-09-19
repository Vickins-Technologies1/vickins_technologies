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
    default: "Vickins Technologies | Digital Platforms, Dira OS & VornShield",
    template: "%s | Vickins Technologies",
  },
  description:
    "Vickins Technologies designs and engineers secure digital platforms, including Dira OS, its flagship business operating system, and VornShield, a proxy management infrastructure platform.",
  keywords: [
    "enterprise software development Kenya",
    "Nairobi software company",
    "platform engineering Kenya",
    "web development Kenya",
    "mobile app development Kenya",
    "automation and AI Kenya",
    "DevOps Kenya",
    "Dira OS",
    "VornShield",
    "business operating system",
    "POS software Kenya",
    "inventory management software",
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
      "Digital platforms, Dira OS and VornShield — engineered by Vickins Technologies for reliability, security, and scale.",
    url: siteUrl,
    siteName: "Vickins Technologies",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vickins Technologies",
    description:
      "Digital platforms, Dira OS and VornShield — engineered by Vickins Technologies for reliability, security, and scale.",
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
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vickins Technologies",
              url: siteUrl,
              description: "Vickins Technologies designs and engineers secure digital platforms, including Dira OS and VornShield.",
              owns: [
                { "@type": "Product", name: "Dira OS", url: "https://dira-os.vickinstechnologies.com/", category: "Business Operating System" },
                { "@type": "Product", name: "VornShield", url: "https://vornshield.vickinstechnologies.com/", category: "Proxy Management Platform" },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
