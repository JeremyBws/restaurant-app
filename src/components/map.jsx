'use client';
import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Star, Users } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const libraries = ['places'];

function MapComponent({ restaurants, userLocation }) {
  const [selectedRestaurant, setSelectedRestaurant] = React.useState(null);
  
  const defaultCenter = {
    lat: 48.8566,
    lng: 2.3522
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBIv9zZ-ZAh-Pz6pVuGPYTyBb0vbsBYoQ4',
    libraries: libraries
  });

  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userLocation ? {
        lat: userLocation.latitude,
        lng: userLocation.longitude
      } : defaultCenter}
      zoom={14}
      options={{
        styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }],
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      {userLocation && (
        <Marker
          position={{
            lat: userLocation.latitude,
            lng: userLocation.longitude
          }}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#059669",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          }}
        />
      )}

      {restaurants.map(restaurant => (
        <Marker
          key={restaurant.id}
          position={{
            lat: restaurant.lat,
            lng: restaurant.lng
          }}
          onClick={() => setSelectedRestaurant(restaurant)}
        />
      ))}

      {selectedRestaurant && (
        <InfoWindow
          position={{
            lat: selectedRestaurant.lat,
            lng: selectedRestaurant.lng
          }}
          onCloseClick={() => setSelectedRestaurant(null)}
        >
          <div className="p-2 max-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center bg-white px-2 py-1 rounded">
                <Star className="text-yellow-500 w-4 h-4" fill="#eab308" />
                <span className="ml-1 font-semibold text-gray-800">
                  {selectedRestaurant.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-sm text-gray-600">{selectedRestaurant.price}</span>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-1">
              {selectedRestaurant.name}
            </h3>
            
            <p className="text-sm text-gray-600 mb-2">
              {selectedRestaurant.address}
            </p>
            
            <div className="flex items-center text-sm text-emerald-600 mb-3">
              <Users className="w-4 h-4 mr-1" />
              <span>{selectedRestaurant.openSpots} places disponibles</span>
            </div>

            <button 
              className="w-full py-2 bg-emerald-600 text-white rounded text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              Réserver
            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default MapComponent;