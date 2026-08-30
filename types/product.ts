/**
 * Product types for Maison Maeta luxury perfume e-commerce.
 * Strongly typed to ensure data integrity and developer experience.
 */

// Enumeration for fragrance families (fragrance categories)
export enum FragranceFamily {
  FLORAL = 'Floral',
  FRUITY = 'Fruity',
  ORIENTAL = 'Oriental',
  WOODY = 'Woody',
  FRESH = 'Fresh',
  AROMATIC = 'Aromatic',
  CHYPRE = 'Chypre',
  FOUGERE = 'Fougère',
  LEATHER = 'Leather',
  AMBER = 'Amber',
}

// Enumeration for product status
export enum ProductStatus {
  AVAILABLE = 'available',
  OUT_OF_STOCK = 'out_of_stock',
  COMING_SOON = 'coming_soon',
  DISCONTINUED = 'discontinued',
}

// Core Product interface (matches Prisma schema camelCase)
export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  longDescription?: string | null;

  // Pricing (prices in cents, e.g., 15999 = €159.99)
  priceInCents: number; // Current price in cents
  originalPriceInCents?: number | null; // Original price (for sales)

  // Product details
  fragranceFamily: string;
  volume?: number | null; // Volume in ml (e.g., 50, 100)
  concentration?: string | null; // eau_de_cologne, eau_de_toilette, eau_de_parfum, pure_parfum
  topNotes?: string | null;
  middleNotes?: string | null;
  baseNotes?: string | null;

  // Images
  imageUrl: string;
  thumbnailUrl?: string | null;

  // Status & availability
  status?: string;
  stock: number; // Quantity in stock
  isLimitedEdition: boolean;
  limitedEditionCount?: number | null; // Total units produced

  // Ratings & reviews
  averageRating?: number | null; // 0-5
  totalReviews?: number;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date | null;

  // SEO
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
}

// Product with full details (used on detail page)
export interface ProductDetail extends Product {
  related_products?: Product[];
  reviews?: Review[];
  sustainability_info?: {
    is_eco_friendly: boolean;
    materials?: string[];
    packaging_info?: string;
  };
}

// Minimal product representation (for lists, cards)
export interface ProductCard
  extends Pick<
    Product,
    | 'id'
    | 'name'
    | 'slug'
    | 'price'
    | 'original_price'
    | 'image_url'
    | 'fragrance_family'
    | 'is_limited_edition'
    | 'stock'
    | 'average_rating'
  > {
  description?: Product['description'];
}

// Product filtering options
export interface ProductFilters {
  fragrance_families?: FragranceFamily[] | string[];
  min_price?: number; // In cents
  max_price?: number; // In cents
  in_stock_only?: boolean;
  limited_edition_only?: boolean;
  sort_by?: 'newest' | 'price_asc' | 'price_desc' | 'rating' | 'popular';
  search_query?: string;
  page?: number;
  per_page?: number;
}

// Product search results
export interface ProductSearchResult {
  products: Product[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// Review type
export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user_name: string;
  rating: number; // 1-5
  title: string;
  content: string;
  verified_purchase: boolean;
  helpful_count?: number;
  created_at: Date;
}

// Product mutation types (for API operations)
export interface CreateProductInput
  extends Omit<Product, 'id' | 'created_at' | 'updated_at'> {}

export interface UpdateProductInput
  extends Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>> {
  id: string;
}
