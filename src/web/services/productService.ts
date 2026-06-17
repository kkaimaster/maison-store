import type { Product } from '../../shared/product';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

let productCache: Product[] | null = null;

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`API request failed (${response.status})`);
  }
  const payload = (await response.json()) as { data: T };
  return payload.data;
}

export const productService = {
  async listProducts(forceRefresh = false): Promise<Product[]> {
    if (!forceRefresh && productCache) return productCache;
    const data = await apiGet<Product[]>('/api/products');
    productCache = data;
    return data;
  },
  async getProductByHandle(handle: string): Promise<Product | null> {
    try {
      return await apiGet<Product>(`/api/products/${handle}`);
    } catch {
      return null;
    }
  },
  async getRelatedProducts(handle: string): Promise<Product[]> {
    return apiGet<Product[]>(`/api/products/${handle}/related`);
  }
};

export function filterAndSortProducts(
  products: Product[],
  handle: string | undefined,
  sizes: string[],
  colors: string[],
  sortBy: SortOption
): Product[] {
  let list = [...products];

  if (handle === 't-shirts') list = list.filter((p) => p.category === 'T-Shirts');
  else if (handle === 'track-pants') list = list.filter((p) => p.category === 'Track Pants');
  else if (handle === 'new-arrivals') list = list.filter((p) => p.isNew);
  else if (handle === 'sale') list = list.filter((p) => p.isSale);

  if (sizes.length > 0) {
    list = list.filter((p) => p.sizes.some((s) => sizes.includes(s)));
  }

  if (colors.length > 0) {
    list = list.filter((p) => p.colors.some((c) => colors.includes(c.name)));
  }

  if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
  else if (sortBy === 'newest') list.sort((a, b) => Number(b.isNew) - Number(a.isNew));

  return list;
}
