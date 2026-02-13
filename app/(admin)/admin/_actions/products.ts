'use server';

import { createClient } from '@/lib/supabase-server';
import { slugify } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProduct(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get('title') as string;
  const brand_id = formData.get('brand_id') as string;
  const category_id = formData.get('category_id') as string;
  const price = parseFloat(formData.get('price') as string);
  const description = (formData.get('description') as string) || '';
  const image_url = (formData.get('image_url') as string) || '';
  const gallery = JSON.parse((formData.get('gallery') as string) || '[]');
  const specifications = JSON.parse((formData.get('specifications') as string) || '{}');
  const is_featured = formData.get('is_featured') === 'on';
  const is_active = formData.get('is_active') !== 'off';

  const { error } = await supabase.from('products').insert({
    title,
    slug: slugify(title),
    brand_id,
    category_id,
    price,
    description,
    image_url,
    gallery,
    specifications,
    is_featured,
    is_active: is_active,
  });

  if (error) return { error: error.message };

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient();

  const title = formData.get('title') as string;
  const brand_id = formData.get('brand_id') as string;
  const category_id = formData.get('category_id') as string;
  const price = parseFloat(formData.get('price') as string);
  const description = (formData.get('description') as string) || '';
  const image_url = (formData.get('image_url') as string) || '';
  const gallery = JSON.parse((formData.get('gallery') as string) || '[]');
  const specifications = JSON.parse((formData.get('specifications') as string) || '{}');
  const is_featured = formData.get('is_featured') === 'on';
  const is_active = formData.get('is_active') !== 'off';

  const { error } = await supabase
    .from('products')
    .update({
      title,
      slug: slugify(title),
      brand_id,
      category_id,
      price,
      description,
      image_url,
      gallery,
      specifications,
      is_featured,
      is_active,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('products').delete().eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin/products');
  redirect('/admin/products');
}
