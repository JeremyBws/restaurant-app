import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      wishlist: [],
      
      toggleFavorite: (restaurantId) => {
        set((state) => ({
          favorites: state.favorites.includes(restaurantId)
            ? state.favorites.filter(id => id !== restaurantId)
            : [...state.favorites, restaurantId]
        }));
      },

      toggleWishlist: (restaurantId) => {
        set((state) => ({
          wishlist: state.wishlist.includes(restaurantId)
            ? state.wishlist.filter(id => id !== restaurantId)
            : [...state.wishlist, restaurantId]
        }));
      },

      isFavorite: (restaurantId) => 
        get().favorites.includes(restaurantId),

      isWishlisted: (restaurantId) =>
        get().wishlist.includes(restaurantId),

      clearFavorites: () => set({ favorites: [] }),
      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: 'restaurant-favorites-storage',
    }
  )
);

export default useFavoritesStore;