import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import ProductForm from '../../_components/ProductForm';
import { createProduct } from '../../_actions/products';

export default async function NewProductPage() {
  const supabase = createClient();

  const [{ data: brands }, { data: categories }] = await Promise.all([
    supabase.from('brands').select('*').order('name'),
    supabase.from('categories').select('*').order('name'),
  ]);

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/products" className="text-sm text-gray-500 hover:text-gray-700">
          &larr; Back to Products
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">New Product</h1>
      </div>
      <ProductForm
        brands={brands || []}
        categories={categories || []}
        action={createProduct}
      />
    </div>
  );
}
