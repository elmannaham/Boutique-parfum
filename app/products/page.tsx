import { HeaderPremium } from '@/components/common/HeaderPremium'
import { ProductGrid } from '@/components/products/ProductGrid'
import { getProducts } from '@/lib/services/productService'

export const metadata = {
  title: 'All Products | Maison Maeta',
  description: 'Discover our complete collection of luxury fragrances',
}

export default async function ProductListingPage() {
  const allProducts = await getProducts()

  return (
    <>
      <HeaderPremium />

      <main className="container mx-auto px-4 py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Fragrances
          </h1>
          <p className="text-lg text-gray-600">
            Explore our complete collection of luxury perfumes
          </p>
        </div>

        {allProducts.length > 0 ? (
          <ProductGrid products={allProducts} variant="all" />
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products available</p>
          </div>
        )}
      </main>
    </>
  )
}
