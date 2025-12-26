import React, { useEffect, useState } from 'react';
import { Footer } from '../components/layout/Footer';
import { SeriesHeader } from '../components/series/SeriesHeader';
import { SeriesCarousel } from '../components/series/SeriesCarousel';
import { SERIES_CATEGORIES_DATA } from '../constants';
import { fetchCollection, getImageUrl } from '../src/lib/api';
import { SeriesCategoryData } from '../types';

export const SeriesPage: React.FC = () => {
  const [categories, setCategories] = useState<SeriesCategoryData[]>(
    SERIES_CATEGORIES_DATA.map(c => ({ ...c, items: [] }))
  );

  useEffect(() => {
    const loadSeries = async () => {
      try {
        // 1. Fetch available categories from CMS
        const categoriesData = await fetchCollection('categories');
        const cmsCategories: SeriesCategoryData[] = (categoriesData?.docs || []).map((cat: any) => ({
          id: cat.id,
          title: cat.title.toUpperCase(),
          items: [], // Will be populated below
          viewAllLink: `/series/${cat.slug}`,
          titleClassName: 'text-text-light'
        }));

        // Helper to format Doc to CardData
        function mapDocToCard(doc: any) {
          const catLabel = typeof doc.category === 'object' ? doc.category?.title : doc.category;

          return {
            id: doc.id,
            title: doc.title,
            category: doc.description || catLabel || '',
            description: doc.description,
            imageUrl: getImageUrl(doc.image) || 'https://picsum.photos/seed/placeholder/280/180',
            overlayColor: doc.overlayColor
          };
        }

        // 2. Fetch Latest Series (All series, sorted by newest)
        const latestQuery = { 'limit': '20', 'sort': '-createdAt' };
        const latestData = await fetchCollection('series', latestQuery);
        const latestItems = (latestData?.docs || []).map(mapDocToCard);

        const latestCategory: SeriesCategoryData = {
          id: 'latest',
          title: 'LATEST SERIES',
          items: latestItems,
          viewAllLink: '/series/latest',
          titleClassName: 'text-text-light'
        };

        // 3. Fetch items for each specific category
        const populatedCategories = await Promise.all(
          cmsCategories.map(async (cat) => {
            const query = {
              'where[category][equals]': cat.id,
              'limit': '20',
              'sort': '-createdAt'
            };
            const catData = await fetchCollection('series', query);
            const items = (catData?.docs || []).map(mapDocToCard);
            return { ...cat, items };
          })
        );

        // 4. Set State: Latest + Dynamic Categories
        setCategories([latestCategory, ...populatedCategories]);

      } catch (err) {
        console.error("Failed to load series data:", err);
      }
    };

    loadSeries();
  }, []);

  return (
    <div className="bg-home-bg min-h-screen flex flex-col">
      <SeriesHeader />

      <div className="flex-grow py-8 md:py-12 space-y-10 md:space-y-16">
        {categories.map(category => (
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
