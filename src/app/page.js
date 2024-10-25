'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import MapComponent from '../components/Map';
import { 
  MapPin, 
  Star, 
  Users, 
  Search, 
  AlignJustify,
  Bell, 
  Heart,
  Settings,
  HelpCircle
} from 'lucide-react';

// Données des restaurants
const restaurantsData = [
    { id: 1, name: "Le Comptoir de la Gastronomie", image: "/api/placeholder/400/250", address: "34 Rue de la Rochefoucauld, 75009 Paris", rating: 4.5, cuisine: "Français", price: "€€", openSpots: 4, distance: 0.2, lat: 48.8738, lng: 2.3313 },
    { id: 2, name: "Sushi Shop", image: "/api/placeholder/400/250", address: "23 Rue de la Boétie, 75008 Paris", rating: 4.6, cuisine: "Japonais", price: "€€", openSpots: 2, distance: 0.3, lat: 48.8732, lng: 2.3142 },
    { id: 3, name: "Trattoria Da Enzo", image: "/api/placeholder/400/250", address: "9 Rue du Trône, 75012 Paris", rating: 4.7, cuisine: "Italien", price: "€€", openSpots: 6, distance: 0.4, lat: 48.8499, lng: 2.3931 },
    { id: 4, name: "Chez Janou", image: "/api/placeholder/400/250", address: "2 Rue de la Place aux Oies, 75002 Paris", rating: 4.5, cuisine: "Provençal", price: "€€", openSpots: 3, distance: 0.5, lat: 48.8653, lng: 2.3599 },
    { id: 5, name: "Le 6 Paul Bert", image: "/api/placeholder/400/250", address: "6 Rue Paul Bert, 75011 Paris", rating: 4.8, cuisine: "Français", price: "€€€", openSpots: 2, distance: 0.6, lat: 48.8497, lng: 2.3908 },
    { id: 6, name: "Le Baratin", image: "/api/placeholder/400/250", address: "3 Rue Jouye-Rouve, 75020 Paris", rating: 4.5, cuisine: "Bistrot", price: "€€", openSpots: 8, distance: 0.7, lat: 48.8649, lng: 2.3999 },
    { id: 7, name: "Le Taj Mahal", image: "/api/placeholder/400/250", address: "66 Rue de la Réunion, 75020 Paris", rating: 4.5, cuisine: "Indien", price: "€€", openSpots: 5, distance: 0.8, lat: 48.8652, lng: 2.3965 },
    { id: 8, name: "La Casa de los Abuelos", image: "/api/placeholder/400/250", address: "75 Rue de la Roquette, 75011 Paris", rating: 4.2, cuisine: "Mexicain", price: "€", openSpots: 4, distance: 0.9, lat: 48.8539, lng: 2.3808 },
    { id: 9, name: "Le Petit Zinc", image: "/api/placeholder/400/250", address: "3 Place de l'Odéon, 75006 Paris", rating: 4.6, cuisine: "Français", price: "€€€", openSpots: 2, distance: 1.0, lat: 48.8463, lng: 2.3388 },
    { id: 10, name: "Kyoto Sushi", image: "/api/placeholder/400/250", address: "65 Rue de la Chapelle, 75018 Paris", rating: 4.7, cuisine: "Japonais", price: "€€", openSpots: 3, distance: 1.1, lat: 48.8877, lng: 2.3535 },
    { id: 11, name: "La Piccola", image: "/api/placeholder/400/250", address: "1 Rue de la Villette, 75019 Paris", rating: 4.4, cuisine: "Italien", price: "€€", openSpots: 6, distance: 1.2, lat: 48.8820, lng: 2.3788 },
    { id: 12, name: "L'Entrecôte", image: "/api/placeholder/400/250", address: "20 Rue de Saint-Cloud, 75016 Paris", rating: 4.3, cuisine: "Steakhouse", price: "€€€", openSpots: 4, distance: 1.3, lat: 48.8437, lng: 2.2694 },
    { id: 13, name: "Sakura", image: "/api/placeholder/400/250", address: "12 Rue de la Chapelle, 75018 Paris", rating: 4.7, cuisine: "Japonais", price: "€€", openSpots: 2, distance: 1.4, lat: 48.8877, lng: 2.3597 },
    { id: 14, name: "Chez Janou", image: "/api/placeholder/400/250", address: "2 Rue de la Place aux Oies, 75002 Paris", rating: 4.5, cuisine: "Provençal", price: "€€", openSpots: 5, distance: 1.5, lat: 48.8653, lng: 2.3599 },
    { id: 15, name: "Le Marché", image: "/api/placeholder/400/250", address: "89 Rue du Faubourg Saint-Martin, 75010 Paris", rating: 4.2, cuisine: "Français", price: "€€", openSpots: 8, distance: 1.6, lat: 48.8738, lng: 2.3639 },
    { id: 16, name: "Banh Mi House", image: "/api/placeholder/400/250", address: "123 Boulevard de Belleville, 75011 Paris", rating: 4.6, cuisine: "Vietnamien", price: "€", openSpots: 6, distance: 1.7, lat: 48.8738, lng: 2.3671 },
    { id: 17, name: "La Paella", image: "/api/placeholder/400/250", address: "31 Rue de Montreuil, 75011 Paris", rating: 4.4, cuisine: "Espagnol", price: "€€", openSpots: 4, distance: 1.8, lat: 48.8485, lng: 2.3870 },
    { id: 18, name: "Le Petit Cambodge", image: "/api/placeholder/400/250", address: "20 Rue Alibert, 75010 Paris", rating: 4.5, cuisine: "Cambodgien", price: "€€", openSpots: 3, distance: 1.9, lat: 48.8701, lng: 2.3674 },
    { id: 19, name: "Aux Délices", image: "/api/placeholder/400/250", address: "6 Rue de l'Opéra, 75001 Paris", rating: 4.3, cuisine: "Pâtisserie", price: "€€", openSpots: 12, distance: 2.0, lat: 48.8676, lng: 2.3363 },
    { id: 20, name: "Le Bistrot des Vosges", image: "/api/placeholder/400/250", address: "34 Rue des Vosges, 75011 Paris", rating: 4.6, cuisine: "Français", price: "€€", openSpots: 5, distance: 2.1, lat: 48.8552, lng: 2.3666 }
];



function FilterBar({ activeFilter, handleFilter }) {
  const filterContainerRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    function checkOverflow() {
      const container = filterContainerRef.current;
      if (container.scrollWidth > container.clientWidth) {
        setIsScrollable(true);
      } else {
        setIsScrollable(false);
      }
    }

    // Initial check and window resize event listener
    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

return (
  <div className="bg-white border-b">
    <div className="p-2">
	
      <div
        className={'flex gap-2 pb-2 md:pb-4 overflow-x-auto'}
        ref={filterContainerRef}
        style={{ minWidth: 'max-content' }} // Ensures the container can grow with content
      >

 <button 
            onClick={() => handleFilter('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border whitespace-nowrap flex-shrink-0 ${
              activeFilter === 'all' 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                : 'text-gray-600 hover:bg-gray-50 border-gray-200'
            }`}
          >
            Tout voir
          </button>
          <button 
            onClick={() => handleFilter('prix1')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border whitespace-nowrap flex-shrink-0 ${
              activeFilter === 'prix1' 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                : 'text-gray-600 hover:bg-gray-50 border-gray-200'
            }`}
          >
            €
          </button>
          <button 
            onClick={() => handleFilter('prix2')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border whitespace-nowrap flex-shrink-0 ${
              activeFilter === 'prix2' 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                : 'text-gray-600 hover:bg-gray-50 border-gray-200'
            }`}
          >
            €€
          </button>
          <button 
            onClick={() => handleFilter('prix3')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border whitespace-nowrap flex-shrink-0 ${
              activeFilter === 'prix3' 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                : 'text-gray-600 hover:bg-gray-50 border-gray-200'
            }`}
          >
            €€€
          </button>
          <button 
            onClick={() => handleFilter('francais')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border whitespace-nowrap flex-shrink-0 ${
              activeFilter === 'francais' 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                : 'text-gray-600 hover:bg-gray-50 border-gray-200'
            }`}
          >
            Français
          </button>
          <button 
            onClick={() => handleFilter('italien')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border whitespace-nowrap flex-shrink-0 ${
              activeFilter === 'italien' 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                : 'text-gray-600 hover:bg-gray-50 border-gray-200'
            }`}
          >
            Italien
          </button>
          <button 
            onClick={() => handleFilter('japonais')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border whitespace-nowrap flex-shrink-0 ${
              activeFilter === 'japonais' 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                : 'text-gray-600 hover:bg-gray-50 border-gray-200'
            }`}
          >
            Japonais
          </button>
          <button 
            onClick={() => handleFilter('note')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border whitespace-nowrap flex-shrink-0 ${
              activeFilter === 'note' 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                : 'text-gray-600 hover:bg-gray-50 border-gray-200'
            }`}
          >
            Meilleure note
          </button>
          <button 
            onClick={() => handleFilter('distance')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border whitespace-nowrap flex-shrink-0 ${
              activeFilter === 'distance' 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                : 'text-gray-600 hover:bg-gray-50 border-gray-200'
            }`}
          >
            Distance
          </button>
        </div>
      </div>
    </div>
  );
}


export default function Home() {
	const [userLocation, setUserLocation] = useState(null);
	const [locationStatus, setLocationStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
	const [isSearchExpanded, setIsSearchExpanded] = useState(false);
	const [showMap, setShowMap] = useState(false);
	const [activeFilter, setActiveFilter] = useState('all');
	const [filteredRestaurants, setFilteredRestaurants] = useState(restaurantsData);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const handleSearch = (value) => {
		setSearchTerm(value);
	if (!value) {
		setFilteredRestaurants(restaurantsData);
    return;
  }
  
	const searchResults = restaurantsData.filter(restaurant => 
		restaurant.name.toLowerCase().includes(value.toLowerCase()) ||
		restaurant.cuisine.toLowerCase().includes(value.toLowerCase()) ||
		restaurant.address.toLowerCase().includes(value.toLowerCase())
  );
  
  setFilteredRestaurants(searchResults);
};

 const handleFilter = (filter) => {
   setActiveFilter(filter);
   switch(filter) {
     case 'prix1':
       setFilteredRestaurants(restaurantsData.filter(r => r.price === '€'));
       break;
     case 'prix2':
       setFilteredRestaurants(restaurantsData.filter(r => r.price === '€€'));
       break;
     case 'prix3':
       setFilteredRestaurants(restaurantsData.filter(r => r.price === '€€€'));
       break;
     case 'francais':
       setFilteredRestaurants(restaurantsData.filter(r => r.cuisine === 'Français'));
       break;
     case 'italien':
       setFilteredRestaurants(restaurantsData.filter(r => r.cuisine === 'Italien'));
       break;
     case 'japonais':
       setFilteredRestaurants(restaurantsData.filter(r => r.cuisine === 'Japonais'));
       break;
     case 'note':
       setFilteredRestaurants([...restaurantsData].sort((a, b) => b.rating - a.rating));
       break;
     case 'distance':
       setFilteredRestaurants([...restaurantsData].sort((a, b) => a.distance - b.distance));
       break;
     default:
       setFilteredRestaurants(restaurantsData);
   }
 };
const handleLocationRequest = () => {
  setLocationStatus('loading');
  
  if (!navigator.geolocation) {
    setLocationStatus('error');
    alert('La géolocalisation n\'est pas supportée par votre navigateur');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ latitude, longitude });
      setLocationStatus('success');
      
      // Trier les restaurants par distance par rapport à la position actuelle
      const restaurantsWithDistance = restaurantsData.map(restaurant => ({
        ...restaurant,
        distance: calculateDistance(latitude, longitude, restaurant)
      }));
      
      setFilteredRestaurants(restaurantsWithDistance.sort((a, b) => a.distance - b.distance));
    },
    (error) => {
      setLocationStatus('error');
      console.error('Erreur de géolocalisation:', error);
      alert('Impossible d\'obtenir votre position');
    }
  );
};

const calculateDistance = (lat1, lon1, restaurant) => {
  // Simulation de distance - à remplacer par une vraie formule si vous avez les coordonnées
  return restaurant.distance; // Pour l'instant, on garde la distance simulée
}
 return (
   <div className="min-h-screen flex flex-col bg-gray-50">
   
   {/* Header mobile */}
     <header className="bg-white border-b sticky top-0 z-50">
       <div className="px-4 py-3 flex items-center justify-between">
	<button 
	className="p-2 hover:bg-gray-100 rounded-lg"
	onClick={() => setIsMenuOpen(true)}
	>
	<AlignJustify size={24} />
	</button>
         
		 {/* Logo */}
         <div className="text-xl font-bold text-emerald-600">
           <span className="bg-emerald-600 text-white px-3 py-1 rounded">ABCD</span>
         </div>

		 {/* Actions */}
         <div className="flex items-center gap-2">
           <button 
             className="p-2 hover:bg-gray-100 rounded-lg"
             onClick={() => setIsSearchExpanded(true)}
           >
             <Search size={24} />
           </button>
           <button className="p-2 hover:bg-gray-100 rounded-lg relative">
             <Bell size={24} />
             <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
           </button>
         </div>
       </div>
     </header>
	 
{/* Menu latéral */}
{isMenuOpen && (
  <div 
    className="fixed inset-0 z-50 bg-black bg-opacity-50" 
    onClick={() => setIsMenuOpen(false)}
  >
    <div 
      className="absolute left-0 top-0 bottom-0 w-80 max-w-sm bg-white shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header du menu */}
      <div className="p-4 border-b flex justify-between items-center">
        <div className="text-xl font-bold text-emerald-600">
          <span className="bg-emerald-600 text-white px-3 py-1 rounded">ABCD</span>
        </div>
        <button 
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="text-2xl font-medium">&times;</span>
        </button>
      </div>

      {/* Profil utilisateur */}
      <div className="p-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
            <Users size={24} className="text-emerald-600" />
          </div>
          <div>
            <div className="font-semibold text-gray-700">Invité</div>
            <button className="text-sm text-emerald-600">Se connecter</button>
          </div>
        </div>

        {/* Menu items */}
        <nav className="space-y-1">
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
            <Search size={20} className="text-gray-500" />
            <span className="text-gray-700 font-medium">Explorer</span>
          </a>
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
            <Heart size={20} className="text-gray-500" />
            <span className="text-gray-700 font-medium">Mes favoris</span>
          </a>
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
            <Bell size={20} className="text-gray-500" />
            <span className="text-gray-700 font-medium">Notifications</span>
          </a>
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
            <MapPin size={20} className="text-gray-500" />
            <span className="text-gray-700 font-medium">Adresses sauvegardées</span>
          </a>
          <hr className="my-2" />
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
            <Settings size={20} className="text-gray-500" />
            <span className="text-gray-700 font-medium">Paramètres</span>
          </a>
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
            <HelpCircle size={20} className="text-gray-500" />
            <span className="text-gray-700 font-medium">Aide</span>
          </a>
        </nav>
      </div>
    </div>
  </div>
)}

{/* Barre de recherche */}
<div className="p-4 bg-white border-b">
  <div className="relative flex gap-2">
    <div className="relative flex-1">
      <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Rechercher un restaurant, une cuisine..."
        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-semibold text-gray-900 placeholder:text-gray-400"
      />
    </div>
    <button
      onClick={handleLocationRequest}
      className={`px-4 rounded-lg border flex items-center gap-2 ${
        locationStatus === 'success' 
          ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
          : 'hover:bg-gray-50'
      }`}
    >
      {locationStatus === 'loading' ? (
        <div className="w-5 h-5 border-2 border-gray-300 border-t-emerald-600 rounded-full animate-spin" />
      ) : (
        <MapPin size={20} className={locationStatus === 'success' ? 'text-emerald-600' : 'text-gray-400'} />
      )}
      <span className="hidden md:inline">Ma position</span>
    </button>
  </div>
  {locationStatus === 'success' && (
    <div className="mt-2 text-sm text-emerald-600">
      Position trouvée ! Affichage des restaurants les plus proches.
    </div>
  )}
</div>

{/* Filtres */}

 <FilterBar activeFilter={activeFilter} handleFilter={handleFilter} />


     {/* Toggle Vue Liste/Carte */}
     <div className="bg-white border-b px-4 py-2 flex justify-between items-center sticky top-[60px] z-40">
       <div className="text-sm text-gray-600">{filteredRestaurants.length} restaurants trouvés autour de vous</div>
       <div className="flex gap-2">
        <button 
           onClick={() => setShowMap(false)}
           className={`px-4 py-2 rounded-lg text-sm font-medium ${
             !showMap ? 'bg-emerald-100 text-emerald-600' : 'hover:bg-gray-100 text-gray-600'
           }`}
         >
           Liste
         </button>
         <button 
           onClick={() => setShowMap(true)}
           className={`px-4 py-2 rounded-lg text-sm font-medium ${
             showMap ? 'bg-emerald-100 text-emerald-600' : 'hover:bg-gray-100 text-gray-600'
           }`}
         >
           Carte
         </button>
       </div>
     </div>

     {/* Contenu principal */}
     <main className="flex-1">
{showMap ? (
  <div className="h-[calc(100vh-180px)]">
    <MapComponent 
      restaurants={filteredRestaurants}
      userLocation={userLocation}
    />
  </div>
       ) : (
         <div className="max-w-xl mx-auto p-4 space-y-4 pb-20">
           {filteredRestaurants.map(restaurant => (
             <RestaurantCard
               key={restaurant.id}
               {...restaurant}
             />
           ))}
         </div>
       )}
     </main>

     {/* Navigation bottom */}
     <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t py-2 px-4">
       <div className="flex justify-around items-center">
         <a href="#" className="flex flex-col items-center text-emerald-600">
           <Search size={24} />
           <span className="text-xs mt-1">Explorer</span>
         </a>
         <a href="#" className="flex flex-col items-center text-gray-600">
           <Heart size={24} />
           <span className="text-xs mt-1">Favoris</span>
         </a>
         <a href="#" className="flex flex-col items-center text-gray-600">
           <Bell size={24} />
           <span className="text-xs mt-1">Notifications</span>
         </a>
         <a href="#" className="flex flex-col items-center text-gray-600">
           <Users size={24} />
           <span className="text-xs mt-1">Profil</span>
         </a>
       </div>
     </nav>
   </div>
 );
}

const RestaurantCard = ({ name, image, address, rating, cuisine, price, openSpots, distance }) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow">
          <Heart size={20} className="text-gray-600" />
        </button>
<div className="absolute top-3 left-3 bg-white px-3 py-2 rounded-lg flex items-center shadow-md hover:scale-105 transition-transform">
  <Star className="text-yellow-500 w-5 h-5" fill="#eab308" />
  <span className="ml-1.5 font-semibold text-gray-400">{rating.toFixed(1)}</span>
</div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
          <span className="text-sm text-gray-600">

  {distance < 1 
    ? `${(distance * 1000).toFixed(0)}m` 
    : `${distance.toFixed(1)}km`}
</span>
        </div>
        <p className="text-gray-600 text-sm mt-1">{address}</p>
        <div className="mt-2 flex items-center gap-3 text-sm text-gray-700">
          <span>{cuisine}</span>
          <span>•</span>
          <span>{price}</span>
        </div>
        <div className="mt-2 flex items-center text-sm font-medium text-emerald-600">
          <Users className="w-4 h-4 mr-1" />
          <span>{openSpots} places disponibles</span>
        </div>
        <button className="mt-3 w-full py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700">
          Réserver
        </button>
      </CardContent>
    </Card>
  );
};