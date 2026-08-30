import { HeroPremium } from '@/components/home/HeroPremium'
import { HeaderPremium } from '@/components/common/HeaderPremium'
import { ProductGrid } from '@/components/products/ProductGrid'
import { getFeaturedProducts } from '@/lib/services/productService'

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(6)

  return (
    <>
      <HeaderPremium />
      <HeroPremium />

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Fragrances
          </h2>
          <p className="text-lg text-gray-600">
            Discover our curated selection of luxury perfumes
          </p>
        </div>

        <ProductGrid products={featuredProducts} variant="featured" />
      </section>

      {/* About Section */}
      <section className="bg-amber-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            About Maison Maeta
          </h3>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Since 1997, Maison Maeta has crafted luxury fragrances that tell stories.
            Each bottle is a journey through carefully selected essences and timeless elegance.
          </p>
        </div>
      </section>
    </>
  )
}
