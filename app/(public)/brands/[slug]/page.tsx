import { supabase, Product } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import { notFound } from 'next/navigation';

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: brand } = await supabase
    .from('brands')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!brand) notFound();

  const { data: products } = await supabase
    .from('products')
    .select('*, brands(*)')
    .eq('brand_id', brand.id)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-4 mb-8">
        {brand.logo_url && (
          <img src={brand.logo_url} alt={brand.name} className="h-12 w-12 object-contain" />
        )}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{brand.name}</h1>
          <p className="text-gray-500">{(products as Product[])?.length ?? 0} products</p>
        </div>
      </div>

      {(products as Product[])?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {(products as Product[]).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-20">No products from this brand yet.</p>
      )}
    </div>
  );
}
