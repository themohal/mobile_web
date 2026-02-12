import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import { formatPrice } from '@/lib/utils';
import DeleteButton from '../_components/DeleteButton';
import { deleteProduct } from '../_actions/products';

export default async function ProductsListPage() {
  const supabase = createClient();
  const { data: products } = await supabase
    .from('products')
    .select('*, brands(name), categories(name)')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
        >
          + New Product
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Image</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Title</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Brand</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Category</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Price</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products?.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.title} className="w-10 h-10 object-contain rounded" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">—</div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 max-w-[200px] truncate">
                    {product.title}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{product.brands?.name || '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{product.categories?.name || '—'}</td>
                  <td className="px-4 py-3 text-gray-900 font-medium">{formatPrice(product.price)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {product.is_active ? (
                        <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">Active</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">Inactive</span>
                      )}
                      {product.is_featured && (
                        <span className="px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full text-xs font-medium">Featured</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        Edit
                      </Link>
                      <DeleteButton action={deleteProduct.bind(null, product.id)} />
                    </div>
                  </td>
                </tr>
              ))}
              {(!products || products.length === 0) && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    No products yet. Create your first product to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
