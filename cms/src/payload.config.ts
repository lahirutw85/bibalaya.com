import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Series } from './collections/Series'
import { Categories } from './collections/Categories'
import { HomePage } from './globals/HomePage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        importMap: {
            baseDir: path.resolve(dirname),
        },
        meta: {
            titleSuffix: '- Bibalaya CMS',
            ogImage: 'https://ik.imagekit.io/bibalaya/SVG/Bibalaya.com%20-%20LOGO.svg?updatedAt=1747814898195',
        },
        css: path.resolve(dirname, 'styles/custom.css'),
        components: {
            graphics: {
                Logo: '/components/Graphics#Logo',
                Icon: '/components/Graphics#Icon',
            },
        },
    },
    collections: [
        Media,
        Series,
        Categories,
    ],
    globals: [
        HomePage,
    ],
    secret: 'YOUR-SECRET-KEY-HERE',
    db: sqliteAdapter({
        client: {
            url: 'file:' + path.resolve(dirname, 'payload-db.sqlite'),
        },
    }),
    editor: lexicalEditor({}),
})
