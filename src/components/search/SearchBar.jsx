import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Search, MapPin, Clock, Star, X, Loader2 } from 'lucide-react';
import useSearchStore from '@/store/search';
import useFiltersStore from '@/store/filters';
import { useClickAway } from '@/hooks/useClickAway';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  
  const {
    searchTerm,
    suggestions,
    isLoading,
    recentSearches,
    setSearchTerm,
    addRecentSearch,
    clearRecentSearches,
    fetchSuggestions
  } = useSearchStore();

  const setFilter = useFiltersStore(state => state.setFilter);

  // Ferme les suggestions quand on clique en dehors
  useClickAway(searchRef, () => {
    setIsFocused(false);
  });

  // Debounce la recherche
  const debouncedSearch = useCallback(
    debounce((term) => {
      fetchSuggestions(term);
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleSuggestionClick = (suggestion) => {
    switch (suggestion.type) {
      case 'cuisine':
        setFilter('cuisine', suggestion.text.toLowerCase());
        break;
      case 'location':
        // Gérer le filtre par localisation
        break;
      default:
        setSearchTerm(suggestion.text);
        addRecentSearch(suggestion.text);
    }
    setIsFocused(false);
  };

  const handleRecentSearchClick = (term) => {
    setSearchTerm(term);
    fetchSuggestions(term);
    addRecentSearch(term);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      {/* Barre de recherche */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          placeholder="Rechercher un restaurant, une cuisine..."
          className="w-full px-12 py-4 bg-white rounded-lg shadow-lg text-gray-900 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 
              hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Panel de suggestions */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl overflow-hidden z-50"
          >
            {/* Loader */}
            {isLoading && (
              <div className="p-4 text-center text-gray-500">
                <Loader2 className="animate-spin inline-block mr-2" size={16} />
                Recherche en cours...
              </div>
            )}

            {/* Pas de résultats */}
            {!isLoading && searchTerm && suggestions.every(group => group.items.length === 0) && (
              <div className="p-4 text-center text-gray-500">
                Aucun résultat pour &quot;{searchTerm}&quot;
              </div>
            )}

            {/* Recherches récentes */}
            {!searchTerm && recentSearches.length > 0 && (
              <div className="p-2">
                <div className="flex items-center justify-between px-2 py-1">
                  <span className="text-xs font-medium text-gray-500">Recherches récentes</span>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-amber-600 hover:text-amber-700"
                  >
                    Effacer
                  </button>
                </div>
                {recentSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(term)}
                    className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50"
                  >
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-gray-700">{term}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Suggestions groupées */}
            {!isLoading && searchTerm && suggestions.map((group, groupIndex) => {
              if (group.items.length === 0) return null;

              return (
                <div key={group.type} className="p-2">
                  <div className="px-2 py-1">
                    <span className="text-xs font-medium text-gray-500">
                      {group.type === 'cuisine' && 'Cuisines'}
                      {group.type === 'restaurant' && 'Restaurants'}
                      {group.type === 'location' && 'Localisations'}
                    </span>
                  </div>
                  
                  {group.items.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50"
                    >
                      {group.type === 'restaurant' && (
                        <>
                          <div className="flex-1">
                            <div className="text-gray-900">{suggestion.text}</div>
                            <div className="text-sm text-gray-500">{suggestion.subtext}</div>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded">
                            <Star size={12} className="text-amber-500 fill-amber-500" />
                            <span className="text-sm font-medium text-gray-700">
                              {suggestion.rating.toFixed(1)}
                            </span>
                          </div>
                        </>
                      )}

                      {group.type === 'cuisine' && (
                        <>
                          <div className="flex-1">
                            <div className="text-gray-900">{suggestion.text}</div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {suggestion.count} restaurant{suggestion.count > 1 ? 's' : ''}
                          </div>
                        </>
                      )}

                      {group.type === 'location' && (
                        <>
                          <MapPin size={16} className="text-gray-400" />
                          <div className="flex-1">
                            <div className="text-gray-900">{suggestion.text}</div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {suggestion.count} restaurant{suggestion.count > 1 ? 's' : ''}
                          </div>
                        </>
                      )}
                    </button>
                  ))}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Utilitaire de debounce
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default SearchBar;