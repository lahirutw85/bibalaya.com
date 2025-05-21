
import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { SearchBar } from '../components/home/SearchBar';
import { FeatureCard } from '../components/home/FeatureCard';
import { ContentCarousel } from '../components/home/ContentCarousel';
import { Footer } from '../components/layout/Footer';
import { FEATURE_CARDS_DATA, NEW_TESTAMENT_DATA, OLD_TESTAMENT_DATA, LATEST_SERIES_DATA } from '../constants';

export const HomePage: React.FC = () => {
  return (
    <div className="bg-home-bg space-y-8 md:space-y-12"> {/* Added space-y for consistent gaps */}
      <HeroSection />
      
      {/* Wrapper for SearchBar with horizontal padding. Vertical spacing handled by parent's space-y. */}
      <div className="px-4 md:px-8"> 
        <SearchBar />
      </div>

      <section 
        aria-labelledby="featured-content-heading" 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4 md:px-8 max-w-[1000px] mx-auto w-full" // Changed max-w-[1200px] to max-w-[1000px]
      >
        <h2 id="featured-content-heading" className="sr-only">Featured Content</h2>
        {FEATURE_CARDS_DATA.map(item => (
          <FeatureCard key={item.id} item={item} />
        ))}
      </section>
      
      {/* ContentCarousels vertical spacing now handled by parent's space-y */}
      <ContentCarousel 
        title="New Testament" 
        items={NEW_TESTAMENT_DATA} 
        viewAllLink="/new-testament" 
        titleClassName="text-text-light" 
      />
      <ContentCarousel 
        title="Old Testament" 
        items={OLD_TESTAMENT_DATA} 
        viewAllLink="/old-testament" 
        titleClassName="text-text-light" 
      />
      <ContentCarousel 
        title="Latest Series" 
        items={LATEST_SERIES_DATA} 
        viewAllLink="/latest-series" 
        titleClassName="text-text-light"
      />
      
      {/* Footer's top margin now handled by parent's space-y */}
      <Footer />
    </div>
  );
};