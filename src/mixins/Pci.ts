import type { XoPci } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class Pci {
    async getPcis(): Promise<XoPci['id'][]>
    async getPcis<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoPci[]>
    async getPcis<Fields extends readonly (keyof XoPci)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoPci, Fields[number]>)[]>
    async getPcis<Fields extends readonly (keyof XoPci)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/pcis', opts)
        const pcis = await this._fetch<string[] | Partial<XoPci>[]>(url)
        if (opts.fields === undefined) {
            return pcis.map((href) => hrefToId<XoPci>(href as string))
        }

        return pcis
    }
}   