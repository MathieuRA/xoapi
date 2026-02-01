import type { XoServer } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class Server {
    async getServers(): Promise<XoServer['id'][]>
    async getServers<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoServer[]>
    async getServers<Fields extends readonly (keyof XoServer)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoServer, Fields[number]>)[]>
    async getServers<Fields extends readonly (keyof XoServer)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/servers', opts)
        const servers = await this._fetch<string[] | Partial<XoServer>[]>(url)
        if (opts.fields === undefined) {
            return servers.map((href) => hrefToId<XoServer>(href as string))
        }

        return servers
    }
}   