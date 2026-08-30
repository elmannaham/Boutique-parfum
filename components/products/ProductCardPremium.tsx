'use client';

import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Sparkles, Star } from 'lucide-react';
import type { Product } from '@/types/product';
import { useCartStore } from '@/lib/store/cartStore';
import { useWishlistStore } from '@/lib/store/wishlistStore';
import { useNotificationStore } from '@/lib/store/notificationStore';

interface ProductCardProps {
  product: Product;
}

const ProductCardPremium: FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const toggleFavorite = useWishlistStore((state) => state.toggleFavorite);
  const isFavorite = useWishlistStore((state) => state.isFavorite(product.id));
  const addToast = useNotificationStore((state) => state.addToast);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Price normalizer: if price > 1000 it's in cents (15999 = 159.99), otherwise it's in euros
  const rawPriceInCents = product.price > 1000 ? product.price : Math.round(product.price * 100);
  const formattedPrice = (rawPriceInCents / 100).toFixed(2);

  const rawOriginalPriceInCents =
    product.original_price && product.original_price > 1000
      ? product.original_price
      : product.original_price
      ? Math.round(product.original_price * 100)
      : undefined;

  const rating = product.average_rating || 4.8;
  const reviewsCount = product.total_reviews || 24;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ ...product, price: rawPriceInCents }, 1, product.volume || 100);
    addToast({
      title: 'Ajouté au panier ✨',
      message: `${product.name} (100ml) a été ajouté.`,
      type: 'success',
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleFavorite(product);
    addToast({
      title: added ? 'Coup de cœur ❤️' : 'Retiré des favoris',
      message: `${product.name} ${added ? 'a été ajouté à vos favoris.' : 'a été retiré de vos favoris.'}`,
      type: added ? 'favorite' : 'info',
    });
  };

  const slug = product.slug || product.id;

  return (
    <Link href={`/products/${slug}`} className="block h-full group">
      <motion.article
        className="relative h-full overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-500 hover:shadow-2xl border border-amber-900/5 flex flex-col"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -6 }}
      >
        {/* Background Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-amber-50/20 via-transparent to-amber-900/5 pointer-events-none transition-opacity"
          animate={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* Limited Edition Badge */}
        {product.is_limited_edition && (
          <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 rounded-full bg-amber-950/90 backdrop-blur-md px-3 py-1 text-amber-200 text-xs font-semibold shadow-lg">
            <Sparkles size={12} className="text-amber-400" />
            <span>Édition Limitée</span>
          </div>
        )}

        {/* Image Container */}
        <div className="relative h-72 sm:h-80 overflow-hidden bg-gradient-to-b from-amber-50/50 to-amber-100/30">
          <motion.img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Subtle dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick Add Button on Hover */}
          <div className="absolute bottom-4 left-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-900/95 hover:bg-amber-900 text-white py-3 px-4 text-sm font-semibold shadow-xl backdrop-blur-sm transition-colors active:scale-98"
              aria-label={`Ajouter ${product.name} au panier`}
            >
              <ShoppingBag size={16} />
              <span>Ajouter au panier</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
          <div>
            {/* Fragrance Family Badge & Concentration */}
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="inline-block rounded-full bg-amber-100/80 px-2.5 py-0.5 text-[11px] font-semibold text-amber-900 tracking-wide uppercase">
                {product.fragrance_family}
              </span>
              <span className="text-xs text-neutral-500 font-medium">
                {product.concentration === 'eau_de_parfum' && 'Eau de Parfum'}
                {product.concentration === 'eau_de_toilette' && 'Eau de Toilette'}
                {product.concentration === 'pure_parfum' && 'Extrait de Parfum'}
                {(!product.concentration || product.concentration === 'eau_de_cologne') && 'Eau de Parfum'}
              </span>
            </div>

            {/* Product Name */}
            <h3 className="font-playfair text-xl font-bold text-amber-950 group-hover:text-amber-700 transition-colors line-clamp-1 mb-2">
              {product.name}
            </h3>

            {/* Rating Stars */}
            <div className="mb-3.5 flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'}
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-500 font-medium">
                {rating.toFixed(1)} ({reviewsCount})
              </span>
            </div>
          </div>

          {/* Price & Action Row */}
          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="font-playfair text-2xl font-bold text-amber-950">
                €{formattedPrice}
              </span>
              {rawOriginalPriceInCents && rawOriginalPriceInCents > rawPriceInCents && (
                <span className="text-sm text-neutral-400 line-through">
                  €{(rawOriginalPriceInCents / 100).toFixed(2)}
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleToggleFavorite}
              className={`p-2.5 rounded-full border transition-all ${
                mounted && isFavorite
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-neutral-200 text-neutral-500 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50/50'
              }`}
              aria-label={mounted && isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              <Heart
                size={16}
                fill={mounted && isFavorite ? 'currentColor' : 'none'}
              />
            </button>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export { ProductCardPremium };
export default ProductCardPremium;
