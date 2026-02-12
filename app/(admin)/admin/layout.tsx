import type { Metadata } from 'next';
import AdminSidebar from './_components/AdminSidebar';

export const metadata: Metadata = {
  title: 'Admin - PricePK',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 min-w-0">
        <div className="p-4 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
