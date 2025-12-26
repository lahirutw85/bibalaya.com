/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import {
    REST_POST as POSTHandler,
    REST_GET as GETHandler,
    REST_DELETE as DELETEHandler,
    REST_PATCH as PATCHHandler,
    REST_OPTIONS as OPTIONSHandler
} from '@payloadcms/next/routes'
import config from '@/payload.config'

export const POST = POSTHandler(config)
export const GET = GETHandler(config)
export const DELETE = DELETEHandler(config)
export const PATCH = PATCHHandler(config)
export const OPTIONS = OPTIONSHandler(config)
