import Link from 'next/link';
import BrandForm from '../../_components/BrandForm';
import { createBrand } from '../../_actions/brands';

export default function NewBrandPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/brands" className="text-sm text-gray-500 hover:text-gray-700">
          &larr; Back to Brands
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">New Brand</h1>
      </div>
      <BrandForm action={createBrand} />
    </div>
  );
}
