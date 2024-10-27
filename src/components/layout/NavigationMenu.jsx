'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Home, 
  Search, 
  Heart, 
  Bookmark, 
  User,
  MapPin
} from 'lucide-react';
import useFavoritesStore from '@/store/favorites';

const NavigationMenu = ({ onItemClick }) => {
  const pathname = usePathname();
  const { favorites, wishlist } = useFavoritesStore();

  const menuItems = [
    {
      label: 'Accueil',
      href: '/',
      icon: Home
    },
    {
      label: 'Explorer',
      href: '/explorer',
      icon: Search
    },
    {
      label: 'Favoris',
      href: '/favoris',
      icon: Heart,
      count: favorites.length
    },
    {
      label: 'Wishlist',
      href: '/wishlist',
      icon: Bookmark,
      count: wishlist.length
    },
    {
      label: 'À proximité',
      href: '/proximite',
      icon: MapPin
    },
    {
      label: 'Profil',
      href: '/profil',
      icon: User
    }
  ];

  return (
    <nav className="py-4">
      <div className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={`group flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all duration-200
              ${pathname === item.href
                ? 'bg-amber-50 text-amber-600'
                : 'hover:bg-gray-50 text-gray-600 hover:text-amber-600'
              }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
            {item.count > 0 && (
              <span className="ml-auto bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full text-xs font-medium">
                {item.count}
              </span>
            )}
            {pathname === item.href && (
              <motion.div
                layoutId="activeTab"
                className="absolute left-0 top-0 bottom-0 w-1 bg-amber-600 rounded-r-full"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
              />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavigationMenu;