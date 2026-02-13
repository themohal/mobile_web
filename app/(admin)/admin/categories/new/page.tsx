import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import CategoryForm from '../../_components/CategoryForm';
import { createCategory } from '../../_actions/categories';

export default async function NewCategoryPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/categories" className="text-sm text-gray-500 hover:text-gray-700">
          &larr; Back to Categories
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">New Category</h1>
      </div>
      <CategoryForm categories={categories || []} action={createCategory} />
    </div>
  );
}
