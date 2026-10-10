// src/app/admin/layout.tsx
import type { Metadata } from 'next';
import AdminSessionProvider from './Provider';
import AdminLayout from '@/components/AdminLayout';

export const metadata: Metadata = {
  title: 'Admin Workspace',
  robots: { index: false, follow: false },
};

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
