'use server';

import { createClient } from '@/lib/supabase-server';
import { slugify } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createCategory(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get('name') as string;
  const icon = (formData.get('icon') as string) || '📦';
  const parent_id = (formData.get('parent_id') as string) || null;

  const { error } = await supabase.from('categories').insert({
    name,
    slug: slugify(name),
    icon,
    parent_id: parent_id || null,
  });

  if (error) return { error: error.message };

  revalidatePath('/admin/categories');
  redirect('/admin/categories');
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = await createClient();
  const name = formData.get('name') as string;
  const icon = (formData.get('icon') as string) || '📦';
  const parent_id = (formData.get('parent_id') as string) || null;

  const { error } = await supabase
    .from('categories')
    .update({
      name,
      slug: slugify(name),
      icon,
      parent_id: parent_id || null,
    })
    .eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin/categories');
  redirect('/admin/categories');
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('categories').delete().eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin/categories');
  redirect('/admin/categories');
}
