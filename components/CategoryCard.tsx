import Link from 'next/link';
import { Category } from '@/lib/supabase';

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-primary-50 hover:shadow-md transition-all duration-200"
    >
      <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
        {category.icon || '📦'}
      </span>
      <span className="text-sm font-semibold text-gray-700 group-hover:text-primary-700 text-center">
        {category.name}
      </span>
    </Link>
  );
}
