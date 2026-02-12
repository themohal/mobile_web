'use client';

import { useState } from 'react';
import { Product, Brand, Category } from '@/lib/supabase';
import FormField from './FormField';
import ImageUploader from './ImageUploader';
import SpecificationsEditor from './SpecificationsEditor';

export default function ProductForm({
  product,
  brands,
  categories,
  action,
}: {
  product?: Product;
  brands: Brand[];
  categories: Category[];
  action: (formData: FormData) => Promise<{ error: string } | undefined>;
}) {
  const [imageUrl, setImageUrl] = useState(product?.image_url || '');
  const [gallery, setGallery] = useState<string[]>(product?.gallery || []);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    formData.set('image_url', imageUrl);
    formData.set('gallery', JSON.stringify(gallery));
    const result = await action(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  function addGalleryImage(url: string) {
    setGallery([...gallery, url]);
  }

  function removeGalleryImage(index: number) {
    setGallery(gallery.filter((_, i) => i !== index));
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      <FormField
        label="Product Title"
        name="title"
        required
        defaultValue={product?.title}
        placeholder="e.g. Samsung Galaxy S24 Ultra"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="brand_id" className="block text-sm font-medium text-gray-700 mb-1">
            Brand <span className="text-red-500">*</span>
          </label>
          <select
            id="brand_id"
            name="brand_id"
            required
            defaultValue={product?.brand_id || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          >
            <option value="">Select brand</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category_id"
            name="category_id"
            required
            defaultValue={product?.category_id || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <FormField
        label="Price (PKR)"
        name="price"
        type="number"
        required
        defaultValue={product?.price?.toString()}
        placeholder="e.g. 249999"
      />

      <FormField
        label="Description"
        name="description"
        type="textarea"
        defaultValue={product?.description}
        placeholder="Product description..."
      />

      <ImageUploader
        bucket="products"
        currentUrl={product?.image_url}
        onUpload={setImageUrl}
        label="Main Image"
      />

      {/* Gallery */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Images</label>
        <div className="space-y-2">
          {gallery.map((url, i) => (
            <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <img src={url} alt="" className="w-12 h-12 object-contain rounded" />
              <span className="flex-1 text-xs text-gray-500 truncate">{url}</span>
              <button
                type="button"
                onClick={() => removeGalleryImage(i)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="mt-2">
          <ImageUploader
            bucket="products"
            onUpload={addGalleryImage}
            label="Add gallery image"
          />
        </div>
      </div>

      <SpecificationsEditor defaultValue={product?.specifications} />

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="is_featured"
            defaultChecked={product?.is_featured ?? false}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="is_active"
            defaultChecked={product?.is_active ?? true}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          Active
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  );
}
