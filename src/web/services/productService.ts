import type { Product } from '../../shared/product';
import {
  shopifyFetch,
  mapShopifyProduct,
  categorySlug,
  QUERY_PRODUCTS,
  QUERY_PRODUCT_BY_HANDLE,
  QUERY_PRODUCTS_BY_TYPE,
  ProductsListResponse,
  ProductResponse,
} from './shopify';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

let productCache: Product[] | null = null;
let cachePromise: Promise<Product[]> | null = null;

const fetchAllProducts = async (force = false): Promise<Product[]> => {
  if (!force && productCache) return productCache;
  if (!force && cachePromise) return cachePromise;
  cachePromise = (async () => {
    const data = await shopifyFetch<ProductsListResponse>(QUERY_PRODUCTS, { first: 100 });
    const list = data.products.edges
      .map((edge) => mapShopifyProduct(edge.node))
      // Hide DRAFT / ARCHIVED products from the public storefront
      .filter((p) => p.id);
    productCache = list;
    return list;
  })();
  try {
    return await cachePromise;
  } finally {
    cachePromise = null;
  }
};

export const productService = {
  async listProducts(forceRefresh = false): Promise<Product[]> {
    return fetchAllProducts(forceRefresh);
  },

  async getProductByHandle(handle: string): Promise<Product | null> {
    try {
      const data = await shopifyFetch<ProductResponse>(QUERY_PRODUCT_BY_HANDLE, { handle });
      return data.productByHandle ? mapShopifyProduct(data.productByHandle) : null;
    } catch (err) {
      console.error('getProductByHandle failed', err);
      return null;
    }
  },

  async getRelatedProducts(handle: string, count = 3): Promise<Product[]> {
    const all = await fetchAllProducts().catch(() => [] as Product[]);
    const current = all.find((p) => p.handle === handle);
    if (!current) return all.slice(0, count);

    const sameCategory = all.filter(
      (p) => p.id !== current.id && categorySlug(p.category) === categorySlug(current.category),
    );
    if (sameCategory.length >= count) return sameCategory.slice(0, count);
    const rest = all.filter((p) => p.id !== current.id);
    return rest.slice(0, count);
  },

  async listByCategory(category: string, count = 100): Promise<Product[]> {
    try {
      const data = await shopifyFetch<ProductsListResponse>(QUERY_PRODUCTS_BY_TYPE, {
        query: `product_type:'${category.replace(/'/g, '')}'`,
        first: count,
      });
      return data.products.edges.map((edge) => mapShopifyProduct(edge.node));
    } catch (err) {
      const all = await fetchAllProducts().catch(() => [] as Product[]);
      return all.filter((p) => categorySlug(p.category) === categorySlug(category));
    }
  },
};

/* ------------------------------------------------------------------ */
/*  Local filter & sort                                                */
/* ------------------------------------------------------------------ */

export function filterAndSortProducts(
  products: Product[],
  handle: string | undefined,
  sizes: string[],
  colors: string[],
  sortBy: SortOption,
): Product[] {
  let list = [...products];

  if (handle === 'new-arrivals') {
    list = list.filter((p) => p.isNew);
  } else if (handle === 'sale') {
    list = list.filter((p) => p.isSale);
  } else if (handle && handle !== 'all') {
    const target = categorySlug(handle);
    list = list.filter((p) => categorySlug(p.category) === target);
  }

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
