import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product } from '@/types/product';

interface WishlistStore {
  favorites: Product[];
  toggleFavorite: (product: Product) => boolean; // returns true if added, false if removed
  isFavorite: (productId: string) => boolean;
  totalFavorites: () => number;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (product: Product) => {
        const exists = get().favorites.some((item) => item.id === product.id);
        if (exists) {
          set((state) => ({
            favorites: state.favorites.filter((item) => item.id !== product.id),
          }));
          return false;
        } else {
          set((state) => ({
            favorites: [...state.favorites, product],
          }));
          return true;
        }
      },

      isFavorite: (productId: string) => {
        return get().favorites.some((item) => item.id === productId);
      },

      totalFavorites: () => {
        return get().favorites.length;
      },

      clearWishlist: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: 'maison-maeta-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
