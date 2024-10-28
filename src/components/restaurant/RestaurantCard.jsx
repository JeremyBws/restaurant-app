'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Heart, Bookmark } from 'lucide-react';
import useFavoritesStore from '@/store/favorites';
import { toast } from 'sonner';

const RatingBadge = ({ rating }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="absolute top-4 right-4 z-10"
    >
      <motion.div
        initial={false}
        animate={{
          scale: isHovered ? 1.1 : 1,
          backgroundColor: isHovered ? '#F59E0B' : '#FFFFFF'
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg transition-all duration-300"
      >
        <motion.div
          animate={{ rotate: isHovered ? [0, -15, 15, 0] : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Star 
            className={`w-4 h-4 transition-all duration-300 ${
              isHovered 
                ? 'text-white fill-white' 
                : 'text-amber-400 fill-amber-400'
            }`}
          />
        </motion.div>
        <span className={`text-sm font-medium transition-colors duration-300 ${
          isHovered ? 'text-white' : 'text-gray-700'
        }`}>
          {rating.toFixed(1)}
        </span>
      </motion.div>
    </motion.div>
  );
};

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
  // États
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Store des favoris
  const { favorites, wishlist, toggleFavorite, toggleWishlist } = useFavoritesStore();
  const isFavorite = favorites.includes(id);
  const isWishlisted = wishlist.includes(id);

  // Gestionnaires d'événements
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

  return (
    <div className="overflow-hidden group hover:shadow-lg transition-all duration-300 bg-white rounded-lg">
      {/* Image container avec overlay et boutons */}
      <div className="relative h-48">
        {/* Background image avec gestion du chargement et des erreurs */}
        <div className="relative w-full h-full bg-gray-100">
          {isLoading && (
            <div className="absolute inset-0 animate-pulse bg-gray-200" />
          )}
          
          <Image
            src={imageError ? '/images/restaurant-placeholder.jpg' : (image || '/images/restaurant-placeholder.jpg')}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-300 
              ${isLoading ? 'opacity-0' : 'opacity-100'}
              ${!isLoading && 'group-hover:scale-105'}`}
            onError={() => {
              setImageError(true);
              setIsLoading(false);
            }}
            onLoad={() => {
              setIsLoading(false);
            }}
            priority={false}
          />

          {/* Overlay sombre au hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Rating badge avec animations */}
        <RatingBadge rating={rating} />

        {/* Actions container (favoris et wishlist) */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <motion.button
            onClick={handleFavoriteClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-full transition-colors duration-300
              ${isFavorite 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-white/90 hover:bg-white text-gray-600 hover:text-red-500'}`}
          >
            <Heart 
              className={`w-5 h-5 transition-all duration-300 ${
                isFavorite ? 'fill-current' : 'fill-transparent'
              }`}
            />
          </motion.button>

          <motion.button
            onClick={handleWishlistClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-full transition-colors duration-300
              ${isWishlisted 
                ? 'bg-amber-500 text-white shadow-lg' 
                : 'bg-white/90 hover:bg-white text-gray-600 hover:text-amber-500'}`}
          >
            <Bookmark 
              className={`w-5 h-5 transition-all duration-300 ${
                isWishlisted ? 'fill-current' : 'fill-transparent'
              }`}
            />
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
            {'€'.repeat(price.length)}
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
            {distance < 1 
              ? `${(distance * 1000).toFixed(0)}m` 
              : `${distance.toFixed(1)}km`}
          </span>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 
              transition-colors duration-300 text-sm font-medium hover:shadow-md"
          >
            Réserver
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;