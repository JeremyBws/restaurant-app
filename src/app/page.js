'use client';
import React, { useEffect } from 'react';
import { MapPin } from 'lucide-react';
import MapComponent from '@/components/map';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import FilterBar from '@/components/filters/FilterBar';
import { restaurantsData } from '@/data/restaurants';
import HeroSection from '@/components/HeroSection';
import useFiltersStore from '@/store/filters';

export default function Home() {
  const [showMap, setShowMap] = React.useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = React.useState(restaurantsData);
  const [locationStatus, setLocationStatus] = React.useState('idle');
  const [userLocation, setUserLocation] = React.useState(null);

  const { activeFilters, searchTerm } = useFiltersStore();

  // Fonction pour appliquer les filtres
  const applyFilters = React.useCallback(() => {
    let results = [...restaurantsData];

    // Appliquer la recherche si elle existe
    if (searchTerm) {
      results = results.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Appliquer les filtres par catégorie
    if (activeFilters.cuisine) {
      results = results.filter(r => r.cuisine.toLowerCase() === activeFilters.cuisine.toLowerCase());
    }

    if (activeFilters.price) {
      results = results.filter(r => r.price === activeFilters.price);
    }

    // Appliquer le tri principal
    if (activeFilters.main) {
      switch (activeFilters.main) {
        case 'proche':
          results.sort((a, b) => a.distance - b.distance);
          break;
        case 'populaire':
          results.sort((a, b) => b.rating - a.rating);
          break;
      }
    }

    setFilteredRestaurants(results);
  }, [activeFilters, searchTerm]);

  // Mettre à jour les résultats quand les filtres changent
  useEffect(() => {
    applyFilters();
  }, [applyFilters, activeFilters, searchTerm]);

  return (
    <main className="min-h-screen">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <FilterBar onFiltersChange={applyFilters} />
        </div>

        {/* Toggle Vue Liste/Carte */}
        <div className="bg-white rounded-lg shadow-sm mb-6 px-4 py-3 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {filteredRestaurants.length} restaurant{filteredRestaurants.length > 1 ? 's' : ''} trouvé{filteredRestaurants.length > 1 ? 's' : ''}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowMap(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${!showMap ? 'bg-amber-100 text-amber-600' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              Liste
            </button>
            <button 
              onClick={() => setShowMap(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${showMap ? 'bg-amber-100 text-amber-600' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              Carte
            </button>
          </div>
        </div>

        {/* Contenu principal */}
        {showMap ? (
          <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
            <MapComponent 
              restaurants={filteredRestaurants}
              userLocation={userLocation}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  {...restaurant}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">Aucun restaurant ne correspond à vos critères</p>
                <button
                  onClick={() => useFiltersStore.getState().resetFilters()}
                  className="mt-4 text-amber-600 hover:text-amber-700 font-medium"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}