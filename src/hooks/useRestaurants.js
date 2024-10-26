'use client';
import { useState, useEffect } from 'react';
import { restaurantsData } from '@/data/restaurants';
import { useGeolocation } from './useGeolocation';

export const useRestaurants = () => {
    // Séparer les filtres par type
    const [filters, setFilters] = useState({
        cuisine: null,
        price: null
    });
    const [sortBy, setSortBy] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRestaurants, setFilteredRestaurants] = useState(restaurantsData);

    const { 
        locationStatus, 
        userLocation, 
        getLocation, 
        updateRestaurantDistances 
    } = useGeolocation();

    const applyFilters = (restaurants) => {
        let result = [...restaurants];

        // Appliquer le filtre cuisine
        if (filters.cuisine) {
            result = result.filter(r => r.cuisine === filters.cuisine);
        }

        // Appliquer le filtre prix
        if (filters.price) {
            result = result.filter(r => r.price === filters.price);
        }

        // Appliquer le tri
        if (sortBy) {
            switch (sortBy) {
                case 'distance':
                    result.sort((a, b) => a.distance - b.distance);
                    break;
                case 'rating':
                    result.sort((a, b) => b.rating - a.rating);
                    break;
                case 'price-asc':
                    result.sort((a, b) => a.price.length - b.price.length);
                    break;
                case 'price-desc':
                    result.sort((a, b) => b.price.length - a.price.length);
                    break;
            }
        }

        return result;
    };

    // Gérer les changements de filtres
    const handleFilterChange = (filterType, value) => {
        setFilters(prev => {
            // Si on clique sur le même filtre, on le désactive
            if (prev[filterType] === value) {
                return {
                    ...prev,
                    [filterType]: null
                };
            }
            // Sinon on active le nouveau filtre
            return {
                ...prev,
                [filterType]: value
            };
        });
    };

    // Gérer le tri
const handleSortChange = (filterType, value) => {
    // Notez que nous gardons la même signature que handleFilterChange
    setSortBy(prev => prev === value ? null : value);
};

    // Recherche
    const handleSearch = (value) => {
        setSearchTerm(value);
        let results = restaurantsData;
        
        if (value) {
            results = results.filter(restaurant => 
                restaurant.name.toLowerCase().includes(value.toLowerCase()) ||
                restaurant.cuisine.toLowerCase().includes(value.toLowerCase()) ||
                restaurant.address.toLowerCase().includes(value.toLowerCase())
            );
        }

        setFilteredRestaurants(applyFilters(results));
    };

    // Réappliquer les filtres quand ils changent
    useEffect(() => {
        let results = restaurantsData;
        
        if (searchTerm) {
            results = results.filter(restaurant => 
                restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                restaurant.address.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredRestaurants(applyFilters(results));
    }, [filters, sortBy]);

    // Mettre à jour les distances quand la localisation change
    useEffect(() => {
        if (userLocation) {
            const withDistances = updateRestaurantDistances(restaurantsData);
            setFilteredRestaurants(applyFilters(withDistances));
        }
    }, [userLocation]);

return {
    restaurants: filteredRestaurants,
    filters,
    sortBy,  // Assurez-vous que c'est bien exporté
    searchTerm,
    locationStatus,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    getLocation,
    userLocation
};
};