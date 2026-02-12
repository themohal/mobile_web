'use server';

import { createClient } from '@/lib/supabase-server';
import { slugify } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createBrand(formData: FormData) {
  const supabase = createClient();
  const name = formData.get('name') as string;
  const logo_url = (formData.get('logo_url') as string) || null;

  const { error } = await supabase.from('brands').insert({
    name,
    slug: slugify(name),
    logo_url,
  });

  if (error) return { error: error.message };

  revalidatePath('/admin/brands');
  redirect('/admin/brands');
}

export async function updateBrand(id: string, formData: FormData) {
  const supabase = createClient();
  const name = formData.get('name') as string;
  const logo_url = (formData.get('logo_url') as string) || null;

  const { error } = await supabase
    .from('brands')
    .update({ name, slug: slugify(name), logo_url })
    .eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin/brands');
  redirect('/admin/brands');
}

export async function deleteBrand(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('brands').delete().eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin/brands');
  redirect('/admin/brands');
}
