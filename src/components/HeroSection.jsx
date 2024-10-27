import React from 'react';
import SearchBar from '@/components/search/SearchBar';

const HeroSection = () => {
  return (
 <div className="relative min-h-[600px] lg:h-[50vh]">
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/images/restaurant-bg.jpg')"
    }}
  />
  
  {/* Overlay avec effet vignette */}
  <div 
    className="absolute inset-0 bg-black"
    style={{
      opacity: 0.5,
      maskImage: "radial-gradient(circle, transparent 60%, black 100%)"
    }}
  />

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 animate-fade-in">
            Découvrez les Meilleurs Restaurants
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
            Trouvez et réservez les restaurants les mieux notés près de chez vous
          </p>

          {/* Search Section avec le nouveau SearchBar */}
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            {[
              { number: '1000+', label: 'Restaurants' },
              { number: '50K+', label: 'Utilisateurs' },
              { number: '4.8', label: 'Note moyenne' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;