import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Instrument_Sans } from "next/font/google";
import "./globals.css";
import ThemePreloaderProvider from "../components/ThemePreloaderProvider";
import FloatingActionsGate from "../components/FloatingActionsGate";
import LenisRoot from "../components/LenisRoot";

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
  title: {
    default: "Vickins Technologies | IT Solutions, Web & Mobile Development Kenya",
    template: "%s | Vickins Technologies",
  },
  description:
    "Vickins Technologies provides innovative IT solutions, web and mobile development services in Kenya.",
  keywords: [
    "IT solutions",
    "web development",
    "mobile development",
    "Kenya",
    "software innovation",
  ],
  authors: [
    {
      name: "Vickins Technologies",
      url: "https://vickins-technologies.onrender.com",
    },
  ],
  openGraph: {
    title: "Vickins Technologies",
    description: "Driving business success with cutting-edge IT solutions in Kenya.",
    url: "https://vickins-technologies.onrender.com",
    siteName: "Vickins Technologies",
    images: [
      {
        url: "https://vickins-technologies.onrender.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vickins Technologies Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vickins Technologies",
    description: "Innovative IT solutions for your business in Kenya.",
    images: ["https://vickins-technologies.onrender.com/og-image.jpg"],
    creator: "@VickinsTech",
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
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
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
