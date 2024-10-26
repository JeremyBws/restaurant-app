'use client';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Heart, Bell, User } from 'lucide-react';

const NavItem = ({ icon: Icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick} 
    className={`flex flex-col items-center ${
      isActive ? 'text-emerald-600' : 'text-gray-600'
    }`}
  >
    <Icon size={24} />
    <span className="text-xs mt-1">{label}</span>
  </button>
);

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: 'Explorer', icon: Search, path: '/' },
    { label: 'Favoris', icon: Heart, path: '/favorites' },
    { label: 'Notifications', icon: Bell, path: '/notifications' },
    { label: 'Profil', icon: User, path: '/profile' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t py-2 px-4">
      <div className="flex justify-around items-center">
        {navItems.map(item => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            isActive={pathname === item.path}
            onClick={() => router.push(item.path)}
          />
        ))}
      </div>
    </nav>
  );
}