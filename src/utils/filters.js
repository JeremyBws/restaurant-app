export const filterByPrice = (restaurants, priceLevel) => {
    return restaurants.filter(r => r.price === priceLevel);
};

export const filterByCuisine = (restaurants, cuisine) => {
    return restaurants.filter(r => r.cuisine === cuisine);
};

export const sortByRating = (restaurants) => {
    return [...restaurants].sort((a, b) => b.rating - a.rating);
};

export const sortByDistance = (restaurants) => {
    return [...restaurants].sort((a, b) => a.distance - b.distance);
};

export const searchRestaurants = (restaurants, searchTerm) => {
    const term = searchTerm.toLowerCase();
    return restaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(term) ||
        restaurant.cuisine.toLowerCase().includes(term) ||
        restaurant.address.toLowerCase().includes(term)
    );
};