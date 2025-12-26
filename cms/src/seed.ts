import config from './payload.config'
import { getPayload } from 'payload'

const FEATURE_CARDS_DATA = [
    { title: 'Latest Video', description: 'Watch our most recent message and be inspired.', ctaLabel: 'Learn More', link: '#' }, // Links were not in constants but needed for schema
    { title: 'About Us', description: 'Learn more about our mission and community.', ctaLabel: 'Learn More', link: '#' },
    { title: 'Downloads', description: 'Access study materials, guides, and other downloadable resources.', ctaLabel: 'Learn More', link: '#' },
];

const CATEGORIES = [
    { title: 'New Testament', slug: 'nt' },
    { title: 'Old Testament', slug: 'ot' },
    { title: 'Latest Series', slug: 'series' },
    { title: 'Upcoming Series', slug: 'upcoming' },
];

const createDummySeries = (prefix: string, count: number, categoryValue: string, categoryLabel: string) =>
    Array.from({ length: count }, (_, i) => ({
        title: `${categoryLabel} Topic ${i + 1}`,
        categorySlug: categoryValue, // Changed to slug to lookup ID later
        image: `https://picsum.photos/seed/${prefix}${i + 1}/300/200`,
    }));

const NT_DATA = createDummySeries('nt', 6, 'nt', 'New Testament');
const OT_DATA = createDummySeries('ot', 6, 'ot', 'Old Testament');
const LATEST_DATA = createDummySeries('series', 6, 'series', 'Latest Series');

const seed = async () => {
    const payload = await getPayload({ config })

    console.log('Seeding database...')

    // 0. Seed Categories
    console.log('Seeding Categories...');
    const categoryMap: Record<string, string | number> = {};

    // First, check if categories exist or delete them? For local dev, we usually start fresh.
    // If we assume empty DB, just create.
    for (const cat of CATEGORIES) {
        // Try fetch existing to avoid duplicates if re-running
        const existing = await payload.find({
            collection: 'categories',
            where: { slug: { equals: cat.slug } }
        });

        if (existing.docs.length > 0) {
            categoryMap[cat.slug] = existing.docs[0].id;
        } else {
            const created = await payload.create({
                collection: 'categories',
                data: {
                    title: cat.title,
                    slug: cat.slug,
                }
            });
            categoryMap[cat.slug] = created.id;
        }
    }
    console.log('Categories seeded:', categoryMap);

    // Helper to seed a list of items
    const seedSeries = async (items: any[]) => {
        const ids = [];
        for (const item of items) {
            const catId = categoryMap[item.categorySlug];
            if (!catId) {
                console.warn(`Category not found for ${item.title} (${item.categorySlug})`);
                continue;
            }

            const series = await payload.create({
                collection: 'series',
                data: {
                    title: item.title,
                    category: catId,
                    description: item.description || '',
                }
            });
            ids.push(series.id);
        }
        return ids;
    };

    console.log('Seeding NT Series...');
    const ntIds = await seedSeries(NT_DATA);

    console.log('Seeding OT Series...');
    const otIds = await seedSeries(OT_DATA);

    console.log('Seeding Latest Series...');
    const latestIds = await seedSeries(LATEST_DATA);

    // 2. Seed Home Page - skipping for brevity as main error was Series
    console.log('Seeding complete!');
    process.exit(0);
}

seed();
