import React, { useState } from 'react';
import { Star, MapPin, Clock, Heart, Bookmark } from 'lucide-react';
import Image from 'next/image';
import useFavoritesStore from '@/store/favorites';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
const RestaurantCard = ({ 
  id,
  name, 
  cuisine, 
  address, 
  rating, 
  distance, 
  price, 
  image, 
  openingHours,
}) => {
  const { 
    favorites,
    wishlist,
    toggleFavorite,
    toggleWishlist 
  } = useFavoritesStore();

  const isFavorite = favorites.includes(id);
  const isWishlisted = wishlist.includes(id);
  const [isRatingHovered, setIsRatingHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleFavoriteClick = () => {
    const wasAlreadyFavorite = isFavorite;
    toggleFavorite(id);
    
    if (!wasAlreadyFavorite) {
      toast.success('Ajouté aux favoris', {
        description: name,
        icon: '❤️',
        duration: 2000,
      });
    } else {
      toast.info('Retiré des favoris', {
        description: name,
        icon: '💔',
        duration: 2000,
      });
    }
  };

  const handleWishlistClick = () => {
    const wasAlreadyWishlisted = isWishlisted;
    toggleWishlist(id);
    
    if (!wasAlreadyWishlisted) {
      toast.success('Ajouté à la wishlist', {
        description: name,
        icon: '🎯',
        duration: 2000,
      });
    } else {
      toast.info('Retiré de la wishlist', {
        description: name,
        icon: '🗑️',
        duration: 2000,
      });
    }
  };

  // Fonction pour afficher le prix en symboles €
  const getPriceSymbols = (price) => '€'.repeat(price.length);

  // Fonction pour formater la distance
  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${(distance * 1000).toFixed(0)}m`;
    }
    return `${distance.toFixed(1)}km`;
  };
 const iconVariants = {
    initial: { scale: 1 },
    active: { 
      scale: [1, 1.5, 1],
      transition: { duration: 0.3 }
    }
  };
  return (
    <div className="overflow-hidden group hover:shadow-lg transition-all duration-300 bg-white rounded-lg">
      {/* Image container avec overlay et boutons */}
      <div className="relative h-48">
        <div className="relative w-full h-full">
          {isLoading && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse" />
          )}
          
          <Image
            src={imageError ? '/images/restaurant-placeholder.jpg' : (image || '/images/restaurant-placeholder.jpg')}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-300 group-hover:scale-105 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onError={() => {
              setImageError(true);
              setIsLoading(false);
            }}
            onLoad={() => {
              setIsLoading(false);
            }}
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
     {/* Actions container (favoris et wishlist) */}
    <div className="absolute bottom-4 right-4 flex gap-2">
      {/* Bouton Favoris */}
      <motion.button
        onClick={handleFavoriteClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`p-2 rounded-full transition-colors duration-300
          ${isFavorite 
            ? 'bg-red-500 text-white' 
            : 'bg-white/90 hover:bg-white text-gray-600 hover:text-red-500'}`}
      >
        <motion.div
          animate={isFavorite ? "active" : "initial"}
          variants={iconVariants}
        >
          <Heart 
            className={`w-5 h-5 transition-colors duration-300 ${
              isFavorite ? 'fill-current' : 'fill-transparent'
            }`}
          />
        </motion.div>
      </motion.button>

      {/* Bouton Wishlist */}
      <motion.button
        onClick={handleWishlistClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`p-2 rounded-full transition-colors duration-300
          ${isWishlisted 
            ? 'bg-amber-500 text-white' 
            : 'bg-white/90 hover:bg-white text-gray-600 hover:text-amber-500'}`}
      >
        <motion.div
          animate={isWishlisted ? "active" : "initial"}
          variants={iconVariants}
        >
          <Bookmark 
            className={`w-5 h-5 transition-colors duration-300 ${
              isWishlisted ? 'fill-current' : 'fill-transparent'
            }`}
          />
        </motion.div>
      </motion.button>
    </div>

      </div>

      {/* Contenu */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
            {name}
          </h3>
          <span className="text-amber-600 font-medium">
            {getPriceSymbols(price)}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-3">{cuisine}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4 min-w-4" />
            <span className="truncate">{address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4 min-w-4" />
            <span>{openingHours || "11:30 - 22:30"}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {formatDistance(distance)}
          </span>
          <button className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transform hover:scale-105 transition-all duration-300 text-sm font-medium hover:shadow-md active:scale-95">
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;