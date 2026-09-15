import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VornShield System | Proxy Access, Traffic & Usage",
  description: "VornShield brings account access, proxy credentials, proxy traffic, usage and Flutterwave checkout into one focused workspace.",
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
