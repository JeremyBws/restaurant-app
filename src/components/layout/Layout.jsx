'use client';

import React, { useState, useRef } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';
import NavigationMenu from './NavigationMenu';
import { useClickAway } from '@/hooks/useClickAway';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link'; // Importation du composant Link

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Ferme le menu quand on clique en dehors
  useClickAway(menuRef, () => {
    setIsMenuOpen(false);
  });

  return (
    <div className="min-h-screen relative bg-white"> {/* Ajout de bg-white ici */}
      {/* Header avec bouton menu */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-start px-4 h-16">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors mr-4" // Ajout d'une marge à droite pour espacer le bouton du titre
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <MenuIcon className="w-6 h-6 text-gray-600" />
            )}
          </button>
          <Link href="/" className="text-xl font-bold text-gray-900"> {/* Lien vers la page d'accueil */}
            ABCD Restaurants
          </Link>
        </div>
      </header>

      {/* Menu déroulant */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-16 left-0 bottom-0 z-30 w-64 bg-white border-r border-gray-200 shadow-lg"
          >
            <NavigationMenu onItemClick={() => setIsMenuOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay sombre quand le menu est ouvert */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-20"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Contenu principal */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;
