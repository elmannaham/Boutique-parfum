import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-amber-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Maison Maeta</h3>
            <p className="text-amber-100 text-sm">Luxury perfumes crafted with passion and elegance.</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-amber-300">All Perfumes</Link></li>
              <li><Link href="/collections" className="hover:text-amber-300">Collections</Link></li>
              <li><Link href="/new" className="hover:text-amber-300">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-amber-300">About</Link></li>
              <li><Link href="/contact" className="hover:text-amber-300">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-amber-300">Privacy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-amber-300"><Facebook size={20} /></a>
              <a href="#" className="hover:text-amber-300"><Instagram size={20} /></a>
              <a href="#" className="hover:text-amber-300"><Twitter size={20} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-800 pt-8 text-center text-sm text-amber-100">
          <p>&copy; 2026 Maison Maeta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
