import React from 'react';
import { CardData } from '../../types';

interface SeriesCardProps {
  item: CardData;
}

export const SeriesCard: React.FC<SeriesCardProps> = ({ item }) => {
  const overlayColor = item.overlayColor || 'bg-black/50'; // Default overlay if not specified

  return (
    <div 
      className="relative w-full h-40 md:h-44 rounded-lg shadow-lg overflow-hidden group cursor-pointer transform hover:scale-105 transition-transform duration-300"
      role="article"
      aria-labelledby={`series-card-title-${item.id}`}
    >
      <img 
        src={item.imageUrl} 
        alt={item.title} 
        className="w-full h-full object-cover" 
      />
      <div className={`absolute inset-0 ${overlayColor} transition-opacity duration-300 group-hover:opacity-80`} />
      <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-between text-white">
        <div>
          <h3 id={`series-card-title-${item.id}`} className="text-lg md:text-xl font-bold leading-tight">
            {item.title}
          </h3>
          {item.category && (
            <p className="text-xs sm:text-sm font-medium text-gray-200 mt-0.5">
              {item.category}
            </p>
          )}
        </div>
        {item.description && (
          <p className="text-xs text-gray-300 leading-snug self-start">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
};
