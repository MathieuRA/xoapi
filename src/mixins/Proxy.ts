import type { XoProxy } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class Proxy {
    async getProxies(): Promise<XoProxy['id'][]>
    async getProxies<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoProxy[]>
    async getProxies<Fields extends readonly (keyof XoProxy)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoProxy, Fields[number]>)[]>
    async getProxies<Fields extends readonly (keyof XoProxy)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/proxies', opts)
        const proxies = await this._fetch<string[] | Partial<XoProxy>[]>(url)
        if (opts.fields === undefined) {
            return proxies.map((href) => hrefToId<XoProxy>(href as string))
        }

        return proxies
    }
}   