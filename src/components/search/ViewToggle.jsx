'use client';
import React from 'react';

const ViewToggle = ({ showMap, setShowMap, restaurantCount }) => {
  return (
    <div className="bg-white border-b px-4 py-2 flex justify-between items-center">
      <div className="text-sm text-gray-600">{restaurantCount} restaurants trouvés</div>
      <div className="flex gap-2">
        <button 
          onClick={() => setShowMap(false)}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            !showMap ? 'bg-emerald-100 text-emerald-600' : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          Liste
        </button>
        <button 
          onClick={() => setShowMap(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            showMap ? 'bg-emerald-100 text-emerald-600' : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          Carte
        </button>
      </div>
    </div>
  );
};

export default ViewToggle;