import Link from 'next/link';
import { Category } from '@/lib/supabase';

export default function HeroSection({ categories }: { categories: Category[] }) {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-teal-600 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white" />
        <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-white" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
            Find the Best Tech Prices in{' '}
            <span className="text-teal-300">Pakistan</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Compare prices for mobile phones, tablets, laptops and accessories.
            Get the best deals from trusted sellers.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a product..."
                className="w-full px-5 py-3.5 pl-12 rounded-xl text-gray-900 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm md:text-base"
              />
              <svg
                className="absolute left-4 top-3.5 md:top-4 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Quick Links from DB categories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="px-4 py-2 bg-white/15 hover:bg-white/25 rounded-full text-sm font-medium transition-colors backdrop-blur-sm"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
