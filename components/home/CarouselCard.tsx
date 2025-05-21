
import React from 'react';
import { CardData } from '../../types';

interface CarouselCardProps {
  item: CardData;
}

export const CarouselCard: React.FC<CarouselCardProps> = ({ item }) => {
  return (
    <div className="bg-card-bg rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      <img 
        src={item.imageUrl} 
        alt={item.title} 
        className="w-full h-40 object-cover"
      />
      <div className="p-4 flex-grow flex flex-col">
        <h4 className="text-md font-semibold text-text-primary mb-1 truncate">{item.title}</h4>
        {item.category && <p className="text-xs text-secondary font-medium mb-2">{item.category}</p>}
        {item.description && <p className="text-xs text-text-secondary flex-grow">{item.description.substring(0,50)}...</p>}
         <button className="mt-3 self-start text-xs px-3 py-1.5 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-opacity-50">
          Explore
        </button>
      </div>
    </div>
  );
};
