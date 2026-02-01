import type { XoVif } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class Vif {
    async getVifs(): Promise<XoVif['id'][]>
    async getVifs<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoVif[]>
    async getVifs<Fields extends readonly (keyof XoVif)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoVif, Fields[number]>)[]>
    async getVifs<Fields extends readonly (keyof XoVif)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/vifs', opts)
        const vifs = await this._fetch<string[] | Partial<XoVif>[]>(url)
        if (opts.fields === undefined) {
            return vifs.map((href) => hrefToId<XoVif>(href as string))
        }

        return vifs
    }
}