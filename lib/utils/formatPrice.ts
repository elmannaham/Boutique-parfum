/**
 * Format price utilities for consistent currency display.
 * Handles prices stored in cents (e.g., 15999 = €159.99).
 */

export interface FormatPriceOptions {
  locale?: string;
  currency?: string;
  showSymbol?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

/**
 * Format a price in cents to a localized currency string.
 *
 * @param priceInCents - Price in cents (e.g., 15999 for €159.99)
 * @param options - Formatting options
 * @returns Formatted price string (e.g., "159,99 €")
 *
 * @example
 * formatPrice(15999) // "159,99 €"
 * formatPrice(15999, { currency: 'USD', locale: 'en-US' }) // "$159.99"
 */
export function formatPrice(
  priceInCents: number,
  options: FormatPriceOptions = {}
): string {
  const maxDigits = options.maximumFractionDigits ?? 2;
  const minDigits = options.minimumFractionDigits ?? Math.min(2, maxDigits);
  const locale = options.locale ?? 'fr-FR';
  const currency = options.currency ?? 'EUR';

  if (!Number.isInteger(priceInCents) || priceInCents < 0) {
    console.warn(
      `Invalid price: ${priceInCents}. Expected non-negative integer (cents).`
    );
    return '—';
  }

  const priceInMajorUnits = priceInCents / 100;

  try {
    const formatted = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: minDigits,
      maximumFractionDigits: maxDigits,
    }).format(priceInMajorUnits);

    // Normalize non-breaking and thin spaces (\u00A0, \u202F) to standard space for cross-environment consistency
    return formatted.replace(/[\u00A0\u202F]/g, ' ');
  } catch {
    console.error(`Invalid locale/currency: ${locale}/${currency}`);
    return `${priceInMajorUnits.toFixed(2)}`;
  }
}

/**
 * Calculate discount amount and percentage.
 *
 * @param originalPrice - Original price in cents
 * @param salePrice - Sale price in cents
 * @returns Object with discount amount and percentage
 *
 * @example
 * calculateDiscount(20000, 15999) // { amount: 4001, percentage: 20 }
 */
export function calculateDiscount(
  originalPrice: number,
  salePrice: number
): { amount: number; percentage: number } {
  if (originalPrice <= 0 || salePrice < 0) {
    return { amount: 0, percentage: 0 };
  }

  const amount = originalPrice - salePrice;
  const percentage = Math.round((amount / originalPrice) * 100);

  return { amount, percentage };
}

/**
 * Check if a price is on sale.
 *
 * @param originalPrice - Original price in cents
 * @param salePrice - Current price in cents
 * @returns True if price is discounted
 */
export function isOnSale(
  originalPrice: number | undefined,
  salePrice: number
): boolean {
  return originalPrice !== undefined && originalPrice > salePrice;
}

/**
 * Format multiple prices as a range (e.g., "$50 — $100").
 *
 * @param minPrice - Minimum price in cents
 * @param maxPrice - Maximum price in cents
 * @param options - Formatting options
 * @returns Formatted price range
 */
export function formatPriceRange(
  minPrice: number,
  maxPrice: number,
  options: FormatPriceOptions = {}
): string {
  if (minPrice === maxPrice) {
    return formatPrice(minPrice, options);
  }

  const minFormatted = formatPrice(minPrice, options);
  const maxFormatted = formatPrice(maxPrice, options);

  return `${minFormatted} — ${maxFormatted}`;
}

/**
 * Calculate total order amount from line items.
 *
 * @param items - Array of items with price and quantity
 * @returns Total amount in cents
 */
export function calculateOrderTotal(
  items: Array<{ price: number; quantity: number }>
): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * Apply a percentage discount to a price.
 *
 * @param price - Price in cents
 * @param discountPercent - Discount percentage (0-100)
 * @returns Discounted price in cents
 */
export function applyDiscount(price: number, discountPercent: number): number {
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error('Discount percentage must be between 0 and 100');
  }

  const discountAmount = Math.round((price * discountPercent) / 100);
  return Math.max(0, price - discountAmount);
}
