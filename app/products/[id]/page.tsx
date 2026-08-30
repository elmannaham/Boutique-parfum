import { notFound } from "next/navigation"
import { HeaderPremium } from "@/components/common/HeaderPremium"
import { getProductById } from "@/lib/services/productService"
import Image from "next/image"

interface ProductDetailPageProps {
  params: { id: string }
}

export const revalidate = 60

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    return {
      title: "Product Not Found | Maison Maeta",
    }
  }

  return {
    title: `${product.name} | Maison Maeta`,
    description: product.description,
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <>
      <HeaderPremium />

      <main className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex items-center justify-center bg-gray-100 rounded-lg h-96">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                width={400}
                height={500}
                className="rounded-lg"
              />
            ) : (
              <div className="text-center text-gray-400">
                <p>No image available</p>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="text-3xl text-amber-600 font-semibold mb-6">
              ${(product.price / 100).toFixed(2)}
            </div>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-4 mb-8">
              <div>
                <span className="font-semibold text-gray-900">Concentration:</span>
                <p className="text-gray-600">{product.concentration}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Volume:</span>
                <p className="text-gray-600">{product.volume}ml</p>
              </div>
            </div>

            <button
              disabled
              className="w-full bg-gray-300 text-gray-600 py-3 rounded-lg font-semibold cursor-not-allowed"
            >
              Add to Cart (Coming Soon)
            </button>
          </div>
        </div>

        <section className="mt-20 pt-20 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Other Fragrances
          </h2>
          <p className="text-gray-600">
            Explore more of our luxury collection in the{" "}
            <a href="/products" className="text-amber-600 hover:underline">
              All Products
            </a>{" "}
            section.
          </p>
        </section>
      </main>
    </>
  )
}
