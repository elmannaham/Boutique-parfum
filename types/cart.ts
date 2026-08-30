/**
 * Shopping cart types.
 */

import type { Product } from './product';

export interface CartItem {
  product_id: string;
  product: Product;
  quantity: number;
  added_at: Date;
  gift_message?: string;
}

export interface Cart {
  id: string;
  user_id?: string; // Anonymous cart if null
  items: CartItem[];
  subtotal: number; // Sum of all item totals (in cents)
  tax: number; // Calculated based on shipping address
  shipping: number; // In cents
  discount?: number; // Applied coupon discount
  total: number; // subtotal + tax + shipping - discount
  coupon_code?: string;
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface AddToCartInput {
  product_id: string;
  quantity: number;
  gift_message?: string;
}

export interface UpdateCartItemInput {
  product_id: string;
  quantity: number;
}

export interface ApplyCouponInput {
  coupon_code: string;
}
