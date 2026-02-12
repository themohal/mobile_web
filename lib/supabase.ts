import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  parent_id: string | null;
  created_at: string;
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  created_at: string;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  brand_id: string;
  category_id: string;
  price: number;
  description: string;
  specifications: Record<string, string>;
  image_url: string;
  gallery: string[];
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  brands?: Brand;
  categories?: Category;
};
