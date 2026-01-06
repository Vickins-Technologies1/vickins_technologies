// src/app/admin/layout.tsx
import AdminSessionProvider from './Provider';
import AdminLayout from '@/components/AdminLayout';

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminSessionProvider>
      <AdminLayout>{children}</AdminLayout>
    </AdminSessionProvider>
  );
}