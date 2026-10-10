import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "V-Tix Dashboard",
  robots: { index: false, follow: false },
};

export default function VtixDashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
