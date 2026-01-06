// src/app/admin/page.tsx

export default function AdminDashboard() {
  return (
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
  );
}