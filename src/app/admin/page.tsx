// src/app/admin/page.tsx
"use client";

import { authClient } from "@/lib/auth-client";

export default function AdminDashboard() {
  const { data: session, isPending } = authClient.useSession();

  // Optional: Show loading state
  if (isPending) {
    return (
      <div className="p-8 text-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Optional: Redirect or show message if not logged in / not admin
  if (!session?.user || session.user.role !== "admin") {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">
          Access denied. You must be an admin to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Welcome back, {session.user.name || session.user.email}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-[var(--card-bg)] rounded-lg shadow">
          <h3 className="text-lg font-medium">Total Users</h3>
          <p className="text-3xl font-bold mt-2">1,234</p>
        </div>
        <div className="p-6 bg-[var(--card-bg)] rounded-lg shadow">
          <h3 className="text-lg font-medium">Active Sessions</h3>
          <p className="text-3xl font-bold mt-2">89</p>
        </div>
        <div className="p-6 bg-[var(--card-bg)] rounded-lg shadow">
          <h3 className="text-lg font-medium">Revenue</h3>
          <p className="text-3xl font-bold mt-2">$12,450</p>
        </div>
      </div>
    </div>
  );
}