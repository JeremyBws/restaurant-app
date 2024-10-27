'use client';
import { ChevronDown, X } from 'lucide-react';
import React, { useState, useRef, useEffect, useCallback } from 'react';

const FilterBar = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeFilters, setActiveFilters] = useState([]);

  const cuisineOptions = [
    { value: 'Français', label: 'Français' },
    { value: 'Japonais', label: 'Japonais' },
    { value: 'Italien', label: 'Italien' },
    { value: 'Chinois', label: 'Chinois' },
    { value: 'Indien', label: 'Indien' },
    { value: 'Mexicain', label: 'Mexicain' },
    { value: 'Bistrot', label: 'Bistrot' },
    { value: 'Steakhouse', label: 'Steakhouse' },
    { value: 'Provençal', label: 'Provençal' },
    { value: 'Vietnamien', label: 'Vietnamien' },
    { value: 'Cambodgien', label: 'Cambodgien' },
    { value: 'Pâtisserie', label: 'Pâtisserie' }
  ];

  const priceOptions = [
    { value: '€', label: '€ - Économique' },
    { value: '€€', label: '€€ - Modéré' },
    { value: '€€€', label: '€€€ - Élevé' }
  ];

  const sortOptions = [
    { value: 'distance', label: 'Distance' },
    { value: 'rating', label: 'Meilleures notes' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' }
  ];

  const handleMainFilterClick = useCallback((filter) => {
    setActiveFilter(filter);
    onFilterChange('main', filter);
  }, [onFilterChange]);

  const handleFilterChange = useCallback((type, value, label) => {
    setActiveFilters(prev => {
      const updatedFilters = prev.filter(f => f.type !== type);
      if (value !== null) {
        return [...updatedFilters, { type, value, label }];
      }
      return updatedFilters;
    });
    onFilterChange(type, value);
  }, [onFilterChange]);

  return (
    <div className="bg-white border-b shadow-sm">
      {/* Filtres principaux */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
          {['all', 'proche', 'populaire'].map(filter => (
            <button 
              key={filter}
              className={`flex-none px-4 py-2 rounded-full text-sm font-medium transition-all
                ${activeFilter === filter 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => handleMainFilterClick(filter)}
            >
              {filter === 'all' ? 'Tout voir' : filter === 'proche' ? 'À proximité' : 'Populaires'}
            </button>
          ))}
        </div>
      </div>

      {/* Filtres secondaires */}
      <div className="relative">
        <div className="px-4 py-2 border-t flex items-center gap-3 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 min-w-max">
            <FilterDropdown 
              label="Cuisine"
              options={cuisineOptions}
              value={activeFilters.find(f => f.type === 'cuisine')?.value}
              onChange={(value, label) => handleFilterChange('cuisine', value, label)}
            />
            <FilterDropdown 
              label="Prix"
              options={priceOptions}
              value={activeFilters.find(f => f.type === 'price')?.value}
              onChange={(value, label) => handleFilterChange('price', value, label)}
            />
            <FilterDropdown 
              label="Trier par"
              options={sortOptions}
              value={activeFilters.find(f => f.type === 'sort')?.value}
              onChange={(value, label) => handleFilterChange('sort', value, label)}
            />
          </div>
        </div>
      </div>

      {/* Filtres actifs */}
      {activeFilters.length > 0 && (
        <div className="px-4 py-2 border-t flex gap-2 overflow-x-auto scrollbar-hide">
          {activeFilters.map(filter => (
            <button
              key={filter.type}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600 
                rounded-full text-sm font-medium group hover:bg-emerald-100 transition-colors"
              onClick={() => handleFilterChange(filter.type, null)}
            >
              <span>{filter.label}</span>
              <X size={14} className="group-hover:scale-110 transition-transform" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterDropdown = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-all
          ${value 
            ? 'border-emerald-200 bg-emerald-50 text-emerald-600' 
            : 'border-gray-200 hover:bg-gray-50 text-gray-700'}`}
      >
        <span className="text-sm font-medium whitespace-nowrap">{label}</span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div 
          style={{ 
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            maxWidth: '150px',
            zIndex: 9999,
            position: 'fixed',
			      top: dropdownRef.current?.getBoundingClientRect().bottom + 8,
      left: dropdownRef.current?.getBoundingClientRect().left,
          }}
        >
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`w-full text-left px-4 py-2 text-sm transition-colors
                  ${value === option.value 
                    ? 'bg-emerald-50 text-emerald-600 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={() => {
                  onChange(option.value === value ? null : option.value, option.label);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;