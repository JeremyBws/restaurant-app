'use client';
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import MapComponent from '@/components/map';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import FilterBar from '@/components/filters/FilterBar';
import { restaurantsData } from '@/data/restaurants';

export default function Home() {
  const [showMap, setShowMap] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurantsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationStatus, setLocationStatus] = useState('idle');
  const [userLocation, setUserLocation] = useState(null);

  // Gestion des filtres
  const handleFilters = (type, value) => {
    console.log('Filter/Sort:', type, value);
    let results = [...restaurantsData];

    // Appliquer la recherche si elle existe
    if (searchTerm) {
      results = results.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Appliquer les filtres selon le type
    switch(type) {
      case 'cuisine':
        if (value) {
          results = results.filter(r => r.cuisine === value);
        }
        break;
      
      case 'price':
        if (value) {
          results = results.filter(r => r.price === value);
        }
        break;

      case 'sort':
        switch (value) {
          case 'distance':
            results.sort((a, b) => a.distance - b.distance);
            break;
          case 'rating':
            results.sort((a, b) => b.rating - a.rating);
            break;
          case 'price-asc':
            results.sort((a, b) => a.price.length - b.price.length);
            break;
          case 'price-desc':
            results.sort((a, b) => b.price.length - a.price.length);
            break;
        }
        break;

      case 'main':
        switch (value) {
          case 'proche':
            results.sort((a, b) => a.distance - b.distance);
            break;
          case 'populaire':
            results.sort((a, b) => b.rating - a.rating);
            break;
          // 'all' ne nécessite pas de traitement
        }
        break;
    }

    setFilteredRestaurants(results);
  };

  // Gestion de la recherche
  const handleSearch = (value) => {
    setSearchTerm(value);
    handleFilters('search', value); // Réutiliser la logique de filtrage
  };

  return (
    <div className="flex-1">
      {/* Barre de recherche */}
      <div className="p-4 bg-white border-b">
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Rechercher un restaurant, une cuisine..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-base font-medium"
          />
        </div>
      </div>

      {/* Barre de filtres */}
      <FilterBar onFilterChange={handleFilters} />

      {/* Toggle Vue Liste/Carte */}
      <div className="bg-white border-b px-4 py-2 flex justify-between items-center sticky top-[60px] z-40">
        <div className="text-sm text-gray-600">
          {filteredRestaurants.length} restaurants trouvés
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowMap(false)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${!showMap ? 'bg-emerald-100 text-emerald-600' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            Liste
          </button>
          <button 
            onClick={() => setShowMap(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${showMap ? 'bg-emerald-100 text-emerald-600' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            Carte
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="flex-1">
        {showMap ? (
          <div className="h-[calc(100vh-180px)]">
            <MapComponent 
              restaurants={filteredRestaurants}
              userLocation={userLocation}
            />
          </div>
        ) : (
          <div className="max-w-xl mx-auto p-4 space-y-4 pb-20">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  {...restaurant}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Aucun restaurant ne correspond à vos critères
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}