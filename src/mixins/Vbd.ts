import type { XoVbd } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class Vbd {
    async getVbds(): Promise<XoVbd['id'][]>
    async getVbds<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoVbd[]>
    async getVbds<Fields extends readonly (keyof XoVbd)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoVbd, Fields[number]>)[]>
    async getVbds<Fields extends readonly (keyof XoVbd)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/vbds', opts)
        const vbds = await this._fetch<string[] | Partial<XoVbd>[]>(url)
        if (opts.fields === undefined) {
            return vbds.map((href) => hrefToId<XoVbd>(href as string))
        }

        return vbds
    }
}