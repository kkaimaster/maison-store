import type { Product } from '../../shared/product';

export const seedProducts: Product[] = [
  {
    id: '1',
    handle: 'classic-oversized-tee',
    title: 'Classic Oversized Tee',
    price: 89,
    category: 'T-Shirts',
    description: 'The foundational oversized silhouette in heavyweight cotton jersey.',
    materials: '100% Heavyweight Cotton Jersey, 280gsm.',
    shipping: 'Free standard shipping on orders over $150. Free returns within 30 days.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80'
    ],
    colors: [{ name: 'White', hex: '#F5F3EE' }, { name: 'Ivory', hex: '#EDE8DC' }, { name: 'Slate', hex: '#8C9099' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: true,
    isSale: false,
    tags: ['basics', 'oversized', 'cotton']
  },
  {
    id: '2',
    handle: 'essential-slim-tee',
    title: 'Essential Slim Tee',
    price: 75,
    category: 'T-Shirts',
    description: 'A precision-cut slim silhouette in fine combed cotton.',
    materials: '100% Combed Cotton, 200gsm.',
    shipping: 'Free standard shipping on orders over $150. Free returns within 30 days.',
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80'
    ],
    colors: [{ name: 'Black', hex: '#1A1A18' }, { name: 'Charcoal', hex: '#3D3D3A' }, { name: 'Navy', hex: '#1B2A4A' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: false,
    isSale: false,
    tags: ['basics', 'slim', 'cotton']
  },
  {
    id: '3',
    handle: 'washed-vintage-tee',
    title: 'Washed Vintage Tee',
    price: 69,
    compareAtPrice: 95,
    category: 'T-Shirts',
    description: 'Garment-washed for an authentic worn-in look.',
    materials: '100% Ring-Spun Cotton, 240gsm.',
    shipping: 'Free standard shipping on orders over $150. Free returns within 30 days.',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80',
      'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80'
    ],
    colors: [{ name: 'Faded Sand', hex: '#C8B89A' }, { name: 'Dusty Rose', hex: '#C4956A' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: false,
    isSale: true,
    tags: ['vintage', 'washed', 'sale']
  },
  {
    id: '4',
    handle: 'graphic-heritage-tee',
    title: 'Graphic Heritage Tee',
    price: 110,
    category: 'T-Shirts',
    description: 'Archival-inspired artwork with oversized boxy fit.',
    materials: '100% Organic Cotton, 260gsm.',
    shipping: 'Free standard shipping on orders over $150. Free returns within 30 days.',
    images: [
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80'
    ],
    colors: [{ name: 'Off-White', hex: '#EDE8DC' }, { name: 'Black', hex: '#1A1A18' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: true,
    isSale: false,
    tags: ['graphic', 'heritage', 'organic']
  },
  {
    id: '5',
    handle: 'ribbed-cropped-tee',
    title: 'Ribbed Cropped Tee',
    price: 85,
    category: 'T-Shirts',
    description: 'A cropped silhouette crafted in structured ribbed knit.',
    materials: '95% Cotton, 5% Elastane.',
    shipping: 'Free standard shipping on orders over $150. Free returns within 30 days.',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80'
    ],
    colors: [{ name: 'Cream', hex: '#F2EDD7' }, { name: 'Camel', hex: '#C19A6B' }, { name: 'Blush', hex: '#E8C5B0' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: true,
    isSale: false,
    tags: ['ribbed', 'cropped', 'fitted']
  },
  {
    id: '6',
    handle: 'tapered-track-pants',
    title: 'Tapered Track Pants',
    price: 185,
    category: 'Track Pants',
    description: 'Elevated track pants with a tapered leg and structured waistband.',
    materials: '78% Polyester, 22% Cotton.',
    shipping: 'Free standard shipping on orders over $150. Free returns within 30 days.',
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80'
    ],
    colors: [{ name: 'Black', hex: '#1A1A18' }, { name: 'Slate', hex: '#5A5E66' }, { name: 'Sand', hex: '#C8B89A' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: false,
    isSale: false,
    tags: ['track pants', 'bottoms', 'technical']
  }
];
