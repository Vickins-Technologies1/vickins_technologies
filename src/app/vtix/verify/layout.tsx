import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Ticket | V-Tix",
  robots: { index: false, follow: false },
};

export default function VtixVerifyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
