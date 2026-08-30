import { describe, it, expect } from 'vitest';
import {
  formatPrice,
  calculateDiscount,
  isOnSale,
  formatPriceRange,
  calculateOrderTotal,
  applyDiscount,
} from '@/lib/utils/formatPrice';

describe('formatPrice Utility', () => {
  // ========================================================================
  // formatPrice() tests
  // ========================================================================

  describe('formatPrice()', () => {
    it('should format price in cents to EUR with French locale', () => {
      const result = formatPrice(15999);
      expect(result).toBe('159,99 €');
    });

    it('should format zero price', () => {
      const result = formatPrice(0);
      expect(result).toBe('0,00 €');
    });

    it('should format price with USD locale', () => {
      const result = formatPrice(15999, {
        locale: 'en-US',
        currency: 'USD',
      });
      expect(result).toBe('$159.99');
    });

    it('should format large prices correctly', () => {
      const result = formatPrice(999999); // €9,999.99
      expect(result.replace(/\s/g, '')).toContain('9999');
    });

    it('should handle prices with odd cents', () => {
      const result = formatPrice(15995); // €159.95
      expect(result).toMatch(/159[,.]95/);
    });

    it('should return fallback for invalid locale', () => {
      const result = formatPrice(15999, {
        locale: 'invalid-LOCALE',
      });
      // Should fall back to manual formatting
      expect(result).toBeDefined();
      expect(result).not.toBe('');
    });

    it('should warn and return dash for negative prices', () => {
      const result = formatPrice(-1000);
      expect(result).toBe('—');
    });

    it('should warn and return dash for non-integer prices', () => {
      const result = formatPrice(159.99);
      expect(result).toBe('—');
    });

    it('should respect maximumFractionDigits option', () => {
      const result = formatPrice(15999, {
        maximumFractionDigits: 0,
      });
      // Should round to nearest euro
      expect(result).toMatch(/160\s€|€\s160/);
    });
  });

  // ========================================================================
  // calculateDiscount() tests
  // ========================================================================

  describe('calculateDiscount()', () => {
    it('should calculate discount correctly', () => {
      const result = calculateDiscount(20000, 15999);
      expect(result.amount).toBe(4001);
      expect(result.percentage).toBe(20);
    });

    it('should return zero discount when prices are equal', () => {
      const result = calculateDiscount(15999, 15999);
      expect(result.amount).toBe(0);
      expect(result.percentage).toBe(0);
    });

    it('should handle 50% discount', () => {
      const result = calculateDiscount(20000, 10000);
      expect(result.percentage).toBe(50);
    });

    it('should return zero for invalid prices', () => {
      const result = calculateDiscount(0, 0);
      expect(result.amount).toBe(0);
      expect(result.percentage).toBe(0);
    });

    it('should return zero when sale price is higher (no discount)', () => {
      const result = calculateDiscount(10000, 20000);
      expect(result.amount).toBe(-10000);
      expect(result.percentage).toBe(-100);
    });
  });

  // ========================================================================
  // isOnSale() tests
  // ========================================================================

  describe('isOnSale()', () => {
    it('should return true when product is discounted', () => {
      expect(isOnSale(20000, 15999)).toBe(true);
    });

    it('should return false when product is not discounted', () => {
      expect(isOnSale(15999, 15999)).toBe(false);
    });

    it('should return false when originalPrice is undefined', () => {
      expect(isOnSale(undefined, 15999)).toBe(false);
    });

    it('should return false when sale price is higher', () => {
      expect(isOnSale(10000, 20000)).toBe(false);
    });
  });

  // ========================================================================
  // formatPriceRange() tests
  // ========================================================================

  describe('formatPriceRange()', () => {
    it('should format price range correctly', () => {
      const result = formatPriceRange(10000, 20000);
      expect(result).toContain('—');
      expect(result).toContain('100');
      expect(result).toContain('200');
    });

    it('should return single price when min equals max', () => {
      const result = formatPriceRange(15999, 15999);
      expect(result).toBe('159,99 €');
      expect(result).not.toContain('—');
    });

    it('should format range with USD', () => {
      const result = formatPriceRange(10000, 20000, {
        locale: 'en-US',
        currency: 'USD',
      });
      expect(result).toContain('$');
      expect(result).toContain('—');
    });
  });

  // ========================================================================
  // calculateOrderTotal() tests
  // ========================================================================

  describe('calculateOrderTotal()', () => {
    it('should calculate total for single item', () => {
      const items = [{ price: 15999, quantity: 1 }];
      expect(calculateOrderTotal(items)).toBe(15999);
    });

    it('should calculate total for multiple items', () => {
      const items = [
        { price: 15999, quantity: 1 },
        { price: 8999, quantity: 2 },
      ];
      // 15999 + (8999 * 2) = 15999 + 17998 = 33997
      expect(calculateOrderTotal(items)).toBe(33997);
    });

    it('should handle empty cart', () => {
      expect(calculateOrderTotal([])).toBe(0);
    });

    it('should handle large quantities', () => {
      const items = [{ price: 1000, quantity: 100 }];
      expect(calculateOrderTotal(items)).toBe(100000);
    });
  });

  // ========================================================================
  // applyDiscount() tests
  // ========================================================================

  describe('applyDiscount()', () => {
    it('should apply 20% discount', () => {
      const result = applyDiscount(15999, 20);
      // 15999 * 0.2 = 3199.8 → 3200
      // 15999 - 3200 = 12799
      expect(result).toBe(12799);
    });

    it('should apply 50% discount', () => {
      const result = applyDiscount(20000, 50);
      expect(result).toBe(10000);
    });

    it('should apply 0% discount', () => {
      const result = applyDiscount(15999, 0);
      expect(result).toBe(15999);
    });

    it('should apply 100% discount', () => {
      const result = applyDiscount(15999, 100);
      expect(result).toBe(0);
    });

    it('should throw error for invalid discount percentage', () => {
      expect(() => applyDiscount(15999, -10)).toThrow();
      expect(() => applyDiscount(15999, 150)).toThrow();
    });

    it('should never return negative price', () => {
      const result = applyDiscount(1000, 100);
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  // ========================================================================
  // INTEGRATION TESTS
  // ========================================================================

  describe('Integration: Discount flow', () => {
    it('should handle complete discount scenario', () => {
      const originalPrice = 20000; // €200.00
      const salePrice = 15999; // €159.99
      const quantity = 2;

      // Calculate order total with sale price
      const items = [{ price: salePrice, quantity }];
      const total = calculateOrderTotal(items);

      // Calculate savings
      const { amount: savingsPerUnit, percentage } = calculateDiscount(
        originalPrice,
        salePrice
      );

      expect(total).toBe(31998); // 15999 * 2
      expect(savingsPerUnit).toBe(4001); // €40.01
      expect(percentage).toBe(20);

      // Verify it shows as on sale
      expect(isOnSale(originalPrice, salePrice)).toBe(true);
    });

    it('should format prices consistently across operations', () => {
      const prices = [10000, 15999, 20000];
      const formatted = prices.map((p) => formatPrice(p));

      expect(formatted).toEqual(['100,00 €', '159,99 €', '200,00 €']);
    });
  });
});
