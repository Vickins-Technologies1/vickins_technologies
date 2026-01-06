// src/app/unauthorized/page.tsx
export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">Access Denied</h1>
        <p className="text-[var(--foreground)]">You need admin privileges to access this page.</p>
      </div>
    </div>
  );
}