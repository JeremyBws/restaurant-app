'use client';
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  MapPin, 
  Star, 
  Users, 
  Search, 
  AlignJustify,
  Bell, 
  Heart,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';


export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const { user, logout, openAuthModal } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsMenuOpen(true)}
          >
            <AlignJustify size={24} />
          </button>
          
    <a href="/" className="text-xl font-bold text-emerald-600">
      <span className="bg-emerald-600 text-white px-3 py-1 rounded">ABCD</span>
    </a>	

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
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
            onClick={e => e.stopPropagation()}
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

            {/* Profil */}
  <div className="p-4">
  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
      {user ? (
        <img 
          src={user.avatar || '/placeholder-avatar.png'} 
          alt={user.name}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <Users size={24} className="text-emerald-600" />
      )}
    </div>
    <div>
      {user ? (
        <>
          <div className="font-semibold text-gray-700">{user.name}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </>
      ) : (
        <>
          <div className="font-semibold text-gray-700">Invité</div>
          <button 
            className="text-sm text-emerald-600 hover:text-emerald-700"
            onClick={() => openAuthModal('login')}
          >
            Se connecter
          </button>
        </>
      )}
    </div>
  </div>

  {/* Menu items */}
  <nav className="space-y-1">
    <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
      <Search size={20} className="text-gray-500" />
      <span className="text-gray-700 font-medium">Explorer</span>
    </a>
    {user && (
      <>
        <a href="/favoris" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
          <Heart size={20} className="text-gray-500" />
          <span className="text-gray-700 font-medium">Mes favoris</span>
        </a>
        <a href="/notifications" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
          <Bell size={20} className="text-gray-500" />
          <span className="text-gray-700 font-medium">Notifications</span>
        </a>
      </>
    )}
    <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
      <MapPin size={20} className="text-gray-500" />
      <span className="text-gray-700 font-medium">Adresses sauvegardées</span>
    </a>
    <hr className="my-2" />
    {user ? (
      <>
        <a href="/profil" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
          <Settings size={20} className="text-gray-500" />
          <span className="text-gray-700 font-medium">Paramètres</span>
        </a>
        <button 
          onClick={logout}
          className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg w-full text-left text-red-600"
        >
          <LogOut size={20} />
          <span className="font-medium">Déconnexion</span>
        </button>
      </>
    ) : (
      <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
        <HelpCircle size={20} className="text-gray-500" />
        <span className="text-gray-700 font-medium">Aide</span>
      </a>
    )}
  </nav>
</div>
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}