
import React, { useEffect, useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { SearchBar } from '../components/home/SearchBar';
import { FeatureCard } from '../components/home/FeatureCard';
import { ContentCarousel } from '../components/home/ContentCarousel';
import { Footer } from '../components/layout/Footer';
import { FEATURE_CARDS_DATA, NEW_TESTAMENT_DATA, OLD_TESTAMENT_DATA, LATEST_SERIES_DATA, HERO_TEXT, HERO_IMAGE_URL } from '../constants';
import { fetchGlobal, getImageUrl } from '../src/lib/api';
import { CardData } from '../types';

export const HomePage: React.FC = () => {
  const [hero, setHero] = useState({ headline: HERO_TEXT, backgroundImage: HERO_IMAGE_URL });
  const [features, setFeatures] = useState<CardData[]>(FEATURE_CARDS_DATA);
  const [carousels, setCarousels] = useState<any[]>([
    { title: "New Testament", items: NEW_TESTAMENT_DATA, viewAllLink: "/new-testament", titleClassName: "text-text-light" },
    { title: "Old Testament", items: OLD_TESTAMENT_DATA, viewAllLink: "/old-testament", titleClassName: "text-text-light" },
    { title: "Latest Series", items: LATEST_SERIES_DATA, viewAllLink: "/latest-series", titleClassName: "text-text-light" },
  ]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchGlobal('home-page');
      if (data) {
        // Update Hero
        if (data.hero) {
          setHero({
            headline: data.hero.headline || HERO_TEXT,
            backgroundImage: data.hero.heroImage ? getImageUrl(data.hero.heroImage) : HERO_IMAGE_URL
          });
        }

        // Update Features
        if (data.featureCards) {
          setFeatures(data.featureCards.map((f: any, i: number) => ({
            id: f.id || `feature-${i}`,
            title: f.title,
            description: f.description,
            imageUrl: getImageUrl(f.image) || FEATURE_CARDS_DATA[i]?.imageUrl || '',
            // Link/CTA not used in FeatureCard yet? FeatureCard has hardcoded "Learn More" button but no link in props?
            // Checking FeatureCard source: it renders button but doesn't use link.
          })));
        }

        // Update Carousels
        if (data.carousels) {
          const newCarousels = data.carousels.map((c: any) => ({
            title: c.title,
            viewAllLink: c.viewAllLink,
            titleClassName: "text-text-light",
            items: c.items?.map((item: any) => {
              const series = item.value; // relationship value
              if (!series) return null;
              // Attempt to find original item for fallback image
              // const originalItem = ... (hard to match without ID or consistent order. But we seeded in order.)
              // Let's just use a generic fallback if needed, or rely on getImageUrl returning empty string and Component handling it?
              // Existing components use img src. Empty src is bad.
              // We'll create a fallback map based on category logic from constants if strictly needed, 
              // but simplest is just checking if we match anything.
              // Actually, since we seeded from constants, the TITLE matches.

              // Find matching constant item
              let originalUrl = '';
              const allSeriesConstants = [...NEW_TESTAMENT_DATA, ...OLD_TESTAMENT_DATA, ...LATEST_SERIES_DATA];
              const match = allSeriesConstants.find(s => s.title === series.title);
              if (match) originalUrl = match.imageUrl;

              return {
                id: series.id,
                title: series.title,
                category: series.category,
                description: series.description,
                imageUrl: getImageUrl(series.image) || originalUrl,
              };
            }).filter(Boolean) || []
          }));
          setCarousels(newCarousels);
        }
      }
    };
    loadData();
  }, []);

  return (
    <div className="bg-home-bg space-y-8 md:space-y-12">
      <HeroSection headline={hero.headline} backgroundImage={hero.backgroundImage} />

      <div className="px-4 md:px-8">
        <SearchBar />
      </div>

      <section
        aria-labelledby="featured-content-heading"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-8 mx-auto w-full"
      >
        <h2 id="featured-content-heading" className="sr-only">Featured Content</h2>
        {features.map(item => (
          <FeatureCard key={item.id} item={item} />
        ))}
      </section>

      {carousels.map((carousel, index) => (
        <ContentCarousel
          key={index}
          title={carousel.title}
          items={carousel.items}
          viewAllLink={carousel.viewAllLink}
          titleClassName={carousel.titleClassName}
        />
      ))}

      <Footer />
    </div>
  );
};
