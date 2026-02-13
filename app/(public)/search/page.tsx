'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { supabase, Product } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function search() {
      setLoading(true);
      if (!q.trim()) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('products')
        .select('*, brands(*), categories(*)')
        .ilike('title', `%${q}%`)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      setProducts(data || []);
      setLoading(false);
    }
    search();
  }, [q]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Search results for &quot;{q}&quot;
      </h1>
      <p className="text-gray-500 mb-8">
        {loading ? 'Searching...' : `${products.length} product${products.length !== 1 ? 's' : ''} found`}
      </p>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-100 rounded-xl aspect-square" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">No products found for &quot;{q}&quot;</p>
          <p className="text-gray-400 mt-2">Try a different search term</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8">Searching...</div>}>
      <SearchResults />
    </Suspense>
  );
}
