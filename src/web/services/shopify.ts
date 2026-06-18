/**
 * MAISON — Shopify Admin API client
 *
 * Reads products from the user's Shopify store via the Admin GraphQL API.
 * This is a pragmatic swap from the Storefront API: the user has a working
 * Admin token (shpat_*) but no working Storefront token yet, so we ship
 * the Admin path to unblock the live site. Can be swapped back to the
 * Storefront API later without UI changes.
 *
 * Security note: Admin API tokens are intended for server-side use. We
 * ship this from the browser for a personal store with read-only scopes.
 * The token has no write access. If you ever add write scopes, move this
 * behind a server-side proxy (Vercel Function / Cloudflare Worker).
 *
 * Env vars (Vite — must be prefixed with VITE_):
 *   VITE_SHOPIFY_DOMAIN     e.g. origincodehub.myshopify.com
 *   VITE_SHOPIFY_ADMIN_TOKEN  e.g. shpat_...
 *   VITE_SHOP_CURRENCY       e.g. CAD (ISO 4217)
 */

import type { Product, ProductColor } from '../../shared/product';

const API_VERSION = '2025-01';

const env = (import.meta as any).env ?? {};
const DOMAIN: string = env.VITE_SHOPIFY_DOMAIN || '';
const TOKEN: string = env.VITE_SHOPIFY_ADMIN_TOKEN || env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';
const CURRENCY: string = env.VITE_SHOP_CURRENCY || 'CAD';

const useStorefront = !env.VITE_SHOPIFY_ADMIN_TOKEN && Boolean(env.VITE_SHOPIFY_STOREFRONT_TOKEN);

export const shopifyConfig = {
  domain: DOMAIN,
  token: TOKEN,
  currency: CURRENCY,
  apiKind: useStorefront ? 'storefront' : ('admin' as 'admin' | 'storefront'),
  endpoint: useStorefront
    ? `https://${DOMAIN}/api/${API_VERSION}/graphql.json`
    : `https://${DOMAIN}/admin/api/${API_VERSION}/graphql.json`,
  isConfigured: Boolean(DOMAIN && TOKEN),
};

/* ------------------------------------------------------------------ */
/*  GraphQL fetch                                                      */
/* ------------------------------------------------------------------ */

export class ShopifyError extends Error {
  status: number;
  errors?: unknown;
  constructor(message: string, status: number, errors?: unknown) {
    super(message);
    this.name = 'ShopifyError';
    this.status = status;
    this.errors = errors;
  }
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string; locations?: unknown }>;
}

export async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  if (!shopifyConfig.isConfigured) {
    throw new ShopifyError(
      'Shopify is not configured. Set VITE_SHOPIFY_DOMAIN and VITE_SHOPIFY_ADMIN_TOKEN (or VITE_SHOPIFY_STOREFRONT_TOKEN).',
      0,
    );
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (useStorefront) {
    headers['X-Shopify-Storefront-Access-Token'] = TOKEN;
  } else {
    headers['X-Shopify-Access-Token'] = TOKEN;
  }

  const response = await fetch(shopifyConfig.endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new ShopifyError(
      `Shopify request failed: ${response.status} ${response.statusText}`,
      response.status,
      text,
    );
  }

  const payload = (await response.json()) as GraphQLResponse<T>;
  if (payload.errors?.length) {
    const messages = payload.errors.map((e) => e.message).filter(Boolean);
    const msg = messages.length ? messages.join('; ') : `Access denied (token lacks required scope)`;
    throw new ShopifyError(msg, 200, payload.errors);
  }
  if (!payload.data) {
    throw new ShopifyError('Shopify returned no data', 200);
  }
  return payload.data;
}

/* ------------------------------------------------------------------ */
/*  GraphQL fragments                                                  */
/* ------------------------------------------------------------------ */

const PRODUCT_FRAGMENT_ADMIN = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    productType
    tags
    status
    totalInventory
    createdAt
    priceRangeV2 { minVariantPrice { amount currencyCode } }
    compareAtPriceRangeV2 { minVariantPrice { amount currencyCode } }
    images(first: 12) {
      edges { node { url altText width height } }
    }
    options { name values }
    variants(first: 100) {
      edges {
        node {
          id
          availableForSale
          inventoryQuantity
          selectedOptions { name value }
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
        }
      }
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Queries                                                            */
/* ------------------------------------------------------------------ */

export const QUERY_PRODUCTS = /* GraphQL */ `
  ${PRODUCT_FRAGMENT_ADMIN}
  query GetProducts($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      edges { node { ...ProductFields } }
    }
  }
`;

export const QUERY_PRODUCT_BY_HANDLE = /* GraphQL */ `
  ${PRODUCT_FRAGMENT_ADMIN}
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) { ...ProductFields }
  }
`;

export const QUERY_PRODUCTS_BY_TYPE = /* GraphQL */ `
  ${PRODUCT_FRAGMENT_ADMIN}
  query GetProductsByType($query: String!, $first: Int!) {
    products(first: $first, query: $query, sortKey: BEST_SELLING) {
      edges { node { ...ProductFields } }
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Mapping: Shopify → local Product                                   */
/* ------------------------------------------------------------------ */

const NAMED_COLORS: Record<string, string> = {
  black: '#1A1A18',
  white: '#F5F3EE',
  ivory: '#EDE8DC',
  cream: '#F2EDD7',
  offwhite: '#EDE8DC',
  'off-white': '#EDE8DC',
  stone: '#8C8A82',
  sand: '#C8B89A',
  beige: '#D8C8B0',
  camel: '#C19A6B',
  tan: '#B89977',
  charcoal: '#3D3D3A',
  grey: '#8A8A82',
  gray: '#8A8A82',
  slate: '#8C9099',
  navy: '#1B2A4A',
  brown: '#5A3E2B',
  olive: '#6B6A4A',
  'faded sand': '#C8B89A',
  'dusty rose': '#C4956A',
  blush: '#E8C5B0',
  rose: '#D6A39A',
  red: '#A53A2A',
  blue: '#3D5A80',
  green: '#4A5A3A',
};

const hexFromColorName = (name: string): string => {
  const key = name.toLowerCase().trim();
  if (NAMED_COLORS[key]) return NAMED_COLORS[key];
  const compact = key.replace(/[\s-]+/g, '');
  for (const k of Object.keys(NAMED_COLORS)) {
    if (k.replace(/[\s-]+/g, '') === compact) return NAMED_COLORS[k];
  }
  return '#C8C2B6';
};

const findOption = (options: Array<{ name: string; values: string[] }>, ...names: string[]): string[] => {
  for (const target of names) {
    const match = options.find((o) => o.name.toLowerCase() === target.toLowerCase());
    if (match) return match.values;
  }
  return [];
};

const slugifyHandle = (s: string): string =>
  s
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

interface ShopifyProductNode {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  status: string;
  totalInventory: number | null;
  createdAt: string;
  priceRangeV2: { minVariantPrice: { amount: string; currencyCode: string } };
  compareAtPriceRangeV2: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  options: Array<{ name: string; values: string[] }>;
  variants: {
    edges: Array<{
      node: {
        id: string;
        availableForSale: boolean;
        inventoryQuantity: number | null;
        selectedOptions: Array<{ name: string; value: string }>;
        compareAtPrice: { amount: string; currencyCode: string } | null;
      };
    }>;
  };
}

const isNewArrival = (node: ShopifyProductNode): boolean => {
  if (!node.status || node.status === 'DRAFT' || node.status === 'ARCHIVED') return false;
  if (node.tags.some((t) => /^new(-|$)/i.test(t))) return true;
  const created = new Date(node.createdAt).getTime();
  if (Number.isNaN(created)) return false;
  const days = (Date.now() - created) / (1000 * 60 * 60 * 24);
  return days <= 30;
};

const DEFAULT_MATERIALS =
  'Crafted from premium materials selected for longevity. Care instructions provided on the label.';
const DEFAULT_SHIPPING =
  'Free standard shipping on orders over $150. Express 1–2 business days available. Free returns within 30 days.';

export const mapShopifyProduct = (node: ShopifyProductNode): Product => {
  const priceAmount = Number(node.priceRangeV2?.minVariantPrice?.amount);
  const compareAmount = Number(node.compareAtPriceRangeV2?.minVariantPrice?.amount);
  const isSale = Number.isFinite(compareAmount) && compareAmount > priceAmount;

  const colorValues = findOption(node.options, 'Color', 'Colour', 'color', 'colours');
  const sizeValues = findOption(node.options, 'Size', 'size', 'Sizes', 'sizes');

  const colors: ProductColor[] = colorValues.map((name) => ({
    name,
    hex: hexFromColorName(name),
  }));

  const anyAvailable = node.variants.edges.some((v) => v.node.availableForSale);
  const inStock = anyAvailable || (node.totalInventory != null && node.totalInventory > 0);

  const category = node.productType || node.tags[0] || 'Apparel';

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    price: Number.isFinite(priceAmount) ? priceAmount : 0,
    compareAtPrice: isSale && Number.isFinite(compareAmount) ? compareAmount : undefined,
    category,
    description: node.description || '',
    materials: DEFAULT_MATERIALS,
    shipping: DEFAULT_SHIPPING,
    inStock,
    isNew: isNewArrival(node),
    isSale,
    tags: node.tags,
    images: node.images.edges.map((e) => e.node.url),
    colors,
    sizes: sizeValues,
  };
};

export const categorySlug = (s: string): string => slugifyHandle(s);

export interface ProductsListResponse {
  products: { edges: Array<{ node: ShopifyProductNode }> };
}
export interface ProductResponse {
  productByHandle: ShopifyProductNode | null;
}
