import type { Product } from '../../shared/product';

export function getDisplayPrice(product: Product): number {
  return product.price;
}

export function getCompareAtPrice(product: Product): number | undefined {
  if (!product.compareAtPrice) return undefined;
  return product.compareAtPrice > product.price ? product.compareAtPrice : undefined;
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
