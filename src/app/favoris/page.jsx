'use client';

import React from 'react';
import { Heart, Trash2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useFavoritesStore from '@/store/favorites';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import { restaurantsData } from '@/data/restaurants';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function FavoritesPage() {
  const router = useRouter();
  const { favorites, clearFavorites } = useFavoritesStore();
  
  const favoriteRestaurants = restaurantsData.filter(restaurant => 
    favorites.includes(restaurant.id)
  );

  const handleClearFavorites = () => {
    if (favorites.length === 0) return;
    
    clearFavorites();
    toast.info('Liste des favoris vidée', {
      icon: '🗑️',
      duration: 2000,
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header avec background décoratif */}
      <div className="relative bg-red-600 h-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Carte principale */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          {/* Navigation et titre */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-6">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-full">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Mes Restaurants Favoris
                  </h1>
                  <p className="text-gray-500">
                    {favorites.length} restaurant{favorites.length > 1 ? 's' : ''} sauvegardé{favorites.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>

            {favorites.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearFavorites}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 
                  rounded-lg transition-colors"
              >
                <Trash2 size={16} />
                Vider la liste
              </motion.button>
            )}
          </div>

          {/* Liste des favoris */}
          {favoriteRestaurants.length > 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {favoriteRestaurants.map(restaurant => (
                <motion.div key={restaurant.id} variants={item}>
                  <RestaurantCard {...restaurant} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
                <Heart className="w-8 h-8 text-red-200" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun restaurant favori
              </h2>
              <p className="text-gray-500 max-w-sm mx-auto mb-8">
                Ajoutez des restaurants à vos favoris en cliquant sur le cœur sur leur fiche
              </p>
              <button
                onClick={() => router.push('/')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white 
                  rounded-lg hover:bg-red-700 transition-colors"
              >
                Explorer les restaurants
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}