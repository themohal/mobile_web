import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import { supabase } from '@/lib/supabase';

export const revalidate = 60;

async function getCategories() {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .is('parent_id', null)
    .order('name');
  return data || [];
}

async function getFeaturedProducts() {
  const { data } = await supabase
    .from('products')
    .select('*, brands(*), categories(*)')
    .eq('is_featured', true)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(8);
  return data || [];
}

async function getLatestProducts() {
  const { data } = await supabase
    .from('products')
    .select('*, brands(*), categories(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(8);
  return data || [];
}

export default async function HomePage() {
  const [categories, featuredProducts, latestProducts] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getLatestProducts(),
  ]);

  return (
    <div>
      <HeroSection />

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Browse Categories</h2>
            <p className="text-gray-500 mt-1">Find what you&apos;re looking for</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts products={featuredProducts} />

      {/* Latest Arrivals */}
      {latestProducts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Latest Arrivals</h2>
                <p className="text-gray-500 mt-1">Newly added products</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {latestProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
