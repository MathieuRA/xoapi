import type { XoHost } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class Host {
    async getHosts(): Promise<XoHost['id'][]>
    async getHosts<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoHost[]>
    async getHosts<Fields extends readonly (keyof XoHost)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoHost, Fields[number]>)[]>
    async getHosts<Fields extends readonly (keyof XoHost)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/hosts', opts)
        const hosts = await this._fetch<string[] | Partial<XoHost>[]>(url)
        if (opts.fields === undefined) {
            return hosts.map((href) => hrefToId<XoHost>(href as string))
        }

        return hosts
    }
}