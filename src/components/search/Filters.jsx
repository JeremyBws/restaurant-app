'use client';
import React from 'react';
import { CUISINES, PRICE_RANGES } from '@/data/restaurants';

const FilterButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-sm font-medium border whitespace-nowrap transition-colors
      ${active 
        ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' 
        : 'text-gray-600 hover:bg-gray-50 border-gray-200'
      }`}
  >
    {label}
  </button>
);

const FilterSection = ({ title, items, activeValue, onSelect, type }) => (
  <div className="space-y-2">
    <div className="text-sm text-gray-500 px-2 flex justify-between items-center">
      <span>{title}</span>
      {activeValue && (
        <span className="text-emerald-600 text-xs">
          {type === 'sort' ? 'Tri actif' : 'Filtre actif'}
        </span>
      )}
    </div>
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {items.map(item => (
        <FilterButton
          key={item.value}
          label={item.label}
          active={activeValue === item.value}
          onClick={() => onSelect(type, item.value)}
        />
      ))}
    </div>
  </div>
);

const Filters = ({ filters, sortBy, onFilterChange, onSortChange }) => {
  const cuisineFilters = CUISINES.map(cuisine => ({
    label: cuisine,
    value: cuisine
  }));

  const priceFilters = PRICE_RANGES.map(price => ({
    label: price,
    value: price
  }));

  const sortFilters = [
    { label: 'Distance', value: 'distance' },
    { label: 'Notes', value: 'rating' },
    { label: 'Prix croissant', value: 'price-asc' },
    { label: 'Prix décroissant', value: 'price-desc' }
  ];

  return (
    <div className="bg-white border-b">
      <div className="p-2 space-y-4">
        <FilterSection
          title="Cuisine"
          items={cuisineFilters}
          activeValue={filters.cuisine}
          onSelect={onFilterChange}
          type="cuisine"
        />

        <FilterSection
          title="Prix"
          items={priceFilters}
          activeValue={filters.price}
          onSelect={onFilterChange}
          type="price"
        />

        <FilterSection
          title="Trier par"
          items={sortFilters}
          activeValue={sortBy}
          onSelect={onSortChange}
          type="sort"
        />
      </div>

      {/* Barre des filtres actifs */}
      {(filters.cuisine || filters.price || sortBy) && (
        <div className="px-4 py-2 bg-emerald-50 flex gap-2 flex-wrap">
          {filters.cuisine && (
            <span className="text-sm text-emerald-600 bg-white px-2 py-1 rounded-full">
              {filters.cuisine}
            </span>
          )}
          {filters.price && (
            <span className="text-sm text-emerald-600 bg-white px-2 py-1 rounded-full">
              {filters.price}
            </span>
          )}
          {sortBy && (
            <span className="text-sm text-emerald-600 bg-white px-2 py-1 rounded-full">
              {sortFilters.find(s => s.value === sortBy)?.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Filters;