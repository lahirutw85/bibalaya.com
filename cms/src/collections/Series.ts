import { CollectionConfig } from 'payload'

export const Series: CollectionConfig = {
    slug: 'series',
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Series Content',
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                            required: true,
                            admin: {
                                description: 'The display title of the series.',
                            },
                        },
                        {
                            name: 'category',
                            type: 'relationship',
                            relationTo: 'categories',
                            required: true,
                            hasMany: false,
                            admin: {
                                description: 'Select which group this series belongs to.',
                            },
                        },
                        {
                            name: 'description',
                            type: 'textarea',
                            admin: {
                                description: 'A short overview shown on the card.',
                            },
                        },
                        {
                            name: 'image',
                            type: 'upload',
                            relationTo: 'media',
                            required: false,
                        },
                    ],
                },
                {
                    label: 'Visual Styling',
                    fields: [
                        {
                            name: 'overlayColor',
                            type: 'text',
                            admin: {
                                description: 'Tailwind background class for the card overlay (e.g., bg-blue-500/70).',
                                placeholder: 'bg-primary/70',
                            },
                        },
                        {
                            name: 'isFeatured',
                            type: 'checkbox',
                            label: 'Feature this series at the top',
                            defaultValue: false,
                        },
                    ],
                },
            ],
        },
    ],
}
