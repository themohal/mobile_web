import { supabase, Brand } from '@/lib/supabase';
import Link from 'next/link';

export const metadata = {
  title: 'Brands | PricePK',
};

export default async function BrandsPage() {
  const { data: brands } = await supabase
    .from('brands')
    .select('*')
    .order('name');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Brands</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {(brands as Brand[])?.map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}`}
            className="group flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-primary-50 hover:shadow-md transition-all duration-200"
          >
            {brand.logo_url ? (
              <img
                src={brand.logo_url}
                alt={brand.name}
                className="h-12 w-12 object-contain mb-3 group-hover:scale-110 transition-transform duration-200"
              />
            ) : (
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">🏷️</span>
            )}
            <span className="text-sm font-semibold text-gray-700 group-hover:text-primary-700 text-center">
              {brand.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
