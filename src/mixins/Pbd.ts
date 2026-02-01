import type { XoPbd } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class Pbd {
    async getPbds(): Promise<XoPbd['id'][]>
    async getPbds<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoPbd[]>
    async getPbds<Fields extends readonly (keyof XoPbd)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoPbd, Fields[number]>)[]>
    async getPbds<Fields extends readonly (keyof XoPbd)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/pbds', opts)
        const pbds = await this._fetch<string[] | Partial<XoPbd>[]>(url)
        if (opts.fields === undefined) {
            return pbds.map((href) => hrefToId<XoPbd>(href as string))
        }

        return pbds
    }
}   