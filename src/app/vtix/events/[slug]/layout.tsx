import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Details | V-Tix",
  robots: { index: false, follow: false },
};

export default function VtixEventLayout({ children }: { children: React.ReactNode }) {
  return children;
}
