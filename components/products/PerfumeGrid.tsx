"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart } from "lucide-react";
import type { PerfumeProduct } from "@/lib/data/perfume-products";

type PerfumeGridProps = {
  products: PerfumeProduct[];
  variant?: "featured" | "full" | "collection";
};

export function PerfumeGrid({ products, variant = "full" }: PerfumeGridProps) {
  const gridCols = variant === "featured" ? 3 : 4;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${gridCols} gap-6 sm:gap-8`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={itemVariants}
          whileHover={{ y: -8 }}
          className="group"
        >
          <Link href={`/products/${product.id}`}>
            <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-square">
              {/* Product Image */}
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Badges */}
              <div className="absolute top-3 right-3 flex gap-2">
                {product.isNew && (
                  <span className="bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    NEW
                  </span>
                )}
                {product.isLimited && (
                  <span className="bg-rose-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    LIMITED
                  </span>
                )}
              </div>

              {/* Quick Actions */}
              <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <ShoppingCart size={16} />
                  Add
                </button>
                <button className="bg-white/20 hover:bg-white/30 text-white py-2 px-3 rounded-lg transition-colors backdrop-blur">
                  <Heart size={16} />
                </button>
              </div>
            </div>
          </Link>

          {/* Product Info */}
          <div className="mt-4 space-y-2">
            {/* Name */}
            <Link href={`/products/${product.id}`}>
              <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                {product.name}
              </h3>
            </Link>

            {/* French Name */}
            {product.frenchName && (
              <p className="text-sm text-gray-600 italic">{product.frenchName}</p>
            )}

            {/* Description */}
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

            {/* Profile - Pyramid */}
            <div className="text-xs text-gray-500 space-y-1">
              <p>
                <span className="font-semibold text-gray-700">Top:</span>{" "}
                {product.profile.top.join(", ")}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Heart:</span>{" "}
                {product.profile.heart.join(", ")}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Base:</span>{" "}
                {product.profile.base.join(", ")}
              </p>
            </div>

            {/* Characteristics */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded">
                {product.characteristics.concentration}
              </span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {product.characteristics.longevity}
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                {product.characteristics.season}
              </span>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1">
                <div className="flex">
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
                <span className="text-sm font-semibold text-gray-900">
                  {product.rating}
                </span>
                <span className="text-xs text-gray-600">
                  ({product.reviews})
                </span>
              </div>
            </div>

            {/* Price & Availability */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <span className="text-2xl font-bold text-amber-600">${product.price}</span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  product.availability === "In Stock"
                    ? "bg-green-100 text-green-800"
                    : product.availability === "Limited Stock"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-blue-100 text-blue-800"
                }`}
              >
                {product.availability}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
