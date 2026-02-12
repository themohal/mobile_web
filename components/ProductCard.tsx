import Link from 'next/link';
import { Product } from '@/lib/supabase';
import { formatPrice } from '@/lib/utils';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        {product.is_featured && (
          <span className="absolute top-2 left-2 bg-teal-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3 md:p-4">
        {product.brands && (
          <p className="text-xs text-primary-600 font-medium mb-1">{product.brands.name}</p>
        )}
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-primary-700">
          {product.title}
        </h3>
        <p className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
