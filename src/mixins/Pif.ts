import type { XoPif } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class Pif {
    async getPifs(): Promise<XoPif['id'][]>
    async getPifs<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoPif[]>
    async getPifs<Fields extends readonly (keyof XoPif)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoPif, Fields[number]>)[]>
    async getPifs<Fields extends readonly (keyof XoPif)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/pifs', opts)
        const pifs = await this._fetch<string[] | Partial<XoPif>[]>(url)
        if (opts.fields === undefined) {
            return pifs.map((href) => hrefToId<XoPif>(href as string))
        }

        return pifs
    }
}   