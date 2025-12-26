import { CollectionConfig, GlobalConfig } from 'payload'

// Using a Global for the Home Page since it's unique
export const HomePage: GlobalConfig = {
    slug: 'home-page',
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Hero Section',
                    fields: [
                        {
                            name: 'hero',
                            type: 'group',
                            fields: [
                                {
                                    name: 'headline',
                                    type: 'text',
                                    required: true,
                                    admin: { description: 'Main text shown on the giant home banner.' }
                                },
                                {
                                    name: 'heroImage',
                                    type: 'upload',
                                    relationTo: 'media',
                                    admin: { description: 'Background image for the hero section.' }
                                }
                            ]
                        },
                    ]
                },
                {
                    label: 'Feature Cards',
                    fields: [
                        {
                            name: 'featureCards',
                            type: 'array',
                            label: 'Promotion Cards',
                            labels: {
                                singular: 'Feature Card',
                                plural: 'Feature Cards',
                            },
                            fields: [
                                { name: 'title', type: 'text' },
                                { name: 'description', type: 'textarea' },
                                { name: 'image', type: 'upload', relationTo: 'media' },
                                { name: 'link', type: 'text' },
                                { name: 'ctaLabel', type: 'text', defaultValue: 'Learn More' }
                            ]
                        },
                    ]
                },
                {
                    label: 'Content Carousels',
                    fields: [
                        {
                            name: 'carousels',
                            type: 'array',
                            label: 'Home Page Carousels',
                            fields: [
                                { name: 'title', type: 'text', required: true },
                                { name: 'viewAllLink', type: 'text' },
                                {
                                    name: 'items',
                                    type: 'relationship',
                                    relationTo: 'series',
                                    hasMany: true,
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
}
