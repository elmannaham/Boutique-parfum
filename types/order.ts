/**
 * Order types for e-commerce transactions.
 */

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  product_image?: string;
  quantity: number;
  unit_price: number; // In cents
  subtotal: number; // quantity * unit_price
}

export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];

  // Pricing (in cents)
  subtotal: number;
  tax: number;
  shipping: number;
  discount?: number;
  total: number;

  // Shipping & Billing
  shipping_address: {
    name: string;
    street: string;
    city: string;
    postal_code: string;
    country: string;
    phone: string;
  };
  billing_address?: {
    name: string;
    street: string;
    city: string;
    postal_code: string;
    country: string;
  };

  // Payment & Fulfillment
  payment_method: 'credit_card' | 'paypal' | 'bank_transfer' | 'apple_pay' | 'google_pay';
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  status: OrderStatus;
  tracking_number?: string;

  // Metadata
  notes?: string;
  created_at: Date;
  updated_at: Date;
  estimated_delivery?: Date;
}

export interface CreateOrderInput {
  items: OrderItem[];
  shipping_address: Order['shipping_address'];
  billing_address?: Order['billing_address'];
  payment_method: Order['payment_method'];
  coupon_code?: string;
  notes?: string;
}
