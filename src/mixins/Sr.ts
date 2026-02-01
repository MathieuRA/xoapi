import type { XoSr } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class Sr {
    async getSrs(): Promise<XoSr['id'][]>
    async getSrs<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoSr[]>
    async getSrs<Fields extends readonly (keyof XoSr)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoSr, Fields[number]>)[]>
    async getSrs<Fields extends readonly (keyof XoSr)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/srs', opts)
        const srs = await this._fetch<string[] | Partial<XoSr>[]>(url)
        if (opts.fields === undefined) {
            return srs.map((href) => hrefToId<XoSr>(href as string))
        }

        return srs
    }
}