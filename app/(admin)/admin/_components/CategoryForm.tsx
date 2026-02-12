'use client';

import { useState } from 'react';
import { Category } from '@/lib/supabase';
import FormField from './FormField';

export default function CategoryForm({
  category,
  categories,
  action,
}: {
  category?: Category;
  categories: Category[];
  action: (formData: FormData) => Promise<{ error: string } | undefined>;
}) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await action(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  // Filter out current category from parent options
  const parentOptions = categories.filter((c) => c.id !== category?.id);

  return (
    <form action={handleSubmit} className="space-y-6 max-w-lg">
      {error && (
        <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      <FormField
        label="Category Name"
        name="name"
        required
        defaultValue={category?.name}
        placeholder="e.g. Mobile Phones"
      />

      <FormField
        label="Icon (emoji)"
        name="icon"
        defaultValue={category?.icon || '📦'}
        placeholder="📱"
      />

      <div>
        <label htmlFor="parent_id" className="block text-sm font-medium text-gray-700 mb-1">
          Parent Category
        </label>
        <select
          id="parent_id"
          name="parent_id"
          defaultValue={category?.parent_id || ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
        >
          <option value="">None (top-level)</option>
          {parentOptions.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Saving...' : category ? 'Update Category' : 'Create Category'}
      </button>
    </form>
  );
}
