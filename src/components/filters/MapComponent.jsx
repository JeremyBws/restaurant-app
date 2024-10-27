import React from 'react';
import { MapPin } from 'lucide-react';

const MapComponent = ({ restaurants, userLocation }) => {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      {/* Carte */}
      <div className="absolute inset-0">
        {/* Votre composant de carte existant */}
      </div>

      {/* Panel d'informations */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          {restaurants.length} restaurants à proximité
        </h3>
        <p className="text-sm text-gray-600">
          Distance moyenne : {(restaurants.reduce((acc, r) => acc + r.distance, 0) / restaurants.length).toFixed(1)} km
        </p>
      </div>

      {/* Légende */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full bg-amber-600" />
          <span>Restaurant</span>
        </div>
        {userLocation && (
          <div className="flex items-center gap-2 text-sm mt-2">
            <div className="w-3 h-3 rounded-full bg-blue-600" />
            <span>Votre position</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapComponent;