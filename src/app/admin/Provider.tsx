// src/app/admin/Provider.tsx
"use client";

import { ReactNode } from "react";

export default function AdminSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Better Auth syncs session automatically via the client hooks
  // No provider wrapper needed! Just render children.
  // (If you want global refetch on focus, you can add logic here later)
  return <>{children}</>;
}