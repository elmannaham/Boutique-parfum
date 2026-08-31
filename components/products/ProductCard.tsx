"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";

import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: FC<ProductCardProps> = ({
  product,
  className,
  priority = false,
  onAddToCart,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onAddToCart?.(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  const imageAlt = `${product.name} - ${product.fragrance_family} parfum`;
  const productUrl = `/products/${product.slug}`;

  return (
    <motion.article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      role="region"
      aria-label={`${product.name} parfum product card`}
    >
      {/* Image Container */}
      <Link
        href={productUrl}
        className="relative block overflow-hidden bg-neutral-50"
      >
        <div className="relative aspect-square w-full">
          {!imageError ? (
            <Image
              src={product.image_url}
              alt={imageAlt}
              fill
              className={cn(
                "object-cover transition-transform duration-500 group-hover:scale-105",
                "group-focus-within:ring-2 group-focus-within:ring-offset-2 group-focus-within:ring-amber-600",
              )}
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={85}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-neutral-100">
              <span className="text-sm text-neutral-400">
                Image indisponible
              </span>
            </div>
          )}
        </div>

        {/* Badge collection limitée */}
        <AnimatePresence>
          {product.is_limited_edition && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute left-3 top-3"
            >
              <span
                className="inline-block rounded-full bg-amber-600 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white shadow-md"
                role="status"
                aria-label="Édition limitée"
              >
                Limité
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons - Overlay on Hover */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/30 group-hover:opacity-100">
          <motion.button
            onClick={handleToggleFavorite}
            className={cn(
              "rounded-full p-3 shadow-lg transition-colors duration-200",
              isFavorite
                ? "bg-red-500 text-white"
                : "bg-white text-neutral-700 hover:bg-red-500 hover:text-white",
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={
              isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
            }
            aria-pressed={isFavorite}
          >
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </motion.button>

          <motion.button
            onClick={handleAddToCart}
            disabled={isAdded}
            className="rounded-full bg-amber-600 p-3 text-white shadow-lg transition-colors duration-200 hover:bg-amber-700 disabled:bg-emerald-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isAdded ? "Produit ajouté" : "Ajouter au panier"}
          >
            <ShoppingBag size={20} />
          </motion.button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-1 flex-col justify-between p-4">
        {/* Category & Name */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-600">
            {product.fragrance_family}
          </p>
          <Link href={productUrl}>
            <h3 className="mt-2 text-lg font-light tracking-tight text-neutral-900 transition-colors hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2">
              {product.name}
            </h3>
          </Link>

          {product.description && (
            <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
              {product.description}
            </p>
          )}
        </div>

        {/* Footer: Price & Rating */}
        <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-neutral-900">
              {formatPrice(product.price)}
            </span>
            {product.original_price &&
              product.original_price > product.price && (
                <span className="text-sm line-through text-neutral-400">
                  {formatPrice(product.original_price)}
                </span>
              )}
          </div>

          {product.average_rating && (
            <div
              className="flex items-center gap-1"
              aria-label={`Note: ${product.average_rating} sur 5`}
            >
              <span className="text-xs font-medium text-neutral-700">
                {product.average_rating.toFixed(1)}
              </span>
              <span className="text-xs text-amber-600">★</span>
            </div>
          )}
        </div>

        {/* Stock Status */}
        {product.stock <= 0 && (
          <div className="mt-2 rounded-md bg-red-50 p-2 text-center">
            <p
              className="text-xs font-semibold uppercase text-red-600"
              role="alert"
            >
              Rupture de stock
            </p>
          </div>
        )}
      </div>
    </motion.article>
  );
};

export { ProductCard };
export default ProductCard;
