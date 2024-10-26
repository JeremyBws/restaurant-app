'use client';
import React, { useRef, useEffect } from 'react';

const FilterButton = ({ active, onClick, children }) => (
  <button 
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-sm font-medium border whitespace-nowrap flex-shrink-0 ${
      active 
        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
        : 'text-gray-600 hover:bg-gray-50 border-gray-200'
    }`}
  >
    {children}
  </button>
);

const FilterBar = ({ activeFilter, onFilterChange }) => {
  const filterContainerRef = useRef(null);

  const filters = [
    { id: 'all', label: 'Tout voir' },
    { id: 'prix1', label: '€' },
    { id: 'prix2', label: '€€' },
    { id: 'prix3', label: '€€€' },
    { id: 'francais', label: 'Français' },
    { id: 'italien', label: 'Italien' },
    { id: 'japonais', label: 'Japonais' },
    { id: 'note', label: 'Meilleure note' },
    { id: 'distance', label: 'Distance' }
  ];

  return (
    <div className="bg-white border-b">
      <div className="p-2">
        <div
          className="flex gap-2 pb-2 md:pb-4 overflow-x-auto"
          ref={filterContainerRef}
        >
          {filters.map(filter => (
            <FilterButton
              key={filter.id}
              active={activeFilter === filter.id}
              onClick={() => onFilterChange(filter.id)}
            >
              {filter.label}
            </FilterButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;