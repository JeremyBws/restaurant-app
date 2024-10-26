'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(new Set());
  const { user } = useAuth();

  // Charger les favoris au démarrage
  useEffect(() => {
    if (user) {
      const storedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (storedFavorites) {
        setFavorites(new Set(JSON.parse(storedFavorites)));
      }
    } else {
      setFavorites(new Set());
    }
  }, [user]);

  const toggleFavorite = (restaurantId) => {
    if (!user) {
      // Si pas connecté, demander la connexion
      // Vous devrez implémenter openAuthModal ici
      return false;
    }

    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(restaurantId)) {
        next.delete(restaurantId);
      } else {
        next.add(restaurantId);
      }

      // Sauvegarder dans le localStorage
      localStorage.setItem(
        `favorites_${user.id}`,
        JSON.stringify([...next])
      );

      return next;
    });
    return true;
  };

  const isFavorite = (restaurantId) => {
    return favorites.has(restaurantId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};