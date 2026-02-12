'use client';

import { useState } from 'react';
import { Brand } from '@/lib/supabase';
import FormField from './FormField';
import ImageUploader from './ImageUploader';

export default function BrandForm({
  brand,
  action,
}: {
  brand?: Brand;
  action: (formData: FormData) => Promise<{ error: string } | undefined>;
}) {
  const [logoUrl, setLogoUrl] = useState(brand?.logo_url || '');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    formData.set('logo_url', logoUrl);
    const result = await action(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-lg">
      {error && (
        <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      <FormField
        label="Brand Name"
        name="name"
        required
        defaultValue={brand?.name}
        placeholder="e.g. Samsung"
      />

      <ImageUploader
        bucket="brands"
        currentUrl={brand?.logo_url}
        onUpload={setLogoUrl}
        label="Logo"
      />

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Saving...' : brand ? 'Update Brand' : 'Create Brand'}
      </button>
    </form>
  );
}
