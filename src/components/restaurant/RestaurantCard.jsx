'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Users, Heart } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAuth } from '@/contexts/AuthContext';

const RestaurantCard = ({ id, name, image, address, rating, cuisine, price, openSpots, distance }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user, openAuthModal } = useAuth();

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (!user) {
      openAuthModal('login');
      return;
    }
    toggleFavorite(id);
  };

  return (
    <Card className="overflow-hidden relative group">
      <div className="relative h-48">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg transform transition-transform hover:scale-110 active:scale-95"
        >
          <Heart 
            size={20} 
            className={`${
              isFavorite(id) 
                ? 'text-red-500 fill-red-500' 
                : 'text-gray-600'
            } transition-colors`} 
          />
        </button>
<div className="absolute top-3 left-3 bg-white px-3 py-2 rounded-lg flex items-center shadow-md hover:scale-105 transition-transform">
  <Star className="text-yellow-500 w-5 h-5" fill="#eab308" />
  <span className="ml-1.5 font-semibold text-gray-400">{rating.toFixed(1)}</span>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
          <span className="text-sm text-gray-600">
            {distance < 1 ? `${(distance * 1000).toFixed(0)}m` : `${distance.toFixed(1)}km`}
          </span>
        </div>
        <p className="text-gray-600 text-sm mt-1">{address}</p>
        <div className="mt-2 flex items-center gap-3 text-sm text-gray-700">
          <span>{cuisine}</span>
          <span>•</span>
          <span>{price}</span>
        </div>
        <div className="mt-2 flex items-center text-sm font-medium text-emerald-600">
          <Users className="w-4 h-4 mr-1" />
          <span>{openSpots} places disponibles</span>
        </div>
        <button className="mt-3 w-full py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors active:transform active:scale-[0.98]">
          Réserver
        </button>
      </CardContent>

      {/* Overlay mobile pour rendre toute la carte cliquable */}
      <div className="absolute inset-0 md:hidden" onClick={() => {/* Navigation vers la page du restaurant */}} />
    </Card>
  );
};

export default RestaurantCard;