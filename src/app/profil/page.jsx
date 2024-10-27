'use client';
import Image from 'next/image';
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Heart, 
  Calendar, 
  MapPin, 
  Settings, 
  Star 
} from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();

  const stats = {
    reservations: 12,
    favorites: 8,
    reviews: 4,
    points: 150
  };

  const tabs = [
    { id: 'reservations', label: 'Réservations', icon: Calendar },
    { id: 'favorites', label: 'Favoris', icon: Heart },
    { id: 'reviews', label: 'Avis', icon: Star },
  ];

  const [activeTab, setActiveTab] = React.useState('reservations');

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-gray-500">Connectez-vous pour voir votre profil</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* En-tête du profil */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
            {user.avatar ? (
              <Image 
                src={user.avatar} 
                alt={user.name} 
				width={20}
					height={20}
					layout="responsive"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User size={32} className="text-emerald-600" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
          <button className="ml-auto p-2 hover:bg-gray-50 rounded-full">
            <Settings size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-4 gap-4 mt-6 text-center">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">
              {stats.reservations}
            </div>
            <div className="text-sm text-gray-500">Réservations</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">
              {stats.favorites}
            </div>
            <div className="text-sm text-gray-500">Favoris</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">
              {stats.reviews}
            </div>
            <div className="text-sm text-gray-500">Avis</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">
              {stats.points}
            </div>
            <div className="text-sm text-gray-500">Points</div>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b">
          <nav className="flex">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors
                  ${activeTab === tab.id 
                    ? 'border-emerald-600 text-emerald-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Contenu des onglets */}
        <div className="p-4">
          {activeTab === 'reservations' && (
            <div className="space-y-4">
              {/* Liste des réservations... */}
              <div className="text-center text-gray-500 py-8">
                Aucune réservation pour le moment
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="space-y-4">
              {/* Liste des favoris... */}
              <div className="text-center text-gray-500 py-8">
                Aucun favori pour le moment
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {/* Liste des avis... */}
              <div className="text-center text-gray-500 py-8">
                Aucun avis pour le moment
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}