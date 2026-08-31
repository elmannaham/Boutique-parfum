import { HeaderPremium } from "@/components/common/HeaderPremium";
import { HeroPremium } from "@/components/home/HeroPremium";
import { ProductGrid } from "@/components/products/ProductGrid";
import BentoDemo from "@/components/ui/bento-demo";
import { getFeaturedProducts } from "@/lib/services/productService";
import type { Product } from "@/types";

export default async function HomePage() {
  let featuredProducts: Product[] = [];
  try {
    featuredProducts = await getFeaturedProducts(6);
  } catch (error) {
    // Database not yet initialized or unavailable
    console.log("Featured products unavailable at build time");
  }

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

      {/* Bento Grid - Product Features */}
      <BentoDemo />

      {/* About Section */}
      <section className="bg-amber-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            About Maison Maeta
          </h3>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Since 1997, Maison Maeta has crafted luxury fragrances that tell
            stories. Each bottle is a journey through carefully selected
            essences and timeless elegance.
          </p>
        </div>
      </section>
    </>
  );
}
