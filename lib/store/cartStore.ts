import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { Product } from "@/types/product";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedVolume?: number;
}

interface CartStore {
  items: CartItem[];
  couponCode: string | null;
  discountPercentage: number;

  addItem: (
    product: Product,
    quantity?: number,
    selectedVolume?: number,
  ) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  totalItems: () => number;
  subtotalInCents: () => number;
  discountInCents: () => number;
  shippingInCents: () => number;
  taxInCents: () => number;
  totalInCents: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      discountPercentage: 0,

      addItem: (product: Product, quantity = 1, selectedVolume = 100) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedVolume === selectedVolume,
          );

          if (existingIndex > -1) {
            const newItems = [...state.items];
            const currentItem = newItems[existingIndex];
            if (currentItem) {
              newItems[existingIndex] = {
                ...currentItem,
                quantity: currentItem.quantity + quantity,
              };
            }
            return { items: newItems };
          }

          return {
            items: [
              ...state.items,
              {
                id: `${product.id}-${selectedVolume}-${Date.now()}`,
                product,
                quantity,
                selectedVolume,
              },
            ],
          };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter(
            (item) => item.product.id !== productId && item.id !== productId,
          ),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId || item.id === productId
              ? { ...item, quantity }
              : item,
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], couponCode: null, discountPercentage: 0 });
      },

      applyCoupon: (code: string) => {
        const cleanCode = code.trim().toUpperCase();
        if (cleanCode === "MAETA10" || cleanCode === "LUXE10") {
          set({ couponCode: cleanCode, discountPercentage: 10 });
          return true;
        }
        if (cleanCode === "VIP20" || cleanCode === "MAISON20") {
          set({ couponCode: cleanCode, discountPercentage: 20 });
          return true;
        }
        return false;
      },

      removeCoupon: () => {
        set({ couponCode: null, discountPercentage: 0 });
      },

      totalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      subtotalInCents: () => {
        return get().items.reduce((sum, item) => {
          const price = item.product.price;
          return sum + price * item.quantity;
        }, 0);
      },

      discountInCents: () => {
        const subtotal = get().subtotalInCents();
        const percentage = get().discountPercentage;
        return Math.round((subtotal * percentage) / 100);
      },

      shippingInCents: () => {
        const subtotal = get().subtotalInCents();
        if (subtotal === 0) {
          return 0;
        }
        return subtotal >= 10000 ? 0 : 1500;
      },

      taxInCents: () => {
        const taxable = get().subtotalInCents() - get().discountInCents();
        return Math.round(taxable * 0.2);
      },

      totalInCents: () => {
        const subtotal = get().subtotalInCents();
        if (subtotal === 0) {
          return 0;
        }
        const discount = get().discountInCents();
        const shipping = get().shippingInCents();
        const tax = get().taxInCents();
        return subtotal - discount + shipping + tax;
      },
    }),
    {
      name: "maison-maeta-cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
