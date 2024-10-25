'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
 MapPin, 
 Star, 
 Users, 
 Search, 
 AlignJustify,
 Bell, 
 Heart,
} from 'lucide-react';

// Données des restaurants
const restaurantsData = [
 { id: 1, name: "Le Bistrot Parisien", image: "/api/placeholder/400/250", address: "123 rue de Paris", rating: 4.5, cuisine: "Français", price: "€€", openSpots: 4, distance: 0.2 },
 { id: 2, name: "Sushi Master", image: "/api/placeholder/400/250", address: "45 avenue des Champs", rating: 4.8, cuisine: "Japonais", price: "€€€", openSpots: 2, distance: 0.3 },
 { id: 3, name: "La Trattoria", image: "/api/placeholder/400/250", address: "78 rue du Commerce", rating: 4.6, cuisine: "Italien", price: "€€", openSpots: 6, distance: 0.4 },
 { id: 4, name: "Le Dragon d'Or", image: "/api/placeholder/400/250", address: "156 avenue de Clichy", rating: 4.3, cuisine: "Chinois", price: "€€", openSpots: 3, distance: 0.5 },
 { id: 5, name: "L'Olivier", image: "/api/placeholder/400/250", address: "34 rue des Martyrs", rating: 4.7, cuisine: "Méditerranéen", price: "€€€", openSpots: 2, distance: 0.6 },
 { id: 6, name: "Chez Marcel", image: "/api/placeholder/400/250", address: "89 rue Oberkampf", rating: 4.4, cuisine: "Bistrot", price: "€€", openSpots: 8, distance: 0.7 },
 { id: 7, name: "Taj Mahal", image: "/api/placeholder/400/250", address: "12 rue de la Roquette", rating: 4.5, cuisine: "Indien", price: "€€", openSpots: 5, distance: 0.8 },
 { id: 8, name: "El Pueblo", image: "/api/placeholder/400/250", address: "67 rue de Charonne", rating: 4.2, cuisine: "Mexicain", price: "€", openSpots: 4, distance: 0.9 },
 { id: 9, name: "Le Petit Zinc", image: "/api/placeholder/400/250", address: "23 rue Saint-Maur", rating: 4.6, cuisine: "Français", price: "€€€", openSpots: 2, distance: 1.0 },
 { id: 10, name: "Kyoto Garden", image: "/api/placeholder/400/250", address: "91 avenue Parmentier", rating: 4.8, cuisine: "Japonais", price: "€€€", openSpots: 3, distance: 1.1 },
 { id: 11, name: "La Piccola Roma", image: "/api/placeholder/400/250", address: "45 rue de la Folie Méricourt", rating: 4.4, cuisine: "Italien", price: "€€", openSpots: 6, distance: 1.2 },
 { id: 12, name: "Le Coq Hardi", image: "/api/placeholder/400/250", address: "178 rue Saint-Denis", rating: 4.3, cuisine: "Français", price: "€€", openSpots: 4, distance: 1.3 },
 { id: 13, name: "Sakura", image: "/api/placeholder/400/250", address: "34 rue de la Fontaine au Roi", rating: 4.7, cuisine: "Japonais", price: "€€", openSpots: 2, distance: 1.4 },
 { id: 14, name: "L'Entrecôte", image: "/api/placeholder/400/250", address: "56 rue du Faubourg Saint-Denis", rating: 4.5, cuisine: "Steakhouse", price: "€€€", openSpots: 5, distance: 1.5 },
 { id: 15, name: "Le Marché", image: "/api/placeholder/400/250", address: "89 rue du Faubourg Saint-Martin", rating: 4.2, cuisine: "Français", price: "€€", openSpots: 8, distance: 1.6 },
 { id: 16, name: "Banh Mi House", image: "/api/placeholder/400/250", address: "123 boulevard de Belleville", rating: 4.6, cuisine: "Vietnamien", price: "€", openSpots: 6, distance: 1.7 },
 { id: 17, name: "La Paella", image: "/api/placeholder/400/250", address: "45 rue Jean-Pierre Timbaud", rating: 4.4, cuisine: "Espagnol", price: "€€", openSpots: 4, distance: 1.8 },
 { id: 18, name: "Le Petit Cambodge", image: "/api/placeholder/400/250", address: "67 rue Bichat", rating: 4.5, cuisine: "Cambodgien", price: "€€", openSpots: 3, distance: 1.9 },
 { id: 19, name: "Aux Délices", image: "/api/placeholder/400/250", address: "90 rue de la Fontaine au Roi", rating: 4.3, cuisine: "Pâtisserie", price: "€€", openSpots: 12, distance: 2.0 },
 { id: 20, name: "Le Bistrot des Vosges", image: "/api/placeholder/400/250", address: "34 rue des Vosges", rating: 4.6, cuisine: "Français", price: "€€", openSpots: 5, distance: 2.1 }
];

export default function Home() {
 const [isSearchExpanded, setIsSearchExpanded] = useState(false);
 const [showMap, setShowMap] = useState(false);
 const [activeFilter, setActiveFilter] = useState('all');
 const [filteredRestaurants, setFilteredRestaurants] = useState(restaurantsData);

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

 return (
   <div className="min-h-screen flex flex-col bg-gray-50">
     {/* Header mobile */}
     <header className="bg-white border-b sticky top-0 z-50">
       <div className="px-4 py-3 flex items-center justify-between">
         <button className="p-2 hover:bg-gray-100 rounded-lg">
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

     {/* Barre de recherche */}
     <div className="p-4 bg-white border-b">
       <div className="relative">
         <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
         <input
           type="text"
           placeholder="Où voulez-vous manger ?"
           className="w-full pl-10 pr-4 py-2 border rounded-lg"
         />
       </div>
     </div>

     {/* Filtres */}
     <div className="bg-white p-4 border-b overflow-x-auto">
       <div className="flex gap-2 min-w-max">
         <button 
           onClick={() => handleFilter('all')}
           className={`px-4 py-2 rounded-full text-sm font-medium border ${
             activeFilter === 'all' 
               ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
               : 'text-gray-600 hover:bg-gray-50'
           }`}
         >
           Tous les restaurants
         </button>
         <button 
           onClick={() => handleFilter('prix1')}
           className={`px-4 py-2 rounded-full text-sm font-medium border ${
             activeFilter === 'prix1' 
               ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
               : 'text-gray-600 hover:bg-gray-50'
           }`}
         >
           Prix €
         </button>
         <button 
           onClick={() => handleFilter('prix2')}
           className={`px-4 py-2 rounded-full text-sm font-medium border ${
             activeFilter === 'prix2' 
               ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
               : 'text-gray-600 hover:bg-gray-50'
           }`}
         >
           Prix €€
         </button>
         <button 
           onClick={() => handleFilter('prix3')}
           className={`px-4 py-2 rounded-full text-sm font-medium border ${
             activeFilter === 'prix3' 
               ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
               : 'text-gray-600 hover:bg-gray-50'
           }`}
         >
           Prix €€€
         </button>
         <button 
           onClick={() => handleFilter('francais')}
           className={`px-4 py-2 rounded-full text-sm font-medium border ${
             activeFilter === 'francais' 
               ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
               : 'text-gray-600 hover:bg-gray-50'
           }`}
         >
           Français
         </button>
         <button 
           onClick={() => handleFilter('italien')}
           className={`px-4 py-2 rounded-full text-sm font-medium border ${
             activeFilter === 'italien' 
               ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
               : 'text-gray-600 hover:bg-gray-50'
           }`}
         >
           Italien
         </button>
         <button 
           onClick={() => handleFilter('japonais')}
           className={`px-4 py-2 rounded-full text-sm font-medium border ${
             activeFilter === 'japonais' 
               ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
               : 'text-gray-600 hover:bg-gray-50'
           }`}
         >
           Japonais
         </button>
         <button 
           onClick={() => handleFilter('note')}
           className={`px-4 py-2 rounded-full text-sm font-medium border ${
             activeFilter === 'note' 
               ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
               : 'text-gray-600 hover:bg-gray-50'
           }`}
         >
           Meilleure note
         </button>
         <button 
           onClick={() => handleFilter('distance')}
           className={`px-4 py-2 rounded-full text-sm font-medium border ${
             activeFilter === 'distance' 
               ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
               : 'text-gray-600 hover:bg-gray-50'
           }`}
         >
           Distance
         </button>
       </div>
     </div>

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
         <div className="h-[calc(100vh-180px)] bg-gray-100">
           <div className="h-full flex items-center justify-center text-gray-500">
             Carte Interactive (à implémenter)
           </div>
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
        <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-lg flex items-center">
          <Star className="text-yellow-500 w-4 h-4" />
          <span className="ml-1 text-sm font-medium">{rating}</span>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
          <span className="text-sm text-gray-600">{distance} km</span>
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
