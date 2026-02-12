import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import CategoryForm from '../../../_components/CategoryForm';
import { updateCategory } from '../../../_actions/categories';

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const [{ data: category }, { data: categories }] = await Promise.all([
    supabase.from('categories').select('*').eq('id', params.id).single(),
    supabase.from('categories').select('*').order('name'),
  ]);

  if (!category) notFound();

  const action = updateCategory.bind(null, category.id);

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/categories" className="text-sm text-gray-500 hover:text-gray-700">
          &larr; Back to Categories
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Category: {category.name}</h1>
      </div>
      <CategoryForm category={category} categories={categories || []} action={action} />
    </div>
  );
}
