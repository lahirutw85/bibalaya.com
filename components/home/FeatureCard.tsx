
import React from 'react';
import { CardData } from '../../types';

interface FeatureCardProps {
  item: CardData;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ item }) => {
  return (
    <div className="bg-card-bg rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col">
      <img 
        src={item.imageUrl} 
        alt={item.title} 
        className="w-full h-48 md:h-56 object-cover" 
      />
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-text-primary mb-2">{item.title}</h3>
        {item.description && <p className="text-text-secondary text-sm mb-4 flex-grow">{item.description}</p>}
        <button className="mt-auto self-start px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
          Learn More
        </button>
      </div>
    </div>
  );
};
