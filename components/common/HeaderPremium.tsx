"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";

export function HeaderPremium() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const totalCartItems = useCartStore((state) => state.totalItems());
  const totalFavorites = useWishlistStore((state) => state.totalFavorites());

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { label: "Parfums", href: "/products" },
    { label: "Collections", href: "/products?family=All" },
    { label: "À Propos", href: "/#about" },
    { label: "Avis Clients", href: "/#testimonials" },
  ];

  return (
    <motion.header
      className="sticky top-0 z-40 w-full border-b border-amber-900/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <motion.div
              className="text-2xl font-bold font-playfair text-amber-900 tracking-wide"
              whileHover={{ scale: 1.03 }}
            >
              <span>Maison</span>
              <span className="text-amber-600 ml-1.5 font-light">Maeta</span>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm font-medium text-neutral-700 hover:text-amber-900 transition-colors py-1 group"
              >
                {item.label}
                <motion.div className="absolute bottom-0 left-0 h-0.5 w-full bg-amber-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search */}
            <Link
              href="/products"
              className="p-2.5 hover:bg-amber-50 rounded-full transition-colors text-neutral-700 hover:text-amber-900"
              aria-label="Rechercher des parfums"
            >
              <Search size={19} />
            </Link>

            {/* Favorites */}
            <Link
              href="/products?favorites=true"
              className="relative p-2.5 hover:bg-amber-50 rounded-full transition-colors text-neutral-700 hover:text-amber-900"
              aria-label="Voir les favoris"
            >
              <Heart size={19} />
              {mounted && totalFavorites > 0 && (
                <motion.span
                  className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  {totalFavorites}
                </motion.span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2.5 hover:bg-amber-50 rounded-full transition-colors text-neutral-700 hover:text-amber-900"
              aria-label="Voir le panier"
            >
              <ShoppingBag size={19} />
              {mounted && totalCartItems > 0 && (
                <motion.span
                  key={totalCartItems}
                  className="absolute top-1 right-1 w-4 h-4 bg-amber-700 text-white text-[10px] rounded-full flex items-center justify-center font-bold"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  {totalCartItems}
                </motion.span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2.5 hover:bg-amber-50 rounded-lg transition-colors text-neutral-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden py-4 border-t border-amber-900/10 space-y-1"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2.5 text-base font-medium text-neutral-700 hover:text-amber-900 hover:bg-amber-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
