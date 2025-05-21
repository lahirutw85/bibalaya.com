import React from 'react';
import { Footer } from '../components/layout/Footer';
import { SeriesHeader } from '../components/series/SeriesHeader';
import { SeriesCarousel } from '../components/series/SeriesCarousel';
import { SERIES_CATEGORIES_DATA } from '../constants';

export const SeriesPage: React.FC = () => {
  return (
    <div className="bg-home-bg min-h-screen flex flex-col">
      <SeriesHeader />
      
      <div className="flex-grow py-8 md:py-12 space-y-10 md:space-y-16">
        {SERIES_CATEGORIES_DATA.map(category => (
          <div key={category.id} className={category.sectionClassName}>
            <SeriesCarousel
              title={category.title}
              items={category.items}
              viewAllLink={category.viewAllLink}
              titleClassName={category.titleClassName}
            />
          </div>
        ))}
      </div>
      
      <Footer />
    </div>
  );
};
