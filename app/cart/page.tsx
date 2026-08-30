'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Gift,
  Tag,
  Truck,
} from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';
import { useNotificationStore } from '@/lib/store/notificationStore';

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isGift, setIsGift] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const couponCode = useCartStore((state) => state.couponCode);
  const discountPercentage = useCartStore((state) => state.discountPercentage);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const removeCoupon = useCartStore((state) => state.removeCoupon);

  const subtotalInCents = useCartStore((state) => state.subtotalInCents());
  const discountInCents = useCartStore((state) => state.discountInCents());
  const shippingInCents = useCartStore((state) => state.shippingInCents());
  const taxInCents = useCartStore((state) => state.taxInCents());
  const totalInCents = useCartStore((state) => state.totalInCents());
  const addToast = useNotificationStore((state) => state.addToast);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-amber-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const freeShippingThreshold = 10000; // 100€
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotalInCents);
  const freeShippingProgress = Math.min(100, (subtotalInCents / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const success = applyCoupon(couponInput);
    if (success) {
      addToast({
        title: 'Code promo appliqué ! 🎉',
        message: `Vous bénéficiez d'une réduction spéciale.`,
        type: 'success',
      });
      setCouponInput('');
    } else {
      setCouponError('Code invalide. Essayez "MAETA10" ou "VIP20".');
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50/50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/products"
              className="inline-flex items-center text-xs font-semibold text-amber-900 hover:text-amber-700 transition-colors mb-2"
            >
              <ArrowLeft size={14} className="mr-1.5" />
              Continuer mes achats
            </Link>
            <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-amber-950">
              Mon Panier de Parfums
            </h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={() => {
                clearCart();
                addToast({ title: 'Panier vidé', type: 'info' });
              }}
              className="text-xs text-neutral-500 hover:text-rose-600 transition-colors self-start sm:self-auto"
            >
              Vider le panier
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {items.length === 0 ? (
          <motion.div
            className="text-center py-20 bg-white rounded-3xl border border-neutral-200/80 p-8 shadow-sm max-w-2xl mx-auto my-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-800">
              <ShoppingBag size={36} />
            </div>
            <h2 className="font-playfair text-3xl font-bold text-amber-950 mb-3">
              Votre panier est vide
            </h2>
            <p className="text-neutral-600 text-sm max-w-md mx-auto mb-8 font-light leading-relaxed">
              Laissez-vous tenter par nos créations olfactives artisanales et trouvez votre signature unique.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-900 text-white rounded-xl hover:bg-amber-800 transition-all font-semibold text-sm shadow-xl shadow-amber-900/15"
            >
              <span>Découvrir la collection</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping Progress Bar */}
              <div className="p-4 rounded-2xl bg-white border border-amber-900/10 shadow-sm">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="flex items-center gap-1.5 text-amber-950">
                    <Truck size={15} className="text-amber-800" />
                    {amountNeededForFreeShipping === 0 ? (
                      <span className="text-emerald-700">Félicitations ! Vous bénéficiez de la livraison offerte ✨</span>
                    ) : (
                      <span>
                        Plus que <strong className="text-amber-900">€{(amountNeededForFreeShipping / 100).toFixed(2)}</strong> pour la livraison offerte
                      </span>
                    )}
                  </span>
                  <span className="text-neutral-500">{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-800 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="bg-white rounded-3xl border border-neutral-200/80 p-4 sm:p-6 shadow-sm divide-y divide-neutral-100">
                <AnimatePresence>
                  {items.map((item) => {
                    const priceInEuros = (item.product.price / 100).toFixed(2);
                    const itemTotalInEuros = ((item.product.price * item.quantity) / 100).toFixed(2);

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                      >
                        {/* Image & Main Info */}
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden bg-amber-50 shrink-0 border border-amber-900/10">
                            <img
                              src={item.product.image_url}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div>
                            <span className="text-[11px] font-semibold text-amber-800 tracking-wider uppercase">
                              {item.product.fragrance_family}
                            </span>
                            <Link
                              href={`/products/${item.product.slug || item.product.id}`}
                              className="block font-playfair text-lg font-bold text-amber-950 hover:text-amber-700 transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-xs text-neutral-500 mt-0.5">
                              Flacon {item.selectedVolume || item.product.volume || 100}ml • €{priceInEuros} l'unité
                            </p>
                          </div>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-neutral-200 rounded-xl bg-neutral-50 p-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1.5 rounded-lg hover:bg-white text-neutral-600 transition-colors"
                              aria-label="Diminuer la quantité"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="w-7 text-center text-xs font-semibold text-neutral-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1.5 rounded-lg hover:bg-white text-neutral-600 transition-colors"
                              aria-label="Augmenter la quantité"
                            >
                              <Plus size={13} />
                            </button>
                          </div>

                          {/* Line Total */}
                          <div className="text-right min-w-[75px]">
                            <span className="font-playfair text-lg font-bold text-amber-950">
                              €{itemTotalInEuros}
                            </span>
                          </div>

                          {/* Remove button */}
                          <button
                            onClick={() => {
                              removeItem(item.id);
                              addToast({ title: 'Article retiré', type: 'info' });
                            }}
                            className="p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                            aria-label="Supprimer cet article"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Gift Message Accordion */}
              <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-sm">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsGift(!isGift)}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-900">
                      <Gift size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-amber-950">C'est un cadeau ?</h4>
                      <p className="text-xs text-neutral-500 font-light">
                        Ajoutez un mot personnalisé et un emballage luxueux offert.
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isGift}
                    onChange={(e) => setIsGift(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-900 focus:ring-amber-500 cursor-pointer"
                  />
                </div>

                {isGift && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-neutral-100"
                  >
                    <label className="block text-xs font-semibold text-neutral-700 mb-2">
                      Message personnalisé (écrit sur papier vergé cacheté à la cire) :
                    </label>
                    <textarea
                      rows={3}
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Chère Sophie, pour célébrer ce moment précieux..."
                      className="w-full p-3 rounded-xl border border-neutral-200 text-xs focus:ring-2 focus:ring-amber-500/30 focus:outline-none"
                    />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="lg:col-span-4 sticky top-28 space-y-4">
              <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 shadow-md space-y-5">
                <h3 className="font-playfair text-xl font-bold text-amber-950 pb-4 border-b border-neutral-100">
                  Récapitulatif
                </h3>

                {/* Promo Code Form */}
                <div>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={14} />
                      <input
                        type="text"
                        placeholder="Code promo (ex: MAETA10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs uppercase font-medium focus:outline-none focus:ring-2 focus:ring-amber-600/30"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-950 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold transition-colors"
                    >
                      Appliquer
                    </button>
                  </form>
                  {couponError && <p className="text-xs text-rose-600 mt-1.5">{couponError}</p>}
                  {couponCode && (
                    <div className="mt-2 flex items-center justify-between p-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold">
                      <span>Code {couponCode} (-{discountPercentage}%)</span>
                      <button onClick={removeCoupon} className="text-emerald-700 hover:text-emerald-900">
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                {/* Subtotal breakdown */}
                <div className="space-y-3 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
                  <div className="flex justify-between">
                    <span>Sous-total articles</span>
                    <span className="font-semibold text-neutral-900">€{(subtotalInCents / 100).toFixed(2)}</span>
                  </div>

                  {discountInCents > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Remise privilège</span>
                      <span>-€{(discountInCents / 100).toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Frais de port</span>
                    <span className={shippingInCents === 0 ? 'text-emerald-700 font-bold' : 'font-semibold text-neutral-900'}>
                      {shippingInCents === 0 ? 'Offerts' : `€${(shippingInCents / 100).toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>TVA estimée (20%)</span>
                    <span>€{(taxInCents / 100).toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-neutral-200 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-neutral-500 font-medium">Total TTC</span>
                    <p className="text-[10px] text-neutral-400">Paiement sécurisé SSL</p>
                  </div>
                  <span className="font-playfair text-3xl font-bold text-amber-950">
                    €{(totalInCents / 100).toFixed(2)}
                  </span>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-semibold text-sm shadow-xl shadow-amber-900/20 transition-all active:scale-98"
                >
                  <span>Commander maintenant</span>
                  <ArrowRight size={16} />
                </Link>

                {/* Reassurances */}
                <div className="pt-3 text-center text-[11px] text-neutral-500 space-y-1">
                  <p>✓ 2 échantillons d'exception offerts</p>
                  <p>✓ Emballage luxueux scellé à la main</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
