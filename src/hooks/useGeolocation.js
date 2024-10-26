'use client';
import { useState, useCallback } from 'react';

export const useGeolocation = () => {
    const [locationStatus, setLocationStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
    const [userLocation, setUserLocation] = useState(null);
    const [error, setError] = useState(null);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Rayon de la Terre en km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    };

    const getLocation = useCallback(() => {
        setLocationStatus('loading');
        setError(null);

        if (!navigator.geolocation) {
            setLocationStatus('error');
            setError('La géolocalisation n\'est pas supportée par votre navigateur');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ latitude, longitude });
                setLocationStatus('success');
            },
            (error) => {
                setLocationStatus('error');
                setError('Impossible d\'obtenir votre position');
                console.error('Erreur de géolocalisation:', error);
            }
        );
    }, []);

    const updateRestaurantDistances = useCallback((restaurants) => {
        if (!userLocation) return restaurants;

        return restaurants.map(restaurant => ({
            ...restaurant,
            distance: calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                restaurant.lat,
                restaurant.lng
            )
        }));
    }, [userLocation]);

    return {
        locationStatus,
        userLocation,
        error,
        getLocation,
        updateRestaurantDistances
    };
};