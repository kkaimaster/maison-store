export interface ProductColor {
  name: string;
  hex: string;
}

/**
 * `category` is a free-form string sourced from Shopify's productType.
 * The slug used in URLs is derived from the category (e.g. "T-Shirts" → "t-shirts").
 * Existing code uses both legacy values ('T-Shirts' | 'Track Pants') and any
 * future categories added in Shopify.
 */
export type ProductCategory = string;

export interface Product {
  id: string;
  handle: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  description: string;
  materials: string;
  shipping: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  inStock: boolean;
  isNew: boolean;
  isSale: boolean;
  tags: string[];
}

export interface ProductListQuery {
  handle?: string;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'newest';
  sizes?: string[];
  colors?: string[];
}
