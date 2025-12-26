import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Series } from './collections/Series'
import { HomePage } from './globals/HomePage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [
        Media,
        Series,
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
