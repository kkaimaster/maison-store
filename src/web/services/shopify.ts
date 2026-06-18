/**
 * MAISON — Shopify Storefront API client
 *
 * Reads products from the headless Shopify store and maps them to our
 * local `Product` type. Designed to run in the browser — the Storefront API
 * access token is intentionally public (unlike the Admin API).
 *
 * Env vars (Vite — must be prefixed with VITE_):
 *   VITE_SHOPIFY_DOMAIN          e.g. origincodehub.myshopify.com
 *   VITE_SHOPIFY_STOREFRONT_TOKEN  e.g. shpss_...
 *   VITE_SHOP_CURRENCY            e.g. CAD (ISO 4217)
 */

import type { Product, ProductColor } from '../../shared/product';

const API_VERSION = '2025-01';

const env = (import.meta as any).env ?? {};
const DOMAIN: string = env.VITE_SHOPIFY_DOMAIN || '';
const TOKEN: string = env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';
const CURRENCY: string = env.VITE_SHOP_CURRENCY || 'CAD';

export const shopifyConfig = {
  domain: DOMAIN,
  token: TOKEN,
  currency: CURRENCY,
  endpoint: `https://${DOMAIN}/api/${API_VERSION}/graphql.json`,
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
      'Shopify is not configured. Set VITE_SHOPIFY_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN.',
      0,
    );
  }

  const response = await fetch(shopifyConfig.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
      Accept: 'application/json',
    },
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
    throw new ShopifyError(
      payload.errors.map((e) => e.message).join('; '),
      200,
      payload.errors,
    );
  }
  if (!payload.data) {
    throw new ShopifyError('Shopify returned no data', 200);
  }
  return payload.data;
}

/* ------------------------------------------------------------------ */
/*  GraphQL fragments                                                  */
/* ------------------------------------------------------------------ */

const PRODUCT_FIELDS = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    productType
    tags
    availableForSale
    createdAt
    updatedAt
    priceRange { minVariantPrice { amount currencyCode } }
    compareAtPriceRange { minVariantPrice { amount currencyCode } }
    images(first: 12) {
      edges { node { url altText width height } }
    }
    options { name values }
    variants(first: 100) {
      edges {
        node {
          id
          availableForSale
          selectedOptions { name value }
          price { amount currencyCode }
        }
      }
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Queries                                                            */
/* ------------------------------------------------------------------ */

export const QUERY_PRODUCTS = /* GraphQL */ `
  ${PRODUCT_FIELDS}
  query GetProducts($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      edges { node { ...ProductFields } }
    }
  }
`;

export const QUERY_PRODUCT_BY_HANDLE = /* GraphQL */ `
  ${PRODUCT_FIELDS}
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) { ...ProductFields }
  }
`;

export const QUERY_PRODUCTS_BY_TYPE = /* GraphQL */ `
  ${PRODUCT_FIELDS}
  query GetProductsByType($query: String!, $first: Int!) {
    products(first: $first, query: $query, sortKey: BEST_SELLING) {
      edges { node { ...ProductFields } }
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Mapping: Shopify → local Product                                   */
/* ------------------------------------------------------------------ */

/**
 * Known colour name → hex map for the swatch UI. Shopify's variant
 * options store the colour name only; we map a curated set and fall
 * back to a neutral chip for unknown names.
 */
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
  // try without spaces / hyphens
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
  availableForSale: boolean;
  createdAt: string;
  updatedAt: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  compareAtPriceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  options: Array<{ name: string; values: string[] }>;
  variants: {
    edges: Array<{
      node: {
        id: string;
        availableForSale: boolean;
        selectedOptions: Array<{ name: string; value: string }>;
      };
    }>;
  };
}

const isNewArrival = (node: ShopifyProductNode): boolean => {
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
  const priceAmount = Number(node.priceRange.minVariantPrice.amount);
  const compareAmount = Number(node.compareAtPriceRange.minVariantPrice.amount);
  const isSale = Number.isFinite(compareAmount) && compareAmount > priceAmount;

  const colorValues = findOption(node.options, 'Color', 'Colour', 'color', 'colours');
  const sizeValues = findOption(node.options, 'Size', 'size', 'Sizes', 'sizes');

  const colors: ProductColor[] = colorValues.map((name) => ({
    name,
    hex: hexFromColorName(name),
  }));

  const inStock = node.availableForSale || node.variants.edges.some((v) => v.node.availableForSale);

  // Prefer the productType as a category. If empty, fall back to the first tag.
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

/* ------------------------------------------------------------------ */
/*  Collection slug helpers                                            */
/* ------------------------------------------------------------------ */

export const categorySlug = (category: string): string => slugifyHandle(category);

/* ------------------------------------------------------------------ */
/*  Response types                                                     */
/* ------------------------------------------------------------------ */

export interface ProductsListResponse {
  products: { edges: Array<{ node: ShopifyProductNode }> };
}
export interface ProductResponse {
  product: ShopifyProductNode | null;
}
