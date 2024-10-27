import { create } from 'zustand';

const useSearchStore = create((set, get) => ({
  searchTerm: '',
  suggestions: [],
  isLoading: false,
  recentSearches: [],
  
  setSearchTerm: (term) => {
    set({ searchTerm: term });
  },

  addRecentSearch: (term) => {
    set((state) => ({
      recentSearches: [
        term,
        ...state.recentSearches.filter(t => t !== term)
      ].slice(0, 5) // Garde les 5 dernières recherches
    }));
  },

  clearRecentSearches: () => {
    set({ recentSearches: [] });
  },

  // Simule une recherche de suggestions
  fetchSuggestions: async (term) => {
    if (!term.trim()) {
      set({ suggestions: [] });
      return;
    }

    set({ isLoading: true });
    
    // Simule un délai réseau
    await new Promise(resolve => setTimeout(resolve, 200));

    const suggestions = [
      { type: 'cuisine', items: [] },
      { type: 'restaurant', items: [] },
      { type: 'location', items: [] }
    ];

    // Filtre les restaurants selon le terme de recherche
    const allRestaurants = window.__restaurantsData || []; // À remplacer par vos données
    
    allRestaurants.forEach(restaurant => {
      if (restaurant.name.toLowerCase().includes(term.toLowerCase())) {
        suggestions[1].items.push({
          id: restaurant.id,
          text: restaurant.name,
          subtext: `${restaurant.cuisine} • ${restaurant.address}`,
          rating: restaurant.rating
        });
      }
      
      if (restaurant.cuisine.toLowerCase().includes(term.toLowerCase())) {
        const existingCuisine = suggestions[0].items.find(
          item => item.text.toLowerCase() === restaurant.cuisine.toLowerCase()
        );
        if (!existingCuisine) {
          suggestions[0].items.push({
            id: `cuisine-${restaurant.cuisine}`,
            text: restaurant.cuisine,
            count: allRestaurants.filter(r => 
              r.cuisine.toLowerCase() === restaurant.cuisine.toLowerCase()
            ).length
          });
        }
      }
      
      if (restaurant.address.toLowerCase().includes(term.toLowerCase())) {
        const existingLocation = suggestions[2].items.find(
          item => item.text.toLowerCase() === restaurant.address.toLowerCase()
        );
        if (!existingLocation) {
          suggestions[2].items.push({
            id: `location-${restaurant.address}`,
            text: restaurant.address,
            count: allRestaurants.filter(r => 
              r.address.toLowerCase().includes(term.toLowerCase())
            ).length
          });
        }
      }
    });

    set({ 
      suggestions,
      isLoading: false 
    });
  }
}));

export default useSearchStore;