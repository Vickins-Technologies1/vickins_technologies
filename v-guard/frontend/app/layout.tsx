import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "V-Guard System | Proxy Access, Credits & Usage",
  description: "V-Guard brings account access, proxy credentials, credits, usage and Flutterwave checkout into one focused workspace.",
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
