/**
 * Central export for all TypeScript types.
 * Maintain a single source of truth for type definitions.
 */

// Product types
export type {
  Product,
  ProductDetail,
  ProductCard,
  ProductFilters,
  ProductSearchResult,
  Review,
  CreateProductInput,
  UpdateProductInput,
} from "./product";
export { FragranceFamily, ProductStatus } from "./product";

// User types
export type { User, UserProfile, UserPreferences, UserAddress } from "./user";
export { UserRole } from "./user";

// Order types
export type { Order, OrderItem, OrderStatus, CreateOrderInput } from "./order";

// API response types
export type { ApiResponse, ApiError, PaginatedResponse } from "./api";

// Cart types
export type { CartItem, Cart } from "./cart";

// Authentication types
export type { AuthSession, AuthUser } from "./auth";
