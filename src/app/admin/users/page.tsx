"use client";

import { Users, ShieldCheck, Mail } from "lucide-react";

const users = [
  { name: "Vickins Admin", email: "admin@vickins.com", role: "Admin", status: "Active" },
  { name: "Sales Lead", email: "sales@vickins.com", role: "Manager", status: "Active" },
  { name: "Support Desk", email: "support@vickins.com", role: "Staff", status: "Pending" },
];

export default function AdminUsersPage() {
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
              {users.map((user) => (
                <tr key={user.email}>
                  <td className="py-3 font-medium">{user.name}</td>
                  <td className="py-3 text-[var(--muted)] flex items-center gap-2">
                    <Mail size={14} />
                    {user.email}
                  </td>
                  <td className="py-3">{user.role}</td>
                  <td className="py-3">{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
