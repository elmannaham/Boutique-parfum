import Link from 'next/link'
import { Search, Heart, ShoppingBag, User } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-amber-900">
          Maison Maeta
        </Link>

        <div className="hidden md:flex gap-8 flex-1 justify-center">
          <Link href="/products" className="text-sm hover:text-amber-700">
            Parfums
          </Link>
          <Link href="/about" className="text-sm hover:text-amber-700">
            À Propos
          </Link>
          <Link href="/contact" className="text-sm hover:text-amber-700">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Search size={20} className="text-gray-700" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Heart size={20} className="text-gray-700" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ShoppingBag size={20} className="text-gray-700" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <User size={20} className="text-gray-700" />
          </button>
        </div>
      </nav>
    </header>
  )
}
