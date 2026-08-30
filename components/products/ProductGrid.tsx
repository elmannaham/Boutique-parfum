import type { Product } from '@/types'
import { ProductCardPremium } from './ProductCardPremium'

interface ProductGridProps {
  products: Product[]
  variant?: 'featured' | 'all'
}

export function ProductGrid({ products, variant = 'all' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">No products available</p>
      </div>
    )
  }

  return (
    <div
      data-testid="product-grid"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12"
    >
      {products.map((product) => (
        <div key={product.id} data-testid="product-card">
          <ProductCardPremium product={product} />
        </div>
      ))}
    </div>
  )
}
