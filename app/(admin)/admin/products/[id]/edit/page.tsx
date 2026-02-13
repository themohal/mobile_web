import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import ProductForm from '../../../_components/ProductForm';
import { updateProduct } from '../../../_actions/products';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const [{ data: product }, { data: brands }, { data: categories }] = await Promise.all([
    supabase.from('products').select('*').eq('id', params.id).single(),
    supabase.from('brands').select('*').order('name'),
    supabase.from('categories').select('*').order('name'),
  ]);

  if (!product) notFound();

  const action = updateProduct.bind(null, product.id);

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/products" className="text-sm text-gray-500 hover:text-gray-700">
          &larr; Back to Products
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Product: {product.title}</h1>
      </div>
      <ProductForm
        product={product}
        brands={brands || []}
        categories={categories || []}
        action={action}
      />
    </div>
  );
}
