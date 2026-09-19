import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://vornshield.vickinstechnologies.com/"),
  title: "VornShield — Premium Proxy Infrastructure",
  description: "VornShield provides fast, flexible proxy infrastructure for businesses, developers, automation, testing and modern data workflows.",
  keywords: ["proxy infrastructure", "HTTP proxy", "SOCKS5 proxy", "proxy traffic", "VornShield", "Vickins Technologies"],
  alternates: { canonical: "https://vornshield.vickinstechnologies.com/" },
  openGraph: {
    title: "VornShield — Premium Proxy Infrastructure",
    description: "Fast, flexible proxy infrastructure for modern business and developer workflows.",
    url: "https://vornshield.vickinstechnologies.com/",
    siteName: "VornShield",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "VornShield — Premium Proxy Infrastructure", description: "Fast, flexible proxy infrastructure for modern business and developer workflows." },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
