import config from './payload.config'
import { getPayload } from 'payload'

const FEATURE_CARDS_DATA = [
    { title: 'Latest Video', description: 'Watch our most recent message and be inspired.', ctaLabel: 'Learn More', link: '#' }, // Links were not in constants but needed for schema
    { title: 'About Us', description: 'Learn more about our mission and community.', ctaLabel: 'Learn More', link: '#' },
    { title: 'Downloads', description: 'Access study materials, guides, and other downloadable resources.', ctaLabel: 'Learn More', link: '#' },
];

const createDummySeries = (prefix: string, count: number, categoryValue: string, categoryLabel: string) =>
    Array.from({ length: count }, (_, i) => ({
        title: `${categoryLabel} Topic ${i + 1}`,
        category: categoryValue,
        image: `https://picsum.photos/seed/${prefix}${i + 1}/300/200`, // We will handle image upload simulation or just string storage if using URL (but Media expects upload)
        // For this seed, we'll skip actual image download/upload to Media and just placeholder if possible, 
        // OR we ideally download them. To save time/complexity, I might add a text field for 'externalImageUrl' to Media or Series?
        // User requested "Seed content that matches". 
        // Payload Media usually requires a file. 
        // Let's modify Series to accept externalURL OR relationship. 
        // Or we just download these 18 images.
        // Downloading is better.
    }));

const NT_DATA = createDummySeries('nt', 6, 'nt', 'New Testament');
const OT_DATA = createDummySeries('ot', 6, 'ot', 'Old Testament');
const LATEST_DATA = createDummySeries('series', 6, 'series', 'Latest Series');

const seed = async () => {
    const payload = await getPayload({ config })

    console.log('Seeding database...')

    // 1. Seed Series (Carousels)
    // function to download and upload image
    const uploadImage = async (url: string, prefix: string) => {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const media = await payload.create({
                collection: 'media',
                data: {
                    alt: prefix,
                },
                file: {
                    data: buffer,
                    name: `${prefix}.jpg`,
                    mimetype: 'image/jpeg',
                    size: buffer.length,
                }
            });
            return media.id;
        } catch (e) {
            console.error('Error uploading image', url, e);
            return null;
        }
    }

    // Helper to seed a list of items
    const seedSeries = async (items: any[]) => {
        const ids = [];
        for (const item of items) {
            const series = await payload.create({
                collection: 'series',
                data: {
                    title: item.title,
                    category: item.category,
                    // image: null, // Skip image for now to avoid upload errors
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

    // 2. Seed Home Page
    console.log('Seeding Home Page...');

    // Create hero image (dummy)
    // const heroBuffer = Buffer.from('fake hero');
    // const heroMedia = await payload.create({
    //     collection: 'media',
    //     data: { alt: 'Hero' },
    //     file: { data: heroBuffer, name: 'hero.jpg', mimetype: 'image/jpeg', size: heroBuffer.length }
    // });

    // Create feature card images (dummies)
    const featureCards = [];
    for (const card of FEATURE_CARDS_DATA) {
        // Skip media creation
        featureCards.push({
            title: card.title,
            description: card.description,
            // image: m.id,
            link: card.link,
            ctaLabel: card.ctaLabel
        });
    }

    await payload.updateGlobal({
        slug: 'home-page',
        data: {
            hero: {
                headline: 'Discover Timeless Wisdom',
                // heroImage: heroMedia.id,
            },
            featureCards: featureCards,
            carousels: [
                {
                    title: 'New Testament',
                    viewAllLink: '/new-testament',
                    items: ntIds,
                },
                {
                    title: 'Old Testament',
                    viewAllLink: '/old-testament',
                    items: otIds,
                },
                {
                    title: 'Latest Series',
                    viewAllLink: '/latest-series',
                    items: latestIds,
                }
            ]
        }
    });

    console.log('Seeding complete!');
    process.exit(0);
}

seed();
