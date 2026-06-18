/**
 * Re-exports the canonical `Product` type from the shared module so any
 * legacy imports from `data/products` still work.
 *
 * The `products` array below is preserved as an offline fallback for the
 * home FeaturedProducts section when Shopify is unreachable. The site no
 * longer relies on this data for normal operation — it queries the
 * Storefront API through `services/productService`.
 */

import type { Product } from '../../shared/product';

export type { Product, ProductColor, ProductCategory } from '../../shared/product';

const fallback: Product[] = [
  {
    id: 'fallback-1',
    handle: 'classic-oversized-tee',
    title: 'Classic Oversized Tee',
    price: 89,
    category: 'T-Shirts',
    description:
      'The foundational oversized silhouette — cut from heavyweight cotton jersey for a relaxed drape that never loses its shape. Dropped shoulders, ribbed crew neck, and a slightly longer hem.',
    materials: '100% Heavyweight Cotton Jersey, 280gsm. Pre-washed for minimal shrinkage. Machine wash cold, tumble dry low.',
    shipping: 'Free standard shipping on orders over $150. Express 1–2 business days available. Free returns within 30 days.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
    ],
    colors: [
      { name: 'White', hex: '#F5F3EE' },
      { name: 'Ivory', hex: '#EDE8DC' },
      { name: 'Slate', hex: '#8C9099' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: true,
    isSale: false,
    tags: ['basics', 'oversized', 'cotton'],
  },
  {
    id: 'fallback-2',
    handle: 'essential-slim-tee',
    title: 'Essential Slim Tee',
    price: 75,
    category: 'T-Shirts',
    description:
      'A precision-cut slim silhouette in fine combed cotton. Designed to sit close to the body with clean lines and a refined collar.',
    materials: '100% Combed Cotton, 200gsm. Enzyme-washed for softness. Machine wash cold, hang dry recommended.',
    shipping: 'Free standard shipping on orders over $150. Express 1–2 business days available. Free returns within 30 days.',
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
    ],
    colors: [
      { name: 'Black', hex: '#1A1A18' },
      { name: 'Charcoal', hex: '#3D3D3A' },
      { name: 'Navy', hex: '#1B2A4A' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: false,
    isSale: false,
    tags: ['basics', 'slim', 'cotton'],
  },
  {
    id: 'fallback-3',
    handle: 'tapered-track-pants',
    title: 'Tapered Track Pants',
    price: 185,
    category: 'Track Pants',
    description:
      'Elevated track pants with a tapered leg and structured waistband. Cut from technical jersey with a matte finish.',
    materials: '78% Polyester, 22% Cotton, technical jersey. Machine wash cold. Tumble dry low.',
    shipping: 'Free standard shipping on orders over $150. Express 1–2 business days available. Free returns within 30 days.',
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    ],
    colors: [
      { name: 'Black', hex: '#1A1A18' },
      { name: 'Slate', hex: '#5A5E66' },
      { name: 'Sand', hex: '#C8B89A' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: false,
    isSale: false,
    tags: ['track pants', 'bottoms', 'technical'],
  },
  {
    id: 'fallback-4',
    handle: 'graphic-heritage-tee',
    title: 'Graphic Heritage Tee',
    price: 110,
    category: 'T-Shirts',
    description:
      'A considered graphic tee featuring archival-inspired artwork screen-printed with water-based inks. Oversized boxy fit, reinforced collar, and double-stitched hems ensure longevity.',
    materials: '100% Organic Cotton, 260gsm. Screen-printed with water-based inks. Machine wash cold, inside out.',
    shipping: 'Free standard shipping on orders over $150. Express 1–2 business days available. Free returns within 30 days.',
    images: [
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    ],
    colors: [
      { name: 'Off-White', hex: '#EDE8DC' },
      { name: 'Black', hex: '#1A1A18' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: true,
    isSale: false,
    tags: ['graphic', 'heritage', 'organic'],
  },
];

/** Offline fallback used by FeaturedProducts when Shopify is unreachable. */
export const products: Product[] = fallback;
