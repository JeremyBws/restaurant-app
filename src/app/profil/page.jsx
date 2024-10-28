'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Settings, 
  MapPin, 
  Award, 
  Heart, 
  Bookmark,
  Star,
  Clock,
  TrendingUp
} from 'lucide-react';
import useAuthStore from '@/store/authStore';
import useFavoritesStore from '@/store/favorites';
import ProfileProgress from '@/components/profile/ProfileProgress';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProfileStats from '@/components/profile/ProfileStats';

const badges = {
  explorer: {
    name: 'Explorateur',
    description: 'A visité 10 restaurants différents',
    icon: MapPin,
    color: 'bg-blue-500'
  },
  gourmet: {
    name: 'Gourmet',
    description: 'A donné 50 avis',
    icon: Star,
    color: 'bg-yellow-500'
  },
  regular: {
    name: 'Habitué',
    description: 'A visité le même restaurant 5 fois',
    icon: Clock,
    color: 'bg-purple-500'
  },
  trendsetter: {
    name: 'Trendsetter',
    description: '100 personnes ont suivi ses recommandations',
    icon: TrendingUp,
    color: 'bg-pink-500'
  }
};

const ProfilePage = () => {
  const router = useRouter();
  const { user, preferences } = useAuthStore();
  const { favorites, wishlist } = useFavoritesStore();

  const stats = [
    { 
      label: 'Favoris', 
      value: favorites.length,
      icon: Heart,
      color: 'text-red-500' 
    },
    { 
      label: 'À tester', 
      value: wishlist.length,
      icon: Bookmark,
      color: 'text-amber-500'
    },
    { 
      label: 'Badges', 
      value: Object.keys(badges).length,
      icon: Award,
      color: 'text-blue-500'
    }
  ];
    // Fonction pour scroll vers la section des badges
  const scrollToBadges = () => {
    document.getElementById('badges-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const navigationCards = [
    { 
      label: 'Favoris', 
      value: favorites.length,
      icon: Heart,
      color: 'text-red-500',
      onClick: () => router.push('/favoris')
    },
    { 
      label: 'À tester', 
      value: wishlist.length,
      icon: Bookmark,
      color: 'text-amber-500',
      onClick: () => router.push('/wishlist')
    },
    { 
      label: 'Badges', 
      value: Object.keys(badges).length,
      icon: Award,
      color: 'text-blue-500',
      onClick: scrollToBadges
    }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header avec background décoratif */}
      <div className="relative bg-amber-600 h-48 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-24">
        {/* Carte de profil */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 relative">
          {/* Bouton paramètres */}
          <button className="absolute top-4 right-4 p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors">
            <Settings size={24} className="text-gray-600" />
          </button>

          <div className="text-center">
            {/* Avatar avec bordure et effet */}
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-amber-100 to-amber-50">
                <Image
                  src={user?.photo || '/images/default-avatar.svg'}
                  alt={user?.name || 'Profile'}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-lg" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-1">
              {user?.name || 'Utilisateur'}
            </h1>
            
            {user?.location && (
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <MapPin size={18} />
                <span>Paris, France</span>
              </div>
            )}
          </div>

          {/* Cartes de navigation avec effets améliorés */}
<div className="mb-8">
  <ProfileStats 
    favorites={favorites.length}
    wishlist={wishlist.length}
    badges={Object.keys(badges).length}
  />
</div>
        </div>

        {/* Section Badges avec design amélioré */}
        <div id="badges-section" className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Badges & Récompenses</h2>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
              {Object.keys(badges).length} badges disponibles
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(badges).map(([id, badge]) => {
              const Icon = badge.icon;
              const isEarned = user?.earnedBadges?.includes(id);
              
              return (
                <motion.div
                  key={id}
                  whileHover={{ scale: isEarned ? 1.05 : 1 }}
                  className={`relative p-6 rounded-xl border-2 transition-all
                    ${isEarned 
                      ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-white' 
                      : 'border-gray-100 bg-gray-50'
                    }`}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center 
                      justify-center transition-colors ${
                        isEarned ? badge.color : 'bg-gray-100'
                      }`}>
                      <Icon size={24} className={isEarned ? 'text-white' : 'text-gray-400'} />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">{badge.name}</h3>
                    <p className="text-sm text-gray-500">{badge.description}</p>
                    
                    {!isEarned && (
                      <div className="absolute inset-0 backdrop-blur-[1px] rounded-xl 
                        bg-white/80 flex items-center justify-center">
                        <div className="bg-gray-100/90 px-3 py-1 rounded-full text-sm text-gray-600">
                          À débloquer
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Section Préférences avec nouveau design */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Préférences</h2>
          <div className="space-y-8">
            {/* Régimes alimentaires */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Régimes alimentaires</h3>
              <div className="flex flex-wrap gap-2">
                {preferences?.dietary?.map((pref) => (
                  <span
                    key={pref}
                    className="px-4 py-2 bg-gradient-to-r from-amber-50 to-amber-100
                      text-amber-700 rounded-full text-sm font-medium"
                  >
                    {pref}
                  </span>
                ))}
              </div>
            </div>

            {/* Centres d'intérêt */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Centres d&apos;intérêt</h3>
              <div className="flex flex-wrap gap-2">
                {preferences?.interests?.map((interest) => (
                  <span
                    key={interest}
                    className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100
                      text-blue-700 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section Progression */}
        <div className="mb-8">
          <ProfileProgress 
            points={user?.points || 0}
            earnedBadges={user?.earnedBadges || []}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;