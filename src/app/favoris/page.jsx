'use client';
import React from 'react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAuth } from '@/contexts/AuthContext';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import { Heart } from 'lucide-react';
import { restaurantsData } from '@/data/restaurants';
export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const { user, openAuthModal } = useAuth();

  // Filtrer les restaurants favoris
 const favoriteRestaurants = restaurantsData.filter(    restaurant => favorites.has(restaurant.id)  );

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="bg-gray-50 p-8 rounded-lg text-center max-w-md w-full">
          <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Connectez-vous pour voir vos favoris
          </h2>
          <p className="text-gray-600 mb-4">
            Gardez une trace de vos restaurants préférés
          </p>
          <button
            onClick={() => openAuthModal('login')}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mes restaurants favoris</h1>
        <p className="text-gray-600">
          {favoriteRestaurants.length} restaurant{favoriteRestaurants.length !== 1 ? 's' : ''} sauvegardé{favoriteRestaurants.length !== 1 ? 's' : ''}
        </p>
      </div>

      {favoriteRestaurants.length > 0 ? (
        <div className="space-y-4">
          {favoriteRestaurants.map(restaurant => (
            <RestaurantCard
              key={restaurant.id}
              {...restaurant}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Aucun favori pour le moment
          </h3>
          <p className="text-gray-600 mb-4">
            Explorez les restaurants et ajoutez-les à vos favoris
          </p>
          <button
            href="/"
            className="inline-block px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Découvrir des restaurants
          </button>
        </div>
      )}
    </div>
  );
}