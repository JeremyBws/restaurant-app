'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Bookmark, Award } from 'lucide-react';
import Link from 'next/link';

const ProfileStats = ({ favorites = 0, wishlist = 0, badges = 0 }) => {
  const stats = [
    {
      id: 'favorites',
      icon: Heart,
      value: favorites,
      label: 'Favoris',
      href: '/favoris',
      color: 'text-rose-500',
      bgColor: 'bg-rose-100',
      hoverColor: 'hover:bg-rose-50'
    },
    {
      id: 'wishlist',
      icon: Bookmark,
      value: wishlist,
      label: 'À tester',
      href: '/wishlist',
      color: 'text-amber-500',
      bgColor: 'bg-amber-100',
      hoverColor: 'hover:bg-amber-50'
    },
    {
      id: 'badges',
      icon: Award,
      value: badges,
      label: 'Badges',
      href: '#badges-section',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
      hoverColor: 'hover:bg-blue-50'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Link
            key={stat.id}
            href={stat.href}
            className="block"
          >
            <motion.div
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              className={`relative overflow-hidden rounded-2xl border border-gray-100 ${stat.hoverColor} 
                transition-all duration-300 group cursor-pointer`}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className={`w-24 h-24 ${stat.bgColor} rounded-full -top-8 -right-8 absolute`} />
                <div className={`w-16 h-16 ${stat.bgColor} rounded-full -bottom-4 -left-4 absolute`} />
              </div>

              <div className="relative p-6">
                {/* Icon avec animation */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl 
                  ${stat.bgColor} ${stat.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>

                {/* Counter avec animation */}
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-3xl font-bold text-gray-900 mb-1"
                >
                  {stat.value}
                </motion.div>

                {/* Label */}
                <div className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                  {stat.label}
                </div>

                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/20 opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProfileStats;