import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: productCount },
    { count: categoryCount },
    { count: brandCount },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('brands').select('*', { count: 'exact', head: true }),
  ]);

  const stats = [
    { label: 'Products', count: productCount ?? 0, href: '/admin/products', icon: '📦' },
    { label: 'Categories', count: categoryCount ?? 0, href: '/admin/categories', icon: '📁' },
    { label: 'Brands', count: brandCount ?? 0, href: '/admin/brands', icon: '🏷️' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.count}</p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/products/new"
            className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            + New Product
          </Link>
          <Link
            href="/admin/categories/new"
            className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
          >
            + New Category
          </Link>
          <Link
            href="/admin/brands/new"
            className="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            + New Brand
          </Link>
        </div>
      </div>
    </div>
  );
}
