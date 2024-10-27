'use client';
import React from 'react';
import { BookmarkPlus, Trash2 } from 'lucide-react';
import useFavoritesStore from '@/store/favorites';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import { restaurantsData } from '@/data/restaurants';
import { toast } from 'sonner';

export default function WishlistPage() {
  const { wishlist, clearWishlist } = useFavoritesStore();

  // Filtrer les restaurants de la wishlist
  const wishlistRestaurants = restaurantsData.filter(restaurant => 
    wishlist.includes(restaurant.id)
  );

  const handleClearWishlist = () => {
    if (wishlist.length === 0) return;
    
    clearWishlist();
    toast.info('Wishlist vidée', {
      icon: '🗑️',
      duration: 2000,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <BookmarkPlus className="w-8 h-8 text-amber-500" />
          <h1 className="text-2xl font-bold text-gray-900">
            Ma Wishlist
          </h1>
          <span className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
            {wishlist.length}
          </span>
        </div>

        <button
          onClick={handleClearWishlist}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 
            hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 size={16} />
          Vider la liste
        </button>
      </div>

      {/* Liste des restaurants */}
      {wishlistRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistRestaurants.map(restaurant => (
            <RestaurantCard
              key={restaurant.id}
              {...restaurant}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <BookmarkPlus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Votre wishlist est vide
          </h2>
          <p className="text-gray-500 max-w-sm mx-auto">
            Ajoutez des restaurants à votre wishlist en cliquant sur le marque-page sur leur fiche
          </p>
        </div>
      )}
    </div>
  );
}