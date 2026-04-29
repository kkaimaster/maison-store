export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  category: 'T-Shirts' | 'Track Pants';
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

export const products: Product[] = [
  {
    id: '1',
    handle: 'classic-oversized-tee',
    title: 'Classic Oversized Tee',
    price: 89,
    category: 'T-Shirts',
    description: 'The foundational oversized silhouette — cut from heavyweight 280gsm cotton jersey for a relaxed drape that never loses its shape. Dropped shoulders, ribbed crew neck, and a slightly longer hem.',
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
    id: '2',
    handle: 'essential-slim-tee',
    title: 'Essential Slim Tee',
    price: 75,
    category: 'T-Shirts',
    description: 'A precision-cut slim silhouette in fine 200gsm cotton. Designed to sit close to the body with clean lines and a refined collar. The ultimate layering piece or standalone statement.',
    materials: '100% Combed Cotton, 200gsm. Enzyme-washed for softness. Machine wash cold, hang dry recommended.',
    shipping: 'Free standard shipping on orders over $150. Express 1–2 business days available. Free returns within 30 days.',
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80',
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
    id: '3',
    handle: 'washed-vintage-tee',
    title: 'Washed Vintage Tee',
    price: 95,
    compareAtPrice: 69,
    category: 'T-Shirts',
    description: 'Garment-washed for an authentic worn-in look that only improves with time. Slightly boxy cut with distressed hems and raw seam details. Made to feel like it\'s been yours forever.',
    materials: '100% Ring-Spun Cotton, 240gsm. Garment-dyed and stone-washed. Machine wash cold, tumble dry low.',
    shipping: 'Free standard shipping on orders over $150. Express 1–2 business days available. Free returns within 30 days.',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80',
      'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80',
    ],
    colors: [
      { name: 'Faded Sand', hex: '#C8B89A' },
      { name: 'Dusty Rose', hex: '#C4956A' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: false,
    isSale: true,
    tags: ['vintage', 'washed', 'sale'],
  },
  {
    id: '4',
    handle: 'graphic-heritage-tee',
    title: 'Graphic Heritage Tee',
    price: 110,
    category: 'T-Shirts',
    description: 'A considered graphic tee featuring archival-inspired artwork screen-printed with water-based inks. Oversized boxy fit, reinforced collar, and double-stitched hems ensure longevity.',
    materials: '100% Organic Cotton, 260gsm. Screen-printed with water-based inks. Machine wash cold, inside out.',
    shipping: 'Free standard shipping on orders over $150. Express 1–2 business days available. Free returns within 30 days.',
    images: [
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80',
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
  {
    id: '5',
    handle: 'ribbed-cropped-tee',
    title: 'Ribbed Cropped Tee',
    price: 85,
    category: 'T-Shirts',
    description: 'A cropped silhouette crafted in structured ribbed knit. Fitted yet breathable with a clean crewneck and subtle flare at the hem. The intersection of utility and elegance.',
    materials: '95% Cotton, 5% Elastane, ribbed knit construction. Hand wash cold or machine wash gentle. Lay flat to dry.',
    shipping: 'Free standard shipping on orders over $150. Express 1–2 business days available. Free returns within 30 days.',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80',
    ],
    colors: [
      { name: 'Cream', hex: '#F2EDD7' },
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Blush', hex: '#E8C5B0' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: true,
    isSale: false,
    tags: ['ribbed', 'cropped', 'fitted'],
  },
  {
    id: '6',
    handle: 'tapered-track-pants',
    title: 'Tapered Track Pants',
    price: 185,
    category: 'Track Pants',
    description: 'Elevated track pants with a tapered leg and structured waistband. Cut from technical jersey with a matte finish — polished enough for the city, comfortable enough for everywhere else.',
    materials: '78% Polyester, 22% Cotton, technical jersey. Machine wash cold. Tumble dry low.',
    shipping: 'Free standard shipping on orders over $150. Express 1–2 business days available. Free returns within 30 days.',
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80',
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
];

export const getProductByHandle = (handle: string) =>
  products.find((p) => p.handle === handle);

export const getProductsByCategory = (category: string) =>
  products.filter((p) => p.category === category);

export const getRelatedProducts = (product: Product, count = 3) =>
  products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, count).length >= count
    ? products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, count)
    : products.filter((p) => p.id !== product.id).slice(0, count);
