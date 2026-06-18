import type { Product } from '../../shared/product';

const env = (import.meta as any).env ?? {};
const CURRENCY: string = env.VITE_SHOP_CURRENCY || 'CAD';
const LOCALE: string = env.VITE_SHOP_LOCALE || 'en-CA';

export function getDisplayPrice(product: Product): number {
  return product.price;
}

export function getCompareAtPrice(product: Product): number | undefined {
  if (!product.compareAtPrice) return undefined;
  return product.compareAtPrice > product.price ? product.compareAtPrice : undefined;
}

/**
 * Format a numeric amount as a currency string. Uses Intl.NumberFormat so
 * CAD renders as "CA$1,234.56" or "1 234,56 $ CA" depending on locale.
 *
 * Examples:
 *   formatPrice(89)             → "CA$89.00"
 *   formatPrice(89, 'USD')      → "$89.00"
 *   formatPrice(89, 'CAD', 'fr-CA') → "89,00 $ CA"
 */
export function formatPrice(price: number, currency: string = CURRENCY, locale: string = LOCALE): string {
  if (!Number.isFinite(price)) return '';
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay: 'narrowSymbol',
    }).format(price);
  } catch {
    return `${currency} ${price.toFixed(2)}`;
  }
}

export const shopCurrency = CURRENCY;
export const shopLocale = LOCALE;
