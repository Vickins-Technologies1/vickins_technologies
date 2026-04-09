"use client";

import { usePathname } from "next/navigation";
import FloatingActions from "./FloatingActions";

export default function FloatingActionsGate() {
  const pathname = usePathname() || "";

  if (pathname.startsWith("/chama")) {
    return null;
  }

  return <FloatingActions />;
}
