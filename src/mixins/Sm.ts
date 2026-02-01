import type { XoSm } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class Sm {
    async getSms(): Promise<XoSm['id'][]>
    async getSms<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoSm[]>
    async getSms<Fields extends readonly (keyof XoSm)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoSm, Fields[number]>)[]>
    async getSms<Fields extends readonly (keyof XoSm)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/sms', opts)
        const sms = await this._fetch<string[] | Partial<XoSm>[]>(url)
        if (opts.fields === undefined) {
            return sms.map((href) => hrefToId<XoSm>(href as string))
        }

        return sms
    }
}   