import { HeaderPremium } from "@/components/common/HeaderPremium";
import { HeroPremium } from "@/components/home/HeroPremium";
import { FeaturedFragrances } from "@/components/sections/FeaturedFragrances";
import BentoDemo from "@/components/ui/bento-demo";

export default function HomePage() {
  return (
    <>
      <HeaderPremium />
      <HeroPremium />

      {/* Featured Fragrances Section */}
      <FeaturedFragrances />

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
