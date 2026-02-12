import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Category, Brand } from '@/lib/supabase';

async function getFooterCategories(): Promise<Category[]> {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .is('parent_id', null)
    .order('name')
    .limit(4);
  return data || [];
}

async function getFooterBrands(): Promise<Brand[]> {
  const { data } = await supabase
    .from('brands')
    .select('*')
    .order('name')
    .limit(4);
  return data || [];
}

export default async function Footer() {
  const [categories, brands] = await Promise.all([
    getFooterCategories(),
    getFooterBrands(),
  ]);

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-bold text-primary-400">Price</span>
              <span className="text-2xl font-bold text-teal-400">PK</span>
            </div>
            <p className="text-sm text-gray-400">
              Compare prices for mobile phones, tablets, laptops and accessories in Pakistan.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2 text-sm">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/categories/${cat.slug}`} className="hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
              {categories.length === 0 && (
                <li className="text-gray-500">No categories yet</li>
              )}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Brands</h3>
            <ul className="space-y-2 text-sm">
              {brands.map((brand) => (
                <li key={brand.id}>
                  <Link href={`/brands/${brand.slug}`} className="hover:text-white transition-colors">
                    {brand.name}
                  </Link>
                </li>
              ))}
              {brands.length === 0 && (
                <li className="text-gray-500">No brands yet</li>
              )}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} PricePK. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
