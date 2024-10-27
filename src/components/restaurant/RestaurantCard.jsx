'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Users, Heart } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image'; 

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
    <Card className="overflow-hidden relative">
      <div className="relative h-48">
   		<Image src={image} alt={name} width={400} height={250} layout="responsive" className="w-full h-full object-cover" />
        {/* Agrandir la zone de clic du bouton favori */}
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-4 bg-white rounded-full shadow-lg transform transition-transform active:scale-95 touch-manipulation"
          style={{ touchAction: 'manipulation' }}
        >
          <Heart 
            size={24} // Augmenté de 20 à 24
            className={`${
              isFavorite(id) 
                ? 'text-red-500 fill-red-500' 
                : 'text-gray-600'
            }`} 
          />
        </button>
        {/* Note plus grande et plus visible */}
        <div className="absolute top-3 left-3 bg-white px-4 py-2 rounded-lg flex items-center shadow-lg hover:scale-105 transition-transform">
          <Star className="text-yellow-500 w-6 h-6" fill="#eab308" />
          <span className="ml-2 font-semibold text-gray-500 text-base">{rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Contenu avec de plus grandes zones tactiles */}
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg text-gray-900 leading-tight">{name}</h3>
          <span className="text-base text-gray-600 ml-2">{distance < 1 ? `${(distance * 1000).toFixed(0)}m` : `${distance.toFixed(1)}km`}</span>
        </div>
        
        <p className="text-gray-600 text-base mt-2">{address}</p>
        
        <div className="mt-3 flex items-center gap-3 text-base text-gray-700">
          <span>{cuisine}</span>
          <span>•</span>
          <span>{price}</span>
        </div>
        
        <div className="mt-3 flex items-center text-base font-medium text-emerald-600">
          <Users className="w-5 h-5 mr-2" />
          <span>{openSpots} places disponibles</span>
        </div>

        {/* Bouton de réservation plus grand sur mobile */}
        <button className="mt-4 w-full py-4 bg-emerald-600 text-white rounded-lg text-base font-medium hover:bg-emerald-700 transition-colors active:bg-emerald-800 touch-manipulation">
          Réserver
        </button>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
