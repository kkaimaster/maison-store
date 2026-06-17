export interface ProductColor {
  name: string;
  hex: string;
}

export type ProductCategory = 'T-Shirts' | 'Track Pants';

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
