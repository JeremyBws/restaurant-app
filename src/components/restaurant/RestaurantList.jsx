 'use client';
import React from 'react';
import RestaurantCard from './RestaurantCard';

const RestaurantList = ({ 
  restaurants, 
  onFavoriteToggle,
  onReserveClick,
  favorites = new Set()
}) => {
  return (
    <div className="max-w-xl mx-auto p-4 space-y-4 pb-20">
      {restaurants.map(restaurant => (
        <RestaurantCard
          key={restaurant.id}
          {...restaurant}
          isFavorite={favorites.has(restaurant.id)}
          onFavoriteClick={() => onFavoriteToggle?.(restaurant.id)}
          onReserveClick={() => onReserveClick?.(restaurant.id)}
        />
      ))}
      {restaurants.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Aucun restaurant ne correspond à vos critères
        </div>
      )}
    </div>
  );
};

export default RestaurantList;