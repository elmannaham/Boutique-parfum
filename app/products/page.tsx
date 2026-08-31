import { HeaderPremium } from "@/components/common/HeaderPremium";
import { PageHero } from "@/components/sections/PageHero";
import { PerfumeGrid } from "@/components/products/PerfumeGrid";
import { PERFUME_PRODUCTS } from "@/lib/data/perfume-products";

export const metadata = {
  title: "All Fragrances | Maison Maeta",
  description:
    "Discover our complete collection of luxury perfumes, each crafted with the finest essences from around the world",
};

export default function ProductsPage() {
  return (
    <>
      <HeaderPremium />

      {/* Hero Section */}
      <PageHero
        badge="Luxury Perfumes"
        title="Our Collection"
        subtitle="Exquisite Fragrances from Around the World"
        description="Explore our curated selection of premium perfumes, each crafted with the finest essences. Find your signature scent among our luxury collection."
        variant="full"
      />

      {/* Filters Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-amber-100 text-amber-900 rounded-full font-semibold hover:bg-amber-200 transition-colors">
              All ({PERFUME_PRODUCTS.length})
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-full font-semibold hover:bg-gray-200 transition-colors">
              New ({PERFUME_PRODUCTS.filter((p) => p.isNew).length})
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-full font-semibold hover:bg-gray-200 transition-colors">
              Limited (
              {PERFUME_PRODUCTS.filter((p) => p.isLimited).length})
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-full font-semibold hover:bg-gray-200 transition-colors">
              Summer ({PERFUME_PRODUCTS.filter((p) => p.characteristics.season === "Summer").length})
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-full font-semibold hover:bg-gray-200 transition-colors">
              Winter ({PERFUME_PRODUCTS.filter((p) => p.characteristics.season === "Winter").length})
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <PerfumeGrid products={PERFUME_PRODUCTS} variant="full" />
        </div>
      </section>

      {/* Info Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <h3 className="font-serif text-2xl font-bold text-gray-950 mb-3">
              Premium Quality
            </h3>
            <p className="text-gray-700">
              Every fragrance is crafted from the finest natural and rare
              essences, ensuring exceptional quality and longevity.
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-serif text-2xl font-bold text-gray-950 mb-3">
              Expert Selection
            </h3>
            <p className="text-gray-700">
              Our master perfumers have curated each blend with meticulous
              attention to detail and artistic vision.
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-serif text-2xl font-bold text-gray-950 mb-3">
              Luxury Experience
            </h3>
            <p className="text-gray-700">
              From the first spritz to the final note, experience true luxury
              with every application.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
