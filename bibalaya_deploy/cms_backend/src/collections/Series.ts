import { CollectionConfig } from 'payload'

export const Series: CollectionConfig = {
    slug: 'series',
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'category',
            type: 'select',
            required: true,
            options: [
                { label: 'New Testament', value: 'nt' },
                { label: 'Old Testament', value: 'ot' },
                { label: 'Latest Series', value: 'series' },
                // Using values that match the seed script/constants keys if possible
            ]
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
        {
            name: 'overlayColor',
            type: 'text', // e.g., 'bg-blue-500/70'
        },
        // We can add a 'featured' boolean if needed for potential filtering
        {
            name: 'isFeatured',
            type: 'checkbox',
            defaultValue: false,
        },
    ],
}
