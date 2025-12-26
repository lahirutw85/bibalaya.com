import { CollectionConfig, GlobalConfig } from 'payload'

// Using a Global for the Home Page since it's unique
export const HomePage: GlobalConfig = {
    slug: 'home-page',
    fields: [
        {
            name: 'hero',
            type: 'group',
            fields: [
                {
                    name: 'headline',
                    type: 'text',
                    required: true,
                    defaultValue: 'Discover Timeless Wisdom'
                },
                {
                    name: 'heroImage',
                    type: 'upload',
                    relationTo: 'media',
                    // optional
                }
            ]
        },
        {
            name: 'featureCards',
            type: 'array',
            fields: [
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'image', type: 'upload', relationTo: 'media' },
                { name: 'link', type: 'text' },
                { name: 'ctaLabel', type: 'text', defaultValue: 'Learn More' }
            ]
        },
        {
            name: 'carousels',
            type: 'array',
            fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'viewAllLink', type: 'text' },
                // In a real app we might reference a Category, but for now let's just use a list of Series
                {
                    name: 'items',
                    type: 'relationship',
                    relationTo: 'series',
                    hasMany: true,
                }
            ]
        }
    ],
}
