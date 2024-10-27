import { create } from 'zustand';

const useFiltersStore = create((set, get) => ({
  activeFilters: {
    main: null,
    cuisine: null,
    price: null
  },
  searchTerm: '',
  
  setFilter: (type, value) => {
    set((state) => ({
      activeFilters: {
        ...state.activeFilters,
        [type]: state.activeFilters[type] === value ? null : value
      }
    }));
  },

  resetFilters: () => {
    set({
      activeFilters: {
        main: null,
        cuisine: null,
        price: null
      }
    });
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term });
  }
}));

export default useFiltersStore;