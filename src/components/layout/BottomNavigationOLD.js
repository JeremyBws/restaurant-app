// components/layout/BottomNavigation.jsx
'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Search, Heart, Bell, User } from 'lucide-react';

const BottomNav = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Gérer le scroll de la barre de navigation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav 
      className={`md:hidden fixed bottom-0 left-0 right-0 bg-white border-t py-2 px-4 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ 
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
      }}
    >
      <div className="flex justify-around items-center">
        <NavItem 
          href="/" 
          icon={Search} 
          label="Explorer"
          isActive={pathname === '/'} 
        />
        <NavItem 
          href="/favoris" 
          icon={Heart} 
          label="Favoris"
          isActive={pathname === '/favoris'} 
        />
        <NavItem 
          href="/notifications" 
          icon={Bell} 
          label="Notifications"
          isActive={pathname === '/notifications'} 
        />
        <NavItem 
          href="/profil" 
          icon={User} 
          label="Profil"
          isActive={pathname === '/profil'} 
        />
      </div>
    </nav>
  );
};

const NavItem = ({ href, icon: Icon, label, isActive }) => (
  <a 
    href={href}
    className={`flex flex-col items-center min-w-[64px] p-2 ${
      isActive ? 'text-emerald-600' : 'text-gray-600'
    }`}
  >
    <Icon size={24} className="mb-1" />
    <span className="text-xs">{label}</span>
  </a>
);

export default BottomNav;