'use client';
import React from 'react';
import { AlignJustify, Search, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Logo = () => (
  <div className="text-xl font-bold text-emerald-600">
    <span className="bg-emerald-600 text-white px-3 py-1 rounded">ABCD</span>
  </div>
);

export default function Header({ onMenuOpen, onSearchClick }) {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="px-4 py-3 flex items-center justify-between">
        <button 
          className="p-2 hover:bg-gray-100 rounded-lg"
          onClick={onMenuOpen}
        >
          <AlignJustify size={24} />
        </button>
        
        <Logo />

        <div className="flex items-center gap-2">
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg"
            onClick={onSearchClick}
          >
            <Search size={24} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell size={24} />
            {user?.hasNotifications && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}