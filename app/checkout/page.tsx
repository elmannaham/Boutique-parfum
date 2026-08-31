"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  CreditCard,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

import { useCartStore } from "@/lib/store/cartStore";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">(
    "shipping",
  );
  const [orderNumber, setOrderNumber] = useState("");

  const items = useCartStore((state) => state.items);
  const subtotalInCents = useCartStore((state) => state.subtotalInCents());
  const discountInCents = useCartStore((state) => state.discountInCents());
  const shippingInCents = useCartStore((state) => state.shippingInCents());
  const taxInCents = useCartStore((state) => state.taxInCents());
  const totalInCents = useCartStore((state) => state.totalInCents());
  const couponCode = useCartStore((state) => state.couponCode);
  const clearCart = useCartStore((state) => state.clearCart);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    street: "",
    apartment: "",
    city: "",
    postalCode: "",
    country: "France",
    phone: "",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.firstName &&
      formData.lastName &&
      formData.street &&
      formData.city
    ) {
      setStep("payment");
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const generatedNumber = `MAETA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedNumber);

    setTimeout(() => {
      clearCart();
      setStep("confirmation");
      setIsProcessing(false);
    }, 1800);
  };

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-amber-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0 && step !== "confirmation") {
    return (
      <main className="min-h-[70vh] flex items-center justify-center bg-neutral-50/50 px-4">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
          <ShoppingBag size={40} className="mx-auto text-amber-800 mb-4" />
          <h2 className="font-playfair text-2xl font-bold text-amber-950 mb-2">
            Votre panier est vide
          </h2>
          <p className="text-neutral-600 text-xs mb-6">
            Ajoutez des parfums à votre panier avant de finaliser votre
            commande.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-amber-900 text-white text-xs font-semibold rounded-xl hover:bg-amber-800 transition-colors"
          >
            Explorer les parfums
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50/50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200/80 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/cart"
            className="inline-flex items-center text-xs font-semibold text-amber-900 hover:text-amber-700 transition-colors"
          >
            <ArrowLeft size={14} className="mr-1.5" />
            Retour au panier
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-600">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span>Paiement Sécurisé SSL 256-bit</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Step Indicator */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-neutral-200 -z-0" />

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === "shipping" ||
                  step === "payment" ||
                  step === "confirmation"
                    ? "bg-amber-900 text-white shadow-md"
                    : "bg-neutral-200 text-neutral-600"
                }`}
              >
                1
              </div>
              <span className="text-[11px] font-semibold text-amber-950">
                Livraison
              </span>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === "payment" || step === "confirmation"
                    ? "bg-amber-900 text-white shadow-md"
                    : "bg-neutral-200 text-neutral-600"
                }`}
              >
                2
              </div>
              <span className="text-[11px] font-semibold text-amber-950">
                Paiement
              </span>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === "confirmation"
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-neutral-200 text-neutral-600"
                }`}
              >
                3
              </div>
              <span className="text-[11px] font-semibold text-amber-950">
                Confirmation
              </span>
            </div>
          </div>
        </div>

        {step === "confirmation" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-white rounded-3xl border border-neutral-200/80 p-8 sm:p-12 shadow-md text-center"
          >
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
              <CheckCircle2 size={36} />
            </div>

            <p className="text-amber-800 text-xs font-semibold uppercase tracking-widest mb-2">
              Commande Confirmée
            </p>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-amber-950 mb-3">
              Merci pour votre commande
            </h2>
            <p className="text-sm font-semibold text-amber-900 mb-6">
              Numéro de commande :{" "}
              <span className="font-mono">{orderNumber}</span>
            </p>

            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto mb-8">
              Un e-mail de confirmation détaillé a été envoyé à{" "}
              <strong>{formData.email || "votre adresse e-mail"}</strong>. Nos
              artisans parfumeurs préparent soigneusement vos flacons et vos
              échantillons offerts.
            </p>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-900/10 text-xs text-neutral-700 space-y-1 mb-8 max-w-md mx-auto text-left">
              <p>
                📍 <strong>Adresse de livraison :</strong> {formData.firstName}{" "}
                {formData.lastName}, {formData.street}, {formData.postalCode}{" "}
                {formData.city}
              </p>
              <p>
                📦 <strong>Délai estimé :</strong> 2 à 3 jours ouvrés (Colissimo
                Suivi)
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-900 hover:bg-amber-800 text-white rounded-xl font-semibold text-xs transition-colors shadow-lg"
            >
              <span>Retour à l'accueil</span>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 shadow-sm">
              {step === "shipping" && (
                <form onSubmit={handleShippingSubmit} className="space-y-5">
                  <h2 className="font-playfair text-2xl font-bold text-amber-950 pb-3 border-b border-neutral-100">
                    Coordonnées & Adresse de livraison
                  </h2>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Adresse e-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="sophie@exemple.fr"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:ring-2 focus:ring-amber-500/30 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Prénom
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Sophie"
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:ring-2 focus:ring-amber-500/30 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Nom
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Martin"
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:ring-2 focus:ring-amber-500/30 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Adresse postale
                    </label>
                    <input
                      type="text"
                      name="street"
                      required
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder="12 rue de la Paix"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:ring-2 focus:ring-amber-500/30 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Code postal
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="75001"
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:ring-2 focus:ring-amber-500/30 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Ville
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Paris"
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:ring-2 focus:ring-amber-500/30 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Téléphone (pour le transporteur)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="06 12 34 56 78"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:ring-2 focus:ring-amber-500/30 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-semibold text-xs shadow-lg transition-all"
                  >
                    Continuer vers le paiement
                  </button>
                </form>
              )}

              {step === "payment" && (
                <form onSubmit={handlePaymentSubmit} className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                    <h2 className="font-playfair text-2xl font-bold text-amber-950">
                      Paiement Sécurisé
                    </h2>
                    <button
                      type="button"
                      onClick={() => setStep("shipping")}
                      className="text-xs text-amber-700 hover:underline"
                    >
                      Modifier l'adresse
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-800">
                    <Lock size={16} className="shrink-0 text-emerald-600" />
                    <span>
                      Vos informations bancaires sont transmises de manière
                      cryptée et sécurisée.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Nom sur la carte
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      required
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="Sophie Martin"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:ring-2 focus:ring-amber-500/30 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Numéro de carte
                    </label>
                    <div className="relative">
                      <CreditCard
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                        size={16}
                      />
                      <input
                        type="text"
                        name="cardNumber"
                        required
                        maxLength={19}
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="4242 •••• •••• 4242"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:ring-2 focus:ring-amber-500/30 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Date d'expiration
                      </label>
                      <input
                        type="text"
                        name="cardExpiry"
                        required
                        placeholder="MM/AA"
                        maxLength={5}
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:ring-2 focus:ring-amber-500/30 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Cryptogramme (CVC)
                      </label>
                      <input
                        type="text"
                        name="cardCvc"
                        required
                        placeholder="123"
                        maxLength={4}
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:ring-2 focus:ring-amber-500/30 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 px-6 rounded-xl bg-amber-900 hover:bg-amber-800 disabled:opacity-50 text-white font-semibold text-sm shadow-xl shadow-amber-900/15 transition-all flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Validation du paiement...</span>
                      </>
                    ) : (
                      <>
                        <Lock size={16} />
                        <span>Régler €{(totalInCents / 100).toFixed(2)}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right: Items list & Order summary */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-neutral-200/80 p-6 shadow-sm space-y-5">
              <h3 className="font-playfair text-xl font-bold text-amber-950 pb-3 border-b border-neutral-100">
                Votre Commande ({items.reduce((s, i) => s + i.quantity, 0)}{" "}
                articles)
              </h3>

              <div className="divide-y divide-neutral-100 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="py-3 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 rounded-lg overflow-hidden bg-amber-50 shrink-0 border border-amber-900/10">
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-amber-950">
                          {item.product.name}
                        </p>
                        <p className="text-neutral-500 text-[11px]">
                          Qté : {item.quantity} • {item.selectedVolume || 100}ml
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-amber-950">
                      €{((item.product.price * item.quantity) / 100).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>€{(subtotalInCents / 100).toFixed(2)}</span>
                </div>
                {discountInCents > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Remise {couponCode}</span>
                    <span>-€{(discountInCents / 100).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span
                    className={
                      shippingInCents === 0
                        ? "text-emerald-700 font-semibold"
                        : ""
                    }
                  >
                    {shippingInCents === 0
                      ? "Offerte"
                      : `€${(shippingInCents / 100).toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>TVA (20%)</span>
                  <span>€{(taxInCents / 100).toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-baseline justify-between">
                <span className="text-sm font-bold text-amber-950">
                  Total à payer
                </span>
                <span className="font-playfair text-2xl font-bold text-amber-950">
                  €{(totalInCents / 100).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
