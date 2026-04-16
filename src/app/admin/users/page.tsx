"use client";

import { useEffect, useState } from "react";
import { Users, ShieldCheck, Mail } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const loadUsers = async () => {
      try {
        const response = await fetch("/api/admin/users", { cache: "no-store" });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Failed to load users.");
        }
        if (isMounted) {
          setUsers(data.users ?? []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unable to load users.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadUsers();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <section className="glass-panel p-6 sm:p-8">
        <div className="flex items-center gap-3 text-[var(--button-bg)] text-xs sm:text-sm uppercase tracking-[0.3em]">
          <Users size={16} />
          Users
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold mt-3">Manage your admin team.</h1>
        <p className="text-sm text-[var(--muted)] mt-3 max-w-2xl">
          Add staff, control permissions, and keep your admin roster lean and secure.
        </p>
      </section>

      <section className="glass-panel p-6 sm:p-7">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShieldCheck size={18} />
            Team Members
          </h2>
        </div>
        {error && (
          <p className="mb-4 text-sm text-rose-500">
            {error}
          </p>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[var(--muted)]">
              <tr>
                <th className="pb-3">Name</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {isLoading &&
                [0, 1, 2, 3].map((item) => (
                  <tr key={item}>
                    <td className="py-3">
                      <Skeleton variant="line" className="h-4 w-32" />
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Skeleton variant="line" className="h-4 w-4 rounded-lg" />
                        <Skeleton variant="line" className="h-4 w-48" />
                      </div>
                    </td>
                    <td className="py-3">
                      <Skeleton variant="line" className="h-4 w-20" />
                    </td>
                    <td className="py-3">
                      <Skeleton variant="line" className="h-4 w-16" />
                    </td>
                  </tr>
                ))}
              {!isLoading && users.map((user) => (
                <tr key={user.id}>
                  <td className="py-3 font-medium">{user.name}</td>
                  <td className="py-3 text-[var(--muted)] flex items-center gap-2">
                    <Mail size={14} />
                    {user.email}
                  </td>
                  <td className="py-3 capitalize">{user.role}</td>
                  <td className="py-3">{user.status}</td>
                </tr>
              ))}
              {!isLoading && users.length === 0 && !error && (
                <tr>
                  <td className="py-4 text-[var(--muted)]" colSpan={4}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
