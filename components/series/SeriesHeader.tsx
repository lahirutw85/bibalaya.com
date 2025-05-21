import React, { useState } from 'react';
import { 
  SERIES_PAGE_HERO_TITLE, 
  SERIES_PAGE_HERO_DESCRIPTION, 
  SERIES_FILTER_OPTIONS,
  SERIES_PAGE_HERO_BACKGROUND_IMAGE_URL 
} from '../../constants';
import { ListIcon, HashIcon } from '../icons';

const iconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  ListIcon,
  HashIcon,
};

export const SeriesHeader: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('featured');

  return (
    <header 
      className="text-text-light py-8 md:py-12 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${SERIES_PAGE_HERO_BACKGROUND_IMAGE_URL})` }}
      aria-labelledby="series-hero-title"
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div> {/* Overlay for text legibility */}
      <div className="container mx-auto px-4 md:px-8 relative z-10"> {/* Content on top of overlay */}
        <div className="max-w-3xl mx-auto text-center">
          <h1 id="series-hero-title" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            {SERIES_PAGE_HERO_TITLE}
          </h1>
          <p className="text-sm sm:text-base text-gray-200 mb-8"> {/* Slightly lighter text for better contrast on image */}
            {SERIES_PAGE_HERO_DESCRIPTION}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {SERIES_FILTER_OPTIONS.map((filter) => {
            const IconComponent = filter.icon ? iconMap[filter.icon] : null;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-md flex items-center space-x-2 transition-colors duration-200
                            ${activeFilter === filter.id 
                              ? 'bg-primary text-white' 
                              : 'bg-gray-700 bg-opacity-80 hover:bg-gray-600 text-gray-200' // Adjusted filter button background for visibility
                            }`}
                aria-pressed={activeFilter === filter.id}
              >
                {IconComponent && <IconComponent className="h-4 w-4" />}
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};