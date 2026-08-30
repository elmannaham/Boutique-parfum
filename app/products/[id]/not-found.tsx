import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        The product you're looking for doesn't exist or has been removed.
      </p>
      <Link
        href="/products"
        className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700"
      >
        Back to Products
      </Link>
    </div>
  )
}
