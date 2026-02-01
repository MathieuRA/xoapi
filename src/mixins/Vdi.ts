import type { XoVdi } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class Vdi {
    async getVdis(): Promise<XoVdi['id'][]>
    async getVdis<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoVdi[]>
    async getVdis<Fields extends readonly (keyof XoVdi)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoVdi, Fields[number]>)[]>
    async getVdis<Fields extends readonly (keyof XoVdi)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/vdis', opts)
        const vdis = await this._fetch<string[] | Partial<XoVdi>[]>(url)
        if (opts.fields === undefined) {
            return vdis.map((href) => hrefToId<XoVdi>(href as string))
        }

        return vdis
    }
}