// src/app/unauthorized/page.tsx
export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-panel p-8 text-center max-w-lg">
        <h1 className="text-3xl sm:text-4xl font-semibold text-[var(--foreground)] mb-4">Access Denied</h1>
        <p className="text-[var(--muted)]">
          You need admin privileges to access this page.
        </p>
      </div>
    </div>
  );
}
