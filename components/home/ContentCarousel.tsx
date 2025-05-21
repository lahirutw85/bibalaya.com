
import React, { useRef } from 'react';
import { CardData } from '../../types';
import { CarouselCard } from './CarouselCard';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons';
import { Link } from 'react-router-dom';

interface ContentCarouselProps {
  title: string;
  items: CardData[];
  viewAllLink: string;
  viewAllLabel?: string;
  titleClassName?: string;
}

export const ContentCarousel: React.FC<ContentCarouselProps> = ({ title, items, viewAllLink, viewAllLabel = "View All", titleClassName }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth * 0.8; 
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!items || items.length === 0) {
    return null; 
  }

  return (
    <section 
      className="px-4 md:px-8" // Removed my-10 md:my-12
      aria-labelledby={`carousel-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h2 
          id={`carousel-title-${title.replace(/\s+/g, '-').toLowerCase()}`} 
          className={`text-2xl md:text-3xl font-semibold ${titleClassName || 'text-text-primary'}`}
        >
          {title}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-white text-primary shadow-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={`Scroll ${title} left`}
          >
            <ChevronLeftIcon className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-white text-primary shadow-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={`Scroll ${title} right`}
          >
            <ChevronRightIcon className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <Link
            to={viewAllLink}
            className="hidden sm:inline-block px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            {viewAllLabel}
          </Link>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 md:space-x-6 pb-4 scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {items.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-64 md:w-72" style={{ scrollSnapAlign: 'start' }}>
            <CarouselCard item={item} />
          </div>
        ))}
      </div>
       <Link
            to={viewAllLink}
            className="sm:hidden mt-4 inline-block w-full text-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            {viewAllLabel}
        </Link>
    </section>
  );
};