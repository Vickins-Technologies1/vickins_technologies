import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "Read how Vickins Technologies handles information shared through its website, contact forms, and digital services.",
  path: "/policy",
});

export default function PolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
