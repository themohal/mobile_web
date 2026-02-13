import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import BrandForm from '../../../_components/BrandForm';
import { updateBrand } from '../../../_actions/brands';

export default async function EditBrandPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: brand } = await supabase
    .from('brands')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!brand) notFound();

  const action = updateBrand.bind(null, brand.id);

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/brands" className="text-sm text-gray-500 hover:text-gray-700">
          &larr; Back to Brands
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Brand: {brand.name}</h1>
      </div>
      <BrandForm brand={brand} action={action} />
    </div>
  );
}
