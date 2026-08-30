import { prisma } from '@/lib/prisma'
import type { Product } from '@/types'

/**
 * Mapper function to convert Prisma Product model (camelCase) to application Product type (snake_case)
 */
function mapPrismaProductToProduct(prismaProduct: any): Product {
  return {
    id: prismaProduct.id,
    name: prismaProduct.name,
    slug: prismaProduct.slug,
    description: prismaProduct.description,
    long_description: prismaProduct.longDescription,
    price: prismaProduct.priceInCents,
    original_price: prismaProduct.originalPriceInCents,
    fragrance_family: prismaProduct.fragranceFamily,
    volume: prismaProduct.volume,
    concentration: prismaProduct.concentration,
    top_notes: prismaProduct.topNotes ? JSON.parse(prismaProduct.topNotes) : undefined,
    middle_notes: prismaProduct.middleNotes ? JSON.parse(prismaProduct.middleNotes) : undefined,
    base_notes: prismaProduct.baseNotes ? JSON.parse(prismaProduct.baseNotes) : undefined,
    image_url: prismaProduct.imageUrl,
    thumbnail_url: prismaProduct.thumbnailUrl,
    status: prismaProduct.status,
    stock: prismaProduct.stock,
    is_limited_edition: prismaProduct.isLimitedEdition,
    limited_edition_count: prismaProduct.limitedEditionCount,
    average_rating: prismaProduct.averageRating,
    total_reviews: prismaProduct.totalReviews,
    created_at: prismaProduct.createdAt,
    updated_at: prismaProduct.updatedAt,
    published_at: prismaProduct.publishedAt,
    seo_title: prismaProduct.seoTitle,
    seo_description: prismaProduct.seoDescription,
    seo_keywords: prismaProduct.seoKeywords ? JSON.parse(prismaProduct.seoKeywords) : undefined,
  }
}

export async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return products.map(mapPrismaProductToProduct)
}

export async function getProductById(id: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      galleryImages: true,
    },
  })
  return product ? mapPrismaProductToProduct(product) : null
}

export async function getFeaturedProducts(limit: number = 6): Promise<Product[]> {
  const products = await prisma.product.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
  })
  return products.map(mapPrismaProductToProduct)
}
