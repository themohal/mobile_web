'use client';

import { usePathname } from 'next/navigation';
import AdminSidebar from './_components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 min-w-0">
        <div className="p-4 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
