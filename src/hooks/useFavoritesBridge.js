import { useContext, useEffect } from 'react';
import { FavoritesContext } from '@/contexts/FavoritesContext';
import useFavoritesStore from '@/store/favorites';

export const useFavoritesBridge = () => {
  const contextFavorites = useContext(FavoritesContext);
  const zustandFavorites = useFavoritesStore();

  // Synchronise le Context avec Zustand
  useEffect(() => {
    // Si nous avons des favoris dans le context, les migrer vers Zustand
    if (contextFavorites.favorites.size > 0 && zustandFavorites.favorites.size === 0) {
      contextFavorites.favorites.forEach(id => {
        zustandFavorites.toggleFavorite(id);
      });
    }
  }, [contextFavorites.favorites, zustandFavorites.favorites.size]);

  // Retourne une interface unifiée
  return {
    favorites: zustandFavorites.favorites,
    wishlist: zustandFavorites.wishlist,
    toggleFavorite: (id) => {
      zustandFavorites.toggleFavorite(id);
      contextFavorites.toggleFavorite?.(id); // Garde la compatibilité avec l'ancien système
    },
    toggleWishlist: zustandFavorites.toggleWishlist,
    isFavorite: (id) => zustandFavorites.favorites.has(id),
    isWishlisted: (id) => zustandFavorites.wishlist.has(id),
  };
};