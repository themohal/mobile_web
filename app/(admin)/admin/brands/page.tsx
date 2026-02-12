import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import DeleteButton from '../_components/DeleteButton';
import { deleteBrand } from '../_actions/brands';

export default async function BrandsListPage() {
  const supabase = createClient();
  const { data: brands } = await supabase
    .from('brands')
    .select('*')
    .order('name');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Brands</h1>
        <Link
          href="/admin/brands/new"
          className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
        >
          + New Brand
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Logo</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Name</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Slug</th>
              <th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {brands?.map((brand) => (
              <tr key={brand.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  {brand.logo_url ? (
                    <img src={brand.logo_url} alt={brand.name} className="w-8 h-8 object-contain rounded" />
                  ) : (
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">—</div>
                  )}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{brand.name}</td>
                <td className="px-4 py-3 text-gray-500">{brand.slug}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/brands/${brand.id}/edit`}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteButton action={deleteBrand.bind(null, brand.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {(!brands || brands.length === 0) && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  No brands yet. Create your first brand to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
