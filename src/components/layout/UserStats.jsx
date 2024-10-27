import React from 'react';
import { Heart, BookmarkPlus } from 'lucide-react';
import useFavoritesStore from '@/store/favorites';

const UserStats = () => {
  const { favorites, wishlist } = useFavoritesStore();

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <Heart className={`w-5 h-5 ${favorites.size > 0 ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
        <span className="text-sm font-medium text-gray-600">{favorites.size}</span>
      </div>
      <div className="flex items-center gap-1">
        <BookmarkPlus className={`w-5 h-5 ${wishlist.size > 0 ? 'text-amber-500 fill-amber-500' : 'text-gray-400'}`} />
        <span className="text-sm font-medium text-gray-600">{wishlist.size}</span>
      </div>
    </div>
  );
};

export default UserStats;