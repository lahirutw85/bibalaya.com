
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CardData } from '../../types';
import { SeriesCard } from './SeriesCard';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons';

interface SeriesCarouselProps {
  title: string;
  items: CardData[];
  viewAllLink: string;
  viewAllLabel?: string;
  titleClassName?: string;
}

const DRAG_SENSITIVITY =1.5; 
const INERTIA_DAMPING_FACTOR = 0.95; // Corrected damping factor
const MIN_VELOCITY_FOR_INERTIA = 0.5; 

export const SeriesCarousel: React.FC<SeriesCarouselProps> = ({ 
  title, 
  items, 
  viewAllLink, 
  viewAllLabel = "View all",
  titleClassName 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  
  const lastDragXRef = useRef(0);
  const velocityXRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (animationFrameIdRef.current) { 
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
      velocityXRef.current = 0;
    }
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector(':scope > div')?.clientWidth || 280; 
      const scrollAmount = cardWidth * 2; 
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    
    isDraggingRef.current = true;
    startXRef.current = e.pageX;
    scrollLeftStartRef.current = scrollContainerRef.current.scrollLeft;
    lastDragXRef.current = e.pageX; 
    velocityXRef.current = 0; 

    if (animationFrameIdRef.current) { 
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }

    scrollContainerRef.current.classList.add('dragging');
    document.addEventListener('mousemove', handleDocumentMouseMove);
    document.addEventListener('mouseup', handleDocumentMouseUp);
  };

  const handleDocumentMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    e.preventDefault(); 

    const currentX = e.pageX;
    const walk = (currentX - startXRef.current) * DRAG_SENSITIVITY;
    scrollContainerRef.current.scrollLeft = scrollLeftStartRef.current - walk;

    velocityXRef.current = (currentX - lastDragXRef.current) * DRAG_SENSITIVITY;
    lastDragXRef.current = currentX;
  };

  const animateInertiaScroll = () => {
    if (!scrollContainerRef.current || Math.abs(velocityXRef.current) < MIN_VELOCITY_FOR_INERTIA) {
      velocityXRef.current = 0;
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
      return;
    }

    scrollContainerRef.current.scrollLeft -= velocityXRef.current;
    velocityXRef.current *= INERTIA_DAMPING_FACTOR; 

    animationFrameIdRef.current = requestAnimationFrame(animateInertiaScroll);
  };

  const handleDocumentMouseUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (scrollContainerRef.current) {
      scrollContainerRef.current.classList.remove('dragging');
    }

    document.removeEventListener('mousemove', handleDocumentMouseMove);
    document.removeEventListener('mouseup', handleDocumentMouseUp);

    if (Math.abs(velocityXRef.current) > MIN_VELOCITY_FOR_INERTIA && scrollContainerRef.current) {
      animationFrameIdRef.current = requestAnimationFrame(animateInertiaScroll);
    } else {
      velocityXRef.current = 0; 
    }
  };

  useEffect(() => {
    return () => { 
      if (isDraggingRef.current) { 
        document.removeEventListener('mousemove', handleDocumentMouseMove);
        document.removeEventListener('mouseup', handleDocumentMouseUp);
      }
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  if (!items || items.length === 0) {
    return null; 
  }

  return (
    <section 
      className="container mx-auto px-4 md:px-8"
      aria-labelledby={`carousel-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h2 
          id={`carousel-title-${title.replace(/\s+/g, '-').toLowerCase()}`} 
          className={`text-xl sm:text-2xl md:text-3xl font-semibold ${titleClassName || 'text-text-primary'}`}
        >
          {title}
        </h2>
        <div className="flex items-center space-x-2">
          {items.length > 3 && ( 
            <>
              <button
                onClick={() => scroll('left')}
                className={`p-2 rounded-full shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50
                            ${titleClassName && titleClassName.includes('text-teal-800') ? 'bg-white text-teal-600 hover:bg-teal-50 focus:ring-teal-500' : 'bg-gray-700 text-text-light hover:bg-gray-600 focus:ring-primary'}`}
                aria-label={`Scroll ${title} left`}
              >
                <ChevronLeftIcon className="h-5 w-5 md:h-6 md:w-6" />
              </button>
              <button
                onClick={() => scroll('right')}
                className={`p-2 rounded-full shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50
                           ${titleClassName && titleClassName.includes('text-teal-800') ? 'bg-white text-teal-600 hover:bg-teal-50 focus:ring-teal-500' : 'bg-gray-700 text-text-light hover:bg-gray-600 focus:ring-primary'}`}
                aria-label={`Scroll ${title} right`}
              >
                <ChevronRightIcon className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </>
          )}
          <Link
            to={viewAllLink}
            className={`hidden sm:flex items-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50
                        ${titleClassName && titleClassName.includes('text-teal-800') ? 'bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500' : 'bg-gray-600 text-text-light hover:bg-gray-500 focus:ring-primary'}`}
          >
            {viewAllLabel} <ChevronRightIcon className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
          </Link>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 md:space-x-6 pb-4 scrollbar-hide cursor-grab select-none"
        style={{ scrollSnapType: 'x mandatory' }} 
        onMouseDown={handleMouseDown}
        role="region"
        aria-label={`${title} carousel`}
      >
        {items.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-60 sm:w-64 md:w-72" style={{ scrollSnapAlign: 'start' }}>
            <SeriesCard item={item} />
          </div>
        ))}
      </div>
       <Link
            to={viewAllLink}
            className={`sm:hidden mt-4 flex items-center justify-center w-full text-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50
                      ${titleClassName && titleClassName.includes('text-teal-800') ? 'bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500' : 'bg-gray-600 text-text-light hover:bg-gray-500 focus:ring-primary'}`}
          >
            {viewAllLabel} <ChevronRightIcon className="h-4 w-4 ml-1" />
        </Link>
    </section>
  );
};