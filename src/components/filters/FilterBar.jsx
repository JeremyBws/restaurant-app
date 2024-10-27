
  import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import useFiltersStore from '@/store/filters';

const FilterBar = ({ onFiltersChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  const { activeFilters, setFilter, resetFilters } = useFiltersStore();

  const filters = {
    main: [
      { id: 'all', label: 'Tous' },
      { id: 'proche', label: 'À proximité' },
      { id: 'populaire', label: 'Les plus populaires' }
    ],
    cuisine: [
      { id: 'Français', label: 'Français' },
    { id: 'Japonais', label: 'Japonais' },
    { id: 'Italien', label: 'Italien' },
    { id: 'Chinois', label: 'Chinois' },
    { id: 'Indien', label: 'Indien' },
    { id: 'Mexicain', label: 'Mexicain' },
    { id: 'Bistrot', label: 'Bistrot' },
    { id: 'Steakhouse', label: 'Steakhouse' },
    { id: 'Provençal', label: 'Provençal' },
    { id: 'Vietnamien', label: 'Vietnamien' },
    { id: 'Cambodgien', label: 'Cambodgien' },
    { id: 'Pâtisserie', label: 'Pâtisserie' }
    ],
    price: [
      { id: '€', label: 'Économique' },
      { id: '€€', label: 'Modéré' },
      { id: '€€€', label: 'Haut de gamme' }
    ]
  };

  // Compte le nombre de filtres actifs (excluant 'all' du main)
  const activeFiltersCount = Object.values(activeFilters)
    .filter(value => value && value !== 'all').length;

  const handleFilterClick = (type, value) => {
    setFilter(type, value);
    onFiltersChange?.(type, value);
  };

  const handleResetFilters = () => {
    resetFilters();
    onFiltersChange?.('reset', null);
  };

  // Reste du JSX identique, mais en utilisant handleFilterClick et handleResetFilters
  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Filtres principaux toujours visibles */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex gap-2">
          {filters.main.map(filter => (
            <button
              key={filter.id}
              onClick={() => handleFilterClick('main', filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${activeFilters.main === filter.id 
                  ? 'bg-amber-600 text-white transform scale-105 shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Badge pour le nombre de filtres actifs */}
          {activeFiltersCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-sm font-medium hover:bg-amber-100 transition-colors"
            >
              {activeFiltersCount} filtre{activeFiltersCount > 1 ? 's' : ''} actif{activeFiltersCount > 1 ? 's' : ''}
              <X size={14} className="ml-1" />
            </button>
          )}

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
              ${showFilters ? 'bg-amber-50 text-amber-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <SlidersHorizontal size={20} />
            <span className="text-sm font-medium">Filtres</span>
            <ChevronDown
              size={16}
              className={`transform transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Filtres supplémentaires */}
      {showFilters && (
        <div className="p-4 space-y-6">
          {/* Cuisine */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Cuisine</h3>
            <div className="flex flex-wrap gap-2">
              {filters.cuisine.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => handleFilterClick('cuisine', filter.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300
                    ${activeFilters.cuisine === filter.id
                      ? 'bg-amber-600 text-white transform scale-105 shadow-md border-transparent'
                      : 'border border-gray-200 text-gray-600 hover:border-amber-600 hover:text-amber-600'}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Prix */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Prix</h3>
            <div className="flex gap-2">
              {filters.price.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => handleFilterClick('price', filter.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300
                    ${activeFilters.price === filter.id
                      ? 'bg-amber-600 text-white transform scale-105 shadow-md border-transparent'
                      : 'border border-gray-200 text-gray-600 hover:border-amber-600 hover:text-amber-600'}`}
                >
                  {filter.id} · {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;