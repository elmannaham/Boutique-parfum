"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, ArrowRight } from "lucide-react";
import { PERFUME_PRODUCTS } from "@/lib/data/perfume-products";

export function FeaturedFragrances() {
  const featured = PERFUME_PRODUCTS.slice(0, 5);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-amber-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Our Selection
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-gray-950 mb-4">
              Featured Fragrances
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most coveted luxury perfumes, carefully curated for their exquisite
              craftsmanship and lasting impact.
            </p>
          </motion.div>
        </div>

        {/* Featured Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featured.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <Link href={`/products/${product.id}`}>
                {/* Product Card */}
                <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-square mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Quick Add Button */}
                  <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                  </div>

                  {/* New Badge */}
                  {product.isNew && (
                    <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      NEW
                    </span>
                  )}

                  {/* Limited Badge */}
                  {product.isLimited && (
                    <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      LIMITED
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-gray-950 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                    {product.frenchName && (
                      <p className="text-sm text-gray-500 italic">{product.frenchName}</p>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < Math.floor(product.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="text-xl font-bold text-amber-600">${product.price}</span>
                    <span className="text-xs font-semibold text-amber-600 group-hover:translate-x-1 transition-transform">
                      View →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gray-950 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Explore Full Collection
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
