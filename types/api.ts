/**
 * API response types for consistent REST/JSON responses.
 * All API responses should follow this structure.
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  error: ApiError | null;
  meta?: {
    timestamp: string;
    request_id?: string;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string | string[]>;
  status: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export type PaginatedApiResponse<T> = ApiResponse<PaginatedResponse<T>>;

// Common error codes
export const ERROR_CODES = {
  // Client errors (400-499)
  BAD_REQUEST: "BAD_REQUEST",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  UNPROCESSABLE_ENTITY: "UNPROCESSABLE_ENTITY",

  // Server errors (500-599)
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
  GATEWAY_TIMEOUT: "GATEWAY_TIMEOUT",

  // Custom application errors
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  SESSION_EXPIRED: "SESSION_EXPIRED",
  INSUFFICIENT_STOCK: "INSUFFICIENT_STOCK",
  PAYMENT_FAILED: "PAYMENT_FAILED",
  EMAIL_ALREADY_REGISTERED: "EMAIL_ALREADY_REGISTERED",
} as const;
