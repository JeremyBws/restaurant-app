'use client';
import React, { useState, useEffect } from 'react';
import MapComponent from '@/components/map';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import SearchBar from '@/components/search/SearchBar';
import ViewToggle from '@/components/search/ViewToggle';
import Filters from '@/components/search/Filters';
import { useRestaurants } from '@/hooks/useRestaurants';

export default function Home() {
  const [showMap, setShowMap] = useState(false);
  const { 
    restaurants,
    searchTerm,
    locationStatus,
    filters,
    sortBy,
    stats,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    getLocation,
    userLocation
  } = useRestaurants();

  // Gestion du scroll map/liste
  useEffect(() => {
    if (showMap) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMap]);

  return (
    <div className="flex-1 flex flex-col">
      <SearchBar 
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        onLocationRequest={getLocation}
        locationStatus={locationStatus}
      />

<Filters
  filters={filters}
  sortBy={sortBy}
  onFilterChange={handleFilterChange}
  onSortChange={handleSortChange}
/>

      <ViewToggle 
        showMap={showMap}
        setShowMap={setShowMap}
        restaurantCount={restaurants.length}
      />

      <main className="flex-1 relative">
        {showMap ? (
          <div className="h-[calc(100vh-180px)] sticky top-[120px]">
            <MapComponent 
              restaurants={restaurants}
              userLocation={userLocation}
            />
          </div>
        ) : (
          <div className="max-w-xl mx-auto p-4 space-y-4 pb-20">
            {restaurants.length > 0 ? (
              restaurants.map(restaurant => (
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