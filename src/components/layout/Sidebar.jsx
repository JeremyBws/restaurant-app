'use client';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Heart, 
  Bell, 
  MapPin, 
  Settings, 
  HelpCircle, 
  Users,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const MenuItem = ({ icon: Icon, label, onClick, className = "" }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg w-full text-left ${className}`}
  >
    <Icon size={20} className="text-gray-500" />
    <span className="text-gray-700 font-medium">{label}</span>
  </button>
);

export default function Sidebar({ isOpen, onClose }) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleNavigation = (path) => {
    router.push(path);
    onClose();
  };

  const handleLogout = async () => {
    await logout();
    onClose();
    router.push('/auth/login');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-50" 
      onClick={onClose}
    >
      <div 
        className="absolute left-0 top-0 bottom-0 w-80 max-w-sm bg-white shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="text-xl font-bold text-emerald-600">
            <span className="bg-emerald-600 text-white px-3 py-1 rounded">ABCD</span>
          </div>
          <button 
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={onClose}
          >
            <span className="text-2xl font-medium">&times;</span>
          </button>
        </div>

        {/* Profil */}
        <div className="p-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              {user ? (
                <image 
                  src={user.avatar || '/default-avatar.png'} 
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
                    className="text-sm text-emerald-600"
                    onClick={() => handleNavigation('/auth/login')}
                  >
                    Se connecter
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Menu items */}
          <nav className="space-y-1">
            <MenuItem 
              icon={Search} 
              label="Explorer" 
              onClick={() => handleNavigation('/')} 
            />
            <MenuItem 
              icon={Heart} 
              label="Mes favoris" 
              onClick={() => handleNavigation('/favorites')} 
            />
            <MenuItem 
              icon={Bell} 
              label="Notifications" 
              onClick={() => handleNavigation('/notifications')} 
            />
            <MenuItem 
              icon={MapPin} 
              label="Adresses sauvegardées" 
              onClick={() => handleNavigation('/addresses')} 
            />
            <hr className="my-2" />
            <MenuItem 
              icon={Settings} 
              label="Paramètres" 
              onClick={() => handleNavigation('/settings')} 
            />
            <MenuItem 
              icon={HelpCircle} 
              label="Aide" 
              onClick={() => handleNavigation('/help')} 
            />
            {user && (
              <MenuItem 
                icon={LogOut} 
                label="Déconnexion" 
                onClick={handleLogout}
                className="text-red-600" 
              />
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}