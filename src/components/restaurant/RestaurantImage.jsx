import React, { useState } from 'react';
import Image from 'next/image';

const RestaurantImage = ({ 
  src, 
  alt,
  className = "w-full h-full object-cover"
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div className={`relative bg-gray-50 ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}

      <Image
        src={imageError ? '/images/restaurant-placeholder.jpg' : (src || '/images/restaurant-placeholder.jpg')}
        alt={alt || "Restaurant"}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-cover transition-opacity duration-300 ${
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
  );
};

export default RestaurantImage;