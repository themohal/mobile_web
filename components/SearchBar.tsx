'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase, Product } from '@/lib/supabase';
import { formatPrice } from '@/lib/utils';

export default function SearchBar({ variant = 'hero' }: { variant?: 'hero' | 'navbar' }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      const { data } = await supabase
        .from('products')
        .select('id, title, slug, price, image_url')
        .ilike('title', `%${query}%`)
        .eq('is_active', true)
        .limit(5);
      setSuggestions(data || []);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      setShowSuggestions(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  const isNavbar = variant === 'navbar';

  return (
    <div ref={wrapperRef} className={isNavbar ? 'relative flex-1 max-w-md' : 'relative max-w-xl mx-auto'}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => query.length >= 2 && setShowSuggestions(true)}
          placeholder="Search for a product..."
          className={
            isNavbar
              ? 'w-full px-4 py-2 pl-10 rounded-lg text-gray-900 bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm border border-gray-200'
              : 'w-full px-5 py-3.5 pl-12 rounded-xl text-gray-900 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm md:text-base'
          }
        />
        <svg
          className={
            isNavbar
              ? 'absolute left-3 top-2.5 h-4 w-4 text-gray-400'
              : 'absolute left-4 top-3.5 md:top-4 h-5 w-5 text-gray-400'
          }
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
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl z-[100] text-left border border-gray-100">
          <div className="max-h-80 overflow-y-auto">
            {suggestions.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                onClick={() => setShowSuggestions(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
              >
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-10 h-10 object-cover rounded flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 truncate">{product.title}</p>
                  <p className="text-xs text-primary-600 font-semibold">{formatPrice(product.price)}</p>
                </div>
              </Link>
            ))}
          </div>
          <button
            onClick={handleSubmit as unknown as React.MouseEventHandler}
            className="w-full px-4 py-2.5 text-sm text-primary-600 font-medium hover:bg-gray-50 border-t border-gray-100 text-center rounded-b-xl"
          >
            View all results for &quot;{query}&quot;
          </button>
        </div>
      )}
    </div>
  );
}
