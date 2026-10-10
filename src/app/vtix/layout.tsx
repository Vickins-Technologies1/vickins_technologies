import type { Metadata } from "next";
import VtixLayout from "@/components/VtixLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "V-Tix | Event Ticketing Across Africa",
  description:
    "Discover events, buy tickets, and receive QR tickets through V-Tix, an event ticketing platform by Vickins Technologies.",
  path: "/vtix",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <VtixLayout>{children}</VtixLayout>;
}
