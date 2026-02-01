import type { XoPool } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class Host {
    async getPools(): Promise<XoPool['id'][]>
    async getPools<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoPool[]>
    async getPools<Fields extends readonly (keyof XoPool)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoPool, Fields[number]>)[]>
    async getPools<Fields extends readonly (keyof XoPool)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/pools', opts)
        const pools = await this._fetch<string[] | Partial<XoPool>[]>(url)
        if (opts.fields === undefined) {
            return pools.map((href) => hrefToId<XoPool>(href as string))
        }

        return pools
    }
}