import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "V-Guard",
  description: "Premium proxy management panel for HTTP and SOCKS5 with prepaid credits and Flutterwave billing.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
