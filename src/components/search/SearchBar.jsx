'use client';
import React from 'react';
import { MapPin } from 'lucide-react';

const SearchBar = ({ 
    searchTerm, 
    handleSearch, 
    onLocationRequest, 
    locationStatus 
}) => {
    return (
        <div className="p-4 bg-white border-b">
            <div className="relative flex gap-2">
                <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Rechercher un restaurant, une cuisine..."
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-semibold text-gray-900 placeholder:text-gray-400"
                    />
                </div>
                <button
                    onClick={onLocationRequest}
                    className={`px-4 rounded-lg border flex items-center gap-2 ${
                        locationStatus === 'success' 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                            : 'hover:bg-gray-50'
                    }`}
                >
                    {locationStatus === 'loading' ? (
                        <div className="w-5 h-5 border-2 border-gray-300 border-t-emerald-600 rounded-full animate-spin" />
                    ) : (
                        <MapPin size={20} className={locationStatus === 'success' ? 'text-emerald-600' : 'text-gray-400'} />
                    )}
                    <span className="hidden md:inline">Ma position</span>
                </button>
            </div>
            {locationStatus === 'success' && (
                <div className="mt-2 text-sm text-emerald-600">
                    Position trouvée ! Affichage des restaurants les plus proches.
                </div>
            )}
        </div>
    );
};

export default SearchBar;